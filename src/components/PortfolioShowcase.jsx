import { DemoFrame, DemoLink, SectionHeading } from "./ui";
import { getExamples, getProducts } from "../lib/site";

export function PortfolioCard({ example, product, site }) {
  return (
    <article
      className={`portfolio-card ${example.featured ? "portfolio-featured" : ""}`}
    >
      <div className={`portfolio-preview tone-${example.tone || "sage"}`}>
        <a
          href={example.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${product.name} ${example.model}, abre una pestaña nueva`}
        >
          <DemoFrame example={example} />
        </a>
      </div>
      <div className="portfolio-info">
        {example.featured && (
          <p className="eyebrow">{site.showcase.featuredLabel}</p>
        )}
        <div className="portfolio-meta">
          <span>{product.name}</span>
          <span>{example.model}</span>
        </div>
        <h3>{example.title}</h3>
        <p>{example.description}</p>
        <div className="portfolio-card-bottom">
          <div className="tags">
            {example.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <DemoLink example={example}>
            {example.featured
              ? site.showcase.featuredCta
              : site.showcase.demoCta}
          </DemoLink>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioShowcase({ site }) {
  const examples = getExamples(site);
  const products = getProducts(site);
  return (
    <section id="ejemplos" className="showcase section-space">
      <div className="container">
        <div className="split-heading">
          <SectionHeading {...site.showcase} />
          <p className="side-note">{site.showcase.note}</p>
        </div>
        <div className="portfolio-grid">
          {examples.map((example) => (
            <PortfolioCard
              key={example.id}
              example={example}
              product={products.find(
                (product) => product.id === example.productId,
              )}
              site={site}
            />
          ))}
        </div>
        {examples.filter((example) => example.productId === "esencial").length >
          1 && <p className="showcase-model-note">{site.showcase.modelNote}</p>}
      </div>
    </section>
  );
}
