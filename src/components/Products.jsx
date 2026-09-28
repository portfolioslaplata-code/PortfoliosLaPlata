import { Check, ChevronDown } from "lucide-react";
import { ContactButton, SectionHeading } from "./ui";
import { getProducts, priceLabel } from "../lib/site";

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
      <p className="product-description">{product.description}</p>
      <ul>
        {product.features.map((feature) => (
          <li key={feature}>
            <Check size={15} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ContactButton
        site={site}
        product={product}
        light={product.featured}
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
                      {product.comparison?.[row.key] || "A consultar"}
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
                    <dd>{product.comparison?.[row.key] || "A consultar"}</dd>
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
