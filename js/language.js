/* Arabic/Turkish: URL takes precedence, then the saved language preference. */
(function () {
  "use strict";
  var requested = new URLSearchParams(location.search).get("lang");
  var saved;
  try { saved = localStorage.getItem("durob-language"); } catch (error) {}
  var language = window.DUROB_LANGUAGE || (requested === "ar" || requested === "tr" ? requested : saved === "tr" ? "tr" : "ar");
  var dictionary = window.DUROB_TR || {};
  var normalize = function (text) { return text.replace(/\s+/g, " ").trim(); };
  function translate(text) {
    var key = normalize(text);
    if (!Object.prototype.hasOwnProperty.call(dictionary, key)) return text;
    return text.slice(0, text.indexOf(text.trim())) + dictionary[key] + (text.match(/\s*$/) || [""])[0];
  }
  if (language === "tr") {
    // Text-node replacement preserves icons, emphasis, counters and event targets.
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) {
      if (!walker.currentNode.parentElement.closest("script, style, .language-switch")) nodes.push(walker.currentNode);
    }
    nodes.forEach(function (node) { node.nodeValue = translate(node.nodeValue); });
    document.querySelectorAll("[alt], [aria-label], meta[name='description']").forEach(function (element) {
      ["alt", "aria-label", "content"].forEach(function (attribute) {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
      });
    });
    document.title = translate(document.title);
  }
  document.documentElement.lang = language;
  document.documentElement.dir = language === "tr" ? "ltr" : "rtl";
  try { localStorage.setItem("durob-language", language); } catch (error) {}

  // Keep page, anchor and language together, including when storage is unavailable.
  document.querySelectorAll("a[href]").forEach(function (link) {
    var raw = link.getAttribute("href");
    if (!raw || raw[0] === "#" || /^(https?:|tel:|mailto:)/i.test(raw)) return;
    var url = new URL(raw, location.href);
    if (url.origin === location.origin && /\/(index|programs|contact)\.html$/.test(url.pathname)) {
      url.searchParams.set("lang", language);
      link.href = url.pathname + url.search + url.hash;
    }
  });
  document.querySelectorAll(".language-switch a").forEach(function (link) {
    var target = link.getAttribute("data-language");
    var url = new URL(location.href);
    url.searchParams.set("lang", target);
    link.href = url.pathname + url.search + url.hash;
    if (target === language) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll("[data-articles-link], [data-article-slug]").forEach(function (link) {
    var slug = link.getAttribute("data-article-slug");
    link.href = (language === "tr" ? "/tr" : "") + "/articles/" + (slug ? slug + "/" : "");
  });
  clearTimeout(window.DUROB_LANGUAGE_TIMEOUT);
  document.documentElement.classList.remove("language-pending");
})();
