import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand, ContactButton } from "./ui";

export default function Navbar({ site }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (
        event.type === "pointerdown" &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="container navbar">
        <Brand site={site} />
        <nav className="desktop-navigation" aria-label="Navegación principal">
          {site.navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <ContactButton site={site} className="nav-contact">
          {site.contact.navbarCta}
        </ContactButton>
        <button
          ref={trigger}
          type="button"
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!open}
        onBlur={(event) => {
          if (!header.current?.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        {site.navigation.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <ContactButton site={site}>{site.contact.navbarCta}</ContactButton>
      </nav>
    </header>
  );
}
