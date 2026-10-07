import importlib.util,json,tempfile,unittest
from pathlib import Path
from html.parser import HTMLParser
from xml.etree import ElementTree
spec=importlib.util.spec_from_file_location('builder',Path(__file__).resolve().parents[1]/'scripts/build_articles.py');builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
class Scan(HTMLParser):
 def __init__(self):super().__init__();self.tags=[]
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
class ArticlesTest(unittest.TestCase):
 def test_static_metadata_and_local_links(self):
  builder.build()
  pages=[*builder.ROOT.glob('articles/**/index.html'),*builder.ROOT.glob('tr/articles/**/index.html')]
  self.assertEqual(len(pages),8)
  for page in pages:
   text=page.read_text(encoding='utf-8');scan=Scan();scan.feed(text)
   self.assertEqual(sum(tag=='h1' for tag,_ in scan.tags),1)
   canonical=[a['href'] for tag,a in scan.tags if tag=='link' and a.get('rel')=='canonical'];self.assertEqual(len(canonical),1)
   expected='/'+page.parent.relative_to(builder.ROOT).as_posix()+'/'
   self.assertEqual(canonical[0],builder.SITE+expected)
   alternatives={a['hreflang']:a['href'] for tag,a in scan.tags if tag=='link' and a.get('rel')=='alternate'}
   self.assertEqual(set(alternatives),{'ar','tr','x-default'})
   self.assertNotIn('{{',text);self.assertNotIn('js/language.js',text)
   schema=json.loads(text.split('<script type="application/ld+json">')[1].split('</script>')[0]);self.assertIn('@context',schema)
   for tag,a in scan.tags:
    target=a.get('href') if tag=='a' else a.get('src') if tag in ('img','script') else None
    if target and target.startswith('/'):
     target=target.split('?')[0].split('#')[0];file=builder.ROOT/target.lstrip('/')
     self.assertTrue((file/'index.html').exists() if target.endswith('/') else file.exists(),target)
  ElementTree.parse(builder.ROOT/'sitemap.xml')
 def test_draft_and_removed_posts_do_not_remain_public(self):
  original_root,original_data=builder.ROOT,builder.DATA
  posts=json.loads(original_data.read_text(encoding='utf-8'));posts[0]['status']='draft'
  try:
   with tempfile.TemporaryDirectory() as td:
    builder.ROOT=Path(td);builder.DATA=Path(td)/'articles.json';builder.DATA.write_text(json.dumps(posts),encoding='utf-8')
    for p in posts:
     image=builder.ROOT/p['image'].lstrip('/');image.parent.mkdir(parents=True,exist_ok=True);image.touch()
    stale=builder.ROOT/'articles'/posts[0]['slug']/'index.html';stale.parent.mkdir(parents=True);stale.write_text('old')
    builder.build();self.assertFalse(stale.exists());self.assertNotIn(posts[0]['slug'],(builder.ROOT/'sitemap.xml').read_text())
  finally:builder.ROOT,builder.DATA=original_root,original_data
if __name__=='__main__':unittest.main()
