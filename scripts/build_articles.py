import argparse, html, json, re, shutil
from pathlib import Path
from datetime import date
from urllib.parse import urlparse
ROOT = Path(__file__).resolve().parent.parent
SITE = 'https://durobalrabia.netlify.app'
DATA = ROOT / 'content/articles.json'
TEMPLATE = (ROOT / 'templates/editorial.html').read_text(encoding='utf-8')
LABELS = {
 'ar': {'brand':'دروب العربية','articles':'مقالاتنا','intro':'حكايات وأفكار عن اللغة العربية والثقافة والسفر.','home':'الرئيسية','features':'المميزات','programs':'البرامج','contact':'اتصل بنا','points':'مسابقة النقاط','read':'اقرأ المقال','related':'مقالات ذات صلة','toc':'في هذا المقال','skip':'انتقل إلى المحتوى','author':'نُشر على دروب العربية','back':'جميع المقالات','minutes':'دقائق قراءة','cta':'عيش اللغة والثقافة معنا','ctaBody':'اكتشف برامجنا ومخيماتنا التعليمية.','discover':'اكتشف البرامج'},
 'tr': {'brand':'Durob Alarabia','articles':'Yazılarımız','intro':'Arapça, kültür ve seyahat üzerine hikâyeler ve fikirler.','home':'Ana Sayfa','features':'Özellikler','programs':'Programlar','contact':'Bize Ulaşın','points':'Puan Yarışması','read':'Yazıyı oku','related':'İlgili yazılar','toc':'Bu yazıda','skip':'İçeriğe geç','author':'Durob Alarabia’da yayımlandı','back':'Tüm yazılar','minutes':'dakika okuma','cta':'Dili ve kültürü birlikte yaşayalım','ctaBody':'Eğitim programlarımızı ve dil kamplarımızı keşfedin.','discover':'Programları keşfet'}
}
def esc(s): return html.escape(str(s), quote=True)
def route(lang,slug=None): return ('/tr' if lang=='tr' else '')+'/articles/'+(slug+'/' if slug else '')
def site_page(name,lang): return '/'+name+('?lang='+lang)
def load():
 posts=json.loads(DATA.read_text(encoding='utf-8')); seen=set()
 for p in posts:
  assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',p['slug']), 'Invalid slug'
  assert p['slug'] not in seen, 'Duplicate slug'
  seen.add(p['slug']);date.fromisoformat(p['publishedAt'])
  assert p['status'] in ('draft','published')
  assert (ROOT / p['image'].lstrip('/')).is_file(), 'Missing image'
  for locale,v in p['locales'].items():
   assert locale in LABELS and v['title'] and v['description'] and v['blocks']
   for b in v['blocks']: assert b['type'] in ('p','h2','h3','li') and b['text'], 'Invalid content block'
 return sorted((p for p in posts if p['status']=='published'),key=lambda p:(p['publishedAt'],p['slug']),reverse=True)
def header(lang,url,alt):
 l=LABELS[lang]
 switch='<nav class="language-switch" aria-label="Language / Dil">'+''.join(f'<a href="{alt[k]}" lang="{k}" data-language="{k}"'+(' aria-current="true"' if k==lang else '')+f'>{k.upper()}</a>' for k in alt)+'</nav>'
 links=f'<a href="{site_page("contact.html",lang)}">{l["contact"]}</a><a href="{site_page("programs.html",lang)}">{l["programs"]}</a><a href="{site_page("index.html",lang)}#d-features">{l["features"]}</a><a href="{site_page("index.html",lang)}">{l["home"]}</a>'
 desktop=f'<div class="page page--desktop"><header class="d-header-sticky"><div class="d-header-liquid"><div class="d-header__side">{switch}</div><nav class="d-nav" aria-label="Main navigation">{links}</nav><a class="d-logo" href="{site_page("index.html",lang)}"><span>{l["brand"]}</span><img src="/assets/img/logo.png" width="49" height="56" alt="" /></a></div></header></div>'
 mobile=f'<header class="editorial-mobile"><a href="{site_page("index.html",lang)}"><img src="/assets/img/logo.png" width="36" height="42" alt="" />{l["brand"]}</a>{switch}</header><nav class="editorial-mobile-links">{links}</nav>'
 return desktop+mobile
def render(lang,title,description,path,alt,content,schema,image,article=False):
 l=LABELS[lang];canonical=SITE+path
 values={'lang':lang,'dir':'rtl' if lang=='ar' else 'ltr','title':esc(title+' — '+l['brand']),'description':esc(description),'canonical':canonical,'ogtype':'article' if article else 'website','image':SITE+image,'alternates':''.join(f'<link rel="alternate" hreflang="{k}" href="{SITE+v}" />' for k,v in alt.items())+f'<link rel="alternate" hreflang="x-default" href="{SITE+alt.get("ar",path)}" />','schema':json.dumps(schema,ensure_ascii=False).replace('<','\\u003c'),'header':header(lang,path,alt),'content':content,'skip':l['skip'],'home':site_page('index.html',lang),'brand':l['brand'],'archive':route(lang),'articlesLabel':l['articles'],'contact':site_page('contact.html',lang),'contactLabel':l['contact']}
 page=TEMPLATE
 for k,v in values.items():page=page.replace('{{'+k+'}}',v)
 out=ROOT/path.lstrip('/')/'index.html';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(page,encoding='utf-8')
def card(p,lang):
 v=p['locales'][lang];l=LABELS[lang]
 return f'<article class="article-card"><a href="{route(lang,p["slug"])}"><img src="{p["image"]}" alt="{esc(v["imageAlt"])}" width="800" height="520" loading="lazy" /><div class="article-card-copy"><span class="article-category">{esc(v["category"])}</span><h2>{esc(v["title"])}</h2><p>{esc(v["description"])}</p><div class="article-meta"><time datetime="{p["publishedAt"]}">{p["publishedAt"]}</time><span>{l["read"]} ↗</span></div></div></a></article>'
def build():
 posts=load();urls=[]
 # These two trees contain generated HTML only. Remove stale published pages.
 for relative in ('articles','tr/articles'):
  target=(ROOT/relative).resolve()
  assert target.is_relative_to(ROOT.resolve())
  if target.exists():
   for old in target.rglob('index.html'): old.unlink()
 for lang,l in LABELS.items():
  localized=[p for p in posts if lang in p['locales']];path=route(lang);urls.append(path)
  alt={k:route(k) for k in LABELS};content=f'<section class="archive-head"><span class="article-category">{l["brand"]}</span><h1>{l["articles"]}</h1><p>{l["intro"]}</p></section><section class="article-grid" aria-label="{l["articles"]}">'+''.join(card(p,lang) for p in localized)+'</section>'
  schema={'@context':'https://schema.org','@type':'CollectionPage','name':l['articles'],'url':SITE+path,'inLanguage':lang,'mainEntity':{'@type':'ItemList','itemListElement':[{'@type':'ListItem','position':i+1,'url':SITE+route(lang,p['slug'])} for i,p in enumerate(localized)]}}
  render(lang,l['articles'],l['intro'],path,alt,content,schema,'/assets/img/manuscript.jpg')
  for p in localized:
   v=p['locales'][lang];path=route(lang,p['slug']);urls.append(path);alt={k:route(k,p['slug']) for k in p['locales']};body='';toc=[]
   for i,b in enumerate(v['blocks']):
    typ=b['type'];anchor=f'section-{i}'
    if typ=='h2':toc.append(f'<li><a href="#{anchor}">{esc(b["text"])}</a></li>')
    # Isolated list blocks are wrapped in a semantic list.
    if typ=='li':body+=f'<ul><li>{esc(b["text"])}</li></ul>'
    else:body+=f'<{typ} id="{anchor}">{esc(b["text"])}</{typ}>'
   minutes=max(1,round(sum(len(b['text'].split()) for b in v['blocks'])/180));crumb=f'<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="{site_page("index.html",lang)}">{l["home"]}</a><span>/</span><a href="{route(lang)}">{l["articles"]}</a></nav>'
   content=crumb+f'<article><header class="article-head"><span class="article-category">{esc(v["category"])}</span><h1>{esc(v["title"])}</h1><p>{esc(v["description"])}</p><div class="article-meta"><span>{l["author"]}</span><time datetime="{p["publishedAt"]}">{p["publishedAt"]}</time><span>{minutes} {l["minutes"]}</span></div></header><img class="article-cover" src="{p["image"]}" alt="{esc(v["imageAlt"])}" width="1200" height="700" fetchpriority="high" /><div class="article-reading"><aside class="article-toc"><h2>{l["toc"]}</h2><ol>{"".join(toc)}</ol></aside><div class="article-prose">{body}</div></div></article><section class="article-cta"><h2>{l["cta"]}</h2><p>{l["ctaBody"]}</p><a href="{site_page("programs.html",lang)}">{l["discover"]} ↗</a></section><section class="related"><h2>{l["related"]}</h2><div class="article-grid">'+''.join(card(q,lang) for q in localized if q['slug']!=p['slug'])+'</div></section>'
   schema={'@context':'https://schema.org','@graph':[{'@type':'BlogPosting','headline':v['title'],'description':v['description'],'image':[SITE+p['image']],'datePublished':p['publishedAt'],'inLanguage':lang,'author':{'@type':p['author']['type'],'name':p['author']['name'],'url':SITE+'/'},'publisher':{'@type':'Organization','name':'Durob Alarabia','logo':{'@type':'ImageObject','url':SITE+'/assets/img/logo.png'}},'mainEntityOfPage':{'@type':'WebPage','@id':SITE+path}}, {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':l['home'],'item':SITE+'/'},{'@type':'ListItem','position':2,'name':l['articles'],'item':SITE+route(lang)},{'@type':'ListItem','position':3,'name':v['title'],'item':SITE+path}]}]}
   render(lang,v.get('seoTitle',v['title']),v['description'],path,alt,content,schema,p['image'],True)
 urls+=['/','/programs.html','/contact.html']
 (ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{SITE+u}</loc></url>' for u in urls)+'</urlset>',encoding='utf-8')
 (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+SITE+'/sitemap.xml\n',encoding='utf-8')
 print(f'Built {len(posts)} articles in two languages; {len(urls)} sitemap URLs.')
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--publish',action='store_true');args=parser.parse_args();build()
 if args.publish:
  out=(ROOT/'dist').resolve(); assert out.parent == ROOT.resolve()
  if out.exists():
   for f in sorted(out.rglob('*'),key=lambda p:len(p.parts),reverse=True):
    if f.is_file(): f.unlink()
    elif f.is_dir(): f.rmdir()
  out.mkdir(exist_ok=True)
  for folder in ['assets','css','js','articles','tr']:shutil.copytree(ROOT/folder,out/folder,dirs_exist_ok=True)
  for f in [*ROOT.glob('*.html'),ROOT/'robots.txt',ROOT/'sitemap.xml']:shutil.copy2(f,out/f.name)
