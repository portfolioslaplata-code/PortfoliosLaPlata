// Shared by the router, metadata and static HTML generation.
export const routes = [
  { id: "home", path: "/" },
  {
    id: "sections",
    path: "/secciones",
    seo: {
      title: "Secciones para tu portfolio | Portfolios La Plata",
      description:
        "Conocé las secciones estándar, avanzadas y personalizadas que podemos combinar para construir tu portfolio profesional.",
    },
  },
];

export const normalizePath = (path) => path.replace(/\/+$/, "") || "/";

export function homeSection(id) {
  return `/#${id.replace(/^#/, "")}`;
}
