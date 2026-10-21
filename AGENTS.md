# LandingPage · Portfolios La Plata

## Contexto y propósito

Web comercial principal del ecosistema Portfolios La Plata, servicio de presencia profesional digital para estudiantes, graduados, freelancers y profesionales de distintas áreas y lugares. Explica el servicio y los precios, muestra demos, lleva a `/secciones` y facilita el contacto.

La oferta es **Portfolio Base + secciones estándar/avanzadas + complementos + desarrollo a medida**. Esencial, Profesional y Personalizado son nombres históricos, no planes vigentes; esta aplicación tampoco representa un plan. La Landing es la fuente comercial principal. Editorial, Minimal y Profundidad son demos de diseño e implementación, sin jerarquía de precios.

## Fuentes de verdad

- `src/data/site.js`: configuración comercial, contacto, navegación, FAQ y demos. `pricingModel` centraliza base, moneda, importes por tipo, complementos, incluidos y condiciones. No hardcodear precios en JSX ni duplicarlos en FAQ, SEO o previews.
- `serviceTerms` centraliza objetivo de primera versión, rondas, ventanas de actualización/alojamiento, aviso de continuidad y porcentaje de anticipo; el saldo se deriva del anticipo. `pricingModel.domainSetup.price` configura el servicio opcional de dominio, separado de los complementos. `serviceText()` resuelve estas condiciones en Precios y Proceso; `faqAnswer()` reutiliza la misma configuración. Los textos de `base.includes` también admiten estos marcadores.
- `src/data/sections.js`: catálogo, detalles y previews. Mantener separados los 11 bloques estándar (incluye Testimonios), los 7 avanzados (incluye el comparador interactivo Before & After), los complementos y el desarrollo a medida.
- `src/data/routes.js`: registro de rutas, metadata por página y `homeSection()`; `src/data/theme.js`: paleta. Conservar esta separación.
- `src/lib/site.js`: cálculos, composición de demos, catálogo y contacto. El ejemplo de precio se deriva de cantidades e importes configurados; no guardar totales manuales ni convertirlo en un paquete.
- `portfolioExamples` referencia IDs oficiales mediante `sections[].sectionIds` y `complements[]`. `demoComposition()` deriva bloques, nombres, tipos, conteos, total de secciones y complementos separados; conserva `blocks`/`summary` y ofrece `compactSummary` para las cards. Rechazar IDs inválidos, categorías incompatibles y duplicados. Los bloques combinados cuentan una vez; los complementos no incrementan secciones y, si faltan, no se muestra un texto vacío o de cero complementos.
- La composición es descriptiva, no un límite comercial: Editorial tiene 5 estándar; Minimal, 6 estándar (Sobre mí, Servicios, Logros, Experiencia + Formación combinadas, Certificaciones y Habilidades), sin avanzadas ni complementos; Profundidad, 7 estándar + 1 avanzada + CV descargable, 8 secciones en total. Testimonios cuenta como estándar y Mini case study como avanzada. Contrastar con `catalogComposition` y los bloques activos de cada demo; si su metadata histórica difiere, informar la discrepancia y actualizarla solo cuando el pedido abarque ese repositorio. La Landing conserva la autoridad comercial y las demos la de diseño/implementación. No importar archivos ni crear dependencias entre repositorios. Mantener los nombres visibles Editorial, Minimal y Profundidad; URLs e imágenes pueden conservar identificadores históricos.

## Catálogo y alcance comercial

- Base incluye Hero, navegación, contacto/footer, responsive, identidad, carga y organización inicial, SEO técnico básico, publicación, dos rondas previas, 12 meses de alojamiento gestionado y una ronda posterior dentro de seis meses desde la publicación. Hero y Contacto/Footer no son secciones adicionales.
- Pago: 50% al aceptar el presupuesto y 50% después de aprobar la versión final, antes de publicar. Objetivo de primera versión en cinco días hábiles para proyectos habituales, desde presupuesto aceptado, anticipo y materiales; otros alcances llevan plazos acordados. Ayudamos con los textos sin inventar antecedentes; el cliente aporta información e imágenes.
- Las rondas admiten observaciones agrupadas dentro del alcance; nuevas secciones, funciones y rediseños se cotizan. Las revisiones previas no consumen la posterior; errores propios no consumen ninguna. Luego de usar la ronda posterior o vencer seis meses, se cotizan actualizaciones.
- Hosting gestionado incluido por 12 meses desde la publicación, sin mensualidad obligatoria; continuidad acordada antes del vencimiento, procurando avisar al menos 60 días antes, sin cargos automáticos ni garantía de gratuidad perpetua. Dominio opcional comprado/renovado por el cliente a su nombre, configuración estándar de $10.000 ARS por única vez; no pedir contraseñas personales.
- Entrega: portfolio publicado y URL definitiva; dominio configurado si se contrata. Repositorio administrado inicialmente por Portfolios La Plata y transferible gratuitamente a GitHub del cliente tras aprobación y pago total. Alojamiento/cuentas/migración son independientes, con costos informados previamente. Materiales del cliente o sus titulares y bases reutilizables no exclusivas; propiedad/licencias detalladas se documentan aparte. No exigir cuentas técnicas para contratar.
- `/secciones` es un **catálogo visual de posibilidades**. Las cards, previews y modales explican opciones; no agregar ecommerce, carrito, configurador ni builder sin solicitud explícita.
- El único complemento actual es CV descargable: contenido en `complementsCategory` y precio en `pricingModel.complements["download-cv"]`, unidos por ID mediante `getComplements()`. No contarlo como sección ni inventar complementos.
- Comunicar importes como valores iniciales («Desde»); el presupuesto depende del contenido, complejidad y alcance. El desarrollo fuera de la biblioteca se evalúa individualmente, sin «Plan Personalizado» cerrado.

## Arquitectura, rutas y accesibilidad

- React + Vite + JavaScript + Tailwind mediante `@tailwindcss/vite`. `App.jsx` comparte Navbar/Footer y compone `HomePage` y `SectionsPage`. Mantener componentes reutilizables y sitio estático, sin backend o CMS innecesarios.
- React Router usa `BrowserRouter` en el cliente y `StaticRouter` al prerenderizar. Conservar `/` y `/secciones`, anchors de home como `/#precios`, y hashes del catálogo `#standard`, `#advanced`, `#complements`, `#custom`.
- `RouteEffects` coordina metadata, foco, compensación de navbar y scroll/historial. No romper navegación entre rutas, enlaces directos, recargas ni atrás/adelante. Abrir modales no cambia la URL.
- FAQ conserva `<details name="faq">` y `<summary>` nativos, también sin JavaScript. La animación CSS de `::details-content` se habilita solo si hay soporte de tamaño intrínseco y transiciones discretas, y sin movimiento reducido; el fallback es apertura/cierre nativo. No reemplazarlo por estado React ni temporizadores.
- `SectionModal` comparte `<dialog>` nativo entre secciones y complementos: preservar teclado, Escape, foco inicial/restaurado, bloqueo del fondo y recuperación del scroll. Previews HTML/CSS decorativas; respetar movimiento reducido y uso táctil.
- `npm run build` incluye `scripts/prerender.mjs` y genera HTML para ambas rutas. El hosting debe resolver `/secciones` a su HTML antes del fallback SPA. Mantener `src/lib/seo.js`, canonical, metadata, sitemap y datos estructurados derivados de configuración; no inventar el dominio si `site.seo.siteUrl` está vacío.

## Identidad y operación

- Español argentino con «vos», tono claro, profesional y cercano; diseño joven, digital, limpio y con personalidad, mobile-first. Preservar contraste, foco visible y performance.
- Tokens, favicon y theme-color derivan de `theme.js`; Manrope y DM Sans se sirven localmente. Las capturas de demos son recursos locales, sin iframes ni imágenes remotas en previews.
- No inventar clientes, testimonios, métricas ni datos reales. Los CTA usan contacto configurado: WhatsApp válido o fallback a email; no envían mensajes automáticamente.
- Analytics está desactivado: no activarlo por defecto ni tratarlo como prestación de un plan. Consultar README antes de integrarlo. No hacer push, deploy ni comprar dominios sin pedido; nunca force push.
- Si está disponible, consultar `../AGENTS.md` para principios comunes. La documentación auxiliar de producto no reemplaza la fuente comercial de esta aplicación.

## Validación

Consultar `package.json`. Tras cambios relevantes de implementación: `npm run lint`, `npm test`, `npm run build`; para navegación, catálogo, UI o datos opcionales, `npm run test:browser` después del build (Chrome; preview en 4176). Revisar responsive, hashes, teclado y SEO. `npm run capture:demos` es manual y requiere red/Chrome; no forma parte del build. Para cambios solo de instrucciones, revisar documentación y diff.
