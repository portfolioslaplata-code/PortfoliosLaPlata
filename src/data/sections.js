export const sectionsPage = {
  eyebrow: "UN PORTFOLIO, MUCHAS FORMAS DE CONTARTE",
  title: "Elegí qué querés mostrar.",
  description: "Cada perfil tiene algo distinto para contar. Estas son algunas de las secciones que podemos combinar para construir tu portfolio.",
  definition: "Una sección es un bloque de contenido con un propósito: presentarte, mostrar tus proyectos o contar tu recorrido.",
  previewNote: "Ejemplos ilustrativos. Adaptamos el diseño y el contenido a tu perfil.",
  planIntro: "Tu contenido marca el punto de partida.",
  plansLink: "Ver los planes",
  availableLabel: "Disponible en",
  idealLabel: "Para mostrar",
  anatomy: { title: "Así toma forma tu portfolio", intro: "Presentación / Hero", content: ["Sobre mí", "Proyectos", "Experiencia"], outro: "Contacto / Footer básico", included: "Incluido", note: "Cada bloque cuenta una parte de tu historia." },
  custom: {
    eyebrow: "PERSONALIZADO · A MEDIDA",
    title: "¿Necesitás algo diferente?",
    description: "Si necesitás una sección, interacción o función que no está en nuestra biblioteca, podemos diseñarla específicamente para tu proyecto.",
    examples: ["Filtros y buscadores", "Mapas interactivos", "Reservas", "Calculadoras", "Configuradores", "Interacciones específicas"],
    note: "Son posibilidades a evaluar, no funciones incluidas automáticamente. Definimos juntos la viabilidad, el alcance y el presupuesto, sin una biblioteca rígida ni un límite predefinido.",
    cta: "Contanos tu idea",
  },
};

// Availability is derived from site.products[].sections.types, so the catalog
// and pricing always describe the same plans. Preview content is illustrative.
export const sectionCategories = [
  {
    id: "standard",
    title: "Lo esencial para contar quién sos.",
    description: "Bloques simples y claros para darle un lugar a tu experiencia, tus ideas y tu trabajo. Disponibles en Esencial y Profesional.",
    items: [
      { id: "about", name: "Sobre mí", description: "Tu presentación personal, una fotografía y lo que te distingue como profesional.", idealFor: "Tu perfil y tu forma de trabajar", preview: { type: "about", title: "Hola, soy Alex.", labels: ["Diseño y comunicación", "Ideas que conectan."] } },
      { id: "experience", name: "Experiencia", description: "Puestos, instituciones y períodos, con una descripción breve de tu aporte en cada etapa.", idealFor: "Tu recorrido laboral", preview: { type: "list", title: "Mi experiencia", labels: ["Estudio Norte · Actualidad", "Equipo creativo · 2023–2025"] } },
      { id: "education", name: "Formación", description: "Carreras, cursos y estudios que construyen la base de lo que sabés hacer.", idealFor: "Tu recorrido académico", preview: { type: "list", title: "Siempre aprendiendo", labels: ["Licenciatura en Diseño", "Especialización en comunicación"] } },
      { id: "projects", name: "Proyectos", description: "Tarjetas con imagen, nombre, descripción y un link opcional para conocer cada trabajo.", idealFor: "Una selección de tus trabajos", preview: { type: "cards", title: "Proyectos seleccionados", labels: ["Identidad", "Editorial", "Digital"] } },
      { id: "services", name: "Servicios", description: "Una presentación sencilla de lo que ofrecés, organizada en tarjetas o bloques.", idealFor: "Tus servicios y especialidades", preview: { type: "services", title: "En qué puedo ayudarte", labels: ["Estrategia", "Diseño", "Asesoría"] } },
      { id: "skills", name: "Habilidades", description: "Herramientas, conocimientos, especialidades e idiomas que forman parte de tu perfil.", idealFor: "Lo que sabés hacer", preview: { type: "tags", title: "Mis herramientas", labels: ["Diseño", "Figma", "Fotografía", "Inglés", "Estrategia"] } },
      { id: "certifications", name: "Certificaciones", description: "Cursos y acreditaciones relevantes, con la institución que los respalda.", idealFor: "Tu aprendizaje y acreditaciones", preview: { type: "certificates", title: "Aprendizaje continuo", labels: ["Diseño de experiencias", "Comunicación visual"] } },
      { id: "gallery", name: "Galería simple", description: "Una selección de imágenes para que tu trabajo hable por sí mismo.", idealFor: "Fotografía, arquitectura, arte, gastronomía o diseño", preview: { type: "gallery", title: "Una mirada a mi trabajo", labels: [] } },
      { id: "clients", name: "Clientes / colaboraciones", description: "Nombres o logos de las marcas, instituciones y equipos con los que trabajaste.", idealFor: "Tus vínculos profesionales", preview: { type: "logos", title: "Proyectos compartidos", labels: ["norte®", "ESTUDIO", "forma.", "TRAMA"] } },
      { id: "achievements", name: "Logros", description: "Datos destacados para resumir tu experiencia y tus principales hitos.", idealFor: "Un vistazo a tu recorrido", preview: { type: "metrics", title: "Mi recorrido, en números", labels: ["12|proyectos", "4|años creando", "6|colaboraciones"] } },
    ],
  },
  {
    id: "advanced",
    title: "Más formas de contar tu trabajo.",
    description: "En Profesional podemos combinar secciones estándar con recursos más ricos cuando tu contenido necesita mayor profundidad o interacción.",
    items: [
      { id: "slider", name: "Proyecto con slider", description: "Varias imágenes de un mismo proyecto en un carrusel, para mostrar cada detalle sin perder el hilo.", idealFor: "Distintas vistas de un mismo trabajo", preview: { type: "slider", title: "Casa Patio · Proyecto", labels: ["02 / 05"] } },
      { id: "case-study", name: "Mini case study", description: "El contexto, el desafío, el proceso, la solución y el resultado: la historia detrás de tu trabajo.", idealFor: "Tus decisiones y el valor de tu aporte", preview: { type: "case", title: "Una idea, de principio a fin", labels: ["Contexto", "Desafío", "Proceso", "Solución", "Resultado"] } },
      { id: "catalog", name: "Catálogo visual", description: "Servicios, productos o trabajos con más imágenes e información. Una vidriera de lo que hacés; no incluye ecommerce.", idealFor: "Colecciones y propuestas en detalle", preview: { type: "catalog", title: "Colección Objeto", labels: ["Línea Uno", "Línea Dos", "Línea Tres"] } },
      { id: "expanded-gallery", name: "Galería avanzada", description: "Más fotografías y una presentación expandida, con slider o lightbox para verlas en detalle.", idealFor: "Series fotográficas y proyectos visuales", preview: { type: "expanded", title: "Espacios para habitar", labels: ["Vista ampliada · 03 / 08"] } },
      { id: "timeline", name: "Timeline avanzada", description: "Experiencias e hitos conectados en una línea de tiempo, con espacio para desarrollar cada etapa.", idealFor: "La evolución de tu trayectoria", preview: { type: "timeline", title: "Un recorrido en movimiento", labels: ["2022|El primer proyecto", "2024|Nuevos desafíos", "Hoy|Un estudio propio"] } },
      { id: "results", name: "Métricas / resultados", description: "Resultados concretos con contexto: mejoras, alcance o impacto medible de un proyecto.", idealFor: "El impacto de tu trabajo", preview: { type: "results", title: "Un cambio que se puede medir", labels: ["−32%|tiempo de gestión", "+48%|consultas recibidas"] } },
      { id: "testimonials", name: "Testimonios", description: "Recomendaciones profesionales o comentarios de clientes que cuentan cómo fue trabajar con vos.", idealFor: "La experiencia de quienes te eligen", preview: { type: "quote", title: "Lo que dicen del trabajo", labels: ["“Entendió la idea y la llevó mucho más lejos.”", "Cliente de ejemplo · Proyecto de identidad"] } },
      { id: "before-after", name: "Comparativa / Before & After", description: "Dos momentos de un mismo trabajo para mostrar con claridad qué cambió y cuál fue tu aporte.", idealFor: "Arquitectura, diseño, fotografía, marketing, entrenamiento o reformas", preview: { type: "comparison", title: "Una nueva perspectiva", labels: ["Antes", "Después"] } },
    ],
  },
];
