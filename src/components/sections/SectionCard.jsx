import { ArrowRight } from "lucide-react";
import { sectionsPage } from "../../data/sections";
import { startingPrice } from "../../lib/site";
import SectionPreview from "./SectionPreview";

export default function SectionCard({ item, category, onExplore, site }) {
  return (
    <article className="section-card" aria-labelledby={`section-${item.id}`}>
      <SectionPreview preview={item.preview} />
      <div className="section-card-copy">
        <span className="section-kind">{category.itemLabel}</span>
        <h3 id={`section-${item.id}`}>{item.name}</h3>
        <p>{item.description}</p>
        {category.id === "complements" && <p className="complement-price">{startingPrice(site, item)}</p>}
        <button className="section-explore" type="button" aria-haspopup="dialog" aria-label={`${sectionsPage.exploreLabel}: ${item.name}`} onClick={(event) => onExplore({ item, category, trigger: event.currentTarget })}>
          {sectionsPage.exploreLabel}<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
