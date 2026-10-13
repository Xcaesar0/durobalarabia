import { API_BASE } from "../config.js";
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export function createRequest(base, fetcher = globalThis.fetch) {
  return async function request(path, { method = "GET", body, signal } = {}) {
    if (!base) throw new ApiError("Backend is not configured", 503);
    const multipart =
      typeof FormData !== "undefined" && body instanceof FormData;
    const response = await fetcher(base + path, {
      method,
      credentials: "include",
      signal,
      headers: body && !multipart ? { "Content-Type": "application/json" } : {},
      body: body ? (multipart ? body : JSON.stringify(body)) : undefined,
    });
    if (!response.ok)
      throw new ApiError(
        response.status === 409
          ? "This record changed in another session. Reload it before saving."
          : "Request failed",
        response.status,
      );
    return response.status === 204 ? null : response.json();
  };
}
export const request = createRequest(API_BASE);
export const api = {
  content: (signal) => request("/content", { signal }),
  session: () => request("/admin/session"),
  login: (body) => request("/admin/login", { method: "POST", body }),
  logout: () => request("/admin/logout", { method: "POST" }),
  password: (body) => request("/admin/password", { method: "PUT", body }),
  list: (kind) => request("/admin/" + kind),
  save: (kind, row) =>
    request(
      "/admin/" + kind + (row.id ? "/" + encodeURIComponent(row.id) : ""),
      { method: row.id ? "PUT" : "POST", body: row },
    ),
  remove: (kind, row) =>
    request("/admin/" + kind + "/" + encodeURIComponent(row.id), {
      method: "DELETE",
      body: { revision: row.revision },
    }),
  upload: (file) => {
    const body = new FormData();
    body.append("file", file);
    return request("/admin/media", { method: "POST", body });
  },
  overview: () => request("/admin/traffic"),
  articleTraffic: (slug) =>
    request("/admin/articles/" + encodeURIComponent(slug) + "/traffic"),
  contact: (body) => request("/contact", { method: "POST", body }),
  visit: (body) => request("/traffic", { method: "POST", body }),
};
