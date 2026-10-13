import React, { createContext, useContext } from "react";
import { articlePath, SiteLink, useLocale } from "../locale.jsx";
import { safeURL } from "../model.js";
export const ContentContext = createContext({ articles: [], programs: [] });
export const labels = {
  ar: {
    articles: "مقالاتنا",
    programs: "البرامج والمخيمات",
    more: "المزيد",
    empty: "لا توجد مواد منشورة حالياً.",
    read: "اقرأ المقال",
    details: "تفاصيل البرنامج",
  },
  tr: {
    articles: "Yazılarımız",
    programs: "Programlar ve kamplar",
    more: "Tümünü gör",
    empty: "Henüz yayımlanmış içerik bulunmuyor.",
    read: "Yazıyı oku",
    details: "Program ayrıntıları",
  },
};
export function ArticleCard({ row }) {
  const { lang } = useLocale(),
    c = row.content,
    v = c.locales[lang],
    l = labels[lang];
  return (
    <article className="article-card">
      <SiteLink href={articlePath(lang, row.slug)}>
        <img
          src={safeURL(c.image, true)}
          alt={v.imageAlt || v.title}
          width="800"
          height="520"
          loading="lazy"
        />
        <div className="article-card-copy">
          <span className="article-category">{v.category}</span>
          <h2>{v.title}</h2>
          <p>{v.description}</p>
          <div className="article-meta">
            <time dateTime={c.publishedAt}>{c.publishedAt}</time>
            <span>{l.read} ↗</span>
          </div>
        </div>
      </SiteLink>
    </article>
  );
}
export function ProgramCard({ row }) {
  const { lang } = useLocale(),
    c = row.content,
    v = c.locales[lang],
    l = labels[lang];
  return (
    <article
      className={"cms-program " + (c.featured ? "cms-featured" : "")}
      data-program={row.slug}
    >
      <img
        className="cms-program-image"
        src={safeURL(c.image, true)}
        alt={v.imageAlt || v.title}
        width="800"
        height="520"
        loading="lazy"
      />
      <div className="cms-program-copy">
        <span className="article-category">{v.badge}</span>
        <h2>{v.title}</h2>
        <p>{v.description}</p>
        <ul>
          {(v.details || "")
            .split(/\n|\\n/)
            .filter(Boolean)
            .map((s, i) => (
              <li key={i}>{s}</li>
            ))}
        </ul>
        {c.gallery?.length > 0 && (
          <div className="cms-gallery">
            {c.gallery.map((src, i) => (
              <img
                key={i}
                src={safeURL(src, true)}
                alt={v.imageAlt || v.title}
                loading="lazy"
                width="320"
                height="200"
              />
            ))}
          </div>
        )}
        {safeURL(c.registrationUrl) && (
          <a
            className="cms-button"
            href={safeURL(c.registrationUrl)}
            rel="noopener"
          >
            {v.button || l.details} ↗
          </a>
        )}
      </div>
    </article>
  );
}
export function ContentSection({ kind, home = false, rows }) {
  const data = useContext(ContentContext),
    { lang } = useLocale(),
    l = labels[lang];
  rows = (rows || data[kind]).filter((r) => r.status === "published");
  return (
    <section
      className="cms-shell"
      data-cms={kind}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="cms-section-head">
        <h2>{l[kind]}</h2>
        {home && (
          <SiteLink
            href={kind === "articles" ? articlePath(lang) : "/programs.html"}
          >
            {l.more} ↗
          </SiteLink>
        )}
      </div>
      <div
        className={kind === "articles" ? "article-grid" : "cms-program-grid"}
      >
        {rows.length ? (
          rows
            .slice(0, home ? 3 : rows.length)
            .map((r) =>
              kind === "articles" ? (
                <ArticleCard key={r.id} row={r} />
              ) : (
                <ProgramCard key={r.id} row={r} />
              ),
            )
        ) : (
          <p>{l.empty}</p>
        )}
      </div>
    </section>
  );
}
export function FeaturedPrograms() {
  const { programs } = useContext(ContentContext),
    published = programs.filter((r) => r.status === "published"),
    featured = published.filter((r) => r.content.featured);
  return (
    <ContentSection
      kind="programs"
      home
      rows={featured.length ? featured : published.slice(0, 1)}
    />
  );
}
