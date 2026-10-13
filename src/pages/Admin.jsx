import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { PREVIEW_MODE } from "../config.js";
import { useLocale, SiteLink, LanguageSwitch } from "../locale.jsx";
import { loadPreview, savePreview } from "../data/content-store.js";
import { validateRecord, parseBlocks, blocksText, safeURL } from "../model.js";
import copy from "../data/admin-copy.json";
function Chart({ series = [], label }) {
  const max = Math.max(1, ...series.map((d) => Number(d.views))),
    points = series
      .map(
        (d, i) =>
          `${20 + (i * 600) / Math.max(1, series.length - 1)},${150 - (Number(d.views) / max) * 130}`,
      )
      .join(" ");
  return (
    <>
      <svg
        className="traffic-chart"
        viewBox="0 0 640 170"
        role="img"
        aria-label={label}
        dir="ltr"
      >
        <line x1="20" y1="150" x2="620" y2="150" stroke="#ded3c3" />
        <polyline
          points={points}
          fill="none"
          stroke="#8e2c2c"
          strokeWidth="3"
        />
        {series.map((d, i) => (
          <circle
            key={i}
            cx={20 + (i * 600) / Math.max(1, series.length - 1)}
            cy={150 - (Number(d.views) / max) * 130}
            r="3"
            fill="#8e2c2c"
          >
            <title>
              {d.at}: {d.views}
            </title>
          </circle>
        ))}
      </svg>
      {series.length > 0 && (
        <details className="chart-data">
          <summary>{label}</summary>
          <table>
            <tbody>
              {series.map((d, i) => (
                <tr key={i}>
                  <td>{d.at}</td>
                  <td>{d.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </>
  );
}
function Field({
  name,
  label,
  value = "",
  type = "text",
  help = "",
  required = false,
  disabled = false,
}) {
  return (
    <label className="editor-field">
      {label}
      {type === "textarea" ? (
        <textarea
          name={name}
          defaultValue={value}
          rows="5"
          required={required}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={value}
          required={required}
          disabled={disabled}
        />
      )}
      <small>{help}</small>
    </label>
  );
}
function Editor({ kind, row, t, onSave, onCancel }) {
  const { lang } = useLocale(),
    [dirty, setDirty] = useState(false),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [image, setImage] = useState(row.content.image || "");
  const c = row.content;
  useEffect(() => {
    const f = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", f);
    return () => window.removeEventListener("beforeunload", f);
  }, [dirty]);
  const field = (
    n,
    label,
    value,
    type = "text",
    help = "",
    required = false,
    disabled = false,
  ) => (
    <Field
      name={n}
      label={t(label)}
      value={value}
      type={type}
      help={help ? t(help) : ""}
      required={required}
      disabled={disabled}
    />
  );
  return (
    <>
      <div className="cms-view-head">
        <h1>
          {t(row.id ? "edit" : "add")} · {t(kind)}
        </h1>
        <button
          className="outline-button"
          disabled={busy}
          onClick={() => {
            if (!dirty || confirm(t("dirty"))) onCancel();
          }}
        >
          {t("cancel")}
        </button>
      </div>
      <form
        onChange={() => setDirty(true)}
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy) return;
          const data = new FormData(e.currentTarget),
            value = (n) => String(data.get(n) || "").trim(),
            content = structuredClone(c);
          content.image = image;
          content.publishedAt = value("publishedAt");
          if (kind === "articles")
            content.author = { name: value("author"), type: "Organization" };
          else {
            content.registrationUrl = value("registrationUrl");
            content.gallery = value("gallery")
              .split("\n")
              .map((v) => v.trim())
              .filter(Boolean);
            content.featured = data.has("featured");
          }
          for (const l of ["ar", "tr"]) {
            for (const k of [
              "title",
              "description",
              "imageAlt",
              ...(kind === "articles"
                ? ["category", "seoTitle"]
                : ["badge", "details", "button"]),
            ])
              content.locales[l][k] = value(l + "_" + k);
            if (kind === "articles")
              content.locales[l].blocks = parseBlocks(value(l + "_body"));
          }
          const next = {
            ...row,
            slug: row.id ? row.slug : value("slug"),
            status: value("status"),
            sort_order: Number(value("sort_order")),
            content,
          };
          try {
            validateRecord(next, kind);
          } catch {
            setStatus(t("validation"));
            return;
          }
          setBusy(true);
          setStatus("");
          try {
            await onSave(next);
            setDirty(false);
          } catch (error) {
            setStatus(t(error.status === 409 ? "conflict" : "failed"));
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="admin-surface editor-basics">
          {field("slug", "slug", row.slug, "text", "slugHelp", true, !!row.id)}
          <label className="editor-field">
            {t("status")}
            <select name="status" defaultValue={row.status}>
              <option value="draft">{t("draft")}</option>
              <option value="published">{t("published")}</option>
            </select>
          </label>
          {field("publishedAt", "date", c.publishedAt, "date", "", true)}
          {field("sort_order", "order", row.sort_order, "number")}
          <div className="editor-image">
            <label className="editor-field">
              {t("image")}
              <input
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <small>{t("imageHelp")}</small>
            </label>
            <label className="upload-label">
              {t("upload")}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={busy}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (PREVIEW_MODE) {
                    setStatus(
                      lang === "ar"
                        ? "رفع الصور يتطلب توصيل الخادم. يمكنك استخدام رابط صورة حالياً."
                        : "Görsel yükleme sunucu bağlantısı gerektirir. Şimdilik bir görsel bağlantısı kullanın.",
                    );
                    return;
                  }
                  if (
                    file.size > 5242880 ||
                    !["image/png", "image/jpeg", "image/webp"].includes(
                      file.type,
                    )
                  ) {
                    setStatus(t("uploadFailed"));
                    return;
                  }
                  setBusy(true);
                  try {
                    const result = await api.upload(file);
                    if (!safeURL(result.url, true)) throw Error();
                    setImage(result.url);
                    setDirty(true);
                  } catch {
                    setStatus(t("uploadFailed"));
                  } finally {
                    setBusy(false);
                  }
                }}
              />
            </label>
            <img
              src={safeURL(image, true) || "/assets/img/logo.png"}
              width="200"
              height="130"
              alt=""
            />
          </div>
          {kind === "articles" ? (
            field("author", "author", c.author?.name || "Durob Alarabia")
          ) : (
            <>
              {field("registrationUrl", "registrationUrl", c.registrationUrl)}
              {field(
                "gallery",
                "gallery",
                (c.gallery || []).join("\n"),
                "textarea",
              )}
              <label className="check-field">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={c.featured}
                />
                {t("featured")}
              </label>
            </>
          )}
        </div>
        <div className="locale-editors">
          {["ar", "tr"].map((l) => {
            const v = c.locales[l];
            return (
              <section
                key={l}
                className="admin-surface locale-editor"
                dir={l === "ar" ? "rtl" : "ltr"}
              >
                <h2>{l === "ar" ? "العربية" : "Türkçe"}</h2>
                {field(l + "_title", "title", v.title, "text", "", true)}
                {field(
                  l + "_description",
                  "description",
                  v.description,
                  "textarea",
                  "",
                  true,
                )}
                {field(l + "_imageAlt", "imageAlt", v.imageAlt)}
                {kind === "articles" ? (
                  <>
                    {field(l + "_category", "category", v.category)}
                    {field(l + "_seoTitle", "seoTitle", v.seoTitle)}
                    {field(
                      l + "_body",
                      "body",
                      blocksText(v.blocks),
                      "textarea",
                      "bodyHelp",
                      true,
                    )}
                  </>
                ) : (
                  <>
                    {field(l + "_badge", "badge", v.badge)}
                    {field(
                      l + "_details",
                      "details",
                      (v.details || "").replace(/\\n/g, "\n"),
                      "textarea",
                    )}
                    {field(l + "_button", "button", v.button)}
                  </>
                )}
              </section>
            );
          })}
        </div>
        <div className="editor-bar">
          <span>
            {PREVIEW_MODE
              ? lang === "ar"
                ? "معاينة محلية فقط"
                : "Yalnızca yerel önizleme"
              : t("intro")}
          </span>
          <button className="primary-button" disabled={busy}>
            {t("save")}
          </button>
        </div>
        <p className="status" role="status">
          {status}
        </p>
      </form>
    </>
  );
}
export default function Admin() {
  const { lang, t: translate } = useLocale(),
    t = (k) => copy[lang][k] || k,
    [session, setSession] = useState(null),
    [checking, setChecking] = useState(!PREVIEW_MODE),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [show, setShow] = useState(false),
    [tab, setTab] = useState("home"),
    [records, setRecords] = useState({ articles: [], programs: [] }),
    [traffic, setTraffic] = useState(null),
    [editor, setEditor] = useState(null),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState(""),
    [stats, setStats] = useState(null),
    [password, setPassword] = useState(false);
  const load = async () => {
    const data = PREVIEW_MODE
      ? loadPreview()
      : {
          articles: await api.list("articles"),
          programs: await api.list("programs"),
        };
    setRecords(data);
  };
  useEffect(() => {
    if (PREVIEW_MODE) return;
    let active = true;
    api
      .session()
      .then((s) => {
        if (active) setSession(s?.user || null);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!session) return;
    let active = true,
      pending = false;
    const refresh = async () => {
      if (pending) return;
      pending = true;
      try {
        const data = PREVIEW_MODE
          ? loadPreview()
          : {
              articles: await api.list("articles"),
              programs: await api.list("programs"),
            };
        if (active) setRecords(data);
        if (!PREVIEW_MODE) {
          const metrics = await api.overview();
          if (active) setTraffic(metrics);
        }
      } catch (e) {
        if (active) {
          if (e.status === 401 || e.status === 403) setSession(null);
          setError(t("failed"));
        }
      } finally {
        pending = false;
      }
    };
    refresh();
    const timer = PREVIEW_MODE ? null : setInterval(refresh, 15000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [session]);
  const brand = (
    <SiteLink className="admin-brand" href="/">
      <img src="/assets/img/logo.png" width="44" height="50" alt="" />
      <span>{translate("دروب العربية")}</span>
    </SiteLink>
  );
  const previewNotice =
    lang === "ar"
      ? "معاينة الواجهة فقط — التعديلات محفوظة في هذا المتصفح. تسجيل الدخول والنشر والإحصاءات تتطلب توصيل الخادم."
      : "Yalnızca arayüz önizlemesi — değişiklikler bu tarayıcıda saklanır. Giriş, yayınlama ve istatistikler sunucu bağlantısı gerektirir.";
  const changeTab = (next) => {
    if (editor && !confirm(t("dirty"))) return;
    setEditor(null);
    setStats(null);
    setTab(next);
    setSearch("");
    setFilter("");
    setError("");
  };
  const logout = async () => {
    if (editor && !confirm(t("dirty"))) return;
    setBusy(true);
    try {
      if (!PREVIEW_MODE) await api.logout();
      setSession(null);
      setEditor(null);
      setPassword(false);
    } catch {
      setError(t("failed"));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="admin-page">
      <header className="admin-top">
        {brand}
        <div className="admin-top-actions">
          <SiteLink href="/">
            {lang === "ar" ? "العودة إلى الموقع ↗" : "Web sitesine dön ↗"}
          </SiteLink>
          <LanguageSwitch />
        </div>
      </header>
      <main className={"admin-main " + (session ? "admin-main-wide" : "")}>
        {PREVIEW_MODE && (
          <p className="preview-notice" role="note">
            {previewNotice}
          </p>
        )}
        {!session ? (
          <section className="auth-layout">
            <aside className="auth-story">
              <span className="eyebrow">{translate("مساحة الإدارة")}</span>
              <h1>
                {lang === "ar"
                  ? "رحلة التعلّم، تبدأ من هنا."
                  : "Öğrenme yolculuğu burada başlar."}
              </h1>
              <p>
                {lang === "ar"
                  ? "مساحتك الخاصة لإدارة دروب العربية."
                  : "Durob Alarabia için özel yönetim alanınız."}
              </p>
              <div className="story-mark" aria-hidden="true">
                <span>د</span>
              </div>
              <span className="story-footer">
                {lang === "ar"
                  ? "دخول مخصص لفريق الإدارة"
                  : "Yalnızca yönetim ekibi için"}
              </span>
            </aside>
            <div className="auth-card">
              <span className="auth-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="5" y="10" width="14" height="11" rx="3" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
                </svg>
              </span>
              <h2>{translate("تسجيل الدخول")}</h2>
              {checking ? (
                <p role="status">{t("loading")}</p>
              ) : PREVIEW_MODE ? (
                <>
                  <p>{previewNotice}</p>
                  <button
                    className="primary-button"
                    onClick={() => setSession({ name: "Preview" })}
                  >
                    {lang === "ar"
                      ? "فتح معاينة لوحة الإدارة"
                      : "Yönetim panelini önizle"}
                  </button>
                </>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setBusy(true);
                    setError("");
                    try {
                      const data = await api.login(
                        Object.fromEntries(new FormData(e.currentTarget)),
                      );
                      if (!data?.user) throw Error();
                      setSession(data.user);
                    } catch {
                      setError(
                        lang === "ar"
                          ? "تعذّر تسجيل الدخول. تحقق من البيانات."
                          : "Giriş yapılamadı. Bilgilerinizi kontrol edin.",
                      );
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  <label htmlFor="username">{translate("اسم المستخدم")}</label>
                  <input
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                  />
                  <label htmlFor="password">{translate("كلمة المرور")}</label>
                  <div className="password-field">
                    <input
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      required
                    />
                    <button type="button" onClick={() => setShow(!show)}>
                      {show
                        ? lang === "ar"
                          ? "إخفاء"
                          : "Gizle"
                        : lang === "ar"
                          ? "إظهار"
                          : "Göster"}
                    </button>
                  </div>
                  <button className="primary-button" disabled={busy}>
                    {lang === "ar"
                      ? "دخول إلى لوحة الإدارة"
                      : "Yönetim paneline giriş yap"}
                  </button>
                </form>
              )}
              <p className="status" role="status">
                {error}
              </p>
            </div>
          </section>
        ) : (
          <section id="dashboard-view" className="dashboard">
            <div className="dashboard-heading">
              <div>
                <span className="eyebrow">{translate("مساحة الإدارة")}</span>
                <h1>
                  {lang === "ar"
                    ? "أهلاً بك في لوحة الإدارة"
                    : "Yönetim paneline hoş geldiniz"}
                </h1>
                <p>{session.name || session.username}</p>
              </div>
              <button
                className="outline-button"
                disabled={busy}
                onClick={logout}
              >
                {lang === "ar" ? "تسجيل الخروج" : "Çıkış yap"}
              </button>
            </div>
            <p className="status" role="status">
              {error}
            </p>
            <div className="cms-workspace">
              <aside className="cms-sidebar">
                <div className="sidebar-label">DUROB / ADMIN</div>
                <nav>
                  {["home", "programs", "articles"].map((k) => (
                    <button
                      key={k}
                      aria-current={tab === k ? "page" : undefined}
                      onClick={() => changeTab(k)}
                    >
                      {t(k)}
                    </button>
                  ))}
                </nav>
                <div className="sidebar-account">
                  <SiteLink
                    href={lang === "tr" ? "/tr/articles/" : "/articles/"}
                  >
                    {t("preview")}
                  </SiteLink>
                  <button
                    className="text-button"
                    onClick={() => {
                      if (!editor || confirm(t("dirty"))) {
                        setEditor(null);
                        setPassword(true);
                      }
                    }}
                  >
                    {lang === "ar" ? "تغيير كلمة المرور" : "Şifreyi değiştir"}
                  </button>
                </div>
              </aside>
              <div className="cms-content">
                {password ? (
                  <form
                    className="admin-surface"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const d = Object.fromEntries(
                        new FormData(e.currentTarget),
                      );
                      if (PREVIEW_MODE) {
                        setError(previewNotice);
                        return;
                      }
                      if (d.password !== d.confirm) {
                        setError(
                          lang === "ar"
                            ? "كلمتا المرور غير متطابقتين."
                            : "Şifreler eşleşmiyor.",
                        );
                        return;
                      }
                      setBusy(true);
                      try {
                        await api.password({ password: d.password });
                        setPassword(false);
                        await logout();
                      } catch {
                        setError(t("failed"));
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    <h2>
                      {lang === "ar" ? "تغيير كلمة المرور" : "Şifreyi değiştir"}
                    </h2>
                    <Field
                      name="password"
                      type="password"
                      label={translate("كلمة المرور")}
                      required
                    />
                    <Field
                      name="confirm"
                      type="password"
                      label={
                        lang === "ar"
                          ? "تأكيد كلمة المرور"
                          : "Şifreyi doğrulayın"
                      }
                      required
                    />
                    <button className="primary-button" disabled={busy}>
                      {t("save")}
                    </button>
                    <button
                      type="button"
                      className="outline-button"
                      onClick={() => setPassword(false)}
                    >
                      {t("cancel")}
                    </button>
                  </form>
                ) : editor ? (
                  <Editor
                    key={editor.id || "new"}
                    kind={tab}
                    row={editor}
                    t={t}
                    onCancel={() => setEditor(null)}
                    onSave={async (row) => {
                      if (PREVIEW_MODE) {
                        const data = loadPreview();
                        const saved = {
                          ...row,
                          id: row.id || crypto.randomUUID(),
                          revision: (row.revision || 0) + 1,
                          updated_at: new Date().toISOString(),
                        };
                        data[tab] = row.id
                          ? data[tab].map((r) => (r.id === row.id ? saved : r))
                          : [saved, ...data[tab]];
                        savePreview(data);
                      } else await api.save(tab, row);
                      await load();
                      setEditor(null);
                      setError(PREVIEW_MODE ? previewNotice : t("saved"));
                    }}
                  />
                ) : stats ? (
                  <>
                    <div className="cms-view-head">
                      <h1>{stats.title}</h1>
                      <button
                        className="outline-button"
                        onClick={() => setStats(null)}
                      >
                        {t("back")}
                      </button>
                    </div>
                    <div className="metrics-grid">
                      {["views", "visitors"].map((k) => (
                        <article className="metric" key={k}>
                          <span>{t(k)}</span>
                          <strong>{stats.data?.[k] ?? "—"}</strong>
                        </article>
                      ))}
                    </div>
                    <section className="admin-surface">
                      <h2>{t("daily")}</h2>
                      <Chart series={stats.data?.daily} label={t("daily")} />
                      {PREVIEW_MODE && <p>{previewNotice}</p>}
                    </section>
                  </>
                ) : tab === "home" ? (
                  <>
                    <div className="cms-view-head">
                      <div>
                        <span className="eyebrow">Durob Alarabia</span>
                        <h1>{t("overview")}</h1>
                        <p>{PREVIEW_MODE ? previewNotice : t("intro")}</p>
                      </div>
                      <span className="live-badge">
                        {PREVIEW_MODE
                          ? lang === "ar"
                            ? "معاينة"
                            : "Önizleme"
                          : t("updated")}
                      </span>
                    </div>
                    <div className="metrics-grid">
                      {["active", "today", "views", "visitors"].map((k) => (
                        <article key={k} className="metric">
                          <span>{t(k)}</span>
                          <strong>{traffic?.[k] ?? "—"}</strong>
                        </article>
                      ))}
                    </div>
                    <div className="chart-grid">
                      {["hourly", "daily"].map((k) => (
                        <section key={k} className="admin-surface">
                          <h2>{t(k)}</h2>
                          <Chart series={traffic?.[k]} label={t(k)} />
                          {!traffic && (
                            <p>
                              {lang === "ar"
                                ? "الإحصاءات جاهزة للربط بمصدر البيانات."
                                : "İstatistikler veri kaynağı bağlantısına hazır."}
                            </p>
                          )}
                        </section>
                      ))}
                    </div>
                    <div className="dashboard-grid cms-overview-bottom">
                      <section className="admin-surface">
                        <h2>{t("pages")}</h2>
                        <table>
                          <tbody>
                            {traffic?.pages?.map((p) => (
                              <tr key={p.path}>
                                <td>{p.path}</td>
                                <td>{p.views}</td>
                                <td>{p.visitors}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {!traffic && <p>—</p>}
                      </section>
                      <section className="admin-surface">
                        <h2>{t("referrers")}</h2>
                        <ul className="source-list">
                          {traffic?.referrers?.map((r, i) => (
                            <li key={i}>
                              <span>{r.referrer || t("direct")}</span>
                              <strong>{r.views}</strong>
                            </li>
                          ))}
                        </ul>
                        <div className="content-counts">
                          {["programs", "articles"].map((k) => (
                            <button key={k} onClick={() => changeTab(k)}>
                              {t(k)}
                              <strong>
                                {
                                  records[k].filter(
                                    (r) => r.status === "published",
                                  ).length
                                }
                              </strong>
                              <span>
                                {t("draftCount")} ·{" "}
                                {
                                  records[k].filter((r) => r.status === "draft")
                                    .length
                                }
                              </span>
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cms-view-head">
                      <h1>{t(tab)}</h1>
                      <button
                        className="primary-button"
                        onClick={() =>
                          setEditor({
                            slug: "",
                            status: "draft",
                            sort_order: 0,
                            content: {
                              image: "",
                              gallery: [],
                              publishedAt: new Date()
                                .toISOString()
                                .slice(0, 10),
                              locales: { ar: {}, tr: {} },
                            },
                          })
                        }
                      >
                        + {t("add")}
                      </button>
                    </div>
                    <div className="list-filters">
                      <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label={t("search")}
                        placeholder={t("search")}
                      />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        aria-label={t("status")}
                      >
                        <option value="">{t("all")}</option>
                        <option value="published">{t("published")}</option>
                        <option value="draft">{t("draft")}</option>
                      </select>
                    </div>
                    <div className="admin-surface table-scroll">
                      <table className="content-table">
                        <thead>
                          <tr>
                            <th>{t("title")}</th>
                            <th>{t("status")}</th>
                            {tab === "articles" && <th>{t("count")}</th>}
                            <th>{t("actions")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records[tab]
                            .filter(
                              (r) =>
                                (!filter || r.status === filter) &&
                                (!search ||
                                  [
                                    r.slug,
                                    r.content.locales.ar.title,
                                    r.content.locales.tr.title,
                                  ].some((s) =>
                                    s
                                      .toLocaleLowerCase()
                                      .includes(search.toLocaleLowerCase()),
                                  )),
                            )
                            .map((r) => (
                              <tr key={r.id}>
                                <td>
                                  <div className="table-title">
                                    <img
                                      src={safeURL(r.content.image, true)}
                                      alt=""
                                      width="64"
                                      height="50"
                                    />
                                    <div>
                                      <strong>
                                        {r.content.locales[lang].title}
                                      </strong>
                                      <small dir="ltr">{r.slug}</small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className={"status-pill " + r.status}>
                                    {t(r.status)}
                                  </span>
                                </td>
                                {tab === "articles" && (
                                  <td>
                                    {traffic?.pages
                                      ?.filter(
                                        (p) =>
                                          p.path ===
                                            "/articles/" + r.slug + "/" ||
                                          p.path ===
                                            "/tr/articles/" + r.slug + "/",
                                      )
                                      .reduce(
                                        (s, p) => s + Number(p.views),
                                        0,
                                      ) ?? "—"}
                                  </td>
                                )}
                                <td>
                                  <div className="row-actions">
                                    <button
                                      onClick={() =>
                                        setEditor(structuredClone(r))
                                      }
                                    >
                                      {t("edit")}
                                    </button>
                                    {tab === "articles" && (
                                      <button
                                        onClick={async () => {
                                          try {
                                            setStats({
                                              title:
                                                r.content.locales[lang].title,
                                              data: PREVIEW_MODE
                                                ? null
                                                : await api.articleTraffic(
                                                    r.slug,
                                                  ),
                                            });
                                          } catch {
                                            setError(t("failed"));
                                          }
                                        }}
                                      >
                                        {t("analytics")}
                                      </button>
                                    )}
                                    <button
                                      className="danger"
                                      disabled={busy}
                                      onClick={async () => {
                                        if (
                                          !confirm(
                                            t("deleteTitle") +
                                              "\n" +
                                              r.content.locales[lang].title,
                                          )
                                        )
                                          return;
                                        setBusy(true);
                                        try {
                                          if (PREVIEW_MODE) {
                                            const data = loadPreview();
                                            data[tab] = data[tab].filter(
                                              (x) => x.id !== r.id,
                                            );
                                            savePreview(data);
                                          } else await api.remove(tab, r);
                                          await load();
                                          setError(
                                            PREVIEW_MODE
                                              ? previewNotice
                                              : t("deleted"),
                                          );
                                        } catch (e) {
                                          setError(
                                            t(
                                              e.status === 409
                                                ? "conflict"
                                                : "failed",
                                            ),
                                          );
                                        } finally {
                                          setBusy(false);
                                        }
                                      }}
                                    >
                                      {t("remove")}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="admin-footer">
        © {new Date().getFullYear()} {translate("دروب العربية")}
      </footer>
    </div>
  );
}
