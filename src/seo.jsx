import React from "react";
import { SITE_URL } from "./config.js";
import { articlePath } from "./locale.jsx";
export function resolveRoute(path) {
  const u = new URL(path, "https://local.invalid");
  const pathname = u.pathname,
    match = pathname.match(/^\/(tr\/)?articles(?:\/(?:([a-z0-9-]+)\/?)?)?$/);
  const lang = match
    ? match[1]
      ? "tr"
      : "ar"
    : u.searchParams.get("lang") === "tr"
      ? "tr"
      : "ar";
  return {
    pathname,
    lang,
    kind:
      pathname === "/admin" || pathname === "/admin/"
        ? "admin"
        : match
          ? "articles"
          : pathname === "/programs.html"
            ? "programs"
            : pathname === "/contact.html"
              ? "contact"
              : ["/", "/index.html"].includes(pathname)
                ? "home"
                : "404",
    slug: match?.[2] || "",
    page: Math.max(1, parseInt(u.searchParams.get("page"), 10) || 1),
  };
}
export function metadata(path, data) {
  const r = resolveRoute(path),
    post = r.slug
      ? data.articles.find((p) => p.slug === r.slug && p.status === "published")
      : null,
    v = post?.content.locales[r.lang],
    brand = r.lang === "ar" ? "دروب العربية" : "Durob Alarabia",
    titles = {
      ar: {
        home: "معا نتعلم اللغة ونعيش الثقافة الاردنية",
        programs: "البرامج التعليمية والرحلات",
        contact: "اتصل بنا",
        articles: "مقالاتنا",
        admin: "لوحة الإدارة",
        404: "الصفحة غير موجودة",
      },
      tr: {
        home: "Birlikte Arapça Öğrenelim ve Ürdün Kültürünü Yaşayalım",
        programs: "Eğitim programları ve geziler",
        contact: "Bize Ulaşın",
        articles: "Yazılarımız",
        admin: "Yönetim paneli",
        404: "Sayfa bulunamadı",
      },
    };
  if (
    r.kind === "articles" &&
    ((r.slug && !post) ||
      (!r.slug &&
        r.page >
          Math.max(
            1,
            Math.ceil(
              data.articles.filter((a) => a.status === "published").length / 12,
            ),
          )))
  )
    r.kind = "404";
  const pathCanonical =
    r.kind === "articles"
      ? articlePath(r.lang, r.slug) + (r.page > 1 ? "?page=" + r.page : "")
      : (r.pathname === "/index.html" ? "/" : r.pathname) +
        (r.lang === "tr" ? "?lang=tr" : "");
  const canonical = SITE_URL ? SITE_URL + pathCanonical : "";
  return {
    ...r,
    title: (v?.seoTitle || v?.title || titles[r.lang][r.kind]) + " — " + brand,
    description:
      v?.description ||
      (r.lang === "ar"
        ? "دروب العربية: تعلم اللغة العربية وعش الثقافة واكتشف برامجنا ومخيماتنا."
        : "Durob Alarabia: Arapça öğrenin, kültürü yaşayın ve dil kamplarımızı keşfedin."),
    canonical,
    image: post?.content.image || "/assets/img/logo.png",
    schema:
      post && canonical
        ? {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                headline: v.title,
                description: v.description,
                datePublished: post.content.publishedAt,
                dateModified: post.updated_at || post.content.publishedAt,
                inLanguage: r.lang,
                image: [new URL(post.content.image, SITE_URL).href],
                author: {
                  "@type": "Organization",
                  name: post.content.author?.name || brand,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Durob Alarabia",
                  logo: {
                    "@type": "ImageObject",
                    url: SITE_URL + "/assets/img/logo.png",
                  },
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: titles[r.lang].home,
                    item: SITE_URL + "/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: titles[r.lang].articles,
                    item: SITE_URL + articlePath(r.lang),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: v.title,
                    item: canonical,
                  },
                ],
              },
            ],
          }
        : r.kind === "articles" && canonical
          ? {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: titles[r.lang].articles,
              url: canonical,
              inLanguage: r.lang,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: data.articles
                  .filter((a) => a.status === "published")
                  .slice((r.page - 1) * 12, r.page * 12)
                  .map((a, i) => ({
                    "@type": "ListItem",
                    position: (r.page - 1) * 12 + i + 1,
                    url: SITE_URL + articlePath(r.lang, a.slug),
                    name: a.content.locales[r.lang].title,
                  })),
              },
            }
          : null,
  };
}
export function Seo({ path, data }) {
  const m = metadata(path, data);
  return (
    <>
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      <meta
        name="robots"
        content={
          m.kind === "admin" || m.kind === "404"
            ? "noindex,nofollow"
            : "index,follow"
        }
      />
      {m.canonical && <link rel="canonical" href={m.canonical} />}
      <meta property="og:type" content={m.slug ? "article" : "website"} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      {SITE_URL && (
        <>
          <meta property="og:url" content={m.canonical} />
          <meta property="og:image" content={new URL(m.image, SITE_URL).href} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {SITE_URL &&
        m.kind !== "admin" &&
        m.kind !== "404" &&
        ["ar", "tr", "x-default"].map((l) => {
          const lang = l === "x-default" ? "ar" : l;
          return (
            <link
              key={l}
              rel="alternate"
              hrefLang={l}
              href={
                SITE_URL +
                (m.kind === "articles"
                  ? articlePath(lang, m.slug) +
                    (m.page > 1 ? "?page=" + m.page : "")
                  : (m.pathname === "/index.html" ? "/" : m.pathname) +
                    (lang === "tr" ? "?lang=tr" : ""))
              }
            />
          );
        })}
      {m.schema && (
        <script type="application/ld+json">
          {JSON.stringify(m.schema).replaceAll("<", "\u003c")}
        </script>
      )}
    </>
  );
}
