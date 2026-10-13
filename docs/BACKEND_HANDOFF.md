# Programmer handoff

## Scope and configuration

Implement the database, authentication, authorization, storage, contact delivery and
analytics on your own server. No previous hosting/database account is needed. No remote
project or account was deleted when its integrations were removed from this repository.

`content/site.json` contains three published articles and four programs, with Arabic
and Turkish content. Import it into your database. IDs are generic UUID identities;
retain or map them. Keep article slugs stable. Users, passwords, visitor history and
unpublished drafts are not included.

Set `VITE_SITE_URL` and `VITE_API_BASE_URL`, then rebuild. Both are public values.
Do not place database credentials or privileged keys in frontend variables.
`src/api/client.js` uses credentialed HTTP requests and expects a server-managed
HttpOnly session cookie. The server must enforce authorization on every protected
endpoint, hash passwords, expire sessions, and protect requests with SameSite/origin
or CSRF checks. Cross-origin APIs need explicit credentialed CORS for the website.

## API contract

Paths are relative to `VITE_API_BASE_URL`. Responses are JSON except 204. Return
proper 401/403, 404, 409 and validation error statuses.

| Method | Path                                           | Request                | Response                                                |
| ------ | ---------------------------------------------- | ---------------------- | ------------------------------------------------------- |
| GET    | `/content`                                     | none                   | `{articles:Record[],programs:Record[]}`; published only |
| GET    | `/admin/session`                               | session                | `{user:{id,name,username}}` or 401                      |
| POST   | `/admin/login`                                 | `{username,password}`  | `{user:{id,name,username}}` plus cookie                 |
| POST   | `/admin/logout`                                | session                | 204; invalidate session                                 |
| PUT    | `/admin/password`                              | `{password}`           | 204; invalidate sessions                                |
| GET    | `/admin/articles`                              | session                | record array including drafts                           |
| GET    | `/admin/programs`                              | session                | record array including drafts                           |
| POST   | `/admin/articles` or `/admin/programs`         | new record             | saved record                                            |
| PUT    | `/admin/articles/:id` or `/admin/programs/:id` | record with revision   | saved record                                            |
| DELETE | `/admin/articles/:id` or `/admin/programs/:id` | `{revision}`           | 204                                                     |
| POST   | `/admin/media`                                 | multipart field `file` | `{url:"https://…"}` or local path                       |
| GET    | `/admin/traffic`                               | session                | overview below                                          |
| GET    | `/admin/articles/:slug/traffic`                | session                | `{views,visitors,daily:[{at,views}]}`                   |
| POST   | `/contact`                                     | contact payload below  | 204 after acceptance                                    |
| POST   | `/traffic`                                     | visit payload below    | 204                                                     |

### Record shape

```json
{
  "id": "content-identity",
  "slug": "stable-latin-slug",
  "status": "draft",
  "sort_order": 0,
  "revision": 1,
  "created_at": "2026-10-13T00:00:00Z",
  "updated_at": "2026-10-13T00:00:00Z",
  "content": {
    "image": "/assets/img/program-petra.jpg",
    "publishedAt": "2026-10-13",
    "locales": {
      "ar": {
        "title": "عنوان",
        "description": "وصف",
        "imageAlt": "وصف الصورة"
      },
      "tr": {
        "title": "Başlık",
        "description": "Açıklama",
        "imageAlt": "Görsel açıklaması"
      }
    }
  }
}
```

Articles add `content.author:{name,type:"Organization"}`. Each locale adds `category`,
`seoTitle`, and `blocks:[{type:"p"|"h2"|"h3"|"li",text:"…"}]`.
Programs add `content.featured`, `gallery:string[]`, `registrationUrl`. Each locale
adds `badge`, `details` (newline separated) and `button`.

Sort by `sort_order`, then newest `created_at`. Slugs stay fixed after creation;
add permanent redirects if you allow changes. Enforce validation on the server:
the frontend's `src/model.js` only helps the user. Accept plain text blocks and safe
URLs. Do not expose drafts publicly. Compare revision on updates/deletes and return
409 on stale requests. Validate uploaded PNG/JPEG/WebP contents, maximum 5 MB.

### Overview and tracking

```json
{
  "active": 0,
  "today": 0,
  "views": 0,
  "visitors": 0,
  "hourly": [{ "at": "2026-10-13T12:00:00Z", "views": 0 }],
  "daily": [{ "at": "2026-10-13", "views": 0 }],
  "pages": [{ "path": "/articles/example/", "views": 0, "visitors": 0 }],
  "referrers": [{ "referrer": "", "views": 0 }],
  "since": "2026-10-13T00:00:00Z",
  "updated": "2026-10-13T12:00:00Z"
}
```

Provide 24 hourly and 30 daily buckets including zero intervals. Dashboard polling
runs every 15 seconds; you can substitute a live push transport.
Visit payload: `{visit,visitor,page,lang,referrer}`. IDs are random browser UUIDs,
page excludes query strings, referrer is an external hostname only. A visible page
heartbeats every 30 seconds. Deduplicate visits, set timestamps on the server,
validate paths, rate-limit ingestion and protect analytics reads. The frontend
respects Do Not Track/Global Privacy Control and skips admin/automated browsing.
Each SPA page navigation creates a new visit. Preview never fabricates statistics.

### Contact

Payload: `{name,email,phone,level,program,participation,attendance,"group-size",message,language}`.
Group size is included only for groups. Validate and rate-limit on the server,
deliver/store the enquiry and return success only after acceptance.

## Server deployment and SEO

Serve `dist/` at the domain root with directory index files. Routes:
`/`, `/index.html`, `/programs.html`, `/contact.html`, `/admin/`, `/articles/`,
`/articles/:slug/`, `/tr/articles/`, `/tr/articles/:slug/`.
Redirect directory paths to trailing-slash URLs. Admin should be noindex/no-store.
Deleted/unknown article URLs must return real HTTP 404, not a 200 SPA fallback.
Minimal static Nginx configuration:

```nginx
location / { try_files $uri $uri/ =404; }
error_page 404 /404.html;
```

For newly published articles, archive pagination and crawler HTML, choose:

1. **Server rendering:** build with `npm run build:renderer`, import
   `render(path,content)` from `renderer/entry-server.js`, fetch your database's
   published records, and insert returned `head`/`html` into the Vite HTML shell.
   Apply the returned language and HTTP status and set the root `data-prerender`.
   Supply the same data to `window.__DUROB_CONTENT__` before the main module, encoding
   it safely (escape `<` as `\u003c`) to avoid hydration mismatch. The repository
   supplies a React renderer, not an HTTP server or database implementation.
2. **Static rebuilding:** export published data to `content/site.json`, run
   `npm run build`, and atomically deploy the new output after each publication.
   This updates HTML, metadata and sitemap together; it is not instant shared publishing.

Client `/content` fetching updates UI but does not create static files, refresh social
previews, or change HTTP status codes. Keep canonical/hreflang links, sitemap and
deleted-article handling aligned with publication. Set the final domain before build.

No API URL means the admin page intentionally shows a frontend preview. Configure
the backend before using real administrator accounts or shared content management.
