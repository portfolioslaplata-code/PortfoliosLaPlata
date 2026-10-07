import { createServer } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { site } from "../src/data/site.js";
import { absoluteSiteUrl, renderSeo } from "../src/lib/seo.js";
import { routes } from "../src/data/routes.js";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const path = resolve("dist/index.html");
  const html = await readFile(path, "utf8");
  for (const route of routes) {
    const directory = resolve("dist", route.path.slice(1));
    await mkdir(directory, { recursive: true });
    const page = html
      .replace(/<!--site-head:start-->[\s\S]*?<!--site-head:end-->/, () => renderSeo(site, route.path))
      .replace('id="root"', `id="root" data-route="${route.path}"`)
      .replace("<!--app-html-->", () => render(route.path));
    await writeFile(resolve(directory, "index.html"), page);
  }
  const url = absoluteSiteUrl(site.seo.siteUrl);
  await writeFile(
    resolve("dist/robots.txt"),
    `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}sitemap.xml\n` : ""}`,
  );
  if (url)
    await writeFile(
      resolve("dist/sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(route.path.slice(1), url).href.replace(/&/g, "&amp;")}</loc></url>`).join("")}</urlset>`,
    );
  console.log(
    "HTML prerenderizado y metadatos generados. Canonical:",
    url || "pendiente de dominio definitivo",
  );
} finally {
  await server.close();
}
