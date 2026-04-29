"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const BLACK = "#0a0a0a";
const GRAPHITE = "#161616";
const GREEN = "#00a651";
const CREAM = "#f5f2ec";
const WHITE = "#ffffff";
const MUTED_DARK = "rgba(255,255,255,0.65)";
const MUTED_LIGHT = "rgba(10,10,10,0.6)";
const LINE_DARK = "rgba(255,255,255,0.12)";
const LINE_LIGHT = "rgba(10,10,10,0.1)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "'Manrope', system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

const T: Record<Lang, {
  badgeCase: string;
  collab: string;
  hero1: string;
  hero2: string;
  heroIntroPre: string;
  heroIntroBold: string;
  heroIntroPost: string;
  stats: { n: string; label: string; highlight?: boolean }[];
  proj: string;
  projTitleA: string;
  projTitleHl1: string;
  projTitleB: string;
  projTitleHl2: string;
  projP1: string;
  projP2: string;
  brandsLabel: string;
  brandsTitleA: string;
  brandsTitleHl: string;
  brands: { name: string; blurb: string; photo: string; orient: string; managed: string }[];
  builtLabel: string;
  builtTitleA: string;
  builtTitleHl: string;
  builtP: string;
  builtList: string[];
  showcaseLabel: string;
  showcaseRight: string;
  closingTitleA: string;
  closingTitleHl: string;
  closingP: string;
  ctaSee: string;
  ctaAll: string;
  footerNote: string;
}> = {
  es: {
    badgeCase: "Caso de éxito · WordPress",
    collab: "Colaboración 2021 — 2024",
    hero1: "Grupo",
    hero2: "Axial.",
    heroIntroPre: "Ecosistema de movilidad de Las Palmas — bici, moto, alquiler y taller. Estuve ",
    heroIntroBold: "3 años",
    heroIntroPost:
      " al cargo de todo lo digital: construí dos webs en WordPress y llevé las redes de 4 de sus marcas con producción propia de contenido. Ya no lo gestiono, pero el trabajo sigue vivo.",
    stats: [
      { n: "3", label: "Años de colaboración", highlight: true },
      { n: "02", label: "Webs en WordPress" },
      { n: "04", label: "Cuentas IG gestionadas" },
      { n: "100%", label: "Contenido producido in-house" },
    ],
    proj: "El proyecto",
    projTitleA: "Caso de éxito en ",
    projTitleHl1: "WordPress",
    projTitleB: " + 3 años llevando ",
    projTitleHl2: "las redes del grupo.",
    projP1:
      "Cuando entré, Grupo Axial tenía presencia física reconocida pero cero coherencia digital. Webs anticuadas, Instagram abandonado, cada marca con su voz. Un grupo fuerte en la calle — invisible en internet.",
    projP2:
      "Construí grupoaxial.es y axialrent.com sobre WordPress + Elementor — editables por el cliente, sin depender de mí. Y durante 3 años llevé Instagram de Grupo Axial, Moto Axial, Axial Bike y Axial Rent con producción propia de fotografía, reels y campañas.",
    brandsLabel: "Las marcas que llevé",
    brandsTitleA: "Cuatro marcas. ",
    brandsTitleHl: "Una sola voz.",
    brands: [
      {
        name: "Grupo Axial",
        blurb: "La marca paraguas. Web matriz sobre WordPress.",
        photo: "/projects/grupo-axial/store.jpg",
        orient: "wide",
        managed: "Web + RRSS",
      },
      {
        name: "Axial Bike",
        blurb: "Bicicletas, componentes y marcas exclusivas como Berria.",
        photo: "/projects/grupo-axial/bike-store.jpg",
        orient: "tall",
        managed: "RRSS + contenido",
      },
      {
        name: "Moto Axial Center",
        blurb: "Scooters, motos urbanas y trato personalizado.",
        photo: "/projects/grupo-axial/moto-1.jpg",
        orient: "tall",
        managed: "RRSS + contenido",
      },
      {
        name: "Axial Rent",
        blurb: "Alquiler de motos y scooters. Web propia sobre WordPress.",
        photo: "/projects/grupo-axial/moto-2.jpg",
        orient: "tall",
        managed: "Web + RRSS",
      },
    ],
    builtLabel: "Lo que construí",
    builtTitleA: "Web, foto, reels, ",
    builtTitleHl: "tres años seguidos.",
    builtP:
      "WordPress para que el cliente no dependa de nadie. Instagram trabajado con calendario y producción propia. Un grupo con voz.",
    builtList: [
      "grupoaxial.es sobre WordPress + Elementor — web matriz editable",
      "axialrent.com con catálogo de alquiler actualizable",
      "SEO local: Las Palmas de Gran Canaria y Canarias",
      "Calendario editorial semanal para 4 cuentas IG",
      "Sesiones de fotografía propia en cada tienda",
      "Reels y vídeos con voz de marca coherente",
      "Campañas de ofertas y novedades (rebajas, temporadas)",
      "Gestión de DMs y atención pre-venta en 4 marcas",
    ],
    showcaseLabel: "Producción propia · Moto Axial",
    showcaseRight: "Instagram @motoaxial",
    closingTitleA: "Somos movimiento, ",
    closingTitleHl: "somos Axial.",
    closingP:
      "Tres años construyendo la voz digital del grupo de movilidad más fuerte de Las Palmas. Dos webs WordPress editables, cuatro cuentas IG gestionadas, producción propia. Ya no lo llevo, pero el trabajo sigue vivo en grupoaxial.es y axialrent.com.",
    ctaSee: "Ver grupoaxial.es",
    ctaAll: "← Todos los proyectos",
    footerNote: "Grupo Axial · 2021—2024",
  },
  en: {
    badgeCase: "Success case · WordPress",
    collab: "Engagement 2021 — 2024",
    hero1: "Grupo",
    hero2: "Axial.",
    heroIntroPre:
      "Las Palmas' mobility ecosystem — bikes, motorbikes, rentals and workshops. For ",
    heroIntroBold: "3 years",
    heroIntroPost:
      " I owned everything digital: I built two WordPress sites and ran social media for 4 of their brands with in-house content. I no longer manage it, but the work is still live.",
    stats: [
      { n: "3", label: "Years of engagement", highlight: true },
      { n: "02", label: "WordPress sites" },
      { n: "04", label: "IG accounts managed" },
      { n: "100%", label: "In-house content" },
    ],
    proj: "The project",
    projTitleA: "Success case on ",
    projTitleHl1: "WordPress",
    projTitleB: " + 3 years running ",
    projTitleHl2: "the group's social media.",
    projP1:
      "When I joined, Grupo Axial had recognized physical presence but zero digital coherence. Outdated sites, abandoned Instagram, each brand with its own voice. A strong group on the street — invisible online.",
    projP2:
      "I built grupoaxial.es and axialrent.com on WordPress + Elementor — editable by the client, no dependency on me. And for 3 years I ran Instagram for Grupo Axial, Moto Axial, Axial Bike and Axial Rent with in-house photography, reels and campaigns.",
    brandsLabel: "The brands I ran",
    brandsTitleA: "Four brands. ",
    brandsTitleHl: "One voice.",
    brands: [
      {
        name: "Grupo Axial",
        blurb: "The umbrella brand. Parent site on WordPress.",
        photo: "/projects/grupo-axial/store.jpg",
        orient: "wide",
        managed: "Web + Social",
      },
      {
        name: "Axial Bike",
        blurb: "Bikes, components and exclusive brands like Berria.",
        photo: "/projects/grupo-axial/bike-store.jpg",
        orient: "tall",
        managed: "Social + content",
      },
      {
        name: "Moto Axial Center",
        blurb: "Scooters, urban motorbikes and personalized service.",
        photo: "/projects/grupo-axial/moto-1.jpg",
        orient: "tall",
        managed: "Social + content",
      },
      {
        name: "Axial Rent",
        blurb: "Motorbike and scooter rentals. Own site on WordPress.",
        photo: "/projects/grupo-axial/moto-2.jpg",
        orient: "tall",
        managed: "Web + Social",
      },
    ],
    builtLabel: "What I built",
    builtTitleA: "Web, photo, reels, ",
    builtTitleHl: "three years in a row.",
    builtP:
      "WordPress so the client depends on no one. Instagram worked with a calendar and in-house production. A group with a voice.",
    builtList: [
      "grupoaxial.es on WordPress + Elementor — editable parent site",
      "axialrent.com with updatable rental catalog",
      "Local SEO: Las Palmas de Gran Canaria and the Canary Islands",
      "Weekly editorial calendar for 4 IG accounts",
      "In-store photo sessions for each brand",
      "Reels and videos with a coherent brand voice",
      "Offer and launch campaigns (sales, seasons)",
      "DM management and pre-sales for 4 brands",
    ],
    showcaseLabel: "In-house production · Moto Axial",
    showcaseRight: "Instagram @motoaxial",
    closingTitleA: "We are movement, ",
    closingTitleHl: "we are Axial.",
    closingP:
      "Three years building the digital voice of Las Palmas' biggest mobility group. Two editable WordPress sites, four IG accounts managed, in-house production. I no longer run it, but the work is still live at grupoaxial.es and axialrent.com.",
    ctaSee: "View grupoaxial.es",
    ctaAll: "← All projects",
    footerNote: "Grupo Axial · 2021—2024",
  },
  de: {
    badgeCase: "Erfolgsfall · WordPress",
    collab: "Zusammenarbeit 2021 — 2024",
    hero1: "Grupo",
    hero2: "Axial.",
    heroIntroPre:
      "Mobilitäts-Ökosystem von Las Palmas — Fahrrad, Motorrad, Vermietung und Werkstatt. ",
    heroIntroBold: "3 Jahre",
    heroIntroPost:
      " lang verantwortete ich alles Digitale: zwei WordPress-Sites gebaut und Social Media für 4 ihrer Marken mit eigener Content-Produktion betreut. Ich manage es nicht mehr, aber die Arbeit lebt weiter.",
    stats: [
      { n: "3", label: "Jahre Zusammenarbeit", highlight: true },
      { n: "02", label: "WordPress-Sites" },
      { n: "04", label: "Verwaltete IG-Konten" },
      { n: "100%", label: "In-House-Content" },
    ],
    proj: "Das Projekt",
    projTitleA: "Erfolgsfall auf ",
    projTitleHl1: "WordPress",
    projTitleB: " + 3 Jahre Management ",
    projTitleHl2: "der Social Media der Gruppe.",
    projP1:
      "Als ich anfing, hatte Grupo Axial bekannte Filialen, aber null digitale Kohärenz. Veraltete Sites, vernachlässigtes Instagram, jede Marke mit eigener Stimme. Eine starke Gruppe auf der Straße — unsichtbar online.",
    projP2:
      "Ich baute grupoaxial.es und axialrent.com auf WordPress + Elementor — vom Kunden editierbar, ohne Abhängigkeit von mir. Und 3 Jahre lang managte ich Instagram für Grupo Axial, Moto Axial, Axial Bike und Axial Rent mit eigener Fotografie, Reels und Kampagnen.",
    brandsLabel: "Die Marken, die ich betreute",
    brandsTitleA: "Vier Marken. ",
    brandsTitleHl: "Eine Stimme.",
    brands: [
      {
        name: "Grupo Axial",
        blurb: "Die Dachmarke. Hauptsite auf WordPress.",
        photo: "/projects/grupo-axial/store.jpg",
        orient: "wide",
        managed: "Web + Social",
      },
      {
        name: "Axial Bike",
        blurb: "Fahrräder, Komponenten und exklusive Marken wie Berria.",
        photo: "/projects/grupo-axial/bike-store.jpg",
        orient: "tall",
        managed: "Social + Content",
      },
      {
        name: "Moto Axial Center",
        blurb: "Roller, urbane Motorräder und persönliche Betreuung.",
        photo: "/projects/grupo-axial/moto-1.jpg",
        orient: "tall",
        managed: "Social + Content",
      },
      {
        name: "Axial Rent",
        blurb: "Motorrad- und Rollervermietung. Eigene Site auf WordPress.",
        photo: "/projects/grupo-axial/moto-2.jpg",
        orient: "tall",
        managed: "Web + Social",
      },
    ],
    builtLabel: "Was ich gebaut habe",
    builtTitleA: "Web, Foto, Reels, ",
    builtTitleHl: "drei Jahre durchgehend.",
    builtP:
      "WordPress, damit der Kunde von niemandem abhängig ist. Instagram mit Kalender und Eigenproduktion. Eine Gruppe mit Stimme.",
    builtList: [
      "grupoaxial.es auf WordPress + Elementor — editierbare Hauptsite",
      "axialrent.com mit aktualisierbarem Vermietungs-Katalog",
      "Lokales SEO: Las Palmas de Gran Canaria und die Kanaren",
      "Wöchentlicher Redaktionskalender für 4 IG-Konten",
      "Eigene Foto-Sessions in jedem Laden",
      "Reels und Videos mit kohärenter Markenstimme",
      "Aktions- und Launch-Kampagnen (Sales, Saisons)",
      "DM-Management und Pre-Sales in 4 Marken",
    ],
    showcaseLabel: "Eigene Produktion · Moto Axial",
    showcaseRight: "Instagram @motoaxial",
    closingTitleA: "Wir sind Bewegung, ",
    closingTitleHl: "wir sind Axial.",
    closingP:
      "Drei Jahre Aufbau der digitalen Stimme der stärksten Mobilitätsgruppe von Las Palmas. Zwei editierbare WordPress-Sites, vier verwaltete IG-Konten, Eigenproduktion. Ich betreue es nicht mehr, aber die Arbeit lebt auf grupoaxial.es und axialrent.com weiter.",
    ctaSee: "grupoaxial.es ansehen",
    ctaAll: "← Alle Projekte",
    footerNote: "Grupo Axial · 2021—2024",
  },
};

export default function GrupoAxialDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div
      style={{
        background: BLACK,
        color: WHITE,
        fontFamily: DISPLAY,
      }}
    >
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/grupo-axial/store.jpg"
            alt="Grupo Axial billboard with view of Gran Canaria's peaks"
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
                "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.15) 35%, rgba(10,10,10,0.55) 75%, rgba(10,10,10,0.95) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 w-full px-6 md:px-12 pt-32 pb-16 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5"
              style={{
                background: GREEN,
                color: BLACK,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              {t.badgeCase}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              {t.collab}
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="text-[clamp(3rem,13vw,12rem)] leading-[0.85]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  color: WHITE,
                  letterSpacing: "-0.04em",
                }}
              >
                {t.hero1}
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.55, ease: EASE }}
                className="text-[clamp(3rem,13vw,12rem)] leading-[0.85]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  color: GREEN,
                  letterSpacing: "-0.04em",
                }}
              >
                {t.hero2}
              </motion.h1>
            </div>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: DISPLAY }}
            >
              {t.heroIntroPre}
              <strong style={{ color: GREEN }}>{t.heroIntroBold}</strong>
              {t.heroIntroPost}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://grupoaxial.es"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                style={{
                  background: GREEN,
                  color: BLACK,
                  fontFamily: MONO,
                  fontWeight: 700,
                }}
              >
                grupoaxial.es
                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
              <a
                href="https://www.axialrent.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 border flex items-center gap-2"
                style={{
                  borderColor: LINE_DARK,
                  color: MUTED_DARK,
                  fontFamily: MONO,
                }}
              >
                axialrent.com
                <span>↗</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-12 md:py-16 border-y"
        style={{ borderColor: LINE_DARK, background: GRAPHITE }}
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
                  color: s.highlight ? GREEN : WHITE,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.n}
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
        style={{ background: CREAM, color: BLACK }}
      >
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            {t.proj}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: BLACK,
              letterSpacing: "-0.03em",
            }}
          >
            {t.projTitleA}
            <span style={{ color: GREEN }}>{t.projTitleHl1}</span>
            {t.projTitleB}
            <span style={{ color: GREEN }}>{t.projTitleHl2}</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: BLACK, fontFamily: DISPLAY }}
            >
              {t.projP1}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              {t.projP2}
            </p>
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: BLACK, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: GREEN, fontFamily: MONO }}
          >
            {t.brandsLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] md:leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: WHITE,
              letterSpacing: "-0.03em",
            }}
          >
            {t.brandsTitleA}
            <span style={{ color: GREEN }}>{t.brandsTitleHl}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {t.brands.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0.01, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                delay: (i % 4) * 0.1,
                duration: 0.9,
                ease: EASE,
              }}
              className={
                b.orient === "wide"
                  ? "md:col-span-12 relative aspect-[21/9] overflow-hidden"
                  : "md:col-span-4 relative aspect-[3/4] overflow-hidden"
              }
              style={{ background: GRAPHITE }}
            >
              <Image
                src={b.photo}
                alt={`${b.name} — store photo`}
                fill
                sizes={
                  b.orient === "wide"
                    ? "100vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                quality={85}
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-[1.4s] hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.9) 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3
                    className="text-2xl md:text-4xl leading-tight"
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 800,
                      color: WHITE,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {b.name}
                  </h3>
                  <span
                    className="text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 shrink-0"
                    style={{
                      background: GREEN,
                      color: BLACK,
                      fontFamily: MONO,
                      fontWeight: 700,
                    }}
                  >
                    {b.managed}
                  </span>
                </div>
                <p
                  className="mt-2 text-sm md:text-base max-w-md"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: DISPLAY,
                  }}
                >
                  {b.blurb}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: CREAM, color: BLACK }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: MUTED_LIGHT, fontFamily: MONO }}
            >
              {t.builtLabel}
            </p>
            <h3
              className="text-2xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              {t.builtTitleA}
              <span style={{ color: GREEN }}>{t.builtTitleHl}</span>
            </h3>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              {t.builtP}
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.06 } },
                hidden: {},
              } as Variants
            }
            className="space-y-0"
          >
            {t.builtList.map((line) => (
              <motion.li
                key={line}
                variants={
                  {
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  } as Variants
                }
                className="flex items-start gap-5 py-4 border-b"
                style={{ borderColor: LINE_LIGHT }}
              >
                <span
                  className="text-xl mt-0.5 shrink-0"
                  style={{ color: GREEN }}
                >
                  ◆
                </span>
                <span
                  className="text-base md:text-lg leading-snug"
                  style={{ color: BLACK, fontFamily: DISPLAY }}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="relative">
        <motion.div
          initial={{ opacity: 0.01 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
          style={{ background: BLACK }}
        >
          <Image
            src="/projects/grupo-axial/moto-3.jpg"
            alt="Piaggio motorbike at the Moto Axial Center store — product session"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.85) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-5 md:py-10 flex items-end justify-between flex-wrap gap-3">
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: GREEN, fontFamily: MONO }}
            >
              {t.showcaseLabel}
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.3em] hidden md:block"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: MONO }}
            >
              {t.showcaseRight}
            </p>
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-24 md:py-44 relative overflow-hidden"
        style={{ background: BLACK, color: WHITE }}
      >
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: GREEN, filter: "blur(90px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
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
            <span style={{ color: GREEN }}>{t.closingTitleHl}</span>
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
              href="https://grupoaxial.es"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{
                background: GREEN,
                color: BLACK,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              {t.ctaSee}
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
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
        style={{ borderColor: LINE_DARK, background: GRAPHITE }}
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
