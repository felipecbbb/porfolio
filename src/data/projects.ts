import type { Lang } from "@/lib/i18n";

export type LStr = { es: string; en: string; de: string };
export type LArr = { es: string[]; en: string[]; de: string[] };

export function L<T extends string | string[]>(
  field: { es: T; en: T; de: T },
  lang: Lang
): T {
  return field[lang] ?? field.es;
}

export interface ProjectDetail {
  slug: string;
  id: string;
  title: string;
  category: LStr;
  description: LStr;
  tags: string[];
  metrics?: LStr;
  year: string;
  featuredImage?: string;
  client?: string;
  liveUrl?: string;
  longDescription: LStr;
  challenge: LStr;
  solution: LStr;
  results: LArr;
  features: LArr;
  testimonial?: { quote: LStr; name: string; role: LStr };
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
  gallery: { label: LStr; description: LStr }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "la-inquieta",
    id: "01",
    title: "La Inquieta",
    category: {
      es: "Web — Caseta de Feria",
      en: "Web — Festival Pavilion",
      de: "Web — Festzelt",
    },
    description: {
      es: "Landing informativa para La Inquieta · Caseta Nº154 de la Feria de Jerez 2026. Transporte, bebidas, itinerario y reservas por WhatsApp.",
      en: "Info landing for La Inquieta · Pavilion #154 at Jerez Fair 2026. Transport, drinks, schedule and WhatsApp bookings.",
      de: "Info-Landing für La Inquieta · Festzelt Nr. 154 der Feria de Jerez 2026. Transport, Getränke, Programm und Buchungen via WhatsApp.",
    },
    tags: ["HTML", "CSS", "JavaScript", "SVG", "Landing"],
    year: "2026",
    featuredImage: "/projects/la-inquieta/cartel.png",
    client: "La Inquieta · Caseta Nº154 · Feria de Jerez",
    liveUrl: "https://felipecbbb.github.io/la-inquieta/",
    longDescription: {
      es: "Un site vertical que respira feria: arco mozárabe, patrón andalusí de fondo, cartel heredado del original y tipografía editorial. Cuatro bloques — hero, transporte, bebidas e itinerario — pensados para que quien entra sepa en un scroll dónde coger el autobús, cuánto cuesta la pulsera y qué DJ pincha cada noche. Reservas por WhatsApp con un solo toque, desde cualquier punto de la página.",
      en: "A vertical site that breathes feria: Mozarabic arch, Andalusian background pattern, the original poster and editorial type. Four blocks — hero, transport, drinks and schedule — so anyone landing knows in one scroll where to catch the bus, how much the wristband costs and which DJ plays each night. WhatsApp bookings in one tap from anywhere on the page.",
      de: "Eine vertikale Site, die nach Feria atmet: maurischer Bogen, andalusisches Muster, das Originalplakat und redaktionelle Typografie. Vier Blöcke — Hero, Transport, Getränke und Programm — damit jeder Besucher in einem Scroll weiß, wo der Bus abfährt, wie viel das Armband kostet und welcher DJ heute Nacht auflegt. WhatsApp-Buchungen mit einem Klick von jeder Stelle der Seite.",
    },
    challenge: {
      es: "La Inquieta llevaba años vendiéndose solo con carteles impresos y stories. El problema: la información estaba dispersa, los precios de los autobuses cambiaban por trayecto y nadie tenía claro dónde se cogía cada bus. Hacía falta una web simple, muy visual, que resolviera dudas sin perder la estética del cartel.",
      en: "La Inquieta had been selling itself for years with printed posters and Instagram stories. The problem: info scattered, bus prices changing per route, nobody knew where to catch each bus. They needed a simple, visual website that answered questions without losing the poster aesthetic.",
      de: "La Inquieta verkaufte sich jahrelang nur über Plakate und Stories. Das Problem: verstreute Infos, Buspreise pro Strecke unterschiedlich, niemand wusste, wo welcher Bus abfährt. Es brauchte eine einfache, visuelle Website, die Fragen beantwortet, ohne die Plakat-Ästhetik zu verlieren.",
    },
    solution: {
      es: "Landing de una página con el cartel SVG original como hero, puntos de salida geolocalizados, tabla de precios completa (ida / vuelta / ida-y-vuelta × con copa / sin copa), pack de bebidas con pulsera destacada (descuento de 1€ por copa) y timeline de los 8 días de feria en formato tarjeta postal. Widget flotante de WhatsApp que abre chat directo con Javi (autobuses) o con el grupo (mesas y pulseras).",
      en: "Single-page landing with the original poster as SVG hero, geolocated pickup points, full pricing table (one-way / return / round-trip × with drink / without), drinks pack with featured wristband (€1 off per drink) and a postcard-style timeline of the 8 feria days. Floating WhatsApp widget opens chat with Javi (buses) or the group (tables and wristbands).",
      de: "Single-Page-Landing mit dem Original-Plakat als SVG-Hero, geolokalisierten Abfahrtspunkten, vollständiger Preistabelle (Hin / Rück / Hin-und-zurück × mit/ohne Getränk), Getränke-Paket mit hervorgehobenem Armband (1€ Rabatt pro Getränk) und Postkarten-Timeline der 8 Feria-Tage. Schwebendes WhatsApp-Widget öffnet Chat mit Javi (Busse) oder der Gruppe (Tische und Armbänder).",
    },
    results: {
      es: [
        "Landing 100% responsive con cartel SVG original del cliente",
        "WhatsApp integrado con mensajes prellenados según contexto",
        "Tabla de precios completa con 6 combinaciones de trayecto",
        "Timeline de 8 días con slots de programación DJ + animador",
        "Widget flotante de reserva siempre accesible",
        "Desplegada en GitHub Pages · sin servidor, sin coste",
      ],
      en: [
        "100% responsive landing with the client's original SVG poster",
        "WhatsApp with context-aware pre-filled messages",
        "Full pricing table with 6 route combinations",
        "8-day timeline with DJ + host slots",
        "Always-on floating booking widget",
        "Deployed on GitHub Pages · no server, no cost",
      ],
      de: [
        "100% responsive Landing mit dem Original-SVG-Plakat des Kunden",
        "WhatsApp mit kontextabhängigen, vorausgefüllten Nachrichten",
        "Vollständige Preistabelle mit 6 Streckenkombinationen",
        "8-Tage-Timeline mit DJ- und Moderatoren-Slots",
        "Immer sichtbares schwebendes Buchungs-Widget",
        "Deployt auf GitHub Pages · kein Server, kein Kosten",
      ],
    },
    features: {
      es: [
        "Hero con patrón mozárabe y arco SVG del cartel oficial",
        "Strips laterales fijos con background-attachment para continuidad",
        "Puntos de salida con pin dorado por ciudad",
        "Autobús de calidad en SVG con animación roll-in",
        "Pulsera de caseta destacada (3 beneficios: descuento, acceso prioritario, reservados)",
        "Itinerario como tarjetas postales cream sobre fondo teal",
        "FAB flotante con menú expandible y pulso animado",
        "Tipografía Fontuna + Yanone Kaffeesatz",
      ],
      en: [
        "Hero with Mozarabic pattern and SVG arch from the official poster",
        "Fixed side strips with background-attachment for continuity",
        "Pickup points with golden pin per city",
        "High-quality SVG bus with roll-in animation",
        "Featured pavilion wristband (3 perks: discount, priority access, reserved tables)",
        "Schedule as cream postcards on teal background",
        "Floating FAB with expandable menu and animated pulse",
        "Fontuna + Yanone Kaffeesatz typography",
      ],
      de: [
        "Hero mit maurischem Muster und SVG-Bogen aus dem offiziellen Plakat",
        "Feste seitliche Streifen mit background-attachment für Kontinuität",
        "Abfahrtspunkte mit goldenem Pin pro Stadt",
        "Hochwertiger SVG-Bus mit Roll-In-Animation",
        "Hervorgehobenes Festzelt-Armband (3 Vorteile: Rabatt, priorisierter Zugang, reservierte Tische)",
        "Programm als cremefarbene Postkarten auf Teal-Hintergrund",
        "Schwebender FAB mit ausklappbarem Menü und animiertem Puls",
        "Typografie Fontuna + Yanone Kaffeesatz",
      ],
    },
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
        label: { es: "Hero", en: "Hero", de: "Hero" },
        description: {
          es: "Cartel SVG original dentro de arco mozárabe con patrón andalusí de fondo",
          en: "Original SVG poster inside a Mozarabic arch with Andalusian background pattern",
          de: "Original-SVG-Plakat in maurischem Bogen mit andalusischem Hintergrundmuster",
        },
      },
      {
        label: { es: "Transporte", en: "Transport", de: "Transport" },
        description: {
          es: "Puntos de salida, autobús ilustrado y tabla completa de precios",
          en: "Pickup points, illustrated bus and full pricing table",
          de: "Abfahrtspunkte, illustrierter Bus und vollständige Preistabelle",
        },
      },
      {
        label: { es: "Bebidas", en: "Drinks", de: "Getränke" },
        description: {
          es: "Packs de rebujito y copas + pulsera de caseta con 3 beneficios",
          en: "Rebujito and drinks packs + pavilion wristband with 3 perks",
          de: "Rebujito- und Getränke-Pakete + Festzelt-Armband mit 3 Vorteilen",
        },
      },
      {
        label: { es: "Itinerario", en: "Schedule", de: "Programm" },
        description: {
          es: "8 días como tarjetas postales cream con slots de programación",
          en: "8 days as cream postcards with programming slots",
          de: "8 Tage als cremefarbene Postkarten mit Programm-Slots",
        },
      },
    ],
  },
  {
    slug: "wavepanel",
    id: "02",
    title: "WavePanel",
    category: {
      es: "SaaS — Escuelas deportivas",
      en: "SaaS — Sports Schools",
      de: "SaaS — Sportschulen",
    },
    description: {
      es: "Panel + web pública para que las escuelas de surf, kite y deportes acuáticos vendan sus clases online. 0% comisión, arquitectura modular.",
      en: "Dashboard + public site for surf, kite and water-sport schools to sell their lessons online. 0% commission, modular architecture.",
      de: "Dashboard + öffentliche Website für Surf-, Kite- und Wassersportschulen, um Kurse online zu verkaufen. 0% Provision, modulare Architektur.",
    },
    tags: ["Next.js", "Node.js", "Stripe", "SaaS", "Reservas", "WhatsApp Business"],
    metrics: {
      es: "Desde 29€/mes · 0% comisión · 14 días gratis · Activo en 24h",
      en: "From €29/mo · 0% commission · 14-day free trial · Live in 24h",
      de: "Ab 29€/Monat · 0% Provision · 14 Tage kostenlos · Live in 24h",
    },
    year: "2026",
    client: "Producto propio · Felipe Cámara",
    liveUrl: "https://www.wavepanel.app",
    longDescription: {
      es: "WavePanel nació trabajando con Entre Olas Surf. Construí una herramienta a medida para que los clientes de la escuela pudieran reservar y pagar sus clases online. Funcionó tan bien que la saqué como producto: ahora cualquier escuela de surf, kite o actividad acuática puede tener su propio panel + web pública desde 29€/mes.",
      en: "WavePanel started while working with Entre Olas Surf. I built a custom tool so the school's clients could book and pay for lessons online. It worked so well I shipped it as a product: now any surf, kite or water-sport school can have its own dashboard + public website from €29/mo.",
      de: "WavePanel entstand bei der Arbeit mit Entre Olas Surf. Ich baute ein maßgeschneidertes Tool, damit die Kunden der Schule Kurse online buchen und bezahlen konnten. Es funktionierte so gut, dass ich es als Produkt veröffentlichte: jetzt kann jede Surf-, Kite- oder Wassersportschule ab 29€/Monat ein eigenes Panel + öffentliche Website haben.",
    },
    challenge: {
      es: "Las escuelas de deportes acuáticos gestionan el negocio a mano: reservas por WhatsApp, pagos en efectivo, webs genéricas que no convierten. Las soluciones del mercado cobran comisión por reserva, tienen contratos de permanencia y están pensadas para gimnasios o tours genéricos — ninguna entiende la realidad del mar.",
      en: "Water-sport schools run on manual ops: WhatsApp bookings, cash payments, generic sites that don't convert. Market solutions charge per-booking commissions, lock you in, and are built for gyms or generic tours — none get the reality of the ocean.",
      de: "Wassersportschulen managen ihr Geschäft manuell: WhatsApp-Buchungen, Barzahlungen, generische Websites, die nicht konvertieren. Marktlösungen verlangen Provision pro Buchung, haben Mindestlaufzeiten und sind für Fitnessstudios oder generische Touren gebaut — keine versteht die Realität des Meeres.",
    },
    solution: {
      es: "WavePanel es un panel + web pública en uno. Arquitectura modular: todos los planes incluyen el Core (panel, calendario, reservas, clientes, web pública con subdominio). Encima se añaden módulos — Tienda e-commerce, Surf Camps & Alojamiento, WhatsApp Business — solo si los necesitas. Sin comisiones por reserva, sin permanencia.",
      en: "WavePanel is a dashboard + public site in one. Modular: every plan includes the Core (dashboard, calendar, bookings, clients, public site with subdomain). On top you add modules — e-commerce Store, Surf Camps & Accommodation, WhatsApp Business — only if you need them. No per-booking fees, no lock-in.",
      de: "WavePanel ist Panel + öffentliche Website in einem. Modular: jeder Plan enthält das Core (Panel, Kalender, Buchungen, Kunden, öffentliche Website mit Subdomain). Darauf addierst du Module — E-Commerce-Shop, Surf Camps & Unterkünfte, WhatsApp Business — nur wenn du sie brauchst. Keine Buchungsgebühren, keine Mindestlaufzeit.",
    },
    results: {
      es: [
        "Producto SaaS completo: panel + web pública con subdominio propio",
        "0% de comisión por reserva — pagos directos al Stripe del cliente",
        "14 días de prueba gratis sin tarjeta",
        "3 planes reales: Basic 29€/mes, Pro 74€/mes, Lifetime 2.900€",
        "Usado en producción por Entre Olas Surf",
        "Activo en menos de 24 horas sin configuración técnica",
      ],
      en: [
        "Full SaaS product: dashboard + public site with own subdomain",
        "0% booking commission — payments go straight to the client's Stripe",
        "14-day free trial, no card",
        "3 real plans: Basic €29/mo, Pro €74/mo, Lifetime €2,900",
        "Running in production at Entre Olas Surf",
        "Live in under 24 hours, no technical setup",
      ],
      de: [
        "Vollständiges SaaS-Produkt: Panel + öffentliche Website mit eigener Subdomain",
        "0% Buchungsprovision — Zahlungen direkt auf das Stripe-Konto des Kunden",
        "14 Tage kostenlose Testphase ohne Karte",
        "3 echte Pläne: Basic 29€/Monat, Pro 74€/Monat, Lifetime 2.900€",
        "Im produktiven Einsatz bei Entre Olas Surf",
        "Live in unter 24 Stunden, keine technische Einrichtung",
      ],
    },
    features: {
      es: [
        "Core: panel, calendario, reservas, clientes y web pública",
        "Módulo Tienda: productos, stock, carrito, bonos, cupones",
        "Módulo Surf Camps: ediciones, alojamiento, depósitos, check-in",
        "Módulo WhatsApp Business: bot de reservas y confirmaciones",
        "3 pasarelas de pago (Stripe, PayPal, Redsys)",
        "Subdominio propio o dominio custom incluido",
        "Sin comisiones por reserva, sin permanencia",
        "Comunidad privada: los clientes votan el roadmap",
      ],
      en: [
        "Core: dashboard, calendar, bookings, clients and public site",
        "Store module: products, stock, cart, bundles, coupons",
        "Surf Camps module: editions, accommodation, deposits, check-in",
        "WhatsApp Business module: booking and confirmation bot",
        "3 payment gateways (Stripe, PayPal, Redsys)",
        "Own subdomain or custom domain included",
        "No booking commissions, no lock-in",
        "Private community: clients vote on the roadmap",
      ],
      de: [
        "Core: Panel, Kalender, Buchungen, Kunden und öffentliche Website",
        "Shop-Modul: Produkte, Bestand, Warenkorb, Pakete, Gutscheine",
        "Surf-Camps-Modul: Editionen, Unterkunft, Anzahlungen, Check-in",
        "WhatsApp-Business-Modul: Buchungs- und Bestätigungs-Bot",
        "3 Zahlungs-Gateways (Stripe, PayPal, Redsys)",
        "Eigene Subdomain oder Custom-Domain inklusive",
        "Keine Buchungsprovisionen, keine Mindestlaufzeit",
        "Private Community: Kunden voten über die Roadmap",
      ],
    },
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
        label: { es: "Landing", en: "Landing", de: "Landing" },
        description: {
          es: "Hero con copy directo: «Tu escuela. Digitalizada.»",
          en: "Hero with direct copy: \"Your school. Digital.\"",
          de: "Hero mit direkter Copy: „Deine Schule. Digital.\"",
        },
      },
      {
        label: { es: "Módulos", en: "Modules", de: "Module" },
        description: {
          es: "Reservas, tienda, clases, surf camps — todo nativo",
          en: "Bookings, store, classes, surf camps — all native",
          de: "Buchungen, Shop, Kurse, Surf Camps — alles nativ",
        },
      },
      {
        label: { es: "Planes", en: "Plans", de: "Pläne" },
        description: {
          es: "Starter, Pro y Pro+. Precios claros, sin sorpresas.",
          en: "Starter, Pro and Pro+. Clear pricing, no surprises.",
          de: "Starter, Pro und Pro+. Klare Preise, keine Überraschungen.",
        },
      },
      {
        label: { es: "Caso real", en: "Real case", de: "Echter Fall" },
        description: {
          es: "Entre Olas Surf gestiona su escuela entera con WavePanel",
          en: "Entre Olas Surf runs its entire school on WavePanel",
          de: "Entre Olas Surf führt seine gesamte Schule mit WavePanel",
        },
      },
    ],
  },
  {
    slug: "grupo-axial",
    id: "03",
    title: "Grupo Axial",
    category: {
      es: "Web — Grupo retail",
      en: "Web — Retail Group",
      de: "Web — Handelsgruppe",
    },
    description: {
      es: "3 años construyendo la presencia digital del grupo de movilidad más fuerte de Las Palmas: 2 webs en WordPress + gestión de redes y contenido para 4 marcas.",
      en: "3 years building the digital presence of Las Palmas' biggest mobility group: 2 WordPress sites + social media management and content for 4 brands.",
      de: "3 Jahre digitale Präsenz für die stärkste Mobilitätsgruppe von Las Palmas: 2 WordPress-Sites + Social-Media-Management und Content für 4 Marken.",
    },
    tags: [
      "WordPress",
      "Redes sociales",
      "Instagram",
      "Content creation",
      "SEO local",
      "Elementor",
    ],
    metrics: {
      es: "3 años · 2 webs WordPress · 4 cuentas IG · Contenido",
      en: "3 years · 2 WordPress sites · 4 IG accounts · Content",
      de: "3 Jahre · 2 WordPress-Sites · 4 IG-Konten · Content",
    },
    year: "2023",
    featuredImage: "/projects/grupo-axial/store.jpg",
    client: "Grupo Axial · Las Palmas de Gran Canaria",
    liveUrl: "https://grupoaxial.es",
    longDescription: {
      es: "Grupo Axial es el ecosistema de movilidad de Las Palmas: Axial Bike, Moto Axial Center, Axial Rent, Talleres Axial y Moto Axial Estadio. Estuve 3 años a cargo de toda la parte digital — construí grupoaxial.es y axialrent.com en WordPress, y gestioné las redes sociales + creación de contenido para 4 de sus marcas. Ya no lo llevo, pero el trabajo sigue vivo.",
      en: "Grupo Axial is Las Palmas' mobility ecosystem: Axial Bike, Moto Axial Center, Axial Rent, Talleres Axial and Moto Axial Estadio. For 3 years I owned the entire digital side — I built grupoaxial.es and axialrent.com on WordPress, and ran social media + content for 4 of their brands. I no longer manage it, but the work is still live.",
      de: "Grupo Axial ist das Mobilitätsökosystem von Las Palmas: Axial Bike, Moto Axial Center, Axial Rent, Talleres Axial und Moto Axial Estadio. 3 Jahre lang verantwortete ich den kompletten digitalen Teil — ich baute grupoaxial.es und axialrent.com auf WordPress und managte Social Media + Content für 4 ihrer Marken. Ich betreue es nicht mehr, aber die Arbeit lebt weiter.",
    },
    challenge: {
      es: "Un grupo con tiendas físicas reconocidas pero invisible en internet. Webs anticuadas, redes sin coherencia, cada marca hablando un idioma distinto. Había que unificar la voz digital sin perder la identidad de cada departamento — y hacerlo con WordPress, porque el cliente tenía que poder actualizarlo sin depender de mí.",
      en: "A group with well-known physical stores but invisible online. Outdated sites, incoherent social media, each brand speaking a different language. We had to unify the digital voice without losing each department's identity — and do it on WordPress, because the client had to be able to update it without depending on me.",
      de: "Eine Gruppe mit bekannten Filialen, aber unsichtbar im Netz. Veraltete Sites, inkohärente Social Media, jede Marke spricht eine andere Sprache. Wir mussten die digitale Stimme vereinheitlichen, ohne die Identität jeder Abteilung zu verlieren — und das auf WordPress, weil der Kunde es ohne mich aktualisieren können musste.",
    },
    solution: {
      es: "Construí la web matriz grupoaxial.es y la de Axial Rent en WordPress + Elementor, con estructura editable por el cliente. En paralelo gestioné durante 3 años las 4 cuentas de Instagram del grupo — Grupo Axial, Moto Axial, Axial Bike y Axial Rent — con calendario editorial unificado, producción propia de fotografía y creación de reels, historias y campañas.",
      en: "I built the parent site grupoaxial.es and the Axial Rent site on WordPress + Elementor, with a structure the client could edit. In parallel I ran the group's 4 Instagram accounts for 3 years — Grupo Axial, Moto Axial, Axial Bike and Axial Rent — with a unified editorial calendar, in-house photography and reels, stories and campaigns.",
      de: "Ich baute die Hauptseite grupoaxial.es und die von Axial Rent auf WordPress + Elementor, mit einer vom Kunden editierbaren Struktur. Parallel managte ich 3 Jahre lang die 4 Instagram-Konten der Gruppe — Grupo Axial, Moto Axial, Axial Bike und Axial Rent — mit vereinheitlichtem Redaktionskalender, eigener Fotografie und Reels, Stories und Kampagnen.",
    },
    results: {
      es: [
        "2 webs WordPress construidas (grupoaxial.es + axialrent.com)",
        "3 años de gestión sostenida de 4 cuentas de Instagram",
        "Creación de contenido propio: fotografía, reels e historias",
        "Identidad digital unificada bajo «Somos movimiento, somos Axial»",
        "SEO local optimizado para Las Palmas de Gran Canaria",
        "Caso de éxito real: webs editables por el cliente, sin dependencia",
      ],
      en: [
        "2 WordPress sites built (grupoaxial.es + axialrent.com)",
        "3 years of sustained management for 4 Instagram accounts",
        "In-house content creation: photography, reels and stories",
        "Unified digital identity under \"We are movement, we are Axial\"",
        "Local SEO optimized for Las Palmas de Gran Canaria",
        "Real success case: client-editable sites, no dependency",
      ],
      de: [
        "2 WordPress-Sites gebaut (grupoaxial.es + axialrent.com)",
        "3 Jahre durchgängiges Management von 4 Instagram-Konten",
        "Eigene Content-Produktion: Fotografie, Reels und Stories",
        "Vereinheitlichte digitale Identität unter „Wir sind Bewegung, wir sind Axial\"",
        "Lokales SEO optimiert für Las Palmas de Gran Canaria",
        "Echter Erfolgsfall: vom Kunden editierbare Sites, keine Abhängigkeit",
      ],
    },
    features: {
      es: [
        "Web matriz (grupoaxial.es) sobre WordPress + Elementor",
        "Web de Axial Rent (axialrent.com) con catálogo editable",
        "Calendario editorial unificado para 4 cuentas IG",
        "Sesiones de fotografía en tienda",
        "Reels e historias con voz de marca",
        "Campañas de ofertas y novedades",
        "Gestión de DMs y atención pre-venta",
      ],
      en: [
        "Parent site (grupoaxial.es) on WordPress + Elementor",
        "Axial Rent site (axialrent.com) with editable catalog",
        "Unified editorial calendar for 4 IG accounts",
        "In-store photography sessions",
        "Reels and stories with brand voice",
        "Offer and launch campaigns",
        "DM management and pre-sales support",
      ],
      de: [
        "Hauptseite (grupoaxial.es) auf WordPress + Elementor",
        "Axial Rent-Site (axialrent.com) mit editierbarem Katalog",
        "Einheitlicher Redaktionskalender für 4 IG-Konten",
        "Foto-Sessions im Laden",
        "Reels und Stories mit Markenstimme",
        "Aktions- und Launch-Kampagnen",
        "DM-Management und Pre-Sales-Support",
      ],
    },
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
        label: { es: "Grupo Axial", en: "Grupo Axial", de: "Grupo Axial" },
        description: {
          es: "La web matriz del grupo: movimiento, motor, departamentos",
          en: "The group's parent site: movement, engine, departments",
          de: "Die Hauptseite der Gruppe: Bewegung, Motor, Abteilungen",
        },
      },
      {
        label: { es: "Departamentos", en: "Departments", de: "Abteilungen" },
        description: {
          es: "Axial Bike, Moto Axial, Axial Rent, Talleres Axial",
          en: "Axial Bike, Moto Axial, Axial Rent, Talleres Axial",
          de: "Axial Bike, Moto Axial, Axial Rent, Talleres Axial",
        },
      },
      {
        label: { es: "Redes sociales", en: "Social media", de: "Social Media" },
        description: {
          es: "5 cuentas IG con calendario y producción propia",
          en: "5 IG accounts with calendar and in-house production",
          de: "5 IG-Konten mit Kalender und Eigenproduktion",
        },
      },
      {
        label: { es: "SEO local", en: "Local SEO", de: "Lokales SEO" },
        description: {
          es: "Captación orgánica en Las Palmas de Gran Canaria",
          en: "Organic acquisition in Las Palmas de Gran Canaria",
          de: "Organische Akquise in Las Palmas de Gran Canaria",
        },
      },
    ],
  },
  {
    slug: "noa",
    id: "04",
    title: "Noa",
    category: {
      es: "SaaS — Asistente financiero IA",
      en: "SaaS — AI Financial Assistant",
      de: "SaaS — KI-Finanzassistent",
    },
    description: {
      es: "El asistente personal con IA para autónomos y PYMEs. Facturas, impuestos, finanzas — todo automatizado.",
      en: "The personal AI assistant for freelancers and SMBs. Invoices, taxes, finances — fully automated.",
      de: "Der persönliche KI-Assistent für Freelancer und KMU. Rechnungen, Steuern, Finanzen — alles automatisiert.",
    },
    tags: ["Next.js", "Node.js", "IA", "Stripe", "Open Banking"],
    metrics: {
      es: "Onboarding 3 pasos · IA nativa · Integraciones bancarias",
      en: "3-step onboarding · Native AI · Banking integrations",
      de: "3-Schritte-Onboarding · Native KI · Banking-Integrationen",
    },
    year: "2026",
    client: "Producto propio",
    liveUrl: "https://heynoa.es",
    longDescription: {
      es: "Noa reemplaza al gestor, al software de facturación y a la hoja de cálculo — a la vez. Diseñé y construí la plataforma completa: desde la landing hasta el producto, desde el onboarding hasta la pasarela de pagos.",
      en: "Noa replaces the accountant, the invoicing software and the spreadsheet — all at once. I designed and built the full platform: from landing to product, from onboarding to payment gateway.",
      de: "Noa ersetzt den Steuerberater, die Rechnungssoftware und das Spreadsheet — alles auf einmal. Ich entwarf und baute die komplette Plattform: von der Landing zum Produkt, vom Onboarding zur Bezahl-Schnittstelle.",
    },
    challenge: {
      es: "El autónomo español pierde horas cada semana peleándose con facturas, impuestos y conciliaciones. Las herramientas existentes son caras, fragmentadas o anticuadas. Faltaba algo que entendiese su forma de trabajar y hablase su idioma.",
      en: "The Spanish freelancer loses hours every week fighting invoices, taxes and reconciliations. Existing tools are expensive, fragmented or outdated. Something was missing that understood their workflow and spoke their language.",
      de: "Der spanische Freelancer verliert jede Woche Stunden mit Rechnungen, Steuern und Abstimmungen. Bestehende Tools sind teuer, fragmentiert oder veraltet. Es fehlte etwas, das ihre Arbeitsweise versteht und ihre Sprache spricht.",
    },
    solution: {
      es: "Construí Noa como un asistente que vive donde ya trabajas: se conecta al banco, al email y al calendario. Preguntas en lenguaje natural — «¿quién me debe dinero?» — y responde. Dashboard, CRM, automatizaciones fiscales y hasta un device físico opcional. Todo de serie.",
      en: "I built Noa as an assistant that lives where you already work: connects to your bank, email and calendar. You ask in natural language — \"who owes me money?\" — and it answers. Dashboard, CRM, tax automation and even an optional physical device. All built in.",
      de: "Ich baute Noa als Assistent, der dort lebt, wo du arbeitest: verbindet sich mit Bank, E-Mail und Kalender. Du fragst in natürlicher Sprache — „wer schuldet mir Geld?\" — und es antwortet. Dashboard, CRM, Steuerautomatisierung und sogar ein optionales physisches Gerät. Alles serienmäßig.",
    },
    results: {
      es: [
        "Plataforma completa lanzada: landing, dashboard, onboarding y pagos",
        "Integración bancaria vía Open Banking",
        "IA conversacional nativa para consultas financieras",
        "3 planes activos: Starter, Pro y Device",
        "Arquitectura escalable preparada para equipos",
      ],
      en: [
        "Full platform launched: landing, dashboard, onboarding and payments",
        "Bank integration via Open Banking",
        "Native conversational AI for financial queries",
        "3 active plans: Starter, Pro and Device",
        "Scalable architecture ready for teams",
      ],
      de: [
        "Komplette Plattform gelauncht: Landing, Dashboard, Onboarding und Zahlungen",
        "Bank-Integration über Open Banking",
        "Native KI-Konversation für Finanz-Abfragen",
        "3 aktive Pläne: Starter, Pro und Device",
        "Skalierbare Architektur, bereit für Teams",
      ],
    },
    features: {
      es: [
        "Facturación automática",
        "Impuestos y presentaciones",
        "Conciliación bancaria",
        "CRM integrado",
        "Alertas inteligentes",
        "Noa IA — consultas en lenguaje natural",
        "Dashboard en tiempo real",
        "Device físico (opcional)",
      ],
      en: [
        "Automated invoicing",
        "Taxes and filings",
        "Bank reconciliation",
        "Integrated CRM",
        "Smart alerts",
        "Noa AI — natural language queries",
        "Real-time dashboard",
        "Physical device (optional)",
      ],
      de: [
        "Automatisierte Rechnungsstellung",
        "Steuern und Meldungen",
        "Bankabstimmung",
        "Integriertes CRM",
        "Intelligente Warnungen",
        "Noa KI — Anfragen in natürlicher Sprache",
        "Echtzeit-Dashboard",
        "Physisches Gerät (optional)",
      ],
    },
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
        label: { es: "Dashboard", en: "Dashboard", de: "Dashboard" },
        description: {
          es: "Panel con ingresos, gastos, impuestos y alertas — todo en una pantalla",
          en: "Dashboard with income, expenses, taxes and alerts — all on one screen",
          de: "Dashboard mit Einnahmen, Ausgaben, Steuern und Warnungen — alles auf einem Bildschirm",
        },
      },
      {
        label: { es: "Noa IA", en: "Noa AI", de: "Noa KI" },
        description: {
          es: "Preguntas en lenguaje natural, respuestas con datos reales de tu negocio",
          en: "Natural-language questions, answers with real data from your business",
          de: "Fragen in natürlicher Sprache, Antworten mit echten Daten aus deinem Geschäft",
        },
      },
      {
        label: { es: "Facturación", en: "Invoicing", de: "Rechnungsstellung" },
        description: {
          es: "Crea, envía y cobra facturas sin salir del flujo. Conciliación automática.",
          en: "Create, send and collect invoices without leaving the flow. Automatic reconciliation.",
          de: "Erstelle, sende und kassiere Rechnungen ohne Flow-Wechsel. Automatische Abstimmung.",
        },
      },
      {
        label: { es: "Device", en: "Device", de: "Gerät" },
        description: {
          es: "El hardware opcional que convierte a Noa en algo tangible en tu mesa",
          en: "The optional hardware that makes Noa tangible on your desk",
          de: "Die optionale Hardware, die Noa auf deinem Schreibtisch greifbar macht",
        },
      },
    ],
  },
  {
    slug: "lorena-amadio",
    id: "05",
    title: "Lorena Amadio",
    category: {
      es: "Web — Psicología",
      en: "Web — Psychology",
      de: "Web — Psychologie",
    },
    description: {
      es: "Web para psicóloga clínica. Confianza, calidez y un sistema de reservas que no intimida.",
      en: "Website for a clinical psychologist. Trust, warmth and a booking system that doesn't intimidate.",
      de: "Website für eine klinische Psychologin. Vertrauen, Wärme und ein Buchungssystem, das nicht einschüchtert.",
    },
    tags: ["Next.js", "SEO", "Reservas", "Responsive"],
    year: "2025",
    featuredImage: "/projects/lorena-amadio/lorena-portrait.jpg",
    client: "Lorena Amadio · Psicóloga",
    liveUrl: "https://psicolorenaamadio.com",
    longDescription: {
      es: "Pedir cita con un psicólogo es uno de los momentos más vulnerables que existen. La web tenía que transmitir calma desde el primer segundo y hacer que reservar fuese tan simple como respirar.",
      en: "Booking a therapist is one of the most vulnerable moments there is. The site had to convey calm from the first second and make booking as simple as breathing.",
      de: "Einen Therapeuten zu buchen ist einer der verletzlichsten Momente überhaupt. Die Site musste von der ersten Sekunde an Ruhe vermitteln und das Buchen so einfach machen wie Atmen.",
    },
    challenge: {
      es: "La mayoría de webs de psicología son genéricas, clínicas y frías. Lorena quería algo que reflejase su forma de trabajar — cercana, humana, profunda — sin perder la seriedad que exige la profesión.",
      en: "Most psychology websites are generic, clinical and cold. Lorena wanted something that reflected her way of working — close, human, deep — without losing the seriousness the profession demands.",
      de: "Die meisten Psychologie-Websites sind generisch, klinisch und kalt. Lorena wollte etwas, das ihre Arbeitsweise widerspiegelt — nah, menschlich, tief — ohne die Ernsthaftigkeit zu verlieren, die der Beruf verlangt.",
    },
    solution: {
      es: "Diseñé una web con ritmo pausado, paleta cálida y tipografía con alma. Construí un sistema de reservas online que respeta la sensibilidad de quien entra: sin formularios kilométricos, sin ansiedad. Todo optimizado para SEO local.",
      en: "I designed a site with a paced rhythm, warm palette and soulful typography. Built an online booking system that respects the visitor's sensitivity: no endless forms, no anxiety. All optimized for local SEO.",
      de: "Ich entwarf eine Site mit ruhigem Rhythmus, warmer Palette und beseelter Typografie. Baute ein Online-Buchungssystem, das die Sensibilität des Besuchers respektiert: keine endlosen Formulare, keine Angst. Alles für lokales SEO optimiert.",
    },
    results: {
      es: [
        "Web completa diseñada y desarrollada a medida",
        "Sistema de reservas online integrado",
        "SEO local para captación orgánica de pacientes",
        "Diseño responsive pensado desde el móvil",
        "Copy honesto que habla a la persona, no al paciente",
      ],
      en: [
        "Full custom-designed and developed website",
        "Integrated online booking system",
        "Local SEO for organic patient acquisition",
        "Responsive design built mobile-first",
        "Honest copy that speaks to the person, not the patient",
      ],
      de: [
        "Komplett individuell gestaltete und entwickelte Website",
        "Integriertes Online-Buchungssystem",
        "Lokales SEO für organische Patienten-Akquise",
        "Responsives Design, mobile-first gedacht",
        "Ehrliche Copy, die die Person anspricht, nicht den Patienten",
      ],
    },
    features: {
      es: [
        "Reservas online con calendario",
        "Páginas dedicadas por terapia",
        "Blog de divulgación",
        "Formulario de primer contacto",
        "SEO técnico y semántico",
        "Accesibilidad AA",
      ],
      en: [
        "Online booking with calendar",
        "Dedicated pages per therapy",
        "Outreach blog",
        "First-contact form",
        "Technical and semantic SEO",
        "AA accessibility",
      ],
      de: [
        "Online-Buchung mit Kalender",
        "Eigene Seiten pro Therapie",
        "Aufklärungs-Blog",
        "Erstkontakt-Formular",
        "Technisches und semantisches SEO",
        "AA-Barrierefreiheit",
      ],
    },
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
        label: { es: "Portada", en: "Home", de: "Startseite" },
        description: {
          es: "Un segundo de calma antes de empezar a leer",
          en: "A second of calm before you start reading",
          de: "Eine Sekunde Ruhe, bevor du zu lesen beginnst",
        },
      },
      {
        label: { es: "Terapias", en: "Therapies", de: "Therapien" },
        description: {
          es: "Cada proceso explicado sin jerga clínica",
          en: "Each process explained without clinical jargon",
          de: "Jeder Prozess ohne klinischen Jargon erklärt",
        },
      },
      {
        label: { es: "Reservas", en: "Bookings", de: "Buchungen" },
        description: {
          es: "Pedir cita en tres clics, sin formularios kilométricos",
          en: "Book in three clicks, no endless forms",
          de: "Buchen in drei Klicks, keine endlosen Formulare",
        },
      },
      {
        label: { es: "Sobre Lorena", en: "About Lorena", de: "Über Lorena" },
        description: {
          es: "Una psicóloga, no una marca",
          en: "A psychologist, not a brand",
          de: "Eine Psychologin, keine Marke",
        },
      },
    ],
  },
  {
    slug: "entre-olas-surf",
    id: "06",
    title: "Entre Olas Surf",
    category: {
      es: "Web — Escuela de Surf",
      en: "Web — Surf School",
      de: "Web — Surfschule",
    },
    description: {
      es: "Web para escuela de surf en Cádiz. Reservas, surf camps y tienda — el océano en la pantalla.",
      en: "Site for a surf school in Cádiz. Bookings, surf camps and store — the ocean on screen.",
      de: "Website für eine Surfschule in Cádiz. Buchungen, Surf Camps und Shop — der Ozean auf dem Bildschirm.",
    },
    tags: ["Next.js", "Stripe", "Reservas", "E-commerce", "SEO"],
    year: "2025",
    featuredImage: "/projects/entre-olas-surf/aerial-house.jpg",
    client: "Entre Olas Surf · Cádiz",
    liveUrl: "https://entreolasurf.com",
    longDescription: {
      es: "Entre Olas es una escuela de surf en Playa de Roche que respira Cádiz por los cuatro costados. Construí una web que huele a salitre: reservas rápidas, surf camps, tienda y la sensación clara de que ahí se aprende surf con gente que sabe lo que hace.",
      en: "Entre Olas is a surf school at Playa de Roche that breathes Cádiz from every side. I built a site that smells like salt: fast bookings, surf camps, store and the clear feeling that here you learn surfing with people who know.",
      de: "Entre Olas ist eine Surfschule am Playa de Roche, die Cádiz von allen Seiten atmet. Ich baute eine Site, die nach Salz riecht: schnelle Buchungen, Surf Camps, Shop und das klare Gefühl, dass man hier mit Leuten surfen lernt, die wissen, was sie tun.",
    },
    challenge: {
      es: "Había escuela, había olas, había reputación — pero no había web que convirtiese. Los turistas extranjeros se quedaban en Instagram y no reservaban. Había que cerrar ese hueco.",
      en: "There was a school, there were waves, there was reputation — but no site that converted. Foreign tourists stayed on Instagram and didn't book. We had to close that gap.",
      de: "Es gab Schule, Wellen, Ruf — aber keine konvertierende Website. Ausländische Touristen blieben auf Instagram und buchten nicht. Diese Lücke musste geschlossen werden.",
    },
    solution: {
      es: "Diseñé y desarrollé la web completa: reservas con disponibilidad en tiempo real, gestión de surf camps con villa y comidas, tienda online de merchandising, integración con WhatsApp y una estética que captura la energía de Playa de Roche.",
      en: "I designed and built the full site: real-time availability bookings, surf-camp management with villa and meals, online merch store, WhatsApp integration and aesthetics that capture the energy of Playa de Roche.",
      de: "Ich entwarf und baute die komplette Site: Echtzeit-Buchungen, Surf-Camp-Verwaltung mit Villa und Verpflegung, Online-Merch-Shop, WhatsApp-Integration und Ästhetik, die die Energie von Playa de Roche einfängt.",
    },
    results: {
      es: [
        "Reservas online con disponibilidad en tiempo real",
        "Gestión integrada de surf camps y alojamiento",
        "Tienda online con merchandising de marca",
        "SEO orientado a turismo activo en Cádiz",
        "Integración con WhatsApp para consultas rápidas",
      ],
      en: [
        "Online bookings with real-time availability",
        "Integrated surf-camp and accommodation management",
        "Online store with branded merchandise",
        "SEO targeted at active tourism in Cádiz",
        "WhatsApp integration for quick queries",
      ],
      de: [
        "Online-Buchungen mit Echtzeit-Verfügbarkeit",
        "Integriertes Surf-Camp- und Unterkunfts-Management",
        "Online-Shop mit Marken-Merchandise",
        "SEO ausgerichtet auf Aktiv-Tourismus in Cádiz",
        "WhatsApp-Integration für schnelle Anfragen",
      ],
    },
    features: {
      es: [
        "Reservas de clases (grupo y privadas)",
        "Paquetes de surf camp con villa",
        "E-commerce de merchandising",
        "Galería de testimonios reales",
        "Integración con Instagram y TikTok",
        "Multilenguaje (ES / EN)",
      ],
      en: [
        "Class bookings (group and private)",
        "Surf-camp packages with villa",
        "Merchandise e-commerce",
        "Real testimonial gallery",
        "Instagram and TikTok integration",
        "Multilingual (ES / EN)",
      ],
      de: [
        "Kursbuchungen (Gruppe und privat)",
        "Surf-Camp-Pakete mit Villa",
        "Merch-E-Commerce",
        "Galerie echter Testimonials",
        "Instagram- und TikTok-Integration",
        "Mehrsprachig (ES / EN)",
      ],
    },
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
        label: { es: "Reservas", en: "Bookings", de: "Buchungen" },
        description: {
          es: "Elige fecha, nivel y tipo de clase — disponibilidad en vivo",
          en: "Pick date, level and class type — live availability",
          de: "Wähle Datum, Level und Kurs-Typ — Live-Verfügbarkeit",
        },
      },
      {
        label: { es: "Surf Camps", en: "Surf Camps", de: "Surf Camps" },
        description: {
          es: "Villa, desayuno, clases y yoga — todo en un paquete",
          en: "Villa, breakfast, classes and yoga — all in one package",
          de: "Villa, Frühstück, Kurse und Yoga — alles in einem Paket",
        },
      },
      {
        label: { es: "Tienda", en: "Store", de: "Shop" },
        description: {
          es: "Merchandising de marca con checkout Stripe",
          en: "Branded merchandise with Stripe checkout",
          de: "Marken-Merchandise mit Stripe-Checkout",
        },
      },
      {
        label: { es: "Comunidad", en: "Community", de: "Community" },
        description: {
          es: "Testimonios, Instagram y el feed de Playa de Roche",
          en: "Testimonials, Instagram and the Playa de Roche feed",
          de: "Testimonials, Instagram und der Playa-de-Roche-Feed",
        },
      },
    ],
  },
  {
    slug: "samba-trips",
    id: "07",
    title: "Samba Trips",
    category: {
      es: "Web — Viajes en grupo",
      en: "Web — Group Trips",
      de: "Web — Gruppenreisen",
    },
    description: {
      es: "Web de viajes en grupo a destinos exóticos. Reservas, testimonios y una estética que transmite aventura.",
      en: "Group-trip site to exotic destinations. Bookings, testimonials and an aesthetic that breathes adventure.",
      de: "Gruppenreisen-Website zu exotischen Zielen. Buchungen, Testimonials und eine Ästhetik, die Abenteuer atmet.",
    },
    tags: ["Next.js", "Stripe", "Reservas", "CMS", "SEO"],
    year: "2025",
    featuredImage: "/projects/samba-trips/hero-surf.jpg",
    client: "Oli Czudny · @oli_czudny",
    liveUrl: "https://sambatrips.com",
    longDescription: {
      es: "Samba Trips organiza viajes en grupo a sitios donde la gente vuelve con amigos para toda la vida. La web tenía que vender eso — no destinos, sino historias por vivir.",
      en: "Samba Trips runs group trips to places where people come back with lifelong friends. The site had to sell that — not destinations, but stories to live.",
      de: "Samba Trips organisiert Gruppenreisen zu Orten, von denen man mit Freunden fürs Leben zurückkommt. Die Site musste das verkaufen — keine Reiseziele, sondern Geschichten zum Erleben.",
    },
    challenge: {
      es: "El mercado de viajes en grupo está lleno de webs frías, formularios kilométricos y fotos de stock. Samba necesitaba algo que sintiera como una conversación con un amigo que ya estuvo allí.",
      en: "The group-travel market is full of cold sites, endless forms and stock photos. Samba needed something that felt like a chat with a friend who'd already been there.",
      de: "Der Gruppenreisen-Markt ist voll von kalten Websites, endlosen Formularen und Stockfotos. Samba brauchte etwas, das sich wie ein Gespräch mit einem Freund anfühlt, der schon dort war.",
    },
    solution: {
      es: "Construí la web completa con catálogo de trips dinámico, reservas con pasarela Stripe, testimonios reales, integración con Instagram y un ritmo visual que se mueve entre la calma y el caos bien llevado.",
      en: "I built the full site with a dynamic trip catalog, Stripe-powered bookings, real testimonials, Instagram integration and a visual rhythm that moves between calm and well-handled chaos.",
      de: "Ich baute die komplette Site mit dynamischem Reise-Katalog, Stripe-Buchungen, echten Testimonials, Instagram-Integration und einem visuellen Rhythmus zwischen Ruhe und gut gehandhabtem Chaos.",
    },
    results: {
      es: [
        "Web completa con 7+ destinos gestionables vía CMS",
        "Reservas con señal y pago final integrados",
        "Integración con Instagram para prueba social en vivo",
        "FAQ completo: visados, cancelaciones, qué incluye",
        "SEO internacional (ES / EN)",
      ],
      en: [
        "Full site with 7+ destinations editable via CMS",
        "Bookings with deposit and final-payment flow",
        "Instagram integration for live social proof",
        "Full FAQ: visas, cancellations, what's included",
        "International SEO (ES / EN)",
      ],
      de: [
        "Komplette Site mit 7+ Zielen, über CMS editierbar",
        "Buchungen mit Anzahlung und finalem Zahlungsfluss",
        "Instagram-Integration für Live-Social-Proof",
        "Vollständige FAQ: Visa, Stornierungen, Inklusivleistungen",
        "Internationales SEO (ES / EN)",
      ],
    },
    features: {
      es: [
        "Catálogo de trips con fechas y precios",
        "Reservas online con pasarela Stripe",
        "Fichas de destino con fotos y detalles",
        "Testimonios dinámicos",
        "Formulario de lead qualifying",
        "Feed de Instagram embebido",
      ],
      en: [
        "Trip catalog with dates and prices",
        "Online bookings via Stripe",
        "Destination pages with photos and details",
        "Dynamic testimonials",
        "Lead-qualifying form",
        "Embedded Instagram feed",
      ],
      de: [
        "Reise-Katalog mit Daten und Preisen",
        "Online-Buchungen über Stripe",
        "Ziel-Seiten mit Fotos und Details",
        "Dynamische Testimonials",
        "Lead-Qualifying-Formular",
        "Eingebetteter Instagram-Feed",
      ],
    },
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
        label: { es: "Catálogo", en: "Catalog", de: "Katalog" },
        description: {
          es: "Siargao, Lombok, Conil, Tamraght, Maldivas, Zanzíbar…",
          en: "Siargao, Lombok, Conil, Tamraght, Maldives, Zanzibar…",
          de: "Siargao, Lombok, Conil, Tamraght, Malediven, Sansibar…",
        },
      },
      {
        label: { es: "Ficha de viaje", en: "Trip page", de: "Reise-Seite" },
        description: {
          es: "Cada trip contado como si te lo recomendase un amigo",
          en: "Each trip told like a friend's recommendation",
          de: "Jede Reise erzählt wie eine Empfehlung von einem Freund",
        },
      },
      {
        label: { es: "Reserva", en: "Booking", de: "Buchung" },
        description: {
          es: "Señal, pago final y gestión sin fricción",
          en: "Deposit, final payment and friction-less management",
          de: "Anzahlung, Restzahlung und reibungsloses Management",
        },
      },
      {
        label: { es: "Comunidad", en: "Community", de: "Community" },
        description: {
          es: "Testimonios de gente que volvió con amigos nuevos",
          en: "Testimonials from people who came back with new friends",
          de: "Testimonials von Leuten, die mit neuen Freunden zurückkamen",
        },
      },
    ],
  },
  {
    slug: "alma-de-nomada",
    id: "08",
    title: "Alma de Nómada",
    category: {
      es: "Web — Travel Coaching",
      en: "Web — Travel Coaching",
      de: "Web — Travel Coaching",
    },
    description: {
      es: "Web para asesoría de viaje y vida en el extranjero. Destinos, relocalización y un tono que invita a moverse.",
      en: "Site for travel and life-abroad consulting. Destinations, relocation and a tone that invites you to move.",
      de: "Website für Reise- und Auslandsleben-Beratung. Reiseziele, Relocation und ein Ton, der zum Aufbruch einlädt.",
    },
    tags: ["Next.js", "SEO", "Lead gen", "CMS"],
    year: "2025",
    featuredImage: "/projects/alma-de-nomada/cover-freedom.jpg",
    client: "Ainhoa García · @ainhhgarcia",
    liveUrl: "https://almadenomada.com",
    longDescription: {
      es: "Alma de Nómada no vende viajes — vende permiso para cambiar de vida. Una web para Ainhoa García, coach que ayuda a mudarse al otro lado del mundo sin perder la cabeza en el intento.",
      en: "Alma de Nómada doesn't sell trips — it sells permission to change your life. A site for Ainhoa García, coach who helps people move to the other side of the world without losing their mind.",
      de: "Alma de Nómada verkauft keine Reisen — sie verkauft die Erlaubnis, das Leben zu ändern. Eine Site für Ainhoa García, Coach, die hilft, ans andere Ende der Welt zu ziehen, ohne den Verstand zu verlieren.",
    },
    challenge: {
      es: "Las webs de travel coaching se parecen todas: fotos de stock, frases motivacionales vacías y cero claridad sobre qué pagas exactamente. Alma de Nómada necesitaba diferenciarse con contenido real y un proceso transparente.",
      en: "Travel-coaching sites all look the same: stock photos, empty motivational quotes and zero clarity about what you actually pay for. Alma de Nómada needed to stand out with real content and a transparent process.",
      de: "Travel-Coaching-Websites sehen alle gleich aus: Stockfotos, leere Motivationsphrasen und null Klarheit darüber, wofür man bezahlt. Alma de Nómada musste sich mit echtem Content und einem transparenten Prozess abheben.",
    },
    solution: {
      es: "Diseñé y desarrollé la web completa con páginas dedicadas por destino, proceso de consultoría claro en tres pasos, integración con partners de seguros y conectividad, y una captación de leads por email que funciona sin ser agresiva.",
      en: "I designed and built the full site with dedicated pages per destination, a clear three-step consulting process, partner integrations for insurance and connectivity, and email-based lead capture that works without being aggressive.",
      de: "Ich entwarf und baute die komplette Site mit dedizierten Seiten pro Ziel, einem klaren Drei-Schritte-Beratungsprozess, Partner-Integrationen für Versicherung und Konnektivität und E-Mail-basierter Lead-Erfassung, die funktioniert, ohne aggressiv zu sein.",
    },
    results: {
      es: [
        "Web completa con 10+ destinos gestionables",
        "Proceso de consultoría explicado sin humo",
        "Captación de leads vía email optimizada",
        "Integración con 4 partners de seguros y conectividad",
        "SEO orientado a relocalización internacional",
      ],
      en: [
        "Full site with 10+ manageable destinations",
        "Consulting process explained, no fluff",
        "Optimized email lead capture",
        "Integration with 4 insurance and connectivity partners",
        "SEO targeted at international relocation",
      ],
      de: [
        "Komplette Site mit 10+ verwaltbaren Zielen",
        "Beratungsprozess klar erklärt, kein Geschwafel",
        "Optimierte E-Mail-Lead-Erfassung",
        "Integration mit 4 Versicherungs- und Konnektivitäts-Partnern",
        "SEO ausgerichtet auf internationale Relocation",
      ],
    },
    features: {
      es: [
        "Grid de destinos con fichas individuales",
        "Página dedicada a Australia (mudanza)",
        "Proceso de 3 pasos claro y sin humo",
        "Newsletter y captación por email",
        "Comparativa de partners",
        "Formulario de contacto cualificado",
      ],
      en: [
        "Destination grid with individual pages",
        "Dedicated Australia (relocation) page",
        "Clear 3-step process, no fluff",
        "Newsletter and email capture",
        "Partner comparison",
        "Qualified contact form",
      ],
      de: [
        "Ziel-Grid mit individuellen Seiten",
        "Eigene Australien-Seite (Umzug)",
        "Klarer 3-Schritte-Prozess, ohne Geschwafel",
        "Newsletter und E-Mail-Erfassung",
        "Partner-Vergleich",
        "Qualifiziertes Kontaktformular",
      ],
    },
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
        label: { es: "Destinos", en: "Destinations", de: "Reiseziele" },
        description: {
          es: "Tailandia, Sri Lanka, Japón, Australia, Maldivas, Indonesia…",
          en: "Thailand, Sri Lanka, Japan, Australia, Maldives, Indonesia…",
          de: "Thailand, Sri Lanka, Japan, Australien, Malediven, Indonesien…",
        },
      },
      {
        label: { es: "Australia", en: "Australia", de: "Australien" },
        description: {
          es: "Página dedicada para mudarse: visados, ciudades, logística",
          en: "Dedicated relocation page: visas, cities, logistics",
          de: "Dedizierte Umzugs-Seite: Visa, Städte, Logistik",
        },
      },
      {
        label: { es: "Proceso", en: "Process", de: "Prozess" },
        description: {
          es: "Tres pasos: destino, admin y mindset. Sin humo.",
          en: "Three steps: destination, admin and mindset. No fluff.",
          de: "Drei Schritte: Ziel, Admin und Mindset. Kein Geschwafel.",
        },
      },
      {
        label: { es: "Contacto", en: "Contact", de: "Kontakt" },
        description: {
          es: "Formulario honesto — dime qué necesitas y te respondo",
          en: "Honest form — tell me what you need and I'll reply",
          de: "Ehrliches Formular — sag mir, was du brauchst, und ich antworte",
        },
      },
    ],
  },
  {
    slug: "waya-surf",
    id: "09",
    title: "Waya Surf",
    category: {
      es: "Web — Escuela de Surf",
      en: "Web — Surf School",
      de: "Web — Surfschule",
    },
    description: {
      es: "Web para escuela de surf en Playa del Hombre, Gran Canaria. 15 años de método propio condensados en una web que enseña antes de vender.",
      en: "Website for a surf school at Playa del Hombre, Gran Canaria. 15 years of own method condensed into a site that teaches before selling.",
      de: "Website für eine Surfschule am Playa del Hombre, Gran Canaria. 15 Jahre eigene Methode, verdichtet zu einer Site, die lehrt, bevor sie verkauft.",
    },
    tags: ["HTML", "CSS", "JavaScript", "Responsive", "SEO local"],
    metrics: {
      es: "15 años · 95% se pone de pie · Grupos de 8 · Bonos residentes",
      en: "15 years · 95% stand up on day 1 · Groups of 8 · Resident passes",
      de: "15 Jahre · 95% stehen am 1. Tag · Gruppen à 8 · Resident-Pässe",
    },
    year: "2024",
    featuredImage: "/projects/waya-surf/about-victor.jpg",
    client: "Waya Surf · Playa del Hombre · Gran Canaria",
    liveUrl: "https://wayasurf.com",
    longDescription: {
      es: "Waya en suajili significa «camino». La escuela de Víctor Bueno Ureña enseña eso, no surf: lleva 15 años poniendo a gente de pie sobre una tabla en Playa del Hombre con un método propio — teoría en arena, práctica en agua, grupos de 8 como máximo. La web tenía que respetar ese método y no parecer otra escuela más con un formulario.",
      en: "Waya means \"path\" in Swahili. Víctor Bueno Ureña's school teaches that, not surf: 15 years getting people on a board at Playa del Hombre with his own method — theory on sand, practice in water, groups of 8 max. The site had to respect that method and not look like another school with a form.",
      de: "Waya bedeutet auf Suaheli „Weg\". Die Schule von Víctor Bueno Ureña lehrt das, nicht Surfen: 15 Jahre, in denen sie Menschen am Playa del Hombre aufs Brett bringt — Theorie am Sand, Praxis im Wasser, Gruppen à 8. Die Website musste diese Methode respektieren und nicht wie eine weitere Schule mit Formular aussehen.",
    },
    challenge: {
      es: "Escuela con reputación enorme en Gran Canaria, pero la presencia digital no transmitía la diferencia: parecía «otra escuela de surf más». Faltaba contar el método propio, los niveles, el porqué de los grupos pequeños y, sobre todo, el bono residente — clave para fidelizar al cliente local en una isla turística.",
      en: "Huge reputation in Gran Canaria, but the digital presence didn't tell the difference: it looked like \"yet another surf school\". The site had to explain the method, the levels, why the small groups — and above all the resident pass, key to retaining locals on a tourist island.",
      de: "Riesiger Ruf in Gran Canaria, aber die digitale Präsenz zeigte den Unterschied nicht: sah aus wie „eine weitere Surfschule\". Es fehlte, die Methode zu erzählen, die Stufen, das Warum der kleinen Gruppen — und vor allem den Resident-Pass, Schlüssel für die Bindung von Einheimischen auf einer Touristeninsel.",
    },
    solution: {
      es: "Diseñé y construí la web como un recorrido pedagógico, no como un catálogo. El visitante llega al hero y entiende el lugar (Playa del Hombre, Telde). Antes de ver precios ve el método. Antes de reservar conoce a Víctor. El bono residente tiene su propio bloque, separado del turista, con la conversión local en el centro. Multilenguaje implícito (web en español, audiencia residente y visitante).",
      en: "Designed and built the site as a learning journey, not a catalog. The visitor lands and understands the place (Playa del Hombre, Telde). Before seeing pricing they see the method. Before booking they meet Víctor. The resident pass has its own block, separated from tourists, with local conversion at the centre.",
      de: "Die Site als Lernreise gestaltet, nicht als Katalog. Der Besucher landet und versteht den Ort (Playa del Hombre, Telde). Vor den Preisen sieht er die Methode. Vor der Buchung lernt er Víctor kennen. Der Resident-Pass hat seinen eigenen Block, getrennt von Touristen, mit lokaler Konversion im Zentrum.",
    },
    results: {
      es: [
        "Web completa que explica el método antes que el precio",
        "Sistema de niveles 0-1 / 2-3 / 4+ visualizado como progresión",
        "Bono residente con bloque dedicado para captación local",
        "Sección Waya Kids con metodología infantil propia",
        "Página del fundador (Víctor Bueno Ureña) con peso editorial",
        "Estructura HTML estática · sin servidor · carga inmediata",
      ],
      en: [
        "Full site that explains the method before pricing",
        "Skill-level system 0-1 / 2-3 / 4+ visualized as progression",
        "Resident pass with a dedicated block for local capture",
        "Waya Kids section with its own kid-focused methodology",
        "Founder page (Víctor Bueno Ureña) with editorial weight",
        "Static HTML stack · no server · instant load",
      ],
      de: [
        "Komplette Site, die die Methode vor dem Preis erklärt",
        "Stufen-System 0-1 / 2-3 / 4+ als Progression visualisiert",
        "Resident-Pass mit eigenem Block für lokale Akquise",
        "Waya-Kids-Bereich mit eigener Kinder-Methodik",
        "Gründer-Seite (Víctor Bueno Ureña) mit redaktionellem Gewicht",
        "Statisches HTML · kein Server · sofortiger Ladevorgang",
      ],
    },
    features: {
      es: [
        "Hero con sentido de lugar — Playa del Hombre, Telde, Gran Canaria",
        "Bloque «método» con teoría en arena → práctica en agua",
        "Sistema de niveles visualizado como camino (0-1, 2-3, 4+)",
        "Servicios separados: clases, alquiler, surfcamp",
        "4 modalidades: grupales, privadas, semi-privadas, familiares",
        "Bono residente con tarifa local destacada",
        "Sección Waya Kids con metodología propia",
        "Página del fundador con storytelling editorial",
      ],
      en: [
        "Hero with sense of place — Playa del Hombre, Telde, Gran Canaria",
        "Method block: theory on sand → practice in water",
        "Skill-level system as a path (0-1, 2-3, 4+)",
        "Separated services: lessons, gear rental, surf camp",
        "4 modalities: group, private, semi-private, family",
        "Resident pass with featured local pricing",
        "Waya Kids section with its own methodology",
        "Founder page with editorial storytelling",
      ],
      de: [
        "Hero mit Ortsgefühl — Playa del Hombre, Telde, Gran Canaria",
        "Methoden-Block: Theorie am Sand → Praxis im Wasser",
        "Stufen-System als Weg (0-1, 2-3, 4+)",
        "Getrennte Services: Kurse, Materialverleih, Surfcamp",
        "4 Modalitäten: Gruppe, Privat, Semi-Privat, Familie",
        "Resident-Pass mit hervorgehobener lokaler Tarifierung",
        "Waya-Kids-Bereich mit eigener Methodik",
        "Gründer-Seite mit redaktionellem Storytelling",
      ],
    },
    testimonial: {
      quote: {
        es: "Víctor es un gran instructor, paciente y tranquilizador. Muy recomendable.",
        en: "Víctor is a great instructor, patient and reassuring. Highly recommended.",
        de: "Víctor ist ein großartiger Lehrer, geduldig und beruhigend. Sehr zu empfehlen.",
      },
      name: "Elena",
      role: {
        es: "Alumna · Google 5.0",
        en: "Student · Google 5.0",
        de: "Schülerin · Google 5.0",
      },
    },
    theme: {
      bg: "#ffffff",
      fg: "#1a1a1a",
      accent: "#FDD802",
      accentLight: "#ffe94d",
      font: "'Outfit', system-ui, sans-serif",
      tagBg: "#FDD802",
      tagText: "#1a1a1a",
      heroGradient:
        "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #FDD80230 100%)",
    },
    gallery: [
      {
        label: { es: "El lugar", en: "The place", de: "Der Ort" },
        description: {
          es: "Playa del Hombre, Telde — atlántico canario y arena volcánica",
          en: "Playa del Hombre, Telde — Canarian Atlantic and volcanic sand",
          de: "Playa del Hombre, Telde — kanarischer Atlantik und Vulkansand",
        },
      },
      {
        label: { es: "El método", en: "The method", de: "Die Methode" },
        description: {
          es: "Teoría en arena, práctica en agua. 95% se pone de pie en su primera clase.",
          en: "Theory on sand, practice in water. 95% stand up in their first class.",
          de: "Theorie am Sand, Praxis im Wasser. 95% stehen in der ersten Klasse.",
        },
      },
      {
        label: { es: "Víctor", en: "Víctor", de: "Víctor" },
        description: {
          es: "Víctor Bueno Ureña — 15 años titulado por la Federación Española de Surf",
          en: "Víctor Bueno Ureña — 15 years certified by the Spanish Surf Federation",
          de: "Víctor Bueno Ureña — 15 Jahre zertifiziert vom Spanischen Surfverband",
        },
      },
      {
        label: { es: "Bono residente", en: "Resident pass", de: "Resident-Pass" },
        description: {
          es: "Tarifa local separada del turista — fidelización en una isla turística",
          en: "Local pricing separated from tourists — retention on a tourist island",
          de: "Lokaler Tarif getrennt vom Touristen — Bindung auf einer Touristeninsel",
        },
      },
    ],
  },
  {
    slug: "internacional-pedro-lezcano",
    id: "10",
    title: "Internacional Pedro Lezcano",
    category: {
      es: "Web — Torneo internacional",
      en: "Web — International Tournament",
      de: "Web — Internationales Turnier",
    },
    description: {
      es: "Landing institucional para la XVIII Edición del Memorial Pedro Lezcano Montalvo 2026 — torneo internacional de ajedrez en Las Palmas con 22.000€ en premios y validez FIDE.",
      en: "Institutional landing for the XVIII Edition of Memorial Pedro Lezcano Montalvo 2026 — international chess tournament in Las Palmas with €22,000 in prizes and FIDE-rated.",
      de: "Institutionelle Landing für die XVIII. Ausgabe des Memorial Pedro Lezcano Montalvo 2026 — Internationales Schachturnier in Las Palmas mit 22.000€ Preisgeld und FIDE-Wertung.",
    },
    tags: ["Vite", "TypeScript", "HTML", "CSS", "Landing", "Evento", "Multilenguaje"],
    metrics: {
      es: "22.000€ premios · 9 rondas · 22 países · Validez FIDE",
      en: "€22,000 prizes · 9 rounds · 22 countries · FIDE-rated",
      de: "22.000€ Preisgeld · 9 Runden · 22 Länder · FIDE-Wertung",
    },
    year: "2026",
    featuredImage: "/projects/internacional-pedro-lezcano/poster.jpg",
    client: "Federación Insular de Ajedrez de Gran Canaria (FIAGC)",
    liveUrl: "https://internacionalpedrolezcano.es",
    longDescription: {
      es: "Landing oficial del torneo internacional de ajedrez más importante de Canarias. La XVIII edición reúne en Las Palmas a Grandes Maestros de todo el mundo durante 9 días para disputar una bolsa de 22.000€ bajo el sistema suizo. La web tenía que sostener cuatro audiencias a la vez — jugadores profesionales, aficionados locales, instituciones públicas y turismo — sin perder la solemnidad de un memorial.",
      en: "Official landing for the largest international chess tournament in the Canary Islands. The 18th edition brings Grandmasters from across the world to Las Palmas for 9 days to compete for a €22,000 prize pool under Swiss system. The site had to serve four audiences at once — professional players, local fans, public institutions and tourism — without losing the gravity of a memorial event.",
      de: "Offizielle Landing für das größte internationale Schachturnier der Kanarischen Inseln. Die 18. Ausgabe versammelt 9 Tage lang Großmeister aus aller Welt in Las Palmas um ein Preisgeld von 22.000€ nach Schweizer System. Die Site musste vier Zielgruppen gleichzeitig bedienen — Profi-Spieler, lokale Fans, öffentliche Institutionen und Tourismus — ohne die Würde eines Memorials zu verlieren.",
    },
    challenge: {
      es: "Un torneo institucional con muchas capas: bases técnicas FIDE, categorías por edad y ELO, palmarés histórico, ritmo de partidas, alojamiento oficial, sponsors públicos (Cabildo, Ayuntamiento, IMD, Federación), inscripción con pago bancario, retransmisión en 5 plataformas y un componente turístico de la isla. Diez secciones que no pueden chocar. Y todo bajo el peso de un memorial — Pedro Lezcano fue figura cultural en Canarias.",
      en: "An institutional tournament with many layers: FIDE technical rules, age and ELO categories, historical roll of honour, time controls, official lodging, public sponsors (Cabildo, City Council, IMD, Federation), entry with bank transfer, livestream on 5 platforms and a tourism component for the island. Ten sections that can't collide. And all under the weight of a memorial — Pedro Lezcano was a cultural figure in the Canaries.",
      de: "Ein institutionelles Turnier mit vielen Ebenen: FIDE-Regeln, Alters- und ELO-Kategorien, historische Bestenliste, Bedenkzeit, offizielle Unterkunft, öffentliche Sponsoren (Cabildo, Stadtverwaltung, IMD, Verband), Anmeldung per Banküberweisung, Livestream auf 5 Plattformen und eine Tourismus-Komponente. Zehn Abschnitte, die nicht kollidieren dürfen. Alles unter dem Gewicht eines Memorials — Pedro Lezcano war eine kulturelle Figur auf den Kanaren.",
    },
    solution: {
      es: "Diseñé la web como un tablero: 10 secciones numeradas, jerarquía editorial fuerte y un único hilo dorado conduciendo la lectura. Hero charcoal con grid de tablero sutil, cita memorial visible desde el primer scroll, y la bolsa de 22.000€ tratada como dato vendedor. Sponsors institucionales separados del flujo comercial. Formulario de inscripción con datos bancarios reales y subida de justificante. Build estático con Vite — carga inmediata desde cualquier punto del mundo.",
      en: "I designed the site like a chessboard: 10 numbered sections, strong editorial hierarchy and a single golden thread guiding the read. Charcoal hero with subtle board grid, memorial quote visible from first scroll, and the €22,000 prize pool treated as the headline figure. Institutional sponsors separated from the commercial flow. Entry form with real banking details and proof-of-payment upload. Static build with Vite — instant load from anywhere.",
      de: "Ich gestaltete die Site wie ein Schachbrett: 10 nummerierte Abschnitte, starke redaktionelle Hierarchie und ein goldener Faden, der durchs Lesen führt. Charcoal-Hero mit dezentem Brett-Grid, Memorial-Zitat vom ersten Scroll an sichtbar, und das Preisgeld von 22.000€ als Headline-Zahl. Institutionelle Sponsoren vom kommerziellen Fluss getrennt. Anmeldeformular mit echten Bankdaten und Beleg-Upload. Statischer Vite-Build — sofortiger Ladevorgang weltweit.",
    },
    results: {
      es: [
        "Landing oficial con 10 secciones numeradas y jerarquía editorial clara",
        "22.000€ en premios como dato hero, no escondido en bases PDF",
        "Cronograma de 9 rondas con enlaces en directo a 5 plataformas (Chess-Results, Lichess, Chess.com, Chessbase, Info64)",
        "Formulario de inscripción con cuota dinámica (early/late), exención GM/IM y subida de justificante bancario",
        "Bloque de alojamiento oficial con 2 hoteles y tarifas reales",
        "Footer institucional con 8 sponsors (Cabildo, Ayuntamiento, IMD, FECA, FIAGC, clubs)",
        "Multilenguaje preparado (ES principal, EN en desarrollo)",
        "Build estático con Vite — Lighthouse > 95 sin trampas",
      ],
      en: [
        "Official landing with 10 numbered sections and clear editorial hierarchy",
        "€22,000 prize pool as a hero figure, not hidden inside a PDF",
        "9-round schedule with live links to 5 platforms (Chess-Results, Lichess, Chess.com, Chessbase, Info64)",
        "Entry form with dynamic fee (early/late), GM/IM exemption and proof-of-payment upload",
        "Official lodging block with 2 hotels and real rates",
        "Institutional footer with 8 sponsors (Cabildo, City Council, IMD, FECA, FIAGC, clubs)",
        "Multi-language ready (ES main, EN in progress)",
        "Static Vite build — Lighthouse > 95 honestly",
      ],
      de: [
        "Offizielle Landing mit 10 nummerierten Abschnitten und klarer redaktioneller Hierarchie",
        "22.000€ Preisgeld als Hero-Zahl, nicht in einer PDF versteckt",
        "9-Runden-Programm mit Live-Links zu 5 Plattformen (Chess-Results, Lichess, Chess.com, Chessbase, Info64)",
        "Anmeldeformular mit dynamischer Gebühr (early/late), GM/IM-Befreiung und Beleg-Upload",
        "Block offizielle Unterkunft mit 2 Hotels und echten Tarifen",
        "Institutioneller Footer mit 8 Sponsoren (Cabildo, Stadtverwaltung, IMD, FECA, FIAGC, Clubs)",
        "Mehrsprachig vorbereitet (ES Haupt, EN in Arbeit)",
        "Statischer Vite-Build — Lighthouse > 95 ehrlich",
      ],
    },
    features: {
      es: [
        "Hero charcoal con grid de tablero sutil y cita memorial visible",
        "Bolsa de premios de 22.000€ tratada como headline",
        "10 secciones numeradas con jerarquía editorial",
        "Cronograma de 9 rondas con live links externos",
        "Formulario de inscripción con lógica de cuota dinámica",
        "Bloque de alojamiento oficial con 2 hoteles + tarifas",
        "Footer institucional con grid de sponsors públicos",
        "Tipografía Merriweather + Inter — autoridad editorial",
      ],
      en: [
        "Charcoal hero with subtle board grid and visible memorial quote",
        "€22,000 prize pool treated as headline",
        "10 numbered sections with editorial hierarchy",
        "9-round schedule with external live links",
        "Entry form with dynamic fee logic",
        "Official lodging block with 2 hotels + rates",
        "Institutional footer with public-sponsor grid",
        "Merriweather + Inter typography — editorial authority",
      ],
      de: [
        "Charcoal-Hero mit dezentem Brett-Grid und sichtbarem Memorial-Zitat",
        "Preisgeld von 22.000€ als Headline",
        "10 nummerierte Abschnitte mit redaktioneller Hierarchie",
        "9-Runden-Programm mit externen Live-Links",
        "Anmeldeformular mit dynamischer Gebühren-Logik",
        "Block offizielle Unterkunft mit 2 Hotels + Tarifen",
        "Institutioneller Footer mit Grid öffentlicher Sponsoren",
        "Typografie Merriweather + Inter — redaktionelle Autorität",
      ],
    },
    testimonial: {
      quote: {
        es: "«El ajedrez es la vida en miniatura.»",
        en: "\"Chess is life in miniature.\"",
        de: "„Schach ist das Leben im Kleinen.\"",
      },
      name: "Pedro Lezcano Montalvo",
      role: {
        es: "Poeta · Memorial",
        en: "Poet · Memorial",
        de: "Dichter · Memorial",
      },
    },
    theme: {
      bg: "#f9f8f6",
      fg: "#0e131f",
      accent: "#c5a059",
      accentLight: "#e8d8a8",
      font: "'Merriweather', Georgia, serif",
      tagBg: "#e8d8a8",
      tagText: "#0e131f",
      heroGradient:
        "linear-gradient(135deg, #0e131f 0%, #1e293b 50%, #c5a05930 100%)",
    },
    gallery: [
      {
        label: { es: "Cartel oficial", en: "Official poster", de: "Offizielles Plakat" },
        description: {
          es: "Cartel del Memorial XVIII Edición · 28 marzo – 5 abril 2026",
          en: "Memorial XVIII Edition poster · 28 March – 5 April 2026",
          de: "Memorial XVIII Edition Plakat · 28. März – 5. April 2026",
        },
      },
      {
        label: { es: "La sede", en: "The venue", de: "Der Veranstaltungsort" },
        description: {
          es: "Círculo Mercantil, C/ San Bernardo — corazón institucional de Las Palmas",
          en: "Círculo Mercantil, C/ San Bernardo — institutional heart of Las Palmas",
          de: "Círculo Mercantil, C/ San Bernardo — institutionelles Herz von Las Palmas",
        },
      },
      {
        label: { es: "9 rondas", en: "9 rounds", de: "9 Runden" },
        description: {
          es: "Sistema suizo, 90'+30''. Validez para normas GM/MI y ELO FIDE.",
          en: "Swiss system, 90'+30''. Valid for GM/IM norms and FIDE ELO.",
          de: "Schweizer System, 90'+30''. Gültig für GM/IM-Normen und FIDE-ELO.",
        },
      },
      {
        label: { es: "Sponsors públicos", en: "Public sponsors", de: "Öffentliche Sponsoren" },
        description: {
          es: "Cabildo, IMD, Ayuntamiento, FECA, FIAGC — el peso institucional del torneo",
          en: "Cabildo, IMD, City Council, FECA, FIAGC — the institutional weight of the event",
          de: "Cabildo, IMD, Stadtverwaltung, FECA, FIAGC — das institutionelle Gewicht",
        },
      },
    ],
  },
  {
    slug: "jm-padel-academy",
    id: "11",
    title: "JM Padel Academy",
    category: {
      es: "Web + Branding — Academia de pádel",
      en: "Web + Branding — Padel Academy",
      de: "Web + Branding — Padel-Akademie",
    },
    description: {
      es: "Sistema completo: identidad visual, web con e-commerce, 8 guías formativas, ebook y vídeos de método. Branding y desarrollo full-stack para una academia que quería diferenciarse de verdad.",
      en: "Full system: visual identity, website with e-commerce, 8 training guides, ebook and method videos. Branding and full-stack development for an academy that wanted to actually stand out.",
      de: "Komplettes System: visuelle Identität, Website mit E-Commerce, 8 Lern-Guides, Ebook und Methoden-Videos. Branding und Full-Stack-Entwicklung für eine Akademie, die sich wirklich abheben wollte.",
    },
    tags: ["Vite", "React", "Stripe", "Vercel", "Branding", "E-commerce", "Vídeo", "RRSS"],
    metrics: {
      es: "Identidad · Web full-stack · 3 vídeos · 8 guías · Stripe · Newsletter",
      en: "Identity · Full-stack web · 3 videos · 8 guides · Stripe · Newsletter",
      de: "Identität · Full-Stack-Web · 3 Videos · 8 Guides · Stripe · Newsletter",
    },
    year: "2025",
    liveUrl: "https://jmpadelacademy.com",
    featuredImage: "/projects/jm-padel-academy/cover-court.png",
    client: "JM Padel Academy",
    longDescription: {
      es: "Eleva tu juego. Ese era el brief en tres palabras. JM Padel Academy necesitaba una identidad que se sintiera deportiva sin caer en lo genérico — y que pudiera estirarse a redes, ebook, merchandising y aplicaciones futuras sin perder coherencia. Construí un sistema visual partiendo de la geometría de la propia pista de pádel: el marco, las líneas de juego y la pelota como puntos de tensión.",
      en: "Step up your game. That was the brief in three words. JM Padel Academy needed an identity that felt sporty without falling into the generic — and that could stretch to social, ebook, merchandise and future applications without losing coherence. I built a visual system starting from the geometry of the padel court itself: the frame, the playing lines and the ball as points of tension.",
      de: "Steigere dein Spiel. Das war der Brief in drei Worten. JM Padel Academy brauchte eine Identität, die sportlich wirkt, ohne ins Generische zu fallen — und die sich auf Social, Ebook, Merchandise und zukünftige Anwendungen ausdehnen lässt, ohne Kohärenz zu verlieren. Ich baute ein visuelles System ausgehend von der Geometrie des Padel-Platzes selbst: der Rahmen, die Spiellinien und der Ball als Spannungspunkte.",
    },
    challenge: {
      es: "Las academias de pádel suelen comunicar igual: foto de raqueta sobre fondo azul, fuente bold genérica, eslogan vacío. JM quería diferenciarse — pero sin perder la masculinidad y la energía que el deporte exige. Y necesitaba un sistema, no un logo suelto: tenía que sostener un manual de marca, un ebook formativo de 10 capítulos y una línea editorial para redes durante todo el año.",
      en: "Padel academies usually communicate the same way: racket photo on blue background, generic bold font, empty slogan. JM wanted to stand out — without losing the masculinity and energy the sport demands. And they needed a system, not a single logo: it had to support a brand book, a 10-chapter training ebook and an editorial line for social media for the whole year.",
      de: "Padel-Akademien kommunizieren meist gleich: Schlägerfoto auf blauem Hintergrund, generische Bold-Schrift, leerer Slogan. JM wollte sich abheben — ohne die Männlichkeit und Energie zu verlieren, die der Sport verlangt. Und sie brauchten ein System, kein einzelnes Logo: es musste ein Markenhandbuch, ein 10-Kapitel-Lern-Ebook und eine redaktionelle Linie für Social Media für das ganze Jahr tragen.",
    },
    solution: {
      es: "Diseñé el logotipo como una representación geométrica de la pista: dos marcos en L que encierran las palabras «JM PADEL ACADEMY», una pala con líneas de movimiento y la pelota verde lima como el único punto orgánico. Paleta dual: azul royal de marca + verde lima de pelota, sobre blanco o negro según contexto. Tipografía Saira Condensed Italic Bold — deportiva y con velocidad, sin ser militar. El sistema se aplica al ebook «10 mandamientos del pádel», a plantillas de Instagram y a mockups web — todo en el mismo lenguaje.",
      en: "I designed the logotype as a geometric representation of the court: two L-shaped frames containing the words \"JM PADEL ACADEMY\", a racket with motion lines and the lime green ball as the only organic point. Dual palette: brand royal blue + ball lime green, on white or black depending on context. Typography Saira Condensed Italic Bold — sporty and with speed, without being military. The system applies to the ebook \"10 padel commandments\", to Instagram templates and to web mockups — all in the same language.",
      de: "Ich entwarf das Logo als geometrische Darstellung des Platzes: zwei L-förmige Rahmen mit den Wörtern „JM PADEL ACADEMY\", einen Schläger mit Bewegungslinien und den limettengrünen Ball als einzigen organischen Punkt. Duale Palette: Marken-Royalblau + Ball-Limettengrün, auf Weiß oder Schwarz je nach Kontext. Typografie Saira Condensed Italic Bold — sportlich und mit Geschwindigkeit, ohne militärisch zu wirken. Das System gilt für das Ebook „10 Padel-Gebote\", für Instagram-Vorlagen und für Web-Mockups — alles in derselben Sprache.",
    },
    results: {
      es: [
        "Identidad visual completa: logo, isotipo, versiones color/mono/dark",
        "Manual de marca con usos, paleta, tipografía y aplicaciones",
        "Ebook formativo «10 mandamientos del pádel» con identidad consistente",
        "Plantillas de redes sociales para Instagram listas para mensual",
        "Mockup web hi-fi con sistema aplicado a una landing real",
        "Tagline: «Eleva tu juego» — declarado en el manual como concepto guía",
        "Sistema escalable a merchandising, web, vídeo y nuevas aplicaciones",
      ],
      en: [
        "Full visual identity: logo, isotype, color/mono/dark versions",
        "Brand book with uses, palette, typography and applications",
        "Training ebook \"10 padel commandments\" with consistent identity",
        "Instagram social templates ready for monthly publishing",
        "Hi-fi web mockup with the system applied to a real landing",
        "Tagline: \"Step up your game\" — set in the brand book as guiding concept",
        "System scalable to merchandise, web, video and new applications",
      ],
      de: [
        "Komplette visuelle Identität: Logo, Isotyp, Farb-/Mono-/Dark-Versionen",
        "Markenhandbuch mit Anwendungen, Palette, Typografie",
        "Lern-Ebook „10 Padel-Gebote\" mit konsistenter Identität",
        "Instagram-Social-Vorlagen, bereit für monatliche Veröffentlichung",
        "Hi-Fi-Web-Mockup mit dem System auf einer echten Landing",
        "Tagline: „Steigere dein Spiel\" — im Handbuch als Leitkonzept gesetzt",
        "Skalierbares System für Merchandise, Web, Video und neue Anwendungen",
      ],
    },
    features: {
      es: [
        "Logo basado en la geometría de la pista (dos marcos en L)",
        "Pelota verde lima como único elemento orgánico",
        "Paleta dual: azul royal + verde lima, sobre blanco o negro",
        "4 versiones del logo: color, mono negro, mono blanco, isotipo",
        "Saira Condensed Italic Bold como tipografía display",
        "Ebook «10 mandamientos del pádel» como pieza editorial",
        "Plantillas de RRSS Instagram con grid coherente",
        "Mockup hi-fi de web con la identidad aplicada",
      ],
      en: [
        "Logo based on court geometry (two L-frames)",
        "Lime green ball as the only organic element",
        "Dual palette: royal blue + lime green, on white or black",
        "4 logo versions: color, black mono, white mono, isotype",
        "Saira Condensed Italic Bold as display typography",
        "Ebook \"10 padel commandments\" as editorial piece",
        "Instagram social templates with consistent grid",
        "Hi-fi web mockup with the identity applied",
      ],
      de: [
        "Logo basierend auf Platz-Geometrie (zwei L-Rahmen)",
        "Limettengrüner Ball als einziges organisches Element",
        "Duale Palette: Royal-Blau + Limettengrün, auf Weiß oder Schwarz",
        "4 Logo-Versionen: Farbe, Mono schwarz, Mono weiß, Isotyp",
        "Saira Condensed Italic Bold als Display-Typografie",
        "Ebook „10 Padel-Gebote\" als redaktionelles Stück",
        "Instagram-Social-Vorlagen mit konsistentem Grid",
        "Hi-Fi-Web-Mockup mit der angewandten Identität",
      ],
    },
    theme: {
      bg: "#F4F1E8",
      fg: "#0E1A2B",
      accent: "#3858B8",
      accentLight: "#E0F657",
      font: "'Archivo', system-ui, sans-serif",
      tagBg: "#E0F657",
      tagText: "#0E1A2B",
      heroGradient:
        "linear-gradient(135deg, #3858B8 0%, #283F86 50%, #E0F65730 100%)",
    },
    gallery: [
      {
        label: { es: "La pista", en: "The court", de: "Der Platz" },
        description: {
          es: "Logo principal sobre el sistema visual de la pista de pádel",
          en: "Main logo over the padel court visual system",
          de: "Hauptlogo über dem visuellen System des Padel-Platzes",
        },
      },
      {
        label: { es: "El sistema", en: "The system", de: "Das System" },
        description: {
          es: "Cuatro versiones del logo: color, mono blanco, mono negro, isotipo",
          en: "Four logo versions: color, white mono, black mono, isotype",
          de: "Vier Logo-Versionen: Farbe, Mono weiß, Mono schwarz, Isotyp",
        },
      },
      {
        label: { es: "La aplicación", en: "The application", de: "Die Anwendung" },
        description: {
          es: "Mockup de la web con la identidad aplicada — fotos, cards, stats",
          en: "Web mockup with applied identity — photos, cards, stats",
          de: "Web-Mockup mit angewandter Identität — Fotos, Cards, Stats",
        },
      },
      {
        label: { es: "El tono", en: "The tone", de: "Der Ton" },
        description: {
          es: "Aplicación épica con foto real y tagline «Eleva tu juego»",
          en: "Epic application with real photo and tagline \"Step up your game\"",
          de: "Epische Anwendung mit echtem Foto und Tagline „Steigere dein Spiel\"",
        },
      },
    ],
  },
  {
    slug: "kujme",
    id: "12",
    title: "Kujme",
    category: {
      es: "SaaS — 12 agentes IA de marketing",
      en: "SaaS — 12 AI marketing agents",
      de: "SaaS — 12 KI-Marketing-Agenten",
    },
    description: {
      es: "Doce agentes IA jerárquicos que generan, publican y miden contenido todos los días por menos de 6€/mes. Newsletter, blog SEO, posts LinkedIn y emails de conversión — sin tocar nada. Diseño industrial postal.",
      en: "Twelve hierarchical AI agents that generate, publish and measure content every day for under €6/month. Newsletter, SEO blog, LinkedIn posts and conversion emails — hands-off. Industrial postal design.",
      de: "Zwölf hierarchische KI-Agenten, die täglich Inhalte für unter 6€/Monat erstellen, veröffentlichen und messen. Newsletter, SEO-Blog, LinkedIn-Posts und Konversions-Emails — komplett automatisch. Industrielles Postal-Design.",
    },
    tags: ["Node.js", "Express", "SQLite", "React", "Tailwind", "Claude", "GPT-4o", "Gemini"],
    metrics: {
      es: "12 agentes IA · 7 APIs · $6/mes operativo · Publicación diaria",
      en: "12 AI agents · 7 APIs · $6/mo operating cost · Daily publishing",
      de: "12 KI-Agenten · 7 APIs · $6/Monat Betrieb · Tägliche Veröffentlichung",
    },
    year: "2026",
    client: "Producto propio · Felipe Cámara",
    liveUrl: "https://kujme.es",
    longDescription: {
      es: "Kujme empezó como herramienta interna y se convirtió en un equipo entero de marketing automatizado. Doce agentes IA jerárquicos — Director, Noticiero, Redactor, Publicador, Auditor SEO, Analista, Vigilante y otros — generan, revisan, publican y miden contenido todos los días sin tocar nada. Blog SEO, posts LinkedIn (Felipe + Kujme), emails de nurture, comentarios, análisis competitivos. Coste operativo real: $6 al mes. Estética industrial postal: shipping labels, listas tipo manifiesto, dashed separators, sin sombras y sin gradientes.",
      en: "Kujme started as an internal tool and grew into a fully automated marketing team. Twelve hierarchical AI agents — Director, News, Writer, Publisher, SEO Auditor, Analyst, Watchdog and others — generate, review, publish and measure content every day, hands-off. SEO blog, LinkedIn posts (Felipe + Kujme), nurture emails, comments, competitor analysis. Real operating cost: $6/month. Industrial postal aesthetics: shipping labels, manifesto-style lists, dashed separators, no shadows and no gradients.",
      de: "Kujme begann als internes Tool und wuchs zu einem voll automatisierten Marketing-Team. Zwölf hierarchische KI-Agenten — Direktor, Nachrichten, Redakteur, Publisher, SEO-Auditor, Analyst, Wachhund und andere — erstellen, prüfen, veröffentlichen und messen täglich Inhalte, komplett automatisch. SEO-Blog, LinkedIn-Posts (Felipe + Kujme), Nurture-Emails, Kommentare, Wettbewerbsanalysen. Realer Betriebskosten: $6/Monat. Industrielle Postal-Ästhetik: Shipping Labels, Manifest-artige Listen, gestrichelte Trennlinien, keine Schatten und keine Gradienten.",
    },
    challenge: {
      es: "Un equipo de marketing de PYME cuesta entre 3.000 y 8.000€ al mes: un community manager, un redactor SEO, alguien de analítica, alguien que coordine. Y aun así muchos días no se publica nada porque alguien está de vacaciones, de baja, o simplemente no tiene tiempo. Las herramientas tipo Buffer o Hootsuite programan, pero no generan ni miden. ChatGPT genera pero no publica ni mantiene coherencia. Hacía falta un sistema que orquestara IAs de verdad — con jerarquía, con cron, con memoria y con auditoría — para que el contenido saliera todos los días, en su sitio, con calidad medible.",
      en: "An SMB marketing team costs between €3,000 and €8,000 a month: a community manager, an SEO writer, someone for analytics, someone to coordinate. And still many days nothing gets published — someone's on holiday, on leave, or simply has no time. Tools like Buffer or Hootsuite schedule but don't generate or measure. ChatGPT generates but doesn't publish or keep coherence. A system was needed to orchestrate AIs for real — with hierarchy, with cron, with memory and with auditing — so content goes out every day, in its place, with measurable quality.",
      de: "Ein KMU-Marketing-Team kostet zwischen 3.000 und 8.000€ pro Monat: ein Community Manager, ein SEO-Redakteur, jemand für Analytics, jemand zur Koordination. Und trotzdem wird an vielen Tagen nichts veröffentlicht — jemand ist im Urlaub, krank oder hat keine Zeit. Tools wie Buffer oder Hootsuite planen, aber generieren oder messen nicht. ChatGPT generiert, aber veröffentlicht nicht oder hält keine Kohärenz. Es brauchte ein System, das KIs wirklich orchestriert — mit Hierarchie, mit Cron, mit Gedächtnis und mit Auditing — damit Inhalte jeden Tag herauskommen, an ihrem Platz, mit messbarer Qualität.",
    },
    solution: {
      es: "Construí un sistema de 12 agentes jerárquicos en Node.js + Express + SQLite + node-cron. Cada agente tiene su rol, su modelo IA óptimo (Claude Sonnet para estrategia, GPT-4o-mini para producción, Gemini Flash para emails), su frecuencia de cron y su nivel de autonomía. El Director planifica cada mañana basándose en métricas reales (GA4, Search Console) y noticias frescas (8 feeds RSS). El Redactor genera blog SEO, posts LinkedIn y emails. El Auditor SEO los revisa y los corrige con Claude si bajan de un umbral de calidad. El Publicador publica en su sitio (blog, LinkedIn API, Brevo). El Vigilante monitoriza errores y reinicia agentes caídos. Todo orquestado por un dashboard React con barra de comandos. Coste final: $3 Claude + $3 GPT + Gemini gratis = **$6/mes**.",
      en: "I built a 12-agent hierarchical system on Node.js + Express + SQLite + node-cron. Each agent has its role, its optimal AI model (Claude Sonnet for strategy, GPT-4o-mini for production, Gemini Flash for emails), its cron frequency and its autonomy level. The Director plans each morning based on real metrics (GA4, Search Console) and fresh news (8 RSS feeds). The Writer generates SEO blog, LinkedIn posts and emails. The SEO Auditor reviews and corrects them with Claude if they drop below a quality threshold. The Publisher publishes wherever it belongs (blog, LinkedIn API, Brevo). The Watchdog monitors errors and restarts dead agents. All orchestrated by a React dashboard with a command bar. Final cost: $3 Claude + $3 GPT + Gemini free = **$6/month**.",
      de: "Ich baute ein 12-Agenten-hierarchisches System auf Node.js + Express + SQLite + node-cron. Jeder Agent hat seine Rolle, sein optimales KI-Modell (Claude Sonnet für Strategie, GPT-4o-mini für Produktion, Gemini Flash für Emails), seine Cron-Frequenz und seinen Autonomie-Grad. Der Direktor plant jeden Morgen basierend auf echten Metriken (GA4, Search Console) und frischen News (8 RSS-Feeds). Der Redakteur generiert SEO-Blog, LinkedIn-Posts und Emails. Der SEO-Auditor prüft und korrigiert sie mit Claude, wenn sie unter eine Qualitätsschwelle fallen. Der Publisher veröffentlicht, wo es hingehört (Blog, LinkedIn API, Brevo). Der Wachhund überwacht Fehler und startet tote Agenten neu. Alles orchestriert von einem React-Dashboard mit Kommando-Leiste. Endkosten: $3 Claude + $3 GPT + Gemini gratis = **$6/Monat**.",
    },
    results: {
      es: [
        "12 agentes IA operativos 24/7 con jerarquía y autonomía propia",
        "7 APIs integradas: OpenAI, Claude, Gemini, Google News RSS, LinkedIn, Brevo, GA4 + Search Console",
        "Publicación diaria automatizada: blog, LinkedIn (Felipe + empresa), email newsletter",
        "Auditor SEO con corrección automática (threshold 85+, loop 3 intentos con Claude)",
        "Sección «Historias» con rotación: Felipe escribe contexto real → agentes lo usan para autenticidad",
        "Dashboard con barra de comandos en lenguaje natural",
        "Stack: Node + Express + SQLite + node-cron + React + Tailwind",
        "Coste operativo real verificado: $6/mes",
      ],
      en: [
        "12 AI agents running 24/7 with hierarchy and their own autonomy",
        "7 APIs integrated: OpenAI, Claude, Gemini, Google News RSS, LinkedIn, Brevo, GA4 + Search Console",
        "Daily automated publishing: blog, LinkedIn (Felipe + company), email newsletter",
        "SEO Auditor with auto-correction (85+ threshold, 3-attempt loop with Claude)",
        "\"Stories\" section with rotation: Felipe writes real context → agents use it for authenticity",
        "Dashboard with a natural-language command bar",
        "Stack: Node + Express + SQLite + node-cron + React + Tailwind",
        "Verified real operating cost: $6/month",
      ],
      de: [
        "12 KI-Agenten 24/7 mit eigener Hierarchie und Autonomie",
        "7 APIs integriert: OpenAI, Claude, Gemini, Google News RSS, LinkedIn, Brevo, GA4 + Search Console",
        "Tägliche automatisierte Veröffentlichung: Blog, LinkedIn (Felipe + Firma), Email-Newsletter",
        "SEO-Auditor mit Auto-Korrektur (Schwelle 85+, 3-Versuche-Loop mit Claude)",
        "„Stories\"-Bereich mit Rotation: Felipe schreibt echten Kontext → Agenten nutzen ihn für Authentizität",
        "Dashboard mit natürlichsprachiger Kommando-Leiste",
        "Stack: Node + Express + SQLite + node-cron + React + Tailwind",
        "Verifizierte reale Betriebskosten: $6/Monat",
      ],
    },
    features: {
      es: [
        "Director — Claude Sonnet · planifica el día, delega briefings",
        "Noticiero — GPT-4o-mini · 8 feeds RSS reales todos los días 6AM",
        "Redactor — GPT-4o + Gemini · blog SEO, LinkedIn, emails",
        "Publicador — sin IA · publica cada 30 min en su sitio",
        "Cazador — GPT-4o-mini · oportunidades comerciales 2×/día",
        "Nurture — Gemini Flash · emails de conversión miércoles",
        "Comentarista LinkedIn — sugerencias diarias con link directo",
        "Auditor SEO + Analista + Product Scout + Vigilante",
      ],
      en: [
        "Director — Claude Sonnet · plans the day, delegates briefings",
        "News — GPT-4o-mini · 8 real RSS feeds every day at 6AM",
        "Writer — GPT-4o + Gemini · SEO blog, LinkedIn, emails",
        "Publisher — no AI · publishes every 30 min where it belongs",
        "Hunter — GPT-4o-mini · commercial opportunities 2×/day",
        "Nurture — Gemini Flash · conversion emails Wednesdays",
        "LinkedIn Commenter — daily suggestions with direct links",
        "SEO Auditor + Analyst + Product Scout + Watchdog",
      ],
      de: [
        "Direktor — Claude Sonnet · plant den Tag, delegiert Briefings",
        "Nachrichten — GPT-4o-mini · 8 echte RSS-Feeds täglich 6 Uhr",
        "Redakteur — GPT-4o + Gemini · SEO-Blog, LinkedIn, Emails",
        "Publisher — ohne KI · veröffentlicht alle 30 Min am richtigen Ort",
        "Jäger — GPT-4o-mini · kommerzielle Chancen 2×/Tag",
        "Nurture — Gemini Flash · Konversions-Emails mittwochs",
        "LinkedIn-Kommentator — tägliche Vorschläge mit Direktlinks",
        "SEO-Auditor + Analyst + Product Scout + Wachhund",
      ],
    },
    theme: {
      bg: "#f0ebe3",
      fg: "#1a1a2e",
      accent: "#1a1a2e",
      accentLight: "#faf7f2",
      font: "'Inter', system-ui, sans-serif",
      tagBg: "#1a1a2e",
      tagText: "#faf7f2",
      heroGradient:
        "linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 50%, #c4b8a830 100%)",
    },
    gallery: [
      {
        label: { es: "Director", en: "Director", de: "Direktor" },
        description: {
          es: "Claude Sonnet planifica el día a las 6:30 — lee métricas y noticias, delega briefings",
          en: "Claude Sonnet plans the day at 6:30 — reads metrics and news, delegates briefings",
          de: "Claude Sonnet plant den Tag um 6:30 — liest Metriken und News, delegiert Briefings",
        },
      },
      {
        label: { es: "Redactor", en: "Writer", de: "Redakteur" },
        description: {
          es: "GPT-4o + Gemini Flash · blog SEO con imágenes Unsplash, LinkedIn y emails diarios",
          en: "GPT-4o + Gemini Flash · SEO blog with Unsplash images, LinkedIn and daily emails",
          de: "GPT-4o + Gemini Flash · SEO-Blog mit Unsplash-Bildern, LinkedIn und tägliche Emails",
        },
      },
      {
        label: { es: "Auditor", en: "Auditor", de: "Auditor" },
        description: {
          es: "GPT audita, Claude corrige · loop hasta 3 intentos hasta superar threshold 85",
          en: "GPT audits, Claude corrects · loop up to 3 attempts until passing threshold 85",
          de: "GPT auditiert, Claude korrigiert · Loop bis zu 3 Versuche bis Schwelle 85 erreicht",
        },
      },
      {
        label: { es: "Vigilante", en: "Watchdog", de: "Wachhund" },
        description: {
          es: "Cada 15 min revisa 10 patrones de error y reactiva agentes caídos sin pedir permiso",
          en: "Every 15 min checks 10 error patterns and restarts dead agents without asking",
          de: "Alle 15 Min prüft 10 Fehlermuster und startet tote Agenten ohne zu fragen neu",
        },
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
