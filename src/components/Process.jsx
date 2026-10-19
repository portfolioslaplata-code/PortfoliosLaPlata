import { SectionHeading } from "./ui";
import { serviceText } from "../lib/site";

export default function Process({ site }) {
  return (
    <section id="proceso" className="process section-space">
      <div className="container">
        <SectionHeading {...site.processIntro} />
        <ol className="process-steps">
          {site.process.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{serviceText(step.description, site)}</p>
            </li>
          ))}
        </ol>
        <p className="process-timing">{serviceText(site.pricing.delivery, site)}</p>
      </div>
    </section>
  );
}
