import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { sectionsPage as copy } from "../data/sections";
import { homeSection } from "../data/routes";
import { getCatalog, getComplements, startingPrice } from "../lib/site";
import SectionCategory from "../components/sections/SectionCategory";
import CustomSectionsCTA from "../components/sections/CustomSectionsCTA";
import ComplementsCategory from "../components/sections/ComplementsCategory";
import SectionModal from "../components/sections/SectionModal";

export default function SectionsPage({ site }) {
  const [selection, setSelection] = useState(null);
  const complements = getComplements(site);
  return (
    <>
      <section className="catalog-hero container" aria-labelledby="catalog-title">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="catalog-title">{copy.title}</h1>
          <p className="catalog-intro">{copy.description}</p>
          <p className="catalog-definition">{copy.definition}</p>
          <nav className="catalog-jumps" aria-label="Tipos de secciones">
            {Object.entries({ ...site.pricingModel.sectionTypes, complements, custom: site.pricingModel.custom }).map(([id, type]) => (
              <Link key={id} to={`/secciones#${id}`}>{type.label}<ArrowDown size={14} aria-hidden="true" /></Link>
            ))}
          </nav>
        </div>
        <div className="portfolio-anatomy" aria-hidden="true">
          <div className="anatomy-caption"><span>p.</span>{copy.anatomy.title}</div>
          <div className="anatomy-included"><span>{copy.anatomy.intro}</span><small>{copy.anatomy.included}</small></div>
          {copy.anatomy.content.map((label, index) => <div className="anatomy-content" key={label}><span>0{index + 1}</span><strong>{label}</strong><i /></div>)}
          <div className="anatomy-included"><span>{copy.anatomy.outro}</span><small>{copy.anatomy.included}</small></div>
          <p>{copy.anatomy.note}</p>
        </div>
      </section>
      <section className="catalog-formula container" aria-labelledby="catalog-formula-title">
        <h2 id="catalog-formula-title">{site.pricing.formula.title}</h2>
        <div className="portfolio-formula">
          <div><strong>{site.pricingModel.base.name}</strong><span>{startingPrice(site, site.pricingModel.base)}</span></div>
          <span className="formula-symbol" aria-label="más">+</span>
          <div><strong>{site.pricing.formula.sections}</strong><span>{Object.values(site.pricingModel.sectionTypes).map((type) => type.label).join(" / ")}</span></div>
          <span className="formula-symbol" aria-label="igual a">=</span>
          <strong className="formula-result">{site.pricing.formula.result}</strong>
        </div>
        <p className="catalog-count-note">{site.pricing.contentNote}</p>
        <p className="catalog-complements-note">{copy.complementsNote}</p>
        <Link className="text-link" to={homeSection("precios")}>{site.pricing.formula.linkLabel}<ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
      <p className="catalog-preview-note container">{copy.previewNote}</p>
      {getCatalog(site).map((category) => <SectionCategory key={category.id} category={category} site={site} onExplore={setSelection} />)}
      <ComplementsCategory category={complements} site={site} onExplore={setSelection} />
      <CustomSectionsCTA site={site} />
      {selection && <SectionModal selection={selection} site={site} onDismiss={() => setSelection(null)} />}
    </>
  );
}
