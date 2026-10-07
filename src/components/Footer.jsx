import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSection } from "../data/routes";
import { Brand, ContactButton } from "./ui";
import { instagramHref } from "../lib/site";

export function CTA({ site }) {
  return (
    <section id="contacto" className="final-cta container">
      <div>
        <p className="eyebrow">{site.finalCta.eyebrow}</p>
        <h2>{site.finalCta.title}</h2>
        <p className="final-cta-description">{site.finalCta.description}</p>
      </div>
      <div className="final-cta-actions">
        <ContactButton site={site}>
          {site.finalCta.cta}
        </ContactButton>
        <p>{site.finalCta.note}</p>
      </div>
    </section>
  );
}

export default function Footer({ site }) {
  const instagram = instagramHref(site.contact.instagram);
  return (
    <footer className="footer container">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand site={site} />
          <p>{site.brand.description}</p>
        </div>
        <nav aria-label="Navegación al pie">
          {site.navigation.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-contact">
          <p>{site.brand.origin}</p>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight size={16} aria-hidden="true" />
              {site.footer.instagramLabel}
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.brand.name}.{" "}
          {site.footer.copyright}
        </p>
        <Link to={homeSection("inicio")}>
          {site.footer.backToTop}
          <ArrowUp size={15} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
