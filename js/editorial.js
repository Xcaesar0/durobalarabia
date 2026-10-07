/* Article content is already localized in the HTML; only remember the choice. */
(function () {
  try { localStorage.setItem('durob-language', document.documentElement.lang); } catch (error) {}
})();
