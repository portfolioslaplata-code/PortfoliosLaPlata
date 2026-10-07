# Portfolios La Plata

Landing comercial en español de Argentina, construida directamente en esta carpeta con React, Vite y Tailwind CSS. Contenido prerenderizado para buscadores, capturas locales de las tres demos y contratación por conversación. No hay checkout, testimonios inventados ni tracking activo por defecto.

## Ejecutar

Requiere Node `20.19+` o `22.12+` compatible con Vite. Se incluye `package-lock.json` para instalaciones reproducibles.

```sh
npm ci
npm run dev
```

Vista local: `http://127.0.0.1:5176`. El puerto es estricto para evitar abrir otro proyecto por accidente. Se puede cambiar en el script `dev` de `package.json`.

```sh
npm run lint
npm test
npm run build
npm run test:browser
npm run preview
```

Las pruebas de navegador usan Chrome instalado, en modo headless, y levantan su propia vista previa de producción en el puerto 4176. Ejecutar `build` antes de ellas. Si Chrome no está instalado, instalar Chromium con `npx playwright install chromium` y quitar `channel: 'chrome'` de `playwright.config.js` y del script de capturas.

## Arquitectura

```text
src/
  data/site.js                Todo el contenido y la configuración comercial
  data/theme.js               Paleta central de la marca
  data/routes.js              Rutas, SEO por página y helper de anchors de home
  data/sections.js            Biblioteca visual y copy de /secciones
  pages/                     HomePage y SectionsPage
  components/
    RouteEffects.jsx          Metadata, scroll y foco al navegar
    sections/                 Categorías, cards, mini previews y CTA a medida
    Navbar.jsx                Navegación de escritorio y menú móvil
    Hero.jsx                  Hero, propuesta y profesiones
    PortfolioShowcase.jsx     Grupos de producto con sus modelos y precio
    Products.jsx              Tarjetas y comparativa responsive
    Process.jsx               Proceso de contratación
    Benefits.jsx              Beneficios
    FAQ.jsx                   Preguntas con acordeones nativos
    Footer.jsx                CTA final y footer
    ui.jsx                    Marca, botones, enlaces y marco de navegador
  lib/
    site.js                   Contacto, filtros, precios y respuestas compartidas
    seo.js                    Metadatos HTML y Schema.org
    theme.js                  Variables CSS y favicon derivados de la paleta
    analytics.js              Integración opcional de GA4
  App.jsx                     Layout compartido y registro de páginas
  main.jsx                    Inicio/hidratación de React
  entry-server.jsx            Render estático durante el build
  styles.css                  Tokens Tailwind y estilos responsive
  styles/sections.css         Catálogo y miniaturas con los mismos tokens
public/
  images/demos/*.webp         Capturas reales guardadas localmente
scripts/
  prerender.mjs               HTML estático, robots y sitemap condicional
  capture-demos.mjs           Actualización manual de capturas públicas
tests/
  config.test.js              Cambios de catálogo, contacto y SEO
  browser/landing.spec.js     Responsive, teclado, enlaces y accesibilidad
  browser/sections.spec.js    Catálogo, rutas, hashes, historial y SEO estático
```

`App` recibe `site` como propiedad (por defecto importa la configuración). Esto permite verificar otros catálogos sin modificar los archivos comerciales. Las tarjetas, comparativa y metadatos se derivan de los mismos productos activos.

## Rutas y catálogo de secciones

React Router DOM usa `BrowserRouter` en el cliente y `StaticRouter` durante el prerenderizado. Existen dos rutas: `/` (landing) y `/secciones` (catálogo visual). Navbar, Footer y el enlace para saltar al contenido son compartidos. Las rutas desconocidas vuelven a `/` cuando se ejecuta JavaScript.

`src/data/routes.js` es el registro común para `App`, SEO, prerenderizado y sitemap. Para sumar una página en el futuro, agregar su ruta y metadata allí y asociar su componente en `App.jsx`. No hay otras páginas implementadas.

Usar `Link` de React Router para enlaces internos. `homeSection("planes")` devuelve `/#planes`, válido desde cualquier página. Los saltos del catálogo apuntan a `/secciones#standard`, `/secciones#advanced` y `/secciones#custom`. `RouteEffects` espera el render, contempla la carga de fuentes, respeta el espacio de la Navbar y lleva el foco al destino; una ruta sin hash empieza arriba. Los botones atrás/adelante recuperan la posición visitada. El scroll es inmediato, también con movimiento reducido.

Editar `src/data/sections.js` para cambiar los textos, categorías, ejemplos y las 18 opciones iniciales. `SectionPreview` transforma los datos `preview` en miniaturas HTML/CSS decorativas (`aria-hidden`), sin imágenes ni librerías adicionales. Los nombres, cifras y comentarios dentro de esas miniaturas son ejemplos ilustrativos, no resultados o testimonios de la marca. No hay selección, configurador ni cálculo de precios.

La disponibilidad y los límites se derivan de `site.products[].sections`: Esencial combina hasta 4 secciones estándar; Profesional, hasta 7 estándar o avanzadas; Personalizado define un alcance a medida. Hero y contacto/footer básicos no cuentan. Los enlaces informativos de cada tarjeta de Planes se configuran en `products[].sectionsLink`; el contacto continúa usando el canal existente.

## Precios, productos y promociones

Editar **`src/data/site.js` → `products`**. Los precios son números sin puntos ni símbolo de moneda:

```js
price: 220000,
currency: 'ARS',
badge: 'Precio lanzamiento',
```

`price: null` muestra el texto de `pricing.customPrice`. Ejemplos, Planes y Schema.org toman el precio del mismo objeto. `badge: ''` oculta la etiqueta. `featured: true` destaca la tarjeta de precios con un borde cobalto y CTA principal, manteniendo su fondo neutro.

Para agregar un producto, duplicar un objeto completo de `products` y darle un `id` único. Editar nombre, precio, descripción, beneficios, CTA y los valores de `comparison`. La grilla y las columnas se adaptan a los productos activos; no requiere copiar componentes. Los textos editoriales (por ejemplo, “Tres propuestas”) también pueden ajustarse en `pricing` si cambia la cantidad de planes.

Para eliminarlo, borrar su objeto o establecer `enabled: false`. Sus demos asociadas se ocultan automáticamente, al igual que su columna y su oferta en Schema.org. Los textos explicativos y las FAQ son editoriales: al retirar definitivamente un plan, actualizar o quitar también las respuestas que lo mencionan.

La tabla se edita desde `comparison.rows`: cada `key` corresponde a una propiedad de `product.comparison`, salvo `sections`, `sectionTypes` y `revisions`, que se calculan con `planValue` desde sus datos de alcance. Si falta un valor se muestra `pricing.fallback`. En móvil se convierte en fichas por producto; no necesita desplazamiento horizontal.

`pricing.payment` y `pricing.delivery` controlan pago y plazo. La FAQ de pago usa `answerKey: 'paymentAndDelivery'`, de modo que los términos no se duplican. Dominio y costos recurrentes se explican en `comparison.footnote`; no se promete un dominio gratuito.

## Secciones y alcance comercial

`sectionTypes` centraliza nombre, etiqueta breve, descripción y ejemplos de cada tipo. La guía desplegable en Planes recorre ese objeto automáticamente: agregar un tipo o cambiar sus ejemplos no requiere tocar JSX. Los ejemplos son opciones, no una lista de funciones incluidas en todos los portfolios.

Cada producto referencia los tipos por ID y define sus límites una sola vez:

```js
sections: { limit: 4, types: ['standard'] },
revisions: { count: 1 },
```

Profesional usa `types: ['standard', 'advanced']`, `limit: 7` y `revisions: { count: 2, upTo: true }`. Personalizado usa `types: ['custom']`, `limit: null` y `revisions: { count: null }`: no significa contenido ilimitado, sino alcance y ajustes definidos en la propuesta.

`pricing` contiene etiquetas, plantillas de límites y rondas, y `contentNote`: Hero y contacto/footer básicos no consumen secciones. Las tarjetas, la comparativa y las FAQ comparten `planValue`; no repetir cantidades en `features` ni en `comparison`. `features` conserva los beneficios editoriales. `comparison.design` y `comparison.page` también alimentan el bloque Estructura de las tarjetas. Los valores secundarios de SEO y Analytics siguen documentados en los datos, sin protagonismo en la comparativa.

Las FAQ pueden usar `answerTemplate`, con marcadores como `{esencial.sections}`, `{profesional.sectionTypes}`, `{contentNote}` o `{sectionTypes.standard.description}`. Los límites y definiciones se resuelven desde la configuración actual. Para una respuesta editorial simple, seguir usando `answer`. Al retirar un producto, revisar también las preguntas que lo mencionan.

## Demos y screenshots

Agregar un objeto a **`portfolioExamples`** con:

```js
{
  id: 'esencial-03',
  productId: 'esencial', // Debe coincidir con un producto activo
  model: 'Contemporáneo', // Nombre comercial visible
  description: 'Descripción del modelo.',
  url: 'https://tu-demo-publicada.example/',
  image: '/images/demos/esencial-03.webp',
  alt: 'Descripción concreta de la captura',
  tags: ['Editorial', 'Minimalista'],
  tone: 'neutral', // neutral o warm
  featured: false,
  hero: false,
}
```

La demo con `hero: true` aparece primero en la portada. La segunda se toma de una demo con `featured: true` o de la siguiente disponible. No hay índices fijos: si se quita una demo o su producto, se elige otra.

**Nombres visibles de modelos:** editar `portfolioExamples[].model`. Los nombres iniciales son **Editorial**, **Minimal** y **Profesional**. Se conservaron los IDs internos `esencial-01`, `esencial-02` y `profesional-01`; no es necesario renombrar imágenes o enlaces al cambiar un nombre comercial. La antigua propiedad `title` fue reemplazada en las tarjetas por `model` para evitar dos nombres competidores.

**Agrupación por producto:** `productId` conecta cada demo con `products[].id`. `getShowcaseGroups` agrupa automáticamente todos sus modelos y respeta el orden de `products`. Agregar Esencial 03 o Profesional 02 solo requiere sumar su objeto a `portfolioExamples`. Los grupos sin demos o de productos desactivados no se muestran; Personalizado continúa en Planes y no tiene una demo ficticia.

Cada producto puede definir `showcase`:

```js
showcase: {
  layout: 'models', // 'expanded' para una presentación más amplia
  eyebrow: 'UNA PRESENTACIÓN CLARA, A TU MEDIDA',
  headline: 'Elegí una base. Nosotros la hacemos tuya.',
  description: 'Explicación del alcance y los modelos de este producto.',
  modelNote: 'Distintos estilos. Un mismo producto.',
  demoCta: 'Ver portfolio',
  highlights: [], // Beneficios breves para el diseño expanded
}
```

`headline` usa `product.tagline` si no se define. Los demás textos tienen fallbacks al producto o a `site.showcase`. Los contadores de modelos son dinámicos. El nombre del grupo y el precio se leen directamente del producto: no duplicarlos dentro de `showcase`.

Esencial usa `layout: 'models'`: introducción compartida y modelos Editorial y Minimal juntos. Profesional usa `layout: 'expanded'`: demo más amplia, captura e indicadores de profundidad. Ambos tienen el mismo encabezado de producto, con el precio fuera de las tarjetas de modelos. El protagonismo de Profesional está en su demo y el acento del separador, sin encerrar el precio dentro de un contenedor que parezca una tarjeta.

Las imágenes actuales **son capturas reales**, no placeholders, de:

- `https://esencial-sigma.vercel.app/`
- `https://esencial-2.vercel.app/`
- `https://profesional-virid.vercel.app/`

Para reemplazarlas, guardar un WebP en **`public/images/demos/`**, conservando el nombre o cambiando `image`. Tamaño recomendado: **1280 × 860 px**, calidad aproximada 80–85. Ajustar `alt` si cambia el contenido. El marco de navegador lo genera el componente: la imagen no necesita un mockup adicional.

También puede ejecutarse `npm run capture:demos` para volver a capturar las URLs configuradas. Requiere conexión y Chrome. Se ejecuta manualmente durante el mantenimiento, nunca desde la web ni durante el build. No hay servicios externos de screenshots, iframes ni requests a las demos para mostrar las previews. Las tres imágenes actuales suman aproximadamente 140 KB.

## Textos, navegación, FAQ y links

Todos están en **`src/data/site.js`**:

| Cambio                       | Propiedad                                                          |
| ---------------------------- | ------------------------------------------------------------------ |
| Marca y descripción          | `brand`                                                            |
| Portada y CTA principal      | `hero`                                                             |
| Propuesta de valor           | `introduction`                                                     |
| Profesiones y audiencia      | `professions`, `audience`                                          |
| Demos y sus enlaces externos | `portfolioExamples`                                                |
| Encabezados de las secciones | `showcase`, `pricing`, `processIntro`, `benefitsIntro`, `faqIntro` |
| Beneficios                   | `benefits`                                                         |
| Pasos                        | `process`                                                          |
| Preguntas y respuestas       | `faq`                                                              |
| Navegación                   | `navigation`                                                       |
| Cierre y footer              | `finalCta`, `footer`                                               |

Agregar o quitar objetos de `faq` agrega o quita preguntas. Cada una debe tener un `id` único. Los acordeones y la comparativa funcionan con teclado y también sobre el HTML de producción sin JavaScript.

Los enlaces de demos se abren en otra pestaña con `noopener noreferrer`. Los enlaces internos deben corresponder a los IDs existentes: `inicio`, `ejemplos`, `planes`, `proceso`, `preguntas`, `contacto`.

## WhatsApp, email e Instagram

En **`contact`**:

- **WhatsApp:** completar `whatsapp` con el número internacional de la cuenta real. Se admiten separadores comunes; el enlace usa solo dígitos. `whatsappMessage` define el mensaje general y `planMessage` el de cada plan, con `{product}` como marcador. Vacío o inválido utiliza email automáticamente.
- **Email:** cambiar `email`; actualmente `portfolioslaplata@gmail.com`. `emailSubject` define el asunto. El cuerpo incluye el mensaje general o el plan elegido.
- **Instagram:** completar `instagram` con la URL HTTPS del perfil. Vacío o inválido no renderiza ningún enlace. No usar solamente el usuario ni `@usuario`.

No se envía ningún mensaje automáticamente. Los botones abren el canal de contacto para que el visitante continúe la conversación.

## Identidad visual

Editar **`src/data/theme.js`**, la única fuente de colores de la landing:

```js
primary: '#3157e8',
secondary: '#eeede9',
accent: '#e6ebff',
background: '#f7f7f4',
surface: '#ffffff',
text: '#171717',
muted: '#666661',
border: '#dddcd7',
```

El archivo también contiene hover, texto sobre cobalto, fondos de previews y sombras. `src/lib/theme.js` genera las variables de la página y el favicon SVG embebido a partir de esa paleta; `src/lib/seo.js` reutiliza el color principal para el navegador. El favicon estático anterior fue sustituido por esta versión generada. `src/styles.css` expone los tokens mediante `@theme static` y los utiliza en todos los estilos. Reiniciar Vite o reconstruir después de cambiar la paleta.

La identidad usa una base mayormente neutra, con cobalto en CTAs, enlaces, etiquetas, números y contornos destacados. Se conservaron Manrope y DM Sans, las formas principales y el orden de secciones. Los colores que aparecen dentro de las capturas pertenecen a cada demo, no a la marca de la landing.

Tipografías: **Manrope** para titulares y **DM Sans** para texto. Se sirven localmente desde paquetes Fontsource, sin llamadas a Google Fonts y con `font-display: swap`. Los tokens `--font-display` y `--font-sans` controlan la asignación. Las licencias OFL están en los paquetes correspondientes.

Las animaciones son breves (entrada del hero, hover y acordeones) y se desactivan con `prefers-reduced-motion`.

## SEO

Editar **`seo`** en la configuración:

- `title` y `description`: título y descripción centralizados.
- `siteUrl`: **completar con la URL definitiva antes de publicar**. Se dejó vacío para no inventar un dominio. Activa canonical, `og:url` y la generación de `sitemap.xml`.
- `locale`: `es_AR`. El HTML usa `lang="es-AR"`.
- `socialImage`: ruta local opcional de una imagen social (por ejemplo `/images/social.jpg`); debe existir en `public`.
- `socialImageAlt`: texto alternativo de esa imagen.

Se generan title, description, favicon, Open Graph, Twitter/X y JSON-LD **Service + Organization + OfferCatalog**. Los precios iniciales se expresan como `minPrice`, sin inventar reseñas, dirección física o antigüedad. Sin imagen social se utiliza tarjeta `summary`; con dominio e imagen configurados, `summary_large_image`. No se inventó una imagen social ni una URL pública de esta landing.

`npm run build` prerenderiza ambas páginas a `dist/index.html` y `dist/secciones/index.html`, además de `robots.txt` y el sitemap con ambas rutas cuando existe dominio. La home conserva su schema Service; el catálogo usa CollectionPage. Cada ruta tiene su propio título, descripción y etiquetas sociales, disponibles sin JavaScript y actualizados al navegar en el cliente. No editar `dist` a mano: cambiar la configuración y reconstruir.

El resultado es un sitio estático que puede publicarse en un hosting de archivos estáticos. Comando de build: `npm run build`; directorio de salida: `dist`. No requiere servidor de React en producción.

El hosting debe servir `/secciones` desde `secciones/index.html` (o resolver directorios con `index.html`). Conservar ese archivo de ruta antes de cualquier fallback de SPA para mantener el SEO y el contenido sin JavaScript. Vite preview ya sirve ambas rutas y sus recargas; no se agregó configuración de un proveedor ni se publicó esta iteración.

## Analytics opcional

GA4 está **desactivado** y no carga scripts ni realiza requests de tracking en el estado entregado.

Para activarlo deliberadamente:

1. Copiar `.env.example` como `.env.local`.
2. Definir `VITE_GA_MEASUREMENT_ID=G-TU_ID_REAL`.
3. Establecer `analytics.enabled: true` en `src/data/site.js`.
4. Reiniciar el servidor o reconstruir/publicar.

Se requieren **ambas** condiciones; IDs inválidos tampoco cargan scripts. El ID de medición es configuración pública del cliente, no una credencial secreta. La integración mide visitas de página y desactiva Google Signals y personalización de anuncios. No incluye eventos comerciales adicionales ni una interfaz de consentimiento; incorporar el flujo correspondiente antes de activarla si se requiere para la publicación elegida.

## Validación

- `npm run lint`: ESLint con cero advertencias permitidas.
- `npm test`: fallback de contacto, URLs de Instagram, cambios de catálogo, precios, promociones, SEO y términos de pago.
- `npm run test:browser`: 320, 375, 430, 768, 1024 y 1440 px; overflow con comparativa abierta; menú por teclado/Escape; FAQ; enlaces y capturas locales; tracking desactivado; HTML sin JavaScript. Incluye axe WCAG A/AA en móvil y escritorio. Una auditoría automática no reemplaza una revisión humana de accesibilidad.
- Capturas de revisión generadas en `test-results/`, excluidas de control de versiones.

El catálogo agrega comprobaciones a 320, 375, 430, 768, 900, 1024 y 1440 px; navegación home ↔ catálogo, Navbar y Footer, saltos a Planes/Ejemplos/Proceso/Preguntas, repetición del mismo hash, historial, recargas, menú móvil por teclado, ausencia de overflow, axe y prerenderizado sin JavaScript.

La landing tiene su repositorio independiente. Para esta iteración se siguieron, por indicación del usuario, `../Productos/AGENTS.md` y las decisiones compartidas de `../Productos/producto-docs/`. El catálogo compartido refleja los nuevos límites, tipos de secciones y rondas; no se modificaron los modelos de producto. La comparativa prioriza estructura y contenido, mantiene las diferencias de CV y dominio, y deja SEO y Analytics como información secundaria en los datos y la documentación.
