import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";
import { site } from "../src/data/site.js";
import { contactHref, demoComposition, faqAnswer, getCatalog, getComplements, getExamples, getSection, instagramHref, pricingExample, serviceText } from "../src/lib/site.js";
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
  assert.equal(site.pricingModel.base.price, 80000);
  assert.equal(site.pricingModel.sectionTypes.standard.price, 20000);
  assert.equal(site.pricingModel.sectionTypes.advanced.price, 40000);
  assert.equal(pricingExample(site).total, 140000);
  assert.equal(site.pricing.example.total, undefined);
  const config = structuredClone(site);
  for (const [sectionCounts, total] of [
    [{ standard: 2 }, 120000],
    [{ standard: 3 }, 140000],
    [{ standard: 3, advanced: 1 }, 180000],
  ]) {
    config.pricing.example.sectionCounts = sectionCounts;
    assert.equal(pricingExample(config).total, total);
  }
  for (const path of ["/", "/secciones"]) {
    const html = renderApp(site, path);
    assert.doesNotMatch(html, /(?:130|30|65|15)\.000/);
    for (const price of ["80.000", "20.000", "40.000", "10.000"]) assert.ok(html.includes(price));
  }
  assert.deepEqual(schema(site).hasOfferCatalog.itemListElement.slice(0, 3).map((item) => item.priceSpecification.minPrice), [80000, 20000, 40000]);
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
  assert.ok(faqAnswer(config.faq.find((item) => item.id === "precio"), config).includes("Secciones de prueba"));
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
  assert.equal((html.match(/class="section-card"/g) || []).length, 19);
  assert.ok(!html.includes("Disponible en"));
});

test("detalles completos y complementos independientes con precio central editable", () => {
  const config = structuredClone(site);
  config.pricingModel.complements["download-cv"].price = 19000;
  const complement = getComplements(config);
  assert.equal(complement.items.length, 1);
  assert.equal(complement.items[0].id, "download-cv");
  assert.equal(complement.items[0].price, 19000);
  assert.deepEqual(getCatalog(config).map((category) => category.items.length), [10, 8]);
  for (const category of [...getCatalog(config), complement]) {
    assert.ok(category.itemLabel);
    assert.ok(category.detailNote);
    for (const item of category.items) {
      assert.ok(item.details.description.length > item.description.length);
      assert.ok(item.details.includes.length >= 3);
      assert.ok(item.idealFor && item.preview.type);
    }
  }
  const html = renderApp(config, "/secciones");
  assert.ok(html.includes("19.000"));
  assert.ok(!html.includes("10.000"));
  assert.ok(html.includes('href="/secciones#complements"'));
  // FAQ now explains complement prices; demo composition and the section budget stay independent.
  assert.ok(faqAnswer(config.faq.find((item) => item.id === "precio"), config).includes("19.000"));
  assert.deepEqual(config.portfolioExamples.map((example) => demoComposition(example, config).compactSummary), site.portfolioExamples.map((example) => demoComposition(example, site).compactSummary));
  assert.equal(pricingExample(config).total, pricingExample(site).total);
});

test("demos por estilo: composición derivada, bloques combinados y visibilidad independiente", () => {
  assert.deepEqual(site.portfolioExamples.map((example) => example.name), ["Editorial", "Minimal", "Profundidad"]);
  const compositions = site.portfolioExamples.map((example) => demoComposition(example, site));
  assert.deepEqual(compositions.map((item) => item.blocks.length), [5, 6, 8]);
  assert.equal(compositions[0].summary, "5 secciones estándar");
  assert.equal(compositions[1].summary, "6 secciones estándar");
  assert.equal(compositions[2].summary, "6 secciones estándar + 2 secciones avanzadas");
  assert.equal(compositions[2].compactSummary, "6 estándar + 2 avanzadas");
  assert.deepEqual(compositions.map((item) => item.counts), [
    { standard: 5, advanced: 0 }, { standard: 6, advanced: 0 }, { standard: 6, advanced: 2 },
  ]);
  assert.deepEqual(compositions.map((item) => item.totalSections), [5, 6, 8]);
  assert.deepEqual(compositions.map((item) => item.complementCount), [0, 0, 1]);
  assert.deepEqual(compositions[2].complements, getComplements(site).items);
  assert.equal(compositions[2].complements[0].id, "download-cv");
  assert.equal(compositions[2].complementsSummary, "CV descargable");
  assert.deepEqual(compositions.slice(0, 2).map((item) => item.complementsSummary), ["", ""]);
  assert.ok(compositions[0].blocks.some((block) => block.name === "Experiencia y Formación"));
  assert.ok(compositions[1].blocks.some((block) => block.name === "Experiencia y Formación"));
  const expectedIds = [
    [["about"], ["projects"], ["services"], ["experience", "education"], ["skills"]],
    [["about"], ["services"], ["achievements"], ["experience", "education"], ["certifications"], ["skills"]],
    [["achievements"], ["case-study"], ["about"], ["experience"], ["education"], ["services"], ["skills"], ["testimonials"]],
  ];
  for (const [index, ids] of expectedIds.entries()) {
    assert.deepEqual(site.portfolioExamples[index].sections.map((block) => block.sectionIds), ids);
    assert.deepEqual(compositions[index].blocks, ids.map((group) => ({
      name: group.map((id) => getSection(id).name).join(" y "), type: getSection(group[0]).type,
    })));
  }
  const config = structuredClone(site);
  config.portfolioExamples[0].enabled = false;
  config.portfolioExamples[1].name = "Nueva mirada";
  assert.equal(getExamples(config).length, 2);
  assert.ok(renderApp(config).includes("Nueva mirada"));
  config.portfolioExamples = [];
  assert.doesNotThrow(() => renderApp(config));
});

test("composición opcional y cantidades derivadas al cambiar bloques y complementos", () => {
  const example = structuredClone(site.portfolioExamples[2]);
  for (const complements of [undefined, null, []]) {
    example.complements = complements;
    const composition = demoComposition(example, site);
    assert.equal(composition.totalSections, 8);
    assert.equal(composition.complementCount, 0);
    assert.equal(composition.complementsSummary, "");
    const html = renderApp({ ...site, portfolioExamples: [example] });
    assert.ok(!html.includes('class="demo-complements"'));
    assert.ok(!html.includes("0 complementos"));
  }
  example.sections = [{ sectionIds: ["experience", "education"] }, { sectionIds: ["case-study"] }];
  example.complements = ["download-cv"];
  const composition = demoComposition(example, site);
  assert.deepEqual(composition.counts, { standard: 1, advanced: 1 });
  assert.equal(composition.totalSections, 2);
  assert.equal(composition.compactSummary, "1 estándar + 1 avanzada");
  assert.equal(composition.complementCount, 1);
  example.sections = [];
  assert.equal(demoComposition(example, site).totalSections, 0);
});

test("composición rechaza IDs inválidos, categorías incompatibles y duplicados", () => {
  const base = { id: "invalid-demo", sections: [], complements: [] };
  for (const id of ["missing", "download-cv"]) {
    assert.throws(() => demoComposition({ ...base, sections: [{ sectionIds: [id] }] }, site), /Unknown section/);
  }
  for (const sectionIds of [[], undefined, "about", ["about", "case-study"]]) {
    assert.throws(() => demoComposition({ ...base, sections: [{ sectionIds }] }, site), /Invalid section group/);
  }
  for (const sections of [
    [{ sectionIds: ["about", "about"] }],
    [{ sectionIds: ["experience", "education"] }, { sectionIds: ["education"] }],
  ]) assert.throws(() => demoComposition({ ...base, sections }, site), /Duplicate section/);
  for (const id of ["missing", "about", "timeline"]) {
    assert.throws(() => demoComposition({ ...base, complements: [id] }, site), /Unknown complement/);
  }
  assert.throws(() => demoComposition({ ...base, complements: ["download-cv", "download-cv"] }, site), /Duplicate complement/);
  assert.throws(() => demoComposition({ ...base, complements: "download-cv" }, site), /Invalid complements/);
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
  for (const [id, value] of [["base", config.pricing.contentNote], ["precio", config.pricing.note], ["pago", config.pricing.payment]]) {
    assert.ok(faqAnswer(config.faq.find((item) => item.id === id), config).includes(value));
  }
  config.pricing.example.sectionCounts = { missing: 2 };
  assert.throws(() => pricingExample(config), /Invalid pricing example/);
});

test("FAQ cubre las condiciones aprobadas sin duplicados ni marcadores pendientes", () => {
  assert.equal(site.faq.length, 11);
  assert.equal(new Set(site.faq.map((item) => item.id)).size, site.faq.length);
  assert.equal(new Set(site.faq.map((item) => item.question)).size, site.faq.length);
  for (const item of site.faq) {
    const answer = faqAnswer(item, site);
    assert.ok(answer.length > 40);
    assert.doesNotMatch(answer, /\{\w+\}|Una ronda inicial|cambios ilimitados/);
  }
  const answer = (id) => faqAnswer(site.faq.find((item) => item.id === id), site);
  assert.match(answer("actualizar"), /2 rondas de revisión.*1 ronda adicional.*6 meses/);
  assert.match(answer("actualizar"), /varias observaciones/);
  assert.match(answer("actualizar"), /errores de nuestro desarrollo se corrigen sin consumir rondas/);
  assert.match(answer("pago"), /5 días hábiles.*presupuesto.*anticipo.*materiales/);
  assert.match(answer("pago"), /50% después de aprobar.*antes de la publicación/);
  assert.match(answer("alojamiento"), /12 meses desde la publicación definitiva/);
  assert.match(answer("alojamiento"), /al menos 60 días/);
  assert.match(answer("alojamiento"), /sin cargos automáticos ni garantía/);
  assert.match(answer("dominio"), /10\.000 ARS.*por única vez/);
  assert.match(answer("dominio"), /sin pedirte contraseñas personales/);
  assert.match(answer("entrega"), /aprobado y pagado por completo.*transferencia gratuita/);
  assert.match(answer("entrega"), /no traslada automáticamente el alojamiento/);
  assert.match(answer("material"), /No inventamos/);
  assert.equal(site.pricingModel.complements["download-cv"].price, 10000);
  assert.equal(site.pricingModel.domainSetup.price, 10000);
  assert.throws(() => serviceText("{unknown}", site), /Unknown service condition/);
  assert.throws(() => faqAnswer({ answerTemplate: "{unknown}" }, site), /Unknown FAQ value/);
});

test("cambiar dominio o condiciones centrales actualiza FAQ, Precios y Proceso sin afectar catálogo", () => {
  const config = structuredClone(site);
  config.pricingModel.domainSetup.price = 18000;
  Object.assign(config.serviceTerms, {
    firstVersionBusinessDays: 8, prePublicationRounds: 3,
    updateMonths: 9, hostingMonths: 18, hostingNoticeDays: 75, depositPercent: 40,
  });
  const html = renderApp(config);
  const pricing = html.match(/<section id="precios"[\s\S]*?<\/section>/)[0];
  const process = html.match(/<section id="proceso"[\s\S]*?<\/section>/)[0];
  const faq = html.match(/<section id="preguntas"[\s\S]*?<\/section>/)[0];
  for (const content of [pricing, faq]) {
    for (const text of ["18.000", "3 rondas", "9 meses", "18 meses", "40%", "60%"])
      assert.ok(content.includes(text), text);
    assert.doesNotMatch(content, /configuración estándar (?:por|cuesta) \$\s*10\.000/);
  }
  for (const text of ["8 días hábiles", "3 rondas", "40%"])
    assert.ok(process.includes(text), text);
  assert.ok(faq.includes("75 días"));
  assert.equal(renderApp(config, "/secciones"), renderApp(site, "/secciones"));
  assert.equal(renderSeo(config), renderSeo(site));
  assert.equal(pricingExample(config).total, 140000);
  assert.deepEqual(getComplements(config).items.map((item) => item.id), ["download-cv"]);
  assert.doesNotMatch(html, /\{(?:firstVersionBusinessDays|prePublicationRounds|updateMonths|hostingMonths|depositPercent|domainSetupPrice)\}/);
});
