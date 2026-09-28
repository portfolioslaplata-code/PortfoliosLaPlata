import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/data/site.js";
import { renderSeo } from "./src/lib/seo.js";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-metadata",
      transformIndexHtml: (html) =>
        html.replace("<!--site-head-->", renderSeo(site)),
    },
  ],
});
