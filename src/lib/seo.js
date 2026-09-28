import { getProducts } from "./site.js";
import { theme } from "../data/theme.js";
import { renderThemeHead } from "./theme.js";

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

export function absoluteSiteUrl(value) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol)
      ? `${url.origin}${url.pathname.replace(/\/$/, "")}/`
      : null;
  } catch {
    return null;
  }
}

export function renderSeo(site) {
  const seo = site.seo;
  const url = absoluteSiteUrl(seo.siteUrl);
  const socialImage =
    url && seo.socialImage ? new URL(seo.socialImage, url).href : null;
  const organization = {
    "@type": "Organization",
    name: site.brand.name,
    email: site.contact.email,
    description: seo.description,
    ...(url ? { url } : {}),
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Creación de portfolios profesionales",
    description: seo.description,
    serviceType: "Diseño de portfolios web profesionales",
    provider: organization,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url || `mailto:${site.contact.email}`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Portfolios profesionales",
      itemListElement: getProducts(site).map((product) => ({
        "@type": "Offer",
        name: product.name,
        description: product.description,
        itemOffered: { "@type": "Service", name: product.name },
        ...(product.price != null
          ? {
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: product.price,
                priceCurrency: product.currency,
              },
            }
          : {}),
      })),
    },
  };
  return [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<meta name="theme-color" content="${theme.primary}">`,
    renderThemeHead(),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escape(site.brand.name)}">`,
    `<meta property="og:locale" content="${escape(seo.locale)}">`,
    `<meta property="og:title" content="${escape(seo.title)}">`,
    `<meta property="og:description" content="${escape(seo.description)}">`,
    `<meta name="twitter:card" content="${socialImage ? "summary_large_image" : "summary"}">`,
    `<meta name="twitter:title" content="${escape(seo.title)}">`,
    `<meta name="twitter:description" content="${escape(seo.description)}">`,
    ...(url
      ? [
          `<link rel="canonical" href="${escape(url)}">`,
          `<meta property="og:url" content="${escape(url)}">`,
        ]
      : []),
    ...(socialImage
      ? [
          `<meta property="og:image" content="${escape(socialImage)}">`,
          `<meta property="og:image:alt" content="${escape(seo.socialImageAlt)}">`,
          `<meta name="twitter:image" content="${escape(socialImage)}">`,
          `<meta name="twitter:image:alt" content="${escape(seo.socialImageAlt)}">`,
        ]
      : []),
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
