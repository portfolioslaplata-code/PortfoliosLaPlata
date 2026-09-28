import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { site } from "../src/data/site.js";
import {
  contactHref,
  getProducts,
  getExamples,
  getShowcaseGroups,
  instagramHref,
  faqAnswer,
} from "../src/lib/site.js";
import { renderSeo } from "../src/lib/seo.js";

let server;
let renderApp;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  renderApp = (config) => renderToString(createElement(App, { site: config }));
});
after(async () => {
  await server?.close();
});

test("sin WhatsApp ni Instagram hay email válido y no hay enlaces rotos", () => {
  assert.match(
    contactHref(site.contact),
    /^mailto:portfolioslaplata@gmail.com\?/,
  );
  assert.equal(instagramHref(""), null);
  const html = renderApp(site);
  assert.ok(!html.includes("https://wa.me/"));
  assert.ok(!html.includes("https://instagram.com"));
  assert.ok(!html.includes('href=""'));
});

test("WhatsApp configurado codifica el mensaje general y el plan; valores inválidos usan email", () => {
  const contact = { ...site.contact, whatsapp: "+54 9 221 555-0100" };
  const url = new URL(contactHref(contact, "Profesional"));
  assert.equal(url.pathname, "/5492215550100");
  assert.equal(
    url.searchParams.get("text"),
    "Me interesa el plan Profesional. ¿Podemos conversar?",
  );
  assert.equal(
    new URL(contactHref(contact)).searchParams.get("text"),
    contact.whatsappMessage,
  );
  assert.match(contactHref({ ...contact, whatsapp: "pendiente" }), /^mailto:/);
  assert.equal(
    instagramHref("https://www.instagram.com/mi-perfil/"),
    "https://www.instagram.com/mi-perfil/",
  );
  assert.equal(instagramHref("javascript:alert(1)"), null);
  assert.equal(instagramHref("https://instagram.com.example.org/"), null);
});

test("eliminar o desactivar productos actualiza tarjetas, comparativa, demos y SEO", () => {
  const config = structuredClone(site);
  config.products = config.products.filter(
    (product) => product.id !== "esencial",
  );
  config.products.find((product) => product.id === "profesional").enabled =
    false;
  assert.equal(getProducts(config).length, 1);
  assert.equal(getExamples(config).length, 0);
  const html = renderApp(config);
  assert.equal((html.match(/class="product-card/g) || []).length, 1);
  assert.ok(!html.includes("esencial-sigma.vercel.app"));
  assert.ok(!html.includes("profesional-virid.vercel.app"));
  assert.ok(!renderSeo(config).includes("minPrice"));
  config.products = [];
  assert.doesNotThrow(() => renderApp(config));
});

test("agregar una demo y un producto solo requiere configuración", () => {
  const config = structuredClone(site);
  config.products.push({
    ...config.products[0],
    id: "nuevo",
    name: "Nuevo plan",
    price: 123456,
    badge: "Lanzamiento",
    cta: "Consultar nuevo plan",
  });
  config.portfolioExamples.push({
    ...config.portfolioExamples[0],
    id: "nuevo-01",
    productId: "nuevo",
    model: "Nueva demo de prueba",
    hero: false,
  });
  const html = renderApp(config);
  assert.equal(getProducts(config).length, 4);
  assert.equal(getExamples(config).length, 4);
  assert.ok(html.includes("Nueva demo de prueba"));
  assert.ok(html.includes("Lanzamiento"));
  assert.ok(html.includes("123.456"));
  assert.ok(renderSeo(config).includes("123456"));
});

test("los modelos se agrupan por producto y comparten el precio vigente", () => {
  const config = structuredClone(site);
  config.products[0].name = "Presentación";
  config.products[0].price = 234567;
  config.portfolioExamples.push(
    {
      ...config.portfolioExamples[0],
      id: "esencial-03",
      model: "Nuevo modelo",
      hero: false,
    },
    {
      ...config.portfolioExamples[2],
      id: "profesional-02",
      model: "Otra mirada",
    },
  );
  config.portfolioExamples.reverse();
  const groups = getShowcaseGroups(config);
  assert.deepEqual(
    groups.map(({ product, models }) => [product.name, models.length]),
    [
      ["Presentación", 3],
      ["Profesional", 2],
    ],
  );
  const html = renderApp(config);
  assert.equal((html.match(/234\.567/g) || []).length, 2);
  assert.ok(html.includes("3 modelos disponibles"));
  assert.ok(html.includes("Otra mirada"));
  config.products[0].enabled = false;
  assert.deepEqual(
    getShowcaseGroups(config).map(({ product }) => product.id),
    ["profesional"],
  );
});

test("pago, canonical e imagen social provienen de configuración", () => {
  const config = structuredClone(site);
  config.pricing.payment = "Forma de pago de prueba.";
  assert.ok(
    faqAnswer(
      config.faq.find((item) => item.id === "pago"),
      config,
    ).startsWith(config.pricing.payment),
  );
  assert.ok(!renderSeo(config).includes('rel="canonical"'));
  config.seo.siteUrl = "https://example.com";
  config.seo.socialImage = "/images/social.jpg";
  const seo = renderSeo(config);
  assert.ok(seo.includes('rel="canonical" href="https://example.com/"'));
  assert.ok(seo.includes('content="https://example.com/images/social.jpg"'));
  assert.ok(seo.includes("summary_large_image"));
});
