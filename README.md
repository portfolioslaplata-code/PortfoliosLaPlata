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
  components/
    Navbar.jsx                Navegación de escritorio y menú móvil
    Hero.jsx                  Hero, propuesta y profesiones
    PortfolioShowcase.jsx     Galería generada a partir de las demos
    Products.jsx              Tarjetas y comparativa responsive
    Process.jsx               Proceso de contratación
    Benefits.jsx              Beneficios
    FAQ.jsx                   Preguntas con acordeones nativos
    Footer.jsx                CTA final y footer
    ui.jsx                    Marca, botones, enlaces y marco de navegador
  lib/
    site.js                   Contacto, filtros, precios y respuestas compartidas
    seo.js                    Metadatos HTML y Schema.org
    analytics.js              Integración opcional de GA4
  App.jsx                     Composición de las secciones
  main.jsx                    Inicio/hidratación de React
  entry-server.jsx            Render estático durante el build
  styles.css                  Tokens de identidad y estilos responsive
public/
  favicon.svg
  images/demos/*.webp         Capturas reales guardadas localmente
scripts/
  prerender.mjs               HTML estático, robots y sitemap condicional
  capture-demos.mjs           Actualización manual de capturas públicas
tests/
  config.test.js              Cambios de catálogo, contacto y SEO
  browser/landing.spec.js     Responsive, teclado, enlaces y accesibilidad
```

`App` recibe `site` como propiedad (por defecto importa la configuración). Esto permite verificar otros catálogos sin modificar los archivos comerciales. Las tarjetas, comparativa y metadatos se derivan de los mismos productos activos.

## Precios, productos y promociones

Editar **`src/data/site.js` → `products`**. Los precios son números sin puntos ni símbolo de moneda:

```js
price: 220000,
currency: 'ARS',
badge: 'Precio lanzamiento',
```

`price: null` muestra el texto de `pricing.customPrice`. El formato argentino y Schema.org toman el valor del mismo objeto. `badge: ''` oculta la etiqueta. `featured: true` da el tratamiento verde destacado.

Para agregar un producto, duplicar un objeto completo de `products` y darle un `id` único. Editar nombre, precio, descripción, beneficios, CTA y los valores de `comparison`. La grilla y las columnas se adaptan a los productos activos; no requiere copiar componentes. Los textos editoriales (por ejemplo, “Tres propuestas”) también pueden ajustarse en `pricing` si cambia la cantidad de planes.

Para eliminarlo, borrar su objeto o establecer `enabled: false`. Sus demos asociadas se ocultan automáticamente, al igual que su columna y su oferta en Schema.org. Los textos explicativos y las FAQ son editoriales: al retirar definitivamente un plan, actualizar o quitar también las respuestas que lo mencionan.

La tabla se edita desde `comparison.rows`: cada `key` corresponde a una propiedad de `product.comparison`. Si falta un valor se muestra “A consultar”. En móvil se convierte en fichas por producto; no necesita desplazamiento horizontal.

`pricing.payment` y `pricing.delivery` controlan pago y plazo. La FAQ de pago usa `answerKey: 'paymentAndDelivery'`, de modo que los términos no se duplican. Dominio y costos recurrentes se explican en `comparison.footnote`; no se promete un dominio gratuito.

## Demos y screenshots

Agregar un objeto a **`portfolioExamples`** con:

```js
{
  id: 'esencial-03',
  productId: 'esencial', // Debe coincidir con un producto activo
  model: 'Modelo 03',
  title: 'Otra forma de presentarte.',
  description: 'Descripción del modelo.',
  url: 'https://tu-demo-publicada.example/',
  image: '/images/demos/esencial-03.webp',
  alt: 'Descripción concreta de la captura',
  tags: ['Editorial', 'Minimalista'],
  tone: 'sage', // peach, blue o sage
  featured: false,
  hero: false,
}
```

La demo con `hero: true` aparece primero en la portada. La segunda se toma de una demo destacada o de la siguiente disponible. No hay índices fijos: si se quita una demo o su producto, se elige otra. `featured: true` permite una tarjeta ancha. `productId` conecta la demo con el nombre vigente del producto.

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

Editar el bloque **`@theme` en `src/styles.css`**:

```css
--color-primary: #244a3b;
--color-secondary: #e9eee5;
--color-accent: #d7e8a4;
--color-background: #faf9f6;
--color-surface: #ffffff;
--color-text: #222d26;
--color-muted: #62685f;
--color-border: #dcded5;
```

Los estilos usan esos tokens; las tonalidades específicas de las previews están en `.tone-peach`, `.tone-blue` y `.tone-sage`. Para un cambio completo de marca, revisar también el favicon `public/favicon.svg`, el color del navegador en `src/lib/seo.js` y los estados hover/contraste del CSS.

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

`npm run build` prerenderiza **toda la página** a `dist/index.html`, además de `robots.txt` y el sitemap cuando existe dominio. Las etiquetas sociales y el contenido están disponibles sin JavaScript. No editar `dist` a mano: cambiar la configuración y reconstruir. Si se modifica SEO durante desarrollo, reiniciar Vite para volver a generar las etiquetas del head.

El resultado es un sitio estático que puede publicarse en un hosting de archivos estáticos. Comando de build: `npm run build`; directorio de salida: `dist`. No requiere servidor de React en producción.

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

La carpeta se recibió vacía, sin `AGENTS.md` aplicable ni repositorio Git. No se modificaron los proyectos de `Productos` ni se publicó la landing en un servicio externo.
