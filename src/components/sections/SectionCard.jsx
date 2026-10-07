import { sectionsPage } from "../../data/sections";
import SectionPreview from "./SectionPreview";

export default function SectionCard({ item, category }) {
  return (
    <article className="section-card" aria-labelledby={`section-${item.id}`}>
      <SectionPreview preview={item.preview} />
      <div className="section-card-copy">
        <span className="section-kind">{category.label}</span>
        <h3 id={`section-${item.id}`}>{item.name}</h3>
        <p>{item.description}</p>
        <p className="section-ideal"><strong>{sectionsPage.idealLabel}:</strong> {item.idealFor}.</p>
      </div>
    </article>
  );
}
