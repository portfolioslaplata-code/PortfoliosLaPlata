import { Check, ChevronDown } from "lucide-react";
import { ContactButton, MoreLink, SectionHeading } from "./ui";
import { getProducts, planValue, priceLabel } from "../lib/site";

export function ProductCard({ product, site }) {
  return (
    <article
      className={`product-card ${product.featured ? "product-featured" : ""}`}
    >
      <div className="product-name-row">
        <h3>{product.name}</h3>
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
      </div>
      <p className="product-tagline">{product.tagline}</p>
      <div className="product-price">
        {product.price != null ? (
          <>
            <span className="price-prefix">{site.pricing.startingAt}</span>
            <p>
              {priceLabel(product)} <span>{product.currency}</span>
            </p>
          </>
        ) : (
          <p className="custom-price">{site.pricing.customPrice}</p>
        )}
      </div>
      <dl className="product-facts">
        <div>
          <dt>{site.pricing.idealLabel}</dt>
          <dd>{product.description}</dd>
        </div>
        <div>
          <dt>{site.pricing.structureLabel}</dt>
          <dd>
            {planValue(product, "design", site)}
            <span>{planValue(product, "page", site)}</span>
          </dd>
        </div>
        <div className="product-section-scope">
          <dt>{site.pricing.sectionsLabel}</dt>
          <dd>
            <strong>{planValue(product, "sections", site)}</strong>
            <span>{planValue(product, "sectionTypes", site)}</span>
            {product.sectionsLink && (
              <MoreLink href={product.sectionsLink.href}>{product.sectionsLink.label}</MoreLink>
            )}
          </dd>
        </div>
      </dl>
      <ul>
        {product.features.map((feature) => (
          <li key={feature}>
            <Check size={15} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
        <li>
          <Check size={15} aria-hidden="true" />
          <span>{planValue(product, "revisions", site)}</span>
        </li>
      </ul>
      <ContactButton
        site={site}
        product={product}
        className={product.featured ? "" : "button-outline"}
      >
        {product.cta}
      </ContactButton>
    </article>
  );
}

export function Comparison({ site }) {
  const products = getProducts(site);
  if (!products.length) return null;
  return (
    <details className="comparison">
      <summary>
        {site.comparison.label}
        <ChevronDown size={20} aria-hidden="true" />
      </summary>
      <div className="comparison-content">
        <h3>{site.comparison.title}</h3>
        <p>{site.comparison.description}</p>
        <div className="comparison-desktop">
          <table>
            <caption className="sr-only">{site.comparison.title}</caption>
            <thead>
              <tr>
                <th scope="col">{site.comparison.featureLabel}</th>
                {products.map((product) => (
                  <th scope="col" key={product.id}>
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {site.comparison.rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  {products.map((product) => (
                    <td key={product.id}>
                      {planValue(product, row.key, site)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison-mobile">
          {products.map((product) => (
            <div className="comparison-mobile-product" key={product.id}>
              <h4>{product.name}</h4>
              <dl>
                {site.comparison.rows.map((row) => (
                  <div key={row.key}>
                    <dt>{row.label}</dt>
                    <dd>{planValue(product, row.key, site)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

export default function Products({ site }) {
  return (
    <section id="planes" className="pricing section-space">
      <div className="container">
        <SectionHeading {...site.pricing} className="heading-centered" />
        <div className="products-grid">
          {getProducts(site).map((product) => (
            <ProductCard key={product.id} product={product} site={site} />
          ))}
        </div>
        <p className="content-count-note">{site.pricing.contentNote}</p>
        <details className="section-guide">
          <summary>
            {site.pricing.sectionGuideLabel}
            <ChevronDown size={18} aria-hidden="true" />
          </summary>
          <div className="section-types-grid">
            {Object.entries(site.sectionTypes).map(([id, type]) => (
              <div key={id}>
                <h3>{type.name}</h3>
                <p>{type.description}</p>
                <p className="section-examples">
                  <strong>{site.pricing.examplesLabel}:</strong>{" "}
                  {type.examples.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </details>
        <div className="pricing-notes">
          <p>{site.pricing.note}</p>
          <p>{site.pricing.payment}</p>
        </div>
        <Comparison site={site} />
        <p className="domain-note">{site.comparison.footnote}</p>
      </div>
    </section>
  );
}
