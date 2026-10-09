import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { renderSeo } from "../lib/seo";

// One navigation policy for every route, including repeated hashes and history.
export default function RouteEffects({ site }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const previousLocation = useRef(null);

  useEffect(() => {
    const head = new DOMParser().parseFromString(renderSeo(site, location.pathname), "text/html").head;
    const selectors = ["title", 'meta[name="description"]', 'meta[property^="og:"]', 'meta[name^="twitter:"]', 'link[rel="canonical"]', 'script[type="application/ld+json"]'];
    selectors.forEach((selector) => {
      document.head.querySelectorAll(selector).forEach((node) => node.remove());
      head.querySelectorAll(selector).forEach((node) => document.head.append(node.cloneNode(true)));
    });
  }, [site, location.pathname]);

  useLayoutEffect(() => {
    const oldRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let cancelled = false;
    const isNavigation = previousLocation.current !== null && previousLocation.current.key !== location.key;
    const smoothHomeNavigation = isNavigation && navigationType === "PUSH" &&
      previousLocation.current.pathname === "/" && location.pathname === "/" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    previousLocation.current = { key: location.key, pathname: location.pathname };
    const savedPosition = positions.current.get(location.key);
    let hash = location.hash.slice(1);
    try { hash = decodeURIComponent(hash); } catch { /* Invalid hashes have no target. */ }

    const move = () => {
      if (cancelled) return;
      const target = hash ? document.getElementById(hash) : null;
      if (navigationType === "POP" && savedPosition != null) {
        window.scrollTo({ top: savedPosition, behavior: "instant" });
      } else if (target) {
        // scroll-padding-top in global CSS accounts for the sticky navbar.
        target.scrollIntoView({ block: "start", behavior: smoothHomeNavigation ? "smooth" : "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      if (isNavigation) {
        const focusTarget = target || document.getElementById("contenido");
        if (focusTarget) {
          if (!focusTarget.hasAttribute("tabindex")) {
            focusTarget.setAttribute("tabindex", "-1");
            focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
          }
          focusTarget.focus({ preventScroll: true });
        }
      }
    };
    const frame = requestAnimationFrame(move);
    // Fonts can shift the target on a direct load. Do not override user scrolling.
    const cancelCorrection = () => { cancelled = true; };
    window.addEventListener("wheel", cancelCorrection, { passive: true });
    window.addEventListener("touchstart", cancelCorrection, { passive: true });
    window.addEventListener("keydown", cancelCorrection);
    // Only initial loads need font correction; never restart a navigation animation.
    if (!isNavigation && document.fonts?.status === "loading") document.fonts.ready.then(move);
    const remember = () => positions.current.set(location.key, window.scrollY);
    window.addEventListener("scroll", remember, { passive: true });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", remember);
      window.removeEventListener("wheel", cancelCorrection);
      window.removeEventListener("touchstart", cancelCorrection);
      window.removeEventListener("keydown", cancelCorrection);
      window.history.scrollRestoration = oldRestoration;
    };
  }, [location.key, location.pathname, location.hash, navigationType]);
  return null;
}
