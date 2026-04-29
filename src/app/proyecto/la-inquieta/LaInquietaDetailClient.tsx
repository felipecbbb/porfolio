"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const CREAM = "#f3e7cf";
const CREAM_WARM = "#ead5b0";
const TEAL = "#13625a";
const TEAL_DEEP = "#0d4a42";
const CORAL = "#c65248";
const CORAL_DEEP = "#a83e36";
const GOLD = "#c89b4a";
const GOLD_LIGHT = "#e0bf80";
const INK = "#141414";

const FONT_DISPLAY = "var(--font-playfair), 'Playfair Display', Georgia, serif";
const FONT_BODY = "var(--font-yanone), 'Yanone Kaffeesatz', system-ui, sans-serif";

const LIVE_URL = "https://felipecbbb.github.io/la-inquieta/";
const REPO_URL = "https://github.com/felipecbbb/la-inquieta";

const T: Record<Lang, {
  caseta: string;
  liveCta: string;
  source: string;
  marquee: string[];
  meta: { label: string; value: string }[];
  multidev: string;
  pocketA: string;
  pocketHl: string;
  visualLabel: string;
  aestheticA: string;
  aestheticHl: string;
  palette: string;
  typo: string;
  typoH: string;
  typoSub: string;
  typoFonts: string;
  client: string;
  brandName: string;
  brandSub: string;
  busLabel: string;
  busTitleA: string;
  busTitleHl: string;
  busTitleB: string;
  stats: { num: string; label: string; color: string }[];
  sectionsLabel: string;
  sectionsA: string;
  sectionsHl: string;
  sections: { number: string; title: string; subtitle: string; image: string }[];
  detailsLabel: string;
  detailsA: string;
  detailsHl: string;
  icons: { title: string; subtitle: string; key: "arch" | "pattern" | "bus" | "wallet" | "calendar" | "whatsapp" }[];
  ctaA: string;
  ctaB: string;
  ctaTagline: string;
  enter: string;
  others: string;
  blockKicker: string;
}> = {
  es: {
    caseta: "Caseta Nº154 · Feria de Jerez 2026",
    liveCta: "Ver web en vivo",
    source: "Código fuente",
    marquee: ["Sol de Fiesta", "Luna de Fiesta", "Feria de Jerez 2026", "La Inquieta"],
    meta: [
      { label: "Año", value: "2026" },
      { label: "Rol", value: "Diseño + Código" },
      { label: "Stack", value: "HTML · SVG · JS" },
      { label: "Despliegue", value: "GitHub Pages" },
    ],
    multidev: "Multi-dispositivo",
    pocketA: "Una feria",
    pocketHl: "en el bolsillo",
    visualLabel: "Sistema visual",
    aestheticA: "La",
    aestheticHl: "estética",
    palette: "Paleta",
    typo: "Tipografía",
    typoH: "La Inquieta",
    typoSub: "Sol de Fiesta · Luna de Fiesta",
    typoFonts: "Fontuna / Playfair + Yanone Kaffeesatz",
    client: "Cliente",
    brandName: "Inquieto Grupo",
    brandSub: "Caseta Nº154 · Jerez",
    busLabel: "El autobús",
    busTitleA: "La",
    busTitleHl: "guagua",
    busTitleB: "que trae Cádiz entera",
    stats: [
      { num: "4", label: "Ciudades de salida", color: CORAL_DEEP },
      { num: "6", label: "Tarifas distintas", color: TEAL_DEEP },
      { num: "8", label: "Noches de feria", color: CORAL_DEEP },
      { num: "0", label: "€ en tener coche", color: TEAL_DEEP },
    ],
    sectionsLabel: "Las secciones",
    sectionsA: "Todo en un",
    sectionsHl: "scroll",
    sections: [
      {
        number: "01",
        title: "Transporte",
        subtitle: "Puntos de salida, autobús, tabla de precios y calendario de rutas",
        image: "/projects/la-inquieta/screenshot-transport.png",
      },
      {
        number: "02",
        title: "Bebidas",
        subtitle: "Packs de rebujito y copas · Pulsera de caseta con 3 beneficios",
        image: "/projects/la-inquieta/screenshot-bebidas.png",
      },
      {
        number: "03",
        title: "Itinerario",
        subtitle: "8 días en tarjetas postales cream con programación DJ + animador",
        image: "/projects/la-inquieta/screenshot-itinerario.png",
      },
    ],
    detailsLabel: "Detalles",
    detailsA: "Lo que marca la",
    detailsHl: "diferencia",
    icons: [
      { key: "arch", title: "Arco mozárabe", subtitle: "Hero con cartel original dentro de un arco andalusí" },
      { key: "pattern", title: "Patrón continuo", subtitle: "Trama geométrica con background-attachment fixed" },
      { key: "bus", title: "Puntos de salida", subtitle: "4 ciudades con pin dorado y venue exacto" },
      { key: "wallet", title: "Pulsera -1€", subtitle: "Beneficio destacado con pulso coral animado" },
      { key: "calendar", title: "8 postales", subtitle: "Timeline con slots de programación listos para DJs" },
      { key: "whatsapp", title: "Reserva directa", subtitle: "Widget flotante que abre WhatsApp prellenado" },
    ],
    ctaA: "Caseta",
    ctaB: "abierta",
    ctaTagline: "Sol de Fiesta · Luna de Fiesta",
    enter: "Entrar a la caseta",
    others: "Otros proyectos",
    blockKicker: "Bloque",
  },
  en: {
    caseta: "Pavilion #154 · Feria de Jerez 2026",
    liveCta: "View live site",
    source: "Source code",
    marquee: ["Sun Party", "Moon Party", "Feria de Jerez 2026", "La Inquieta"],
    meta: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Design + Code" },
      { label: "Stack", value: "HTML · SVG · JS" },
      { label: "Deploy", value: "GitHub Pages" },
    ],
    multidev: "Multi-device",
    pocketA: "A feria",
    pocketHl: "in your pocket",
    visualLabel: "Visual system",
    aestheticA: "The",
    aestheticHl: "aesthetic",
    palette: "Palette",
    typo: "Typography",
    typoH: "La Inquieta",
    typoSub: "Sun Party · Moon Party",
    typoFonts: "Fontuna / Playfair + Yanone Kaffeesatz",
    client: "Client",
    brandName: "Inquieto Grupo",
    brandSub: "Pavilion #154 · Jerez",
    busLabel: "The bus",
    busTitleA: "The",
    busTitleHl: "bus",
    busTitleB: "that brings all of Cádiz",
    stats: [
      { num: "4", label: "Pickup cities", color: CORAL_DEEP },
      { num: "6", label: "Fare options", color: TEAL_DEEP },
      { num: "8", label: "Feria nights", color: CORAL_DEEP },
      { num: "0", label: "€ on a car", color: TEAL_DEEP },
    ],
    sectionsLabel: "The sections",
    sectionsA: "Everything in one",
    sectionsHl: "scroll",
    sections: [
      {
        number: "01",
        title: "Transport",
        subtitle: "Pickup points, bus, pricing table and route calendar",
        image: "/projects/la-inquieta/screenshot-transport.png",
      },
      {
        number: "02",
        title: "Drinks",
        subtitle: "Rebujito and drinks packs · Pavilion wristband with 3 perks",
        image: "/projects/la-inquieta/screenshot-bebidas.png",
      },
      {
        number: "03",
        title: "Schedule",
        subtitle: "8 days as cream postcards with DJ + host slots",
        image: "/projects/la-inquieta/screenshot-itinerario.png",
      },
    ],
    detailsLabel: "Details",
    detailsA: "What makes the",
    detailsHl: "difference",
    icons: [
      { key: "arch", title: "Mozarabic arch", subtitle: "Hero with the original poster inside an Andalusian arch" },
      { key: "pattern", title: "Continuous pattern", subtitle: "Geometric texture with fixed background-attachment" },
      { key: "bus", title: "Pickup points", subtitle: "4 cities with golden pin and exact venue" },
      { key: "wallet", title: "-€1 wristband", subtitle: "Perk highlighted with animated coral pulse" },
      { key: "calendar", title: "8 postcards", subtitle: "Timeline with programming slots ready for DJs" },
      { key: "whatsapp", title: "Direct booking", subtitle: "Floating widget that opens pre-filled WhatsApp" },
    ],
    ctaA: "Pavilion",
    ctaB: "open",
    ctaTagline: "Sun Party · Moon Party",
    enter: "Enter the pavilion",
    others: "Other projects",
    blockKicker: "Block",
  },
  de: {
    caseta: "Festzelt Nr. 154 · Feria de Jerez 2026",
    liveCta: "Live-Site ansehen",
    source: "Quellcode",
    marquee: ["Sonnen-Fest", "Mond-Fest", "Feria de Jerez 2026", "La Inquieta"],
    meta: [
      { label: "Jahr", value: "2026" },
      { label: "Rolle", value: "Design + Code" },
      { label: "Stack", value: "HTML · SVG · JS" },
      { label: "Deploy", value: "GitHub Pages" },
    ],
    multidev: "Multi-Device",
    pocketA: "Eine Feria",
    pocketHl: "in der Hosentasche",
    visualLabel: "Visuelles System",
    aestheticA: "Die",
    aestheticHl: "Ästhetik",
    palette: "Palette",
    typo: "Typografie",
    typoH: "La Inquieta",
    typoSub: "Sonnen-Fest · Mond-Fest",
    typoFonts: "Fontuna / Playfair + Yanone Kaffeesatz",
    client: "Kunde",
    brandName: "Inquieto Grupo",
    brandSub: "Festzelt Nr. 154 · Jerez",
    busLabel: "Der Bus",
    busTitleA: "Der",
    busTitleHl: "Bus",
    busTitleB: "der ganz Cádiz mitbringt",
    stats: [
      { num: "4", label: "Abfahrtsstädte", color: CORAL_DEEP },
      { num: "6", label: "Tarif-Optionen", color: TEAL_DEEP },
      { num: "8", label: "Feria-Nächte", color: CORAL_DEEP },
      { num: "0", label: "€ fürs Auto", color: TEAL_DEEP },
    ],
    sectionsLabel: "Die Bereiche",
    sectionsA: "Alles in einem",
    sectionsHl: "Scroll",
    sections: [
      {
        number: "01",
        title: "Transport",
        subtitle: "Abfahrtspunkte, Bus, Preistabelle und Routen-Kalender",
        image: "/projects/la-inquieta/screenshot-transport.png",
      },
      {
        number: "02",
        title: "Getränke",
        subtitle: "Rebujito- und Getränke-Pakete · Armband mit 3 Vorteilen",
        image: "/projects/la-inquieta/screenshot-bebidas.png",
      },
      {
        number: "03",
        title: "Programm",
        subtitle: "8 Tage als cremefarbene Postkarten mit DJ- und Moderatoren-Slots",
        image: "/projects/la-inquieta/screenshot-itinerario.png",
      },
    ],
    detailsLabel: "Details",
    detailsA: "Was den",
    detailsHl: "Unterschied",
    icons: [
      { key: "arch", title: "Maurischer Bogen", subtitle: "Hero mit Originalplakat in einem andalusischen Bogen" },
      { key: "pattern", title: "Kontinuierliches Muster", subtitle: "Geometrische Textur mit fixiertem background-attachment" },
      { key: "bus", title: "Abfahrtspunkte", subtitle: "4 Städte mit goldenem Pin und genauem Venue" },
      { key: "wallet", title: "−1 € Armband", subtitle: "Vorteil hervorgehoben mit animiertem Coral-Puls" },
      { key: "calendar", title: "8 Postkarten", subtitle: "Timeline mit Programm-Slots, bereit für DJs" },
      { key: "whatsapp", title: "Direktbuchung", subtitle: "Schwebendes Widget öffnet vorausgefülltes WhatsApp" },
    ],
    ctaA: "Festzelt",
    ctaB: "geöffnet",
    ctaTagline: "Sonnen-Fest · Mond-Fest",
    enter: "Festzelt betreten",
    others: "Andere Projekte",
    blockKicker: "Block",
  },
};

export default function LaInquietaDetailClient() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <main
      style={{
        background: CREAM,
        color: INK,
        fontFamily: FONT_BODY,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BlendNav active="projects" />

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: `${TEAL_DEEP}f0`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: CREAM,
          borderTop: `1px solid ${GOLD}30`,
          borderBottom: `1px solid ${GOLD}30`,
          marginTop: 64,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "10px 24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: "italic",
              fontSize: 14,
              color: GOLD_LIGHT,
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            {t.caseta}
          </span>
        </div>
      </div>

      <section
        style={{
          position: "relative",
          background: TEAL_DEEP,
          color: CREAM,
          padding: "0 24px",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "600px auto",
            backgroundRepeat: "repeat",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, transparent 20%, ${TEAL_DEEP}aa 70%, ${TEAL_DEEP} 100%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            textAlign: "center",
            padding: "60px 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/la-inquieta/cartel-hero.svg"
            alt="La Inquieta · Feria de Jerez 2026"
            style={{
              width: "100%",
              maxWidth: 500,
              height: "auto",
              display: "block",
              margin: "0 auto 30px",
              filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.5))",
              animation: "fadeUp 1.2s cubic-bezier(.2,.8,.2,1) both",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 26px",
                background: CORAL,
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: `1px solid ${CORAL_DEEP}`,
              }}
            >
              {t.liveCta} <span>↗</span>
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 26px",
                background: "transparent",
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: `1px solid ${GOLD}`,
              }}
            >
              {t.source}
            </a>
          </div>
        </div>
      </section>

      <div
        style={{
          background: CORAL,
          color: CREAM,
          borderTop: `1px solid ${CORAL_DEEP}`,
          borderBottom: `1px solid ${CORAL_DEEP}`,
          padding: "16px 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 32,
            whiteSpace: "nowrap",
            animation: "scroll 32s linear infinite",
            fontFamily: FONT_DISPLAY,
            fontStyle: "italic",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {t.marquee.map((m, j) => (
                <span key={j} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  {m} <Dot />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section
        style={{
          position: "relative",
          background: CREAM_WARM,
          borderBottom: `1px solid ${INK}15`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "26px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
          className="li-meta-grid"
        >
          {t.meta.map((m) => (
            <MetaBig key={m.label} label={m.label} value={m.value} />
          ))}
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: CREAM,
          padding: "90px 24px 80px",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "540px auto",
            backgroundRepeat: "repeat",
            opacity: 0.06,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto" }}>
          <SectionKicker color={CORAL_DEEP} text={t.multidev} center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: INK,
              textAlign: "center",
              margin: "20px 0 50px",
            }}
          >
            {t.pocketA}{" "}
            <em style={{ fontWeight: 400, color: CORAL_DEEP }}>{t.pocketHl}</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr",
              gap: 32,
              alignItems: "center",
            }}
            className="li-device-grid"
          >
            <div>
              <BrowserFrame>
                <Image
                  src="/projects/la-inquieta/screenshot-hero.png"
                  alt="La Inquieta - Desktop"
                  width={1440}
                  height={900}
                  unoptimized
                  priority
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </BrowserFrame>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <PhoneFrame>
                <Image
                  src="/projects/la-inquieta/screenshot-mobile.png"
                  alt="La Inquieta - Mobile"
                  width={390}
                  height={844}
                  unoptimized
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: TEAL_DEEP,
          color: CREAM,
          padding: "90px 24px",
          overflow: "hidden",
          zIndex: 1,
          borderTop: `1px solid ${GOLD}40`,
          borderBottom: `1px solid ${GOLD}40`,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "600px auto",
            backgroundRepeat: "repeat",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <SectionKicker color={GOLD_LIGHT} text={t.visualLabel} center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textAlign: "center",
              margin: "20px 0 56px",
            }}
          >
            {t.aestheticA}{" "}
            <em style={{ fontWeight: 400, color: GOLD_LIGHT }}>{t.aestheticHl}</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
            }}
            className="li-brand-grid"
          >
            <div
              style={{
                background: `${CREAM}08`,
                border: `1px solid ${GOLD}30`,
                padding: "26px 22px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: GOLD_LIGHT,
                  marginBottom: 18,
                }}
              >
                {t.palette}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <ColorSwatch color={TEAL_DEEP} name="Teal" hex="#0D4A42" />
                <ColorSwatch color={CREAM} name="Cream" hex="#F3E7CF" />
                <ColorSwatch color={CORAL} name="Coral" hex="#C65248" />
                <ColorSwatch color={TEAL} name="Teal-" hex="#13625A" />
                <ColorSwatch color={CREAM_WARM} name="Warm" hex="#EAD5B0" />
                <ColorSwatch color={GOLD} name="Gold" hex="#C89B4A" />
              </div>
            </div>

            <div
              style={{
                background: `${CREAM}08`,
                border: `1px solid ${GOLD}30`,
                padding: "26px 22px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: GOLD_LIGHT,
                  marginBottom: 18,
                }}
              >
                {t.typo}
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 48,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  color: CREAM,
                }}
              >
                La <em style={{ fontWeight: 300 }}>Inquieta</em>
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: GOLD_LIGHT,
                  marginTop: 14,
                }}
              >
                {t.typoSub}
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: `1px solid ${GOLD}30`,
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  color: `${CREAM}aa`,
                  letterSpacing: "0.05em",
                }}
              >
                {t.typoFonts}
              </div>
            </div>

            <div
              style={{
                background: `${CREAM}08`,
                border: `1px solid ${GOLD}30`,
                padding: "26px 22px 22px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: GOLD_LIGHT,
                  marginBottom: 18,
                }}
              >
                {t.client}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18px 0",
                  background: CREAM,
                  marginBottom: 12,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/la-inquieta/logo-inquieto.svg"
                  alt="Inquieto Grupo"
                  style={{ width: "70%", maxWidth: 180, height: "auto" }}
                />
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  color: CREAM,
                  lineHeight: 1.2,
                }}
              >
                {t.brandName}
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 13,
                  color: `${CREAM}99`,
                  marginTop: 4,
                  letterSpacing: "0.08em",
                }}
              >
                {t.brandSub}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: CREAM,
          padding: "90px 24px",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "540px auto",
            backgroundRepeat: "repeat",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1300, margin: "0 auto" }}>
          <SectionKicker color={CORAL_DEEP} text={t.busLabel} />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 92px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: INK,
              margin: "18px 0 32px",
              maxWidth: 900,
            }}
          >
            {t.busTitleA}{" "}
            <em style={{ fontWeight: 400, color: CORAL_DEEP }}>{t.busTitleHl}</em>{" "}
            {t.busTitleB}
          </h2>

          <div
            style={{
              position: "relative",
              padding: "40px 24px 28px",
              background: TEAL,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
                backgroundSize: "540px auto",
                backgroundRepeat: "repeat",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/la-inquieta/autobus.svg"
                alt="La Inquieta bus"
                style={{ width: "100%", maxWidth: 780, height: "auto", display: "block" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
            className="li-stats-grid"
          >
            {t.stats.map((s) => (
              <BigStat key={s.label} num={s.num} label={s.label} color={s.color} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: CREAM_WARM,
          padding: "90px 24px",
          zIndex: 1,
          borderTop: `1px solid ${INK}12`,
          borderBottom: `1px solid ${INK}12`,
        }}
      >
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <SectionKicker color={TEAL_DEEP} text={t.sectionsLabel} center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: INK,
              textAlign: "center",
              margin: "20px 0 50px",
            }}
          >
            {t.sectionsA}{" "}
            <em style={{ fontWeight: 400, color: CORAL_DEEP }}>{t.sectionsHl}</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 18,
            }}
            className="li-preview-grid"
          >
            {t.sections.map((s) => (
              <SectionPreview
                key={s.number}
                number={s.number}
                title={s.title}
                subtitle={s.subtitle}
                image={s.image}
                kicker={t.blockKicker}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: CREAM,
          padding: "90px 24px",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionKicker color={CORAL_DEEP} text={t.detailsLabel} center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: INK,
              textAlign: "center",
              margin: "20px 0 50px",
            }}
          >
            {t.detailsA}{" "}
            <em style={{ fontWeight: 400, color: CORAL_DEEP }}>{t.detailsHl}</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
            className="li-icons-grid"
          >
            {t.icons.map((it) => (
              <IconCard
                key={it.title}
                icon={renderIcon(it.key)}
                title={it.title}
                subtitle={it.subtitle}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          background: TEAL_DEEP,
          color: CREAM,
          padding: "100px 24px",
          textAlign: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "600px auto",
            backgroundRepeat: "repeat",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${CORAL}20 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <OrnamentalStar />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 120px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: "30px 0 24px",
            }}
          >
            <em style={{ fontWeight: 300 }}>{t.ctaA}</em> {t.ctaB}
          </h2>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: "italic",
              fontSize: 20,
              color: GOLD_LIGHT,
              letterSpacing: "0.1em",
              marginBottom: 32,
            }}
          >
            {t.ctaTagline}
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                background: CORAL,
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: `1px solid ${CORAL_DEEP}`,
              }}
            >
              {t.enter} <span>→</span>
            </a>
            <Link
              href="/proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                background: "transparent",
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: `1px solid ${GOLD}`,
              }}
            >
              {t.others}
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          .li-meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .li-device-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .li-brand-grid, .li-preview-grid, .li-icons-grid { grid-template-columns: 1fr !important; }
          .li-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}

function renderIcon(k: "arch" | "pattern" | "bus" | "wallet" | "calendar" | "whatsapp") {
  switch (k) {
    case "arch": return <ArchIcon />;
    case "pattern": return <PatternIcon />;
    case "bus": return <BusIcon />;
    case "wallet": return <WalletIcon />;
    case "calendar": return <CalendarIcon />;
    case "whatsapp": return <WhatsAppIcon />;
  }
}

function Dot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: CREAM,
        opacity: 0.7,
      }}
    />
  );
}

function SectionKicker({
  text,
  color,
  center,
}: {
  text: string;
  color: string;
  center?: boolean;
}) {
  return (
    <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 14px",
          border: `1px solid ${color}`,
          color,
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            background: color,
            borderRadius: "50%",
          }}
        />
        {text}
      </span>
    </div>
  );
}

function MetaBig({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: TEAL,
          marginBottom: 6,
          opacity: 0.7,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: INK,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: `0 40px 70px -20px rgba(0,0,0,0.35), 0 0 0 1px ${INK}10`,
        background: "#1a1a1a",
      }}
    >
      <div
        style={{
          height: 36,
          background: "#2a2a2a",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: "1px solid #111",
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <div
          style={{
            marginLeft: 16,
            flex: 1,
            maxWidth: 360,
            background: "#1a1a1a",
            borderRadius: 4,
            padding: "4px 10px",
            fontSize: 11,
            fontFamily: "monospace",
            color: "#999",
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          felipecbbb.github.io/la-inquieta
        </div>
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 280,
        padding: "12px 12px 14px",
        background: "#1a1a1a",
        borderRadius: 36,
        boxShadow: `0 40px 70px -15px rgba(0,0,0,0.45), 0 0 0 1px ${INK}10, inset 0 0 0 2px #2a2a2a`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 6,
          background: "#000",
          borderRadius: 999,
          zIndex: 2,
        }}
      />
      <div style={{ borderRadius: 26, overflow: "hidden", background: "#000" }}>
        {children}
      </div>
    </div>
  );
}

function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: color,
          border: `1px solid ${GOLD}30`,
        }}
      />
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: GOLD_LIGHT,
          marginTop: 6,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 9,
          color: `${CREAM}88`,
          marginTop: 2,
        }}
      >
        {hex}
      </div>
    </div>
  );
}

function BigStat({ num, label, color }: { num: string; label: string; color: string }) {
  return (
    <div
      style={{
        background: CREAM_WARM,
        borderLeft: `3px solid ${color}`,
        padding: "26px 22px",
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: 64,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          color,
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: INK,
          marginTop: 8,
          opacity: 0.75,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionPreview({
  number,
  title,
  subtitle,
  image,
  kicker,
}: {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  kicker: string;
}) {
  return (
    <div
      style={{
        background: CREAM,
        borderTop: `3px solid ${CORAL}`,
        boxShadow: `0 24px 40px -20px rgba(0,0,0,0.25)`,
        overflow: "hidden",
        transition: "transform 0.4s ease",
      }}
    >
      <div style={{ padding: "22px 22px 18px" }}>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontStyle: "italic",
            fontSize: 13,
            color: CORAL_DEEP,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {number} · {kicker}
        </div>
        <h3
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: "-0.01em",
            color: INK,
            marginBottom: 10,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 15,
            lineHeight: 1.4,
            color: INK,
            opacity: 0.75,
          }}
        >
          {subtitle}
        </p>
      </div>
      <div style={{ padding: "0 12px 12px" }}>
        <div style={{ background: TEAL_DEEP, padding: 4, overflow: "hidden" }}>
          <Image
            src={image}
            alt={title}
            width={1440}
            height={900}
            unoptimized
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}

function IconCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        background: CREAM_WARM,
        padding: "28px 24px 24px",
        borderLeft: `3px solid ${CORAL}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ color: CORAL_DEEP }}>{icon}</div>
      <h4
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "-0.01em",
          color: INK,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          lineHeight: 1.4,
          color: INK,
          opacity: 0.75,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function OrnamentalStar() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: "0 auto" }}>
      <path d="M20 2L24 14L36 16L24 20L20 32L16 20L4 16L16 14Z" fill={GOLD} opacity="0.9" />
      <circle cx="20" cy="17" r="3" fill={CORAL} />
    </svg>
  );
}

function ArchIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 40V20 Q6 8 22 4 Q38 8 38 20 V40" />
      <path d="M10 40V22 Q10 12 22 9 Q34 12 34 22 V40" opacity="0.5" />
    </svg>
  );
}
function PatternIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 4L30 14L22 22L14 14Z" />
      <path d="M22 22L30 32L22 40L14 32Z" />
      <path d="M4 22L14 14L14 30Z" opacity="0.5" />
      <path d="M40 22L30 14L30 30Z" opacity="0.5" />
    </svg>
  );
}
function BusIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="6" y="12" width="32" height="20" rx="3" />
      <path d="M6 24h32M10 12v20M22 12v12M34 12v20" />
      <circle cx="13" cy="34" r="3" fill="currentColor" />
      <circle cx="31" cy="34" r="3" fill="currentColor" />
    </svg>
  );
}
function WalletIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="22" cy="22" rx="14" ry="8" />
      <ellipse cx="22" cy="22" rx="18" ry="11" opacity="0.45" />
      <path d="M16 22l4 3 8-6" strokeWidth="2.4" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="6" y="10" width="32" height="28" rx="2" />
      <path d="M6 18h32M14 6v8M30 6v8" />
      <rect x="12" y="24" width="6" height="6" fill="currentColor" opacity="0.3" />
      <rect x="26" y="24" width="6" height="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="currentColor">
      <path d="M32 24c-.5-.3-3-1.5-3.5-1.7s-.8-.3-1.2.3-1.3 1.7-1.6 2-.6.4-1.2.1c-1.8-.9-3.4-2.1-4.8-3.8-.4-.6 0-.6.4-1.1.3-.4.7-.9.9-1.2.1-.2.1-.5 0-.7s-1.2-2.8-1.6-3.9c-.4-.9-.8-.8-1.2-.8-.3 0-.7 0-1 0-.4 0-.9.1-1.4.6s-1.8 1.7-1.8 4.2 1.9 4.9 2.1 5.3c.3.3 3.7 5.8 9 7.9 3.3 1.3 5.5 1.2 7.1.5 1-.4 3-1.2 3.4-2.4.4-1.2.4-2.2.3-2.4-.1-.2-.5-.4-1-.6z" />
      <path d="M22 4C11.5 4 3 12.5 3 23c0 3.3.9 6.5 2.5 9.3L3 40l8-2.5c2.6 1.4 5.7 2.2 8.8 2.2 10.5 0 19-8.5 19-19S32.5 4 22 4zm0 34.5c-2.9 0-5.7-.8-8.2-2.2l-.6-.4-6 1.7 1.7-6-.4-.6c-1.6-2.5-2.5-5.4-2.5-8.5 0-8.8 7.2-16 16-16s16 7.2 16 16-7.2 16-16 16z" />
    </svg>
  );
}
