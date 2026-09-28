import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./styles.css";
import App from "./App";
import { site } from "./data/site";
import { initializeAnalytics } from "./lib/analytics";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.querySelector("main")) hydrateRoot(root, app);
else createRoot(root).render(app);

initializeAnalytics(site.analytics, import.meta.env.VITE_GA_MEASUREMENT_ID);
