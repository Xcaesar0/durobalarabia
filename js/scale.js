/* Scales the Figma-sized sections (1440 desktop / 390 mobile) to the viewport
   width. Loaded in <head> so the first paint is already at the right size.

   --zd / --zm : scale of the desktop / mobile sections
   --gxd / --gxm : side gutter (in section units) when the viewport is wider
                   than the section; full-bleed layers use it to reach the edges */
(function () {
  var DESKTOP_W = 1440;
  var MOBILE_W = 390;
  var BREAKPOINT = 1024;
  var MAX_DESKTOP_W = 1440; // above this the design is shown 1:1, centred
  var MAX_MOBILE_W = 600; // tablets get the mobile design, centred
  var root = document.documentElement;

  function apply() {
    var w = root.clientWidth || window.innerWidth;
    var z, gutter;
    if (w >= BREAKPOINT) {
      z = Math.min(w, MAX_DESKTOP_W) / DESKTOP_W;
      gutter = Math.max(0, (w - DESKTOP_W * z) / 2) / z;
      root.style.setProperty("--zd", z.toFixed(5));
      root.style.setProperty("--gxd", gutter.toFixed(2) + "px");
    } else {
      z = Math.min(w, MAX_MOBILE_W) / MOBILE_W;
      gutter = Math.max(0, (w - MOBILE_W * z) / 2) / z;
      root.style.setProperty("--zm", z.toFixed(5));
      root.style.setProperty("--gxm", gutter.toFixed(2) + "px");
    }
  }

  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  document.addEventListener("DOMContentLoaded", apply);
})();
