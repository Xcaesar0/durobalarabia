-- Run against the dedicated Durob Alarabia project. No passwords or keys here.
begin;
create table if not exists public.admin_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_members enable row level security;
revoke all on table public.admin_members from anon, authenticated;
grant select on table public.admin_members to authenticated;
drop policy if exists "Administrators can read their own membership" on public.admin_members;
create policy "Administrators can read their own membership"
  on public.admin_members for select to authenticated
  using (user_id = (select auth.uid()));
commit;
-- After creating/inviting the administrator in Supabase Auth, a trusted operator
-- grants access in SQL Editor (replace the email with the approved administrator):
-- insert into public.admin_members(user_id)
-- select id from auth.users where email = 'ADMIN_EMAIL'
-- on conflict (user_id) do nothing;
-- There is deliberately no client-side insert/update/delete policy or grant.
