# دروب العربية — Homepage

Static, dependency-free build of the **Homepage** from the Figma file
[durobalarabia](https://www.figma.com/design/SMCW0TA7l2dkhWfe3qwIFi/durobalarabia)
(pages "01 — Mobile Screens" and "02 — Desktop Screens", tokens from "00 — Foundations").

## Run it

Open `index.html` in a browser, or serve the folder with any static server:

```sh
python3 -m http.server 8080   # then visit http://localhost:8080
```

It can be deployed as-is to GitHub Pages, Netlify, Vercel, cPanel, etc. — there is no build step.

## How it matches Figma

- **Two layouts, exactly as designed.** The page contains the desktop design
  (`Homepage / Desktop / 1440`) and the mobile design (`Homepage / Mobile / 390`).
  Screens **≥ 1024px** get the desktop design, smaller screens get the mobile design.
- **Pixel geometry from Figma.** Each section is built at its Figma frame width (1440 / 390)
  using the frame's own coordinates, then scaled to the screen width by `js/scale.js`
  (CSS `zoom`). So every phone and every desktop sees the same composition as the Figma frame.
- **Full-width backgrounds.** Every section sits in a full-width `.band` that paints its
  background edge to edge. Above 1440px the desktop content stays at 1440px, centred,
  while backgrounds and full-bleed layers extend to the screen edges (no white gutters at
  any width or browser zoom). Tablets (600–1023px) get the mobile design at up to 600px wide,
  centred on full-width backgrounds.
- **Fluid hero.** The desktop hero spans the full width and adapts to the screen height:
  on short laptop screens the photo collage and headline shrink (via `clamp()`) so the whole
  composition — header, collage, headlines, paragraph and CTA — fits the first view.
  On screens tall enough it is exactly the Figma frame.
- **Design tokens** (colours, type scale, mobile/desktop type modes) are CSS variables in
  `css/base.css` and `css/mobile.css`, named like the Figma variables.
- **Font:** Readex Pro (variable, SIL OFL), self-hosted in `assets/fonts/`.

## Files

```
index.html          markup — desktop tree (#desktop) and mobile tree (#mobile) + mobile nav bar
css/base.css        tokens, font, reset, buttons, scaling engine, video lightbox
css/desktop.css     desktop sections 01–19
css/mobile.css      mobile sections 01–20 + liquid-glass bottom navigation
js/scale.js         fits the Figma canvas to the screen width (runs before first paint)
js/main.js          video lightbox, carousels (RTL), counters, mobile nav highlighting
assets/img/         photos (optimised JPG/WebP) and SVG icons exported from Figma
assets/fonts/       Readex Pro woff2
```

## Interactions

- Every play button opens its YouTube video in a lightbox (`data-yt="<video id>"`):
  the destination cards, the supervisor video, the mobile program video and the
  Jordan 2023 trip video.
- Horizontal galleries (destinations, team, testimonials) scroll right-to-left with
  arrows / swipe; the testimonial counter and pager dots follow the scroll.
- Statistics count up when they enter the screen.
- Mobile bottom bar is fixed and highlights the section you are in.
- Phone CTAs call `+90 534 730 80 92` (from the Figma layer name).

## Content still to plug in

These are placeholders in the Figma file too:

- **Portrait photos** (companions, team, testimonials 2–10, stats photo) use the Figma
  gradient placeholders.
- **Latest news** shows the skeleton from Figma (loads from `/news` on the live site).
- **Links** — Instagram / Facebook, "مسابقة النقاط", article links, "المزيد", TR language
  switch currently point to `#`.
