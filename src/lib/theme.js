import { theme } from "../data/theme.js";

export function renderThemeHead() {
  const variables = Object.entries(theme)
    .map(([key, value]) => `--palette-${key}:${value}`)
    .join(";");
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${theme.primary}"/><path d="M18 48V16h15c11 0 17 6 17 15S44 46 33 46H28v-9h5c5 0 7-2 7-6s-2-6-7-6h-5v23z" fill="${theme["on-primary"]}"/><circle cx="47" cy="49" r="5" fill="${theme.accent}"/></svg>`;
  return `<style id="brand-theme">:root{${variables}}</style>\n<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(favicon)}">`;
}
