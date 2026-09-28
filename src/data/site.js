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
    { label: "Ejemplos", href: "#ejemplos" },
    { label: "Planes", href: "#planes" },
    { label: "Cómo funciona", href: "#proceso" },
    { label: "Preguntas", href: "#preguntas" },
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
    note: "Valores orientativos en pesos argentinos. El alcance y el presupuesto final se acuerdan antes de comenzar.",
    payment: "50% para comenzar y 50% antes de publicar.",
    delivery:
      "Los tiempos dependen del producto y de tener disponible todo el material necesario.",
  },
  products: [
    {
      id: "esencial",
      name: "Esencial",
      enabled: true,
      price: 220000,
      currency: "ARS",
      badge: "",
      tagline: "Todo lo que necesitás para presentarte profesionalmente.",
      description:
        "Quiero una presencia profesional clara, moderna y lista para compartir.",
      features: [
        "Una página con las secciones de tu perfil",
        "Elegís un modelo y lo adaptamos a vos",
        "Formación, experiencia, habilidades y trabajos",
        "Servicios, redes y contacto",
        "Diseño para celular, tablet y computadora",
        "SEO básico y publicación",
        "Una ronda de ajustes",
      ],
      cta: "Consultar por Esencial",
      showcase: {
        layout: "models",
        eyebrow: "UNA PRESENTACIÓN CLARA, A TU MEDIDA",
        headline: "Elegí una base. Nosotros la hacemos tuya.",
        description:
          "Son opciones de diseño del mismo producto: adaptamos el contenido, las imágenes y los colores a tu perfil. El alcance del servicio es el mismo, elijas el modelo que elijas.",
        modelNote: "Distintos estilos. Un mismo producto.",
        demoCta: "Ver portfolio",
      },
      comparison: {
        design: "Modelo a elección + tu identidad",
        content: "Presentación y trabajos",
        responsive: "Incluido",
        cv: "No incluido",
        domain: "No incluido",
        seo: "Básico",
        analytics: "No incluida",
        revisions: "1 ronda",
        special: "No incluido",
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
      tagline: "Más espacio para demostrar lo que sabés hacer.",
      description:
        "Quiero mostrar mi trabajo y recorrido con mayor profundidad.",
      features: [
        "Mayor personalización visual y de estructura",
        "Proyectos desarrollados como casos de trabajo",
        "Logros, testimonios y contenido ampliado",
        "CV descargable",
        "Configuración de tu propio dominio¹",
        "SEO ampliado y medición de visitas",
        "Hasta dos rondas de ajustes",
      ],
      cta: "Consultar por Profesional",
      showcase: {
        layout: "expanded",
        eyebrow: "TU RECORRIDO, CON MÁS PROFUNDIDAD",
        description:
          "Un producto con mayor adaptación visual y de estructura. Desarrollamos tus proyectos como casos de trabajo y les damos contexto a tu experiencia y tus logros.",
        demoCta: "Ver portfolio profesional",
        highlights: [
          "Proyectos como casos de trabajo",
          "CV descargable",
          "SEO optimizado",
          "Medición de visitas",
          "Mayor personalización",
        ],
      },
      comparison: {
        design: "Mayor personalización",
        content: "Proyectos con contexto y logros",
        responsive: "Incluido",
        cv: "Incluido",
        domain: "Configuración incluida¹",
        seo: "Ampliado",
        analytics: "Incluida",
        revisions: "Hasta 2 rondas",
        special: "Según el alcance acordado",
      },
    },
    {
      id: "personalizado",
      name: "Personalizado",
      enabled: true,
      price: null,
      currency: "ARS",
      badge: "",
      tagline: "Una experiencia diseñada desde cero para vos.",
      description: "Necesito una experiencia diseñada alrededor de mi perfil.",
      features: [
        "Diseño desde cero, a medida",
        "Arquitectura según tu contenido",
        "Posibilidad de múltiples páginas",
        "Secciones e interacciones específicas",
        "Funciones acordadas según tu necesidad",
        "Alcance y ajustes definidos en la propuesta",
      ],
      cta: "Contanos tu idea",
      comparison: {
        design: "Diseño desde cero",
        content: "Arquitectura a medida",
        responsive: "Incluido",
        cv: "Según propuesta",
        domain: "Según propuesta¹",
        seo: "Según propuesta",
        analytics: "Según propuesta",
        revisions: "Según propuesta",
        special: "Secciones y páginas a medida",
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
      { key: "design", label: "Diseño e identidad" },
      { key: "content", label: "Tu recorrido y proyectos" },
      { key: "responsive", label: "Adaptado a todos los dispositivos" },
      { key: "cv", label: "CV descargable" },
      { key: "domain", label: "Dominio propio" },
      { key: "seo", label: "Preparación para buscadores" },
      { key: "analytics", label: "Medición de visitas" },
      { key: "revisions", label: "Rondas de ajustes" },
      { key: "special", label: "Necesidades especiales" },
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
        "No. Elegís entre diferentes modelos visuales y adaptamos textos, colores, fotografías y los detalles contemplados en el plan. Los dos modelos actuales pertenecen al mismo producto Esencial.",
    },
    {
      id: "diferencia",
      question: "¿Qué cambia de Esencial a Profesional?",
      answer:
        "Esencial reúne tu información en una página a partir de un modelo. Profesional permite contar tu recorrido con más profundidad: proyectos como casos de trabajo, logros, CV descargable, mayor personalización de estructura y medición de visitas.",
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
