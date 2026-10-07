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

## Header and page switching

- **One header per page**, identical on every page (`index.html`, `programs.html`): the
  sticky liquid-glass bar on desktop and the glass bottom bar on mobile. Keep their markup
  the same on every page; only the `is-active` link changes.
- **Page switching** uses native cross-document View Transitions (`@view-transition` in
  `css/base.css`): the current page stays visible until the next one is ready, then they
  cross-fade, so the header never flickers. Browsers without support switch instantly.
  The page canvas is burgundy so no pale frame can appear while loading.
- Do **not** animate or `transform` `.page`, and keep its `overflow: clip` — a transform or
  `overflow: hidden` there breaks the sticky header.

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
- The empty **Latest news** section has been removed from the homepage.
- **Links** — Instagram / Facebook, "مسابقة النقاط", article links and "المزيد"
  currently point to `#`.

## 2026 brand colors

Warm Cream `#F6F1E8` is the main surface; Deep Burgundy `#8E2C2C` is the primary heading and CTA color; Muted Gold `#C9A46A` is used for fine details; Soft Olive `#7C8A63` supports secondary accents. Darker shades keep small text and hover states readable. Shared CSS tokens, page gradients, and SVG icons use this palette; original logo and photographic assets retain their colors.

## Arabic and Turkish

Use the AR / TR controls in the desktop header or the mobile top corner. Both the homepage and programs page support `?lang=ar` and `?lang=tr`. The explicit URL language takes priority over the saved browser preference; page links preserve the choice even when browser storage is unavailable. Arabic remains the default and uses RTL; Turkish uses LTR.

`js/translations.js` contains the translation dictionary. Existing Turkish wording was matched against https://www.durobalarabia.com/tr/ and the old programs page at https://www.durobalarabia.com/tr/programs/. Existing Turkish paragraphs and testimonials are reused as published, including their original capitalization and wording. Sections left in Arabic on the old Turkish site, image descriptions, accessibility labels, and new program descriptions have new Turkish translations. No dates, prices, destinations or program claims were added by the language feature. Text inside photos and original brand artwork remains part of the image.

`js/language.js` translates text nodes and accessibility attributes without replacing icons, emphasis or interactive elements. `css/language.css` adapts longer Turkish content, flowing feature cards and mobile testimonials without changing the Arabic layout.

## Articles and future publishing dashboard

Article content lives in `content/articles.json`; shared presentation lives in
`templates/editorial.html` and `css/articles.css`. Generated HTML under `articles/`
and `tr/articles/` is output, not the editing source. Each locale is served as complete
HTML at its own URL; JavaScript is not required to read or index an article.

Run `python scripts/build_articles.py` after content changes. Netlify runs
`python scripts/build_articles.py --publish`, publishing only `dist/`. The build
also generates the sitemap and robots file. Source content, templates, tests and
build scripts are excluded from the published directory.

Each record has a stable `id` and `slug`, `status` (`draft` or `published`), actual
`publishedAt` date, author, image, original source URL and locale records. Each
locale contains a title, description, image alt text, category and typed text
blocks (`p`, `h2`, `h3`, `li`). Text is escaped during rendering. Drafts are omitted
from HTML, listings and sitemap; stale generated pages are removed on rebuild.
Keep slugs stable after publication. If a slug changes, add a permanent redirect
from its previous URL before publishing.

The three Arabic articles were migrated from the original website, preserving
its publication date. Turkish articles are localized editorial adaptations.
The current production hostname is centralized as `SITE` in the builder; update
it and rebuild when the custom domain is connected.

A future authenticated dashboard can edit these same records (or store the
same fields in a database), upload images, preview drafts and trigger publication.
Publishing must rebuild the HTML, language alternates, related links and sitemap.
Authentication, authorization, uploads and database write access belong on the
server. The public website must never contain admin credentials. No dashboard,
login or database has been implemented in this change.

Validation: `python -m unittest discover -s tests` checks generated metadata,
structured data, links, language alternates and draft removal. Search Console
sitemap submission and Google indexing are separate post-deployment steps.
