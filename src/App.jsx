import React, { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import Contact from "./pages/Contact.jsx";
import Articles, { NotFound, EditorialHeader } from "./pages/Articles.jsx";
import Admin from "./pages/Admin.jsx";
import { LocaleContext, LanguageSwitch } from "./locale.jsx";
import { ContentContext } from "./components/Content.jsx";
import { InteractionLayer, useScale } from "./components/Interactions.jsx";
import { seedContent, loadPreview } from "./data/content-store.js";
import { api } from "./api/client.js";
import { PREVIEW_MODE } from "./config.js";
import { resolveRoute, Seo } from "./seo.jsx";
export default function App({
  initialPath = "/",
  initialContent = seedContent,
  includeSeo = true,
}) {
  const [path, setPath] = useState(initialPath),
    [content, setContent] = useState(initialContent),
    [unavailable, setUnavailable] = useState(false),
    route = resolveRoute(path);
  useScale();
  const navigate = (href) => {
    history.pushState(null, "", href);
    setPath(location.pathname + location.search + location.hash);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  useEffect(() => {
    const f = () =>
      setPath(location.pathname + location.search + location.hash);
    window.addEventListener("popstate", f);
    return () => window.removeEventListener("popstate", f);
  }, []);
  useEffect(() => {
    document.documentElement.lang = route.lang;
    document.documentElement.dir = route.lang === "ar" ? "rtl" : "ltr";
    document.body.className =
      route.kind === "admin"
        ? ""
        : route.kind === "articles" || route.kind === "404"
          ? "editorial-body"
          : "";
    try {
      localStorage.setItem("durob-language", route.lang);
    } catch {}
    document.documentElement.classList.remove("language-pending");
    if (location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView(),
      );
    }
  }, [path]);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const refresh = () => {
      if (PREVIEW_MODE) {
        setContent(loadPreview());
        return;
      }
      api
        .content(controller.signal)
        .then((data) => {
          if (active) {
            setContent(data);
            setUnavailable(false);
          }
        })
        .catch((e) => {
          if (active && e.name !== "AbortError") setUnavailable(true);
        });
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("durob-content-change", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      controller.abort();
      window.removeEventListener("storage", refresh);
      window.removeEventListener("durob-content-change", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [path]);
  useEffect(() => {
    if (
      PREVIEW_MODE ||
      route.kind === "admin" ||
      route.kind === "404" ||
      navigator.webdriver ||
      navigator.doNotTrack === "1" ||
      navigator.globalPrivacyControl
    )
      return;
    let visitor;
    try {
      visitor = localStorage.getItem("durob-visitor-v2");
      if (!visitor) {
        visitor = crypto.randomUUID();
        localStorage.setItem("durob-visitor-v2", visitor);
      }
    } catch {
      return;
    }
    const visit = crypto.randomUUID(),
      page = route.pathname === "/index.html" ? "/" : route.pathname;
    let referrer = "";
    try {
      const ref = new URL(document.referrer);
      if (ref.origin !== location.origin) referrer = ref.host;
    } catch {}
    const send = () => {
      if (document.visibilityState === "visible")
        api
          .visit({ visit, visitor, page, lang: route.lang, referrer })
          .catch(() => {});
    };
    send();
    const timer = setInterval(send, 30000);
    document.addEventListener("visibilitychange", send);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", send);
    };
  }, [path]);
  return (
    <LocaleContext.Provider value={{ lang: route.lang, path, navigate }}>
      <ContentContext.Provider value={content}>
        {["home", "programs", "contact"].includes(route.kind) && (
          <div className="mobile-language">
            <LanguageSwitch />
          </div>
        )}
        {includeSeo && <Seo path={path} data={content} />}
        <InteractionLayer key={route.kind}>
          {unavailable && route.kind !== "admin" ? (
            <main className="editorial" role="alert">
              <h1>
                {route.lang === "ar"
                  ? "الموقع غير متاح مؤقتاً."
                  : "Site geçici olarak kullanılamıyor."}
              </h1>
              <button onClick={() => location.reload()}>
                {route.lang === "ar" ? "إعادة المحاولة" : "Tekrar dene"}
              </button>
            </main>
          ) : route.kind === "home" ? (
            <Home />
          ) : route.kind === "programs" ? (
            <Programs />
          ) : route.kind === "contact" ? (
            <Contact />
          ) : route.kind === "admin" ? (
            <Admin />
          ) : route.kind === "articles" ? (
            <Articles slug={route.slug} page={route.page} />
          ) : (
            <>
              <EditorialHeader />
              <NotFound />
            </>
          )}
        </InteractionLayer>
      </ContentContext.Provider>
    </LocaleContext.Provider>
  );
}
