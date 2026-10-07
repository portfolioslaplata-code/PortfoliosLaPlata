import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import { site } from "../src/data/site.js";
import { contactHref, demoComposition, faqAnswer, getCatalog, getExamples, getSection, instagramHref, pricingExample } from "../src/lib/site.js";
import { renderSeo } from "../src/lib/seo.js";
import { sectionCategories } from "../src/data/sections.js";

let server;
let renderApp;
before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  renderApp = (config, path = "/") => render(path, config);
});
after(async () => { await server?.close(); });

function schema(config, path = "/") {
  return JSON.parse(renderSeo(config, path).match(/<script type="application\/ld\+json">(.+)<\/script>/)[1]);
}

test("base y secciones: precios mínimos y ejemplo orientativo, sin total duplicado", () => {
  assert.equal(site.pricingModel.base.price, 130000);
  assert.equal(site.pricingModel.sectionTypes.standard.price, 30000);
  assert.equal(site.pricingModel.sectionTypes.advanced.price, 65000);
  assert.equal(pricingExample(site).total, 220000);
  assert.equal(site.pricing.example.total, undefined);
  const config = structuredClone(site);
  config.pricingModel.base.price = 145000;
  config.pricingModel.sectionTypes.standard.price = 41000;
  config.pricingModel.sectionTypes.advanced.price = 79000;
  config.pricing.example.sectionCounts = { standard: 2, advanced: 1 };
  assert.equal(pricingExample(config).total, 306000);
  const home = renderApp(config);
  const catalog = renderApp(config, "/secciones");
  for (const price of ["145.000", "41.000", "79.000"]) {
    assert.ok(home.includes(price));
    assert.ok(catalog.includes(price));
  }
  assert.ok(home.includes("306.000"));
  assert.deepEqual(schema(config).hasOfferCatalog.itemListElement.slice(0, 3).map((item) => item.priceSpecification.minPrice), [145000, 41000, 79000]);
});

test("incluidos, tipos y FAQ se actualizan desde una única definición", () => {
  const config = structuredClone(site);
  config.pricingModel.base.includes.push("Incluido de prueba");
  config.pricingModel.sectionTypes.standard.name = "Secciones de prueba";
  config.pricingModel.sectionTypes.standard.description = "Descripción central de prueba.";
  const home = renderApp(config);
  const catalog = renderApp(config, "/secciones");
  assert.ok(home.includes("Incluido de prueba"));
  for (const html of [home, catalog]) {
    assert.ok(html.includes("Secciones de prueba"));
    assert.ok(html.includes("Descripción central de prueba."));
  }
  assert.ok(faqAnswer(config.faq.find((item) => item.id === "base"), config).includes("Incluido de prueba"));
  assert.ok(faqAnswer(config.faq.find((item) => item.id === "tipos"), config).includes("Descripción central de prueba."));
  assert.equal(site.products, undefined);
  assert.equal(site.comparison, undefined);
  assert.equal(site.sectionTypes, undefined);
});

test("catálogo conserva 18 opciones y toda referencia apunta a una sección válida", () => {
  const ids = sectionCategories.flatMap((category) => category.items.map((item) => item.id));
  assert.equal(ids.length, 18);
  assert.equal(new Set(ids).size, ids.length);
  for (const type of Object.values(site.pricingModel.sectionTypes))
    for (const id of type.exampleIds) assert.ok(getSection(id));
  assert.deepEqual(getCatalog(site).map((category) => category.items.length), [10, 8]);
  assert.throws(() => getSection("missing"), /Unknown section/);
  const html = renderApp(site, "/secciones");
  assert.equal((html.match(/class="section-card"/g) || []).length, 18);
  assert.ok(!html.includes("Disponible en"));
});

test("demos por estilo: composición derivada, bloques combinados y visibilidad independiente", () => {
  assert.deepEqual(site.portfolioExamples.map((example) => example.name), ["Editorial", "Minimal", "Profundidad"]);
  const compositions = site.portfolioExamples.map((example) => demoComposition(example, site));
  assert.deepEqual(compositions.map((item) => item.blocks.length), [5, 5, 8]);
  assert.equal(compositions[0].summary, "5 secciones estándar");
  assert.equal(compositions[2].summary, "5 secciones estándar + 3 secciones avanzadas");
  assert.ok(compositions[0].blocks.some((block) => block.name === "Experiencia y Formación"));
  const config = structuredClone(site);
  config.portfolioExamples[0].enabled = false;
  config.portfolioExamples[1].name = "Nueva mirada";
  assert.equal(getExamples(config).length, 2);
  assert.ok(renderApp(config).includes("Nueva mirada"));
  config.portfolioExamples = [];
  assert.doesNotThrow(() => renderApp(config));
});

test("ambas rutas carecen de paquetes cerrados, comparativas y enlaces retirados", () => {
  for (const path of ["/", "/secciones"]) {
    const html = renderApp(site, path);
    const publicText = html.replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(publicText, /\b(?:planes|Esencial|Esenciales|Profesional|Personalizado)\b/);
    assert.ok(!html.includes('href="/#planes"'));
    assert.ok(!html.includes('class="comparison"'));
    assert.ok(html.includes('href="/#precios"'));
  }
  assert.doesNotMatch(renderSeo(site), /Esencial|Profesional|Personalizado/);
});

test("contacto general codificado por igual en WhatsApp y fallback email", () => {
  const contact = { ...site.contact, whatsapp: "+54 9 221 555-0100" };
  const whatsapp = new URL(contactHref(contact));
  assert.equal(whatsapp.pathname, "/5492215550100");
  assert.equal(whatsapp.searchParams.get("text"), contact.message);
  const email = new URL(contactHref({ ...contact, whatsapp: "pendiente" }));
  assert.equal(email.protocol, "mailto:");
  assert.equal(email.searchParams.get("body"), contact.message);
  assert.equal(instagramHref(""), null);
  assert.equal(instagramHref("https://www.instagram.com/mi-perfil/"), "https://www.instagram.com/mi-perfil/");
  assert.equal(instagramHref("javascript:alert(1)"), null);
  assert.equal(instagramHref("https://instagram.com.example.org/"), null);
});

test("SEO por ruta y precios mínimos por unidad sin ofertas de paquetes", () => {
  const config = structuredClone(site);
  config.seo.siteUrl = "https://example.com";
  config.seo.socialImage = "/images/social.jpg";
  const seo = renderSeo(config, "/secciones/");
  assert.ok(seo.includes('rel="canonical" href="https://example.com/secciones"'));
  assert.ok(seo.includes('property="og:url" content="https://example.com/secciones"'));
  assert.ok(seo.includes('content="https://example.com/images/social.jpg"'));
  assert.ok(seo.includes("summary_large_image"));
  assert.equal(schema(config, "/secciones")["@type"], "CollectionPage");
  const offers = schema(config).hasOfferCatalog.itemListElement;
  assert.deepEqual(offers.map((offer) => offer.name), ["Portfolio Base", "Secciones estándar", "Secciones avanzadas", "Desarrollo a medida"]);
  assert.equal(offers[1].priceSpecification.referenceQuantity.unitText, "sección");
  assert.equal(offers[3].priceSpecification, undefined);
});

test("las reglas comerciales de base, complejidad y pago llegan a las FAQ", () => {
  const config = structuredClone(site);
  config.pricing.contentNote = "Regla de base actualizada.";
  config.pricing.note = "Alcance variable actualizado.";
  config.pricing.payment = "Forma de pago de prueba.";
  for (const [id, value] of [["secciones", config.pricing.contentNote], ["precio", config.pricing.note], ["pago", config.pricing.payment]]) {
    assert.ok(faqAnswer(config.faq.find((item) => item.id === id), config).includes(value));
  }
  config.pricing.example.sectionCounts = { missing: 2 };
  assert.throws(() => pricingExample(config), /Invalid pricing example/);
});