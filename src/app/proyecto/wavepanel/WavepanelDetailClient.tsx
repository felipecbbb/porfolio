"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const NAVY = "#0d2f38";
const NAVY_DEEP = "#081e25";
const NAVY_CARD = "#143843";
const YELLOW = "#ffcc00";
const CREAM = "#f5f1e4";
const WHITE = "#ffffff";
const MUTED_DARK = "rgba(255,255,255,0.65)";
const MUTED_LIGHT = "rgba(13,47,56,0.6)";
const FAINT_DARK = "rgba(255,255,255,0.35)";
const LINE_LIGHT = "rgba(13,47,56,0.12)";
const LINE_DARK = "rgba(255,255,255,0.14)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "'Manrope', system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

const T: Record<Lang, {
  numLocale: string;
  badge: string;
  caseN: string;
  hero1: string;
  hero2: string;
  heroPpre: string;
  heroPpost: string;
  visit: string;
  seeEntreOlas: string;
  panelDate: string;
  panelHi: string;
  weekRevenue: string;
  weekDelta: string;
  panelStats: { label: string; value: number; suffix: string }[];
  upcoming: string;
  bookings: { t: string; title: string; left: string; accent: string }[];
  stats: { n: string; suffix: string; label: string }[];
  storyLabel: string;
  storyTitleA: string;
  storyTitleB: string;
  storyP1: string;
  storyP2: string;
  modulesLabel: string;
  modulesTitleA: string;
  modulesTitleHl: string;
  modulesP: string;
  modules: { n: string; emoji: string; title: string; desc: string; highlight?: boolean }[];
  howLabel: string;
  howTitleA: string;
  howTitleHl: string;
  howP: string;
  steps: { n: string; title: string; desc: string }[];
  testLabel: string;
  testQuoteA: string;
  testQuoteHl: string;
  testQuoteB: string;
  testCite: string;
  plansLabel: string;
  plansTitleA: string;
  plansTitleHl: string;
  plans: {
    name: string; price: string; suffix: string; sub: string;
    features: string[]; cta: string;
    popular?: boolean; lifetime?: boolean;
  }[];
  popular: string;
  oneTime: string;
  realLabel: string;
  realTitleA: string;
  realTitleHl: string;
  realP: string;
  realCta: string;
  hood: string;
  hoodTitleA: string;
  hoodTitleHl: string;
  closingTitleA: string;
  closingTitleHl: string;
  closingP: string;
  ctaSee: string;
  ctaAll: string;
  footerNote: string;
  ownProduct: string;
}> = {
  es: {
    numLocale: "es-ES",
    badge: "Software para escuelas de surf",
    caseN: "Caso de estudio · 01",
    hero1: "Tu escuela.",
    hero2: "Digitalizada.",
    heroPpre:
      "Panel de gestión completo, web pública, reservas online, tienda y pagos. Todo lo que necesita una escuela de surf, kite o deportes acuáticos. Desde ",
    heroPpost: "29€/mes",
    visit: "Visitar wavepanel.app",
    seeEntreOlas: "Ver Entre Olas",
    panelDate: "Lun 20 Abr",
    panelHi: "Buenos días, Entre Olas",
    weekRevenue: "Ingresos · semana en curso",
    weekDelta: "vs. semana anterior",
    panelStats: [
      { label: "Reservas", value: 47, suffix: "" },
      { label: "Ocupación", value: 82, suffix: "%" },
      { label: "Bonos", value: 12, suffix: "" },
    ],
    upcoming: "Próximas clases",
    bookings: [
      { t: "09:30", title: "Grupal · Roche · 6 plazas", left: "3 libres", accent: YELLOW },
      { t: "11:00", title: "Individual · Carmen L.", left: "COMPLETA", accent: WHITE },
      { t: "16:00", title: "Surf Camp · Villa", left: "12/12", accent: YELLOW },
    ],
    stats: [
      { n: "0", suffix: "%", label: "Comisión por reserva" },
      { n: "14", suffix: " días", label: "Gratis · sin tarjeta" },
      { n: "24", suffix: "h", label: "Activación completa" },
      { n: "100", suffix: "%", label: "Personalizable" },
    ],
    storyLabel: "La historia",
    storyTitleA: "Empezó como un encargo. ",
    storyTitleB: "Terminó siendo un producto.",
    storyP1:
      "Entre Olas Surf necesitaba gestionar reservas, clases, surf camps y tienda. Le construí la plataforma a medida. Funcionó tan bien que pensé: esto lo necesitan todas las escuelas.",
    storyP2:
      "WavePanel es la productización de aquel encargo. Mismo código probado en producción, ahora escalable a cualquier escuela de surf, kite o deportes acuáticos.",
    modulesLabel: "Arquitectura modular",
    modulesTitleA: "Paga solo por ",
    modulesTitleHl: "lo que necesitas.",
    modulesP:
      "WavePanel se organiza en 4 módulos. Todos los planes incluyen Core. Añade encima solo los que necesites, cuando los necesites.",
    modules: [
      {
        n: "Incluido",
        emoji: "⚡",
        title: "Core — Gestión esencial",
        desc:
          "Panel, calendario, reservas, clientes, actividades y web pública con subdominio propio.",
        highlight: true,
      },
      {
        n: "Adicional",
        emoji: "🛍️",
        title: "Tienda e-commerce",
        desc: "Productos físicos, stock, carrito, pedidos, cupones y bonos/packs configurables.",
      },
      {
        n: "Adicional",
        emoji: "🏕️",
        title: "Surf Camps & Alojamiento",
        desc: "Ediciones, fotos, FAQs, depósitos, rooms, check-in digital y control de accesos.",
      },
      {
        n: "Premium",
        emoji: "💬",
        title: "WhatsApp Business",
        desc: "Bot de reservas, confirmaciones automáticas, incidencias y notificaciones.",
      },
    ],
    howLabel: "Cómo funciona",
    howTitleA: "Activo en menos de ",
    howTitleHl: "24 horas.",
    howP:
      "Sin complicaciones técnicas. El cliente se encarga de enseñar surf; WavePanel se encarga de lo digital.",
    steps: [
      {
        n: "01",
        title: "Elige tu plan",
        desc:
          "Selecciona el plan que mejor se adapte a tu escuela. Puedes cambiar en cualquier momento, sin permanencia.",
      },
      {
        n: "02",
        title: "Configura tu escuela",
        desc:
          "Sube tu logo, elige colores, añade tus actividades, precios e instructores. Todo desde el panel.",
      },
      {
        n: "03",
        title: "Empieza a recibir reservas",
        desc:
          "Tu web y el sistema de reservas están online en menos de 24 horas. Tus clientes reservan y pagan solos.",
      },
    ],
    testLabel: "Lo que dicen las escuelas que lo usan",
    testQuoteA:
      "«Antes gestionábamos las reservas en un Excel y el WhatsApp echaba humo. Con WavePanel los clientes ",
    testQuoteHl: "reservan ellos solos por la web",
    testQuoteB:
      ", los pagos llegan directos al Stripe y yo solo tengo que preocuparme de estar en la playa.»",
    testCite: "— Entre Olas Surf · Cádiz · ★★★★★",
    plansLabel: "Planes",
    plansTitleA: "Precios ",
    plansTitleHl: "sin sorpresas.",
    plans: [
      {
        name: "Basic",
        price: "29",
        suffix: "€/mes",
        sub: "14 días gratis · sin tarjeta",
        features: [
          "Core — Panel + web pública",
          "Calendario y reservas",
          "Clientes, actividades",
          "Stripe, PayPal, Redsys",
          "Subdominio .wavepanel.app",
          "0% comisión por reserva",
        ],
        cta: "Probar 14 días",
      },
      {
        name: "Pro",
        price: "74",
        suffix: "€/mes",
        sub: "Lo que usa Entre Olas",
        popular: true,
        features: [
          "Todo lo de Basic",
          "+ Módulo Tienda e-commerce",
          "+ Módulo Surf Camps & Rooms",
          "+ WhatsApp Business",
          "Dominio custom incluido",
          "Soporte prioritario",
        ],
        cta: "Probar 14 días",
      },
      {
        name: "Lifetime",
        price: "2900",
        suffix: "€ pago único",
        sub: "Mensualidad opcional",
        features: [
          "Todos los módulos para siempre",
          "Pago único, sin mensualidad",
          "Opción de mensualidad para extras",
          "Actualizaciones incluidas",
          "Voto preferente en el roadmap",
          "Ideal para escuelas asentadas",
        ],
        cta: "Contactar",
        lifetime: true,
      },
    ],
    popular: "Más popular",
    oneTime: "Pago único",
    realLabel: "El caso real",
    realTitleA: "Entre Olas Surf lo usa ",
    realTitleHl: "cada día.",
    realP:
      "La escuela de surf de Playa de Roche gestiona reservas, clases, bonos y surf camps con WavePanel. La plataforma que les construí a medida — ahora productizada para cualquiera.",
    realCta: "Ver caso Entre Olas",
    hood: "Bajo el capó",
    hoodTitleA: "Stack pensado para ",
    hoodTitleHl: "escalar.",
    closingTitleA: "¿Listo para ",
    closingTitleHl: "digitalizar tu escuela?",
    closingP:
      "WavePanel está en producción. Mi producto, construido con lo que aprendí sacando Entre Olas adelante.",
    ctaSee: "Visitar wavepanel.app",
    ctaAll: "← Todos los proyectos",
    footerNote: "WavePanel · Producto propio",
    ownProduct: "Producto propio",
  },
  en: {
    numLocale: "en-US",
    badge: "Software for surf schools",
    caseN: "Case study · 01",
    hero1: "Your school.",
    hero2: "Digital.",
    heroPpre:
      "Full management dashboard, public site, online bookings, store and payments. Everything a surf, kite or water-sport school needs. From ",
    heroPpost: "€29/mo",
    visit: "Visit wavepanel.app",
    seeEntreOlas: "See Entre Olas",
    panelDate: "Mon Apr 20",
    panelHi: "Good morning, Entre Olas",
    weekRevenue: "Revenue · current week",
    weekDelta: "vs. previous week",
    panelStats: [
      { label: "Bookings", value: 47, suffix: "" },
      { label: "Occupancy", value: 82, suffix: "%" },
      { label: "Bundles", value: 12, suffix: "" },
    ],
    upcoming: "Upcoming classes",
    bookings: [
      { t: "09:30", title: "Group · Roche · 6 spots", left: "3 free", accent: YELLOW },
      { t: "11:00", title: "Private · Carmen L.", left: "FULL", accent: WHITE },
      { t: "16:00", title: "Surf Camp · Villa", left: "12/12", accent: YELLOW },
    ],
    stats: [
      { n: "0", suffix: "%", label: "Booking commission" },
      { n: "14", suffix: " days", label: "Free · no card" },
      { n: "24", suffix: "h", label: "Full activation" },
      { n: "100", suffix: "%", label: "Customizable" },
    ],
    storyLabel: "The story",
    storyTitleA: "Started as a custom build. ",
    storyTitleB: "Ended up a product.",
    storyP1:
      "Entre Olas Surf needed to manage bookings, classes, surf camps and store. I built them the platform from scratch. It worked so well I thought: every school needs this.",
    storyP2:
      "WavePanel is that build, productized. Same code battle-tested in production, now scalable to any surf, kite or water-sport school.",
    modulesLabel: "Modular architecture",
    modulesTitleA: "Pay only for ",
    modulesTitleHl: "what you need.",
    modulesP:
      "WavePanel runs on 4 modules. Every plan includes Core. Add the rest only when you need them.",
    modules: [
      {
        n: "Included",
        emoji: "⚡",
        title: "Core — Essentials",
        desc: "Dashboard, calendar, bookings, clients, activities and public site with own subdomain.",
        highlight: true,
      },
      {
        n: "Add-on",
        emoji: "🛍️",
        title: "E-commerce store",
        desc: "Physical products, stock, cart, orders, coupons and configurable bundles/packs.",
      },
      {
        n: "Add-on",
        emoji: "🏕️",
        title: "Surf Camps & Rooms",
        desc: "Editions, photos, FAQs, deposits, rooms, digital check-in and access control.",
      },
      {
        n: "Premium",
        emoji: "💬",
        title: "WhatsApp Business",
        desc: "Booking bot, automatic confirmations, incidents and notifications.",
      },
    ],
    howLabel: "How it works",
    howTitleA: "Live in under ",
    howTitleHl: "24 hours.",
    howP:
      "No technical fuss. The client teaches surf; WavePanel handles the digital side.",
    steps: [
      {
        n: "01",
        title: "Pick your plan",
        desc: "Choose the plan that fits your school. Switch any time, no lock-in.",
      },
      {
        n: "02",
        title: "Set up your school",
        desc: "Upload your logo, pick colors, add activities, prices and instructors. All from the dashboard.",
      },
      {
        n: "03",
        title: "Start taking bookings",
        desc: "Your site and booking system are live in under 24h. Clients book and pay themselves.",
      },
    ],
    testLabel: "What schools using it say",
    testQuoteA:
      "\"We used to track bookings in Excel and WhatsApp was on fire. With WavePanel clients ",
    testQuoteHl: "book themselves through the web",
    testQuoteB:
      ", payments hit Stripe directly and I only have to worry about being on the beach.\"",
    testCite: "— Entre Olas Surf · Cádiz · ★★★★★",
    plansLabel: "Plans",
    plansTitleA: "Pricing ",
    plansTitleHl: "with no surprises.",
    plans: [
      {
        name: "Basic",
        price: "29",
        suffix: "€/mo",
        sub: "14-day free trial · no card",
        features: [
          "Core — Dashboard + public site",
          "Calendar and bookings",
          "Clients, activities",
          "Stripe, PayPal, Redsys",
          "Subdomain on .wavepanel.app",
          "0% booking commission",
        ],
        cta: "Try 14 days",
      },
      {
        name: "Pro",
        price: "74",
        suffix: "€/mo",
        sub: "What Entre Olas uses",
        popular: true,
        features: [
          "Everything in Basic",
          "+ E-commerce store",
          "+ Surf Camps & Rooms",
          "+ WhatsApp Business",
          "Custom domain included",
          "Priority support",
        ],
        cta: "Try 14 days",
      },
      {
        name: "Lifetime",
        price: "2900",
        suffix: "€ one-time",
        sub: "Optional monthly fee",
        features: [
          "All modules forever",
          "One-time payment, no monthly",
          "Optional monthly for extras",
          "Updates included",
          "Roadmap voting priority",
          "Ideal for established schools",
        ],
        cta: "Contact",
        lifetime: true,
      },
    ],
    popular: "Most popular",
    oneTime: "One-time",
    realLabel: "The real case",
    realTitleA: "Entre Olas Surf uses it ",
    realTitleHl: "every day.",
    realP:
      "The Playa de Roche surf school manages bookings, classes, bundles and surf camps with WavePanel. The platform I custom-built for them — now productized for anyone.",
    realCta: "See Entre Olas case",
    hood: "Under the hood",
    hoodTitleA: "A stack built to ",
    hoodTitleHl: "scale.",
    closingTitleA: "Ready to ",
    closingTitleHl: "digitize your school?",
    closingP:
      "WavePanel is live. My product, built from what I learned shipping Entre Olas.",
    ctaSee: "Visit wavepanel.app",
    ctaAll: "← All projects",
    footerNote: "WavePanel · Own product",
    ownProduct: "Own product",
  },
  de: {
    numLocale: "de-DE",
    badge: "Software für Surfschulen",
    caseN: "Fallstudie · 01",
    hero1: "Deine Schule.",
    hero2: "Digital.",
    heroPpre:
      "Vollständiges Management-Panel, öffentliche Website, Online-Buchungen, Shop und Zahlungen. Alles, was eine Surf-, Kite- oder Wassersportschule braucht. Ab ",
    heroPpost: "29€/Monat",
    visit: "wavepanel.app besuchen",
    seeEntreOlas: "Entre Olas ansehen",
    panelDate: "Mo. 20. Apr.",
    panelHi: "Guten Morgen, Entre Olas",
    weekRevenue: "Umsatz · aktuelle Woche",
    weekDelta: "vs. Vorwoche",
    panelStats: [
      { label: "Buchungen", value: 47, suffix: "" },
      { label: "Auslastung", value: 82, suffix: "%" },
      { label: "Bundles", value: 12, suffix: "" },
    ],
    upcoming: "Nächste Kurse",
    bookings: [
      { t: "09:30", title: "Gruppe · Roche · 6 Plätze", left: "3 frei", accent: YELLOW },
      { t: "11:00", title: "Privat · Carmen L.", left: "VOLL", accent: WHITE },
      { t: "16:00", title: "Surf Camp · Villa", left: "12/12", accent: YELLOW },
    ],
    stats: [
      { n: "0", suffix: "%", label: "Buchungsprovision" },
      { n: "14", suffix: " Tage", label: "Kostenlos · ohne Karte" },
      { n: "24", suffix: "h", label: "Volle Aktivierung" },
      { n: "100", suffix: "%", label: "Anpassbar" },
    ],
    storyLabel: "Die Geschichte",
    storyTitleA: "Begann als Auftrag. ",
    storyTitleB: "Wurde zum Produkt.",
    storyP1:
      "Entre Olas Surf brauchte Management für Buchungen, Kurse, Surf Camps und Shop. Ich baute die Plattform maßgeschneidert. Es funktionierte so gut, dass ich dachte: das brauchen alle Schulen.",
    storyP2:
      "WavePanel ist diese Lösung als Produkt. Derselbe in Produktion erprobte Code, jetzt skalierbar für jede Surf-, Kite- oder Wassersportschule.",
    modulesLabel: "Modulare Architektur",
    modulesTitleA: "Zahle nur für ",
    modulesTitleHl: "was du brauchst.",
    modulesP:
      "WavePanel besteht aus 4 Modulen. Alle Pläne enthalten Core. Füge nur die hinzu, die du brauchst, wenn du sie brauchst.",
    modules: [
      {
        n: "Enthalten",
        emoji: "⚡",
        title: "Core — Basis-Management",
        desc:
          "Panel, Kalender, Buchungen, Kunden, Aktivitäten und öffentliche Website mit eigener Subdomain.",
        highlight: true,
      },
      {
        n: "Zusatz",
        emoji: "🛍️",
        title: "E-Commerce-Shop",
        desc:
          "Physische Produkte, Bestand, Warenkorb, Bestellungen, Gutscheine und konfigurierbare Bundles/Pakete.",
      },
      {
        n: "Zusatz",
        emoji: "🏕️",
        title: "Surf Camps & Unterkünfte",
        desc:
          "Editionen, Fotos, FAQs, Anzahlungen, Zimmer, digitaler Check-in und Zugangskontrolle.",
      },
      {
        n: "Premium",
        emoji: "💬",
        title: "WhatsApp Business",
        desc:
          "Buchungs-Bot, automatische Bestätigungen, Vorfälle und Benachrichtigungen.",
      },
    ],
    howLabel: "So funktioniert's",
    howTitleA: "Live in unter ",
    howTitleHl: "24 Stunden.",
    howP:
      "Ohne technisches Hin und Her. Der Kunde unterrichtet Surfen; WavePanel kümmert sich um das Digitale.",
    steps: [
      {
        n: "01",
        title: "Wähle deinen Plan",
        desc:
          "Such dir den Plan aus, der zu deiner Schule passt. Wechsel jederzeit möglich, keine Mindestlaufzeit.",
      },
      {
        n: "02",
        title: "Richte deine Schule ein",
        desc:
          "Logo hochladen, Farben wählen, Aktivitäten, Preise und Instruktoren hinzufügen. Alles im Panel.",
      },
      {
        n: "03",
        title: "Empfange Buchungen",
        desc:
          "Deine Website und das Buchungssystem sind in unter 24h online. Kunden buchen und zahlen selbst.",
      },
    ],
    testLabel: "Was Schulen sagen, die es nutzen",
    testQuoteA:
      "„Vorher hatten wir Buchungen in Excel und WhatsApp glühte. Mit WavePanel ",
    testQuoteHl: "buchen die Kunden selbst über die Website",
    testQuoteB:
      ", Zahlungen gehen direkt aufs Stripe und ich muss mich nur darum kümmern, am Strand zu sein.\"",
    testCite: "— Entre Olas Surf · Cádiz · ★★★★★",
    plansLabel: "Pläne",
    plansTitleA: "Preise ",
    plansTitleHl: "ohne Überraschungen.",
    plans: [
      {
        name: "Basic",
        price: "29",
        suffix: "€/Monat",
        sub: "14 Tage kostenlos · ohne Karte",
        features: [
          "Core — Panel + öffentliche Website",
          "Kalender und Buchungen",
          "Kunden, Aktivitäten",
          "Stripe, PayPal, Redsys",
          "Subdomain auf .wavepanel.app",
          "0% Buchungsprovision",
        ],
        cta: "14 Tage testen",
      },
      {
        name: "Pro",
        price: "74",
        suffix: "€/Monat",
        sub: "Was Entre Olas nutzt",
        popular: true,
        features: [
          "Alles aus Basic",
          "+ E-Commerce-Shop",
          "+ Surf Camps & Zimmer",
          "+ WhatsApp Business",
          "Custom-Domain inklusive",
          "Priorisierter Support",
        ],
        cta: "14 Tage testen",
      },
      {
        name: "Lifetime",
        price: "2900",
        suffix: "€ einmalig",
        sub: "Monatsgebühr optional",
        features: [
          "Alle Module für immer",
          "Einmalzahlung, keine Monatsgebühr",
          "Optionale Monatsgebühr für Extras",
          "Updates inklusive",
          "Roadmap-Voting-Priorität",
          "Ideal für etablierte Schulen",
        ],
        cta: "Kontakt",
        lifetime: true,
      },
    ],
    popular: "Am beliebtesten",
    oneTime: "Einmalzahlung",
    realLabel: "Der echte Fall",
    realTitleA: "Entre Olas Surf nutzt es ",
    realTitleHl: "täglich.",
    realP:
      "Die Surfschule am Playa de Roche managt Buchungen, Kurse, Bundles und Surf Camps mit WavePanel. Die Plattform, die ich für sie maßgeschneidert habe — jetzt als Produkt für alle.",
    realCta: "Entre-Olas-Fall ansehen",
    hood: "Unter der Haube",
    hoodTitleA: "Stack gebaut zum ",
    hoodTitleHl: "Skalieren.",
    closingTitleA: "Bereit, ",
    closingTitleHl: "deine Schule zu digitalisieren?",
    closingP:
      "WavePanel ist live. Mein Produkt, gebaut aus dem, was ich beim Launch von Entre Olas gelernt habe.",
    ctaSee: "wavepanel.app besuchen",
    ctaAll: "← Alle Projekte",
    footerNote: "WavePanel · Eigenes Produkt",
    ownProduct: "Eigenes Produkt",
  },
};

function AnimatedNumber({
  value,
  duration = 1.6,
  suffix = "",
  locale = "es-ES",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  locale?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {Math.round(display).toLocaleString(locale)}
      {suffix}
    </span>
  );
}

function WaveLogo({ className }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-0.5 ${className ?? ""}`}>
      <span style={{ color: WHITE, fontWeight: 400 }}>wave</span>
      <span style={{ color: YELLOW, fontWeight: 800 }}>panel</span>
    </span>
  );
}

function PanelMock({ t }: { t: (typeof T)["es"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: EASE }}
      className="relative w-full max-w-[520px] mx-auto"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{ background: NAVY_DEEP, border: `1px solid ${LINE_DARK}` }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 border-b flex-wrap"
          style={{ borderColor: LINE_DARK, background: NAVY }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 text-[10px] tracking-wide"
            style={{ color: FAINT_DARK, fontFamily: MONO }}
          >
            panel.wavepanel.app
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: YELLOW }}
            />
            <span
              className="text-[9px] uppercase tracking-widest"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              live
            </span>
          </span>
        </div>

        <div className="p-5 space-y-4" style={{ background: NAVY }}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p
                className="text-[10px] uppercase tracking-widest"
                style={{ color: FAINT_DARK, fontFamily: MONO }}
              >
                {t.panelDate}
              </p>
              <p
                className="text-base font-semibold mt-0.5"
                style={{ color: WHITE, fontFamily: DISPLAY }}
              >
                {t.panelHi}
              </p>
            </div>
            <span
              className="text-[9px] uppercase tracking-widest px-2 py-1"
              style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
            >
              PRO+
            </span>
          </div>

          <div
            className="rounded-xl p-4 border"
            style={{
              borderColor: LINE_DARK,
              background: `linear-gradient(135deg, ${NAVY_CARD} 0%, ${NAVY} 100%)`,
            }}
          >
            <p
              className="text-[9px] uppercase tracking-widest"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              {t.weekRevenue}
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: WHITE, fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
            >
              <AnimatedNumber value={4280} suffix=" €" locale={t.numLocale} />
            </p>
            <div
              className="mt-2 flex items-center gap-3 text-[11px]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              <span style={{ color: YELLOW }}>↑ 18%</span>
              <span>{t.weekDelta}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {t.panelStats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3 border"
                style={{ borderColor: LINE_DARK, background: NAVY_CARD }}
              >
                <p
                  className="text-[9px] uppercase tracking-widest"
                  style={{ color: FAINT_DARK, fontFamily: MONO }}
                >
                  {s.label}
                </p>
                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: WHITE, fontFamily: DISPLAY }}
                >
                  <AnimatedNumber value={s.value} suffix={s.suffix} locale={t.numLocale} />
                </p>
              </div>
            ))}
          </div>

          <div>
            <p
              className="text-[9px] uppercase tracking-widest mb-2"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              {t.upcoming}
            </p>
            <div className="space-y-1.5">
              {t.bookings.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 1.2 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg border"
                  style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
                >
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded"
                    style={{ background: b.accent, color: NAVY, fontFamily: MONO }}
                  >
                    {b.t}
                  </span>
                  <span
                    className="flex-1 text-[11px]"
                    style={{ color: WHITE, fontFamily: DISPLAY }}
                  >
                    {b.title}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: FAINT_DARK, fontFamily: MONO }}
                  >
                    {b.left}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 blur-3xl"
        style={{ background: YELLOW }}
      />
    </motion.div>
  );
}

export default function WavepanelDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div style={{ background: NAVY, color: WHITE, fontFamily: DISPLAY }}>
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-28 md:pt-40 pb-16"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 75% 20%, ${YELLOW}18 0%, transparent 45%), ${NAVY}`,
          }}
        />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5"
              style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
            >
              {t.badge}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              {t.caseN}
            </span>
            <WaveLogo className="text-sm md:text-base ml-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.4, ease: EASE }}
                  className="text-[clamp(2.75rem,11vw,9rem)] leading-[0.95]"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    color: WHITE,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {t.hero1}
                </motion.h1>
              </div>
              <div className="overflow-hidden -mt-1 md:-mt-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.55, ease: EASE }}
                  className="text-[clamp(2.75rem,11vw,9rem)] leading-[0.95]"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    color: YELLOW,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {t.hero2}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10 max-w-xl text-base md:text-lg leading-relaxed"
                style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
              >
                {t.heroPpre}
                <span style={{ color: YELLOW, fontWeight: 700 }}>{t.heroPpost}</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="https://www.wavepanel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                  style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
                >
                  {t.visit}
                  <span>↗</span>
                </a>
                <Link
                  href="/proyecto/entre-olas-surf"
                  data-hover
                  className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 border flex items-center gap-2"
                  style={{ borderColor: LINE_DARK, color: MUTED_DARK, fontFamily: MONO }}
                >
                  {t.seeEntreOlas}
                </Link>
              </motion.div>
            </div>

            <PanelMock t={t} />
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-12 md:py-16 border-y"
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="flex md:flex-col gap-4 md:gap-1 items-baseline md:items-start"
            >
              <span
                className="text-4xl md:text-6xl leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  color: i === 0 ? YELLOW : WHITE,
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedNumber value={parseInt(s.n)} locale={t.numLocale} />
                {s.suffix}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: MUTED_DARK, fontFamily: MONO }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            {t.storyLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            {t.storyTitleA}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.storyTitleB}
            </span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: NAVY, fontFamily: DISPLAY }}
            >
              {t.storyP1}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              {t.storyP2}
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: NAVY, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: YELLOW, fontFamily: MONO }}
          >
            {t.modulesLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            {t.modulesTitleA}
            <span style={{ color: YELLOW }}>{t.modulesTitleHl}</span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            {t.modulesP}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
              className="relative p-7 md:p-10 border transition-colors"
              style={{
                borderColor: m.highlight ? YELLOW : LINE_DARK,
                background: m.highlight ? NAVY_CARD : "transparent",
              }}
            >
              <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
                <span className="text-3xl">{m.emoji}</span>
                <span
                  className="text-[9px] uppercase tracking-widest px-2 py-1"
                  style={{
                    background: m.highlight ? YELLOW : "transparent",
                    color: m.highlight ? NAVY : YELLOW,
                    border: m.highlight ? "none" : `1px solid ${YELLOW}`,
                    fontFamily: MONO,
                    fontWeight: 700,
                  }}
                >
                  {m.n}
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl leading-tight"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: WHITE,
                }}
              >
                {m.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
              >
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-12"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            {t.howLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            {t.howTitleA}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.howTitleHl}
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
          >
            {t.howP}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              className="relative p-7 border"
              style={{ borderColor: LINE_LIGHT, background: WHITE }}
            >
              <span
                className="absolute -top-4 left-6 px-3 py-1.5 text-[11px] font-bold"
                style={{ background: NAVY, color: YELLOW, fontFamily: MONO }}
              >
                {s.n}
              </span>
              <h3
                className="mt-4 text-2xl md:text-3xl leading-tight"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  color: NAVY,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-28"
        style={{ background: NAVY_DEEP, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: YELLOW, fontFamily: MONO }}
          >
            {t.testLabel}
          </p>
          <blockquote
            className="text-xl md:text-4xl leading-snug"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 500,
              color: WHITE,
              letterSpacing: "-0.01em",
            }}
          >
            {t.testQuoteA}
            <span style={{ color: YELLOW, fontWeight: 700 }}>{t.testQuoteHl}</span>
            {t.testQuoteB}
          </blockquote>
          <p
            className="mt-6 text-sm"
            style={{ color: MUTED_DARK, fontFamily: MONO }}
          >
            {t.testCite}
          </p>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-10"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            {t.plansLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            {t.plansTitleA}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.plansTitleHl}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
              className="relative p-7 md:p-10 border flex flex-col"
              style={{
                borderColor: p.popular ? YELLOW : LINE_LIGHT,
                background: p.popular ? NAVY : WHITE,
                color: p.popular ? WHITE : NAVY,
              }}
            >
              {p.popular && (
                <span
                  className="absolute -top-3 left-6 px-3 py-1 text-[9px] uppercase tracking-widest"
                  style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
                >
                  {t.popular}
                </span>
              )}
              {p.lifetime && (
                <span
                  className="absolute -top-3 left-6 px-3 py-1 text-[9px] uppercase tracking-widest"
                  style={{ background: NAVY, color: YELLOW, fontFamily: MONO, fontWeight: 700 }}
                >
                  {t.oneTime}
                </span>
              )}
              <p
                className="text-[10px] uppercase tracking-widest mb-4"
                style={{ color: p.popular ? YELLOW : MUTED_LIGHT, fontFamily: MONO }}
              >
                {p.name}
              </p>
              <p
                className="text-5xl md:text-7xl leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                {p.price}
                <span
                  className="text-base align-top ml-1"
                  style={{
                    color: p.popular ? YELLOW : MUTED_LIGHT,
                    fontWeight: 500,
                  }}
                >
                  {p.suffix}
                </span>
              </p>
              <p
                className="mt-2 text-[11px] uppercase tracking-widest"
                style={{
                  color: p.popular ? YELLOW : MUTED_LIGHT,
                  fontFamily: MONO,
                  fontWeight: 600,
                }}
              >
                {p.sub}
              </p>
              <ul className="mt-7 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{
                      color: p.popular ? MUTED_DARK : MUTED_LIGHT,
                      fontFamily: DISPLAY,
                    }}
                  >
                    <span style={{ color: YELLOW }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.wavepanel.app"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="mt-8 block text-center text-xs uppercase tracking-widest py-3.5 transition-colors"
                style={{
                  background: p.popular ? YELLOW : NAVY,
                  color: p.popular ? NAVY : YELLOW,
                  fontFamily: MONO,
                  fontWeight: 700,
                }}
              >
                {p.cta} ↗
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-28"
        style={{ background: NAVY, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-center max-w-6xl mx-auto"
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              {t.realLabel}
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              {t.realTitleA}
              <span style={{ color: YELLOW }}>{t.realTitleHl}</span>
            </h3>
            <p
              className="mt-6 max-w-md text-base leading-relaxed"
              style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
            >
              {t.realP}
            </p>
            <Link
              href="/proyecto/entre-olas-surf"
              data-hover
              className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 group"
              style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
            >
              <span className="text-xs uppercase tracking-[0.25em]">{t.realCta}</span>
              <span>→</span>
            </Link>
          </div>
          <div
            className="relative aspect-[4/3] overflow-hidden"
            style={{ background: NAVY_DEEP }}
          >
            <Image
              src="/projects/entre-olas-surf/aerial-house.jpg"
              alt="Entre Olas surf-camp villa, managed with WavePanel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-24 border-t"
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP, color: WHITE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              {t.hood}
            </p>
            <h3
              className="text-2xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              {t.hoodTitleA}
              <span style={{ color: YELLOW }}>{t.hoodTitleHl}</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Next.js 16",
              "Node.js",
              "TypeScript",
              "PostgreSQL",
              "Supabase",
              "Stripe",
              "Resend",
              "Vercel",
              "Tailwind",
              "Framer Motion",
              "Manrope",
              "GitHub Actions",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 text-xs"
                style={{ borderColor: LINE_DARK, color: WHITE, fontFamily: MONO }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-28 md:py-44 relative overflow-hidden"
        style={{ background: NAVY, color: WHITE }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: YELLOW, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-4xl md:text-8xl leading-[0.95] md:leading-[0.88]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            {t.closingTitleA}
            <span style={{ color: YELLOW }}>{t.closingTitleHl}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            {t.closingP}
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://www.wavepanel.app"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{ background: YELLOW, color: NAVY, fontFamily: MONO, fontWeight: 700 }}
            >
              {t.ctaSee}
              <span>↗</span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              {t.ctaAll}
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          style={{ fontFamily: MONO, color: WHITE }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED_DARK, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} · {t.footerNote}
        </span>
      </footer>
    </div>
  );
}
