"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Palette (real from entreolasurf.com CSS vars) ─── */
const BG = "#fffdf7";
const SAND = "#f3ecdd";
const YELLOW = "#f3c900";
const NAVY = "#0f2f39";
const NAVY_SOFT = "#214a57";
const TEXT = "#2d3d45";
const MUTED = "#64757d";
const LINE = "#d7d0c2";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-bebas), 'Impact', sans-serif";
const SANS = "var(--font-manrope), system-ui, sans-serif";
const MONO = "var(--font-space), monospace";

/* ─── Sun SVG (rotating) ─── */
function Sun({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <circle cx="100" cy="100" r="36" fill={YELLOW} />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 56;
        const y1 = 100 + Math.sin(angle) * 56;
        const x2 = 100 + Math.cos(angle) * 82;
        const y2 = 100 + Math.sin(angle) * 82;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={YELLOW}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </motion.svg>
  );
}

/* ─── Scroll-drawn wave ─── */
function ScrollWave({ color = NAVY }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 1200 160"
        className="w-full h-auto"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <motion.path
          d="M0 80 C 100 30, 200 130, 300 80 C 400 30, 500 130, 600 80 C 700 30, 800 130, 900 80 C 1000 30, 1100 130, 1200 80"
          style={{ pathLength }}
        />
        <motion.path
          d="M0 110 C 100 60, 200 160, 300 110 C 400 60, 500 160, 600 110 C 700 60, 800 160, 900 110 C 1000 60, 1100 160, 1200 110"
          style={{ pathLength, opacity: 0.4 }}
        />
      </svg>
    </div>
  );
}

/* ─── Marquee strip ─── */
function Marquee({
  items,
  color = NAVY,
  bg = "transparent",
}: {
  items: string[];
  color?: string;
  bg?: string;
}) {
  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ background: bg, borderColor: color + "20" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-3xl md:text-5xl"
            style={{
              fontFamily: DISPLAY,
              color,
              letterSpacing: "0.02em",
            }}
          >
            {item} <span style={{ color: YELLOW }}>✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Service icon SVGs (from entreolasurf.com) ─── */
const serviceIcons = {
  group: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  individual: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  yoga: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  paddle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  skate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  rental: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
};

/* ─── Service card ─── */
function ServiceCard({
  icon,
  title,
  blurb,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  blurb: string;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover
      className="relative p-8 md:p-10 border transition-colors duration-300"
      style={{
        borderColor: LINE,
        background: hover ? NAVY : "transparent",
        color: hover ? BG : TEXT,
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center transition-colors"
        style={{ color: hover ? YELLOW : NAVY }}
      >
        {icon}
      </div>
      <h3
        className="mt-6 text-3xl md:text-4xl leading-[0.95]"
        style={{ fontFamily: DISPLAY, letterSpacing: "0.01em" }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{
          fontFamily: SANS,
          color: hover ? "rgba(255,253,247,0.7)" : MUTED,
        }}
      >
        {blurb}
      </p>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function EntreOlasDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);
  const titleX = useTransform(heroProgress, [0, 1], ["0%", "-10%"]);

  const camps = [
    { dates: "20–23 Marzo", tag: "XXL", nights: "4 días / 3 noches" },
    { dates: "10–13 Abril", tag: "XXL", nights: "4 días / 3 noches" },
    { dates: "16–19 Abril", tag: "Sambatrips", nights: "4 días / 3 noches" },
    { dates: "9–13 Septiembre", tag: "Sambatrips", nights: "5 días / 4 noches" },
  ];

  const bonos = [
    { count: "2", discount: "7" },
    { count: "3", discount: "14" },
    { count: "5", discount: "23" },
    { count: "7", discount: "30" },
  ];

  return (
    <div
      style={{
        background: BG,
        color: TEXT,
        fontFamily: SANS,
      }}
    >
      {/* ─── Top bar ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md border-b"
        style={{ background: BG + "cc", borderColor: LINE }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs uppercase tracking-[0.2em] hover:opacity-100 transition-opacity"
          style={{ color: MUTED, fontFamily: SANS }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: YELLOW }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            En vivo · entreolasurf.com
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden px-6 md:px-12 pt-32 md:pt-40 pb-16"
      >
        {/* Real aerial photo background */}
        <motion.div
          aria-hidden
          style={{ y: heroY, opacity: heroFade }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/entre-olas-surf/aerial-beach.jpg"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.95)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${BG}ee 0%, ${BG}99 35%, ${BG}99 70%, ${BG}f5 100%), radial-gradient(ellipse at 80% 20%, ${SAND}cc 0%, transparent 55%)`,
            }}
          />
        </motion.div>

        {/* Sun */}
        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="absolute top-20 right-6 md:right-20 w-40 md:w-60"
        >
          <Sun />
        </motion.div>

        {/* Big 03 */}
        <motion.span
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute right-8 bottom-32 select-none pointer-events-none leading-none"
        >
          <span
            className="text-[18vw] md:text-[14vw] block"
            style={{
              fontFamily: DISPLAY,
              color: NAVY,
              opacity: 0.05,
            }}
          >
            03
          </span>
        </motion.span>

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5"
              style={{
                background: NAVY,
                color: YELLOW,
                fontFamily: MONO,
              }}
            >
              Playa de Roche · Cádiz
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              2025
            </span>
          </motion.div>

          <motion.h1
            style={{ x: titleX }}
            className="relative"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.35, ease: EASE }}
                className="block text-[clamp(5rem,18vw,16rem)] leading-[0.82]"
                style={{
                  fontFamily: DISPLAY,
                  color: NAVY,
                  letterSpacing: "0.005em",
                }}
              >
                ENTRE
              </motion.span>
            </span>
            <span className="block overflow-hidden -mt-2 md:-mt-4">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.55, ease: EASE }}
                className="block text-[clamp(5rem,18vw,16rem)] leading-[0.82] italic"
                style={{
                  fontFamily: DISPLAY,
                  color: YELLOW,
                  WebkitTextStroke: `2px ${NAVY}`,
                  letterSpacing: "0.005em",
                }}
              >
                OLAS.
              </motion.span>
            </span>
          </motion.h1>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: TEXT, fontFamily: SANS }}
            >
              Escuela de surf con alma. Diseñé y construí la web entera — clases
              con sistema de bonos, e-commerce, reservas online y 4 ediciones de
              surf camp en villa privada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://entreolasurf.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 transition-colors"
                style={{
                  background: NAVY,
                  color: YELLOW,
                  fontFamily: MONO,
                }}
              >
                entreolasurf.com
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </motion.div>
          </div>

          {/* wave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16"
          >
            <ScrollWave />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Marquee ─── */}
      <Marquee
        items={[
          "ROCHE",
          "CÁDIZ",
          "SURF CAMP",
          "VILLA PRIVADA",
          "+18",
          "BONOS -30%",
          "ROCHE",
          "CONIL",
        ]}
        color={NAVY}
        bg={SAND}
      />

      {/* ─── Editorial photo grid — la escena ─── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-12 max-w-4xl"
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              La escena
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[0.92]"
              style={{
                fontFamily: DISPLAY,
                color: NAVY,
                letterSpacing: "0.005em",
              }}
            >
              Playa de Roche.{" "}
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                Gente real.
              </span>
            </h2>
          </div>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em] shrink-0"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            Fotos del cliente
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Tall team portrait */}
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-5 md:row-span-2 relative aspect-[3/4] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/team-beach.jpg"
              alt="Equipo de Entre Olas sentados junto a la caseta de la playa de Roche"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={85}
              loading="eager"
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "white",
                fontFamily: MONO,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              Equipo · Roche
            </span>
          </motion.div>

          {/* Wide aerial */}
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/aerial-house.jpg"
              alt="Vista aérea de la villa privada del surf camp en Roche"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              quality={85}
              loading="eager"
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "white",
                fontFamily: MONO,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              Villa · drone
            </span>
          </motion.div>

          {/* Rooftop pool */}
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/rooftop.jpg"
              alt="Terraza con piscina de la villa privada al atardecer"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              quality={85}
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "white",
                fontFamily: MONO,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              Terraza · golden hour
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Lo que hice ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
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
              El proyecto
            </p>
            <h2
              className="text-5xl md:text-7xl leading-[0.92]"
              style={{
                fontFamily: DISPLAY,
                color: NAVY,
                letterSpacing: "0.005em",
              }}
            >
              Una web que
              <br />
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                vende surf.
              </span>
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: SANS }}
            >
              Había escuela, había olas, había reputación. Faltaba la web que
              cerrase el círculo. La construí.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              } as Variants
            }
            className="space-y-0"
          >
            {[
              "Diseño y desarrollo full-stack de todo el site",
              "Sistema de bonos con descuento progresivo (-7% a -30%)",
              "Reservas online con disponibilidad real por fechas",
              "E-commerce para merchandising con checkout completo",
              "4 ediciones de surf camp gestionables con plazas y reservas",
              "Hero con vídeo integrado y estética de Playa de Roche",
              "SEO técnico: OG, Schema, sitemap, canonical",
              "Integración con WhatsApp, Instagram y TikTok",
            ].map((line, i) => (
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
                className="flex items-start gap-5 py-5 border-b group"
                style={{ borderColor: LINE }}
              >
                <span
                  className="text-xl mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: YELLOW }}
                >
                  ✺
                </span>
                <span
                  className="text-base md:text-lg leading-snug"
                  style={{ color: TEXT, fontFamily: SANS }}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ─── Bonos interactive ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            El sistema de bonos
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[0.92]"
            style={{
              fontFamily: DISPLAY,
              color: NAVY,
              letterSpacing: "0.005em",
            }}
          >
            Cuantas más clases,
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              más ahorras.
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Packs de 2 a 7 sesiones con descuento progresivo. Motor propio con
            válidez de 180 días por bono comprado.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {bonos.map((b, i) => {
            const highlight = i === bonos.length - 1;
            return (
              <motion.div
                key={b.count}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: EASE,
                  type: "spring",
                  stiffness: 180,
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative p-6 md:p-8 flex flex-col justify-between aspect-[3/4]"
                style={{
                  background: highlight ? NAVY : BG,
                  color: highlight ? BG : NAVY,
                  border: `2px solid ${highlight ? NAVY : LINE}`,
                }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{
                      fontFamily: MONO,
                      color: highlight ? YELLOW : MUTED,
                    }}
                  >
                    Bono
                  </p>
                  <p
                    className="text-7xl md:text-8xl leading-none mt-3"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {b.count}
                  </p>
                  <p
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ fontFamily: SANS }}
                  >
                    clases
                  </p>
                </div>
                <div className="mt-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{
                      fontFamily: MONO,
                      color: highlight ? YELLOW : MUTED,
                    }}
                  >
                    Descuento
                  </p>
                  <p
                    className="text-5xl md:text-6xl leading-none mt-2"
                    style={{
                      fontFamily: DISPLAY,
                      color: highlight ? YELLOW : NAVY,
                    }}
                  >
                    −{b.discount}%
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl leading-[0.92] max-w-2xl"
            style={{
              fontFamily: DISPLAY,
              color: NAVY,
              letterSpacing: "0.005em",
            }}
          >
            La experiencia
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              completa.
            </span>
          </motion.h2>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em]"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            (06)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard
            index={0}
            icon={serviceIcons.group}
            title="Clases Grupales"
            blurb="90 minutos. Máx. 6 personas. Material y seguro incluidos. Niveles desde cero."
          />
          <ServiceCard
            index={1}
            icon={serviceIcons.individual}
            title="Clases Individuales"
            blurb="90 minutos. Atención 100% personalizada. Progresa el doble de rápido."
          />
          <ServiceCard
            index={2}
            icon={serviceIcons.yoga}
            title="Clases de Yoga"
            blurb="Sesiones al aire libre para complementar la evolución en el agua."
          />
          <ServiceCard
            index={3}
            icon={serviceIcons.paddle}
            title="Paddle Surf"
            blurb="Clases y rutas en aguas tranquilas de Conil. Todos los niveles."
          />
          <ServiceCard
            index={4}
            icon={serviceIcons.skate}
            title="Surf Skate"
            blurb="Entrenamiento técnico en tierra para mejorar maniobras y equilibrio."
          />
          <ServiceCard
            index={5}
            icon={serviceIcons.rental}
            title="Alquiler de Material"
            blurb="Tablas, neoprenos, paddle, bodyboard y skate. Sin complicaciones."
          />
        </div>
      </section>

      {/* ─── Full-bleed interior photo (Surf Camp teaser) ─── */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0.01 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
          style={{ background: NAVY }}
        >
          <Image
            src="/projects/entre-olas-surf/interior-patio.jpg"
            alt="Piscina interior y hamacas en la villa del surf camp"
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
                "linear-gradient(180deg, rgba(15,47,57,0) 55%, rgba(15,47,57,0.85) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-6 md:py-10 flex items-end justify-between">
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              Villa · +1000 m²
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.3em] hidden md:block"
              style={{ color: "rgba(255,253,247,0.7)", fontFamily: MONO }}
            >
              Entre Olas Surf Camp
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── Surf Camp dark section ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        {/* Decorative sun faint */}
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-10"
        >
          <Sun />
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              Surf Camp · +18
            </p>
            <h2
              className="text-6xl md:text-8xl leading-[0.88]"
              style={{
                fontFamily: DISPLAY,
                color: BG,
                letterSpacing: "0.005em",
              }}
            >
              LA EXPERIENCIA
              <br />
              <span style={{ color: YELLOW }}>QUE NO OLVIDARÁS.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,253,247,0.72)", fontFamily: SANS }}
            >
              Villa privada de +1000 m², piscina, pensión completa, transporte,
              surf todos los días, aventura y fiestas. Plazas limitadas por
              edición.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              } as Variants
            }
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { n: "1000", u: "m² villa" },
              { n: "4", u: "días / 3 noches" },
              { n: "+18", u: "solo adultos" },
              { n: "∞", u: "olas" },
            ].map((f) => (
              <motion.div
                key={f.u}
                variants={
                  {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  } as Variants
                }
                className="border-t pt-4"
                style={{ borderColor: "rgba(255,253,247,0.2)" }}
              >
                <p
                  className="text-5xl md:text-6xl leading-none"
                  style={{ fontFamily: DISPLAY, color: YELLOW }}
                >
                  {f.n}
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,253,247,0.5)", fontFamily: MONO }}
                >
                  {f.u}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Interior photo strip */}
          <motion.div
            initial={{ opacity: 0.01, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ background: NAVY_SOFT }}
            >
              <Image
                src="/projects/entre-olas-surf/interior-living.jpg"
                alt="Salón interior de la villa con suelo turquesa y lámparas colgantes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover"
              />
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ background: NAVY_SOFT }}
            >
              <Image
                src="/projects/entre-olas-surf/interior-pool.jpg"
                alt="Patio con piscina y hamacas dentro de la villa"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Editions */}
          <div className="mt-20">
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-8"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              Ediciones gestionables
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {camps.map((c, i) => (
                <motion.div
                  key={c.dates}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
                  className="p-6 border"
                  style={{ borderColor: "rgba(255,253,247,0.2)" }}
                >
                  <span
                    className="text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: YELLOW, fontFamily: MONO }}
                  >
                    {c.tag}
                  </span>
                  <p
                    className="mt-3 text-3xl md:text-4xl leading-tight"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {c.dates}
                  </p>
                  <p
                    className="mt-2 text-xs"
                    style={{
                      color: "rgba(255,253,247,0.55)",
                      fontFamily: SANS,
                    }}
                  >
                    {c.nights}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reseñas ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            Opiniones reales
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[0.92] max-w-2xl"
            style={{
              fontFamily: DISPLAY,
              color: NAVY,
              letterSpacing: "0.005em",
            }}
          >
            Lo que dicen
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              sus alumnos.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              who: "Laura García",
              meta: "Clase grupal · Roche",
              stars: 5,
              text: "Una experiencia increíble. Los instructores son muy profesionales y pacientes. Conseguí ponerme de pie en la tabla el primer día.",
              initials: "LG",
            },
            {
              who: "Carlos Martínez",
              meta: "Surf Camp · Conil",
              stars: 5,
              text: "El campamento de surf fue lo mejor de mis vacaciones. Aprendí mucho y conocí gente increíble. Ambiente inmejorable.",
              initials: "CM",
            },
            {
              who: "Familia Rodríguez",
              meta: "Clase grupal · Roche",
              stars: 5,
              text: "Hicimos el curso familiar y fue perfecto. Los niños se lo pasaron genial y los instructores se adaptaron a cada edad.",
              initials: "FR",
            },
          ].map((r, i) => (
            <motion.article
              key={r.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="p-8 md:p-10 border flex flex-col"
              style={{ borderColor: LINE, background: BG }}
            >
              <div
                className="text-xl tracking-wider"
                style={{ color: YELLOW }}
              >
                {"★".repeat(r.stars)}
              </div>
              <blockquote
                className="mt-6 text-base leading-relaxed flex-1"
                style={{ color: TEXT, fontFamily: SANS }}
              >
                «{r.text}»
              </blockquote>
              <footer className="mt-6 pt-6 border-t flex items-center gap-4" style={{ borderColor: LINE }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: NAVY,
                    color: YELLOW,
                    fontFamily: MONO,
                  }}
                >
                  {r.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: NAVY, fontFamily: SANS }}
                  >
                    {r.who}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: MUTED, fontFamily: MONO }}
                  >
                    {r.meta}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── Booking flow ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: SAND }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl leading-[0.92] max-w-2xl mb-16"
          style={{
            fontFamily: DISPLAY,
            color: NAVY,
            letterSpacing: "0.005em",
          }}
        >
          Reservar es
          <br />
          <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
            así de rápido.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {[
            { n: "01", title: "Elige tu pack", desc: "Clase suelta, bono de 2-7 sesiones o surf camp. Disponibilidad en tiempo real." },
            { n: "02", title: "Reserva y paga", desc: "Checkout completo con carrito, cuenta de usuario y confirmación por email." },
            { n: "03", title: "Surfea", desc: "Te esperamos en Playa de Roche. Material y seguro incluidos." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: EASE }}
              className="relative"
            >
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: YELLOW, fontFamily: MONO }}
              >
                PASO {s.n}
              </span>
              <h3
                className="mt-3 text-4xl md:text-5xl leading-tight"
                style={{ fontFamily: DISPLAY, color: NAVY }}
              >
                {s.title}
              </h3>
              <p
                className="mt-4 text-sm leading-relaxed max-w-xs"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Tech stack ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 border-t"
        style={{ borderColor: LINE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              Bajo el capó
            </p>
            <h3
              className="text-4xl md:text-5xl leading-[0.95]"
              style={{ fontFamily: DISPLAY, color: NAVY }}
            >
              Stack pensado para
              <br />
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                cargar rápido.
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Vite",
              "Supabase",
              "Stripe",
              "YouTube Embed",
              "Bebas Neue",
              "Manrope",
              "Space Grotesk",
              "E-commerce nativo",
              "Calendario reservas",
              "WhatsApp Business",
              "Schema · SEO",
              "Vercel",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 text-xs"
                style={{
                  borderColor: LINE,
                  color: NAVY,
                  fontFamily: MONO,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section
        className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[420px] h-[420px] opacity-25"
        >
          <Sun />
        </motion.div>

        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-6xl md:text-9xl leading-[0.85]"
            style={{
              fontFamily: DISPLAY,
              color: BG,
            }}
          >
            NOS VEMOS
            <br />
            <span style={{ color: YELLOW }}>EN EL AGUA.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,253,247,0.72)", fontFamily: SANS }}
          >
            La web está viva. Cada fin de semana entran reservas y el sistema de
            bonos convierte sin intermediarios.
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://entreolasurf.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
              }}
            >
              Visitar entreolasurf.com
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <Link
              href="/"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: "rgba(255,253,247,0.6)", fontFamily: MONO }}
            >
              ← Volver al portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between"
        style={{ borderColor: LINE, background: BG }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: MONO, color: NAVY }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} · Entre Olas · Caso de estudio
        </span>
      </footer>
    </div>
  );
}
