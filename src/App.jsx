import { site as defaultSite } from "./data/site";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./data/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteEffects from "./components/RouteEffects";
import HomePage from "./pages/HomePage";
import SectionsPage from "./pages/SectionsPage";

const pages = { home: HomePage, sections: SectionsPage };

export default function App({ site = defaultSite }) {
  const location = useLocation();
  return (
    <>
      <RouteEffects site={site} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div id="inicio" />
      <Navbar key={`${location.pathname}${location.hash}`} site={site} />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          {routes.map(({ id, path }) => {
            const Page = pages[id];
            return <Route key={id} path={path} element={<Page site={site} />} />;
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer site={site} />
    </>
  );
}
