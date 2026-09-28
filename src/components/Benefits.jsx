import { Fingerprint, Link, MonitorSmartphone, Sprout } from "lucide-react";
import { SectionHeading } from "./ui";

const icons = {
  link: Link,
  fingerprint: Fingerprint,
  devices: MonitorSmartphone,
  growth: Sprout,
};

export default function Benefits({ site }) {
  return (
    <section className="benefits section-space">
      <div className="container benefits-layout">
        <SectionHeading {...site.benefitsIntro} />
        <div className="benefit-grid">
          {site.benefits.map((benefit) => {
            const Icon = icons[benefit.icon] || Link;
            return (
              <article key={benefit.title}>
                <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
