export interface ProjectDetail {
  slug: string;
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics?: string;
  year: string;
  featuredImage?: string;
  client?: string;
  liveUrl?: string;
  // Detail page
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  features: string[];
  testimonial?: { quote: string; name: string; role: string };
  // Theme
  theme: {
    bg: string;
    fg: string;
    accent: string;
    accentLight: string;
    font: string;
    tagBg: string;
    tagText: string;
    heroGradient: string;
  };
  gallery: { label: string; description: string }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "wavepanel",
    id: "01",
    title: "WavePanel",
    category: "SaaS — Escuelas deportivas",
    description:
      "Panel + web pública para que las escuelas de surf, kite y deportes acuáticos vendan sus clases online. 0% comisión, arquitectura modular.",
    tags: ["Next.js", "Node.js", "Stripe", "SaaS", "Reservas", "WhatsApp Business"],
    metrics: "Desde 29€/mes · 0% comisión · 14 días gratis · Activo en 24h",
    year: "2026",
    client: "Producto propio · Felipe Cámara",
    liveUrl: "https://www.wavepanel.app",
    longDescription:
      "WavePanel nació trabajando con Entre Olas Surf. Construí una herramienta a medida para que los clientes de la escuela pudieran reservar y pagar sus clases online. Funcionó tan bien que la saqué como producto: ahora cualquier escuela de surf, kite o actividad acuática puede tener su propio panel + web pública desde 29€/mes.",
    challenge:
      "Las escuelas de deportes acuáticos gestionan el negocio a mano: reservas por WhatsApp, pagos en efectivo, webs genéricas que no convierten. Las soluciones del mercado cobran comisión por reserva, tienen contratos de permanencia y están pensadas para gimnasios o tours genéricos — ninguna entiende la realidad del mar.",
    solution:
      "WavePanel es un panel + web pública en uno. Arquitectura modular: todos los planes incluyen el Core (panel, calendario, reservas, clientes, web pública con subdominio). Encima se añaden módulos — Tienda e-commerce, Surf Camps & Alojamiento, WhatsApp Business — solo si los necesitas. Sin comisiones por reserva, sin permanencia.",
    results: [
      "Producto SaaS completo: panel + web pública con subdominio propio",
      "0% de comisión por reserva — pagos directos al Stripe del cliente",
      "14 días de prueba gratis sin tarjeta",
      "3 planes reales: Basic 29€/mes, Pro 74€/mes, Lifetime 2.900€",
      "Usado en producción por Entre Olas Surf",
      "Activo en menos de 24 horas sin configuración técnica",
    ],
    features: [
      "Core: panel, calendario, reservas, clientes y web pública",
      "Módulo Tienda: productos, stock, carrito, bonos, cupones",
      "Módulo Surf Camps: ediciones, alojamiento, depósitos, check-in",
      "Módulo WhatsApp Business: bot de reservas y confirmaciones",
      "3 pasarelas de pago (Stripe, PayPal, Redsys)",
      "Subdominio propio o dominio custom incluido",
      "Sin comisiones por reserva, sin permanencia",
      "Comunidad privada: los clientes votan el roadmap",
    ],
    theme: {
      bg: "#f5f1e4",
      fg: "#0d2f38",
      accent: "#ffcc00",
      accentLight: "#fff3b3",
      font: "'Manrope', system-ui, sans-serif",
      tagBg: "#fff3b3",
      tagText: "#0d2f38",
      heroGradient:
        "linear-gradient(135deg, #0d2f38 0%, #14424e 50%, #ffcc0015 100%)",
    },
    gallery: [
      {
        label: "Landing",
        description: "Hero con copy directo: «Tu escuela. Digitalizada.»",
      },
      {
        label: "Módulos",
        description: "Reservas, tienda, clases, surf camps — todo nativo",
      },
      {
        label: "Planes",
        description: "Starter, Pro y Pro+. Precios claros, sin sorpresas.",
      },
      {
        label: "Caso real",
        description: "Entre Olas Surf gestiona su escuela entera con WavePanel",
      },
    ],
  },
  {
    slug: "grupo-axial",
    id: "02",
    title: "Grupo Axial",
    category: "Web — Grupo retail",
    description:
      "3 años construyendo la presencia digital del grupo de movilidad más fuerte de Las Palmas: 2 webs en WordPress + gestión de redes y contenido para 4 marcas.",
    tags: [
      "WordPress",
      "Redes sociales",
      "Instagram",
      "Content creation",
      "SEO local",
      "Elementor",
    ],
    metrics: "3 años · 2 webs WordPress · 4 cuentas IG · Contenido",
    year: "2023",
    featuredImage: "/projects/grupo-axial/store.jpg",
    client: "Grupo Axial · Las Palmas de Gran Canaria",
    liveUrl: "https://grupoaxial.es",
    longDescription:
      "Grupo Axial es el ecosistema de movilidad de Las Palmas: Axial Bike, Moto Axial Center, Axial Rent, Talleres Axial y Moto Axial Estadio. Estuve 3 años a cargo de toda la parte digital — construí grupoaxial.es y axialrent.com en WordPress, y gestioné las redes sociales + creación de contenido para 4 de sus marcas. Ya no lo llevo, pero el trabajo sigue vivo.",
    challenge:
      "Un grupo con tiendas físicas reconocidas pero invisible en internet. Webs anticuadas, redes sin coherencia, cada marca hablando un idioma distinto. Había que unificar la voz digital sin perder la identidad de cada departamento — y hacerlo con WordPress, porque el cliente tenía que poder actualizarlo sin depender de mí.",
    solution:
      "Construí la web matriz grupoaxial.es y la de Axial Rent en WordPress + Elementor, con estructura editable por el cliente. En paralelo gestioné durante 3 años las 4 cuentas de Instagram del grupo — Grupo Axial, Moto Axial, Axial Bike y Axial Rent — con calendario editorial unificado, producción propia de fotografía y creación de reels, historias y campañas.",
    results: [
      "2 webs WordPress construidas (grupoaxial.es + axialrent.com)",
      "3 años de gestión sostenida de 4 cuentas de Instagram",
      "Creación de contenido propio: fotografía, reels e historias",
      "Identidad digital unificada bajo «Somos movimiento, somos Axial»",
      "SEO local optimizado para Las Palmas de Gran Canaria",
      "Caso de éxito real: webs editables por el cliente, sin dependencia",
    ],
    features: [
      "Web matriz (grupoaxial.es) sobre WordPress + Elementor",
      "Web de Axial Rent (axialrent.com) con catálogo editable",
      "Calendario editorial unificado para 4 cuentas IG",
      "Sesiones de fotografía en tienda",
      "Reels e historias con voz de marca",
      "Campañas de ofertas y novedades",
      "Gestión de DMs y atención pre-venta",
    ],
    theme: {
      bg: "#f5f2ec",
      fg: "#0a0a0a",
      accent: "#00a651",
      accentLight: "#c8f0d9",
      font: "'Manrope', system-ui, sans-serif",
      tagBg: "#c8f0d9",
      tagText: "#0a0a0a",
      heroGradient:
        "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #00a65125 100%)",
    },
    gallery: [
      {
        label: "Grupo Axial",
        description: "La web matriz del grupo: movimiento, motor, departamentos",
      },
      {
        label: "Departamentos",
        description: "Axial Bike, Moto Axial, Axial Rent, Talleres Axial",
      },
      {
        label: "Redes sociales",
        description: "5 cuentas IG con calendario y producción propia",
      },
      {
        label: "SEO local",
        description: "Captación orgánica en Las Palmas de Gran Canaria",
      },
    ],
  },
  {
    slug: "noa",
    id: "03",
    title: "Noa",
    category: "SaaS — Asistente financiero IA",
    description:
      "El asistente personal con IA para autónomos y PYMEs. Facturas, impuestos, finanzas — todo automatizado.",
    tags: ["Next.js", "Node.js", "IA", "Stripe", "Open Banking"],
    metrics: "Onboarding 3 pasos · IA nativa · Integraciones bancarias",
    year: "2026",
    client: "Producto propio",
    liveUrl: "https://heynoa.es",
    longDescription:
      "Noa reemplaza al gestor, al software de facturación y a la hoja de cálculo — a la vez. Diseñé y construí la plataforma completa: desde la landing hasta el producto, desde el onboarding hasta la pasarela de pagos.",
    challenge:
      "El autónomo español pierde horas cada semana peleándose con facturas, impuestos y conciliaciones. Las herramientas existentes son caras, fragmentadas o anticuadas. Faltaba algo que entendiese su forma de trabajar y hablase su idioma.",
    solution:
      "Construí Noa como un asistente que vive donde ya trabajas: se conecta al banco, al email y al calendario. Preguntas en lenguaje natural — «¿quién me debe dinero?» — y responde. Dashboard, CRM, automatizaciones fiscales y hasta un device físico opcional. Todo de serie.",
    results: [
      "Plataforma completa lanzada: landing, dashboard, onboarding y pagos",
      "Integración bancaria vía Open Banking",
      "IA conversacional nativa para consultas financieras",
      "3 planes activos: Starter, Pro y Device",
      "Arquitectura escalable preparada para equipos",
    ],
    features: [
      "Facturación automática",
      "Impuestos y presentaciones",
      "Conciliación bancaria",
      "CRM integrado",
      "Alertas inteligentes",
      "Noa IA — consultas en lenguaje natural",
      "Dashboard en tiempo real",
      "Device físico (opcional)",
    ],
    theme: {
      bg: "#f8fafc",
      fg: "#0a1628",
      accent: "#00b8a9",
      accentLight: "#d1f1ed",
      font: "'Inter', system-ui, sans-serif",
      tagBg: "#d1f1ed",
      tagText: "#0a1628",
      heroGradient:
        "linear-gradient(135deg, #f8fafc 0%, #d1f1ed 50%, #00b8a922 100%)",
    },
    gallery: [
      {
        label: "Dashboard",
        description:
          "Panel con ingresos, gastos, impuestos y alertas — todo en una pantalla",
      },
      {
        label: "Noa IA",
        description:
          "Preguntas en lenguaje natural, respuestas con datos reales de tu negocio",
      },
      {
        label: "Facturación",
        description:
          "Crea, envía y cobra facturas sin salir del flujo. Conciliación automática.",
      },
      {
        label: "Device",
        description:
          "El hardware opcional que convierte a Noa en algo tangible en tu mesa",
      },
    ],
  },
  {
    slug: "lorena-amadio",
    id: "04",
    title: "Lorena Amadio",
    category: "Web — Psicología",
    description:
      "Web para psicóloga clínica. Confianza, calidez y un sistema de reservas que no intimida.",
    tags: ["Next.js", "SEO", "Reservas", "Responsive"],
    year: "2025",
    client: "Lorena Amadio · Psicóloga",
    liveUrl: "https://psicolorenaamadio.com",
    longDescription:
      "Pedir cita con un psicólogo es uno de los momentos más vulnerables que existen. La web tenía que transmitir calma desde el primer segundo y hacer que reservar fuese tan simple como respirar.",
    challenge:
      "La mayoría de webs de psicología son genéricas, clínicas y frías. Lorena quería algo que reflejase su forma de trabajar — cercana, humana, profunda — sin perder la seriedad que exige la profesión.",
    solution:
      "Diseñé una web con ritmo pausado, paleta cálida y tipografía con alma. Construí un sistema de reservas online que respeta la sensibilidad de quien entra: sin formularios kilométricos, sin ansiedad. Todo optimizado para SEO local.",
    results: [
      "Web completa diseñada y desarrollada a medida",
      "Sistema de reservas online integrado",
      "SEO local para captación orgánica de pacientes",
      "Diseño responsive pensado desde el móvil",
      "Copy honesto que habla a la persona, no al paciente",
    ],
    features: [
      "Reservas online con calendario",
      "Páginas dedicadas por terapia",
      "Blog de divulgación",
      "Formulario de primer contacto",
      "SEO técnico y semántico",
      "Accesibilidad AA",
    ],
    theme: {
      bg: "#f5f1ea",
      fg: "#3d3528",
      accent: "#c97b63",
      accentLight: "#e8d5c4",
      font: "Georgia, 'Times New Roman', serif",
      tagBg: "#e8d5c4",
      tagText: "#3d3528",
      heroGradient:
        "linear-gradient(135deg, #f5f1ea 0%, #e8d5c4 50%, #c97b6322 100%)",
    },
    gallery: [
      {
        label: "Portada",
        description: "Un segundo de calma antes de empezar a leer",
      },
      {
        label: "Terapias",
        description: "Cada proceso explicado sin jerga clínica",
      },
      {
        label: "Reservas",
        description: "Pedir cita en tres clics, sin formularios kilométricos",
      },
      {
        label: "Sobre Lorena",
        description: "Una psicóloga, no una marca",
      },
    ],
  },
  {
    slug: "entre-olas-surf",
    id: "05",
    title: "Entre Olas Surf",
    category: "Web — Escuela de Surf",
    description:
      "Web para escuela de surf en Cádiz. Reservas, surf camps y tienda — el océano en la pantalla.",
    tags: ["Next.js", "Stripe", "Reservas", "E-commerce", "SEO"],
    year: "2025",
    featuredImage: "/projects/entre-olas-surf/aerial-house.jpg",
    client: "Entre Olas Surf · Cádiz",
    liveUrl: "https://entreolasurf.com",
    longDescription:
      "Entre Olas es una escuela de surf en Playa de Roche que respira Cádiz por los cuatro costados. Construí una web que huele a salitre: reservas rápidas, surf camps, tienda y la sensación clara de que ahí se aprende surf con gente que sabe lo que hace.",
    challenge:
      "Había escuela, había olas, había reputación — pero no había web que convirtiese. Los turistas extranjeros se quedaban en Instagram y no reservaban. Había que cerrar ese hueco.",
    solution:
      "Diseñé y desarrollé la web completa: reservas con disponibilidad en tiempo real, gestión de surf camps con villa y comidas, tienda online de merchandising, integración con WhatsApp y una estética que captura la energía de Playa de Roche.",
    results: [
      "Reservas online con disponibilidad en tiempo real",
      "Gestión integrada de surf camps y alojamiento",
      "Tienda online con merchandising de marca",
      "SEO orientado a turismo activo en Cádiz",
      "Integración con WhatsApp para consultas rápidas",
    ],
    features: [
      "Reservas de clases (grupo y privadas)",
      "Paquetes de surf camp con villa",
      "E-commerce de merchandising",
      "Galería de testimonios reales",
      "Integración con Instagram y TikTok",
      "Multilenguaje (ES / EN)",
    ],
    theme: {
      bg: "#fef9ed",
      fg: "#0a2540",
      accent: "#ffb627",
      accentLight: "#ffe8a3",
      font: "'Inter', system-ui, sans-serif",
      tagBg: "#ffe8a3",
      tagText: "#0a2540",
      heroGradient:
        "linear-gradient(135deg, #fef9ed 0%, #ffe8a3 50%, #ffb62722 100%)",
    },
    gallery: [
      {
        label: "Reservas",
        description:
          "Elige fecha, nivel y tipo de clase — disponibilidad en vivo",
      },
      {
        label: "Surf Camps",
        description: "Villa, desayuno, clases y yoga — todo en un paquete",
      },
      {
        label: "Tienda",
        description: "Merchandising de marca con checkout Stripe",
      },
      {
        label: "Comunidad",
        description: "Testimonios, Instagram y el feed de Playa de Roche",
      },
    ],
  },
  {
    slug: "samba-trips",
    id: "06",
    title: "Samba Trips",
    category: "Web — Viajes en grupo",
    description:
      "Web de viajes en grupo a destinos exóticos. Reservas, testimonios y una estética que transmite aventura.",
    tags: ["Next.js", "Stripe", "Reservas", "CMS", "SEO"],
    year: "2025",
    featuredImage: "/projects/samba-trips/hero-video-poster.jpg",
    client: "Oli Czudny · @oli_czudny",
    liveUrl: "https://sambatrips.com",
    longDescription:
      "Samba Trips organiza viajes en grupo a sitios donde la gente vuelve con amigos para toda la vida. La web tenía que vender eso — no destinos, sino historias por vivir.",
    challenge:
      "El mercado de viajes en grupo está lleno de webs frías, formularios kilométricos y fotos de stock. Samba necesitaba algo que sintiera como una conversación con un amigo que ya estuvo allí.",
    solution:
      "Construí la web completa con catálogo de trips dinámico, reservas con pasarela Stripe, testimonios reales, integración con Instagram y un ritmo visual que se mueve entre la calma y el caos bien llevado.",
    results: [
      "Web completa con 7+ destinos gestionables vía CMS",
      "Reservas con señal y pago final integrados",
      "Integración con Instagram para prueba social en vivo",
      "FAQ completo: visados, cancelaciones, qué incluye",
      "SEO internacional (ES / EN)",
    ],
    features: [
      "Catálogo de trips con fechas y precios",
      "Reservas online con pasarela Stripe",
      "Fichas de destino con fotos y detalles",
      "Testimonios dinámicos",
      "Formulario de lead qualifying",
      "Feed de Instagram embebido",
    ],
    theme: {
      bg: "#fff8f0",
      fg: "#1a1e3a",
      accent: "#ff6b35",
      accentLight: "#ffd4b8",
      font: "'Inter', system-ui, sans-serif",
      tagBg: "#ffd4b8",
      tagText: "#1a1e3a",
      heroGradient:
        "linear-gradient(135deg, #fff8f0 0%, #ffd4b8 50%, #ff6b3522 100%)",
    },
    gallery: [
      {
        label: "Catálogo",
        description: "Siargao, Lombok, Conil, Tamraght, Maldivas, Zanzíbar…",
      },
      {
        label: "Ficha de viaje",
        description: "Cada trip contado como si te lo recomendase un amigo",
      },
      {
        label: "Reserva",
        description: "Señal, pago final y gestión sin fricción",
      },
      {
        label: "Comunidad",
        description: "Testimonios de gente que volvió con amigos nuevos",
      },
    ],
  },
  {
    slug: "alma-de-nomada",
    id: "07",
    title: "Alma de Nómada",
    category: "Web — Travel Coaching",
    description:
      "Web para asesoría de viaje y vida en el extranjero. Destinos, relocalización y un tono que invita a moverse.",
    tags: ["Next.js", "SEO", "Lead gen", "CMS"],
    year: "2025",
    featuredImage: "/projects/alma-de-nomada/hero-photo.jpg",
    client: "Ainhoa García · @ainhhgarcia",
    liveUrl: "https://almadenomada.com",
    longDescription:
      "Alma de Nómada no vende viajes — vende permiso para cambiar de vida. Una web para Ainhoa García, coach que ayuda a mudarse al otro lado del mundo sin perder la cabeza en el intento.",
    challenge:
      "Las webs de travel coaching se parecen todas: fotos de stock, frases motivacionales vacías y cero claridad sobre qué pagas exactamente. Alma de Nómada necesitaba diferenciarse con contenido real y un proceso transparente.",
    solution:
      "Diseñé y desarrollé la web completa con páginas dedicadas por destino, proceso de consultoría claro en tres pasos, integración con partners de seguros y conectividad, y una captación de leads por email que funciona sin ser agresiva.",
    results: [
      "Web completa con 10+ destinos gestionables",
      "Proceso de consultoría explicado sin humo",
      "Captación de leads vía email optimizada",
      "Integración con 4 partners de seguros y conectividad",
      "SEO orientado a relocalización internacional",
    ],
    features: [
      "Grid de destinos con fichas individuales",
      "Página dedicada a Australia (mudanza)",
      "Proceso de 3 pasos claro y sin humo",
      "Newsletter y captación por email",
      "Comparativa de partners",
      "Formulario de contacto cualificado",
    ],
    theme: {
      bg: "#fdf7ef",
      fg: "#2d4a3e",
      accent: "#d97757",
      accentLight: "#f5dcc9",
      font: "Georgia, 'Times New Roman', serif",
      tagBg: "#f5dcc9",
      tagText: "#2d4a3e",
      heroGradient:
        "linear-gradient(135deg, #fdf7ef 0%, #f5dcc9 50%, #d9775722 100%)",
    },
    gallery: [
      {
        label: "Destinos",
        description:
          "Tailandia, Sri Lanka, Japón, Australia, Maldivas, Indonesia…",
      },
      {
        label: "Australia",
        description: "Página dedicada para mudarse: visados, ciudades, logística",
      },
      {
        label: "Proceso",
        description: "Tres pasos: destino, admin y mindset. Sin humo.",
      },
      {
        label: "Contacto",
        description: "Formulario honesto — dime qué necesitas y te respondo",
      },
    ],
  },
  {
    slug: "la-inquieta",
    id: "08",
    title: "La Inquieta",
    category: "Web — Caseta de Feria",
    description:
      "Landing informativa para La Inquieta · Caseta Nº154 de la Feria de Jerez 2026. Transporte, bebidas, itinerario y reservas por WhatsApp.",
    tags: ["HTML", "CSS", "JavaScript", "SVG", "Landing"],
    year: "2026",
    featuredImage: "/projects/la-inquieta/cartel.png",
    client: "La Inquieta · Caseta Nº154 · Feria de Jerez",
    liveUrl: "https://felipecbbb.github.io/la-inquieta/",
    longDescription:
      "Un site vertical que respira feria: arco mozárabe, patrón andalusí de fondo, cartel heredado del original y tipografía editorial. Cuatro bloques — hero, transporte, bebidas e itinerario — pensados para que quien entra sepa en un scroll dónde coger el autobús, cuánto cuesta la pulsera y qué DJ pincha cada noche. Reservas por WhatsApp con un solo toque, desde cualquier punto de la página.",
    challenge:
      "La Inquieta llevaba años vendiéndose solo con carteles impresos y stories. El problema: la información estaba dispersa, los precios de los autobuses cambiaban por trayecto y nadie tenía claro dónde se cogía cada bus. Hacía falta una web simple, muy visual, que resolviera dudas sin perder la estética del cartel.",
    solution:
      "Landing de una página con el cartel SVG original como hero, puntos de salida geolocalizados, tabla de precios completa (ida / vuelta / ida-y-vuelta × con copa / sin copa), pack de bebidas con pulsera destacada (descuento de 1€ por copa) y timeline de los 8 días de feria en formato tarjeta postal. Widget flotante de WhatsApp que abre chat directo con Javi (autobuses) o con el grupo (mesas y pulseras).",
    results: [
      "Landing 100% responsive con cartel SVG original del cliente",
      "WhatsApp integrado con mensajes prellenados según contexto",
      "Tabla de precios completa con 6 combinaciones de trayecto",
      "Timeline de 8 días con slots de programación DJ + animador",
      "Widget flotante de reserva siempre accesible",
      "Desplegada en GitHub Pages · sin servidor, sin coste",
    ],
    features: [
      "Hero con patrón mozárabe y arco SVG del cartel oficial",
      "Strips laterales fijos con background-attachment para continuidad",
      "Puntos de salida con pin dorado por ciudad",
      "Autobús de calidad en SVG con animación roll-in",
      "Pulsera de caseta destacada (3 beneficios: descuento, acceso prioritario, reservados)",
      "Itinerario como tarjetas postales cream sobre fondo teal",
      "FAB flotante con menú expandible y pulso animado",
      "Tipografía Fontuna + Yanone Kaffeesatz",
    ],
    theme: {
      bg: "#f3e7cf",
      fg: "#0d4a42",
      accent: "#c65248",
      accentLight: "#ead5b0",
      font: "'Playfair Display', Georgia, serif",
      tagBg: "#ead5b0",
      tagText: "#0d4a42",
      heroGradient:
        "linear-gradient(135deg, #0d4a42 0%, #13625a 50%, #c6524830 100%)",
    },
    gallery: [
      {
        label: "Hero",
        description: "Cartel SVG original dentro de arco mozárabe con patrón andalusí de fondo",
      },
      {
        label: "Transporte",
        description: "Puntos de salida, autobús ilustrado y tabla completa de precios",
      },
      {
        label: "Bebidas",
        description: "Packs de rebujito y copas + pulsera de caseta con 3 beneficios",
      },
      {
        label: "Itinerario",
        description: "8 días como tarjetas postales cream con slots de programación",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
