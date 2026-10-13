import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  safeURL,
  validateRecord,
  parseBlocks,
  blocksText,
} from "../src/model.js";
import { render } from "../tmp/ssr/entry-server.js";
const data = JSON.parse(await readFile("content/site.json", "utf8"));
test("all public React pages render without old backend scripts", () => {
  for (const path of [
    "/",
    "/programs.html",
    "/contact.html",
    "/articles/",
    "/tr/articles/",
    "/admin/",
  ]) {
    const r = render(path, data);
    assert.equal(r.status, 200);
    assert.ok(r.html.length > 100);
    assert.ok(!/supabase|netlify|assets\/admin\.js/.test(r.html));
  }
});
test("articles are complete HTML and localized before any browser JavaScript", () => {
  for (const lang of ["ar", "tr"]) {
    const path =
      (lang === "tr" ? "/tr" : "") + "/articles/" + data.articles[0].slug + "/";
    const r = render(path, data);
    assert.equal(r.lang, lang);
    assert.ok(r.html.includes(data.articles[0].content.locales[lang].title));
    assert.ok(
      r.html.includes(data.articles[0].content.locales[lang].blocks[0].text),
    );
    assert.match(r.head, /<title>/);
    assert.equal((r.html.match(/<h1/g) || []).length, 1);
  }
});
test("draft and removed article routes do not render published article content", () => {
  const slug = data.articles[0].slug;
  const draft = structuredClone(data);
  draft.articles[0].status = "draft";
  assert.equal(render("/articles/" + slug + "/", draft).status, 404);
  const removed = structuredClone(data);
  removed.articles = [];
  assert.equal(render("/tr/articles/" + slug + "/", removed).status, 404);
  assert.equal(render("/articles/?page=999", data).status, 404);
});
test("both layout compositions and bento cards remain in the React homepage", () => {
  const r = render("/?lang=tr", data);
  assert.match(r.html, /page--desktop/);
  assert.match(r.html, /page--mobile/);
  assert.match(r.html, /d-features__row/);
  assert.match(r.html, /mf-pair/);
  assert.match(r.html, /data-yt="AoOTpDCN2tM"/);
  assert.match(r.html, /Birlikte Arapça/);
});
test("React escapes article content rather than inserting raw HTML", () => {
  const x = structuredClone(data);
  x.articles[0].content.locales.ar.blocks[0].text =
    "<img src=x onerror=alert(1)>";
  const r = render("/articles/" + x.articles[0].slug + "/", x);
  assert.ok(r.html.includes("&lt;img"));
  assert.ok(!r.html.includes("<img src=x"));
});
test("URL and editor validation reject active markup and require both languages", () => {
  for (const s of [
    "javascript:alert(1)",
    "data:text/html,bad",
    "//evil.example",
    "https://user:pass@example.com",
  ])
    assert.equal(safeURL(s), "");
  const row = structuredClone(data.articles[0]);
  assert.equal(validateRecord(row, "articles"), row);
  row.content.locales.tr.title = "";
  assert.throws(() => validateRecord(row, "articles"));
});
test("structured text editor round trips heading and paragraph blocks", () => {
  const text = "## Heading\n\nParagraph\n\n### Subtitle\n\n- Item";
  assert.equal(blocksText(parseBlocks(text)), text);
});
test("handoff snapshot contains no user accounts or authentication fields", () => {
  assert.deepEqual(Object.keys(data).sort(), ["articles", "programs"]);
  assert.ok(
    !/sb_publishable_|service_role|password|auth\.users/.test(
      JSON.stringify(data),
    ),
  );
});
