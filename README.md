# Portfolios La Plata

Landing comercial en español de Argentina, construida con React, Vite y Tailwind CSS. La oferta combina Portfolio Base, secciones estándar, secciones avanzadas y desarrollo a medida. Las demos muestran identidades y combinaciones de contenido, sin paquetes cerrados.

## Ejecutar

Requiere Node 20.19+ o 22.12+ compatible con Vite. Instalar con `npm ci` y ejecutar `npm run dev`.

- Desarrollo: http://127.0.0.1:5176, puerto estricto.
- `npm run lint`: ESLint, cero advertencias.
- `npm run test`: configuración, precios, composición, contacto y SEO.
- `npm run build`: compilación y prerenderizado de ambas rutas.
- `npm run test:browser`: ejecutar después del build. Usa Chrome instalado y preview en 4176.
- `npm run preview`: inspección de producción.

Si Chrome no está instalado, instalar Chromium con `npx playwright install chromium` y quitar `channel: "chrome"` de Playwright y del script de capturas.

## Fuentes de configuración

| Información | Ubicación |
| --- | --- |
| Base, importe e incluidos | `src/data/site.js → pricingModel.base` |
| Moneda y etiquetas de precio | `pricingModel.currency, startingAt, perSection, customQuote` |
| Nombres, descripciones, precios y ejemplos de cada tipo | `pricingModel.sectionTypes.standard / advanced` |
| Desarrollo a medida, ejemplos y condiciones | `pricingModel.custom` |
| Copy de Precios, notas y combinación orientativa | `pricing` |
| Demos, nombres, URLs, imágenes y composición | `portfolioExamples` |
| FAQ, proceso, navegación y contacto | `faq, process, navigation, contact` |
| Biblioteca de 18 secciones y previews | `src/data/sections.js` |
| Registro de rutas y metadata por página | `src/data/routes.js` |
| Paleta de marca | `src/data/theme.js` |

Los importes solo se definen en `pricingModel`. Home, catálogo, FAQ y JSON-LD los consumen desde allí. Todos se presentan como valores iniciales: el presupuesto final depende del contenido, la complejidad y el alcance. La moneda es configurable.

Portfolio Base incluye Hero/presentación, navegación, contacto/footer, responsive, adaptación de identidad, carga inicial, SEO técnico básico, publicación y una ronda inicial de ajustes. Hero y contacto/footer no se cobran como secciones independientes.

Las secciones estándar adaptan contenido y presentación de la biblioteca. Las avanzadas ofrecen mayor profundidad visual, narrativa o interacción. Se pueden combinar libremente. El trabajo fuera de la biblioteca se evalúa y cotiza individualmente; los ejemplos de funcionalidades no son promesas de inclusión.

`pricing.example.sectionCounts` define cantidades para un ejemplo editorial. `pricingExample()` calcula el total a partir de la base y los precios vigentes. No guardar un total manual ni convertirlo en una oferta cerrada. La página no incluye calculadora, selección, checkout, login ni CMS.

## Arquitectura

- `App.jsx`: layout compartido, Navbar, Footer y registro de páginas.
- `pages/HomePage.jsx`: composición de la landing.
- `pages/SectionsPage.jsx`: catálogo visual, fórmula Base + Secciones y cierre a medida.
- `components/Pricing.jsx`: base destacada, agregados, trabajo a medida y ejemplo orientativo.
- `components/PortfolioShowcase.jsx`: demos por estilo con composición derivada.
- `components/sections/`: categorías, cards, previews decorativos y contacto a medida.
- `components/RouteEffects.jsx`: metadata, scroll y foco entre rutas e historial.
- `components/ui.jsx`: botones de contacto, enlaces y marco de las demos.
- `lib/site.js`: precios, catálogo, composición de demos, contacto y respuestas configurables.
- `lib/seo.js`: metadata y datos estructurados.
- `styles.css`: estilos generales; `styles/pricing.css`: nueva composición comercial; `styles/sections.css`: catálogo y previews.

Se retiraron el array de productos comerciales, los límites por paquete, la comparativa y Products.jsx, junto con sus helpers y estilos sin uso.

## Demos y composición

Los nombres visibles son Editorial, Minimal y Profundidad. Cada demo tiene `id`, `name`, `description`, `url`, `image`, `alt` y `sections`. No depende de un producto.

Cada bloque de `sections` referencia IDs del catálogo: `{ sectionIds: ["about"] }`. Un bloque puede combinar contenido relacionado, por ejemplo `{ sectionIds: ["experience", "education"] }`; se cuenta una sola vez. `demoComposition()` obtiene nombres, tipos y cantidades de esas referencias. Un bloque no debe mezclar tipos; una sección con mayor profundidad debe usar su referencia avanzada.

Composición de referencia revisada en los repositorios de las demos:
- Editorial y Minimal: Sobre mí, Proyectos, Servicios, Experiencia y Formación en un mismo bloque, Habilidades.
- Profundidad: Logros, Mini case study, Sobre mí, Timeline avanzada, Formación, Servicios, Habilidades y Testimonios.

Estos recuentos describen la combinación de ejemplo; no fijan el presupuesto de una implementación diferente.

`enabled: false` oculta una demo. `hero: true` la prioriza en portada y `featured: true` la usa como segunda referencia del Hero. Agregar una demo no requiere modificar JSX.

Se conservaron las URLs:
- https://esencial-sigma.vercel.app/
- https://esencial-2.vercel.app/
- https://profesional-virid.vercel.app/

Los nombres históricos de las URLs y de las imágenes locales son identificadores técnicos. El marco de las previews muestra el nombre editorial.

Las capturas WebP en `public/images/demos/` son locales. Para actualizarlas, usar imágenes de 1280 × 860 o `npm run capture:demos` (requiere conexión y Chrome). El script se ejecuta manualmente, nunca durante el build. No se cargan iframes ni imágenes remotas para las previews.

## Rutas, anchors y SEO

React Router DOM usa BrowserRouter en el cliente y StaticRouter durante el prerenderizado. Existen `/` y `/secciones`.

Navbar y Footer apuntan a `/#ejemplos`, `/#precios`, `/secciones`, `/#proceso` y `/#preguntas`. `homeSection()` construye los anchors de home para usarlos desde cualquier ruta. Las categorías conservan `/secciones#standard`, `#advanced` y `#custom`. El antiguo anchor comercial fue reemplazado por `#precios`.

RouteEffects contempla render y fuentes, compensa la Navbar, gestiona el foco y restaura scroll al navegar atrás/adelante. Nuevas rutas sin hash empiezan arriba. Para sumar una página, registrar su ruta/metadata en routes.js y su componente en App.jsx.

El build genera `dist/index.html` y `dist/secciones/index.html`. El hosting debe resolver /secciones al segundo archivo antes de aplicar un fallback SPA. Vite preview incluye esa resolución.

Configurar `site.seo.siteUrl` con el dominio definitivo para canonical, og:url y sitemap. Continúa vacío hasta contar con el dominio real. El sitemap incluye ambas rutas. `socialImage` y `socialImageAlt` son opcionales; con dominio e imagen se genera summary_large_image.

Home usa Service + Organization + OfferCatalog con la base, los tipos de sección y el trabajo a medida. Los precios son mínimos por unidad, no importes finales. /secciones usa CollectionPage. Metadata y contenido se prerenderizan sin JavaScript y se actualizan al navegar.

## FAQ, contacto e identidad

Las FAQ se editan en `site.faq`. Pueden tener `answer` o `answerTemplate`; los marcadores se resuelven en faqAnswer desde la configuración compartida. Incluidos, precios, condiciones y descripciones no se duplican en respuestas fijas. Los acordeones funcionan también sin JavaScript.

`contact.message` es el mensaje general usado por todos los CTA. Un número internacional válido en `contact.whatsapp` abre WhatsApp; vacío o inválido usa `contact.email` y `emailSubject`. Instagram se muestra solo con una URL HTTPS válida del servicio. No se envían mensajes automáticamente.

La paleta central sigue en theme.js. Los tokens CSS, el favicon y theme-color se derivan de ella. Manrope y DM Sans se sirven localmente con Fontsource. Se mantienen foco visible, contraste, reduced motion y previews decorativos con aria-hidden.

## Analytics y publicación

GA4 sigue desactivado. Para activarlo deliberadamente: copiar .env.example a .env.local, definir VITE_GA_MEASUREMENT_ID, activar `analytics.enabled` y reconstruir. Ambas condiciones son necesarias. Definir proveedor, titularidad, privacidad y consentimiento aplicable antes de habilitarlo.

Publicación estática: comando `npm run build`, directorio `dist`. Los cambios de esta iteración son locales; no se despliega automáticamente. Registro/renovación de dominio y costos recurrentes se acuerdan en la propuesta.

## Validación

Las pruebas cubren importes configurables, incluidos de base, ejemplo calculado, catálogo, composición y visibilidad de demos, contacto, metadata y ausencia del sistema anterior en ambas rutas.

Playwright revisa home y catálogo en 320, 375, 430, 768, 900 (catálogo), 1024 y 1440 px; overflow, enlaces, teclado, menú móvil, FAQ, hashes, historial, recargas y HTML sin JavaScript. Incluye axe WCAG A/AA. Las capturas quedan en test-results/, fuera de Git.

La decisión comercial compartida está en `../Productos/producto-docs/catalogo.md`. Los repositorios de las demos conservan su implementación y sus nombres históricos.