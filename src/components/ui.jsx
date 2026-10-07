import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSection } from "../data/routes";
import { contactHref } from "../lib/site";

export function Brand({ site }) {
  return (
    <Link
      className="brand"
      to={homeSection("inicio")}
      aria-label={`${site.brand.name}, inicio`}
    >
      <span className="brand-symbol" aria-hidden="true">
        p<span>.</span>
      </span>
      <span className="brand-type">
        {site.brand.shortName}
        <span>{site.brand.location}</span>
      </span>
    </Link>
  );
}

export function ContactButton({
  site,
  children,
  className = "",
  light = false,
}) {
  return (
    <a
      href={contactHref(site.contact)}
      className={`button ${light ? "button-light" : "button-primary"} ${className}`}
    >
      {children || site.hero.primaryCta}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  className = "",
}) {
  return (
    <div className={`section-heading ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
      {children}
    </div>
  );
}

export function DemoFrame({ example, eager = false, className = "" }) {
  return (
    <div className={`browser-frame ${className}`}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{example.name}</span>
        <ArrowUpRight size={11} />
      </div>
      <img
        src={example.image}
        alt={example.alt}
        width="1280"
        height="860"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}

export function DemoLink({ example, children, className = "" }) {
  return (
    <a
      href={example.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-link ${className}`}
      aria-label={`${children}, ${example.name} — se abre en una pestaña nueva`}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export function MoreLink({ href, children }) {
  return (
    <Link to={href.startsWith("#") ? homeSection(href) : href} className="text-link">
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
