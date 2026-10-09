import { Link } from "react-router-dom";
import { DemoFrame, DemoLink, MoreLink, SectionHeading } from "./ui";
import { demoComposition, getExamples } from "../lib/site";

function PortfolioCard({ example, site }) {
  const composition = demoComposition(example, site);
  return (
    <article className="portfolio-card" data-example={example.id} aria-labelledby={`demo-${example.id}`}>
      <div className={`portfolio-preview tone-${example.tone || "neutral"}`}>
        <a href={example.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${example.name}, abre una pestaña nueva`}>
          <DemoFrame example={example} />
        </a>
      </div>
      <div className="portfolio-info">
        <h3 id={`demo-${example.id}`}>{example.name}</h3>
        <p>{example.description}</p>
        <div className="demo-composition">
          <p>{site.showcase.compositionLabel}</p>
          <strong>{composition.compactSummary}</strong>
          <ul>{composition.blocks.map((block, index) => <li key={index}>{block.name}</li>)}</ul>
          {composition.complementCount > 0 && (
            <p className="demo-complements">
              {composition.complementsLabel}: <Link to="/secciones#complements">{composition.complementsSummary}</Link>
            </p>
          )}
        </div>
        <div className="portfolio-card-bottom"><DemoLink example={example}>{site.showcase.demoCta}</DemoLink></div>
      </div>
    </article>
  );
}

export default function PortfolioShowcase({ site }) {
  return (
    <section id="ejemplos" className="showcase section-space">
      <div className="container">
        <div className="split-heading">
          <SectionHeading {...site.showcase} />
          <p className="side-note">{site.showcase.note}</p>
        </div>
        <div className="demo-grid">
          {getExamples(site).map((example) => <PortfolioCard key={example.id} example={example} site={site} />)}
        </div>
        <div className="demo-bottom"><p>{site.showcase.compositionNote}</p><MoreLink href="/secciones">{site.showcase.catalogueCta}</MoreLink></div>
      </div>
    </section>
  );
}
