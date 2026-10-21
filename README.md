# Portfolios La Plata

Landing comercial en español de Argentina, construida con React, Vite y Tailwind CSS. La oferta combina Portfolio Base, secciones estándar, secciones avanzadas, complementos y desarrollo a medida. Las demos muestran identidades y combinaciones de contenido, sin paquetes cerrados.

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
| Precio del CV descargable | `src/data/site.js → pricingModel.complements["download-cv"].price` |
| Configuración opcional de dominio (servicio, no complemento) | `pricingModel.domainSetup.price` |
| Plazos, rondas, alojamiento, aviso de continuidad y anticipo | `serviceTerms` |
| Desarrollo a medida, ejemplos y condiciones | `pricingModel.custom` |
| Copy de Precios, notas y combinación orientativa | `pricing` |
| Demos, nombres, URLs, imágenes y composición | `portfolioExamples` |
| FAQ, proceso, navegación y contacto | `faq, process, navigation, contact` |
| Biblioteca de 18 secciones y previews | `src/data/sections.js` |
| Complementos, detalles ampliados y copy del modal | `src/data/sections.js → complementsCategory, sectionsPage.modal` |
| Registro de rutas y metadata por página | `src/data/routes.js` |
| Paleta de marca | `src/data/theme.js` |

Los importes solo se definen en `pricingModel`. Home, catálogo, FAQ y JSON-LD consumen los valores que les corresponden desde allí. Base, secciones y CV se presentan como valores iniciales: el presupuesto final depende del contenido, la complejidad y el alcance. La configuración estándar de dominio tiene un importe independiente por única vez. La moneda es configurable.

Portfolio Base incluye Hero/presentación, navegación, contacto/footer, responsive, adaptación de identidad, carga y organización inicial, SEO técnico básico y publicación, más dos rondas de revisión antes de aprobar, 12 meses de alojamiento gestionado y una ronda posterior de ajustes menores dentro de seis meses desde la publicación. Hero y contacto/footer no se cobran como secciones independientes.

El proceso comienza con una conversación/reunión virtual y presupuesto. Se abona 50% al aceptarlo y 50% después de aprobar la versión final, antes de publicar. El objetivo para proyectos habituales es presentar la primera versión en cinco días hábiles desde presupuesto aceptado, anticipo recibido y materiales necesarios entregados; no equivale a publicación definitiva y los alcances complejos llevan otro plazo acordado. El cliente aporta información, fotografías e imágenes para galerías; ayudamos a ordenar y redactar a partir de esa información, sin inventar antecedentes ni resultados.

Las rondas pueden agrupar varias observaciones dentro de las secciones contratadas. Nuevas secciones, funciones, rediseños y cambios sustanciales se cotizan aparte. Las revisiones previas no consumen la ronda posterior; una vez usada o vencido el plazo, se cotizan las actualizaciones. Los errores propios de desarrollo no consumen rondas.

El alojamiento incluido se cuenta desde la publicación definitiva, sin mensualidad obligatoria por 12 meses. Antes del vencimiento se acuerda la continuidad, procurando avisar al menos 60 días antes; no hay cargos automáticos, tarifa de renovación definida ni promesa de gratuidad perpetua. Se puede elegir una alternativa independiente. El dominio es opcional, comprado a nombre del cliente y registrado/renovado a su cargo. Su configuración estándar cuesta $10.000 ARS por única vez, aparte del dominio, mediante registros y un procedimiento acordado sin pedir contraseñas personales.

Se entrega el portfolio publicado, su URL definitiva y el dominio configurado si se contrató. No se requieren cuentas de GitHub/Vercel para contratar: administramos inicialmente código y publicación. Tras aprobación y pago total, el repositorio se puede transferir gratuitamente a GitHub del cliente. Eso no transfiere automáticamente el alojamiento ni otras cuentas; cualquier migración se coordina aparte, informando costos previamente. Los materiales siguen siendo del cliente o sus titulares; nuestras bases y componentes reutilizables no se vuelven exclusivos. Las condiciones detalladas de propiedad y licencias se definirán en documentación contractual separada.

Las secciones estándar adaptan contenido y presentación de la biblioteca. Las avanzadas ofrecen mayor profundidad visual, narrativa o interacción. Se pueden combinar libremente. El trabajo fuera de la biblioteca se evalúa y cotiza individualmente; los ejemplos de funcionalidades no son promesas de inclusión.

`pricing.example.sectionCounts` define cantidades para un ejemplo editorial. `pricingExample()` calcula el total a partir de la base y los precios vigentes. La Home muestra una combinación posible (base y tres secciones estándar), identificada como ejemplo y expresada como «desde»; no es un paquete cerrado. No guardar un total manual ni asignarle nombre de plan o beneficios exclusivos. La página no incluye calculadora, selección, checkout, login ni CMS.

## Arquitectura

- `App.jsx`: layout compartido, Navbar, Footer y registro de páginas.
- `pages/HomePage.jsx`: composición de la landing.
- `pages/SectionsPage.jsx`: catálogo explorable, fórmula Base + Secciones, complementos opcionales y cierre a medida.
- `components/Pricing.jsx`: base destacada, agregados, trabajo a medida y ejemplo orientativo.
- `components/PortfolioShowcase.jsx`: demos por estilo con composición derivada.
- `components/sections/`: categorías, cards, previews decorativos y contacto a medida.
- `components/sections/SectionModal.jsx`: un solo modal nativo compartido para secciones y complementos.
- `components/RouteEffects.jsx`: metadata, scroll y foco entre rutas e historial.
- `components/ui.jsx`: botones de contacto, enlaces y marco de las demos.
- `lib/site.js`: precios, catálogo, composición de demos, contacto y respuestas configurables.
- `lib/seo.js`: metadata y datos estructurados.
- `styles.css`: estilos generales; `styles/pricing.css`: nueva composición comercial; `styles/sections.css`: catálogo y previews.

Se retiraron el array de productos comerciales, los límites por paquete, la comparativa y Products.jsx, junto con sus helpers y estilos sin uso.

## Explorar el catálogo

El catálogo contiene 11 secciones estándar y 7 avanzadas. Testimonios pertenece a estándar y hereda su precio orientativo desde `pricingModel.sectionTypes.standard`, sin un importe propio. Cada entrada tiene `details.description` y `details.includes`, además de `idealFor` y `preview`. Las cards mantienen un botón «Ver detalle» con área de interacción extendida a toda la tarjeta; funcionan con clic, tap, Enter y Space. El hover usa un desplazamiento de 3 px, borde y sombra suaves, solo en dispositivos con hover preciso.

Before & After sigue siendo avanzada: ofrece un comparador con dos imágenes superpuestas y un divisor deslizable, compatible con mouse, tacto y teclado, etiquetas claras, contexto del trabajo, responsive y accesibilidad. Su preview en el catálogo es una ilustración estática con división central y etiquetas Antes/Después, sin un control funcional; el comparador se implementaría en el portfolio contratado.

`SectionModal` recibe la entrada, su categoría y el botón que la abrió. Usa `<dialog>.showModal()` para impedir la interacción con el fondo y contener la navegación por teclado. El foco inicia en Cerrar; Escape y el botón cierran el modal. Al cerrar se restauran los estilos del body, la posición de scroll y el foco en la card de origen. En móvil es un panel casi completo con encabezado fijo y contenido desplazable. Las animaciones y el hover respetan `prefers-reduced-motion`. Las previews son HTML/CSS decorativo, reutilizadas con `size="card"` y `size="modal"`.

`complementsCategory` mantiene los extras separados del recuento de secciones. Su lista admite nuevas entradas, pero por ahora solo contiene CV descargable, presentado en una card horizontal (vertical en móvil). `getComplements(site)` combina su contenido con los precios independientes de `pricingModel.complements`, por ID. El precio inicial de CV se muestra como «Desde» y se edita únicamente en `pricingModel.complements["download-cv"].price`; consultar allí el importe vigente. Los complementos usan el mismo modal y forman parte de la composición comercial mostrada en las demos, pero no incrementan el número de secciones ni alteran el ejemplo de precio. La configuración de dominio es un servicio independiente, no un complemento ni una sección; no altera el catálogo, el ejemplo de presupuesto o el JSON-LD. El catálogo no agrega carrito, selección ni compra.

## Demos y composición

Los nombres visibles son Editorial, Minimal y Profundidad. Cada demo tiene `id`, `name`, `description`, `url`, `image`, `alt`, `sections` y `complements`. No depende de un producto.

Cada bloque de `sections` referencia IDs oficiales del catálogo: `{ sectionIds: ["about"] }`. Un bloque puede combinar contenido relacionado, por ejemplo `{ sectionIds: ["experience", "education"] }`; se cuenta una sola vez. `complements` referencia IDs de `complementsCategory`, por ejemplo `["download-cv"]`; ausente o vacío equivale a ningún complemento. No duplicar nombres, tipos ni precios en las demos.

`demoComposition()` conserva `blocks` (nombres y tipos en orden) y `summary` (recuento completo). Añade `counts` por tipo, `totalSections`, `compactSummary` para las cards, `complements` resueltos con `getComplements()`, `complementCount`, `complementsLabel` y `complementsSummary`. Los totales se calculan desde las referencias; el CV queda fuera de `totalSections`. Rechaza IDs inexistentes o de la categoría incorrecta, grupos vacíos o de tipos mezclados y duplicados dentro de un bloque o entre bloques/complementos.

Composición de referencia revisada en los repositorios de las demos:
- Editorial: Sobre mí, Proyectos, Servicios, Experiencia y Formación en un mismo bloque, Habilidades. **5 estándar**, sin complementos.
- Minimal: Sobre mí, Servicios, Logros, Experiencia y Formación en un mismo bloque, Certificaciones, Habilidades. **6 estándar**, sin avanzadas ni complementos.
- Profundidad: Logros, Mini case study, Sobre mí, Experiencia, Formación, Servicios, Habilidades y Testimonios. **7 estándar + 1 avanzada = 8 secciones**, más **CV descargable** como complemento independiente. Testimonios es estándar; Mini case study es avanzada. Timeline avanzada sigue disponible en el catálogo, pero no representa la Experiencia de esta demo.

Estos recuentos describen la combinación de ejemplo; no fijan el presupuesto de una implementación diferente.

Las tarjetas presentan preview, nombre, descripción, resumen destacado, chips de secciones, complementos cuando existen y CTA. CV descargable enlaza a `/secciones#complements`; las demos no muestran precios ni mensajes de cero complementos.

La Landing es la fuente comercial y las demos son fuentes de diseño e implementación. Cuando cambia una demo, revisar manualmente su `catalogComposition`, los bloques activos y el orden real; actualizar las referencias de `portfolioExamples` usando el catálogo de la Landing y ejecutar las validaciones. Conservar los bloques combinados cuando corresponda. No importar archivos de otros repositorios ni añadir dependencias de build o sincronización automática.

`enabled: false` oculta una demo. `hero: true` la prioriza en portada y `featured: true` la usa como segunda referencia del Hero. Agregar una demo no requiere modificar JSX.

Se conservaron las URLs:
- https://esencial-sigma.vercel.app/
- https://esencial-2.vercel.app/
- https://profesional-virid.vercel.app/

Los nombres históricos de las URLs y de las imágenes locales son identificadores técnicos. El marco de las previews muestra el nombre editorial.

Las capturas WebP en `public/images/demos/` son locales. Para actualizarlas, usar imágenes de 1280 × 860 o `npm run capture:demos` (requiere conexión y Chrome). El script se ejecuta manualmente, nunca durante el build. No se cargan iframes ni imágenes remotas para las previews.

## Rutas, anchors y SEO

React Router DOM usa BrowserRouter en el cliente y StaticRouter durante el prerenderizado. Existen `/` y `/secciones`.

Navbar y Footer apuntan a `/#ejemplos`, `/#precios`, `/secciones`, `/#proceso` y `/#preguntas`. `homeSection()` construye los anchors de home para usarlos desde cualquier ruta. Las categorías usan `/secciones#standard`, `#advanced`, `#complements` y `#custom`. El antiguo anchor comercial fue reemplazado por `#precios`. Abrir un modal no cambia la URL.

RouteEffects contempla render y fuentes, compensa la Navbar, gestiona el foco y restaura scroll al navegar atrás/adelante. Nuevas rutas sin hash empiezan arriba. Para sumar una página, registrar su ruta/metadata en routes.js y su componente en App.jsx.

El build genera `dist/index.html` y `dist/secciones/index.html`. El hosting debe resolver /secciones al segundo archivo antes de aplicar un fallback SPA. Vite preview incluye esa resolución.

Configurar `site.seo.siteUrl` con el dominio definitivo para canonical, og:url y sitemap. Continúa vacío hasta contar con el dominio real. El sitemap incluye ambas rutas. `socialImage` y `socialImageAlt` son opcionales; con dominio e imagen se genera summary_large_image.

Home usa Service + Organization + OfferCatalog con la base, los tipos de sección y el trabajo a medida. Los precios son mínimos por unidad, no importes finales. /secciones usa CollectionPage. Metadata y contenido se prerenderizan sin JavaScript y se actualizan al navegar.

## FAQ, contacto e identidad

Las once FAQ se editan en `site.faq`. Pueden tener `answer` o `answerTemplate` y un enlace contextual opcional (`link.href`, `link.label`). `faqAnswer()` resuelve precios e incluidos; `serviceText()` comparte los marcadores de `serviceTerms` y el precio de dominio con Precios y Proceso. `balancePercent` se calcula como 100 menos `depositPercent`. `base.includes`, `pricing.payment/delivery/hostingNote/domainNote` y `process[].description` admiten esos marcadores; un marcador desconocido produce un error para evitar publicar textos incompletos. No duplicar importes ni cantidades en JSX.

El acordeón conserva `<details name="faq">` y `<summary>`, teclado, foco y funcionamiento sin JavaScript. La expansión/contracción usa `::details-content`, `interpolate-size` y transición de `content-visibility` con `allow-discrete`, limitada por `@supports` y `prefers-reduced-motion: no-preference`. Si falta soporte o se pide movimiento reducido, permanece la apertura/cierre nativa sin animación de contenido. No hay temporizadores ni estado React para el cierre.

`contact.message` es el mensaje general usado por todos los CTA. Un número internacional válido en `contact.whatsapp` abre WhatsApp; vacío o inválido usa `contact.email` y `emailSubject`. Instagram se muestra solo con una URL HTTPS válida del servicio. No se envían mensajes automáticamente.

La paleta central sigue en theme.js. Los tokens CSS, el favicon y theme-color se derivan de ella. Manrope y DM Sans se sirven localmente con Fontsource. Se mantienen foco visible, contraste, reduced motion y previews decorativos con aria-hidden.

## Analytics y publicación

GA4 sigue desactivado. Para activarlo deliberadamente: copiar .env.example a .env.local, definir VITE_GA_MEASUREMENT_ID, activar `analytics.enabled` y reconstruir. Ambas condiciones son necesarias. Definir proveedor, titularidad, privacidad y consentimiento aplicable antes de habilitarlo.

Publicación estática: comando `npm run build`, directorio `dist`. Los cambios de esta iteración son locales; no se despliega automáticamente. Registro y renovación del dominio son responsabilidad del cliente; el alojamiento gestionado inicial y su continuidad siguen las condiciones documentadas arriba.

## Validación

Las pruebas cubren importes configurables, incluidos de base, ejemplo calculado, catálogo, composición y visibilidad de demos, contacto, metadata y ausencia del sistema anterior en ambas rutas.

Playwright revisa home y catálogo en 320, 375, 430, 768, 900, 1024 y 1440 px, más el showcase en 800, 801 y 1100 px; overflow, jerarquía del resumen, chips, alineación de CTA, enlaces, teclado, menú móvil, FAQ, hashes, historial, recargas y HTML sin JavaScript. Cubre el enlace del CV desde Home al catálogo y su modal existente. Incluye axe WCAG A/AA. Las capturas quedan en test-results/, fuera de Git.

Las condiciones operativas compartidas están en `../AGENTS.md` (fuera de los repositorios Git); la configuración vigente está en `src/data/site.js`. `../Productos/producto-docs/catalogo.md` es una referencia compartida que debe contrastarse con esa configuración. Los repositorios de las demos conservan su implementación y sus nombres históricos.
