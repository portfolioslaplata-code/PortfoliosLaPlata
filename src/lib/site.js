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

export function faqAnswer(item, site) {
  return item.answerKey === "paymentAndDelivery"
    ? `${site.pricing.payment} ${site.pricing.delivery}`
    : item.answer;
}
