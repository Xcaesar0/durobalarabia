import React, { createContext, useContext } from "react";
import dictionary from "./data/translations.json";
export const LocaleContext = createContext({ lang: "ar", navigate: () => {} });
export const articlePath = (lang, slug = "") =>
  (lang === "tr" ? "/tr" : "") + "/articles/" + (slug ? slug + "/" : "");
export function localizedHref(raw, lang) {
  if (raw === "@articles") return articlePath(lang);
  if (raw?.startsWith("@article:")) return articlePath(lang, raw.slice(9));
  if (!raw || raw.startsWith("#") || /^(https?:|tel:|mailto:)/i.test(raw))
    return raw;
  const u = new URL(raw, "https://local.invalid/");
  if (
    /\/(index|programs|contact)\.html$/.test(u.pathname) ||
    u.pathname === "/"
  )
    u.searchParams.set("lang", lang);
  return u.pathname + u.search + u.hash;
}
export function useLocale() {
  const context = useContext(LocaleContext);
  return {
    ...context,
    t: (text) => {
      if (context.lang !== "tr") return text;
      const key = String(text).replace(/\s+/g, " ").trim();
      return Object.hasOwn(dictionary, key) ? dictionary[key] : text;
    },
  };
}
export function SiteLink({ href, children, ...props }) {
  const { lang, navigate } = useLocale();
  href = localizedHref(href, lang);
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        props.onClick?.(event);
        if (
          event.defaultPrevented ||
          !href ||
          href[0] === "#" ||
          /^(https?:|tel:|mailto:)/i.test(href) ||
          props.target === "_blank" ||
          props.download ||
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
export function LanguageSwitch() {
  const { lang, path, navigate } = useLocale();
  return (
    <nav className="language-switch" aria-label="Language / Dil">
      {["ar", "tr"].map((k) => {
        let href;
        if (path.includes("/articles")) {
          href = path.replace(/^\/tr/, "");
          if (k === "tr") href = "/tr" + href;
        } else {
          const u = new URL(path, "https://local.invalid");
          u.searchParams.set("lang", k);
          href = u.pathname + u.search + u.hash;
        }
        return (
          <a
            key={k}
            href={href}
            lang={k}
            aria-current={lang === k ? "true" : undefined}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              navigate(href);
            }}
          >
            {k.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}
