export const SITE_URL = (import.meta.env?.VITE_SITE_URL || "").replace(
  /\/$/,
  "",
);
export const API_BASE = (import.meta.env?.VITE_API_BASE_URL || "").replace(
  /\/$/,
  "",
);
export const PREVIEW_MODE = !API_BASE;
