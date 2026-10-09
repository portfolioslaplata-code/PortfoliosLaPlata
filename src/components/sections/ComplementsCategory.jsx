import SectionCard from "./SectionCard";

export default function ComplementsCategory({ category, site, onExplore }) {
  return (
    <section id={category.id} className="section-category category-complements section-space" aria-labelledby="complements-title">
      <div className="container">
        <div className="catalog-category-heading">
          <div>
            <p className="eyebrow">{category.label}</p>
            <h2 id="complements-title">{category.headline}</h2>
            <p className="section-description">{category.description}</p>
          </div>
        </div>
        <div className="complements-list">
          {category.items.map((item) => <SectionCard key={item.id} item={item} category={category} site={site} onExplore={onExplore} />)}
        </div>
      </div>
    </section>
  );
}
