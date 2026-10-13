import { build, loadEnv } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
const root = process.cwd(),
  env = loadEnv("production", root, ""),
  site = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || "").replace(
    /\/$/,
    "",
  );
if (site && !/^https?:\/\//.test(site))
  throw new Error("VITE_SITE_URL must be an absolute HTTP(S) origin");
await build({
  build: {
    ssr: "src/entry-server.jsx",
    outDir: "tmp/ssr",
    emptyOutDir: true,
    manifest: false,
  },
});
const { render } = await import(
  pathToFileURL(path.join(root, "tmp/ssr/entry-server.js"))
);
const data = JSON.parse(await readFile("content/site.json", "utf8")),
  template = await readFile("dist/index.html", "utf8");
const routes = [
  "/",
  "/programs.html",
  "/contact.html",
  "/admin/",
  "/articles/",
  "/tr/articles/",
  ...data.articles
    .filter((a) => a.status === "published")
    .flatMap((a) => [
      "/articles/" + a.slug + "/",
      "/tr/articles/" + a.slug + "/",
    ]),
];
for (const route of routes) {
  const result = render(route, data);
  const html = template
    .replace(
      '<html lang="ar" dir="rtl">',
      `<html lang="${result.lang}" dir="${result.lang === "ar" ? "rtl" : "ltr"}">`,
    )
    .replace(
      "<body>",
      route.includes("/articles") ? '<body class="editorial-body">' : "<body>",
    )
    .replace("<!--seo-->", result.head)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="${result.lang}">${result.html}</div>`,
    );
  const output = route.endsWith("/")
    ? "dist" + route + "index.html"
    : "dist" + route;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}
await writeFile(
  "dist/404.html",
  template
    .replace("<!--seo-->", render("/not-found").head)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${render("/not-found").html}</div>`,
    ),
);
if (site)
  await writeFile(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      routes
        .filter((r) => r !== "/admin/")
        .map((r) => `<url><loc>${site + r}</loc></url>`)
        .join("") +
      "</urlset>",
  );
await writeFile(
  "dist/robots.txt",
  "User-agent: *\nDisallow: /admin/\n" +
    (site ? "Sitemap: " + site + "/sitemap.xml\n" : ""),
);
console.log(
  `Pre-rendered ${routes.length} React pages. ${site ? "SEO origin: " + site : "Set VITE_SITE_URL before production deployment to enable canonical URLs and sitemap."}`,
);
