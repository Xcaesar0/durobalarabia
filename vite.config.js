import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: { manifest: true },
  server: { port: 5173 },
  preview: { port: 4173 },
});
