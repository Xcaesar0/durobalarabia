import snapshot from "../../content/site.json";
const KEY = "durob-frontend-preview-content-v1";
export const seedContent = structuredClone(snapshot);
export function loadPreview() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(data?.articles) && Array.isArray(data?.programs))
      return data;
  } catch {}
  return structuredClone(seedContent);
}
export function savePreview(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("durob-content-change"));
}
