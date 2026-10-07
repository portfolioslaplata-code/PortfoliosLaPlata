import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import { site } from "../src/data/site.js";
import {
  contactHref,
  getProducts,
  getExamples,
  getShowcaseGroups,
  instagramHref,
  faqAnswer,
  planValue,
} from "../src/lib/site.js";
import { renderSeo } from "../src/lib/seo.js";
import { sectionCategories } from "../src/data/sections.js";
import { homeSection } from "../src/data/routes.js";

let server;
let renderApp;
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  renderApp = (config, path = "/") => render(path, config);
});
after(async () => {
  await server?.close();
});

test("catálogo: contenido, disponibilidad y límites usan las mismas fuentes", () => {
  const ids = sectionCategories.flatMap((category) => category.items.map((item) => item.id));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(ids.length, 18);
  const config = structuredClone(site);
  config.products[0].name = "Inicio";
  config.products[0].sections.limit = 5;
  const html = renderApp(config, "/secciones");
  assert.ok(html.includes("Hasta 5 secciones de contenido"));
  assert.ok(html.includes("Inicio · Profesional"));
  assert.ok(!html.includes("Hasta 4 secciones"));
  assert.equal((html.match(/class="section-card"/g) || []).length, ids.length);
  for (const id of ["planes", "ejemplos", "preguntas", "proceso"]) {
    assert.ok(html.includes(`href="${homeSection(id)}"`));
  }
});

test("SEO de cada ruta: título, canonical, social y datos estructurados", () => {
  const config = structuredClone(site);
  config.seo.siteUrl = "https://example.com";
  const seo = renderSeo(config, "/secciones/");
  assert.ok(seo.includes("Secciones para tu portfolio | Portfolios La Plata"));
  assert.ok(seo.includes('rel="canonical" href="https://example.com/secciones"'));
  assert.ok(seo.includes('property="og:url" content="https://example.com/secciones"'));
  assert.ok(seo.includes('"@type":"CollectionPage"'));
  assert.ok(!seo.includes("minPrice"));
  assert.ok(renderSeo(config).includes('"@type":"Service"'));
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

test("límites, tipos y ajustes cambian desde datos en tarjetas, comparativa y FAQ", () => {
  const config = structuredClone(site);
  const essential = config.products[0];
  essential.sections.limit = 5;
  essential.revisions.count = 3;
  config.sectionTypes.editorial = {
    name: "Secciones editoriales",
    label: "Editoriales",
    description: "Definición de prueba configurable.",
    examples: ["Ejemplo editorial configurable"],
  };
  essential.sections.types.push("editorial");
  assert.equal(
    planValue(essential, "sections", config),
    "Hasta 5 secciones de contenido",
  );
  assert.equal(
    planValue(essential, "sectionTypes", config),
    "Estándar + Editoriales",
  );
  assert.equal(
    planValue(essential, "revisions", config),
    "3 rondas de ajustes",
  );
  const answer = faqAnswer(
    config.faq.find((item) => item.id === "diferencia"),
    config,
  );
  assert.ok(answer.includes("Hasta 5 secciones de contenido"));
  assert.ok(answer.includes("Estándar + Editoriales"));
  const html = renderApp(config);
  // Tarjeta, ambas comparativas (desktop/móvil) y FAQ usan el nuevo límite.
  assert.equal((html.match(/Hasta 5 secciones de contenido/g) || []).length, 4);
  assert.ok(!html.includes("Hasta 4 secciones"));
  assert.equal((html.match(/3 rondas de ajustes/g) || []).length, 3);
  assert.ok(html.includes("Ejemplo editorial configurable"));
  assert.ok(html.includes("Definición de prueba configurable."));
  config.pricing.contentNote = "Regla de cómputo actualizada.";
  assert.ok(
    faqAnswer(
      config.faq.find((item) => item.id === "secciones"),
      config,
    ).includes(config.pricing.contentNote),
  );
  config.sectionTypes.standard.description = "Nueva definición estándar.";
  assert.ok(
    faqAnswer(
      config.faq.find((item) => item.id === "tipos"),
      config,
    ).includes("Nueva definición estándar."),
  );
  assert.equal(
    planValue(config.products[2], "sections", config),
    config.pricing.customLimit,
  );
  assert.equal(
    planValue(config.products[2], "revisions", config),
    config.pricing.customRevisions,
  );
});
