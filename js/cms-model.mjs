export const SITE='https://durobalrabia.netlify.app';
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const route=(lang,slug='')=>(lang==='tr'?'/tr':'')+'/articles/'+(slug?slug+'/':'');
export function safeURL(value, image=false) {
 const v=String(value||'').trim();
 if(/^\/(?!\/)[a-zA-Z0-9/_.,%?=&+-]+$/.test(v)) return v;
 try{const u=new URL(v);if(u.protocol==='https:'&&!u.username&&!u.password)return u.href;if(!image&&/^(tel:|mailto:)/.test(u.protocol))return v;}catch{}
 return '';
}
export function parseBlocks(text) {
 return text.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean).map(s=>{
  for(const [prefix,type] of [['### ','h3'],['## ','h2'],['- ','li']])if(s.startsWith(prefix))return {type,text:s.slice(prefix.length).trim()};
  return {type:'p',text:s};
 });
}
export const blocksText=blocks=>(blocks||[]).map(b=>({h2:'## ',h3:'### ',li:'- '}[b.type]||'')+b.text).join('\n\n');
export function validateRecord(row,kind) {
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)||row.slug.length>100)throw new Error('slug');
 if(!['draft','published'].includes(row.status))throw new Error('status');
 if(!Number.isInteger(row.sort_order)||Math.abs(row.sort_order)>100000)throw new Error('order');
 if(!safeURL(row.content.image,true))throw new Error('image');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(row.content.publishedAt)||isNaN(Date.parse(row.content.publishedAt)))throw new Error('date');
 if(kind==='programs'&&row.content.registrationUrl&&!safeURL(row.content.registrationUrl))throw new Error('url');
 if(kind==='programs'&&row.content.gallery?.some(src=>!safeURL(src,true)))throw new Error('gallery');
 for(const lang of ['ar','tr']){
  const v=row.content.locales?.[lang];
  if(!v?.title?.trim()||v.title.length>250||!v.description?.trim()||v.description.length>2000)throw new Error('locales');
  if(kind==='articles'&&(!v.blocks?.length||v.blocks.some(b=>!['p','h2','h3','li'].includes(b.type)||!b.text?.trim())))throw new Error('blocks');
 }
 if(JSON.stringify(row.content).length>150000)throw new Error('size');
 return row;
}
