"use client";

import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const BG = "#faf6e8";
const CREAM = "#f3eedc";
const FOREST = "#184038";
const FOREST_DARK = "#132e29";
const FOREST_LINE = "#2f524b";
const TERRACOTA = "#d3623b";
const PEACH = "#ff8a5c";
const BORDER = "#e5dbc2";
const MUTED = "rgba(24,64,56,0.55)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-changa), system-ui, sans-serif";
const SANS = "var(--font-poppins), system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

interface Destination {
  country: string;
  photo: string;
  caption: string;
  tag: string;
  span?: "tall" | "wide" | "big";
}

const T: Record<Lang, {
  case: string;
  hero1: string;
  hero2: string;
  heroPpre: string;
  heroPpost: string;
  visit: string;
  stats: { n: string; label: string }[];
  proj: string;
  projA: string;
  projHl: string;
  projB: string;
  projP: string;
  centralLabel: string;
  central1: string;
  central2: string;
  central3a: string;
  central3b: string;
  centralP: string;
  destLabel: string;
  destA: string;
  destHl: string;
  destPhoto: string;
  destinations: Destination[];
  ausLabel: string;
  ausA: string;
  ausHl: string;
  ausP: string;
  ausList: string[];
  ausFlag: string;
  creatorLabel: string;
  creatorA: string;
  creatorHl: string;
  creatorB: string;
  creatorQuoteA: string;
  creatorQuoteHl: string;
  creatorQuoteB: string;
  followers: string;
  livesIn: string;
  igTag: string;
  creatorBadge: string;
  creatorPin: string;
  pillarsLabel: string;
  pillarsTitleA: string;
  pillarsTitleHl: string;
  pillars: { n: string; title: string; desc: string }[];
  ownLabel: string;
  ownA: string;
  ownHl: string;
  ownList: string[];
  closingA: string;
  closingHl: string;
  closingP: string;
  ctaSee: string;
  ctaBack: string;
  footerNote: string;
}> = {
  es: {
    case: "Caso de estudio · 05",
    hero1: "Alma de",
    hero2: "Nómada.",
    heroPpre: "El hogar profesional de ",
    heroPpost: ". Travel coach de 44K en Instagram que no quería una landing genérica — quería un sitio que convirtiera comunidad en clientes.",
    visit: "Visitar el sitio",
    stats: [
      { n: "44K", label: "Seguidores IG" },
      { n: "297", label: "Posts" },
      { n: "08", label: "Destinos" },
      { n: "01", label: "Consultoría" },
    ],
    proj: "El proyecto",
    projA: "Creadora de viaje con ",
    projHl: "audiencia real.",
    projB: " Una web a la altura.",
    projP:
      "Ainhoa García lleva años viajando y documentándolo. Tiene 44.000 personas siguiéndola. Cuando decidió monetizar con consultorías, la web no podía ser un Linktree disfrazado — tenía que reflejar el nivel de la creadora y cerrar reservas sin fricción.",
    centralLabel: "La frase que lo ordena todo",
    central1: "No es",
    central2: "escapar,",
    central3a: "es",
    central3b: "expandirse.",
    centralP:
      "Toda la web respira esta idea: no escapar de lo que tienes, sino expandirlo. Cambio, no huida.",
    destLabel: "El atlas de destinos",
    destA: "Ocho sitios. ",
    destHl: "Ocho formas de empezar.",
    destPhoto: "Fotografía y copy extraídos de almadenomada.com",
    destinations: [
      { country: "Australia", photo: "/projects/alma-de-nomada/destinations/australia.jpg", caption: "Nueva vida con estrategia", tag: "Oceanía", span: "big" },
      { country: "Sri Lanka", photo: "/projects/alma-de-nomada/destinations/sri-lanka.jpg", caption: "Surf, selva y espiritualidad", tag: "Asia", span: "tall" },
      { country: "Japón", photo: "/projects/alma-de-nomada/destinations/japon.jpg", caption: "Tradición y vanguardia", tag: "Asia" },
      { country: "Maldivas", photo: "/projects/alma-de-nomada/destinations/maldives.jpg", caption: "Calma y paraíso", tag: "Asia", span: "wide" },
      { country: "Tailandia", photo: "/projects/alma-de-nomada/destinations/tailandia.jpg", caption: "Templos y selva", tag: "Asia" },
      { country: "Nueva Zelanda", photo: "/projects/alma-de-nomada/destinations/new-zealand.jpg", caption: "Roadtrip consciente", tag: "Oceanía", span: "tall" },
      { country: "Vietnam", photo: "/projects/alma-de-nomada/destinations/vietnam.jpg", caption: "Ruta cultural y naturaleza", tag: "Asia" },
      { country: "Indonesia", photo: "/projects/alma-de-nomada/destinations/indonesia.jpg", caption: "Templos, volcanes y océano", tag: "Asia" },
    ],
    ausLabel: "Australia · el servicio estrella",
    ausA: "¿Cómo venir a ",
    ausHl: "Australia?",
    ausP:
      "Ainhoa vivió allí. La web tiene una landing dedicada donde convierte dudas en un plan: ciudad, visados, trámites, mindset. El servicio que más consultas genera.",
    ausList: [
      "Elección de ciudad según perfil",
      "Visados paso a paso",
      "Trámites y logística",
      "Preparación mental para el cambio",
    ],
    ausFlag: "Página especial",
    creatorLabel: "La creadora detrás",
    creatorA: "Ainhoa lleva años ",
    creatorHl: "documentando",
    creatorB: ".",
    creatorQuoteA:
      "«Viajar me cambió la vida. Ahora ayudo a otras personas a diseñar la suya en ",
    creatorQuoteHl: "cualquier parte del mundo",
    creatorQuoteB: ".»",
    followers: "Seguidores",
    livesIn: "Donde vive",
    igTag: "@ainhhgarcia en Instagram",
    creatorBadge: "Creator · Fundadora",
    creatorPin: "Ainhoa · en ruta",
    pillarsLabel: "El proceso · tres pasos, sin humo",
    pillarsTitleA: "Destino · Trámites · ",
    pillarsTitleHl: "Mindset.",
    pillars: [
      { n: "01", title: "Destino correcto", desc: "Encuentra el destino y el tipo de experiencia que encaja con tu momento de vida." },
      { n: "02", title: "Trámites claros", desc: "Visados, documentación y planificación sin estrés ni confusión." },
      { n: "03", title: "Mindset", desc: "Prepárate para el cambio, gestiona miedos y da el salto con confianza." },
    ],
    ownLabel: "Lo que construí",
    ownA: "End-to-end, ",
    ownHl: "sin excusas.",
    ownList: [
      "Diseño visual, fotografía editorial y copy supervisado",
      "Desarrollo en Next.js 16 + Tailwind v4 desplegado en Vercel",
      "CMS custom para que Ainhoa añada destinos sin tocar código",
      "Modo claro / oscuro como decisión de marca",
      "Captura de leads y newsletter",
      "Integración con 4 partners (seguros y conectividad)",
      "SEO técnico y cookie consent legal",
    ],
    closingA: "Expandir. ",
    closingHl: "No escapar.",
    closingP:
      "La web está en producción. Cada semana entran consultas de gente de su comunidad que quiere algo distinto — y sale con un plan.",
    ctaSee: "Visitar almadenomada.com",
    ctaBack: "← Volver al portfolio",
    footerNote: "Alma de Nómada · Caso de estudio",
  },
  en: {
    case: "Case study · 05",
    hero1: "Soul of",
    hero2: "Nomad.",
    heroPpre: "The professional home of ",
    heroPpost: ". A 44K travel coach on Instagram who didn't want a generic landing — she wanted a site that turned community into clients.",
    visit: "Visit the site",
    stats: [
      { n: "44K", label: "IG followers" },
      { n: "297", label: "Posts" },
      { n: "08", label: "Destinations" },
      { n: "01", label: "Consultancy" },
    ],
    proj: "The project",
    projA: "Travel creator with ",
    projHl: "real audience.",
    projB: " A site that matches.",
    projP:
      "Ainhoa García has been traveling and documenting it for years. 44,000 people follow her. When she decided to monetize with consulting, the site couldn't be a dressed-up Linktree — it had to match the creator's level and close bookings frictionlessly.",
    centralLabel: "The phrase that orders everything",
    central1: "It's not",
    central2: "escaping,",
    central3a: "it's",
    central3b: "expanding.",
    centralP:
      "The whole site breathes this idea: don't escape what you have, expand it. Change, not flight.",
    destLabel: "The atlas of destinations",
    destA: "Eight places. ",
    destHl: "Eight ways to start.",
    destPhoto: "Photography and copy from almadenomada.com",
    destinations: [
      { country: "Australia", photo: "/projects/alma-de-nomada/destinations/australia.jpg", caption: "New life with strategy", tag: "Oceania", span: "big" },
      { country: "Sri Lanka", photo: "/projects/alma-de-nomada/destinations/sri-lanka.jpg", caption: "Surf, jungle and spirit", tag: "Asia", span: "tall" },
      { country: "Japan", photo: "/projects/alma-de-nomada/destinations/japon.jpg", caption: "Tradition and edge", tag: "Asia" },
      { country: "Maldives", photo: "/projects/alma-de-nomada/destinations/maldives.jpg", caption: "Calm and paradise", tag: "Asia", span: "wide" },
      { country: "Thailand", photo: "/projects/alma-de-nomada/destinations/tailandia.jpg", caption: "Temples and jungle", tag: "Asia" },
      { country: "New Zealand", photo: "/projects/alma-de-nomada/destinations/new-zealand.jpg", caption: "Mindful roadtrip", tag: "Oceania", span: "tall" },
      { country: "Vietnam", photo: "/projects/alma-de-nomada/destinations/vietnam.jpg", caption: "Cultural route and nature", tag: "Asia" },
      { country: "Indonesia", photo: "/projects/alma-de-nomada/destinations/indonesia.jpg", caption: "Temples, volcanoes and ocean", tag: "Asia" },
    ],
    ausLabel: "Australia · the flagship service",
    ausA: "How to come to ",
    ausHl: "Australia?",
    ausP:
      "Ainhoa lived there. The site has a dedicated landing that turns doubts into a plan: city, visas, paperwork, mindset. The service that drives the most inquiries.",
    ausList: [
      "Choosing a city based on profile",
      "Visas step by step",
      "Paperwork and logistics",
      "Mental prep for the change",
    ],
    ausFlag: "Special page",
    creatorLabel: "The creator behind it",
    creatorA: "Ainhoa has been ",
    creatorHl: "documenting",
    creatorB: " for years.",
    creatorQuoteA:
      "\"Travel changed my life. Now I help others design theirs in ",
    creatorQuoteHl: "any part of the world",
    creatorQuoteB: ".\"",
    followers: "Followers",
    livesIn: "Lives in",
    igTag: "@ainhhgarcia on Instagram",
    creatorBadge: "Creator · Founder",
    creatorPin: "Ainhoa · on the road",
    pillarsLabel: "The process · three steps, no fluff",
    pillarsTitleA: "Destination · Paperwork · ",
    pillarsTitleHl: "Mindset.",
    pillars: [
      { n: "01", title: "Right destination", desc: "Find the destination and the type of experience that fits your life moment." },
      { n: "02", title: "Clear paperwork", desc: "Visas, documentation and planning without stress or confusion." },
      { n: "03", title: "Mindset", desc: "Prepare for the change, manage fears and take the leap with confidence." },
    ],
    ownLabel: "What I built",
    ownA: "End-to-end, ",
    ownHl: "no excuses.",
    ownList: [
      "Visual design, editorial photography and supervised copy",
      "Built on Next.js 16 + Tailwind v4 deployed on Vercel",
      "Custom CMS so Ainhoa can add destinations without touching code",
      "Light / dark mode as a brand decision",
      "Lead capture and newsletter",
      "Integration with 4 partners (insurance and connectivity)",
      "Technical SEO and legal cookie consent",
    ],
    closingA: "Expand. ",
    closingHl: "Don't escape.",
    closingP:
      "The site is live. Every week consults come in from her community who want something different — and leave with a plan.",
    ctaSee: "Visit almadenomada.com",
    ctaBack: "← Back to portfolio",
    footerNote: "Alma de Nómada · Case study",
  },
  de: {
    case: "Fallstudie · 05",
    hero1: "Seele von",
    hero2: "Nomade.",
    heroPpre: "Das berufliche Zuhause von ",
    heroPpost: ". Travel-Coach mit 44K auf Instagram, die keine generische Landing wollte — sie wollte eine Site, die Community in Kunden verwandelt.",
    visit: "Site besuchen",
    stats: [
      { n: "44K", label: "IG-Follower" },
      { n: "297", label: "Posts" },
      { n: "08", label: "Reiseziele" },
      { n: "01", label: "Beratung" },
    ],
    proj: "Das Projekt",
    projA: "Reise-Creator mit ",
    projHl: "echtem Publikum.",
    projB: " Eine Site auf Augenhöhe.",
    projP:
      "Ainhoa García reist und dokumentiert es seit Jahren. 44.000 Menschen folgen ihr. Als sie mit Beratungen monetarisierte, konnte die Site kein verkleidetes Linktree sein — sie musste das Niveau der Creatorin widerspiegeln und Buchungen reibungslos schließen.",
    centralLabel: "Der Satz, der alles ordnet",
    central1: "Es ist nicht",
    central2: "Flucht,",
    central3a: "es ist",
    central3b: "Expansion.",
    centralP:
      "Die ganze Site atmet diese Idee: nicht fliehen, sondern erweitern. Wandel, keine Flucht.",
    destLabel: "Der Atlas der Reiseziele",
    destA: "Acht Orte. ",
    destHl: "Acht Wege anzufangen.",
    destPhoto: "Fotografie und Copy aus almadenomada.com",
    destinations: [
      { country: "Australien", photo: "/projects/alma-de-nomada/destinations/australia.jpg", caption: "Neues Leben mit Strategie", tag: "Ozeanien", span: "big" },
      { country: "Sri Lanka", photo: "/projects/alma-de-nomada/destinations/sri-lanka.jpg", caption: "Surf, Dschungel und Spiritualität", tag: "Asien", span: "tall" },
      { country: "Japan", photo: "/projects/alma-de-nomada/destinations/japon.jpg", caption: "Tradition und Avantgarde", tag: "Asien" },
      { country: "Malediven", photo: "/projects/alma-de-nomada/destinations/maldives.jpg", caption: "Ruhe und Paradies", tag: "Asien", span: "wide" },
      { country: "Thailand", photo: "/projects/alma-de-nomada/destinations/tailandia.jpg", caption: "Tempel und Dschungel", tag: "Asien" },
      { country: "Neuseeland", photo: "/projects/alma-de-nomada/destinations/new-zealand.jpg", caption: "Bewusster Roadtrip", tag: "Ozeanien", span: "tall" },
      { country: "Vietnam", photo: "/projects/alma-de-nomada/destinations/vietnam.jpg", caption: "Kulturelle Route und Natur", tag: "Asien" },
      { country: "Indonesien", photo: "/projects/alma-de-nomada/destinations/indonesia.jpg", caption: "Tempel, Vulkane und Ozean", tag: "Asien" },
    ],
    ausLabel: "Australien · das Flaggschiff",
    ausA: "Wie nach ",
    ausHl: "Australien?",
    ausP:
      "Ainhoa hat dort gelebt. Die Site hat eine eigene Landing, die Zweifel in einen Plan verwandelt: Stadt, Visa, Behördenkram, Mindset. Der Service mit den meisten Anfragen.",
    ausList: [
      "Stadtwahl nach Profil",
      "Visa Schritt für Schritt",
      "Behördenkram und Logistik",
      "Mentale Vorbereitung auf den Wandel",
    ],
    ausFlag: "Spezielle Seite",
    creatorLabel: "Die Creatorin dahinter",
    creatorA: "Ainhoa ",
    creatorHl: "dokumentiert",
    creatorB: " seit Jahren.",
    creatorQuoteA:
      "„Reisen hat mein Leben verändert. Jetzt helfe ich anderen, ihres in ",
    creatorQuoteHl: "irgendeinem Teil der Welt",
    creatorQuoteB: " zu gestalten.\"",
    followers: "Follower",
    livesIn: "Wohnort",
    igTag: "@ainhhgarcia auf Instagram",
    creatorBadge: "Creatorin · Gründerin",
    creatorPin: "Ainhoa · unterwegs",
    pillarsLabel: "Der Prozess · drei Schritte, kein Geschwafel",
    pillarsTitleA: "Ziel · Behördenkram · ",
    pillarsTitleHl: "Mindset.",
    pillars: [
      { n: "01", title: "Richtiges Ziel", desc: "Finde das Ziel und die Art von Erlebnis, die zu deinem Lebensmoment passt." },
      { n: "02", title: "Klare Behördensachen", desc: "Visa, Dokumente und Planung ohne Stress oder Verwirrung." },
      { n: "03", title: "Mindset", desc: "Bereite dich auf den Wandel vor, manage Ängste und mach den Sprung mit Vertrauen." },
    ],
    ownLabel: "Was ich gebaut habe",
    ownA: "End-to-End, ",
    ownHl: "keine Ausreden.",
    ownList: [
      "Visuelles Design, redaktionelle Fotografie und betreute Copy",
      "Entwicklung auf Next.js 16 + Tailwind v4, deployt auf Vercel",
      "Custom-CMS, damit Ainhoa Ziele ohne Code hinzufügen kann",
      "Hell / Dunkel-Modus als Marken-Entscheidung",
      "Lead-Erfassung und Newsletter",
      "Integration mit 4 Partnern (Versicherung und Konnektivität)",
      "Technisches SEO und Cookie-Consent",
    ],
    closingA: "Expandieren. ",
    closingHl: "Nicht fliehen.",
    closingP:
      "Die Site ist live. Jede Woche kommen Anfragen aus ihrer Community, die etwas anderes wollen — und gehen mit einem Plan.",
    ctaSee: "almadenomada.com besuchen",
    ctaBack: "← Zurück zum Portfolio",
    footerNote: "Alma de Nómada · Fallstudie",
  },
};

function WordReveal({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ExpandingRings({ color = TERRACOTA, className }: { color?: string; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="relative w-full h-full">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
            animate={{ scale: [0.4, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 4, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function DestinationTile({
  d,
  index,
  className,
}: {
  d: Destination;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.9, ease: EASE }}
      data-hover
      className={`relative group overflow-hidden ${className || ""}`}
      style={{ background: FOREST }}
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-4 -bottom-4">
        <Image
          src={d.photo}
          alt={`${d.country} — ${d.caption}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]"
          quality={85}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(19,46,41,0) 40%, rgba(19,46,41,0.85) 100%)",
        }}
      />
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <span
          className="text-[10px] uppercase tracking-[0.3em] mb-2"
          style={{
            color: PEACH,
            fontFamily: MONO,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {d.tag} · {d.country}
        </span>
        <h3
          className="text-xl md:text-3xl leading-[1.05] text-white"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
          }}
        >
          {d.caption}
        </h3>
      </div>
    </motion.div>
  );
}

export default function AlmaDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-15%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  const expandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expandProgress } = useScroll({
    target: expandRef,
    offset: ["start end", "end start"],
  });
  const expandSpacing = useTransform(
    expandProgress,
    [0, 0.5, 1],
    ["-0.02em", "0.08em", "0.14em"]
  );

  return (
    <div style={{ background: BG, color: FOREST, fontFamily: SANS }}>
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/alma-de-nomada/hero-photo.jpg"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(19,46,41,0.55) 0%, rgba(19,46,41,0.25) 35%, rgba(19,46,41,0.3) 65%, rgba(19,46,41,0.92) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroContentY, opacity: heroFade }}
          className="relative z-10 w-full px-6 md:px-12 pt-32 pb-16 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-8 text-white/85 flex-wrap"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border border-white/30 rounded-full"
              style={{ fontFamily: MONO }}
            >
              {t.case}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO }}>
              2025
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="text-[clamp(2.75rem,10vw,9rem)] leading-[0.92] text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                {t.hero1}
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-1 md:-mt-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: EASE }}
                className="text-[clamp(2.75rem,10vw,9rem)] leading-[0.92] italic"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  color: PEACH,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                {t.hero2}
              </motion.h1>
            </div>
          </div>

          <div className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed text-white/90"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              {t.heroPpre}
              <a
                href="https://instagram.com/ainhhgarcia"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: PEACH, textDecoration: "underline", textUnderlineOffset: 4 }}
                data-hover
              >
                @ainhhgarcia
              </a>
              {t.heroPpost}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://almadenomada.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
              >
                {t.visit}
                <span>↗</span>
              </a>
              <a
                href="https://instagram.com/ainhhgarcia"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 border text-white/90"
                style={{ borderColor: "rgba(255,255,255,0.35)", fontFamily: MONO }}
              >
                @ainhhgarcia
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-10 md:py-14 border-b"
        style={{ borderColor: FOREST_LINE, background: FOREST_DARK, color: BG }}
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
                className="text-3xl md:text-5xl leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  color: i === 0 ? TERRACOTA : BG,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.n}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.3em] opacity-70"
                style={{ fontFamily: MONO }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.proj}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] mb-10"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: FOREST, letterSpacing: "-0.025em" }}
          >
            {t.projA}
            <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
              {t.projHl}
            </span>
            {t.projB}
          </h2>
          <p
            className="text-base md:text-xl leading-relaxed max-w-2xl"
            style={{ color: FOREST, fontFamily: SANS, fontWeight: 300 }}
          >
            {t.projP}
          </p>
        </div>
      </section>

      <section
        ref={expandRef}
        className="px-6 md:px-12 py-24 md:py-44 relative overflow-hidden"
        style={{ background: CREAM }}
      >
        <ExpandingRings
          color={TERRACOTA}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-30"
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.centralLabel}
          </p>
          <p
            className="text-[clamp(2rem,8vw,7rem)] leading-[1.1]"
            style={{ fontFamily: DISPLAY, fontWeight: 600, color: FOREST, letterSpacing: "-0.02em" }}
          >
            <WordReveal text={t.central1} />
            <br />
            <WordReveal text={t.central2} delay={0.3} />
            <br />
            <span style={{ color: TERRACOTA, fontStyle: "italic" }}>
              <WordReveal text={t.central3a} delay={0.8} />{" "}
              <motion.span
                style={{ display: "inline-block", letterSpacing: expandSpacing }}
              >
                <WordReveal text={t.central3b} delay={1.0} />
              </motion.span>
            </span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.centralP}
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.destLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: FOREST, letterSpacing: "-0.025em" }}
          >
            {t.destA}
            <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
              {t.destHl}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          <DestinationTile
            d={t.destinations[0]}
            index={0}
            className="col-span-2 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[560px]"
          />
          <DestinationTile
            d={t.destinations[1]}
            index={1}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-auto md:min-h-[270px]"
          />
          <DestinationTile
            d={t.destinations[2]}
            index={2}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-auto md:min-h-[270px]"
          />
          <DestinationTile
            d={t.destinations[3]}
            index={3}
            className="col-span-2 md:col-span-3 aspect-[3/2]"
          />
          <DestinationTile
            d={t.destinations[4]}
            index={4}
            className="col-span-1 md:col-span-3 aspect-[3/4] md:aspect-[3/2]"
          />
          <DestinationTile
            d={t.destinations[5]}
            index={5}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-[4/5]"
          />
          <DestinationTile
            d={t.destinations[6]}
            index={6}
            className="col-span-2 md:col-span-2 aspect-[3/2] md:aspect-[4/5]"
          />
          <DestinationTile
            d={t.destinations[7]}
            index={7}
            className="col-span-2 md:col-span-2 aspect-[3/2] md:aspect-[4/5]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 text-center text-sm"
          style={{ color: MUTED, fontFamily: SANS }}
        >
          {t.destPhoto}
        </motion.p>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: CREAM }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/5] order-2 md:order-1"
          >
            <Image
              src="/projects/alma-de-nomada/ainhoa-tramites.jpg"
              alt="Ainhoa in Australia"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              quality={85}
            />
            <div
              className="absolute -bottom-5 -right-5 px-5 py-3 shadow-lg flex items-center gap-3"
              style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
            >
              <span className="text-lg">🇦🇺</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
                {t.ausFlag}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 md:order-2"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: TERRACOTA, fontFamily: MONO }}
            >
              {t.ausLabel}
            </p>
            <h2
              className="text-3xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: DISPLAY, fontWeight: 700, color: FOREST, letterSpacing: "-0.025em" }}
            >
              {t.ausA}
              <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
                {t.ausHl}
              </span>
            </h2>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: FOREST, fontFamily: SANS, fontWeight: 300 }}
            >
              {t.ausP}
            </p>
            <ul className="mt-6 space-y-2 text-sm" style={{ color: FOREST }}>
              {t.ausList.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: TERRACOTA }}
                  />
                  <span style={{ fontFamily: SANS }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden"
        style={{ background: FOREST_DARK, color: BG }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: TERRACOTA, filter: "blur(120px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-center">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-6"
              style={{ color: TERRACOTA, fontFamily: MONO }}
            >
              {t.creatorLabel}
            </p>
            <h2
              className="text-3xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.025em" }}
            >
              {t.creatorA}
              <span style={{ color: TERRACOTA, fontStyle: "italic" }}>{t.creatorHl}</span>
              {t.creatorB}
            </h2>

            <p
              className="mt-8 text-lg md:text-2xl leading-snug"
              style={{ fontFamily: DISPLAY, fontWeight: 400, color: "rgba(250,246,232,0.85)" }}
            >
              {t.creatorQuoteA}
              <span style={{ color: TERRACOTA, fontStyle: "italic" }}>
                {t.creatorQuoteHl}
              </span>
              {t.creatorQuoteB}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-sm">
              <div className="pb-4 border-b" style={{ borderColor: FOREST_LINE }}>
                <p
                  className="text-3xl md:text-4xl"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    color: TERRACOTA,
                    letterSpacing: "-0.02em",
                  }}
                >
                  44K
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mt-1 opacity-60"
                  style={{ fontFamily: MONO }}
                >
                  {t.followers}
                </p>
              </div>
              <div className="pb-4 border-b" style={{ borderColor: FOREST_LINE }}>
                <p
                  className="text-2xl md:text-3xl"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    color: BG,
                    letterSpacing: "-0.02em",
                  }}
                >
                  España · AU
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mt-1 opacity-60"
                  style={{ fontFamily: MONO }}
                >
                  {t.livesIn}
                </p>
              </div>
            </div>

            <a
              href="https://instagram.com/ainhhgarcia"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="mt-10 inline-flex items-center gap-3 px-5 py-3 border rounded-full hover:opacity-100 transition-opacity"
              style={{ borderColor: FOREST_LINE, color: BG }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: TERRACOTA }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ fontFamily: MONO }}
              >
                {t.igTag}
              </span>
              <span>↗</span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="relative w-full"
          >
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 8px rgba(250,246,232,0.06)",
              }}
            >
              <Image
                src="/projects/alma-de-nomada/ainhoa-portrait.jpg"
                alt="Ainhoa, founder"
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover"
                quality={85}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(19,46,41,0) 55%, rgba(19,46,41,0.45) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: TERRACOTA }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: BG, fontFamily: MONO }}
                >
                  {t.creatorPin}
                </span>
              </div>
            </div>
            <div
              className="absolute -top-3 -left-3 px-3 py-1.5"
              style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
                {t.creatorBadge}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.pillarsLabel}
          </p>
          <h3
            className="text-2xl md:text-5xl leading-[1.05]"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: FOREST, letterSpacing: "-0.02em" }}
          >
            {t.pillarsTitleA}
            <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
              {t.pillarsTitleHl}
            </span>
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={
            {
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            } as Variants
          }
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {t.pillars.map((p) => (
            <motion.div
              key={p.n}
              variants={
                {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                } as Variants
              }
              className="border-t pt-6"
              style={{ borderColor: BORDER }}
            >
              <span className="text-xs" style={{ color: TERRACOTA, fontFamily: MONO }}>
                {p.n}
              </span>
              <h4
                className="mt-3 text-xl md:text-2xl leading-tight"
                style={{ fontFamily: DISPLAY, fontWeight: 600, color: FOREST }}
              >
                {p.title}
              </h4>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-28 border-t"
        style={{ borderColor: BORDER }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              {t.ownLabel}
            </p>
            <h3
              className="text-2xl md:text-5xl leading-[1.05]"
              style={{ fontFamily: DISPLAY, fontWeight: 700, color: FOREST, letterSpacing: "-0.02em" }}
            >
              {t.ownA}
              <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
                {t.ownHl}
              </span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="space-y-0">
              {t.ownList.map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-4 py-3 border-b text-sm md:text-base"
                  style={{ borderColor: BORDER }}
                >
                  <span
                    className="text-[10px] mt-1.5 shrink-0"
                    style={{ color: TERRACOTA, fontFamily: MONO, fontWeight: 500 }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: FOREST, fontFamily: SANS }}>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Next.js 16",
                "Tailwind v4",
                "Vercel",
                "Poppins",
                "Changa",
                "CMS custom",
                "Lead capture",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border"
                  style={{ borderColor: BORDER, color: FOREST, fontFamily: MONO }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-28 md:py-48 relative overflow-hidden"
        style={{ background: FOREST, color: BG }}
      >
        <ExpandingRings
          color={TERRACOTA}
          className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] opacity-40"
        />
        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-4xl md:text-8xl leading-[0.95] md:leading-[0.9]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: BG,
              letterSpacing: "-0.035em",
            }}
          >
            {t.closingA}
            <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
              {t.closingHl}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(250,246,232,0.72)", fontFamily: SANS }}
          >
            {t.closingP}
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://almadenomada.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
            >
              {t.ctaSee}
              <span>↗</span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: "rgba(250,246,232,0.6)", fontFamily: MONO }}
            >
              {t.ctaBack}
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: BORDER, background: BG }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: MONO, color: FOREST }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} · {t.footerNote}
        </span>
      </footer>
    </div>
  );
}
