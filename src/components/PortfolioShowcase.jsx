import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSection } from "../data/routes";
import { DemoFrame, DemoLink, SectionHeading } from "./ui";
import { getShowcaseGroups, priceLabel } from "../lib/site";

export function PortfolioCard({ example, product, site, expanded = false }) {
  return (
    <article
      className={`portfolio-card ${expanded ? "portfolio-featured" : ""}`}
    >
      <div className={`portfolio-preview tone-${example.tone || "neutral"}`}>
        <a
          href={example.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${product.name} — ${example.model}, abre una pestaña nueva`}
        >
          <DemoFrame example={example} />
        </a>
      </div>
      <div className="portfolio-info">
        {example.model !== product.name && (
          <p className="portfolio-meta">{product.name}</p>
        )}
        <h4>{example.model}</h4>
        <p>{example.description}</p>
        {expanded && product.showcase?.highlights?.length > 0 && (
          <ul className="portfolio-highlights">
            {product.showcase.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={15} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
        <div className="portfolio-card-bottom">
          {!expanded && (
            <div className="tags">
              {example.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <DemoLink
            example={example}
            className={expanded ? "button button-primary" : ""}
          >
            {product.showcase?.demoCta || site.showcase.demoCta}
          </DemoLink>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioShowcase({ site }) {
  const groups = getShowcaseGroups(site);
  return (
    <section id="ejemplos" className="showcase section-space">
      <div className="container">
        <div className="split-heading">
          <SectionHeading {...site.showcase} />
          <p className="side-note">{site.showcase.note}</p>
        </div>
        <div className="showcase-groups">
          {groups.map(({ product, models }, index) => {
            const config = product.showcase || {};
            const expanded = config.layout === "expanded";
            const modelLabel =
              models.length === 1
                ? site.showcase.singularModelLabel
                : site.showcase.pluralModelLabel;
            return (
              <section
                key={product.id}
                className={`showcase-group ${expanded ? "showcase-group-expanded" : ""}`}
                aria-labelledby={`showcase-${product.id}`}
                data-product={product.id}
              >
                <header className="showcase-group-heading">
                  <div className="showcase-product-title">
                    <span className="showcase-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {config.eyebrow && (
                        <p className="eyebrow">{config.eyebrow}</p>
                      )}
                      <h3 id={`showcase-${product.id}`}>{product.name}</h3>
                    </div>
                  </div>
                  <Link to={homeSection("planes")} className="showcase-price">
                    <span>
                      {product.price != null ? (
                        <>
                          {site.pricing.startingAt}{" "}
                          <strong>{priceLabel(product)}</strong>{" "}
                          {product.currency}
                        </>
                      ) : (
                        site.pricing.customPrice
                      )}
                    </span>
                    <span>
                      {site.showcase.priceCta}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </header>
                <div className="showcase-group-intro">
                  <p className="showcase-headline">
                    {config.headline || product.tagline}
                  </p>
                  <p>{config.description || product.description}</p>
                </div>
                <div className="showcase-model-label">
                  <span>{modelLabel.replace("{count}", models.length)}</span>
                  {config.modelNote && <span>{config.modelNote}</span>}
                </div>
                <div
                  className={`portfolio-grid ${expanded ? "portfolio-grid-expanded" : ""}`}
                >
                  {models.map((example) => (
                    <PortfolioCard
                      key={example.id}
                      example={example}
                      product={product}
                      site={site}
                      expanded={expanded}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
