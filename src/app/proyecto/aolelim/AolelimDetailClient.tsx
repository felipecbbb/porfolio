"use client";

/* =========================================================
   AOLELIM — detalle único. Lujo minimalista B/N con acento arena:
   announcement bar real de la tienda, el concepto del nombre
   (lím sin límite), manifiesto en marquee, la mecánica
   «Completa el set» recreada con las fotos reales del shooting.
   ========================================================= */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";

/* Paleta de la marca: blanco y negro, punto de arena. */
const NOIR = "#0b0b0b";
const NOIR2 = "#131313";
const BONE = "#f2ede3";
const BONE2 = "#fbf8f1";
const SAND = "#c8b79b";
const BODY = "rgba(242,237,227,0.72)";
const LINE = "rgba(242,237,227,0.16)";

const DISPLAY = "var(--font-worksans), 'Helvetica Neue', system-ui, sans-serif";
const SERIF = "var(--font-fraunces), Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

type Block = { t: string; d: string };
type Quote = { q: string; s: string };
type Stat = { n: string; u: string };

type Dict = {
  back: string;
  badge: string;
  announce: string[];
  heroTitle: string;
  heroSub: string;
  role: string;
  nameLabel: string;
  nameTitle: string;
  nameText: string;
  introLabel: string;
  introTitle: string;
  introText: string;
  marquee: string[];
  buildLabel: string;
  buildTitle: string;
  blocks: Block[];
  setLabel: string;
  setTitle: string;
  setText: string;
  setTop: string;
  setBottom: string;
  setEquals: string;
  setCta: string;
  galLabel: string;
  galTitle: string;
  voiceLabel: string;
  voiceTitle: string;
  voiceText: string;
  quotes: Quote[];
  statsLabel: string;
  stats: Stat[];
  ctaLabel: string;
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
};

const T: Record<Lang, Dict> = {
  es: {
    back: "Proyectos",
    badge: "E-commerce · Moda baño & beachwear",
    announce: ["ENVÍO GRATIS A PARTIR DE 100€", "NUEVA COLECCIÓN — ELEVA TU ROLLO", "DEVOLUCIONES FÁCILES EN 30 DÍAS"],
    heroTitle: "Eleva tu rollo.",
    heroSub:
      "Tienda Shopify completa para AOLELIM, la marca de baño y beachwear de Sofía: tema exprimido a fondo, todo el copy en la voz de la marca y una sección a medida que vende el conjunto entero.",
    role: "Shopify · Copy · Secciones Liquid a medida",
    nameLabel: "El nombre",
    nameTitle: "En matemáticas, el límite se escribe «lím». Ellas lo quitaron.",
    nameText:
      "AOLELIM es una marca sin límites: baño y beachwear minimalista para las que hacen lo que quieren. Toda la web respira esa idea — sin reglas, sin permisos, sin pedir perdón.",
    introLabel: "El encargo",
    introTitle: "Una marca nueva. Una tienda que no pareciera plantilla.",
    introText:
      "Sofía lanzaba su marca desde cero con presupuesto de emprendedora. El reto: que Shopify transmitiera lujo minimalista —no tema recién instalado—, que el copy sonara a ella (atrevida, directa, en mayúsculas) y que la tienda tuviera mecánicas reales de venta desde el día uno.",
    marquee: ["SIN REGLAS", "SIN PERMISOS", "SIN PEDIR PERDÓN", "HECHO PARA EL SOL"],
    buildLabel: "Lo que construí",
    buildTitle: "Shopify, exprimido.",
    blocks: [
      {
        t: "Tema a medida, no plantilla",
        d: "Personalización profunda del tema: tipografía Work Sans en mayúsculas, base limpia y fotografía editorial a color del shooting real. Nada que delate un tema de serie.",
      },
      {
        t: "Copy íntegro de la marca",
        d: "Home, colecciones, sobre nosotros, fichas de producto, barra de anuncios y newsletter — todo escrito en su voz: frases cortas, cero permiso, mayúsculas que golpean.",
      },
      {
        t: "«Completa el set» en Liquid",
        d: "Sección custom que detecta la pieza que falta del conjunto y la sugiere en la ficha. Sube el ticket medio vendiendo el set, no la prenda.",
      },
      {
        t: "Catálogo listo para escalar",
        d: "Colecciones estructuradas por temporada, productos con variantes preparados y navegación que crece sin rehacer nada.",
      },
    ],
    setLabel: "La mecánica estrella",
    setTitle: "Completa el set.",
    setText:
      "La pieza clave de la tienda: si miras el top, la sección te enseña la braguita que le falta al conjunto — y viceversa. Vender el set completo, no la prenda suelta.",
    setTop: "KISSES · Top",
    setBottom: "KISSES · Braguita",
    setEquals: "El set completo",
    setCta: "Así se ve en la ficha de producto",
    galLabel: "El universo de la marca",
    galTitle: "Segunda piel, sol y actitud.",
    voiceLabel: "La voz",
    voiceTitle: "Copy que no pide permiso.",
    voiceText: "Piezas reales del copy que escribí para la tienda:",
    quotes: [
      { q: "NO TE DEFINIMOS. TÚ LE DAS TU ROLLO.", s: "Sobre nosotros — titular" },
      { q: "UNA MARCA PARA LAS QUE HACEN LO QUE QUIEREN", s: "Home — brand statement" },
      { q: "No te decimos cómo llevarlo. Te damos la pieza; el rollo lo pones tú.", s: "Sobre nosotros — cierre" },
    ],
    statsLabel: "La tienda, en números",
    stats: [
      { n: "1", u: "tienda completa lista para lanzar" },
      { n: "100%", u: "copy propio de la marca" },
      { n: "+1", u: "sección Liquid a medida" },
      { n: "∞", u: "sin límites — literal" },
    ],
    ctaLabel: "Pre-lanzamiento",
    ctaTitle: "La tienda abre pronto.",
    ctaSub: "AOLELIM está en pre-lanzamiento. ¿Quieres una tienda que venda así desde el día uno?",
    ctaBtn: "Hablemos de tu proyecto",
  },
  en: {
    back: "Projects",
    badge: "E-commerce · Swim & beachwear",
    announce: ["FREE SHIPPING FROM €100", "NEW COLLECTION — ELEVA TU ROLLO", "EASY 30-DAY RETURNS"],
    heroTitle: "Eleva tu rollo.",
    heroSub:
      "Complete Shopify store for AOLELIM, Sofía's swim & beachwear brand: the theme pushed to its limit, all copy in the brand's voice and a custom section that sells the whole set.",
    role: "Shopify · Copywriting · Custom Liquid sections",
    nameLabel: "The name",
    nameTitle: "In maths, the limit is written “lím”. They removed it.",
    nameText:
      "AOLELIM is a brand without limits: minimalist swim & beachwear for women who do what they want. The whole site breathes that idea — no rules, no permission, no apologies.",
    introLabel: "The brief",
    introTitle: "A brand new label. A store that didn't look like a template.",
    introText:
      "Sofía was launching her brand from scratch on a founder's budget. The challenge: make Shopify convey minimalist luxury —not a freshly installed theme—, copy that sounded like her (bold, direct, uppercase) and real selling mechanics from day one.",
    marquee: ["NO RULES", "NO PERMISSION", "NO APOLOGIES", "MADE FOR THE SUN"],
    buildLabel: "What I built",
    buildTitle: "Shopify, squeezed.",
    blocks: [
      {
        t: "Custom theme, not template",
        d: "Deep theme customisation: uppercase Work Sans, a clean base and colour editorial photography from the real shoot. Nothing gives away a stock theme.",
      },
      {
        t: "Full brand copywriting",
        d: "Home, collections, about, product pages, announcement bar and newsletter — all written in her voice: short sentences, zero permission, uppercase that hits.",
      },
      {
        t: "“Complete the set” in Liquid",
        d: "Custom section that detects the missing piece of the set and suggests it on the product page. Raises average order value by selling the set, not the piece.",
      },
      {
        t: "Catalogue built to scale",
        d: "Collections structured by season, products with variants ready and navigation that grows without rebuilding anything.",
      },
    ],
    setLabel: "The star mechanic",
    setTitle: "Complete the set.",
    setText:
      "The store's key piece: if you're looking at the top, the section shows you the bottom the set is missing — and vice versa. Sell the full set, not the loose piece.",
    setTop: "KISSES · Top",
    setBottom: "KISSES · Bottom",
    setEquals: "The full set",
    setCta: "How it looks on the product page",
    galLabel: "The brand universe",
    galTitle: "Second skin, sun and attitude.",
    voiceLabel: "The voice",
    voiceTitle: "Copy that asks no permission.",
    voiceText: "Real pieces of the copy I wrote for the store:",
    quotes: [
      { q: "NO TE DEFINIMOS. TÚ LE DAS TU ROLLO.", s: "About — headline" },
      { q: "UNA MARCA PARA LAS QUE HACEN LO QUE QUIEREN", s: "Home — brand statement" },
      { q: "We don't tell you how to wear it. We give you the piece; the attitude is yours.", s: "About — closing" },
    ],
    statsLabel: "The store, in numbers",
    stats: [
      { n: "1", u: "complete store ready to launch" },
      { n: "100%", u: "original brand copy" },
      { n: "+1", u: "custom Liquid section" },
      { n: "∞", u: "no limits — literally" },
    ],
    ctaLabel: "Pre-launch",
    ctaTitle: "The store opens soon.",
    ctaSub: "AOLELIM is in pre-launch. Want a store that sells like this from day one?",
    ctaBtn: "Let's talk about your project",
  },
  de: {
    back: "Projekte",
    badge: "E-Commerce · Bade- & Beachwear",
    announce: ["GRATIS VERSAND AB 100€", "NEUE KOLLEKTION — ELEVA TU ROLLO", "EINFACHE RÜCKGABE IN 30 TAGEN"],
    heroTitle: "Eleva tu rollo.",
    heroSub:
      "Kompletter Shopify-Shop für AOLELIM, Sofías Bade- und Beachwear-Marke: das Theme voll ausgereizt, der gesamte Copy in der Markenstimme und eine Custom-Sektion, die das ganze Set verkauft.",
    role: "Shopify · Copywriting · Custom-Liquid-Sektionen",
    nameLabel: "Der Name",
    nameTitle: "In der Mathematik schreibt man das Limit „lím“. Sie haben es entfernt.",
    nameText:
      "AOLELIM ist eine Marke ohne Limits: minimalistische Bade- und Beachwear für Frauen, die tun, was sie wollen. Die ganze Website atmet diese Idee — keine Regeln, keine Erlaubnis, keine Entschuldigungen.",
    introLabel: "Der Auftrag",
    introTitle: "Eine neue Marke. Ein Shop, der nicht nach Vorlage aussieht.",
    introText:
      "Sofía launchte ihre Marke von Null mit Gründerinnen-Budget. Die Herausforderung: Shopify sollte minimalistischen Luxus vermitteln —kein frisch installiertes Theme—, der Copy sollte nach ihr klingen (mutig, direkt, in Großbuchstaben) und der Shop echte Verkaufsmechaniken ab Tag eins haben.",
    marquee: ["KEINE REGELN", "KEINE ERLAUBNIS", "KEINE ENTSCHULDIGUNG", "GEMACHT FÜR DIE SONNE"],
    buildLabel: "Was ich gebaut habe",
    buildTitle: "Shopify, ausgereizt.",
    blocks: [
      {
        t: "Custom-Theme, keine Vorlage",
        d: "Tiefe Theme-Anpassung: Work Sans in Großbuchstaben, eine cleane Basis und farbige Editorial-Fotografie aus dem echten Shooting. Nichts verrät ein Stock-Theme.",
      },
      {
        t: "Kompletter Marken-Copy",
        d: "Home, Kollektionen, Über uns, Produktseiten, Announcement-Bar und Newsletter — alles in ihrer Stimme: kurze Sätze, null Erlaubnis, Großbuchstaben mit Wirkung.",
      },
      {
        t: "„Complete the set“ in Liquid",
        d: "Custom-Sektion, die das fehlende Teil des Sets erkennt und auf der Produktseite vorschlägt. Höherer Warenkorbwert: verkauft wird das Set, nicht das Einzelteil.",
      },
      {
        t: "Skalierbarer Katalog",
        d: "Kollektionen nach Saison strukturiert, Produkte mit Varianten vorbereitet und eine Navigation, die mitwächst, ohne etwas neu zu bauen.",
      },
    ],
    setLabel: "Die Star-Mechanik",
    setTitle: "Complete the set.",
    setText:
      "Das Schlüsselstück des Shops: Schaust du dir das Top an, zeigt dir die Sektion das fehlende Unterteil des Sets — und umgekehrt. Verkauft wird das ganze Set, nicht das lose Teil.",
    setTop: "KISSES · Top",
    setBottom: "KISSES · Slip",
    setEquals: "Das komplette Set",
    setCta: "So sieht es auf der Produktseite aus",
    galLabel: "Das Markenuniversum",
    galTitle: "Zweite Haut, Sonne und Attitüde.",
    voiceLabel: "Die Stimme",
    voiceTitle: "Copy, der um keine Erlaubnis bittet.",
    voiceText: "Echte Stücke aus dem Copy, den ich für den Shop schrieb:",
    quotes: [
      { q: "NO TE DEFINIMOS. TÚ LE DAS TU ROLLO.", s: "Über uns — Headline" },
      { q: "UNA MARCA PARA LAS QUE HACEN LO QUE QUIEREN", s: "Home — Brand-Statement" },
      { q: "Wir sagen dir nicht, wie du es trägst. Wir geben dir das Teil; die Attitüde kommt von dir.", s: "Über uns — Abschluss" },
    ],
    statsLabel: "Der Shop, in Zahlen",
    stats: [
      { n: "1", u: "kompletter Shop, bereit zum Launch" },
      { n: "100%", u: "eigener Marken-Copy" },
      { n: "+1", u: "Custom-Liquid-Sektion" },
      { n: "∞", u: "ohne Limits — wörtlich" },
    ],
    ctaLabel: "Pre-Launch",
    ctaTitle: "Der Shop öffnet bald.",
    ctaSub: "AOLELIM ist im Pre-Launch. Willst du einen Shop, der ab Tag eins so verkauft?",
    ctaBtn: "Sprechen wir über dein Projekt",
  },
};

const GALLERY = [
  "/projects/aolelim/g-1.jpg",
  "/projects/aolelim/g-2.jpg",
  "/projects/aolelim/portrait.jpg",
  "/projects/aolelim/g-3.jpg",
  "/projects/aolelim/g-4.jpg",
  "/projects/aolelim/g-5.jpg",
];

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE },
};

export default function AolelimDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const announce = [...t.announce, ...t.announce];
  const manifesto = [...t.marquee, ...t.marquee, ...t.marquee].join("  ✦  ") + "  ✦  ";

  return (
    <div style={{ background: NOIR, color: BONE, fontFamily: SANS }}>
      {/* ANNOUNCEMENT BAR — la real de la tienda, en marquee */}
      <div
        className="fixed top-0 inset-x-0 z-[60] overflow-hidden"
        style={{ background: BONE, color: NOIR, height: 34 }}
        aria-hidden
      >
        <div className="aol-announce whitespace-nowrap" style={{ lineHeight: "34px" }}>
          {[0, 1].map((k) => (
            <span key={k} className="inline-block">
              {announce.map((a, i) => (
                <span
                  key={i}
                  className="inline-block px-8 text-[11px] tracking-[0.22em]"
                  style={{ fontFamily: DISPLAY, fontWeight: 600 }}
                >
                  {a} <span style={{ color: SAND }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header
        className="fixed inset-x-0 z-50 backdrop-blur-md"
        style={{ top: 34, background: "rgba(11,11,11,0.72)", borderBottom: `1px solid ${LINE}` }}
      >
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link href="/proyectos" className="text-sm flex items-center gap-2 transition" style={{ color: BODY }}>
            <span style={{ color: BONE }}>←</span> {t.back}
          </Link>
          <span
            className="text-sm tracking-[0.34em] uppercase"
            style={{ fontFamily: DISPLAY, fontWeight: 800 }}
          >
            AOLELIM
          </span>
          <LangSwitcher tone="light" />
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-dvh flex items-end overflow-hidden">
        <Image
          src="/projects/aolelim/hero.jpg"
          alt="AOLELIM — shooting editorial"
          fill
          priority
          quality={86}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%", opacity: 0.78 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.12) 40%, rgba(11,11,11,0.96) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-40 w-full">
          <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: BONE }}>
            {t.badge}
          </span>
          <h1
            className="mt-5 uppercase"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(3rem, 10vw, 8rem)",
              lineHeight: 0.94,
              letterSpacing: "-0.02em",
              color: BONE2,
            }}
          >
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: BODY }}>
            {t.heroSub}
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(242,237,227,0.5)" }}
          >
            <span>{t.role}</span>
            <span style={{ color: SAND }}>·</span>
            <span>2026</span>
            <span style={{ color: SAND }}>·</span>
            <span>Gran Canaria</span>
          </div>
        </div>
      </section>

      {/* EL NOMBRE — lím sin límite */}
      <section className="mx-auto max-w-5xl px-5 py-24 md:py-32 text-center">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: SAND }}>
          {t.nameLabel}
        </motion.p>
        <motion.div {...fade} aria-hidden className="select-none">
          <span
            className="uppercase"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(3.4rem, 12vw, 9rem)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: BONE2,
            }}
          >
            AOLE
            <span className="relative inline-block" style={{ color: "rgba(242,237,227,0.4)" }}>
              LIM
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                className="absolute left-0 right-0 origin-left"
                style={{ top: "52%", height: "0.09em", background: SAND }}
              />
            </span>
          </span>
        </motion.div>
        <motion.h2
          {...fade}
          className="mt-10 mx-auto max-w-2xl"
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)",
            lineHeight: 1.2,
            color: BONE2,
          }}
        >
          {t.nameTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-6 mx-auto max-w-xl leading-relaxed" style={{ color: BODY }}>
          {t.nameText}
        </motion.p>
      </section>

      {/* MANIFIESTO — marquee */}
      <div className="overflow-hidden py-6" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }} aria-hidden>
        <div className="aol-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="inline-block uppercase"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                letterSpacing: "0.08em",
                color: "transparent",
                WebkitTextStroke: `1px rgba(242,237,227,0.55)`,
                paddingRight: 12,
              }}
            >
              {manifesto}
            </span>
          ))}
        </div>
      </div>

      {/* EL ENCARGO */}
      <section className="mx-auto max-w-4xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: SAND }}>
          {t.introLabel}
        </motion.p>
        <motion.h2
          {...fade}
          style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.1, color: BONE2 }}
        >
          {t.introTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-7 text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: BODY }}>
          {t.introText}
        </motion.p>
      </section>

      {/* LO CONSTRUIDO */}
      <section className="py-24 md:py-32" style={{ background: NOIR2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: SAND }}>
            {t.buildLabel}
          </motion.p>
          <motion.h2
            {...fade}
            className="uppercase"
            style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1, color: BONE2 }}
          >
            {t.buildTitle}
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-2 gap-px" style={{ background: LINE, border: `1px solid ${LINE}` }}>
            {t.blocks.map((b, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ ...fade.transition, delay: (i % 2) * 0.1 }}
                className="p-8 md:p-10"
                style={{ background: NOIR2 }}
              >
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.4rem", color: "rgba(242,237,227,0.3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl" style={{ fontWeight: 600, color: BONE2 }}>
                  {b.t}
                </h3>
                <p className="mt-3 leading-relaxed text-sm md:text-base" style={{ color: BODY }}>
                  {b.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETA EL SET — la mecánica recreada */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: SAND }}>
          {t.setLabel}
        </motion.p>
        <motion.h2
          {...fade}
          className="uppercase"
          style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1, color: BONE2 }}
        >
          {t.setTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-5 max-w-xl leading-relaxed" style={{ color: BODY }}>
          {t.setText}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1.15fr] items-center gap-6">
          {/* Top */}
          <motion.figure {...fade} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
            <div className="relative aspect-[3/4]">
              <Image src="/projects/aolelim/set-top.jpg" alt="KISSES top" fill quality={82} sizes="(max-width:768px) 100vw, 30vw" className="object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] flex justify-between" style={{ color: BODY }}>
              <span>{t.setTop}</span>
              <span style={{ color: SAND }}>01</span>
            </figcaption>
          </motion.figure>

          <motion.div {...fade} className="text-center" aria-hidden style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: SAND }}>
            +
          </motion.div>

          {/* Bottom */}
          <motion.figure {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
            <div className="relative aspect-[3/4]">
              <Image src="/projects/aolelim/set-bottom.jpg" alt="KISSES braguita" fill quality={82} sizes="(max-width:768px) 100vw, 30vw" className="object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-[11px] uppercase tracking-[0.2em] flex justify-between" style={{ color: BODY }}>
              <span>{t.setBottom}</span>
              <span style={{ color: SAND }}>02</span>
            </figcaption>
          </motion.figure>

          <motion.div {...fade} className="text-center" aria-hidden style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: SAND }}>
            =
          </motion.div>

          {/* El set */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.2 }}
            className="rounded-xl p-8 md:p-10 flex flex-col items-center justify-center text-center aspect-[3/4]"
            style={{ background: BONE, color: NOIR }}
          >
            <span className="uppercase" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", lineHeight: 1 }}>
              {t.setEquals}
            </span>
            <span className="mt-4" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.15rem", color: "rgba(11,11,11,0.7)" }}>
              KISSES — black
            </span>
            <span className="mt-8 text-[10px] uppercase tracking-[0.24em] px-4 py-2 rounded-full" style={{ border: `1px solid rgba(11,11,11,0.3)` }}>
              {t.setCta}
            </span>
          </motion.div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-24 md:py-32" style={{ background: NOIR2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: SAND }}>
            {t.galLabel}
          </motion.p>
          <motion.h2
            {...fade}
            className="mb-12"
            style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: BONE2 }}
          >
            {t.galTitle}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ ...fade.transition, delay: (i % 3) * 0.07 }}
                className="group relative overflow-hidden rounded-lg"
                style={{ aspectRatio: i % 3 === 1 ? "3/4" : "4/5", background: NOIR }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LA VOZ */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: SAND }}>
          {t.voiceLabel}
        </motion.p>
        <motion.h2
          {...fade}
          style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.9rem,4.5vw,3.4rem)", lineHeight: 1.08, color: BONE2 }}
        >
          {t.voiceTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-4" style={{ color: BODY }}>
          {t.voiceText}
        </motion.p>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {t.quotes.map((c, i) => (
            <motion.blockquote
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="p-7 rounded-xl flex flex-col justify-between min-h-[220px]"
              style={{ border: `1px solid ${LINE}` }}
            >
              <p
                className={i < 2 ? "uppercase" : ""}
                style={
                  i < 2
                    ? { fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.25rem", lineHeight: 1.25, color: BONE2, letterSpacing: "0.01em" }
                    : { fontFamily: SERIF, fontStyle: "italic", fontSize: "1.25rem", lineHeight: 1.4, color: BONE2 }
                }
              >
                “{c.q}”
              </p>
              <footer className="mt-6 text-[10px] uppercase tracking-[0.2em]" style={{ color: SAND }}>
                {c.s}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* EN NÚMEROS */}
      <section className="py-16" style={{ background: NOIR2 }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-10" style={{ color: SAND }}>
            {t.statsLabel}
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((s, i) => (
              <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: BONE2 }}>{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: "rgba(242,237,227,0.5)" }}>{s.u}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: SAND }}>
          {t.ctaLabel}
        </motion.p>
        <motion.h2
          {...fade}
          className="uppercase"
          style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2.2rem,6vw,4.4rem)", lineHeight: 1, color: BONE2 }}
        >
          {t.ctaTitle}
        </motion.h2>
        <motion.p {...fade} className="mt-5 mx-auto max-w-md" style={{ color: BODY }}>
          {t.ctaSub}
        </motion.p>
        <motion.div {...fade}>
          <Link
            href="/#contacto"
            className="mt-8 inline-flex rounded-full px-8 py-4 transition hover:brightness-95"
            style={{ background: BONE, color: NOIR, fontWeight: 600 }}
          >
            {t.ctaBtn} →
          </Link>
        </motion.div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        .aol-announce { display: inline-block; animation: aol-scroll 22s linear infinite; }
        .aol-marquee { display: inline-block; animation: aol-scroll 30s linear infinite; }
        @keyframes aol-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aol-announce, .aol-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
