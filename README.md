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
- **Pixel geometry from Figma.** Each layout is built at its Figma frame width (1440 / 390)
  using the frame's own coordinates, then scaled to the screen width by `js/scale.js`
  (CSS `zoom`). So every phone and every desktop sees the same composition as the Figma frame.
  Desktop scaling stops growing at 1920px; tablets (600–1023px) get the mobile design
  at up to 600px wide, centred.
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

- Destination cards ("اكتشف عالم المغامرات") open their YouTube videos in a lightbox
  (IDs taken from the Figma layer names).
- Horizontal galleries (destinations, team, testimonials) scroll right-to-left with
  arrows / swipe; the testimonial counter and pager dots follow the scroll.
- Statistics count up when they enter the screen.
- Mobile bottom bar is fixed and highlights the section you are in.
- Phone CTAs call `+90 534 730 80 92` (from the Figma layer name).

## Content still to plug in

These are placeholders in the Figma file too:

- **Videos without an ID** — supervisor video, Jordan 2023 trip video, mobile program video:
  add the YouTube ID in the empty `data-yt=""` attribute of those buttons in `index.html`.
- **Portrait photos** (companions, team, testimonials 2–10, stats photo) use the Figma
  gradient placeholders.
- **Latest news** shows the skeleton from Figma (loads from `/news` on the live site).
- **Links** — Instagram / Facebook, "مسابقة النقاط", article links, "المزيد", TR language
  switch currently point to `#`.
