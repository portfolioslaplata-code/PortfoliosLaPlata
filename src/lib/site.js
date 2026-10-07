export function getProducts(site) {
  return site.products.filter((product) => product.enabled !== false);
}

export function getExamples(site) {
  const products = getProducts(site);
  return site.portfolioExamples.filter((example) =>
    products.some((product) => product.id === example.productId),
  );
}

export function contactHref(contact, productName) {
  const message = productName
    ? contact.planMessage.replace("{product}", productName)
    : contact.whatsappMessage;
  const phone = contact.whatsapp.replace(/[\s()+-]/g, "");
  if (/^[1-9]\d{7,14}$/.test(phone))
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(message)}`;
}

export function getShowcaseGroups(site) {
  const examples = getExamples(site);
  return getProducts(site)
    .map((product) => ({
      product,
      models: examples.filter((example) => example.productId === product.id),
    }))
    .filter((group) => group.models.length > 0);
}

export function instagramHref(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["instagram.com", "www.instagram.com"].includes(url.hostname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function priceLabel(product) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price);
}

export function planValue(product, key, site) {
  const { pricing } = site;
  if (key === "sections") {
    return product.sections?.limit == null
      ? pricing.customLimit
      : pricing.sectionLimit.replace("{count}", product.sections.limit);
  }
  if (key === "sectionTypes") {
    return (
      (product.sections?.types || [])
        .map((id) => site.sectionTypes[id]?.label)
        .filter(Boolean)
        .join(" + ") || pricing.fallback
    );
  }
  if (key === "revisions") {
    const revisions = product.revisions;
    if (revisions?.count == null) return pricing.customRevisions;
    const template = revisions.upTo
      ? pricing.revisionUpTo
      : revisions.count === 1
        ? pricing.revisionOne
        : pricing.revisionMany;
    return template.replace("{count}", revisions.count);
  }
  return product.comparison?.[key] || pricing.fallback;
}

export function faqAnswer(item, site) {
  if (item.answerKey === "paymentAndDelivery") {
    return `${site.pricing.payment} ${site.pricing.delivery}`;
  }
  if (!item.answerTemplate) return item.answer;
  return item.answerTemplate.replace(/\{([\w.]+)\}/g, (_, token) => {
    if (token === "contentNote") return site.pricing.contentNote;
    const [id, key, field] = token.split(".");
    if (id === "sectionTypes")
      return site.sectionTypes[key]?.[field] || site.pricing.fallback;
    const product = site.products.find((item) => item.id === id);
    return product ? planValue(product, key, site) : site.pricing.fallback;
  });
}
