import {readFile,writeFile,mkdir} from 'node:fs/promises';
import vm from 'node:vm';
const context={window:{}};vm.runInNewContext(await readFile('js/translations.js','utf8'),context);
const tr=s=>context.window.DUROB_TR[s.replace(/\s+/g,' ').trim()]||s;
const html=await readFile('programs.html','utf8');
const clean=s=>s.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const programs=[];
const title='رحلة سوريا: 5 مدن في 4 أيام';
const description='من إدلب إلى شوارع دمشق العتيقة، ومن نواعير حماة إلى أسواق حلب التاريخية، نعيش تجربة لا تُنسى في قلب التاريخ والحضارة السورية.';
programs.push({slug:'syria-cultural-tour',status:'published',sort_order:0,content:{image:'/assets/img/prog-syria.jpg',gallery:['/assets/img/prog-syria-2.jpg','/assets/img/prog-syria-3.jpg'],featured:true,publishedAt:'2026-10-01',registrationUrl:'https://forms.gle/VoqKDVc3SyeDjxm26',locales:{ar:{title,description,imageAlt:title,badge:'سوريا • 4 أيام',details:'16–19 نوفمبر 2026\nإدلب، حماة، حمص، دمشق، حلب\n450$ للطلاب والمدرسين • 520$ السعر العام',button:'سجّل الآن'},tr:{title:tr(title),description:tr(description),imageAlt:tr(title),badge:'Suriye • 4 gün',details:'16–19 Kasım 2026\nİdlib, Hama, Humus, Şam, Halep\nÖğrenci ve öğretmenler: 450$ • Genel fiyat: 520$',button:'Şimdi kaydol'}}}});
let i=1;
for(const m of html.matchAll(/<article class="d-progs-card">([\s\S]*?)<\/article>/g)){
 const s=m[1],get=c=>clean(s.match(new RegExp('class="'+c+'"[^>]*>([\\s\\S]*?)<\\/[^>]+>'))?.[1]||'');
 const title=get('d-progs-card__title'),description=get('d-progs-card__desc'),badge=get('d-progs-card__badge');
 const details=[...s.matchAll(/<span>([^<]+)<\/span>/g)].map(x=>clean(x[1])).join('\n');
 programs.push({slug:['jordan-six-weeks','jordan-summer-camp','saudi-arabia-camp'][i-1],status:'published',sort_order:i++,content:{image:'/'+s.match(/src="([^"]+)"/)[1],gallery:[],featured:false,publishedAt:'2026-10-01',registrationUrl:'tel:+905347308092',locales:{ar:{title,description,imageAlt:title,badge,details,button:'طلب تفاصيل البرنامج'},tr:{title:tr(title),description:tr(description),imageAlt:tr(title),badge:tr(badge),details:details.split('\n').map(tr).join('\n'),button:'Program ayrıntılarını iste'}}}});
}
const articles=JSON.parse(await readFile('content/articles.json','utf8')).map((p,i)=>{const {id,slug,status,...content}=p;return {slug,status,sort_order:i,content};});
const literal=value=>"'"+JSON.stringify(value).replaceAll("'","''")+"'::jsonb";
const sql=[['cms_articles',articles],['cms_programs',programs]].map(([table,rows])=>rows.map(r=>`insert into public.${table}(slug,status,sort_order,content) values('${r.slug}','${r.status}',${r.sort_order},${literal(r.content)}) on conflict(slug) do nothing;`).join('\n')).join('\n');
await mkdir('tmp',{recursive:true});await writeFile('tmp/cms-seed.sql',sql);
console.log(`Prepared ${articles.length} articles and ${programs.length} programs.`);
