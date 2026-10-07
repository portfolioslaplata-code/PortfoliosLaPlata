import { Check, Plus } from "lucide-react";
import { ContactButton, MoreLink, SectionHeading } from "./ui";
import { getSection, priceLabel, pricingExample, startingPrice } from "../lib/site";

function BudgetExample({ site }) {
  const { base, currency } = site.pricingModel;
  const copy = site.pricing.example;
  const estimate = pricingExample(site);
  return (
    <aside className="budget-example" aria-labelledby="budget-example-title">
      <div className="budget-example-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h3 id="budget-example-title">{copy.title}</h3>
      </div>
      <div className="budget-equation">
        <div><span>{base.name}</span><strong>{priceLabel(base.price, currency)}</strong></div>
        {estimate.additions.map((item) => (
          <div className="budget-addition" key={item.type}>
            <span className="budget-operator" aria-hidden="true">+</span>
            <div><span>{item.label}</span><strong>{item.count} × {priceLabel(item.unitPrice, currency)}</strong></div>
          </div>
        ))}
        <div className="budget-total">
          <span>{copy.totalLabel}</span>
          <strong>{priceLabel(estimate.total, currency)} <small>{currency}</small></strong>
        </div>
      </div>
      <p>{copy.note}</p>
    </aside>
  );
}

export default function Pricing({ site }) {
  const { base, sectionTypes, custom } = site.pricingModel;
  return (
    <section id="precios" className="pricing section-space">
      <div className="container">
        <SectionHeading {...site.pricing} />
        <div className="pricing-composition">
          <article className="pricing-base" aria-labelledby="base-title">
            <p className="eyebrow">01 — {site.pricing.baseLabel}</p>
            <h3 id="base-title">{base.name}</h3>
            <p className="base-tagline">{base.tagline}</p>
            <p className="modular-price">{startingPrice(site, base)}</p>
            <p className="base-description">{base.description}</p>
            <h4>{site.pricing.includesLabel}</h4>
            <ul>{base.includes.map((item) => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            <p className="base-included-note">{site.pricing.contentNote}</p>
          </article>
          <div className="pricing-additions">
            <div className="pricing-additions-intro">
              <Plus size={24} aria-hidden="true" />
              <div><h3>{site.pricing.additionsTitle}</h3><p>{site.pricing.additionsNote}</p></div>
            </div>
            {Object.entries(sectionTypes).map(([id, type], index) => (
              <article className="pricing-addition" key={id} data-section-type={id}>
                <span className="pricing-step" aria-hidden="true">0{index + 2}</span>
                <div>
                  <h3>{type.name}</h3>
                  <p className="modular-price">{startingPrice(site, type, true)}</p>
                  <p className="addition-description">{type.description}</p>
                  <p className="addition-examples">{site.pricing.examplesLabel}: {type.exampleIds.map((sectionId) => getSection(sectionId).name).join(" · ")}</p>
                  <MoreLink href={`/secciones#${id}`}>{type.linkLabel}</MoreLink>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="pricing-custom">
          <span className="pricing-step" aria-hidden="true">04</span>
          <div><h3>{custom.title}</h3><p>{custom.description}</p><strong>{site.pricingModel.customQuote}</strong></div>
          <ContactButton site={site} className="button-outline">{custom.cta}</ContactButton>
        </div>
        <BudgetExample site={site} />
        <div className="pricing-bottom">
          <div><p>{site.pricing.note}</p><p>{site.pricing.payment} {site.pricing.hostingNote}</p></div>
          <ContactButton site={site}>{site.pricing.cta}</ContactButton>
        </div>
      </div>
    </section>
  );
}
