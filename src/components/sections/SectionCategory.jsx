import { startingPrice } from "../../lib/site";
import SectionCard from "./SectionCard";

export default function SectionCategory({ category, site }) {
  return (
    <section id={category.id} className={`section-category category-${category.id} section-space`} aria-labelledby={`${category.id}-title`}>
      <div className="container">
        <div className="catalog-category-heading">
          <div>
            <p className="eyebrow">{category.name}</p>
            <h2 id={`${category.id}-title`}>{category.headline}</h2>
            <p className="section-description">{category.description}</p>
          </div>
          <div className="catalog-category-price">
            <strong>{startingPrice(site, category, true)}</strong>
            <span className="catalog-count">{String(category.items.length).padStart(2, "0")} posibilidades</span>
          </div>
        </div>
        <p className="catalog-pricing-note">{site.pricing.note}</p>
        <div className="sections-grid">
          {category.items.map((item) => <SectionCard key={item.id} item={item} category={category} />)}
        </div>
      </div>
    </section>
  );
}
