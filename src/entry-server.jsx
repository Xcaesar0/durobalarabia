import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";
import { Seo, metadata } from "./seo.jsx";
import { seedContent } from "./data/content-store.js";
export function render(path, content = seedContent) {
  const m = metadata(path, content);
  return {
    html: renderToString(
      <App initialPath={path} initialContent={content} includeSeo={false} />,
    ),
    head: renderToStaticMarkup(<Seo path={path} data={content} />),
    lang: m.lang,
    status: m.kind === "404" ? 404 : 200,
  };
}
