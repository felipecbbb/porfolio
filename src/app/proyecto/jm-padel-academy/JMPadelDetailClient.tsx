"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

/* ── Brand tokens REALES (extraídos del CSS de producción) ── */
const COURT_BLUE = "#3858B8";
const COURT_BLUE_DEEP = "#283F86";
const COURT_BLUE_DARKER = "#1A2B5F";
const LIME = "#E0F657";
const LIME_SOFT = "#ECFA9A";
const LIME_DEEP = "#B8CC32";
const INK = "#0E1A2B";
const INK_SOFT = "#2A3950";
const PAPER = "#F4F1E8";
const PAPER_WARM = "#EFEBDD";
const PAPER_COOL = "#F8F8F2";
const LINE = "#D9D3C0";
const WHITE = "#FFFFFF";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const SANS = "var(--font-inter-tight), system-ui, sans-serif";

type Copy = {
  badge: string;
  back: string;
  hero1: string;
  hero2: string;
  heroTagline: string;
  heroP: string;
  marquee: string[];
  challengeLabel: string;
  challengeTitle: string;
  challengeBody: string;
  systemLabel: string;
  systemTitle: string;
  systemBody: string;
  systemPoints: { title: string; body: string }[];
  versionsLabel: string;
  versionsTitle: string;
  versions: { img: string; label: string; on: string; bg: string }[];
  methodLabel: string;
  methodTitle: string;
  methodBody: string;
  programsLabel: string;
  programsTitle: string;
  programsBody: string;
  guidesLabel: string;
  guidesTitle: string;
  guidesBody: string;
  guides: { src: string; title: string }[];
  stackLabel: string;
  stackTitle: string;
  stackBody: string;
  stackItems: string[];
  closingTitle: string;
  closingP: string;
  visit: string;
  cta: string;
  footerNote: string;
};

const T: Record<Lang, Copy> = {
  es: {
    badge: "Web + Branding · Academia de pádel",
    back: "Volver a proyectos",
    hero1: "JM Padel",
    hero2: "Academy.",
    heroTagline: "Eleva tu juego.",
    heroP:
      "Sistema completo: identidad visual, web full-stack con e-commerce, 3 vídeos de método grabados en producción, 8 guías formativas descargables y un ebook. Branding y desarrollo para una academia que quería diferenciarse de verdad — no solo otra escuela de pádel con foto de raqueta en el hero.",
    marquee: [
      "ELEVA TU JUEGO",
      "·",
      "PADEL ACADEMY",
      "·",
      "WEB",
      "·",
      "BRANDING",
      "·",
      "E-COMMERCE",
      "·",
      "STRIPE",
      "·",
      "EBOOK",
      "·",
      "MÉTODO",
      "·",
    ],
    challengeLabel: "01 · El reto",
    challengeTitle: "Diferenciarse en un mercado donde todos comunican igual.",
    challengeBody:
      "Las academias de pádel suelen comunicar igual: foto de raqueta sobre fondo azul, fuente bold genérica, eslogan vacío. JM quería destacar — y necesitaba un sistema, no un logo suelto. Identidad, web con checkout para programas y guías, ebook formativo, newsletter, plantillas de redes. Todo coherente, todo construido desde cero.",
    systemLabel: "02 · El sistema visual",
    systemTitle: "La pista, convertida en sistema gráfico.",
    systemBody:
      "El logo no es invención libre — es la geometría real de una pista de pádel reducida a su esencia: dos marcos en L que contienen el nombre, una pala con líneas de movimiento y la pelota como único punto orgánico. Verde lima brillante sobre azul cancha. Cuando el sistema visual nace del propio deporte, todo lo que se aplica encima respira coherencia.",
    systemPoints: [
      {
        title: "Dos colores. Cero ruido.",
        body: "Azul cancha + verde lima. Sobre papel o sobre tinta. Sin gradientes, sin sombras, sin morados SaaS genéricos.",
      },
      {
        title: "Archivo Italic 900.",
        body: "Tipografía deportiva con peso real — la inclinación lleva el ojo hacia adelante. Display para impacto, Inter Tight para body.",
      },
      {
        title: "La pelota, la única curva.",
        body: "Todo el sistema es ortogonal salvo la pelota. Ese contraste — recta + círculo — es la firma reconocible de la marca.",
      },
    ],
    versionsLabel: "03 · Las versiones",
    versionsTitle: "Cuatro fondos. Una identidad.",
    versions: [
      { img: "/projects/jm-padel-academy/logo-color.png", label: "Color · sobre papel", on: "Paper", bg: PAPER },
      { img: "/projects/jm-padel-academy/isotype-on-blue.png", label: "Blanco · sobre cancha", on: "Court", bg: COURT_BLUE },
      { img: "/projects/jm-padel-academy/logo-mono.png", label: "Mono negro · sobre cool", on: "Paper", bg: PAPER_COOL },
      { img: "/projects/jm-padel-academy/logo-dark.png", label: "Blanco · sobre tinta", on: "Ink", bg: INK },
    ],
    methodLabel: "04 · El método",
    methodTitle: "Vídeo de bienvenida grabado en pista.",
    methodBody:
      "El hero de la web no es una foto de stock — es un vídeo grabado en producción que abre la web con el sonido de la pala golpeando la pelota. Tres minutos editados a 30 segundos para no perder al usuario, sin audio para autoplay, con un poster cuidado para el primer frame.",
    programsLabel: "05 · Los programas",
    programsTitle: "Cada programa, contado con su propio vídeo.",
    programsBody:
      "La academia ofrece tres niveles de programa: iniciación, perfeccionamiento y competición. Cada uno tiene su vídeo dedicado dentro de la página, con la misma estética de marca — para que el usuario entienda en qué se mete antes de pagar.",
    guidesLabel: "06 · Las guías",
    guidesTitle: "Ocho guías formativas descargables.",
    guidesBody:
      "Para captar leads y dar valor real antes de cualquier venta, diseñé 8 guías formativas (cada una con su portada propia) que el usuario descarga tras suscribirse a la newsletter. Conceptos básicos, saque y resto, posicionamiento, defensa de globos, juego aéreo, conexión con pareja, preparación física y adaptar el juego al rival.",
    guides: [
      { src: "/projects/jm-padel-academy/guides/conceptos-basicos.jpg", title: "Conceptos básicos" },
      { src: "/projects/jm-padel-academy/guides/saque-resto.jpg", title: "Saque y resto" },
      { src: "/projects/jm-padel-academy/guides/posicionamiento.jpg", title: "Posicionamiento" },
      { src: "/projects/jm-padel-academy/guides/defensa-globos.jpg", title: "Defensa de globos" },
      { src: "/projects/jm-padel-academy/guides/juego-aereo.jpg", title: "Juego aéreo" },
      { src: "/projects/jm-padel-academy/guides/conexion-pareja.jpg", title: "Conexión con tu pareja" },
      { src: "/projects/jm-padel-academy/guides/preparacion-fisica.jpg", title: "Preparación física" },
      { src: "/projects/jm-padel-academy/guides/adaptar-juego.jpg", title: "Adaptar el juego" },
    ],
    stackLabel: "07 · El stack",
    stackTitle: "Web full-stack desplegada en Vercel.",
    stackBody:
      "No es una landing estática — es una aplicación con checkout real, gestión de newsletter, validación de tokens, integración SMTP y webhooks de Stripe. Build optimizado con Vite, deploy en Vercel con funciones serverless, y Redis para caché y rate limiting.",
    stackItems: [
      "Vite + React",
      "Vercel Functions",
      "Stripe Checkout + Webhooks",
      "Brevo (SMTP transaccional)",
      "Redis (caché + rate limit)",
      "Newsletter con doble opt-in",
      "Descarga protegida por token",
      "i18n ES como principal",
    ],
    closingTitle: "La marca, en la pista. La web, en producción.",
    closingP:
      "JM Padel Academy es uno de los casos donde diseño, desarrollo y estrategia se cierran en una sola entrega. El branding nace de la geometría del propio deporte. La web no es vitrina — es máquina de captación y venta. Las guías no son relleno — son lead magnet real con valor formativo.",
    visit: "Visita jmpadelacademy.com",
    cta: "Ver más proyectos",
    footerNote: "Felipe Cámara · Branding & desarrollo full-stack",
  },
  en: {
    badge: "Web + Branding · Padel Academy",
    back: "Back to projects",
    hero1: "JM Padel",
    hero2: "Academy.",
    heroTagline: "Step up your game.",
    heroP:
      "Full system: visual identity, full-stack website with e-commerce, 3 method videos shot in production, 8 downloadable training guides and an ebook. Branding and development for an academy that wanted to actually stand out — not just another padel school with a racket photo in the hero.",
    marquee: [
      "STEP UP YOUR GAME",
      "·",
      "PADEL ACADEMY",
      "·",
      "WEB",
      "·",
      "BRANDING",
      "·",
      "E-COMMERCE",
      "·",
      "STRIPE",
      "·",
      "EBOOK",
      "·",
      "METHOD",
      "·",
    ],
    challengeLabel: "01 · The brief",
    challengeTitle: "Standing out in a market where everyone communicates the same.",
    challengeBody:
      "Padel academies usually communicate the same way: racket photo on blue background, generic bold font, empty slogan. JM wanted to stand out — and needed a system, not a single logo. Identity, website with checkout for programs and guides, training ebook, newsletter, social templates. All coherent, all built from scratch.",
    systemLabel: "02 · The visual system",
    systemTitle: "The court, turned into a graphic system.",
    systemBody:
      "The logo isn't a free invention — it's the actual geometry of a padel court reduced to its essence: two L-frames containing the name, a racket with motion lines and the ball as the only organic point. Bright lime green over court blue. When the visual system is born from the sport itself, everything applied on top breathes coherence.",
    systemPoints: [
      {
        title: "Two colors. Zero noise.",
        body: "Court blue + lime green. On paper or on ink. No gradients, no shadows, no generic SaaS purple.",
      },
      {
        title: "Archivo Italic 900.",
        body: "Sporty typography with real weight — the slant carries the eye forward. Display for impact, Inter Tight for body.",
      },
      {
        title: "The ball, the only curve.",
        body: "The entire system is orthogonal except for the ball. That contrast — straight + circle — is the brand's recognizable signature.",
      },
    ],
    versionsLabel: "03 · The versions",
    versionsTitle: "Four backgrounds. One identity.",
    versions: [
      { img: "/projects/jm-padel-academy/logo-color.png", label: "Color · on paper", on: "Paper", bg: PAPER },
      { img: "/projects/jm-padel-academy/isotype-on-blue.png", label: "White · on court", on: "Court", bg: COURT_BLUE },
      { img: "/projects/jm-padel-academy/logo-mono.png", label: "Mono black · on cool", on: "Paper", bg: PAPER_COOL },
      { img: "/projects/jm-padel-academy/logo-dark.png", label: "White · on ink", on: "Ink", bg: INK },
    ],
    methodLabel: "04 · The method",
    methodTitle: "Welcome video shot on court.",
    methodBody:
      "The web hero isn't a stock photo — it's a video shot in production that opens the site with the sound of paddle hitting ball. Three minutes edited to thirty seconds so the user doesn't bounce, muted for autoplay, with a curated poster for the first frame.",
    programsLabel: "05 · The programs",
    programsTitle: "Each program, told with its own video.",
    programsBody:
      "The academy offers three program levels: starter, improvement and competition. Each has its dedicated video inside the page, with the same brand aesthetics — so the user understands what they're getting into before paying.",
    guidesLabel: "06 · The guides",
    guidesTitle: "Eight downloadable training guides.",
    guidesBody:
      "To capture leads and provide real value before any sale, I designed 8 training guides (each with its own cover) that the user downloads after subscribing to the newsletter. Basic concepts, serve and return, positioning, lob defense, aerial play, partner connection, physical prep and adapting to the opponent.",
    guides: [
      { src: "/projects/jm-padel-academy/guides/conceptos-basicos.jpg", title: "Basic concepts" },
      { src: "/projects/jm-padel-academy/guides/saque-resto.jpg", title: "Serve & return" },
      { src: "/projects/jm-padel-academy/guides/posicionamiento.jpg", title: "Positioning" },
      { src: "/projects/jm-padel-academy/guides/defensa-globos.jpg", title: "Lob defense" },
      { src: "/projects/jm-padel-academy/guides/juego-aereo.jpg", title: "Aerial play" },
      { src: "/projects/jm-padel-academy/guides/conexion-pareja.jpg", title: "Partner connection" },
      { src: "/projects/jm-padel-academy/guides/preparacion-fisica.jpg", title: "Physical preparation" },
      { src: "/projects/jm-padel-academy/guides/adaptar-juego.jpg", title: "Adapting your game" },
    ],
    stackLabel: "07 · The stack",
    stackTitle: "Full-stack web deployed on Vercel.",
    stackBody:
      "Not a static landing — a real application with checkout, newsletter management, token validation, SMTP integration and Stripe webhooks. Optimized build with Vite, Vercel serverless functions, Redis for cache and rate limiting.",
    stackItems: [
      "Vite + React",
      "Vercel Functions",
      "Stripe Checkout + Webhooks",
      "Brevo (transactional SMTP)",
      "Redis (cache + rate limit)",
      "Newsletter with double opt-in",
      "Token-protected downloads",
      "i18n ES as main",
    ],
    closingTitle: "The brand, on court. The site, in production.",
    closingP:
      "JM Padel Academy is one of those cases where design, development and strategy close in a single delivery. The branding is born from the geometry of the sport itself. The website isn't a showcase — it's an acquisition and sales machine. The guides aren't filler — they're real lead magnets with formative value.",
    visit: "Visit jmpadelacademy.com",
    cta: "See more projects",
    footerNote: "Felipe Cámara · Branding & full-stack development",
  },
  de: {
    badge: "Web + Branding · Padel-Akademie",
    back: "Zurück zu Projekten",
    hero1: "JM Padel",
    hero2: "Academy.",
    heroTagline: "Steigere dein Spiel.",
    heroP:
      "Komplettes System: visuelle Identität, Full-Stack-Website mit E-Commerce, 3 Methoden-Videos in Produktion gedreht, 8 herunterladbare Lern-Guides und ein Ebook. Branding und Entwicklung für eine Akademie, die sich wirklich abheben wollte — nicht nur eine weitere Padel-Schule mit Schlägerfoto im Hero.",
    marquee: [
      "STEIGERE DEIN SPIEL",
      "·",
      "PADEL ACADEMY",
      "·",
      "WEB",
      "·",
      "BRANDING",
      "·",
      "E-COMMERCE",
      "·",
      "STRIPE",
      "·",
      "EBOOK",
      "·",
      "METHODE",
      "·",
    ],
    challengeLabel: "01 · Die Aufgabe",
    challengeTitle: "Sich abheben in einem Markt, in dem alle gleich kommunizieren.",
    challengeBody:
      "Padel-Akademien kommunizieren meist gleich: Schlägerfoto auf blauem Hintergrund, generische Bold-Schrift, leerer Slogan. JM wollte herausstechen — und brauchte ein System, kein einzelnes Logo. Identität, Website mit Checkout für Programme und Guides, Lern-Ebook, Newsletter, Social-Vorlagen. Alles kohärent, alles von Grund auf gebaut.",
    systemLabel: "02 · Das visuelle System",
    systemTitle: "Der Platz, in ein grafisches System verwandelt.",
    systemBody:
      "Das Logo ist keine freie Erfindung — es ist die tatsächliche Geometrie eines Padel-Platzes auf das Wesentliche reduziert: zwei L-Rahmen mit dem Namen, ein Schläger mit Bewegungslinien und der Ball als einziger organischer Punkt. Helles Limettengrün auf Platz-Blau. Wenn das visuelle System aus dem Sport selbst entsteht, atmet alles, was darauf angewendet wird, Kohärenz.",
    systemPoints: [
      {
        title: "Zwei Farben. Null Lärm.",
        body: "Platz-Blau + Limettengrün. Auf Papier oder Tinte. Keine Gradienten, keine Schatten, kein generisches SaaS-Lila.",
      },
      {
        title: "Archivo Italic 900.",
        body: "Sportliche Typografie mit echtem Gewicht — die Neigung trägt das Auge nach vorne. Display für Impact, Inter Tight für Body.",
      },
      {
        title: "Der Ball, die einzige Kurve.",
        body: "Das gesamte System ist orthogonal außer dem Ball. Dieser Kontrast — gerade + Kreis — ist die wiedererkennbare Signatur der Marke.",
      },
    ],
    versionsLabel: "03 · Die Versionen",
    versionsTitle: "Vier Hintergründe. Eine Identität.",
    versions: [
      { img: "/projects/jm-padel-academy/logo-color.png", label: "Farbe · auf Papier", on: "Paper", bg: PAPER },
      { img: "/projects/jm-padel-academy/isotype-on-blue.png", label: "Weiß · auf Platz", on: "Court", bg: COURT_BLUE },
      { img: "/projects/jm-padel-academy/logo-mono.png", label: "Mono schwarz · auf Cool", on: "Paper", bg: PAPER_COOL },
      { img: "/projects/jm-padel-academy/logo-dark.png", label: "Weiß · auf Tinte", on: "Ink", bg: INK },
    ],
    methodLabel: "04 · Die Methode",
    methodTitle: "Begrüßungsvideo, auf dem Platz gedreht.",
    methodBody:
      "Der Web-Hero ist kein Stockfoto — es ist ein in Produktion gedrehtes Video, das die Site mit dem Klang von Schläger auf Ball öffnet. Drei Minuten auf dreißig Sekunden geschnitten, stummgeschaltet für Autoplay, mit einem kuratierten Poster für den ersten Frame.",
    programsLabel: "05 · Die Programme",
    programsTitle: "Jedes Programm mit eigenem Video erzählt.",
    programsBody:
      "Die Akademie bietet drei Programm-Stufen: Einstieg, Verbesserung und Wettkampf. Jedes hat sein eigenes Video auf der Seite, mit derselben Marken-Ästhetik — damit der Nutzer versteht, worauf er sich einlässt, bevor er bezahlt.",
    guidesLabel: "06 · Die Guides",
    guidesTitle: "Acht herunterladbare Lern-Guides.",
    guidesBody:
      "Um Leads zu erfassen und echten Wert vor jedem Verkauf zu bieten, gestaltete ich 8 Lern-Guides (jeder mit eigenem Cover), die der Nutzer nach Newsletter-Anmeldung herunterlädt. Grundkonzepte, Aufschlag und Rückschlag, Positionierung, Lob-Verteidigung, Luftspiel, Partner-Verbindung, körperliche Vorbereitung und Anpassung an den Gegner.",
    guides: [
      { src: "/projects/jm-padel-academy/guides/conceptos-basicos.jpg", title: "Grundkonzepte" },
      { src: "/projects/jm-padel-academy/guides/saque-resto.jpg", title: "Aufschlag & Rückschlag" },
      { src: "/projects/jm-padel-academy/guides/posicionamiento.jpg", title: "Positionierung" },
      { src: "/projects/jm-padel-academy/guides/defensa-globos.jpg", title: "Lob-Verteidigung" },
      { src: "/projects/jm-padel-academy/guides/juego-aereo.jpg", title: "Luftspiel" },
      { src: "/projects/jm-padel-academy/guides/conexion-pareja.jpg", title: "Partner-Verbindung" },
      { src: "/projects/jm-padel-academy/guides/preparacion-fisica.jpg", title: "Körperliche Vorbereitung" },
      { src: "/projects/jm-padel-academy/guides/adaptar-juego.jpg", title: "Spiel anpassen" },
    ],
    stackLabel: "07 · Der Stack",
    stackTitle: "Full-Stack-Web auf Vercel deployed.",
    stackBody:
      "Keine statische Landing — eine echte Anwendung mit Checkout, Newsletter-Management, Token-Validierung, SMTP-Integration und Stripe-Webhooks. Optimierter Build mit Vite, Vercel Serverless Functions, Redis für Cache und Rate Limiting.",
    stackItems: [
      "Vite + React",
      "Vercel Functions",
      "Stripe Checkout + Webhooks",
      "Brevo (transaktionales SMTP)",
      "Redis (Cache + Rate Limit)",
      "Newsletter mit Double Opt-in",
      "Token-geschützte Downloads",
      "i18n ES als Haupt",
    ],
    closingTitle: "Die Marke, auf dem Platz. Die Site, in Produktion.",
    closingP:
      "JM Padel Academy ist einer der Fälle, in denen Design, Entwicklung und Strategie sich in einer einzigen Lieferung schließen. Das Branding entsteht aus der Geometrie des Sports selbst. Die Website ist keine Vitrine — sie ist eine Akquise- und Verkaufsmaschine. Die Guides sind kein Füllmaterial — sie sind echte Lead-Magnete mit Bildungswert.",
    visit: "Besuche jmpadelacademy.com",
    cta: "Weitere Projekte sehen",
    footerNote: "Felipe Cámara · Branding & Full-Stack-Entwicklung",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function JMPadelDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div
      style={{
        background: PAPER,
        color: INK,
        fontFamily: SANS,
        minHeight: "100dvh",
      }}
    >
      <BlendNav />

      {/* ── HERO con vídeo home-reel ─────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100dvh",
          background: INK,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/projects/jm-padel-academy/home-reel-poster.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
          }}
        >
          <source src="/projects/jm-padel-academy/home-reel.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(14,26,43,0.55) 0%, rgba(14,26,43,0.2) 35%, rgba(14,26,43,0.9) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "clamp(24px, 4vw, 56px)",
            paddingTop: "clamp(80px, 10vh, 120px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: LIME,
            fontWeight: 600,
          }}
        >
          <Link
            href="/proyectos"
            style={{
              color: LIME,
              textDecoration: "none",
              borderBottom: `1px solid ${LIME}80`,
            }}
          >
            ← {t.back}
          </Link>
          <span>{t.badge}</span>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", padding: "clamp(24px, 4vw, 56px)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontStyle: "italic",
              textTransform: "uppercase",
              fontSize: "clamp(56px, 11vw, 200px)",
              lineHeight: 0.9,
              color: WHITE,
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            {t.hero1}
            <br />
            {t.hero2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontStyle: "italic",
              textTransform: "uppercase",
              fontSize: "clamp(24px, 3.4vw, 44px)",
              color: LIME,
              marginTop: 20,
              letterSpacing: "-0.01em",
            }}
          >
            {t.heroTagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              maxWidth: 640,
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              marginTop: 28,
              fontWeight: 400,
            }}
          >
            {t.heroP}
          </motion.p>
        </motion.div>
      </section>

      {/* ── MARQUEE court-blue ──────────────────── */}
      <section
        style={{
          background: COURT_BLUE,
          color: WHITE,
          padding: "clamp(20px, 3vw, 32px) 0",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 42, ease: "linear", repeat: Infinity }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            fontSize: "clamp(36px, 5.5vw, 80px)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {[...t.marquee, ...t.marquee, ...t.marquee].map((w, i) => (
            <span
              key={i}
              style={{
                padding: "0 clamp(14px, 2vw, 28px)",
                color: w === "·" ? LIME : WHITE,
              }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── 01. EL RETO ─────────────────────────── */}
      <Section>
        <SectionHeader label={t.challengeLabel} title={t.challengeTitle} />
        <Prose>{t.challengeBody}</Prose>
      </Section>

      {/* ── 02. EL SISTEMA VISUAL ───────────────── */}
      <Section background={PAPER_WARM}>
        <SectionHeader label={t.systemLabel} title={t.systemTitle} />
        <Prose>{t.systemBody}</Prose>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(24px, 3vw, 40px)",
            marginTop: 64,
          }}
        >
          {t.systemPoints.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "28px 0",
                borderTop: `3px solid ${i === 0 ? COURT_BLUE : i === 1 ? INK : LIME_DEEP}`,
              }}
            >
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  fontSize: "clamp(20px, 2.1vw, 28px)",
                  color: INK,
                  margin: "0 0 12px",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.05,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: INK_SOFT,
                }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 03. LAS VERSIONES DEL LOGO ──────────── */}
      <Section>
        <SectionHeader label={t.versionsLabel} title={t.versionsTitle} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginTop: 64,
          }}
        >
          {t.versions.map((v, i) => (
            <motion.figure
              key={v.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.1 }}
              style={{ margin: 0 }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  background: v.bg,
                  overflow: "hidden",
                  border: v.bg === PAPER || v.bg === PAPER_COOL ? `1px solid ${LINE}` : "none",
                  borderRadius: 14,
                }}
              >
                <Image
                  src={v.img}
                  alt={v.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "contain", padding: 28 }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: INK_SOFT,
                  fontWeight: 600,
                }}
              >
                {v.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>

      {/* ── 04. EL MÉTODO (vídeo) ───────────────── */}
      <Section background={INK} dark>
        <SectionHeader label={t.methodLabel} title={t.methodTitle} dark />
        <Prose dark>{t.methodBody}</Prose>

        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            margin: "64px 0 0",
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            border: `1px solid ${LIME}30`,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/projects/jm-padel-academy/metodologia-poster.jpg"
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16/9",
              objectFit: "cover",
              background: COURT_BLUE_DARKER,
            }}
          >
            <source src="/projects/jm-padel-academy/metodologia.mp4" type="video/mp4" />
          </video>
        </motion.figure>
      </Section>

      {/* ── 05. LOS PROGRAMAS (vídeo) ───────────── */}
      <Section background={COURT_BLUE} dark>
        <SectionHeader label={t.programsLabel} title={t.programsTitle} dark />
        <Prose dark>{t.programsBody}</Prose>

        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            margin: "64px 0 0",
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            border: `1px solid ${LIME}40`,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/projects/jm-padel-academy/programas-poster.jpg"
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16/9",
              objectFit: "cover",
              background: COURT_BLUE_DARKER,
            }}
          >
            <source src="/projects/jm-padel-academy/programas.mp4" type="video/mp4" />
          </video>
        </motion.figure>
      </Section>

      {/* ── 06. LAS GUÍAS ───────────────────────── */}
      <Section>
        <SectionHeader label={t.guidesLabel} title={t.guidesTitle} />
        <Prose>{t.guidesBody}</Prose>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginTop: 64,
          }}
        >
          {t.guides.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 }}
              style={{ margin: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  background: PAPER_COOL,
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                }}
              >
                <Image
                  src={g.src}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 10,
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  fontSize: 13,
                  color: INK,
                  letterSpacing: "-0.005em",
                }}
              >
                {g.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>

      {/* ── 07. EL STACK ────────────────────────── */}
      <Section background={PAPER_WARM}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.5fr) 1fr",
            gap: "clamp(28px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          <SectionHeader label={t.stackLabel} title={t.stackTitle} inline />
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            style={{
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.7,
              color: INK,
              maxWidth: 640,
              paddingTop: 16,
            }}
          >
            {t.stackBody}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {t.stackItems.map((item) => (
            <span
              key={item}
              style={{
                padding: "12px 20px",
                background: INK,
                color: PAPER,
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </Section>

      {/* ── CIERRE court con líneas pista ───────── */}
      <section
        style={{
          background: COURT_BLUE,
          color: WHITE,
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Líneas de pista en fondo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "8% 5%",
            border: `3px solid ${LIME}`,
            opacity: 0.22,
            pointerEvents: "none",
            borderRadius: 8,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            right: "5%",
            height: 0,
            borderTop: `2px solid ${LIME}`,
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "8%",
            bottom: "8%",
            left: "50%",
            width: 0,
            borderLeft: `2px solid ${LIME}`,
            opacity: 0.18,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          style={{ position: "relative", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}
        >
          <h3
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontStyle: "italic",
              textTransform: "uppercase",
              fontSize: "clamp(40px, 6.5vw, 96px)",
              lineHeight: 0.95,
              color: WHITE,
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            {t.closingTitle}
          </h3>
          <p
            style={{
              maxWidth: 720,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.9)",
              margin: "32px auto 48px",
              fontWeight: 400,
            }}
          >
            {t.closingP}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <a
              href="https://jmpadelacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                background: LIME,
                color: INK,
                textDecoration: "none",
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontStyle: "italic",
                textTransform: "uppercase",
                fontSize: 14,
                letterSpacing: "0.04em",
                borderRadius: 999,
              }}
            >
              {t.visit} <span style={{ fontSize: 18 }}>↗</span>
            </a>
            <Link
              href="/proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                border: `1.5px solid ${LIME}`,
                color: LIME,
                textDecoration: "none",
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                textTransform: "uppercase",
                fontSize: 14,
                letterSpacing: "0.04em",
                borderRadius: 999,
              }}
            >
              ← {t.cta}
            </Link>
          </div>
        </motion.div>
      </section>

      <footer
        style={{
          background: INK,
          color: "rgba(255,255,255,0.45)",
          padding: "32px clamp(24px, 4vw, 56px)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {t.footerNote}
      </footer>
    </div>
  );
}

function Section({
  children,
  background,
  dark = false,
}: {
  children: React.ReactNode;
  background?: string;
  dark?: boolean;
}) {
  return (
    <section
      style={{
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
        background: background ?? "transparent",
        color: dark ? PAPER : INK,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  inline = false,
  dark = false,
}: {
  label: string;
  title: string;
  inline?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: dark ? LIME : COURT_BLUE,
          fontWeight: 700,
          background: dark ? "transparent" : LIME,
          padding: dark ? "0" : "5px 12px",
          display: "inline-block",
          border: dark ? `1px solid ${LIME}` : "none",
          ...(dark ? { padding: "5px 12px", borderRadius: 999 } : {}),
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontStyle: "italic",
          textTransform: "uppercase",
          fontSize: inline ? "clamp(28px, 3.6vw, 44px)" : "clamp(36px, 5.5vw, 76px)",
          lineHeight: 0.95,
          color: dark ? WHITE : INK,
          margin: "18px 0 0",
          letterSpacing: "-0.025em",
          maxWidth: 1000,
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

function Prose({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      style={{
        marginTop: 36,
        fontSize: "clamp(16px, 1.4vw, 20px)",
        lineHeight: 1.65,
        color: dark ? "rgba(255,255,255,0.88)" : INK,
        maxWidth: 820,
        fontWeight: 400,
      }}
    >
      {children}
    </motion.p>
  );
}
