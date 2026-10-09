// Shared by the router, metadata and static HTML generation.
export const routes = [
  { id: "home", path: "/" },
  {
    id: "sections",
    path: "/secciones",
    seo: {
      title: "Secciones para tu portfolio | Portfolios La Plata",
      description:
        "Explorá las secciones estándar y avanzadas, los complementos y las opciones de desarrollo a medida para tu portfolio profesional.",
    },
  },
];

export const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

export function homeSection(id) {
  return `/#${id.replace(/^#/, "")}`;
}
