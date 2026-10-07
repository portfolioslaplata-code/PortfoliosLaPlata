import Hero, { Introduction, Audience } from "../components/Hero";
import PortfolioShowcase from "../components/PortfolioShowcase";
import Products from "../components/Products";
import Process from "../components/Process";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import { CTA } from "../components/Footer";

export default function HomePage({ site }) {
  return (
    <>
      <Hero site={site} />
      <Introduction site={site} />
      <PortfolioShowcase site={site} />
      <Audience site={site} />
      <Products site={site} />
      <Process site={site} />
      <Benefits site={site} />
      <FAQ site={site} />
      <CTA site={site} />
    </>
  );
}
