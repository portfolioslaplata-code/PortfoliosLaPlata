import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/data/site.js";
import { renderSeo } from "./src/lib/seo.js";
import { routes, normalizePath } from "./src/data/routes.js";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-metadata",
      configurePreviewServer(server) {
        // Vite's SPA fallback otherwise serves home for extensionless URLs.
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url, "http://localhost");
          const path = normalizePath(url.pathname);
          if (path !== "/" && routes.some((route) => route.path === path)) {
            request.url = `${path}/index.html${url.search}`;
          }
          next();
        });
      },
      transformIndexHtml: (html) =>
        html.replace("<!--site-head-->", `<!--site-head:start-->${renderSeo(site)}<!--site-head:end-->`),
    },
  ],
});
