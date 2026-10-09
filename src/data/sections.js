// Detailed catalog. Type names, descriptions and prices live in site.pricingModel.
export const sectionsPage = {
  "eyebrow": "UN PORTFOLIO, MUCHAS FORMAS DE CONTARTE",
  "title": "Elegí qué querés mostrar.",
  "description": "Cada perfil tiene algo distinto para contar. Estas son algunas de las secciones que podemos combinar para construir tu portfolio.",
  "definition": "Una sección es un bloque de contenido con un propósito: presentarte, mostrar tus proyectos o contar tu recorrido.",
  "previewNote": "Ejemplos ilustrativos. Adaptamos el diseño y el contenido a tu perfil.",
  "exploreLabel": "Ver detalle",
  "complementsNote": "También podés sumar complementos opcionales, como un CV descargable. Son pequeños extras que no ocupan una sección. Si necesitás algo fuera del catálogo, lo evaluamos a medida.",
  "modal": {
    "closeLabel": "Cerrar",
    "contentLabel": "Detalle y vista ilustrativa",
    "includesLabel": "Puede incluir",
    "idealLabel": "Ideal para",
    "priceLabel": "Precio orientativo"
  },
  "anatomy": {
    "title": "Así toma forma tu portfolio",
    "intro": "Presentación / Hero",
    "content": [
      "Sobre mí",
      "Proyectos",
      "Experiencia"
    ],
    "outro": "Contacto / Footer básico",
    "included": "En la base",
    "note": "Cada bloque cuenta una parte de tu historia."
  }
};

export const sectionCategories = [
  {
    "id": "standard",
    "items": [
      {
        "id": "about",
        "name": "Sobre mí",
        "description": "Tu presentación personal, una fotografía y lo que te distingue como profesional.",
        "idealFor": "Tu perfil y tu forma de trabajar",
        "details": {
          "description": "Un espacio para presentarte más allá de un cargo o un título. Combinamos tu historia y tu mirada para que quienes te visiten puedan conocerte antes de escribirte.",
          "includes": ["Fotografía personal", "Presentación profesional", "Profesión y especialización", "Ubicación y datos destacados"]
        },
        "preview": {
          "type": "about",
          "title": "Hola, soy Alex.",
          "labels": [
            "Diseño y comunicación",
            "Ideas que conectan."
          ]
        }
      },
      {
        "id": "experience",
        "name": "Experiencia",
        "description": "Puestos, instituciones y períodos, con una descripción breve de tu aporte en cada etapa.",
        "idealFor": "Tu recorrido laboral",
        "details": {
          "description": "Dale contexto a tu recorrido. Organizamos las etapas de tu experiencia para que se entienda dónde trabajaste, qué rol ocupaste y cuál fue tu aporte.",
          "includes": ["Puestos y roles", "Empresas o instituciones", "Períodos de trabajo", "Responsabilidades y aportes breves"]
        },
        "preview": {
          "type": "list",
          "title": "Mi experiencia",
          "labels": [
            "Estudio Norte · Actualidad",
            "Equipo creativo · 2023–2025"
          ]
        }
      },
      {
        "id": "education",
        "name": "Formación",
        "description": "Carreras, cursos y estudios que construyen la base de lo que sabés hacer.",
        "idealFor": "Tu recorrido académico",
        "details": {
          "description": "Mostrá cómo se fue construyendo tu conocimiento. Seleccionamos y ordenamos los estudios que mejor acompañan el perfil que querés presentar hoy.",
          "includes": ["Carreras y títulos", "Instituciones educativas", "Cursos relevantes", "Fechas y estado de los estudios"]
        },
        "preview": {
          "type": "list",
          "title": "Siempre aprendiendo",
          "labels": [
            "Licenciatura en Diseño",
            "Especialización en comunicación"
          ]
        }
      },
      {
        "id": "projects",
        "name": "Proyectos",
        "description": "Tarjetas con imagen, nombre, descripción y un link opcional para conocer cada trabajo.",
        "idealFor": "Una selección de tus trabajos",
        "details": {
          "description": "Una primera mirada a lo que hacés. Reunimos tus trabajos en una selección fácil de recorrer, con la información justa para despertar interés y seguir explorando.",
          "includes": ["Imagen de cada proyecto", "Nombre y descripción breve", "Tu rol o área de trabajo", "Enlace opcional al proyecto"]
        },
        "preview": {
          "type": "cards",
          "title": "Proyectos seleccionados",
          "labels": [
            "Identidad",
            "Editorial",
            "Digital"
          ]
        }
      },
      {
        "id": "services",
        "name": "Servicios",
        "description": "Una presentación sencilla de lo que ofrecés, organizada en tarjetas o bloques.",
        "idealFor": "Tus servicios y especialidades",
        "details": {
          "description": "Ayudá a que una posible consulta empiece con claridad. Presentamos lo que ofrecés y qué necesidad resuelve cada servicio, con palabras que tus clientes puedan reconocer.",
          "includes": ["Nombre de cada servicio", "Descripción de la propuesta", "Especialidades", "Íconos o pequeños apoyos visuales"]
        },
        "preview": {
          "type": "services",
          "title": "En qué puedo ayudarte",
          "labels": [
            "Estrategia",
            "Diseño",
            "Asesoría"
          ]
        }
      },
      {
        "id": "skills",
        "name": "Habilidades",
        "description": "Herramientas, conocimientos, especialidades e idiomas que forman parte de tu perfil.",
        "idealFor": "Lo que sabés hacer",
        "details": {
          "description": "Un resumen claro de tus capacidades. Agrupamos herramientas, conocimientos e idiomas para que sea fácil identificar cómo podés aportar a un proyecto o equipo.",
          "includes": ["Herramientas de trabajo", "Conocimientos y especialidades", "Idiomas", "Agrupación por áreas"]
        },
        "preview": {
          "type": "tags",
          "title": "Mis herramientas",
          "labels": [
            "Diseño",
            "Figma",
            "Fotografía",
            "Inglés",
            "Estrategia"
          ]
        }
      },
      {
        "id": "certifications",
        "name": "Certificaciones",
        "description": "Cursos y acreditaciones relevantes, con la institución que los respalda.",
        "idealFor": "Tu aprendizaje y acreditaciones",
        "details": {
          "description": "Respaldá tus conocimientos con formación reconocible. Damos lugar a las acreditaciones más relevantes, junto con la información necesaria para entender su valor.",
          "includes": ["Nombre de la certificación", "Institución que la otorga", "Fecha de obtención", "Enlace a la credencial, si está disponible"]
        },
        "preview": {
          "type": "certificates",
          "title": "Aprendizaje continuo",
          "labels": [
            "Diseño de experiencias",
            "Comunicación visual"
          ]
        }
      },
      {
        "id": "gallery",
        "name": "Galería simple",
        "description": "Una selección de imágenes para que tu trabajo hable por sí mismo.",
        "idealFor": "Fotografía, arquitectura, arte, gastronomía o diseño",
        "details": {
          "description": "Cuando las imágenes cuentan gran parte de tu historia, una selección cuidada alcanza para empezar. Armamos una composición que invite a recorrer tu trabajo de un vistazo.",
          "includes": ["Selección de imágenes", "Orden visual de la serie", "Epígrafes breves opcionales", "Composición adaptada a tus fotografías"]
        },
        "preview": {
          "type": "gallery",
          "title": "Una mirada a mi trabajo",
          "labels": []
        }
      },
      {
        "id": "clients",
        "name": "Clientes / colaboraciones",
        "description": "Nombres o logos de las marcas, instituciones y equipos con los que trabajaste.",
        "idealFor": "Tus vínculos profesionales",
        "details": {
          "description": "Mostrá con quiénes compartiste proyectos. Una selección de marcas, equipos e instituciones ayuda a dar contexto a tu experiencia y a construir confianza.",
          "includes": ["Nombres o logos", "Instituciones y equipos", "Breve referencia a la colaboración", "Enlaces opcionales"]
        },
        "preview": {
          "type": "logos",
          "title": "Proyectos compartidos",
          "labels": [
            "norte®",
            "ESTUDIO",
            "forma.",
            "TRAMA"
          ]
        }
      },
      {
        "id": "achievements",
        "name": "Logros",
        "description": "Datos destacados para resumir tu experiencia y tus principales hitos.",
        "idealFor": "Un vistazo a tu recorrido",
        "details": {
          "description": "Destacá los hitos que mejor resumen tu camino. Elegimos unos pocos datos relevantes y los presentamos con claridad para que se recuerden al recorrer tu portfolio.",
          "includes": ["Cifras destacadas", "Años de experiencia", "Proyectos o colaboraciones", "Breves etiquetas de contexto"]
        },
        "preview": {
          "type": "metrics",
          "title": "Mi recorrido, en números",
          "labels": [
            "12|proyectos",
            "4|años creando",
            "6|colaboraciones"
          ]
        }
      }
    ]
  },
  {
    "id": "advanced",
    "items": [
      {
        "id": "slider",
        "name": "Proyecto con slider",
        "description": "Varias imágenes de un mismo proyecto en un carrusel, para mostrar cada detalle sin perder el hilo.",
        "idealFor": "Distintas vistas de un mismo trabajo",
        "details": {
          "description": "Desarrollá un trabajo mediante varias imágenes sin perder el contexto del proyecto. Quien lo visita puede recorrer distintos momentos, vistas o detalles a su propio ritmo.",
          "includes": ["Serie de imágenes del proyecto", "Controles para recorrerlas", "Nombre y contexto del trabajo", "Epígrafes o detalles de cada imagen"]
        },
        "preview": {
          "type": "slider",
          "title": "Casa Patio · Proyecto",
          "labels": [
            "02 / 05"
          ]
        }
      },
      {
        "id": "case-study",
        "name": "Mini case study",
        "description": "El contexto, el desafío, el proceso, la solución y el resultado: la historia detrás de tu trabajo.",
        "idealFor": "Tus decisiones y el valor de tu aporte",
        "details": {
          "description": "Contá qué hiciste, qué problema encontraste y por qué tomaste ciertas decisiones. Construimos un relato breve que conecte el desafío inicial con el resultado de tu trabajo.",
          "includes": ["Contexto y desafío", "Tu rol en el proyecto", "Proceso y decisiones", "Imágenes de apoyo", "Solución y resultado"]
        },
        "preview": {
          "type": "case",
          "title": "Una idea, de principio a fin",
          "labels": [
            "Contexto",
            "Desafío",
            "Proceso",
            "Solución",
            "Resultado"
          ]
        }
      },
      {
        "id": "catalog",
        "name": "Catálogo visual",
        "description": "Servicios, productos o trabajos con más imágenes e información. Una vidriera de lo que hacés; no incluye ecommerce.",
        "idealFor": "Colecciones y propuestas en detalle",
        "details": {
          "description": "Dale a tu colección el espacio que necesita. Combinamos imágenes e información para que cada propuesta pueda conocerse con más profundidad y generar una consulta.",
          "includes": ["Fichas de trabajos o productos", "Varias imágenes", "Descripciones y características", "Organización visual de la colección"]
        },
        "preview": {
          "type": "catalog",
          "title": "Colección Objeto",
          "labels": [
            "Línea Uno",
            "Línea Dos",
            "Línea Tres"
          ]
        }
      },
      {
        "id": "expanded-gallery",
        "name": "Galería avanzada",
        "description": "Más fotografías y una presentación expandida, con slider o lightbox para verlas en detalle.",
        "idealFor": "Series fotográficas y proyectos visuales",
        "details": {
          "description": "Invitá a mirar más de cerca. Pensamos un recorrido para series de imágenes que necesitan más espacio, con una vista ampliada que permita apreciar cada detalle.",
          "includes": ["Selección y orden de la serie", "Imágenes ampliadas", "Recorrido con slider o lightbox", "Epígrafes y contexto visual"]
        },
        "preview": {
          "type": "expanded",
          "title": "Espacios para habitar",
          "labels": [
            "Vista ampliada · 03 / 08"
          ]
        }
      },
      {
        "id": "timeline",
        "name": "Timeline avanzada",
        "description": "Experiencias e hitos conectados en una línea de tiempo, con espacio para desarrollar cada etapa.",
        "idealFor": "La evolución de tu trayectoria",
        "details": {
          "description": "Conectá las etapas de tu historia para mostrar cómo llegaste hasta acá. Cada hito puede tener su propio desarrollo, manteniendo un recorrido visual fácil de seguir.",
          "includes": ["Hitos y fechas", "Desarrollo de cada etapa", "Imágenes de apoyo", "Conexiones entre experiencias"]
        },
        "preview": {
          "type": "timeline",
          "title": "Un recorrido en movimiento",
          "labels": [
            "2022|El primer proyecto",
            "2024|Nuevos desafíos",
            "Hoy|Un estudio propio"
          ]
        }
      },
      {
        "id": "results",
        "name": "Métricas / resultados",
        "description": "Resultados concretos con contexto: mejoras, alcance o impacto medible de un proyecto.",
        "idealFor": "El impacto de tu trabajo",
        "details": {
          "description": "Poné los números en contexto. Mostramos qué mejoró, durante qué período y cuál fue tu aporte, para que el impacto de un proyecto sea fácil de comprender.",
          "includes": ["Indicadores relevantes", "Resultados y período de referencia", "Contexto del proyecto", "Comparaciones o gráficos sencillos"]
        },
        "preview": {
          "type": "results",
          "title": "Un cambio que se puede medir",
          "labels": [
            "−32%|tiempo de gestión",
            "+48%|consultas recibidas"
          ]
        }
      },
      {
        "id": "testimonials",
        "name": "Testimonios",
        "description": "Recomendaciones profesionales o comentarios de clientes que cuentan cómo fue trabajar con vos.",
        "idealFor": "La experiencia de quienes te eligen",
        "details": {
          "description": "Sumá la mirada de quienes trabajaron con vos. Presentamos recomendaciones con su contexto para que otras personas puedan imaginar cómo sería compartir un proyecto.",
          "includes": ["Citas de clientes o colegas", "Nombre y rol de quien recomienda", "Proyecto o vínculo profesional", "Fotografía opcional con autorización"]
        },
        "preview": {
          "type": "quote",
          "title": "Lo que dicen del trabajo",
          "labels": [
            "“Entendió la idea y la llevó mucho más lejos.”",
            "Cliente de ejemplo · Proyecto de identidad"
          ]
        }
      },
      {
        "id": "before-after",
        "name": "Comparativa / Before & After",
        "description": "Dos momentos de un mismo trabajo para mostrar con claridad qué cambió y cuál fue tu aporte.",
        "idealFor": "Arquitectura, diseño, fotografía, marketing, entrenamiento o reformas",
        "details": {
          "description": "Hacé visible una transformación. Ponemos en relación el punto de partida y el resultado, con el contexto necesario para entender qué cambió gracias a tu trabajo.",
          "includes": ["Imágenes del antes y el después", "Presentación comparativa", "Descripción de la intervención", "Resultados o cambios destacados"]
        },
        "preview": {
          "type": "comparison",
          "title": "Una nueva perspectiva",
          "labels": [
            "Antes",
            "Después"
          ]
        }
      }
    ]
  }
];

// Complements are independent extras, never counted as portfolio sections.
// Prices are resolved from site.pricingModel.complements by getComplements().
export const complementsCategory = {
  id: "complements",
  label: "Complementos",
  itemLabel: "Complemento",
  headline: "Pequeños extras que suman.",
  description: "Funciones y elementos opcionales que se integran al diseño de tu portfolio, sin ocupar una sección completa.",
  detailNote: "Es un complemento: se integra a un espacio del portfolio y no cuenta como una sección adicional.",
  items: [{
    id: "download-cv",
    name: "CV descargable",
    description: "Sumamos un acceso para que quienes visiten tu portfolio puedan descargar directamente tu CV.",
    idealFor: "Facilitar postulaciones y compartir tu información profesional completa en LinkedIn, networking o búsquedas laborales",
    details: {
      description: "Tu recorrido, también a mano para después. Integramos un acceso a tu CV para que una persona interesada pueda llevarse tu información y volver a consultarla cuando lo necesite.",
      includes: ["Botón integrado al diseño del portfolio", "Archivo PDF provisto por vos", "Ubicación en Hero, navegación o contacto según el diseño", "Apertura o descarga del archivo según la implementación"]
    },
    preview: {
      type: "download",
      title: "Sigamos en contacto",
      labels: ["Alex · Curriculum vitae", "Experiencia, formación y más", "Descargar CV"]
    }
  }]
};
