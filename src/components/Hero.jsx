import { ArrowDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSection } from "../data/routes";
import { ContactButton, DemoFrame, SectionHeading } from "./ui";
import { getExamples } from "../lib/site";

export default function Hero({ site }) {
  const examples = getExamples(site);
  const primary = examples.find((example) => example.hero) || examples[0];
  const secondary =
    examples.find(
      (example) => example.featured && example.id !== primary?.id,
    ) || examples.find((example) => example.id !== primary?.id);
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            {site.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            {site.hero.title}
            <br />
            <span>{site.hero.emphasis}</span>
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions">
            <ContactButton site={site} />
            <Link className="button button-ghost" to={homeSection("ejemplos")}>
              {site.hero.secondaryCta}
              <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-note">
            <Check size={16} aria-hidden="true" />
            {site.hero.note}
          </p>
        </div>
        {primary && (
          <div className="hero-visual">
            <div className="visual-caption">
              <span>{site.hero.previewEyebrow}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <a
              className="hero-primary-demo"
              href={primary.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir la demo principal en una pestaña nueva"
            >
              <DemoFrame example={primary} eager />
            </a>
            {secondary && (
              <a
                className="hero-secondary-demo"
                href={secondary.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir otra demo en una pestaña nueva"
              >
                <DemoFrame example={secondary} eager />
              </a>
            )}
            <div className="hero-stamp" aria-hidden="true">
              <span>{site.hero.stamp[0]}</span>
              <strong>{site.hero.stamp[1]}</strong>
              <span>{site.hero.stamp[2]}</span>
            </div>
            <div className="visual-bottom">
              <span>{site.hero.previewLabel}</span>
              <span>{site.hero.previewNote}</span>
            </div>
          </div>
        )}
      </section>
      <div className="origin-strip">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <p>{site.brand.origin}</p>
          <span>{site.brand.promise}</span>
        </div>
      </div>
    </>
  );
}

export function Introduction({ site }) {
  return (
    <section className="introduction container" aria-labelledby="intro-heading">
      <div>
        <p className="eyebrow">{site.introduction.eyebrow}</p>
        <h2 id="intro-heading">{site.introduction.title}</h2>
      </div>
      <div>
        <p>{site.introduction.description}</p>
        <ul className="intro-list">
          {site.introduction.items.map((item) => (
            <li key={item}>
              <Check size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Audience({ site }) {
  return (
    <section className="audience container">
      <SectionHeading
        title={site.audience.title}
        description={site.audience.description}
      />
      <ul className="profession-list">
        {site.professions.map((profession) => (
          <li key={profession}>{profession}</li>
        ))}
        <li className="profession-ending">{site.audience.ending}</li>
      </ul>
    </section>
  );
}
