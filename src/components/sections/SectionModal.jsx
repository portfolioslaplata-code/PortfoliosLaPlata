import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { sectionsPage as copy } from "../../data/sections";
import { startingPrice } from "../../lib/site";
import SectionPreview from "./SectionPreview";

// showModal supplies the top layer, background inertness and native focus containment.
export default function SectionModal({ selection, site, onDismiss }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const { item, category, trigger } = selection;

  useEffect(() => {
    const dialog = dialogRef.current;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const properties = ["position", "top", "left", "width", "overflow", "padding-right"];
    const previous = properties.map((name) => [name, body.style.getPropertyValue(name), body.style.getPropertyPriority(name)]);
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight);
    // Fixed positioning also locks background scrolling on touch browsers.
    Object.assign(body.style, {
      position: "fixed", top: `${-scrollY}px`, left: `${-scrollX}px`, width: "100%",
      overflow: "hidden", paddingRight: `${padding + scrollbar}px`,
    });
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });

    return () => {
      dialog.close();
      previous.forEach(([name, value, priority]) => {
        if (value) body.style.setProperty(name, value, priority);
        else body.style.removeProperty(name);
      });
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return (
    <dialog ref={dialogRef} className={`section-modal modal-${category.id}`} aria-modal="true" aria-labelledby="section-modal-title" onCancel={(event) => { event.preventDefault(); onDismiss(); }}>
      <header className="section-modal-header">
        <div>
          <span className="section-kind">{category.itemLabel}</span>
          <h2 id="section-modal-title">{item.name}</h2>
        </div>
        <button ref={closeRef} className="section-modal-close" type="button" onClick={onDismiss} aria-label={copy.modal.closeLabel}><X size={20} aria-hidden="true" /><span>{copy.modal.closeLabel}</span></button>
      </header>
      <div className="section-modal-scroll" tabIndex={0} role="region" aria-label={copy.modal.contentLabel}>
        <div className="section-modal-layout">
          <figure className="section-modal-preview">
            <SectionPreview preview={item.preview} size="modal" />
            <figcaption>{copy.previewNote}</figcaption>
          </figure>
          <div className="section-modal-copy">
            <p className="section-modal-description">{item.details.description}</p>
            <h3>{copy.modal.includesLabel}</h3>
            <ul>{item.details.includes.map((text) => <li key={text}>{text}</li>)}</ul>
            <h3>{copy.modal.idealLabel}</h3>
            <p>{item.idealFor}.</p>
            <p className="section-modal-type-note">{category.detailNote}</p>
            <div className="section-modal-price">
              <span>{copy.modal.priceLabel}</span>
              <strong>{startingPrice(site, item.price == null ? category : item)}</strong>
              <p>{site.pricing.note}</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
