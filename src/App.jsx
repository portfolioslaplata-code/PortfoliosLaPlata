import { site as defaultSite } from "./data/site";
import Navbar from "./components/Navbar";
import Hero, { Introduction, Audience } from "./components/Hero";
import PortfolioShowcase from "./components/PortfolioShowcase";
import Products from "./components/Products";
import Process from "./components/Process";
import Benefits from "./components/Benefits";
import FAQ from "./components/FAQ";
import Footer, { CTA } from "./components/Footer";

export default function App({ site = defaultSite }) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div id="inicio" />
      <Navbar site={site} />
      <main id="contenido">
        <Hero site={site} />
        <Introduction site={site} />
        <PortfolioShowcase site={site} />
        <Audience site={site} />
        <Products site={site} />
        <Process site={site} />
        <Benefits site={site} />
        <FAQ site={site} />
        <CTA site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
