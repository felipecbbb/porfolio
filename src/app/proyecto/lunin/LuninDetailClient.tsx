"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";

/* ===== Marca Lunin ===== */
const BLACK = "#0d0d0d";
const ONYX = "#141414";
const GOLD = "#deab3b";
const GOLDB = "#e8be5a";
const CREAM = "#f9f2e0";
const MUTED = "rgba(249,242,224,0.62)";
const FAINT = "rgba(249,242,224,0.40)";
const LINE = "rgba(222,171,59,0.22)";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Arial, sans-serif";
const EASE = [0.2, 0.8, 0.2, 1] as const;
const IMG = "/projects/lunin";

type Dict = {
  back: string;
  viewWeb: string;
  eyebrow: string;
  role: string;
  scroll: string;
  introKicker: string;
  introHead: string;
  introBody: string;
  meta: { k: string; v: string }[];
  challengeKicker: string;
  challengeHead: string;
  challengeBody: string;
  buildKicker: string;
  buildHead: string;
  build: { t: string; d: string }[];
  distKicker: string;
  distHead: string;
  distBody: string;
  bottles: { name: string; note: string; img: string }[];
  taste: string;
  resultsKicker: string;
  resultsHead: string;
  stats: { n: string; l: string }[];
  galleryKicker: string;
  galleryHead: string;
  ctaHead: string;
  ctaBody: string;
  ctaPrimary: string;
};

const T: Record<Lang, Dict> = {
  es: {
    back: "Proyectos",
    viewWeb: "Ver web",
    eyebrow: "Coctelería de autor · Russafa, Valencia",
    role: "Web · Carta digital · Reservas · Redes — 2026",
    scroll: "Desliza",
    introKicker: "· El proyecto",
    introHead: "Una marca premium merecía una presencia digital a su altura.",
    introBody:
      "Lunin es una coctelería de autor con destilería propia (Lunin Distillery, Ucrania) en el corazón de Russafa. Me ocupé de todo lo digital de principio a fin: diseño, web, carta, reservas de eventos, correos, panel de gestión y redes sociales. Una sola persona detrás de la marca, la web y el contenido.",
    meta: [
      { k: "Cliente", v: "Lunin Cocktail Bar" },
      { k: "Lugar", v: "Russafa, Valencia" },
      { k: "Rol", v: "Diseño · Desarrollo · RRSS" },
      { k: "Año", v: "2026" },
      { k: "Stack", v: "Next.js · TypeScript · Tailwind · Resend" },
      { k: "Premio", v: "Great Taste 2025 ★" },
    ],
    challengeKicker: "· El encargo",
    challengeHead: "Un producto premium con la información en papel.",
    challengeBody:
      "Lunin tenía un local con encanto y destilados galardonados, pero su carta vivía en papel y las reservas de eventos se perdían entre DMs y llamadas. Hacía falta una web bilingüe a la altura de la marca, una carta digital fácil de actualizar y accesible por QR en mesa, y una forma ordenada de recibir y gestionar eventos privados — sin plataformas de terceros con comisiones.",
    buildKicker: "· Lo que construí",
    buildHead: "Una web que vende, una carta que se gestiona sola.",
    build: [
      { t: "Carta digital", d: "Single-page con navegación sticky scroll-spy y ficha de cada cóctel en modal a pantalla completa. 70+ productos en 10 categorías." },
      { t: "Reservas de eventos", d: "Landing con formulario validado (tipo, fecha, invitados, contacto), honeypot anti-bot y aviso al instante por email." },
      { t: "Correos con Resend", d: "Emails transaccionales desde el dominio propio (reservas@luninbar.com), con plantilla a juego con la marca." },
      { t: "Panel /admin", d: "Editor de carta y eventos + bandeja de solicitudes con estados (Nueva → Contactado → Confirmada). Gestión sin depender de nadie." },
      { t: "Bilingüe ES/EN", d: "Toda la web en español e inglés con un sistema de traducción propio, pensada para el público local y el internacional." },
      { t: "QR para mesa y barra", d: "PDFs listos para imprimir que llevan a la carta digital — del papel a la pantalla con un toque." },
    ],
    distKicker: "· Detrás de la barra",
    distHead: "Una coctelería con su propia destilería.",
    distBody:
      "Lo que hace única a Lunin es que destila lo que sirve. The First Ukrainian Dry Gin con 21 botánicos de los Cárpatos, horilkas (vodka) de manzana, ciruela y acacia, brandies envejecidos en roble y una línea de licores de frutos rojos. La web tenía que transmitir ese nivel artesanal — fotografía cálida, negro y oro, y la historia del producto en primer plano.",
    bottles: [
      { name: "The First Ukrainian Dry Gin", note: "21 botánicos · Cárpatos", img: "bottle-gin.jpg" },
      { name: "Apple Brandy", note: "12 meses en roble cárpato", img: "bottle-brandy.jpg" },
      { name: "Licor de Grosella Negra", note: "Línea Yagodanka", img: "bottle-liqueur.jpg" },
    ],
    taste: "Galardonado con una estrella en los Great Taste Awards 2025 (Guild of Fine Food, UK).",
    resultsKicker: "· Resultados",
    resultsHead: "Todo bajo un mismo techo digital.",
    stats: [
      { n: "70+", l: "Productos en carta" },
      { n: "10", l: "Categorías" },
      { n: "2", l: "Idiomas (ES/EN)" },
      { n: "1 ★", l: "Great Taste 2025" },
    ],
    galleryKicker: "· En imágenes",
    galleryHead: "La marca, en su sitio.",
    ctaHead: "¿Tienes una marca que merece esto?",
    ctaBody:
      "Diseño, desarrollo y redes — de la misma mano. Si quieres una presencia digital a la altura de tu producto, hablemos.",
    ctaPrimary: "Hablemos de tu proyecto",
  },
  en: {
    back: "Work",
    viewWeb: "View site",
    eyebrow: "Signature cocktail bar · Russafa, Valencia",
    role: "Web · Digital menu · Bookings · Social — 2026",
    scroll: "Scroll",
    introKicker: "· The project",
    introHead: "A premium brand deserved a digital presence to match.",
    introBody:
      "Lunin is a signature cocktail bar with its own distillery (Lunin Distillery, Ukraine) in the heart of Russafa. I handled everything digital end to end: design, website, menu, event bookings, emails, an admin panel and social media. One person behind the brand, the site and the content.",
    meta: [
      { k: "Client", v: "Lunin Cocktail Bar" },
      { k: "Place", v: "Russafa, Valencia" },
      { k: "Role", v: "Design · Development · Social" },
      { k: "Year", v: "2026" },
      { k: "Stack", v: "Next.js · TypeScript · Tailwind · Resend" },
      { k: "Award", v: "Great Taste 2025 ★" },
    ],
    challengeKicker: "· The brief",
    challengeHead: "A premium product with its info stuck on paper.",
    challengeBody:
      "Lunin had a charming venue and award-winning spirits, but its menu lived on paper and event requests got lost between DMs and calls. They needed a bilingual website worthy of the brand, a digital menu that was easy to update and reachable by QR at the table, and an orderly way to receive and manage private events — without third-party platforms taking a cut.",
    buildKicker: "· What I built",
    buildHead: "A site that sells, a menu that manages itself.",
    build: [
      { t: "Digital menu", d: "Single page with sticky scroll-spy nav and a full-screen modal for each cocktail. 70+ products across 10 categories." },
      { t: "Event bookings", d: "Landing with a validated form (type, date, guests, contact), anti-bot honeypot and instant email alert." },
      { t: "Emails with Resend", d: "Transactional emails from the bar's own domain (reservas@luninbar.com), with an on-brand template." },
      { t: "/admin panel", d: "Menu and events editor + request inbox with statuses (New → Contacted → Confirmed). Fully self-managed." },
      { t: "Bilingual ES/EN", d: "The whole site in Spanish and English with a custom translation system, for local and international guests." },
      { t: "Table & bar QR", d: "Print-ready PDFs that lead to the digital menu — from paper to screen in one tap." },
    ],
    distKicker: "· Behind the bar",
    distHead: "A cocktail bar with its own distillery.",
    distBody:
      "What makes Lunin unique is that it distills what it serves. The First Ukrainian Dry Gin with 21 Carpathian botanicals, apple/plum/acacia horilkas (vodka), oak-aged brandies and a line of red-fruit liqueurs. The site had to convey that craft level — warm photography, black and gold, and the product story up front.",
    bottles: [
      { name: "The First Ukrainian Dry Gin", note: "21 botanicals · Carpathians", img: "bottle-gin.jpg" },
      { name: "Apple Brandy", note: "12 months in Carpathian oak", img: "bottle-brandy.jpg" },
      { name: "Blackcurrant Liqueur", note: "Yagodanka line", img: "bottle-liqueur.jpg" },
    ],
    taste: "Awarded a star at the Great Taste Awards 2025 (Guild of Fine Food, UK).",
    resultsKicker: "· Results",
    resultsHead: "Everything under one digital roof.",
    stats: [
      { n: "70+", l: "Menu products" },
      { n: "10", l: "Categories" },
      { n: "2", l: "Languages (ES/EN)" },
      { n: "1 ★", l: "Great Taste 2025" },
    ],
    galleryKicker: "· In pictures",
    galleryHead: "The brand, in its place.",
    ctaHead: "Got a brand that deserves this?",
    ctaBody:
      "Design, development and social — from one hand. If you want a digital presence worthy of your product, let's talk.",
    ctaPrimary: "Let's talk about your project",
  },
  de: {
    back: "Projekte",
    viewWeb: "Website ansehen",
    eyebrow: "Signature-Cocktailbar · Russafa, Valencia",
    role: "Web · Digitale Karte · Buchungen · Social — 2026",
    scroll: "Scrollen",
    introKicker: "· Das Projekt",
    introHead: "Eine Premium-Marke verdiente eine ebenbürtige digitale Präsenz.",
    introBody:
      "Lunin ist eine Signature-Cocktailbar mit eigener Destillerie (Lunin Distillery, Ukraine) im Herzen von Russafa. Ich verantwortete alles Digitale von A bis Z: Design, Website, Karte, Event-Buchungen, E-Mails, ein Admin-Panel und Social Media. Eine Person hinter Marke, Website und Content.",
    meta: [
      { k: "Kunde", v: "Lunin Cocktail Bar" },
      { k: "Ort", v: "Russafa, Valencia" },
      { k: "Rolle", v: "Design · Entwicklung · Social" },
      { k: "Jahr", v: "2026" },
      { k: "Stack", v: "Next.js · TypeScript · Tailwind · Resend" },
      { k: "Auszeichnung", v: "Great Taste 2025 ★" },
    ],
    challengeKicker: "· Der Auftrag",
    challengeHead: "Ein Premium-Produkt mit Infos auf Papier.",
    challengeBody:
      "Lunin hatte ein charmantes Lokal und preisgekrönte Spirituosen, aber die Karte lag auf Papier und Event-Anfragen gingen zwischen DMs und Anrufen verloren. Es brauchte eine zweisprachige Website auf Markenniveau, eine leicht aktualisierbare, per QR am Tisch erreichbare digitale Karte und einen geordneten Weg, Privatevents zu verwalten — ohne Drittplattformen mit Provisionen.",
    buildKicker: "· Was ich baute",
    buildHead: "Eine Site, die verkauft, eine Karte, die sich selbst verwaltet.",
    build: [
      { t: "Digitale Karte", d: "Single-Page mit Sticky-Scroll-Spy-Nav und Vollbild-Modal je Cocktail. 70+ Produkte in 10 Kategorien." },
      { t: "Event-Buchungen", d: "Landing mit validiertem Formular (Typ, Datum, Gäste, Kontakt), Anti-Bot-Honeypot und sofortiger E-Mail." },
      { t: "E-Mails mit Resend", d: "Transaktionale E-Mails von der eigenen Domain (reservas@luninbar.com), mit markenkonformer Vorlage." },
      { t: "/admin-Panel", d: "Karten- und Event-Editor + Anfragen-Postfach mit Status (Neu → Kontaktiert → Bestätigt). Voll eigenständig." },
      { t: "Zweisprachig ES/EN", d: "Die ganze Site auf Spanisch und Englisch mit eigenem Übersetzungssystem, für lokale und internationale Gäste." },
      { t: "Tisch- & Theken-QR", d: "Druckfertige PDFs, die zur digitalen Karte führen — vom Papier zum Screen mit einem Tipp." },
    ],
    distKicker: "· Hinter der Theke",
    distHead: "Eine Cocktailbar mit eigener Destillerie.",
    distBody:
      "Was Lunin einzigartig macht: Es destilliert, was es serviert. The First Ukrainian Dry Gin mit 21 Karpaten-Botanicals, Horilkas (Wodka) aus Apfel, Pflaume und Akazie, im Eichenfass gereifte Brandies und eine Linie von Rotfrucht-Likören. Die Site musste dieses handwerkliche Niveau vermitteln — warme Fotografie, Schwarz und Gold, das Produkt im Vordergrund.",
    bottles: [
      { name: "The First Ukrainian Dry Gin", note: "21 Botanicals · Karpaten", img: "bottle-gin.jpg" },
      { name: "Apple Brandy", note: "12 Monate Karpaten-Eiche", img: "bottle-brandy.jpg" },
      { name: "Schwarze-Johannisbeere-Likör", note: "Yagodanka-Linie", img: "bottle-liqueur.jpg" },
    ],
    taste: "Mit einem Stern bei den Great Taste Awards 2025 ausgezeichnet (Guild of Fine Food, UK).",
    resultsKicker: "· Ergebnisse",
    resultsHead: "Alles unter einem digitalen Dach.",
    stats: [
      { n: "70+", l: "Produkte" },
      { n: "10", l: "Kategorien" },
      { n: "2", l: "Sprachen (ES/EN)" },
      { n: "1 ★", l: "Great Taste 2025" },
    ],
    galleryKicker: "· In Bildern",
    galleryHead: "Die Marke, am richtigen Ort.",
    ctaHead: "Hast du eine Marke, die das verdient?",
    ctaBody:
      "Design, Entwicklung und Social — aus einer Hand. Wenn du eine digitale Präsenz auf Produktniveau willst, sprechen wir.",
    ctaPrimary: "Sprechen wir über dein Projekt",
  },
};

/* reveal helper */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: SANS,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: GOLD,
        marginBottom: 22,
      }}
    >
      {children}
    </div>
  );
}

export default function LuninDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: BLACK, color: CREAM, fontFamily: SANS, overflow: "hidden" }}>
      {/* ===== Top bar ===== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "calc(14px + env(safe-area-inset-top)) clamp(16px, 5vw, 64px) 14px",
          background: scrolled ? "rgba(13,13,13,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <Link
          href="/proyectos"
          style={{ color: CREAM, textDecoration: "none", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          <span style={{ color: GOLD }}>←</span> {t.back}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LangSwitcher tone="light" />
          <a
            href="https://luninbar.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: BLACK,
              background: GOLD,
              padding: "9px 18px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            {t.viewWeb} ↗
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }}>
          <Image src={`${IMG}/hero.jpg`} alt="Lunin Cocktail Bar" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.35) 40%, rgba(13,13,13,0.92) 100%)" }} />
        </motion.div>

        <motion.div
          style={{ position: "relative", textAlign: "center", padding: "0 24px", opacity: heroFade }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLDB, marginBottom: 28 }}>
              {t.eyebrow}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            style={{ position: "relative", width: "min(560px, 78vw)", height: "clamp(80px, 16vw, 180px)", margin: "0 auto" }}
          >
            <Image src={`${IMG}/logo-cream.png`} alt="Lunin" fill priority sizes="560px" style={{ objectFit: "contain" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ fontSize: "clamp(12px,1.4vw,15px)", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD, marginTop: 22 }}
          >
            Cocktail Bar
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            style={{ marginTop: 26, fontSize: 13, letterSpacing: "0.06em", color: MUTED, fontWeight: 500 }}
          >
            {t.role}
          </motion.p>
        </motion.div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: FAINT, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {t.scroll}
          <span style={{ width: 1, height: 26, background: `linear-gradient(${GOLD}, transparent)` }} />
        </div>
      </section>

      {/* ===== Intro + meta ===== */}
      <section style={{ padding: "clamp(80px,12vw,140px) clamp(20px,5vw,77px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "clamp(40px,6vw,90px)", alignItems: "start" }} className="lunin-intro">
          <div>
            <Reveal><Kicker>{t.introKicker}</Kicker></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4.4vw,60px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 0 28px" }}>
                {t.introHead}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.65, color: MUTED, margin: 0, maxWidth: 620 }}>{t.introBody}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: "clamp(22px,2.4vw,32px)", background: ONYX }}>
              {t.meta.map((m, i) => (
                <div
                  key={m.k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "13px 0",
                    borderTop: i === 0 ? "none" : `1px solid rgba(249,242,224,0.08)`,
                  }}
                >
                  <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: FAINT, fontWeight: 600 }}>{m.k}</span>
                  <span style={{ fontSize: 14, color: CREAM, fontWeight: 500, textAlign: "right" }}>{m.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Foto banda (flatlay) ===== */}
      <PhotoBand src={`${IMG}/dry-gin-flatlay.jpg`} alt="Lunin Dry Gin" />

      {/* ===== Reto ===== */}
      <section style={{ padding: "clamp(80px,12vw,140px) clamp(20px,5vw,77px)", background: ONYX }}>
        <div style={{ maxWidth: 900 }}>
          <Reveal><Kicker>{t.challengeKicker}</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.12, margin: "0 0 26px" }}>{t.challengeHead}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.65, color: MUTED, margin: 0 }}>{t.challengeBody}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== Lo que construí ===== */}
      <section style={{ padding: "clamp(80px,12vw,140px) clamp(20px,5vw,77px)" }}>
        <Reveal><Kicker>{t.buildKicker}</Kicker></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4.2vw,56px)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 760 }}>{t.buildHead}</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px,2vw,28px)" }} className="lunin-build">
          {t.build.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 0.06}>
              <div style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: "clamp(22px,2.2vw,30px)", height: "100%", background: ONYX }}>
                <div style={{ fontFamily: SERIF, color: GOLD, fontSize: 22, marginBottom: 14 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 10px", color: CREAM }}>{b.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: MUTED, margin: 0 }}>{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Destilería ===== */}
      <section style={{ background: ONYX }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }} className="lunin-dist">
          <div style={{ position: "relative", minHeight: "clamp(360px, 46vw, 640px)" }}>
            <Image src={`${IMG}/distiller.jpg`} alt="Lunin Distillery" fill sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ padding: "clamp(48px,6vw,96px) clamp(20px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal><Kicker>{t.distKicker}</Kicker></Reveal>
            <Reveal delay={0.05}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.12, margin: "0 0 24px" }}>{t.distHead}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.65, color: MUTED, margin: "0 0 30px" }}>{t.distBody}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {t.bottles.map((b) => (
                  <div key={b.name}>
                    <div style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: 10, overflow: "hidden", background: BLACK, border: `1px solid ${LINE}` }}>
                      <Image src={`${IMG}/${b.img}`} alt={b.name} fill sizes="180px" style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: CREAM, marginTop: 10, lineHeight: 1.25 }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: FAINT, marginTop: 3 }}>{b.note}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14, paddingTop: 22, borderTop: `1px solid ${LINE}` }}>
                <span style={{ color: GOLD, fontSize: 26, lineHeight: 1 }}>★</span>
                <span style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.5 }}>{t.taste}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Resultados ===== */}
      <section style={{ padding: "clamp(80px,12vw,140px) clamp(20px,5vw,77px)" }}>
        <Reveal><Kicker>{t.resultsKicker}</Kicker></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4.2vw,56px)", lineHeight: 1.1, margin: "0 0 56px", maxWidth: 760 }}>{t.resultsHead}</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(20px,3vw,40px)" }} className="lunin-stats">
          {t.stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div style={{ borderTop: `2px solid ${GOLD}`, paddingTop: 18 }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(40px,6vw,76px)", lineHeight: 1, color: CREAM }}>{s.n}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginTop: 12, fontWeight: 600 }}>{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Galería ===== */}
      <section style={{ padding: "0 clamp(20px,5vw,77px) clamp(80px,12vw,140px)" }}>
        <Reveal><Kicker>{t.galleryKicker}</Kicker></Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4.2vw,56px)", lineHeight: 1.1, margin: "0 0 44px" }}>{t.galleryHead}</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "clamp(12px,1.6vw,20px)" }} className="lunin-gallery">
          <GalleryImg src={`${IMG}/cover-cherry.jpg`} alt="Licor de cereza" span={5} ratio="3 / 4" />
          <GalleryImg src={`${IMG}/distillery.jpg`} alt="Destilería" span={7} ratio="4 / 3" />
          <GalleryImg src={`${IMG}/plum-vodka.jpg`} alt="Plum Horilka" span={7} ratio="4 / 3" />
          <GalleryImg src={`${IMG}/atmosphere.jpg`} alt="Ambiente Lunin" span={5} ratio="3 / 4" />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ position: "relative", padding: "clamp(90px,14vw,160px) clamp(20px,5vw,77px)", background: ONYX, textAlign: "center", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${GOLD}22 0%, transparent 65%)`, filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(32px,5vw,68px)", lineHeight: 1.08, margin: "0 0 24px" }}>{t.ctaHead}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.6, color: MUTED, margin: "0 0 40px" }}>{t.ctaBody}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/#contacto"
                style={{ background: GOLD, color: BLACK, padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
              >
                {t.ctaPrimary} →
              </Link>
              <a
                href="https://luninbar.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: `1.5px solid ${LINE}`, color: CREAM, padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
              >
                {t.viewWeb} ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        @media (max-width: 900px) {
          .lunin-intro { grid-template-columns: 1fr !important; }
          .lunin-build { grid-template-columns: 1fr 1fr !important; }
          .lunin-dist { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .lunin-build { grid-template-columns: 1fr !important; }
          .lunin-stats { grid-template-columns: 1fr 1fr !important; gap: 28px 20px !important; }
          .lunin-gallery > * { grid-column: span 12 !important; }
        }
      `}</style>
    </main>
  );
}

function PhotoBand({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 7", minHeight: 240 }}>
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
    </div>
  );
}

function GalleryImg({ src, alt, span, ratio }: { src: string; alt: string; span: number; ratio: string }) {
  return (
    <div style={{ gridColumn: `span ${span}`, position: "relative", aspectRatio: ratio, borderRadius: 14, overflow: "hidden", border: `1px solid ${LINE}` }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 680px) 100vw, 50vw" style={{ objectFit: "cover" }} />
    </div>
  );
}
