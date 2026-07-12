"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";

/* ===== ÍCARO — minimalista blanco/negro, Inter ===== */
const WHITE = "#ffffff";
const INK = "#0a0a0a";
const GRAY = "#8a8a8a";
const LIGHT = "#f4f4f4";
const LINE = "#e7e7e7";
const SANS = "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Arial, sans-serif";
const EASE = [0.2, 0.8, 0.2, 1] as const;
const IMG = "/projects/icaro";

type Dict = {
  back: string;
  viewShop: string;
  eyebrow: string;
  heroSub: string;
  heroMeta: string;
  scroll: string;
  marquee: string;
  briefKicker: string;
  briefHead: string;
  briefP1: string;
  briefP2: string;
  buildKicker: string;
  buildHead: string;
  build: { t: string; d: string }[];
  dropKicker: string;
  dropModel: string;
  products: { color: string; img: string }[];
  addToCart: string;
  craftKicker: string;
  craftHeadA: string;
  craftHeadB: string;
  craftBody: string;
  facts: string[];
  galleryKicker: string;
  galleryHead: string;
  ctaHead: string;
  ctaBody: string;
  ctaPrimary: string;
};

const PRICE = "€119,99";

const T: Record<Lang, Dict> = {
  es: {
    back: "Proyectos",
    viewShop: "Ver tienda",
    eyebrow: "Caso · E-commerce a medida en Shopify",
    heroSub: "Una tienda hecha a mano para una marca hecha a mano. DROP 000.",
    heroMeta: "Shopify · Liquid · Bilingüe ES/EN · 2026",
    scroll: "Desliza",
    marquee: "Hecho a mano en Portugal · Nacido en España",
    briefKicker: "· El encargo",
    briefHead: "El producto es premium. La web no podía ser una plantilla.",
    briefP1:
      "ÍCARO son sneakers premium fabricadas a mano en Portugal con materiales de Italia y España, nacidas en España. Una marca de tirada limitada no se vende con un tema genérico: la tienda tenía que respirar «hecho a mano» y dejar al producto como único protagonista.",
    briefP2:
      "Les construí la tienda desde cero — un tema de Shopify a medida en Liquid, bilingüe (ES/EN), minimalista en blanco y negro, y enteramente gestionable desde el editor de Shopify para que el equipo cambie carruseles, drops y reseñas sin tocar una línea de código.",
    buildKicker: "· Lo que construí",
    buildHead: "Un tema a medida, sección a sección.",
    build: [
      { t: "Hero carrusel", d: "Portada a pantalla completa con slides configurables: imagen, título y CTA por slide." },
      { t: "Drop grid", d: "Rejilla de lanzamientos con huecos para componer el layout." },
      { t: "Página de producto", d: "Variantes de color y talla, galería de medios y valoraciones." },
      { t: "Feed de Instagram", d: "Galería de la cuenta integrada como prueba social." },
      { t: "Reseñas", d: "Bloque estilo Trustpilot para dar confianza a una marca nueva." },
      { t: "Bilingüe ES/EN", d: "Sistema i18n propio en toda la tienda." },
      { t: "Club & lanzamientos", d: "Club de miembros, lanzamientos y devoluciones." },
      { t: "Autogestión", d: "Todo editable desde Shopify + guía de instalación." },
    ],
    dropKicker: "· La tienda",
    dropModel: "ÍCARO",
    products: [
      { color: "WHITE", img: "shoe-white.png" },
      { color: "BLACK", img: "shoe-black.png" },
    ],
    addToCart: "Añadir al carrito",
    craftKicker: "· La marca",
    craftHeadA: "No marcamos el camino.",
    craftHeadB: "Nosotros lo hacemos posible.",
    craftBody:
      "Cada par se fabrica a mano en Portugal, en tiradas limitadas, con materiales premium de Italia y España. La web tenía que transmitir ese nivel: fotografía limpia, mucho aire y blanco y negro. Sin ruido — el calzado habla solo.",
    facts: ["100% a medida", "Bilingüe ES/EN", "DROP 000", "Envío 24-48h", "icarolab.es"],
    galleryKicker: "· En imágenes",
    galleryHead: "El producto, como protagonista.",
    ctaHead: "¿Tu marca merece una tienda así?",
    ctaBody:
      "Desarrollo a medida que vende — no plantillas. Si lanzas un producto y quieres una web a su altura, hablemos.",
    ctaPrimary: "Hablemos de tu proyecto",
  },
  en: {
    back: "Work",
    viewShop: "View store",
    eyebrow: "Case · Bespoke Shopify e-commerce",
    heroSub: "A handmade store for a handmade brand. DROP 000.",
    heroMeta: "Shopify · Liquid · Bilingual ES/EN · 2026",
    scroll: "Scroll",
    marquee: "Handmade in Portugal · Born in Spain",
    briefKicker: "· The brief",
    briefHead: "The product is premium. The site couldn't be a template.",
    briefP1:
      "ÍCARO are premium sneakers handmade in Portugal with materials from Italy and Spain, born in Spain. A limited-run brand doesn't sell with a generic theme: the store had to breathe \"handmade\" and let the product be the sole lead.",
    briefP2:
      "I built the store from scratch — a bespoke Shopify theme in Liquid, bilingual (ES/EN), black-and-white minimalism, and fully manageable from the Shopify editor so the team can change carousels, drops and reviews without touching a line of code.",
    buildKicker: "· What I built",
    buildHead: "A bespoke theme, section by section.",
    build: [
      { t: "Hero carousel", d: "Full-screen cover with configurable slides: image, title and CTA per slide." },
      { t: "Drop grid", d: "Launch grid with empty slots to compose the layout." },
      { t: "Product page", d: "Color and size variants, media gallery and reviews." },
      { t: "Instagram feed", d: "Integrated account gallery as social proof." },
      { t: "Reviews", d: "Trustpilot-style block to build trust for a new brand." },
      { t: "Bilingual ES/EN", d: "Custom i18n system across the whole store." },
      { t: "Club & launches", d: "Members club, launches and returns." },
      { t: "Self-managed", d: "All editable from Shopify + install guide." },
    ],
    dropKicker: "· The store",
    dropModel: "ÍCARO",
    products: [
      { color: "WHITE", img: "shoe-white.png" },
      { color: "BLACK", img: "shoe-black.png" },
    ],
    addToCart: "Add to cart",
    craftKicker: "· The brand",
    craftHeadA: "We don't set the path.",
    craftHeadB: "We make it possible.",
    craftBody:
      "Each pair is handmade in Portugal, in limited runs, with premium materials from Italy and Spain. The site had to convey that: clean photography, lots of air and black and white. No noise — the footwear speaks for itself.",
    facts: ["100% bespoke", "Bilingual ES/EN", "DROP 000", "24-48h shipping", "icarolab.es"],
    galleryKicker: "· In pictures",
    galleryHead: "The product as the lead.",
    ctaHead: "Does your brand deserve a store like this?",
    ctaBody:
      "Bespoke development that sells — not templates. If you're launching a product and want a site to match, let's talk.",
    ctaPrimary: "Let's talk about your project",
  },
  de: {
    back: "Projekte",
    viewShop: "Shop ansehen",
    eyebrow: "Case · Maßgeschneidertes Shopify-E-Commerce",
    heroSub: "Ein handgefertigter Shop für eine handgefertigte Marke. DROP 000.",
    heroMeta: "Shopify · Liquid · Zweisprachig ES/EN · 2026",
    scroll: "Scrollen",
    marquee: "Handgefertigt in Portugal · Geboren in Spanien",
    briefKicker: "· Der Auftrag",
    briefHead: "Das Produkt ist premium. Die Site durfte keine Vorlage sein.",
    briefP1:
      "ÍCARO sind Premium-Sneaker, handgefertigt in Portugal mit Materialien aus Italien und Spanien, geboren in Spanien. Eine limitierte Marke verkauft sich nicht mit einem generischen Theme: Der Shop musste „handgemacht\" atmen und das Produkt als einzigen Hauptdarsteller lassen.",
    briefP2:
      "Ich baute den Shop von Grund auf — ein maßgeschneidertes Shopify-Theme in Liquid, zweisprachig (ES/EN), Schwarz-Weiß-Minimalismus, voll über den Shopify-Editor verwaltbar, damit das Team Karussells, Drops und Reviews ohne Code ändern kann.",
    buildKicker: "· Was ich baute",
    buildHead: "Ein eigenes Theme, Sektion für Sektion.",
    build: [
      { t: "Hero-Karussell", d: "Vollbild-Cover mit konfigurierbaren Slides: Bild, Titel und CTA pro Slide." },
      { t: "Drop-Grid", d: "Launch-Grid mit leeren Slots zum Layout-Komponieren." },
      { t: "Produktseite", d: "Farb- und Größenvarianten, Medien-Galerie und Bewertungen." },
      { t: "Instagram-Feed", d: "Integrierte Account-Galerie als Social Proof." },
      { t: "Reviews", d: "Trustpilot-Style-Block für Vertrauen in eine neue Marke." },
      { t: "Zweisprachig ES/EN", d: "Eigenes i18n-System im ganzen Shop." },
      { t: "Club & Launches", d: "Mitglieder-Club, Launches und Rückgaben." },
      { t: "Selbstverwaltet", d: "Alles über Shopify editierbar + Installationsanleitung." },
    ],
    dropKicker: "· Der Shop",
    dropModel: "ÍCARO",
    products: [
      { color: "WHITE", img: "shoe-white.png" },
      { color: "BLACK", img: "shoe-black.png" },
    ],
    addToCart: "In den Warenkorb",
    craftKicker: "· Die Marke",
    craftHeadA: "Wir geben den Weg nicht vor.",
    craftHeadB: "Wir machen ihn möglich.",
    craftBody:
      "Jedes Paar wird in Portugal handgefertigt, in limitierter Auflage, mit Premium-Materialien aus Italien und Spanien. Die Site musste das vermitteln: saubere Fotografie, viel Luft und Schwarz-Weiß. Kein Lärm — der Schuh spricht für sich.",
    facts: ["100% maßgeschneidert", "Zweisprachig ES/EN", "DROP 000", "Versand 24-48h", "icarolab.es"],
    galleryKicker: "· In Bildern",
    galleryHead: "Das Produkt als Hauptdarsteller.",
    ctaHead: "Verdient deine Marke so einen Shop?",
    ctaBody:
      "Maßgeschneiderte Entwicklung, die verkauft — keine Vorlagen. Wenn du ein Produkt launchst und eine passende Site willst, sprechen wir.",
    ctaPrimary: "Sprechen wir über dein Projekt",
  },
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.55)" : GRAY, marginBottom: 20 }}>
      {children}
    </div>
  );
}

export default function IcaroDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ background: WHITE, color: INK, fontFamily: SANS, overflow: "hidden", letterSpacing: "-0.005em" }}>
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
          background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease",
        }}
      >
        <Link href="/proyectos" style={{ color: INK, textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8 }}>
          ← {t.back}
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LangSwitcher tone="dark" />
          <a href="https://www.icarolab.es" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: WHITE, background: INK, padding: "9px 18px", borderRadius: 999, textDecoration: "none" }}>
            {t.viewShop} ↗
          </a>
        </div>
      </header>

      {/* ===== Hero — partido ===== */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100svh" }} className="icaro-hero">
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(110px,12vw,140px) clamp(24px,5vw,72px) clamp(48px,6vw,72px)" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: GRAY, marginBottom: 30 }}>{t.eyebrow}</div>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={`${IMG}/logo.svg`}
            alt="ÍCARO"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            style={{ width: "min(420px, 72%)", display: "block" }}
          />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }} style={{ marginTop: 28, fontSize: "clamp(16px,1.5vw,21px)", lineHeight: 1.4, fontWeight: 400, color: "#333", maxWidth: 380 }}>
            {t.heroSub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }} style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GRAY, fontWeight: 600 }}>
            {t.heroMeta}
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }}
            href="https://www.icarolab.es" target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 36, alignSelf: "flex-start", background: INK, color: WHITE, padding: "15px 28px", borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}
          >
            {t.viewShop} ↗
          </motion.a>
        </div>
        <div style={{ position: "relative", minHeight: "52svh", background: LIGHT }}>
          <Image src={`${IMG}/lifestyle.jpg`} alt="ÍCARO" fill priority quality={92} sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div style={{ background: INK, color: WHITE, overflow: "hidden", padding: "16px 0" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "icaro-marq 28s linear infinite" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ fontSize: "clamp(13px,1.4vw,16px)", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 44, paddingRight: 44 }}>
              {t.marquee} <span aria-hidden style={{ opacity: 0.4 }}>—</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== El encargo — sticky a dos columnas ===== */}
      <section style={{ padding: "clamp(80px,12vw,150px) clamp(20px,5vw,77px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "clamp(32px,5vw,80px)", alignItems: "start" }} className="icaro-brief">
          <div style={{ position: "sticky", top: 110 }} className="icaro-brief-l">
            <Kicker>{t.briefKicker}</Kicker>
            <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.02em", margin: 0 }}>{t.briefHead}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <Reveal><p style={{ fontSize: "clamp(17px,1.5vw,22px)", lineHeight: 1.6, color: "#333", margin: 0 }}>{t.briefP1}</p></Reveal>
            <Reveal delay={0.08}><p style={{ fontSize: "clamp(17px,1.5vw,22px)", lineHeight: 1.6, color: "#333", margin: 0 }}>{t.briefP2}</p></Reveal>
          </div>
        </div>
      </section>

      {/* ===== Lo que construí — índice tipográfico ===== */}
      <section style={{ padding: "clamp(40px,6vw,80px) clamp(20px,5vw,77px) clamp(80px,12vw,140px)", borderTop: `1px solid ${LINE}` }}>
        <Reveal><Kicker>{t.buildKicker}</Kicker></Reveal>
        <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 600, lineHeight: 1.08, margin: "0 0 40px", maxWidth: 720, letterSpacing: "-0.02em" }}>{t.buildHead}</h2></Reveal>
        <div>
          {t.build.map((b, i) => (
            <Reveal key={b.t} delay={Math.min(i * 0.04, 0.2)}>
              <div className="icaro-row" style={{ display: "grid", gridTemplateColumns: "60px 1fr 1.4fr", gap: "clamp(12px,3vw,40px)", alignItems: "baseline", padding: "22px 0", borderTop: `1px solid ${LINE}` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: GRAY }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.01em" }}>{b.t}</span>
                <span style={{ fontSize: "clamp(14px,1.1vw,16px)", lineHeight: 1.5, color: "#666" }}>{b.d}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DROP 000 — escaparate editorial, sin marcos ===== */}
      <section style={{ padding: "clamp(80px,12vw,140px) clamp(20px,5vw,77px)", background: WHITE }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: "clamp(40px,5vw,64px)" }}>
          <div>
            <Reveal><Kicker>{t.dropKicker}</Kicker></Reveal>
            <Reveal delay={0.05}><h2 style={{ fontSize: "clamp(44px,8vw,128px)", fontWeight: 700, letterSpacing: "0.01em", margin: 0, lineHeight: 0.9 }}>DROP 000</h2></Reveal>
          </div>
          <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: GRAY, fontWeight: 600 }}>{PRICE}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(24px,5vw,72px)" }} className="icaro-drop">
          {t.products.map((p, i) => (
            <Reveal key={p.color} delay={i * 0.08}>
              <a href="https://www.icarolab.es" target="_blank" rel="noopener noreferrer" className="icaro-prod" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div className="icaro-prod-media" style={{ position: "relative", aspectRatio: "1 / 1", background: "#f6f5f2", overflow: "hidden" }}>
                  <Image src={`${IMG}/${p.img}`} alt={`ÍCARO ${p.color}`} fill quality={92} sizes="(max-width: 760px) 100vw, 45vw" style={{ objectFit: "contain", padding: "6%", transition: "transform 0.7s cubic-bezier(.2,.8,.2,1)" }} />
                  <span style={{ position: "absolute", top: 18, right: 20, fontSize: 20, fontWeight: 300, color: INK }}>+</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22 }}>
                  <div style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 600, letterSpacing: "0.01em" }}>{p.color}</div>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{PRICE}</span>
                </div>
                <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: INK, borderBottom: `1px solid ${INK}`, paddingBottom: 5 }}>
                  {t.addToCart} <span aria-hidden>→</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== La marca — declaración tipográfica sobre negro ===== */}
      <section style={{ background: INK, color: WHITE, padding: "clamp(96px,15vw,180px) clamp(20px,5vw,77px)" }}>
        <div style={{ maxWidth: 1180 }}>
          <Reveal><Kicker light>{t.craftKicker}</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ fontSize: "clamp(34px,6.8vw,98px)", fontWeight: 600, lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 36px" }}>
              {t.craftHeadA}<br /><span style={{ color: "rgba(255,255,255,0.42)" }}>{t.craftHeadB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}><p style={{ fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.65, color: "rgba(255,255,255,0.72)", margin: 0, maxWidth: 580 }}>{t.craftBody}</p></Reveal>
        </div>
      </section>

      {/* ===== Datos — tira horizontal ===== */}
      <section style={{ padding: "clamp(28px,3vw,40px) clamp(20px,5vw,77px)", borderBottom: `1px solid ${LINE}` }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "clamp(14px,2.5vw,40px)" }}>
          {t.facts.map((f, i) => (
            <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(14px,2.5vw,40px)" }}>
              {i > 0 && <span aria-hidden style={{ width: 4, height: 4, borderRadius: "50%", background: GRAY }} />}
              <span style={{ fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{f}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== Galería — fila compacta y contenida ===== */}
      <section style={{ padding: "clamp(72px,10vw,120px) clamp(20px,5vw,77px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <Reveal><Kicker>{t.galleryKicker}</Kicker></Reveal>
            <Reveal delay={0.05}><span style={{ fontSize: "clamp(14px,1.3vw,17px)", color: GRAY, fontWeight: 500 }}>{t.galleryHead}</span></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(10px,1.2vw,16px)" }} className="icaro-gallery">
            <GalleryImg src={`${IMG}/cover.jpg`} alt="ÍCARO" ratio="4 / 5" />
            <GalleryImg src={`${IMG}/factory.jpg`} alt="Hecho a mano en Portugal" ratio="4 / 5" />
            <GalleryImg src={`${IMG}/lifestyle.jpg`} alt="ÍCARO" ratio="4 / 5" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: "clamp(90px,14vw,160px) clamp(20px,5vw,77px)", background: INK, color: WHITE, textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontSize: "clamp(30px,5vw,64px)", fontWeight: 600, lineHeight: 1.08, margin: "0 0 24px", letterSpacing: "-0.02em" }}>{t.ctaHead}</h2></Reveal>
          <Reveal delay={0.05}><p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: "0 0 40px" }}>{t.ctaBody}</p></Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contacto" style={{ background: WHITE, color: INK, padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none" }}>{t.ctaPrimary} →</Link>
              <a href="https://www.icarolab.es" target="_blank" rel="noopener noreferrer" style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: WHITE, padding: "16px 30px", borderRadius: 999, fontWeight: 600, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", textDecoration: "none" }}>{t.viewShop} ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />

      <style jsx global>{`
        @keyframes icaro-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .icaro-row { transition: padding-left 0.3s ease, background 0.3s ease; }
        .icaro-row:hover { padding-left: 10px; background: ${LIGHT}; }
        .icaro-prod:hover .icaro-prod-media img { transform: scale(1.04) !important; }
        @media (max-width: 900px) {
          .icaro-hero { grid-template-columns: 1fr !important; }
          .icaro-hero > div:last-child { min-height: 70svh !important; order: -1; }
          .icaro-brief { grid-template-columns: 1fr !important; }
          .icaro-brief-l { position: static !important; }
        }
        @media (max-width: 680px) {
          .icaro-row { grid-template-columns: 32px 1fr !important; }
          .icaro-row > span:last-child { grid-column: 2 !important; }
          .icaro-drop { grid-template-columns: 1fr !important; }
          .icaro-gallery { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function GalleryImg({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, borderRadius: 12, overflow: "hidden", border: `1px solid ${LINE}` }}>
      <Image src={src} alt={alt} fill quality={92} sizes="(max-width: 680px) 100vw, 50vw" style={{ objectFit: "cover" }} />
    </div>
  );
}
