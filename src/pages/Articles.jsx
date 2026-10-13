import React, { useContext } from "react";
import { ContentContext, ArticleCard, labels } from "../components/Content.jsx";
import { StickyHeader } from "../components/Interactions.jsx";
import {
  LanguageSwitch,
  SiteLink,
  useLocale,
  articlePath,
} from "../locale.jsx";
import { safeURL } from "../model.js";
export function EditorialHeader() {
  const { lang, t } = useLocale(),
    links = (
      <>
        <SiteLink href="/contact.html">{t("اتصل بنا")}</SiteLink>
        <SiteLink href="/programs.html">{t("البرامج")}</SiteLink>
        <SiteLink href="/index.html#d-features">{t("المميزات")}</SiteLink>
        <SiteLink href="/index.html">{t("الرئيسية")}</SiteLink>
      </>
    );
  return (
    <>
      <div className="page page--desktop">
        <StickyHeader className="d-header-sticky">
          <div className="d-header-liquid">
            <div className="d-header__side">
              <LanguageSwitch />
            </div>
            <nav className="d-nav">{links}</nav>
            <SiteLink className="d-logo" href="/">
              <span>{t("دروب العربية")}</span>
              <img src="/assets/img/logo.png" width="49" height="56" alt="" />
            </SiteLink>
          </div>
        </StickyHeader>
      </div>
      <header className="editorial-mobile">
        <SiteLink href="/">
          <img src="/assets/img/logo.png" width="36" height="42" alt="" />
          {t("دروب العربية")}
        </SiteLink>
        <LanguageSwitch />
      </header>
      <nav className="editorial-mobile-links">{links}</nav>
    </>
  );
}
export function NotFound() {
  const { lang, t } = useLocale();
  return (
    <main className="editorial">
      <h1>404</h1>
      <p>{lang === "ar" ? "هذه الصفحة غير موجودة." : "Bu sayfa bulunamadı."}</p>
      <SiteLink href="/">{t("الرئيسية")}</SiteLink>
    </main>
  );
}
export default function Articles({ slug = "", page = 1 }) {
  const { lang, t } = useLocale(),
    { articles } = useContext(ContentContext),
    rows = articles.filter((r) => r.status === "published"),
    post = slug ? rows.find((r) => r.slug === slug) : null,
    v = post?.content.locales[lang],
    l = labels[lang],
    pages = Math.max(1, Math.ceil(rows.length / 12));
  if ((slug && !post) || (!slug && page > pages))
    return (
      <>
        <EditorialHeader />
        <NotFound />
      </>
    );
  const headings =
    v?.blocks.filter((b) => b.type === "h2" || b.type === "h3") || [];
  return (
    <>
      <a className="skip-link" href="#content">
        {lang === "ar" ? "انتقل إلى المحتوى" : "İçeriğe geç"}
      </a>
      <EditorialHeader />
      <main id="content" className="editorial">
        {post ? (
          <>
            <nav className="breadcrumbs">
              <SiteLink href="/">{t("الرئيسية")}</SiteLink>
              <span>/</span>
              <SiteLink href={articlePath(lang)}>{l.articles}</SiteLink>
            </nav>
            <article>
              <header className="article-head">
                <span className="article-category">{v.category}</span>
                <h1>{v.title}</h1>
                <p>{v.description}</p>
                <div className="article-meta">
                  <time dateTime={post.content.publishedAt}>
                    {post.content.publishedAt}
                  </time>
                  <span>
                    {Math.max(
                      1,
                      Math.ceil(
                        v.blocks
                          .map((b) => b.text)
                          .join(" ")
                          .split(/\s+/).length / 180,
                      ),
                    )}{" "}
                    {lang === "ar" ? "دقائق قراءة" : "dakika okuma"}
                  </span>
                  <span>{post.content.author?.name}</span>
                </div>
              </header>
              <img
                className="article-cover"
                src={safeURL(post.content.image, true)}
                alt={v.imageAlt || v.title}
                width="1200"
                height="780"
              />
              <div className="article-reading">
                <aside className="article-toc">
                  <h2>{lang === "ar" ? "في هذا المقال" : "Bu yazıda"}</h2>
                  {headings.map((h, i) => (
                    <a key={i} href={"#section-" + i}>
                      {h.text}
                    </a>
                  ))}
                </aside>
                <div className="article-prose">
                  {v.blocks.map((b, i) => {
                    const Tag = ["p", "h2", "h3"].includes(b.type)
                      ? b.type
                      : "p";
                    return b.type === "li" ? (
                      <ul key={i}>
                        <li>{b.text}</li>
                      </ul>
                    ) : (
                      <Tag
                        key={i}
                        id={
                          Tag === "h2" || Tag === "h3"
                            ? "section-" + headings.indexOf(b)
                            : undefined
                        }
                      >
                        {b.text}
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </article>
            <section className="related">
              <h2>{lang === "ar" ? "مقالات ذات صلة" : "İlgili yazılar"}</h2>
              <div className="article-grid">
                {rows
                  .filter((r) => r.id !== post.id)
                  .slice(0, 3)
                  .map((r) => (
                    <ArticleCard key={r.id} row={r} />
                  ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <header className="archive-head">
              <span className="eyebrow">Durob Alarabia</span>
              <h1>{l.articles}</h1>
              <p>
                {lang === "ar"
                  ? "حكايات وأفكار عن اللغة العربية والثقافة والسفر."
                  : "Arapça, kültür ve seyahat üzerine hikâyeler ve fikirler."}
              </p>
            </header>
            <div className="article-grid">
              {rows.length ? (
                rows
                  .slice((page - 1) * 12, page * 12)
                  .map((r) => <ArticleCard key={r.id} row={r} />)
              ) : (
                <p>{l.empty}</p>
              )}
            </div>
            {pages > 1 && (
              <nav className="cms-pagination">
                {Array.from({ length: pages }, (_, i) => (
                  <SiteLink
                    key={i}
                    href={articlePath(lang) + (i ? "?page=" + (i + 1) : "")}
                    aria-current={page === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </SiteLink>
                ))}
              </nav>
            )}
          </>
        )}
      </main>
      <footer className="editorial-footer">
        <SiteLink href="/">{t("دروب العربية")}</SiteLink>
        <SiteLink href={articlePath(lang)}>{l.articles}</SiteLink>
        <SiteLink href="/contact.html">{t("اتصل بنا")}</SiteLink>
      </footer>
    </>
  );
}
