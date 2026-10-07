import { ContactButton } from "../ui";

export default function CustomSectionsCTA({ site }) {
  const copy = site.pricingModel.custom;
  return (
    <section id="custom" className="custom-sections container section-space" aria-labelledby="custom-title">
      <div>
        <p className="eyebrow">{copy.name}</p>
        <h2 id="custom-title">{copy.title}</h2>
        <p className="section-description">{copy.description}</p>
        <p className="custom-quote">{site.pricingModel.customQuote}</p>
        <ContactButton site={site}>{copy.cta}</ContactButton>
      </div>
      <div className="custom-possibilities">
        <ul>{copy.examples.map((example) => <li key={example}>{example}</li>)}</ul>
        <p>{copy.note}</p>
      </div>
    </section>
  );
}
