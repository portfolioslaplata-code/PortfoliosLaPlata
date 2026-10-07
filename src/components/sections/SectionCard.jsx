import { sectionsPage } from "../../data/sections";
import SectionPreview from "./SectionPreview";

export default function SectionCard({ item, category, plans }) {
  return (
    <article className="section-card" aria-labelledby={`section-${item.id}`}>
      <SectionPreview preview={item.preview} />
      <div className="section-card-copy">
        <span className="section-kind">{category.label}</span>
        <h3 id={`section-${item.id}`}>{item.name}</h3>
        <p>{item.description}</p>
        <p className="section-ideal"><strong>{sectionsPage.idealLabel}:</strong> {item.idealFor}.</p>
        <p className="section-availability">{sectionsPage.availableLabel}: <strong>{plans.map((plan) => plan.name).join(" · ")}</strong></p>
      </div>
    </article>
  );
}
