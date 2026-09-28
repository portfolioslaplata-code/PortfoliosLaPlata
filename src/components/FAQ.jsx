import { Plus } from "lucide-react";
import { SectionHeading } from "./ui";
import { contactHref, faqAnswer } from "../lib/site";

export default function FAQ({ site }) {
  return (
    <section id="preguntas" className="faq container section-space">
      <SectionHeading {...site.faqIntro}>
        <a className="text-link faq-contact" href={contactHref(site.contact)}>
          {site.faqIntro.cta}
          <span aria-hidden="true">↗</span>
        </a>
      </SectionHeading>
      <div className="faq-list">
        {site.faq.map((item) => (
          <details key={item.id} name="faq">
            <summary>
              {item.question}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{faqAnswer(item, site)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
