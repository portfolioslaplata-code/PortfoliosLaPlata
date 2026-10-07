import { getProducts } from "../../lib/site";
import SectionCard from "./SectionCard";

export default function SectionCategory({ category, site }) {
  const type = site.sectionTypes[category.id];
  const plans = getProducts(site).filter((plan) => plan.sections?.types.includes(category.id));
  return (
    <section id={category.id} className={`section-category category-${category.id} section-space`} aria-labelledby={`${category.id}-title`}>
      <div className="container">
        <div className="catalog-category-heading">
          <div>
            <p className="eyebrow">{type.name}</p>
            <h2 id={`${category.id}-title`}>{category.title}</h2>
            <p className="section-description">{category.description}</p>
          </div>
          <span className="catalog-count">{String(category.items.length).padStart(2, "0")} posibilidades</span>
        </div>
        <div className="sections-grid">
          {category.items.map((item) => <SectionCard key={item.id} item={item} category={type} plans={plans} />)}
        </div>
      </div>
    </section>
  );
}
