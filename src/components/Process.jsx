import { SectionHeading } from "./ui";

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
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="process-timing">{site.pricing.delivery}</p>
      </div>
    </section>
  );
}
