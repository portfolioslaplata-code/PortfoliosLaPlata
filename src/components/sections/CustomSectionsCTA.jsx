import { ContactButton } from "../ui";
import { sectionsPage } from "../../data/sections";

export default function CustomSectionsCTA({ site }) {
  const copy = sectionsPage.custom;
  return (
    <section id="custom" className="custom-sections container section-space" aria-labelledby="custom-title">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="custom-title">{copy.title}</h2>
        <p className="section-description">{copy.description}</p>
        <ContactButton site={site} product={site.products.find((product) => product.id === "personalizado")}>{copy.cta}</ContactButton>
      </div>
      <div className="custom-possibilities">
        <ul>{copy.examples.map((example) => <li key={example}>{example}</li>)}</ul>
        <p>{copy.note}</p>
      </div>
    </section>
  );
}
