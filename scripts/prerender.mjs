import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { site } from "../src/data/site.js";
import { absoluteSiteUrl } from "../src/lib/seo.js";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const path = resolve("dist/index.html");
  const html = await readFile(path, "utf8");
  await writeFile(path, html.replace("<!--app-html-->", render()));
  const url = absoluteSiteUrl(site.seo.siteUrl);
  await writeFile(
    resolve("dist/robots.txt"),
    `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}sitemap.xml\n` : ""}`,
  );
  if (url)
    await writeFile(
      resolve("dist/sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.replace(/&/g, "&amp;")}</loc></url></urlset>`,
    );
  console.log(
    "HTML prerenderizado y metadatos generados. Canonical:",
    url || "pendiente de dominio definitivo",
  );
} finally {
  await server.close();
}
