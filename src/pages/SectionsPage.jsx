import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { sectionCategories, sectionsPage as copy } from "../data/sections";
import { homeSection } from "../data/routes";
import { getProducts, planValue } from "../lib/site";
import SectionCategory from "../components/sections/SectionCategory";
import CustomSectionsCTA from "../components/sections/CustomSectionsCTA";

export default function SectionsPage({ site }) {
  return (
    <>
      <section className="catalog-hero container" aria-labelledby="catalog-title">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="catalog-title">{copy.title}</h1>
          <p className="catalog-intro">{copy.description}</p>
          <p className="catalog-definition">{copy.definition}</p>
          <nav className="catalog-jumps" aria-label="Tipos de secciones">
            {Object.entries(site.sectionTypes).filter(([id]) => ["standard", "advanced", "custom"].includes(id)).map(([id, type]) => (
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
      <section className="catalog-plans container" aria-labelledby="catalog-plans-title">
        <div className="catalog-plans-heading"><h2 id="catalog-plans-title">{copy.planIntro}</h2><Link className="text-link" to={homeSection("planes")}>{copy.plansLink}<ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="catalog-plan-grid">
          {getProducts(site).map((plan) => <div key={plan.id}><h3>{plan.name}</h3><p>{planValue(plan, "sections", site)}</p><span>{planValue(plan, "sectionTypes", site)}</span></div>)}
        </div>
        <p className="catalog-count-note">{site.pricing.contentNote}</p>
      </section>
      <p className="catalog-preview-note container">{copy.previewNote}</p>
      {sectionCategories.map((category) => <SectionCategory key={category.id} category={category} site={site} />)}
      <CustomSectionsCTA site={site} />
    </>
  );
}
