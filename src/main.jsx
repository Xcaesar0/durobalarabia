import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { resolveRoute } from "./seo.jsx";
import "../css/base.css";
import "../css/desktop.css";
import "../css/mobile.css";
import "../css/language.css";
import "../css/contact.css";
import "../css/articles.css";
import "../css/cms.css";
import "../css/admin.css";
import "../css/dashboard.css";
import "./handoff.css";
let path = location.pathname + location.search + location.hash;
if (
  !path.includes("/articles") &&
  !new URLSearchParams(location.search).has("lang")
) {
  try {
    if (localStorage.getItem("durob-language") === "tr") {
      const u = new URL(location.href);
      u.searchParams.set("lang", "tr");
      history.replaceState(null, "", u);
      path = u.pathname + u.search + u.hash;
    }
  } catch {}
}
const root = document.getElementById("root");
const app = (
  <App initialPath={path} initialContent={window.__DUROB_CONTENT__} />
);
if (
  root.dataset.prerender === resolveRoute(path).lang &&
  !location.search &&
  !location.hash
)
  hydrateRoot(root, app);
else createRoot(root).render(app);
