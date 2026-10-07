import { sectionCategories } from "../data/sections.js";

export function getExamples(site) {
  return site.portfolioExamples.filter((example) => example.enabled !== false);
}

export function contactHref(contact) {
  const phone = contact.whatsapp.replace(/[\s()+-]/g, "");
  if (/^[1-9]\d{7,14}$/.test(phone))
    return `https://wa.me/${phone}?text=${encodeURIComponent(contact.message)}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(contact.message)}`;
}

export function instagramHref(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["instagram.com", "www.instagram.com"].includes(url.hostname) ? url.href : null;
  } catch { return null; }
}

export function priceLabel(price, currency = "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency", currency, maximumFractionDigits: 0,
  }).format(price);
}

export function startingPrice(site, item, perSection = false) {
  const model = site.pricingModel;
  if (item.price == null) return model.customQuote;
  return `${model.startingAt} ${priceLabel(item.price, model.currency)} ${model.currency}${perSection ? ` ${model.perSection}` : ""}`;
}

export function getCatalog(site) {
  return sectionCategories.map((category) => ({
    ...category, ...site.pricingModel.sectionTypes[category.id],
  }));
}

export function getSection(id) {
  for (const category of sectionCategories) {
    const item = category.items.find((section) => section.id === id);
    if (item) return { ...item, type: category.id };
  }
  throw new Error(`Unknown section: ${id}`);
}

export function sectionCountLabel(site, type, count) {
  const definition = site.pricingModel.sectionTypes[type];
  return (count === 1 ? definition.countOne : definition.countMany).replace("{count}", count);
}

// Combined content such as experience + education counts as one demo block.
export function demoComposition(example, site) {
  const counts = {};
  const blocks = example.sections.map(({ sectionIds }) => {
    const items = sectionIds.map(getSection);
    const type = items[0]?.type;
    if (!type || items.some((item) => item.type !== type))
      throw new Error(`Invalid section group in demo: ${example.id}`);
    counts[type] = (counts[type] || 0) + 1;
    return { name: items.map((item) => item.name).join(" y "), type };
  });
  return {
    blocks,
    summary: Object.keys(site.pricingModel.sectionTypes)
      .filter((type) => counts[type])
      .map((type) => sectionCountLabel(site, type, counts[type])).join(" + "),
  };
}

// Static editorial illustration, not a quote or interactive calculator.
export function pricingExample(site) {
  const model = site.pricingModel;
  const additions = Object.entries(site.pricing.example.sectionCounts).map(([type, count]) => {
    if (!model.sectionTypes[type] || !Number.isInteger(count) || count < 1)
      throw new Error(`Invalid pricing example: ${type}`);
    return { type, count, label: sectionCountLabel(site, type, count), unitPrice: model.sectionTypes[type].price };
  });
  return {
    additions,
    total: model.base.price + additions.reduce((sum, item) => sum + item.count * item.unitPrice, 0),
  };
}

export function faqAnswer(item, site) {
  if (!item.answerTemplate) return item.answer;
  const model = site.pricingModel;
  const values = {
    baseName: model.base.name,
    basePrice: startingPrice(site, model.base),
    baseIncludes: model.base.includes.join("; "),
    sectionPrices: Object.values(model.sectionTypes).map((type) => `${type.name}: ${startingPrice(site, type, true)}.`).join(" "),
    typeDescriptions: Object.values(model.sectionTypes).map((type) => `${type.name}: ${type.description}`).join(" "),
    customDescription: model.custom.description,
    customQuote: model.customQuote,
    customNote: model.custom.note,
    contentNote: site.pricing.contentNote,
    pricingNote: site.pricing.note,
    payment: site.pricing.payment,
    delivery: site.pricing.delivery,
  };
  return item.answerTemplate.replace(/\{(\w+)\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Unknown FAQ value: ${key}`);
    return values[key];
  });
}
