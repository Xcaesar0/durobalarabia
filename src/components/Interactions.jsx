import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "../locale.jsx";
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function MobileNavigation({ children, ...props }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = React.Children.toArray(children)
      .filter(
        (child) =>
          child.props.href?.startsWith("#") && child.props.href.length > 1,
      )
      .map((child) => document.getElementById(child.props.href.slice(1)))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [children]);
  return (
    <nav {...props}>
      {React.Children.map(children, (child) => {
        if (
          !active ||
          !child.props.href?.startsWith("#") ||
          child.props.href === "#"
        )
          return child;
        const selected = child.props.href === active;
        return React.cloneElement(child, {
          className:
            child.props.className.replace(/\s*is-active/g, "") +
            (selected ? " is-active" : ""),
          "aria-current": selected ? "page" : undefined,
        });
      })}
    </nav>
  );
}
export function useScale() {
  useEffect(() => {
    const apply = () => {
      const w = document.documentElement.clientWidth,
        desktop = w >= 1024,
        base = desktop ? 1440 : 390,
        z = Math.min(w, desktop ? 1440 : 600) / base;
      document.documentElement.style.setProperty(
        desktop ? "--zd" : "--zm",
        String(z),
      );
      document.documentElement.style.setProperty(
        desktop ? "--gxd" : "--gxm",
        Math.max(0, (w - base * z) / 2) / z + "px",
      );
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
}
export function StickyHeader({ children, ...props }) {
  const [scrolled, set] = useState(false);
  useEffect(() => {
    const f = () => set(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      {...props}
      className={props.className + (scrolled ? " is-scrolled" : "")}
    >
      {children}
    </header>
  );
}
export function Counter({ children, ...props }) {
  const target = Number(props["data-to"]),
    [value, set] = useState(target),
    ref = useRef();
  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) return;
    let frame;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        let start;
        const tick = (now) => {
          start ??= now;
          const p = Math.min((now - start) / 1400, 1);
          set(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);
  return (
    <span {...props} ref={ref}>
      {value}
    </span>
  );
}
export function Track({ as: Tag = "div", children, ...props }) {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    const f = () => {
      const item = node.firstElementChild?.firstElementChild;
      if (!item) return;
      const rail = node.firstElementChild,
        gap = parseFloat(getComputedStyle(rail).columnGap) || 24,
        step = item.offsetWidth + gap,
        index = Math.round(Math.abs(node.scrollLeft) / step),
        max = node.scrollWidth - node.clientWidth;
      const counter = document.getElementById(props["data-counter"]);
      if (counter)
        counter.textContent =
          String(Math.min(index + 1, Number(props["data-total"]))).padStart(
            2,
            "0",
          ) +
          " / " +
          String(props["data-total"]).padStart(2, "0");
      const dots = document.getElementById(props["data-dots"]);
      if (dots)
        Array.from(dots.children).forEach((d, i) =>
          d.classList.toggle("is-active", index === i),
        );
      const fill = document.getElementById(
        props["data-progress"],
      )?.firstElementChild;
      if (fill)
        fill.style.right =
          (max > 0
            ? (Math.abs(node.scrollLeft) / max) *
              (fill.parentElement.clientWidth - fill.clientWidth)
            : 0) + "px";
    };
    node.addEventListener("scroll", f, { passive: true });
    f();
    return () => node.removeEventListener("scroll", f);
  }, [props["data-counter"], props["data-dots"], props["data-progress"]]);
  return (
    <Tag {...props} ref={ref}>
      {children}
    </Tag>
  );
}
export function InteractionLayer({ children }) {
  const { lang } = useLocale(),
    [video, setVideo] = useState(""),
    close = useRef(),
    opener = useRef();
  useEffect(() => {
    if (!video) return;
    const old = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    close.current?.focus();
    const f = (e) => {
      if (e.key === "Escape") setVideo("");
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener("keydown", f);
    return () => {
      document.documentElement.style.overflow = old;
      document.removeEventListener("keydown", f);
      opener.current?.focus({ preventScroll: true });
    };
  }, [video]);
  return (
    <div
      onClick={(e) => {
        const play = e.target.closest("[data-yt]");
        if (play?.dataset.yt) {
          e.preventDefault();
          opener.current = play;
          setVideo(play.dataset.yt);
        }
        if (e.target.closest(".js-top"))
          window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
        const arrow = e.target.closest(".js-track-next,.js-track-prev");
        if (arrow) {
          const track = document.getElementById(arrow.dataset.track),
            item = track?.firstElementChild?.firstElementChild;
          if (track && item)
            track.scrollBy({
              left:
                (getComputedStyle(track).direction === "rtl" ? -1 : 1) *
                (arrow.classList.contains("js-track-next") ? 1 : -1) *
                (item.offsetWidth + 24),
              behavior: reduced() ? "auto" : "smooth",
            });
        }
      }}
    >
      {children}
      {video && (
        <div
          className="vmodal"
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideo("");
          }}
        >
          <div className="vmodal__box">
            <button
              ref={close}
              className="vmodal__close"
              onClick={() => setVideo("")}
              aria-label={lang === "ar" ? "إغلاق" : "Kapat"}
            >
              ×
            </button>
            <iframe
              src={
                "https://www.youtube-nocookie.com/embed/" +
                encodeURIComponent(video) +
                "?autoplay=1&rel=0"
              }
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
