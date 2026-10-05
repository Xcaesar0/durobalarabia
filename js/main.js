/* دروب العربية — page interactions (no dependencies). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Video lightbox (YouTube) ---------- */
  var modal = null;

  function closeModal() {
    if (!modal) return;
    modal.remove();
    modal = null;
    document.documentElement.style.overflow = "";
  }

  function openVideo(id) {
    if (!id) return;
    closeModal();
    modal = document.createElement("div");
    modal.className = "vmodal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML =
      '<div class="vmodal__box">' +
      '<button type="button" class="vmodal__close" aria-label="إغلاق">×</button>' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>' +
      "</div>";
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("vmodal__close")) closeModal();
    });
    document.body.appendChild(modal);
    document.documentElement.style.overflow = "hidden";
    modal.querySelector(".vmodal__close").focus();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // Any element with data-yt="<YouTube id>" opens the lightbox. Video slots
  // whose id is still unknown keep data-yt="" and simply do nothing.
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-yt]");
    if (trigger && trigger.getAttribute("data-yt")) {
      e.preventDefault();
      openVideo(trigger.getAttribute("data-yt"));
    }
  });

  /* ---------- Horizontal tracks (RTL scrollers) ---------- */
  // In RTL scrollers scrollLeft is 0 at the start (right edge) and negative
  // towards the end, so "next" moves left.
  function stepOf(track) {
    var rail = track.firstElementChild;
    var item = rail && rail.firstElementChild;
    if (!item) return track.clientWidth;
    var gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    if (getComputedStyle(item).position === "absolute") {
      var second = item.nextElementSibling;
      gap = second ? Math.abs(item.offsetLeft - second.offsetLeft) - item.offsetWidth : 24;
    }
    return item.offsetWidth + gap;
  }

  function scrollTrack(id, dir) {
    var track = document.getElementById(id);
    if (!track) return;
    track.scrollBy({ left: -dir * stepOf(track), behavior: reduceMotion ? "auto" : "smooth" });
  }

  document.addEventListener("click", function (e) {
    var next = e.target.closest(".js-track-next");
    var prev = e.target.closest(".js-track-prev");
    if (next) scrollTrack(next.getAttribute("data-track"), 1);
    if (prev) scrollTrack(prev.getAttribute("data-track"), -1);
  });

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  document.querySelectorAll(".js-track").forEach(function (track) {
    var counter = track.getAttribute("data-counter");
    var progress = track.getAttribute("data-progress");
    var dots = track.getAttribute("data-dots");
    var total = parseInt(track.getAttribute("data-total"), 10) || 0;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var pos = Math.abs(track.scrollLeft);
      var ratio = max > 0 ? pos / max : 0;
      var index = Math.round(pos / stepOf(track));

      if (counter) {
        var c = document.getElementById(counter);
        if (c) c.textContent = pad(Math.min(index + 1, total)) + " / " + pad(total);
      }
      if (progress) {
        var bar = document.getElementById(progress);
        var fill = bar && bar.firstElementChild;
        if (fill) fill.style.right = ratio * (bar.clientWidth - fill.clientWidth) + "px";
      }
      if (dots) {
        var wrap = document.getElementById(dots);
        if (wrap) {
          Array.prototype.forEach.call(wrap.children, function (d, i) {
            d.classList.toggle("is-active", i === index);
          });
        }
      }
    }

    track.addEventListener("scroll", update, { passive: true });
    update();
  });

  /* ---------- Count-up statistics ---------- */
  var counters = document.querySelectorAll(".js-count");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          var el = entry.target;
          var to = parseInt(el.getAttribute("data-to"), 10);
          var start = null;
          var dur = 1400;
          function tick(t) {
            if (start === null) start = t;
            var p = Math.min((t - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Back to top ---------- */
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-top")) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  /* ---------- Mobile bottom navigation: highlight the current section ---------- */
  var mnav = document.querySelector(".m-nav");
  if (mnav && "IntersectionObserver" in window) {
    var links = mnav.querySelectorAll("a[href^='#']");
    var map = {};
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      var target = href.length > 1 ? document.getElementById(href.slice(1)) : null;
      if (target) map[target.id] = a;
    });
    var navIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.remove("is-active");
            a.removeAttribute("aria-current");
          });
          var a = map[entry.target.id];
          if (a) {
            a.classList.add("is-active");
            a.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(map).forEach(function (id) {
      navIo.observe(document.getElementById(id));
    });
  }

  /* ========================================================================
     SENIOR FRONTEND IMPLEMENTATION:
     1. Instant, responsive page navigation with YouTube-style top progress bar
     2. Sticky Liquid Glass header scroll elevation
     ======================================================================== */

  // Inject top loading progress bar
  var pBar = document.createElement("div");
  pBar.className = "page-progress-bar";
  document.body.appendChild(pBar);

  document.addEventListener("click", function (e) {
    if (reduceMotion) return;
    var link = e.target.closest("a");
    if (!link) return;
    var href = link.getAttribute("href");
    if (!href) return;

    // Ignore anchors, external protocols, downloads, or special keys
    if (
      href.startsWith("#") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
    ) {
      return;
    }

    try {
      var targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.origin === window.location.origin && targetUrl.pathname !== window.location.pathname) {
        // Immediate visual feedback (YouTube / GitHub pattern)
        pBar.classList.remove("is-finishing");
        pBar.classList.add("is-loading");
      }
    } catch (err) {}
  });

  window.addEventListener("pageshow", function () {
    pBar.classList.add("is-finishing");
    setTimeout(function () {
      pBar.classList.remove("is-loading", "is-finishing");
    }, 300);
  });

  /* ---------- Sticky Liquid Glass Header Scroll Depth ---------- */
  var stickyHeader = document.querySelector(".d-header-sticky");
  if (stickyHeader) {
    var checkScroll = function () {
      if (window.scrollY > 30) {
        stickyHeader.classList.add("is-scrolled");
      } else {
        stickyHeader.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
  }
})();