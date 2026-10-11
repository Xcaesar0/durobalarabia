import {readFile} from 'node:fs/promises';
import {cmsSection,replaceBand,renderArticles} from '../../server/cms-render.mjs';
import {SITE,esc} from '../../js/cms-model.mjs';
const configPromise=readFile('config/supabase-public.json','utf8').then(JSON.parse);
const templates=new Map();
async function file(path){if(!templates.has(path))templates.set(path,await readFile(path,'utf8'));return templates.get(path);}
export async function getContent(table){
 const {url,publishableKey}=await configPromise;
 const response=await fetch(url+'/rest/v1/cms_'+table+'?select=*&status=eq.published&order=sort_order.asc,created_at.desc',{headers:{apikey:publishableKey},signal:AbortSignal.timeout(7000)});
 if(!response.ok)throw new Error('Content unavailable');return response.json();
}
export default async function(req){
 const url=new URL(req.url),path=url.pathname;
 const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Netlify-CDN-Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 if(!['GET','HEAD'].includes(req.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
 try{
  if(path==='/sitemap.xml'){
   const articles=await getContent('articles'),paths=['/','/programs.html','/contact.html','/articles/','/tr/articles/',...articles.flatMap(r=>['/articles/'+r.slug+'/','/tr/articles/'+r.slug+'/'])];
   return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>`<url><loc>${SITE+esc(p)}</loc></url>`).join('')+'</urlset>',{headers:{...headers,'Content-Type':'application/xml; charset=utf-8'}});
  }
  if(path==='/articles'||path==='/tr/articles'||/^\/(tr\/)?articles\/.+[^/]$/.test(path))return new Response(null,{status:301,headers:{Location:path+'/'}});
  if(path.includes('/articles/')){
   const match=path.match(/^\/(tr\/)?articles\/(?:([a-z0-9-]+)\/)?$/);
   if(!match)return new Response('Not found',{status:404,headers});
   const page=Math.max(1,Number.parseInt(url.searchParams.get('page')||'1',10)||1);
   const html=renderArticles(await file('templates/editorial.html'),await getContent('articles'),match[1]?'tr':'ar',match[2]||'',page);
   return new Response(req.method==='HEAD'?null:html||'Not found',{status:html?200:404,headers});
  }
  if(path==='/api/content')return new Response(JSON.stringify({articles:await getContent('articles'),programs:await getContent('programs')}),{headers:{...headers,'Content-Type':'application/json'}});
  const isPrograms=path.includes('programs');
  let html=await file(isPrograms?'programs.html':'index.html');
  const [articles,programs]=await Promise.all([getContent('articles'),getContent('programs')]);
  if(isPrograms){
   html=replaceBand(html,'band--d-features',cmsSection(programs,'programs'));
   html=replaceBand(html,'band--d-academy','');
   html=html.replace(/<main class="m-progs-body">[\s\S]*?<\/main>/,`<main class="m-progs-body">${cmsSection(programs,'programs')}</main>`);
  }else{
   for(const device of ['d','m']){
    html=replaceBand(html,'band--'+device+'-articles',cmsSection(articles,'articles',true));
    // Keep the home program feature current when programs are edited or removed.
    html=replaceBand(html,'band--'+device+'-program',cmsSection(programs.filter(r=>r.content.featured).length?programs.filter(r=>r.content.featured):programs.slice(0,1),'programs',true));
   }
  }
  html=html.replace('</head>','<link rel="stylesheet" href="/css/articles.css"><link rel="stylesheet" href="/css/cms.css"></head>').replace('</body>','<script defer src="/assets/traffic.js"></script></body>');
  return new Response(req.method==='HEAD'?null:html,{headers});
 }catch(error){console.error('Public content request failed:',error.message);return new Response('<!doctype html><html><meta charset="utf-8"><title>Durob Alarabia</title><p>الموقع غير متاح مؤقتاً. يرجى المحاولة بعد قليل. / Lütfen biraz sonra tekrar deneyin.</p></html>',{status:503,headers:{...headers,'Retry-After':'30'}});}
}
export const config={path:['/','/index.html','/programs.html','/articles','/articles/*','/tr/articles','/tr/articles/*','/sitemap.xml','/api/content']};
