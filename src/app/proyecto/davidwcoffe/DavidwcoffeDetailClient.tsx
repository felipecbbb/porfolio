"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";

/* Paleta bloqueada del cliente: dos colores. */
const MERLOT = "#3b0000";
const MERLOT2 = "#2b0000";
const APRICOT = "#ffd482";
const APRICOT2 = "#ffe4ad";
const BODY = "rgba(255,212,130,0.74)";
const LINE = "rgba(255,212,130,0.22)";

const DISPLAY = "var(--font-anton), 'Arial Narrow', system-ui, sans-serif";
const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS = "'Inter', var(--font-geist-sans), system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = { n: string; t: string; d: string; tag: string };
type Axis = { t: string; d: string };
type Pack = { name: string; price: string; line: string; best?: boolean };
type Quote = { q: string; who: string; where: string };
type Stat = { n: string; u: string };

type Dict = {
  back: string;
  badge: string;
  heroTitle: string;
  heroSub: string;
  role: string;
  scroll: string;
  introLabel: string;
  introTitle: string;
  introText: string;
  approach: { t: string; d: string }[];
  methodLabel: string;
  methodTitle: string;
  methodSub: string;
  phases: Phase[];
  axisLabel: string;
  axisTitle: string;
  axes: Axis[];
  svcLabel: string;
  svcTitle: string;
  svcNote: string;
  packs: Pack[];
  bestTag: string;
  galLabel: string;
  galTitle: string;
  prodLabel: string;
  prodTitle: string;
  prodText: string;
  prodMeta: string;
  testLabel: string;
  testTitle: string;
  commStats: Stat[];
  quotes: Quote[];
  buildLabel: string;
  buildTitle: string;
  buildStats: Stat[];
  ctaLabel: string;
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
};

const T: Record<Lang, Dict> = {
  es: {
    back: "Proyectos",
    badge: "Web · Coach de mindset & hábitos",
    heroTitle: "Construye la versión de ti que no se rinde.",
    heroSub:
      "Diseño y desarrollo de la web completa de David W. Coffe — coach con +275K de comunidad. Identidad editorial de dos colores, fotografía en blanco y negro y un modelo de negocio sin embudos de llamada gratis.",
    role: "Diseño · Desarrollo · Dirección de marca",
    scroll: "Desliza",
    introLabel: "El encargo",
    introTitle: "Una comunidad enorme. Cero web.",
    introText:
      "David tenía más de 275.000 personas entre Instagram, TikTok y YouTube, pero ninguna casa propia. El reto: traducir la seriedad de un servicio premium 1 a 1 a una web —sin caer en la estética de infoproducto (llamadas gratis, urgencias falsas)— respetando una dirección de marca cerradísima que él mismo marcó: solo dos colores y fotografía exclusivamente en blanco y negro.",
    approach: [
      {
        t: "Editorial, no infoproducto",
        d: "Tipografía de revista (Anton, Fraunces en cursiva e Inter) y mucho aire. Se lee como una marca personal premium, no como una landing de embudo.",
      },
      {
        t: "Paleta bloqueada",
        d: "Granate quemado y albaricoque dorado. Dos colores, cero excepciones — la restricción es la identidad.",
      },
      {
        t: "Sin llamada gratis",
        d: "Todos los CTA llevan a sesión de pago o a la libreta. El posicionamiento se mantiene honesto con su audiencia.",
      },
    ],
    methodLabel: "Lo que cuenta la web",
    methodTitle: "El método, en cuatro fases.",
    methodSub: "Un objetivo: que cuando termine, no le necesites más.",
    phases: [
      { n: "01", t: "Diagnóstico real", d: "Hábitos, energía, sueño, foco. Identificamos los 2–3 puntos que están drenando todo lo demás.", tag: "Sesión 1" },
      { n: "02", t: "Diseño del sistema", d: "Rutina de mañana, deep work, movimiento, cierre de día. Reglas no negociables adaptadas a tu vida real.", tag: "Sesión 2" },
      { n: "03", t: "Ejecución acompañada", d: "Sesiones cada 1–2 semanas y ajuste por mensaje entre medias. Aquí derribamos resistencias.", tag: "Intermedias" },
      { n: "04", t: "Anclaje e independencia", d: "Documentamos tu sistema y tus rutas de recuperación cuando caigas. Para que no me necesites.", tag: "Cierre" },
    ],
    axisLabel: "Los 5 ejes",
    axisTitle: "Lo que se trabaja.",
    axes: [
      { t: "Mindset", d: "Diálogo interno, identidad, gestión de la presión. La base de todo." },
      { t: "Hábitos", d: "Rutina de mañana, cierre de día, deep work, movimiento. Los engranajes invisibles." },
      { t: "Energía", d: "Sueño, alimentación, deporte. Optimizamos por rendimiento, no por moda." },
      { t: "Foco", d: "Menos fricción digital, atención real, deep work. Recuperar la cabeza." },
      { t: "Propósito", d: "Hacia dónde vas y por qué. Sin esto, ningún sistema dura." },
    ],
    svcLabel: "Servicios",
    svcTitle: "Tres formatos, una modalidad.",
    svcNote: "Todas las sesiones son online, por videollamada. Idiomas: español · english.",
    packs: [
      { name: "Impulso", price: "75€", line: "1 sesión de 60 min. Diagnóstico claro + plan de acción a 2 semanas. Ideal para probar." },
      { name: "Evolución", price: "350€", line: "5 sesiones. Diseño de tu sistema de hábitos, seguimiento por mensaje y libreta gratis.", best: true },
      { name: "Transformación", price: "680€", line: "10 sesiones. Mindset, hábitos, energía y foco a fondo, con acompañamiento por WhatsApp." },
    ],
    bestTag: "Más elegido",
    galLabel: "El universo de la marca",
    galTitle: "Surf, coches, disciplina.",
    prodLabel: "Producto",
    prodTitle: "La Libreta de los 90 días.",
    prodText:
      "El producto de entrada: una libreta de hábitos para convertir al público que aún no está listo para una sesión. Vive en la home como producto destacado y mantiene la misma estética de dos colores.",
    prodMeta: "24€ · en pre-reserva · salida primavera 2026",
    testLabel: "Casos reales",
    testTitle: "Lo que dicen.",
    commStats: [
      { n: "+275K", u: "comunidad en redes" },
      { n: "4.9/5", u: "valoración media" },
      { n: "94%", u: "recomienda a un amigo" },
    ],
    quotes: [
      { q: "Llegué quemado y sin ganas de nada. En 12 semanas dejé de procrastinar, monté mi rutina y por primera vez en años siento que voy hacia algún sitio.", who: "Marcos R.", where: "México" },
      { q: "Esperaba motivación. Me llevé sistema. Eso es lo que faltaba. Hoy tengo días que antes me parecían imposibles, y lo mejor: no me cuesta.", who: "Laura V.", where: "Argentina" },
      { q: "Estaba a punto de dejar mi proyecto por agotamiento. Me ayudó a separar lo urgente de lo importante. Mi negocio creció y dejé de odiar los lunes.", who: "Javi L.", where: "Perú" },
    ],
    buildLabel: "Lo que construí",
    buildTitle: "La web, en números.",
    buildStats: [
      { n: "7", u: "páginas a medida" },
      { n: "2", u: "colores (paleta bloqueada)" },
      { n: "100%", u: "fotografía en B/N" },
      { n: "0", u: "dependencias · carga instantánea" },
    ],
    ctaLabel: "Proyecto en producción",
    ctaTitle: "Míralo en vivo.",
    ctaSub: "Diseño y desarrollo completos, fieles a la dirección de marca.",
    ctaBtn: "Visitar davidwcoffe.com",
  },
  en: {
    back: "Projects",
    badge: "Web · Mindset & habits coach",
    heroTitle: "Build the version of you that doesn't quit.",
    heroSub:
      "Full website design and build for David W. Coffe — a coach with a 275K+ community. Editorial two-colour identity, black-and-white photography and a business model with no free-call funnels.",
    role: "Design · Development · Brand direction",
    scroll: "Scroll",
    introLabel: "The brief",
    introTitle: "A huge community. No website.",
    introText:
      "David had over 275,000 people across Instagram, TikTok and YouTube, but no home of his own. The challenge: translate the seriousness of a premium 1-on-1 service into a website —without falling into info-product aesthetics (free calls, fake urgency)— respecting a tightly locked brand direction he set himself: only two colours and strictly black-and-white photography.",
    approach: [
      { t: "Editorial, not info-product", d: "Magazine type (Anton, italic Fraunces and Inter) and lots of air. It reads like a premium personal brand, not a funnel landing." },
      { t: "Locked palette", d: "Burnt merlot and golden apricot. Two colours, zero exceptions — the constraint is the identity." },
      { t: "No free call", d: "Every CTA goes to a paid session or the notebook. Positioning stays honest with his audience." },
    ],
    methodLabel: "What the site tells",
    methodTitle: "The method, in four phases.",
    methodSub: "One goal: that when it's over, you no longer need him.",
    phases: [
      { n: "01", t: "Real diagnosis", d: "Habits, energy, sleep, focus. We pin down the 2–3 things draining everything else.", tag: "Session 1" },
      { n: "02", t: "System design", d: "Morning routine, deep work, movement, day shutdown. Non-negotiable rules fit to your real life.", tag: "Session 2" },
      { n: "03", t: "Guided execution", d: "Sessions every 1–2 weeks plus message tweaks in between. This is where we break resistance.", tag: "In between" },
      { n: "04", t: "Anchoring & independence", d: "We document your system and your recovery routes for when you slip. So you don't need me.", tag: "Close" },
    ],
    axisLabel: "The 5 axes",
    axisTitle: "What we work on.",
    axes: [
      { t: "Mindset", d: "Self-talk, identity, handling pressure. The base of everything." },
      { t: "Habits", d: "Morning routine, day shutdown, deep work, movement. The invisible gears." },
      { t: "Energy", d: "Sleep, food, sport. Optimised for performance, not for trends." },
      { t: "Focus", d: "Less digital friction, real attention, deep work. Get your head back." },
      { t: "Purpose", d: "Where you're going and why. Without it, no system lasts." },
    ],
    svcLabel: "Services",
    svcTitle: "Three formats, one mode.",
    svcNote: "All sessions are online, by video call. Languages: Spanish · English.",
    packs: [
      { name: "Impulso", price: "€75", line: "1 × 60-min session. Clear diagnosis + a 2-week action plan. Ideal to try it out." },
      { name: "Evolución", price: "€350", line: "5 sessions. Habit-system design, message follow-up and a free notebook.", best: true },
      { name: "Transformación", price: "€680", line: "10 sessions. Mindset, habits, energy and focus in depth, with WhatsApp support." },
    ],
    bestTag: "Most chosen",
    galLabel: "The brand universe",
    galTitle: "Surf, cars, discipline.",
    prodLabel: "Product",
    prodTitle: "La Libreta de los 90 días.",
    prodText:
      "The entry product: a habits notebook to convert the audience not yet ready for a session. It lives on the homepage as a featured product and keeps the same two-colour aesthetic.",
    prodMeta: "€24 · on pre-order · shipping spring 2026",
    testLabel: "Real cases",
    testTitle: "What they say.",
    commStats: [
      { n: "275K+", u: "social community" },
      { n: "4.9/5", u: "average rating" },
      { n: "94%", u: "would recommend" },
    ],
    quotes: [
      { q: "I arrived burnt out and unmotivated. In 12 weeks I stopped procrastinating, built my routine and for the first time in years I feel like I'm going somewhere.", who: "Marcos R.", where: "Mexico" },
      { q: "I expected motivation. I got a system. That's what was missing. Today I have days that used to feel impossible — and the best part: it's effortless.", who: "Laura V.", where: "Argentina" },
      { q: "I was about to quit my project from exhaustion. He helped me separate urgent from important. My business grew and I stopped hating Mondays.", who: "Javi L.", where: "Peru" },
    ],
    buildLabel: "What I built",
    buildTitle: "The site, in numbers.",
    buildStats: [
      { n: "7", u: "bespoke pages" },
      { n: "2", u: "colours (locked palette)" },
      { n: "100%", u: "black-and-white photography" },
      { n: "0", u: "dependencies · instant load" },
    ],
    ctaLabel: "Live project",
    ctaTitle: "See it live.",
    ctaSub: "Full design and development, true to the brand direction.",
    ctaBtn: "Visit davidwcoffe.com",
  },
  de: {
    back: "Projekte",
    badge: "Web · Mindset- & Gewohnheits-Coach",
    heroTitle: "Bau die Version von dir, die nicht aufgibt.",
    heroSub:
      "Design und Entwicklung der kompletten Website von David W. Coffe — Coach mit einer Community von über 275K. Redaktionelle Zwei-Farben-Identität, Schwarz-Weiß-Fotografie und ein Geschäftsmodell ohne Gratis-Call-Funnels.",
    role: "Design · Entwicklung · Markenführung",
    scroll: "Scrollen",
    introLabel: "Der Auftrag",
    introTitle: "Eine riesige Community. Keine Website.",
    introText:
      "David hatte über 275.000 Menschen auf Instagram, TikTok und YouTube, aber kein eigenes Zuhause. Die Herausforderung: die Seriosität eines Premium-1-zu-1-Service in eine Website übersetzen —ohne Infoprodukt-Ästhetik (Gratis-Calls, falsche Dringlichkeit)— bei einer eng festgelegten Markenrichtung, die er selbst vorgab: nur zwei Farben und ausschließlich Schwarz-Weiß-Fotografie.",
    approach: [
      { t: "Redaktionell, kein Infoprodukt", d: "Magazin-Typografie (Anton, kursive Fraunces und Inter) und viel Luft. Liest sich wie eine Premium-Personenmarke, nicht wie eine Funnel-Landing." },
      { t: "Festgelegte Palette", d: "Burnt Merlot und goldenes Apricot. Zwei Farben, null Ausnahmen — die Beschränkung ist die Identität." },
      { t: "Kein Gratis-Call", d: "Jeder CTA führt zu einer bezahlten Sitzung oder zum Notizbuch. Die Positionierung bleibt ehrlich." },
    ],
    methodLabel: "Was die Site erzählt",
    methodTitle: "Die Methode, in vier Phasen.",
    methodSub: "Ein Ziel: dass du ihn am Ende nicht mehr brauchst.",
    phases: [
      { n: "01", t: "Echte Diagnose", d: "Gewohnheiten, Energie, Schlaf, Fokus. Wir finden die 2–3 Punkte, die alles andere auslaugen.", tag: "Sitzung 1" },
      { n: "02", t: "System-Design", d: "Morgenroutine, Deep Work, Bewegung, Tagesabschluss. Nicht verhandelbare Regeln für dein echtes Leben.", tag: "Sitzung 2" },
      { n: "03", t: "Begleitete Umsetzung", d: "Sitzungen alle 1–2 Wochen plus Feinjustierung per Nachricht. Hier brechen wir Widerstände.", tag: "Dazwischen" },
      { n: "04", t: "Verankerung & Unabhängigkeit", d: "Wir dokumentieren dein System und deine Erholungswege für Rückschläge. Damit du mich nicht brauchst.", tag: "Abschluss" },
    ],
    axisLabel: "Die 5 Achsen",
    axisTitle: "Woran wir arbeiten.",
    axes: [
      { t: "Mindset", d: "Innerer Dialog, Identität, Umgang mit Druck. Die Basis von allem." },
      { t: "Gewohnheiten", d: "Morgenroutine, Tagesabschluss, Deep Work, Bewegung. Die unsichtbaren Zahnräder." },
      { t: "Energie", d: "Schlaf, Ernährung, Sport. Optimiert für Leistung, nicht für Trends." },
      { t: "Fokus", d: "Weniger digitale Reibung, echte Aufmerksamkeit, Deep Work. Den Kopf zurückholen." },
      { t: "Sinn", d: "Wohin du gehst und warum. Ohne ihn hält kein System." },
    ],
    svcLabel: "Leistungen",
    svcTitle: "Drei Formate, eine Modalität.",
    svcNote: "Alle Sitzungen online, per Videocall. Sprachen: Spanisch · English.",
    packs: [
      { name: "Impulso", price: "75€", line: "1 × 60-Min-Sitzung. Klare Diagnose + 2-Wochen-Aktionsplan. Ideal zum Testen." },
      { name: "Evolución", price: "350€", line: "5 Sitzungen. Gewohnheitssystem-Design, Nachverfolgung per Nachricht und Gratis-Notizbuch.", best: true },
      { name: "Transformación", price: "680€", line: "10 Sitzungen. Mindset, Gewohnheiten, Energie und Fokus in der Tiefe, mit WhatsApp-Support." },
    ],
    bestTag: "Am meisten gewählt",
    galLabel: "Das Markenuniversum",
    galTitle: "Surf, Autos, Disziplin.",
    prodLabel: "Produkt",
    prodTitle: "La Libreta de los 90 días.",
    prodText:
      "Das Einstiegsprodukt: ein Gewohnheits-Notizbuch, um Publikum zu konvertieren, das noch nicht für eine Sitzung bereit ist. Es lebt auf der Startseite als Featured-Produkt und behält dieselbe Zwei-Farben-Ästhetik.",
    prodMeta: "24€ · im Vorverkauf · Auslieferung Frühjahr 2026",
    testLabel: "Echte Fälle",
    testTitle: "Was sie sagen.",
    commStats: [
      { n: "275K+", u: "Social-Community" },
      { n: "4.9/5", u: "Durchschnittsbewertung" },
      { n: "94%", u: "würden es empfehlen" },
    ],
    quotes: [
      { q: "Ich kam ausgebrannt und ohne Antrieb. In 12 Wochen hörte ich auf zu prokrastinieren, baute meine Routine und fühle zum ersten Mal seit Jahren, dass ich irgendwohin gehe.", who: "Marcos R.", where: "Mexiko" },
      { q: "Ich erwartete Motivation. Ich bekam ein System. Das hatte gefehlt. Heute habe ich Tage, die früher unmöglich schienen — und das Beste: mühelos.", who: "Laura V.", where: "Argentinien" },
      { q: "Ich wollte mein Projekt aus Erschöpfung aufgeben. Er half mir, Dringendes von Wichtigem zu trennen. Mein Geschäft wuchs und ich hasste Montage nicht mehr.", who: "Javi L.", where: "Peru" },
    ],
    buildLabel: "Was ich gebaut habe",
    buildTitle: "Die Website, in Zahlen.",
    buildStats: [
      { n: "7", u: "maßgeschneiderte Seiten" },
      { n: "2", u: "Farben (festgelegte Palette)" },
      { n: "100%", u: "Schwarz-Weiß-Fotografie" },
      { n: "0", u: "Abhängigkeiten · sofortiges Laden" },
    ],
    ctaLabel: "Live-Projekt",
    ctaTitle: "Sieh es live.",
    ctaSub: "Komplettes Design und Entwicklung, treu zur Markenrichtung.",
    ctaBtn: "davidwcoffe.com besuchen",
  },
};

const GALLERY = [
  "/projects/davidwcoffe/g-surf1.jpg",
  "/projects/davidwcoffe/g-porsche.jpg",
  "/projects/davidwcoffe/g-crew.jpg",
  "/projects/davidwcoffe/g-surf2.jpg",
  "/projects/davidwcoffe/g-lambo.jpg",
  "/projects/davidwcoffe/g-surf3.jpg",
];

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE },
};

export default function DavidwcoffeDetailClient() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div style={{ background: MERLOT, color: APRICOT, fontFamily: SANS }}>
      {/* HEADER */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(59,0,0,0.72)", borderBottom: `1px solid ${LINE}` }}
      >
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link
            href="/proyectos"
            className="text-sm flex items-center gap-2 transition"
            style={{ color: BODY }}
          >
            <span style={{ color: APRICOT }}>←</span> {t.back}
          </Link>
          <span className="text-sm tracking-[0.18em] uppercase" style={{ fontWeight: 600 }}>
            David W. Coffe
          </span>
          <LangSwitcher tone="light" />
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-dvh flex items-end overflow-hidden">
        <Image
          src="/projects/davidwcoffe/hero.jpg"
          alt="David W. Coffe"
          fill
          priority
          quality={86}
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(59,0,0,0.55) 0%, rgba(59,0,0,0.35) 38%, rgba(59,0,0,0.97) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-32 w-full">
          <span
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: APRICOT }}
          >
            {t.badge}
          </span>
          <h1
            className="mt-6 max-w-4xl"
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.6rem, 7vw, 5.4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: APRICOT2,
            }}
          >
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: BODY }}>
            {t.heroSub}
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,212,130,0.5)" }}
          >
            <span>{t.role}</span>
            <span style={{ color: APRICOT }}>·</span>
            <span>2026</span>
            <span style={{ color: APRICOT }}>·</span>
            <span>Tenerife</span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: APRICOT }}>
          {t.introLabel}
        </motion.p>
        <motion.h2
          {...fade}
          style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.1, color: APRICOT2 }}
        >
          {t.introTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-7 text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: BODY }}>
          {t.introText}
        </motion.p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {t.approach.map((a, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="pt-5"
              style={{ borderTop: `1px solid ${LINE}` }}
            >
              <h3 className="text-lg" style={{ fontWeight: 600, color: APRICOT }}>{a.t}</h3>
              <p className="mt-2 leading-relaxed text-sm" style={{ color: BODY }}>{a.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BANDA CINEMÁTICA */}
      <section className="relative w-full aspect-[21/9] overflow-hidden">
        <Image src="/projects/davidwcoffe/banda.jpg" alt="" fill quality={82} sizes="100vw" className="object-cover" style={{ opacity: 0.62 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(59,0,0,0.5) 0%, rgba(59,0,0,0.2) 40%, rgba(59,0,0,0.85) 100%)" }} />
      </section>

      {/* MÉTODO — 4 FASES */}
      <section className="py-24 md:py-32" style={{ background: MERLOT2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.methodLabel}</motion.p>
          <motion.h2 {...fade} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.methodTitle}</motion.h2>
          <motion.p {...fade} className="mt-4 max-w-xl" style={{ color: BODY }}>{t.methodSub}</motion.p>
          <div className="mt-14 grid md:grid-cols-2 gap-x-10 gap-y-12">
            {t.phases.map((p, i) => (
              <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: (i % 2) * 0.1 }} className="flex gap-5">
                <div style={{ fontFamily: DISPLAY, fontSize: "clamp(2.4rem,5vw,3.6rem)", lineHeight: 0.9, color: "rgba(255,212,130,0.35)" }}>{p.n}</div>
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl" style={{ fontWeight: 600, color: APRICOT }}>{p.t}</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full" style={{ border: `1px solid ${LINE}`, color: BODY }}>{p.tag}</span>
                  </div>
                  <p className="mt-2 leading-relaxed" style={{ color: BODY }}>{p.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 EJES */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.axisLabel}</motion.p>
        <motion.h2 {...fade} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.axisTitle}</motion.h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: LINE, border: `1px solid ${LINE}` }}>
          {t.axes.map((a, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }} className="p-6" style={{ background: MERLOT }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: "rgba(255,212,130,0.35)" }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 text-lg" style={{ fontWeight: 600, color: APRICOT }}>{a.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{a.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-24 md:py-32" style={{ background: MERLOT2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.svcLabel}</motion.p>
          <motion.h2 {...fade} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.svcTitle}</motion.h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {t.packs.map((p, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.1 }}
                className="relative p-7 rounded-2xl flex flex-col"
                style={{
                  background: p.best ? APRICOT : "transparent",
                  color: p.best ? MERLOT : APRICOT,
                  border: `1px solid ${p.best ? APRICOT : LINE}`,
                }}
              >
                {p.best && (
                  <span className="absolute -top-3 left-7 text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full" style={{ background: MERLOT, color: APRICOT }}>
                    {t.bestTag}
                  </span>
                )}
                <h3 style={{ fontFamily: DISPLAY, fontSize: "1.7rem", letterSpacing: "0.02em" }}>{p.name}</h3>
                <div className="mt-1 text-3xl" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{p.price}</div>
                <p className="mt-4 leading-relaxed text-sm" style={{ color: p.best ? "rgba(59,0,0,0.78)" : BODY }}>{p.line}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fade} className="mt-8 text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(255,212,130,0.5)" }}>{t.svcNote}</motion.p>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.galLabel}</motion.p>
        <motion.h2 {...fade} className="mb-12" style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.galTitle}</motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: (i % 3) * 0.07 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              style={{ background: MERLOT2 }}
            >
              <Image src={src} alt="" fill quality={80} sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ opacity: 0.9 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(59,0,0,0.1) 0%, rgba(59,0,0,0.35) 100%)", mixBlendMode: "multiply" }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* LA LIBRETA */}
      <section className="py-24 md:py-32" style={{ background: MERLOT2 }}>
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fade}>
            <p className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.prodLabel}</p>
            <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.prodTitle}</h2>
            <p className="mt-6 leading-relaxed max-w-md" style={{ color: BODY }}>{t.prodText}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.18em]" style={{ color: APRICOT }}>{t.prodMeta}</p>
          </motion.div>
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] flex flex-col items-center justify-center text-center p-8"
            style={{ border: `1px solid ${LINE}`, background: MERLOT }}
          >
            <span style={{ fontFamily: DISPLAY, fontSize: "clamp(2.6rem,7vw,4.4rem)", lineHeight: 0.92, color: APRICOT2 }}>HAZLO</span>
            <span className="my-3" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.4rem", color: APRICOT }}>y</span>
            <span className="block rounded-full" style={{ width: 76, height: 76, background: APRICOT }} />
            <span className="mt-8 text-[11px] uppercase tracking-[0.3em]" style={{ color: BODY }}>La Libreta de los 90 días</span>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: APRICOT }}>{t.testLabel}</motion.p>
        <motion.h2 {...fade} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: APRICOT2 }}>{t.testTitle}</motion.h2>

        <div className="mt-10 grid grid-cols-3 gap-6 max-w-2xl">
          {t.commStats.map((s, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: APRICOT }}>{s.n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.12em]" style={{ color: "rgba(255,212,130,0.5)" }}>{s.u}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {t.quotes.map((c, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="p-6 rounded-xl" style={{ border: `1px solid ${LINE}` }}>
              <div style={{ color: APRICOT, letterSpacing: "0.15em" }}>★★★★★</div>
              <p className="mt-4 leading-relaxed text-sm" style={{ color: APRICOT2 }}>“{c.q}”</p>
              <div className="mt-5 text-xs uppercase tracking-[0.14em]" style={{ color: BODY }}>{c.who} · {c.where}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS DEL PROYECTO */}
      <section className="py-16" style={{ background: MERLOT2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-10" style={{ color: APRICOT }}>{t.buildLabel}</motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.buildStats.map((s, i) => (
              <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
                <div style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem,4vw,3rem)", color: APRICOT }}>{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: "rgba(255,212,130,0.5)" }}>{s.u}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: APRICOT }}>{t.ctaLabel}</motion.p>
        <motion.h2 {...fade} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.6rem)", lineHeight: 1.05, color: APRICOT2 }}>{t.ctaTitle}</motion.h2>
        <motion.p {...fade} className="mt-4" style={{ color: BODY }}>{t.ctaSub}</motion.p>
        <motion.a
          {...fade}
          href="https://davidwcoffe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full px-8 py-4 transition hover:brightness-105"
          style={{ background: APRICOT, color: MERLOT, fontWeight: 600 }}
        >
          {t.ctaBtn} →
        </motion.a>
      </section>

      <SiteFooter />
    </div>
  );
}
