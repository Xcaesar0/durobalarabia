# Durob Alarabia — React frontend

Public website and administrator interface rebuilt with React and Vite. Brand styles,
Arabic/Turkish copy, desktop/mobile compositions, videos and article URLs are preserved.
The repository has no database, authentication server, hosted backend SDK, server
functions, SQL migrations or hosting-specific deployment configuration.

## Run

Node.js 22.12+ is required (Node 24 recommended).

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Upload the contents of `dist/` to your own web server, at the domain root. The build
creates complete HTML for the public pages and each published article. Node is needed
to build; the output can be served by a static HTTP server. Preview is a local test
server, not a production server. Build before running tests.

Copy `.env.example` to `.env.local`. Set `VITE_SITE_URL` to the actual website origin
before production build to generate canonical URLs, language alternates, article
structured data and sitemap. Without it, absolute SEO URLs are intentionally omitted.
Set `VITE_API_BASE_URL` to the programmer's API to connect the frontend to his backend.

## Preview mode

With no API configured, `/admin/` offers a clearly labelled frontend preview button.
There is no real authentication in preview. Edits save to local storage in that browser;
the public pages in the same browser reflect them. Other visitors and generated HTML
are unaffected. Real traffic values are unavailable. Uploads, password changes and
contact submissions require a backend and never report fake success.

With an API configured, a real server session is required to enter administration.
The HTTP adapter is isolated in `src/api/client.js`; replace it or implement the
contract in [docs/BACKEND_HANDOFF.md](docs/BACKEND_HANDOFF.md).

## Source

- `src/pages/`: homepage, programs, contact, articles and admin React components.
- `src/components/`: content cards, videos, carousels, counters and contact form.
- `src/locale.jsx`: language rendering and language-aware navigation.
- `src/seo.jsx`: route metadata and structured data.
- `src/model.js`: shared content validation.
- `src/api/client.js`: replaceable HTTP adapter; no backend implementation.
- `src/entry-server.jsx`: optional React HTML renderer for server integration.
- `src/data/`: translations and browser preview storage.
- `content/site.json`: published-content export for database import/builds.
- `css/` and `public/assets/`: original brand styles, images, fonts and icons.
- `scripts/prerender.mjs`: build-time React rendering.
- `tests/`: rendering, localization, route and validation tests.

The homepage retains separate 1440px desktop and 390px mobile layouts and Turkish
bento adjustments. JSX is editable React source; no legacy HTML injection or DOM
translation scripts are used.

## Publishing and handoff

An API updates browser content. For complete HTML, SEO and correct 404 responses
after publication, the programmer must also render article routes on his server or
rebuild static pages after each change. Client fetching alone does not regenerate
HTML, metadata or sitemap. See the handoff document for both choices.

`npm run build:renderer` builds the optional React renderer. `npm run handoff` copies
source, docs and production output into a clean timestamped handoff directory,
excluding Git history, dependencies, caches, private environment files and temporary
tools. Verification scope is recorded in [docs/VERIFICATION.md](docs/VERIFICATION.md).
