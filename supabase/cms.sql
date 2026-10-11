-- Remote CMS schema. Public reads are restricted to published content.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
create table public.cms_articles (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug)<=100),
 status text not null default 'draft' check(status in ('draft','published')),
 content jsonb not null check (jsonb_typeof(content)='object' and octet_length(content::text)<=200000
   and length(content#>>'{locales,ar,title}') between 1 and 250 and length(content#>>'{locales,tr,title}') between 1 and 250
   and content#>>'{locales,ar,title}' is not null and content#>>'{locales,tr,title}' is not null),
 sort_order integer not null default 0,
 revision integer not null default 1,
 updated_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
create table public.cms_programs (like public.cms_articles including all);
create function private.cms_stamp() returns trigger language plpgsql set search_path='' as $$
begin new.updated_at=now(); new.revision=old.revision+1; new.created_at=old.created_at; return new; end $$;
revoke all on function private.cms_stamp() from public, anon, authenticated;
create trigger cms_articles_stamp before update on public.cms_articles for each row execute function private.cms_stamp();
create trigger cms_programs_stamp before update on public.cms_programs for each row execute function private.cms_stamp();
alter table public.cms_articles enable row level security;
alter table public.cms_programs enable row level security;
grant select on public.cms_articles, public.cms_programs to anon;
grant select, insert, update, delete on public.cms_articles, public.cms_programs to authenticated;
create policy published_articles on public.cms_articles for select to anon using(status='published');
create policy published_programs on public.cms_programs for select to anon using(status='published');
create policy administrator_articles on public.cms_articles for all to authenticated
 using(exists(select 1 from public.admin_members where user_id=(select auth.uid())))
 with check(exists(select 1 from public.admin_members where user_id=(select auth.uid())));
create policy administrator_programs on public.cms_programs for all to authenticated
 using(exists(select 1 from public.admin_members where user_id=(select auth.uid())))
 with check(exists(select 1 from public.admin_members where user_id=(select auth.uid())));
create index cms_articles_published_idx on public.cms_articles(sort_order,created_at) where status='published';
create index cms_programs_published_idx on public.cms_programs(sort_order,created_at) where status='published';

-- No IP addresses, credentials or personal visitor information are collected.
create table public.site_visits (
 id uuid primary key,
 visitor_id uuid not null,
 path text not null,
 language text not null check(language in ('ar','tr')),
 referrer text not null default '',
 created_at timestamptz not null default now(),
 last_seen timestamptz not null default now()
);
create index site_visits_created_idx on public.site_visits(created_at);
create index site_visits_seen_idx on public.site_visits(last_seen);
create index site_visits_visitor_idx on public.site_visits(visitor_id,created_at);
create index site_visits_path_idx on public.site_visits(path,created_at);
alter table public.site_visits enable row level security;
revoke all on public.site_visits from anon,authenticated;
grant select on public.site_visits to authenticated;
create policy administrator_analytics on public.site_visits for select to authenticated
 using(exists(select 1 from public.admin_members where user_id=(select auth.uid())));

-- A private, narrow ingestion function is the sole anonymous write path.
-- Server timestamps, immutable visit identity, deduplication and bounded input.
create function private.record_visit(visit uuid, visitor uuid, page text, lang text, ref text default '')
 returns void language plpgsql security definer set search_path='' as $$
declare stored public.site_visits%rowtype;
begin
 if visit is null or visitor is null or lang not in ('ar','tr') or length(page)>220 or length(ref)>160 then return; end if;
 if page not in ('/','/programs.html','/contact.html','/articles/','/tr/articles/')
 and not exists(select 1 from public.cms_articles where status='published' and page in ('/articles/'||slug||'/','/tr/articles/'||slug||'/')) then return; end if;
 if ref<>'' and ref !~ '^[a-zA-Z0-9.-]+(:[0-9]+)?$' then return; end if;
 perform pg_advisory_xact_lock(hashtext(visitor::text));
 select * into stored from public.site_visits where id=visit;
 if found then
   if stored.visitor_id=visitor and stored.path=page and stored.last_seen<now()-interval '20 seconds' then
     update public.site_visits set last_seen=now() where id=visit;
   end if; return;
 end if;
 if (select count(*) from public.site_visits where visitor_id=visitor and created_at>now()-interval '1 hour')>=60 then return; end if;
 insert into public.site_visits(id,visitor_id,path,language,referrer) values(visit,visitor,page,lang,coalesce(ref,'')) on conflict do nothing;
end $$;
revoke all on function private.record_visit(uuid,uuid,text,text,text) from public;
grant execute on function private.record_visit(uuid,uuid,text,text,text) to anon,authenticated;
create function public.track_visit(visit uuid, visitor uuid, page text, lang text, ref text default '') returns void
 language sql security invoker set search_path='' as $$ select private.record_visit(visit,visitor,page,lang,ref) $$;
revoke all on function public.track_visit(uuid,uuid,text,text,text) from public;
grant execute on function public.track_visit(uuid,uuid,text,text,text) to anon,authenticated;

create function public.traffic_overview() returns jsonb language sql stable security invoker set search_path='' as $$
 with recent as (select * from public.site_visits where created_at>=now()-interval '30 days'),
 hours as (select generate_series(date_trunc('hour',now())-interval '23 hours',date_trunc('hour',now()),interval '1 hour') as bucket),
 days as (select generate_series(date_trunc('day',now())-interval '29 days',date_trunc('day',now()),interval '1 day') as bucket)
 select jsonb_build_object(
 'views',(select count(*) from recent), 'visitors',(select count(distinct visitor_id) from recent),
 'today',(select count(*) from recent where created_at>=date_trunc('day',now())),
 'active',(select count(distinct visitor_id) from public.site_visits where last_seen>now()-interval '2 minutes'),
 'hourly',(select jsonb_agg(jsonb_build_object('at',bucket,'views',(select count(*) from recent where created_at>=bucket and created_at<bucket+interval '1 hour')) order by bucket) from hours),
 'daily',(select jsonb_agg(jsonb_build_object('at',bucket,'views',(select count(*) from recent where created_at>=bucket and created_at<bucket+interval '1 day')) order by bucket) from days),
 'pages',coalesce((select jsonb_agg(row_to_json(p)) from (select path,count(*) as views,count(distinct visitor_id) as visitors from recent group by path order by views desc limit 100) p),'[]'::jsonb),
 'referrers',coalesce((select jsonb_agg(row_to_json(p)) from (select referrer,count(*) as views from recent group by referrer order by views desc limit 10) p),'[]'::jsonb),
 'languages',coalesce((select jsonb_agg(row_to_json(p)) from (select language,count(*) as views from recent group by language) p),'[]'::jsonb),
 'since',(select min(created_at) from public.site_visits), 'updated',now()
 ) where exists(select 1 from public.admin_members where user_id=(select auth.uid()));
$$;
revoke all on function public.traffic_overview() from public,anon;
grant execute on function public.traffic_overview() to authenticated;
create function public.article_traffic(target text) returns jsonb language sql stable security invoker set search_path='' as $$
 with recent as (select * from public.site_visits where created_at>=now()-interval '30 days' and path in ('/articles/'||target||'/','/tr/articles/'||target||'/')),
 days as (select generate_series(date_trunc('day',now())-interval '29 days',date_trunc('day',now()),interval '1 day') as bucket)
 select jsonb_build_object('views',(select count(*) from recent),'visitors',(select count(distinct visitor_id) from recent),
 'daily',(select jsonb_agg(jsonb_build_object('at',bucket,'views',(select count(*) from recent where created_at>=bucket and created_at<bucket+interval '1 day')) order by bucket) from days))
 where exists(select 1 from public.admin_members where user_id=(select auth.uid()));
$$;
revoke all on function public.article_traffic(text) from public,anon;
grant execute on function public.article_traffic(text) to authenticated;
alter publication supabase_realtime add table public.site_visits,public.cms_articles,public.cms_programs;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('cms-media','cms-media',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy cms_media_read on storage.objects for select to anon,authenticated using(bucket_id='cms-media');
create policy cms_media_admin on storage.objects for all to authenticated
 using(bucket_id='cms-media' and exists(select 1 from public.admin_members where user_id=(select auth.uid())))
 with check(bucket_id='cms-media' and exists(select 1 from public.admin_members where user_id=(select auth.uid())));
