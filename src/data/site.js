import { homeSection } from "./routes.js";

export const site = {
  brand: {
    name: "Portfolios La Plata",
    shortName: "portfolios",
    location: "LA PLATA",
    description:
      "Tu experiencia, tu trabajo y tu recorrido profesional en un lugar propio.",
    origin: "Desde La Plata. Para donde estés.",
    promise: "Tu experiencia · Tu identidad · Tu propio link",
  },
  navigation: [
    { label: "Ejemplos", href: homeSection("ejemplos") },
    { label: "Planes", href: homeSection("planes") },
    { label: "Secciones", href: "/secciones" },
    { label: "Cómo funciona", href: homeSection("proceso") },
    { label: "Preguntas", href: homeSection("preguntas") },
  ],
  hero: {
    eyebrow: "PORTFOLIOS WEB HECHOS PARA VOS",
    title: "Tu carrera merece",
    emphasis: "más que un PDF.",
    description:
      "Creamos portfolios web profesionales para reunir tu experiencia, formación y proyectos en un lugar propio. Para mostrar lo que hacés y compartirlo con un solo link.",
    primaryCta: "Quiero mi portfolio",
    secondaryCta: "Ver ejemplos",
    note: "Para estudiantes, freelancers y profesionales. Estés donde estés.",
    previewLabel: "Tu próximo paso, en primera pantalla.",
    previewNote: "Modelos reales. Tu identidad.",
    previewEyebrow: "01 — TU ESPACIO PROFESIONAL",
    stamp: ["tu trabajo,", "tu lugar.", "en internet ↗"],
  },
  introduction: {
    eyebrow: "DALE UN LUGAR A LO QUE HACÉS",
    title: "Un CV resume.\nUn portfolio demuestra.",
    description:
      "Tu CV sigue siendo importante. Tu portfolio lo acompaña con lo que una hoja no siempre alcanza a contar: tus proyectos, tu forma de trabajar y el valor de tu experiencia.",
    items: [
      "Mostrá tus trabajos y resultados",
      "Contá qué hacés y cómo lo hacés",
      "Facilitá que te encuentren y contacten",
    ],
  },
  professions: [
    "Arquitectura",
    "Fotografía",
    "Programación",
    "Diseño",
    "Comunicación",
    "Marketing",
    "Ingeniería",
    "Administración",
    "Psicología",
    "Nutrición",
    "Entrenamiento",
    "Investigación",
    "Consultoría",
  ],
  audience: {
    title: "Tu profesión también puede tener portfolio.",
    description:
      "Estés estudiando, empezando tu carrera o trabajando por tu cuenta. Si tenés algo para mostrar, hay una forma de contarlo.",
    ending: "Y también la tuya.",
  },
  showcase: {
    eyebrow: "CONOCÉ NUESTROS PORTFOLIOS",
    title: "Elegí qué querés contar.\nMirá cómo puede verse.",
    description:
      "Una presentación clara o un recorrido con más profundidad. Explorá los productos y sus modelos antes de elegir el tuyo.",
    note: "Son demos de producto: los perfiles y contenidos ilustran cada modelo.",
    demoCta: "Ver portfolio",
    priceCta: "Ver qué incluye",
    singularModelLabel: "{count} modelo disponible",
    pluralModelLabel: "{count} modelos disponibles",
  },
  portfolioExamples: [
    {
      id: "esencial-01",
      productId: "esencial",
      model: "Editorial",
      description:
        "Cálido, expresivo y visual. Una base para perfiles creativos que quieren darle protagonismo a su trabajo y su personalidad.",
      url: "https://esencial-sigma.vercel.app/",
      image: "/images/demos/esencial-01.webp",
      alt: "Captura de la demo Esencial 01, portfolio creativo de diseño y comunicación",
      tags: ["Editorial", "Cálido", "Visual"],
      tone: "warm",
      hero: true,
    },
    {
      id: "esencial-02",
      productId: "esencial",
      model: "Minimal",
      description:
        "Sobrio, simple y estructurado. Para quienes buscan una presentación profesional más neutral y ordenada.",
      url: "https://esencial-2.vercel.app/",
      image: "/images/demos/esencial-02.webp",
      alt: "Captura de la demo Esencial 02, portfolio de estilo sobrio y estructurado",
      tags: ["Minimalista", "Sobrio", "Estructurado"],
      tone: "neutral",
    },
    {
      id: "profesional-01",
      productId: "profesional",
      model: "Profesional",
      description:
        "Conocé una presentación que reúne proyectos con contexto, trayectoria y logros. Una base con más libertad para desarrollar tu perfil.",
      url: "https://profesional-virid.vercel.app/",
      image: "/images/demos/profesional-01.webp",
      alt: "Captura de la demo Profesional 01, presentación profesional con proyectos desarrollados",
      tags: ["Proyectos con contexto", "Trayectoria y logros"],
      tone: "neutral",
      featured: true,
    },
  ],
  pricing: {
    eyebrow: "UN PUNTO DE PARTIDA PARA CADA ETAPA",
    title: "Elegí cómo querés presentarte.",
    description:
      "Tres propuestas según lo que necesitás contar. Si no sabés cuál elegir, lo vemos juntos.",
    startingAt: "Desde",
    customPrice: "Cotización personalizada",
    idealLabel: "IDEAL PARA",
    structureLabel: "ESTRUCTURA",
    sectionsLabel: "SECCIONES DE CONTENIDO",
    contentNote:
      "Hero (presentación inicial), contacto y footer básicos ya están incluidos y no cuentan dentro del límite de secciones de contenido.",
    sectionGuideLabel: "¿Cómo son los distintos tipos de secciones?",
    examplesLabel: "Por ejemplo",
    sectionLimit: "Hasta {count} secciones de contenido",
    customLimit: "Según tu necesidad y el alcance acordado",
    revisionOne: "{count} ronda de ajustes",
    revisionMany: "{count} rondas de ajustes",
    revisionUpTo: "Hasta {count} rondas de ajustes",
    customRevisions: "Ajustes según propuesta",
    fallback: "A consultar",
    note: "Valores orientativos en pesos argentinos. El alcance y el presupuesto final se acuerdan antes de comenzar.",
    payment: "50% para comenzar y 50% antes de publicar.",
    delivery:
      "Los tiempos dependen del producto y de tener disponible todo el material necesario.",
  },
  sectionTypes: {
    standard: {
      name: "Secciones estándar",
      label: "Estándar",
      description:
        "Elegís qué información mostrar y la presentamos con secciones de nuestra biblioteca, adaptadas al modelo y a tu perfil.",
      examples: [
        "Sobre mí",
        "Experiencia y formación",
        "Habilidades",
        "Proyectos o servicios en tarjetas simples",
      ],
    },
    advanced: {
      name: "Secciones avanzadas",
      label: "Avanzadas",
      description:
        "Recursos con más profundidad visual, narrativa o interacción para desarrollar tu trabajo. Elegimos los que aportan a tu historia; no necesitás usarlos todos.",
      examples: [
        "Proyectos con contexto, rol, proceso y resultados",
        "Galerías ampliables o carruseles",
        "Testimonios",
        "Métricas y logros",
      ],
    },
    custom: {
      name: "Secciones a medida",
      label: "A medida",
      description:
        "Diseñamos y desarrollamos lo que tu proyecto necesita cuando la biblioteca no alcanza. Cada sección o función se acuerda y presupuesta antes de comenzar.",
      examples: [
        "Catálogo con filtros",
        "Formulario con lógica propia",
        "Interacciones para tu profesión",
      ],
    },
  },
  products: [
    {
      id: "esencial",
      name: "Esencial",
      enabled: true,
      price: 220000,
      currency: "ARS",
      badge: "",
      tagline: "Una forma clara de empezar tu presencia profesional.",
      description:
        "Una web profesional sencilla, completa y lista para compartir.",
      sections: { limit: 4, types: ["standard"] },
      sectionsLink: { label: "Explorar secciones", href: "/secciones#standard" },
      revisions: { count: 1 },
      features: [
        "Adaptamos contenido, colores e imágenes a tu perfil",
        "Diseño para celular, tablet y computadora",
      ],
      cta: "Consultar por Esencial",
      showcase: {
        layout: "models",
        eyebrow: "UNA PRESENTACIÓN CLARA, A TU MEDIDA",
        headline: "Elegí una base. Nosotros la hacemos tuya.",
        description:
          "Son distintos modelos del mismo producto. Elegís tu estilo y las secciones estándar que necesitás; adaptamos el contenido, las imágenes y los colores a tu perfil.",
        modelNote: "Distintos estilos. Un mismo producto.",
        demoCta: "Ver portfolio",
      },
      comparison: {
        design: "Elegís un modelo y lo adaptamos a vos",
        page: "Una página (one-page)",
        responsive: "Incluido",
        cv: "No incluido",
        domain: "No incluido",
        seo: "Básico",
        analytics: "No incluida",
        multipage: "No incluida",
        special: "Secciones disponibles en el modelo",
      },
    },
    {
      id: "profesional",
      name: "Profesional",
      enabled: true,
      price: 350000,
      currency: "ARS",
      badge: "Más posibilidades",
      featured: true,
      tagline:
        "Más espacio para desarrollar tu recorrido y demostrar lo que sabés hacer.",
      description:
        "Experiencia, proyectos, servicios o resultados que merecen contarse con más profundidad.",
      sections: { limit: 7, types: ["standard", "advanced"] },
      sectionsLink: { label: "Explorar secciones", href: "/secciones#advanced" },
      revisions: { count: 2, upTo: true },
      features: [
        "Más libertad visual y proyectos con contexto, proceso y resultados",
        "CV descargable",
        "Configuración de tu propio dominio¹",
        "Diseño para celular, tablet y computadora",
      ],
      cta: "Consultar por Profesional",
      showcase: {
        layout: "expanded",
        eyebrow: "TU RECORRIDO, CON MÁS PROFUNDIDAD",
        headline: "Más espacio para demostrar lo que sabés hacer.",
        description:
          "Una base con mayor libertad visual y de estructura, que combina secciones estándar y avanzadas. Podés desarrollar un proyecto con contexto, tu rol, el desafío, el proceso y sus resultados.",
        demoCta: "Ver portfolio profesional",
        highlights: [
          "Proyectos con contexto y resultados",
          "Galerías, testimonios o logros según tu contenido",
          "CV descargable",
          "Mayor libertad de presentación",
        ],
      },
      comparison: {
        design: "Base con mayor adaptación visual y de estructura",
        page: "Una página (one-page)",
        responsive: "Incluido",
        cv: "Incluido",
        domain: "Configuración incluida¹",
        seo: "Ampliado",
        analytics: "Incluida",
        multipage: "No incluida",
        special: "Recursos avanzados de nuestra biblioteca",
      },
    },
    {
      id: "personalizado",
      name: "Personalizado",
      enabled: true,
      price: null,
      currency: "ARS",
      badge: "",
      tagline: "Diseñado alrededor de lo que necesitás.",
      description:
        "Una idea o un contenido que necesita ir más allá de nuestros modelos.",
      sections: { limit: null, types: ["custom"] },
      sectionsLink: { label: "Ver posibilidades", href: "/secciones#custom" },
      revisions: { count: null },
      features: [
        "Arquitectura según tu contenido",
        "Posibilidad de múltiples páginas",
        "Interacciones y funciones acordadas para tu proyecto",
        "Alcance definido antes de comenzar",
      ],
      cta: "Contanos tu idea",
      comparison: {
        design: "Diseño desde cero",
        page: "Según tu proyecto",
        responsive: "Incluido",
        cv: "Según propuesta",
        domain: "Según propuesta¹",
        seo: "Según propuesta",
        analytics: "Según propuesta",
        multipage: "Disponible según propuesta",
        special: "Diseño y desarrollo según necesidad y propuesta",
      },
    },
  ],
  comparison: {
    title: "Los detalles, lado a lado.",
    description: "Lo que cambia entre cada propuesta.",
    label: "Comparar los planes",
    featureLabel: "Qué incluye",
    footnote:
      "¹ El registro y la renovación del dominio se abonan aparte. La publicación y cualquier costo recurrente se detallan en la propuesta.",
    rows: [
      { key: "design", label: "Punto de partida" },
      { key: "page", label: "Formato de la web" },
      { key: "sections", label: "Secciones de contenido" },
      { key: "sectionTypes", label: "Tipo de secciones" },
      { key: "responsive", label: "Adaptado a todos los dispositivos" },
      { key: "cv", label: "CV descargable" },
      { key: "domain", label: "Dominio propio" },
      { key: "multipage", label: "Múltiples páginas" },
      { key: "revisions", label: "Rondas de ajustes" },
      { key: "special", label: "Funciones específicas" },
    ],
  },
  processIntro: {
    eyebrow: "DE TU IDEA A TU LINK",
    title: "Vos traés tu historia.\nNosotros nos ocupamos de la web.",
    description:
      "Te acompañamos paso a paso. No necesitás saber de tecnología.",
  },
  process: [
    {
      title: "Nos contás sobre vos",
      description:
        "Conversamos sobre tu perfil y elegimos la propuesta que tiene sentido para vos.",
    },
    {
      title: "Reunimos tu contenido",
      description:
        "Nos compartís tu CV, fotos, trabajos, proyectos y los links que quieras incluir.",
    },
    {
      title: "Diseñamos tu portfolio",
      description:
        "Damos forma a tu contenido y adaptamos el diseño a tu identidad profesional.",
    },
    {
      title: "Lo revisamos juntos",
      description:
        "Ves el resultado y afinamos los detalles con las rondas de ajustes de tu plan.",
    },
    {
      title: "Publicamos",
      description:
        "Publicamos tu portfolio. Tu próximo contacto puede empezar con un solo link.",
    },
  ],
  benefitsIntro: {
    eyebrow: "MÁS QUE ESTAR ONLINE",
    title: "Un lugar que trabaja\na favor de tu carrera.",
  },
  benefits: [
    {
      icon: "link",
      title: "Todo, en un solo link.",
      description:
        "En tu CV, LinkedIn, redes o una postulación. Compartí tu recorrido sin adjuntar una carpeta entera.",
    },
    {
      icon: "fingerprint",
      title: "Tu perfil, tus formas.",
      description:
        "Tu profesión tiene su propia manera de mostrar valor. Tu portfolio también debería tenerla.",
    },
    {
      icon: "devices",
      title: "Una buena primera impresión.",
      description:
        "Una presentación clara y cuidada, desde el celular o la computadora de quien te encuentre.",
    },
    {
      icon: "growth",
      title: "Crece con tu recorrido.",
      description:
        "Nuevos proyectos, experiencias y servicios pueden sumarse después. Las actualizaciones se acuerdan según lo que necesites.",
    },
  ],
  faqIntro: {
    eyebrow: "ANTES DE DAR EL PRIMER PASO",
    title: "Algunas preguntas,\nrespuestas claras.",
    description: "Si te quedó otra duda, escribinos. La conversamos.",
    cta: "Hablemos de tu portfolio",
  },
  faq: [
    {
      id: "universitario",
      question: "¿Necesito ser universitario o tener experiencia?",
      answer:
        "No. Podés estar estudiando, dar tus primeros pasos, trabajar como freelance o tener una carrera consolidada. Partimos de lo que ya tenés: formación, proyectos, servicios, trabajos o experiencia.",
    },
    {
      id: "material",
      question: "¿Qué tengo que enviar para comenzar?",
      answer:
        "Tu CV o información profesional, fotografías, proyectos, trabajos y redes. Revisamos el material disponible y te orientamos sobre qué conviene incluir. No necesitás tener todo perfectamente organizado.",
    },
    {
      id: "modelos",
      question: "¿Todos los portfolios Esenciales son iguales?",
      answer:
        "No. Partimos de un modelo que elegís vos y adaptamos contenido, colores e imágenes a tu perfil. Podés elegir entre las secciones estándar disponibles. Cambia tu presentación, sin diseñar toda la web desde cero.",
    },
    {
      id: "diferencia",
      question: "¿Qué cambia de Esencial a Profesional?",
      answerTemplate:
        "Esencial presenta tu perfil con un modelo adaptado: {esencial.sections}, de tipo {esencial.sectionTypes}. Profesional desarrolla tu recorrido con más libertad visual: {profesional.sections}, de tipo {profesional.sectionTypes}. Podés mostrar proyectos con contexto, tu rol, proceso y resultados; además incluye CV descargable y configuración de dominio propio.",
    },
    {
      id: "secciones",
      question: "¿Qué cuenta como una sección?",
      answerTemplate:
        "Un bloque de contenido, como Sobre mí, Experiencia, Formación, Proyectos o Servicios. {contentNote}",
    },
    {
      id: "tipos",
      question:
        "¿Qué diferencia hay entre una sección estándar y una avanzada?",
      answerTemplate:
        "{sectionTypes.standard.description} {sectionTypes.advanced.description} Por ejemplo, una tarjeta breve presenta un proyecto; un caso de trabajo desarrolla el contexto, tu rol y el resultado.",
    },
    {
      id: "personalizado",
      question: "¿Cuándo conviene un portfolio Personalizado?",
      answer:
        "Cuando tu idea o contenido no encaja en nuestros modelos. Diseñamos desde cero la estructura, las secciones y las interacciones que necesitás. Puede tener varias páginas; la cantidad de contenido, las funciones y los ajustes se definen en la propuesta antes de comenzar.",
    },
    {
      id: "dominio",
      question: "¿Puedo usar mi propio dominio?",
      answer:
        "Sí. Profesional contempla su configuración; en las otras propuestas lo conversamos. El registro y la renovación del dominio se abonan aparte. Nos ocupamos de la parte técnica y acordamos las condiciones de publicación antes de empezar.",
    },
    {
      id: "actualizar",
      question: "¿Puedo actualizar mi portfolio después?",
      answer:
        "Sí. Podemos sumar proyectos, cambiar textos o actualizar tu experiencia. Las actualizaciones posteriores se presupuestan según el trabajo necesario; no incluyen un editor autogestionable salvo que se acuerde expresamente.",
    },
    {
      id: "pago",
      question: "¿Cómo se paga y cuánto tarda?",
      answerKey: "paymentAndDelivery",
    },
    {
      id: "ubicacion",
      question: "¿Trabajan solamente con personas de La Plata?",
      answer:
        "No. Nacimos en La Plata, pero trabajamos de forma online con personas de cualquier lugar. Podemos conversar y avanzar con tu portfolio a distancia.",
    },
  ],
  finalCta: {
    eyebrow: "EL PRÓXIMO PASO ES TUYO",
    title: "Tu trabajo ya cuenta una historia.\nHagamos que también se vea.",
    description:
      "Contanos sobre tu perfil y vemos qué portfolio tiene más sentido para vos.",
    cta: "Quiero mi portfolio",
    note: "Empecemos con una conversación.",
  },
  contact: {
    whatsapp: "",
    email: "portfolioslaplata@gmail.com",
    instagram: "",
    whatsappMessage:
      "Hola, vengo desde la web de Portfolios La Plata y quería consultar por un portfolio.",
    emailSubject: "Quiero mi portfolio — Portfolios La Plata",
    planMessage: "Me interesa el plan {product}. ¿Podemos conversar?",
    navbarCta: "Hablemos",
  },
  footer: {
    copyright: "Todos los derechos reservados.",
    instagramLabel: "Instagram",
    backToTop: "Volver al inicio",
  },
  seo: {
    title: "Portfolios La Plata — Tu recorrido, en un lugar propio",
    description:
      "Portfolios web profesionales para estudiantes, graduados, freelancers y profesionales. Nacimos en La Plata y trabajamos online con vos, estés donde estés.",
    siteUrl: "",
    locale: "es_AR",
    socialImage: "",
    socialImageAlt: "Portfolios La Plata — Tu recorrido, en un lugar propio",
  },
  analytics: { enabled: false },
};
