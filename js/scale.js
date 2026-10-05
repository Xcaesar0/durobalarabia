/* Scales the Figma-sized pages (1440 desktop / 390 mobile) to the viewport
   width. Loaded in <head> so the first paint is already at the right size. */
(function () {
  var DESKTOP_W = 1440;
  var MOBILE_W = 390;
  var BREAKPOINT = 1024;
  var MAX_DESKTOP_W = 1920; // beyond this the canvas stays centred
  var MAX_MOBILE_W = 600; // tablets get the mobile design, centred
  var root = document.documentElement;

  function apply() {
    var w = root.clientWidth || window.innerWidth;
    if (w >= BREAKPOINT) {
      root.style.setProperty("--zd", (Math.min(w, MAX_DESKTOP_W) / DESKTOP_W).toFixed(5));
    } else {
      root.style.setProperty("--zm", (Math.min(w, MAX_MOBILE_W) / MOBILE_W).toFixed(5));
    }
  }

  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  document.addEventListener("DOMContentLoaded", apply);
})();
