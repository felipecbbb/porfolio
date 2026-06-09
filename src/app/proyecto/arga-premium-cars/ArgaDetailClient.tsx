"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";

const BLACK = "#0a0a0a";
const ONYX = "#141414";
const GOLD = "#c5a572";
const GOLDB = "#d4b988";
const SANS = "var(--font-geist-sans), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), monospace";
const EASE = [0.22, 1, 0.36, 1] as const;

const BRANDS = ["porsche", "bmw", "mercedes", "audi", "ferrari", "lamborghini", "bentley", "rollsroyce"];

const CARS = [
  { f: "gt3rs.jpg", n: "Porsche 911 GT3 RS" },
  { f: "f430.jpg", n: "Ferrari F430" },
  { f: "urus.jpg", n: "Lamborghini Urus" },
  { f: "rs6.jpg", n: "Audi RS6" },
  { f: "gt3.jpg", n: "Porsche 911 GT3" },
  { f: "panamera.jpg", n: "Porsche Panamera" },
  { f: "m2cs.jpg", n: "BMW M2 CS" },
  { f: "911gts.jpg", n: "Porsche 911 GTS" },
  { f: "cabrio.jpg", n: "Porsche 911 Cabrio" },
];

type Dict = {
  back: string;
  badge: string;
  heroTitle: string;
  heroSub: string;
  role: string;
  introLabel: string;
  introTitle: string;
  introText: string;
  processLabel: string;
  steps: { t: string; d: string }[];
  brandsTitle: string;
  advLabel: string;
  advTitle: string;
  adv: { t: string; d: string; img: string }[];
  galLabel: string;
  stats: { n: string; u: string }[];
  ctaTitle: string;
  ctaSub: string;
  ctaBtn: string;
  liveNote: string;
};

const T: Record<Lang, Dict> = {
  es: {
    back: "Proyectos",
    badge: "Importación premium · Alemania → España",
    heroTitle: "Coches premium de Alemania, sin mover un dedo",
    heroSub: "Web completa para ARGA Premium Cars: importación bajo pedido, con verificación profesional y proceso 100% gestionado.",
    role: "Diseño · Desarrollo · SEO",
    introLabel: "El reto",
    introTitle: "Una compra de alto importe necesita confianza absoluta.",
    introText: "ARGA venía de un rebrand y necesitaba una web que transmitiera seriedad para una compra cara y, a la vez, posicionara en Google para quien busca importar. Diseñé una estética dark y premium con dorado, fiel a la marca, y un blog SEO con guías largas de importación.",
    processLabel: "El proceso",
    steps: [
      { t: "Búsqueda en Alemania", d: "Localizamos el coche exacto que buscas en el mercado alemán." },
      { t: "Verificación profesional", d: "Inspección y comprobación del historial antes de comprar." },
      { t: "Entrega en España", d: "Transporte, trámites, ITV y matriculación. Llave en mano." },
    ],
    brandsTitle: "Las marcas que importamos",
    advLabel: "Por qué ARGA",
    advTitle: "Confianza en cada paso",
    adv: [
      { t: "Verificación real", d: "Cada coche se revisa antes de comprar. Cero sorpresas.", img: "/projects/arga-premium-cars/v-revision.jpg" },
      { t: "100% personalizado", d: "Buscamos el coche que tú quieres, no lo que hay en stock.", img: "/projects/arga-premium-cars/v-personalizado.jpg" },
      { t: "Trámites incluidos", d: "Transporte, ITV y matriculación gestionados de principio a fin.", img: "/projects/arga-premium-cars/v-tramitacion.jpg" },
    ],
    galLabel: "El proyecto en imágenes",
    stats: [
      { n: "100%", u: "proceso gestionado" },
      { n: "0", u: "dependencias (carga instantánea)" },
      { n: "ES·EN", u: "y blog SEO" },
      { n: "Light/Dark", u: "modo persistente" },
    ],
    ctaTitle: "¿Quieres ver la web en vivo?",
    ctaSub: "Diseño y desarrollo completos, fieles a la marca.",
    ctaBtn: "Visitar argapremiumcars.es",
    liveNote: "Proyecto en producción",
  },
  en: {
    back: "Projects",
    badge: "Premium import · Germany → Spain",
    heroTitle: "Premium cars from Germany, hands-free",
    heroSub: "Full website for ARGA Premium Cars: on-demand import with professional verification and a fully managed process.",
    role: "Design · Development · SEO",
    introLabel: "The challenge",
    introTitle: "A high-ticket purchase needs absolute trust.",
    introText: "ARGA came from a rebrand and needed a site that conveyed seriousness for an expensive purchase while ranking on Google for people looking to import. I designed a dark, premium look with gold, true to the brand, plus an SEO blog with long import guides.",
    processLabel: "The process",
    steps: [
      { t: "Sourcing in Germany", d: "We find the exact car you want in the German market." },
      { t: "Professional verification", d: "Inspection and history check before buying." },
      { t: "Delivery in Spain", d: "Transport, paperwork and registration. Turnkey." },
    ],
    brandsTitle: "The brands we import",
    advLabel: "Why ARGA",
    advTitle: "Trust at every step",
    adv: [
      { t: "Real verification", d: "Every car is checked before purchase. Zero surprises.", img: "/projects/arga-premium-cars/v-revision.jpg" },
      { t: "100% bespoke", d: "We find the car you want, not what's in stock.", img: "/projects/arga-premium-cars/v-personalizado.jpg" },
      { t: "Paperwork included", d: "Transport, inspection and registration handled end to end.", img: "/projects/arga-premium-cars/v-tramitacion.jpg" },
    ],
    galLabel: "The project in pictures",
    stats: [
      { n: "100%", u: "managed process" },
      { n: "0", u: "dependencies (instant load)" },
      { n: "ES·EN", u: "and SEO blog" },
      { n: "Light/Dark", u: "persistent mode" },
    ],
    ctaTitle: "Want to see it live?",
    ctaSub: "Full design and development, true to the brand.",
    ctaBtn: "Visit argapremiumcars.es",
    liveNote: "Live project",
  },
  de: {
    back: "Projekte",
    badge: "Premium-Import · Deutschland → Spanien",
    heroTitle: "Premium-Autos aus Deutschland, ohne Aufwand",
    heroSub: "Komplette Website für ARGA Premium Cars: Import auf Bestellung mit professioneller Prüfung und voll gemanagtem Prozess.",
    role: "Design · Entwicklung · SEO",
    introLabel: "Die Herausforderung",
    introTitle: "Ein hochpreisiger Kauf braucht absolutes Vertrauen.",
    introText: "ARGA kam aus einem Rebrand und brauchte eine Website, die Seriosität für einen teuren Kauf vermittelt und zugleich bei Google rankt. Ich gestaltete einen dunklen, edlen Look mit Gold, markentreu, plus einen SEO-Blog mit langen Import-Guides.",
    processLabel: "Der Prozess",
    steps: [
      { t: "Beschaffung in Deutschland", d: "Wir finden genau das Auto, das du suchst, am deutschen Markt." },
      { t: "Professionelle Prüfung", d: "Inspektion und Historien-Check vor dem Kauf." },
      { t: "Lieferung in Spanien", d: "Transport, Papiere und Zulassung. Schlüsselfertig." },
    ],
    brandsTitle: "Die Marken, die wir importieren",
    advLabel: "Warum ARGA",
    advTitle: "Vertrauen bei jedem Schritt",
    adv: [
      { t: "Echte Prüfung", d: "Jedes Auto wird vor dem Kauf geprüft. Null Überraschungen.", img: "/projects/arga-premium-cars/v-revision.jpg" },
      { t: "100% individuell", d: "Wir finden das Auto, das du willst — kein Lagerbestand.", img: "/projects/arga-premium-cars/v-personalizado.jpg" },
      { t: "Papiere inklusive", d: "Transport, TÜV und Zulassung von A bis Z erledigt.", img: "/projects/arga-premium-cars/v-tramitacion.jpg" },
    ],
    galLabel: "Das Projekt in Bildern",
    stats: [
      { n: "100%", u: "gemanagter Prozess" },
      { n: "0", u: "Abhängigkeiten (sofort)" },
      { n: "ES·EN", u: "und SEO-Blog" },
      { n: "Light/Dark", u: "persistenter Modus" },
    ],
    ctaTitle: "Live ansehen?",
    ctaSub: "Komplettes Design und Entwicklung, markentreu.",
    ctaBtn: "argapremiumcars.es besuchen",
    liveNote: "Live-Projekt",
  },
};

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE },
};

export default function ArgaDetailClient() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div style={{ background: BLACK, color: "#fff", fontFamily: SANS }}>
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md" style={{ background: "rgba(10,10,10,0.7)" }}>
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link href="/proyectos" className="text-sm flex items-center gap-2 text-white/70 hover:text-white transition">
            <span style={{ color: GOLD }}>←</span> {t.back}
          </Link>
          <span className="text-sm font-semibold tracking-wide">ARGA<span style={{ color: GOLD }}> Premium Cars</span></span>
          <LangSwitcher tone="light" />
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-dvh flex items-end overflow-hidden">
        <Image
          src="/projects/arga-premium-cars/cars/gt3rs.jpg"
          alt="Porsche 911 GT3 RS importado por ARGA Premium Cars"
          fill
          priority
          quality={86}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.97) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-32 w-full">
          <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: GOLD, fontFamily: MONO }}>{t.badge}</span>
          <h1 className="mt-5 max-w-3xl text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">{t.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">{t.heroSub}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em]" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)" }}>
            <span>{t.role}</span><span style={{ color: GOLD }}>·</span><span>2026</span><span style={{ color: GOLD }}>·</span><span>Asturias</span>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-5 py-24 md:py-32">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: GOLD, fontFamily: MONO }}>{t.introLabel}</motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">{t.introTitle}</motion.h2>
        <motion.p {...fade} className="mt-7 text-lg leading-relaxed text-white/70 max-w-2xl">{t.introText}</motion.p>
      </section>

      {/* BANDA CINEMÁTICA */}
      <section className="relative w-full aspect-[21/9] overflow-hidden">
        <Image src="/projects/arga-premium-cars/garaje.jpg" alt="" fill quality={82} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, transparent 35%, rgba(10,10,10,0.7) 100%)" }} />
      </section>

      {/* PROCESS */}
      <section className="py-20" style={{ background: ONYX }}>
        <div className="mx-auto max-w-6xl px-5">
          <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-10" style={{ color: GOLD, fontFamily: MONO }}>{t.processLabel}</motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {t.steps.map((s, i) => (
              <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="border-t pt-5" style={{ borderColor: "rgba(197,165,114,0.3)" }}>
                <div className="text-4xl font-bold" style={{ color: GOLD, fontFamily: MONO }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-white/60 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <motion.p {...fade} className="text-center text-[11px] uppercase tracking-[0.3em] mb-10 text-white/40" style={{ fontFamily: MONO }}>{t.brandsTitle}</motion.p>
        <motion.div {...fade} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {BRANDS.map((b) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={b} src={`/projects/arga-premium-cars/brands/${b}.svg`} alt={b} width={40} height={40} className="h-9 w-9 md:h-11 md:w-11 object-contain" style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }} />
          ))}
        </motion.div>
      </section>

      {/* CATÁLOGO DE COCHES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: GOLD, fontFamily: MONO }}>{t.galLabel}</motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          {lang === "es" ? "Algunos coches importados" : lang === "en" ? "Some imported cars" : "Einige importierte Autos"}
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CARS.map((c, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: (i % 3) * 0.07 }}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              style={{ background: ONYX }}
            >
              <Image src={`/projects/arga-premium-cars/cars/${c.f}`} alt={c.n} fill quality={80} sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%)" }} />
              <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold">{c.n}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: GOLD, fontFamily: MONO }}>{t.advLabel}</motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-bold tracking-tight mb-12">{t.advTitle}</motion.h2>
        <div className="grid md:grid-cols-3 gap-5">
          {t.adv.map((a, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }} className="rounded-xl overflow-hidden" style={{ background: ONYX }}>
              <div className="relative aspect-[16/10]">
                <Image src={a.img} alt="" fill quality={80} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{a.t}</h3>
                <p className="mt-2 text-white/60 leading-relaxed">{a.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-16" style={{ background: ONYX }}>
        <div className="mx-auto max-w-6xl px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((s, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
              <div className="text-3xl md:text-4xl font-bold" style={{ color: GOLD }}>{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/45" style={{ fontFamily: MONO }}>{s.u}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center">
        <motion.p {...fade} className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: GOLD, fontFamily: MONO }}>{t.liveNote}</motion.p>
        <motion.h2 {...fade} className="text-3xl md:text-5xl font-bold tracking-tight">{t.ctaTitle}</motion.h2>
        <motion.p {...fade} className="mt-4 text-white/60">{t.ctaSub}</motion.p>
        <motion.a {...fade} href="https://argapremiumcars.es" target="_blank" rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full px-8 py-4 font-semibold text-[#0a0a0a] transition hover:brightness-105"
          style={{ background: GOLD }}>
          {t.ctaBtn} →
        </motion.a>
      </section>

      <SiteFooter />
    </div>
  );
}
