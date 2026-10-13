import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";
const root = process.cwd(),
  output = path.join(
    root,
    "handoff",
    "durob-alarabia-react-" + new Date().toISOString().replace(/[:.]/g, "-"),
  );
await access(path.join(root, "dist/index.html"));
await mkdir(output, { recursive: true });
for (const item of [
  "src",
  "css",
  "public",
  "content",
  "scripts",
  "tests",
  "docs",
  "dist",
  "package.json",
  "package-lock.json",
  "vite.config.js",
  "index.html",
  "README.md",
  ".env.example",
  ".gitignore",
])
  await cp(path.join(root, item), path.join(output, item), {
    recursive: true,
    filter: (source) => !source.split(path.sep).includes("__pycache__"),
  });
console.log(output);
