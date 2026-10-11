import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {esc,safeURL,parseBlocks,blocksText,validateRecord} from '../js/cms-model.mjs';
import {renderArticles,cmsSection,replaceBand} from '../server/cms-render.mjs';
const articles=JSON.parse(await readFile('content/articles.json','utf8')).map(p=>({id:p.id,slug:p.slug,status:p.status,content:p,updated_at:'2026-10-10T00:00:00Z'}));
const template=await readFile('templates/editorial.html','utf8');
test('content rendering escapes active markup and rejects unsafe links',()=>{
 assert.equal(esc('<script>"&'), '&lt;script&gt;&quot;&amp;');
 for(const s of ['javascript:alert(1)','data:text/html,test','//evil.example/','https://user:pass@example.com'])assert.equal(safeURL(s),'');
 assert.equal(safeURL('/assets/img/logo.png',true),'/assets/img/logo.png');
 assert.equal(safeURL('tel:+905347308092'),'tel:+905347308092');
});
test('text editor preserves structured headings and lists without HTML',()=>{const s='## Heading\n\nParagraph <img>\n\n### Subheading\n\n- Item';const blocks=parseBlocks(s);assert.deepEqual(blocks.map(b=>b.type),['h2','p','h3','li']);assert.equal(blocksText(blocks),s);});
test('published article HTML has content, canonical, hreflang and structured data in both languages',()=>{
 for(const lang of ['ar','tr']){const html=renderArticles(template,articles,lang,articles[0].slug);assert.ok(html.includes(esc(articles[0].content.locales[lang].title)));assert.match(html,/BlogPosting/);assert.match(html,/dateModified/);assert.match(html,/hreflang="tr"/);assert.match(html,/rel="canonical"/);assert.ok(!html.includes('{{'));assert.ok(html.includes('/assets/traffic.js'));}
});
test('deleted or unpublished article is never served from old generated files',()=>{assert.equal(renderArticles(template,[], 'ar',articles[0].slug),null);});
test('archive handles empty state and paginates without duplicate canonical URLs',()=>{assert.match(renderArticles(template,[],'tr'),/Henüz/);const rows=Array.from({length:13},(_,i)=>({...articles[0],id:i,slug:'post-'+i}));const html=renderArticles(template,rows,'ar','',2);assert.match(html,/canonical[^>]+\?page=2/);assert.equal(renderArticles(template,rows,'ar','',3),null);});
test('bilingual CMS sections preserve the rest of desktop and mobile pages',async()=>{
 for(const [path,bands] of [['index.html',['band--d-articles','band--m-articles','band--d-program','band--m-program']],['programs.html',['band--d-features','band--d-academy']]]){
  const original=await readFile(path,'utf8');let html=original;for(const b of bands)html=replaceBand(html,b,cmsSection(articles,'articles',true));
  assert.equal((html.match(/<\/body>/g)||[]).length,1);assert.ok(html.includes('page--desktop'));assert.ok(html.includes('page--mobile'));assert.ok(html.includes('band--d-footer'));assert.ok(html.includes('band--m-footer'));assert.equal((html.match(/data-cms="articles"/g)||[]).length,bands.length);
 }
});
test('CMS validation requires both locales and safe image and registration URLs',()=>{
 const row={slug:'valid-post',status:'published',sort_order:0,content:structuredClone(articles[0].content)};assert.equal(validateRecord(row,'articles'),row);
 const bad=structuredClone(row);bad.content.locales.tr.title='';assert.throws(()=>validateRecord(bad,'articles'));
 bad.content.locales.tr.title='Title';bad.content.image='javascript:bad';assert.throws(()=>validateRecord(bad,'articles'));
});
