"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Palette (from sambatrips.com real CSS) ─── */
const BG = "#eeebdc";
const CREAM = "#f5f1e4";
const NAVY = "#081c3a";
const NAVY_SOFT = "#354075";
const LAVENDER = "#c0c0d3";
const ORANGE = "#fe6c01";
const PEACH = "#fed681";
const LINE = "rgba(8,28,58,0.1)";
const MUTED = "rgba(8,28,58,0.55)";
const FAINT = "rgba(8,28,58,0.35)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-unbounded), 'Impact', sans-serif";
const SANS = "var(--font-jakarta), system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

/* ─── Samba sun mark ─── */
function SambaSun({ className, color = ORANGE }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <circle cx="50" cy="50" r="16" fill={color} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 50 + Math.cos(angle) * 24;
        const y1 = 50 + Math.sin(angle) * 24;
        const x2 = 50 + Math.cos(angle) * 40;
        const y2 = 50 + Math.sin(angle) * 40;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ─── Word reveal ─── */
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
            transition={{
              duration: 0.9,
              delay: delay + i * 0.06,
              ease: EASE,
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Real trip posters from sambatrips.com ─── */
interface Trip {
  photo: string;
  country: string;
  title: string;
  partner?: string;
  dates: string;
  continent: "Asia" | "África" | "Europa";
}

const trips: Trip[] = [
  {
    photo: "/projects/samba-trips/photos/photo-1.jpg",
    country: "Filipinas",
    title: "Siargao Surf Trip",
    partner: "SurfPlusFriends",
    dates: "12–19 Marzo",
    continent: "Asia",
  },
  {
    photo: "/projects/samba-trips/photos/photo-2.jpg",
    country: "España",
    title: "Surf House · Conil",
    partner: "Entre Olas",
    dates: "23–26 Abril",
    continent: "Europa",
  },
  {
    photo: "/projects/samba-trips/photos/photo-3.jpg",
    country: "Indonesia",
    title: "Lombok Surf Trip",
    partner: "Easy Rizzy",
    dates: "2–9 Marzo",
    continent: "Asia",
  },
  {
    photo: "/projects/samba-trips/photos/photo-4.jpg",
    country: "Marruecos",
    title: "Sahara Escape",
    partner: "Barefootrips Morocco",
    dates: "1–8 Octubre",
    continent: "África",
  },
  {
    photo: "/projects/samba-trips/photos/photo-6.jpg",
    country: "Maldivas",
    title: "¿Has visto a Nemo?",
    partner: "Akiri Holidays",
    dates: "13–20 Junio",
    continent: "Asia",
  },
  {
    photo: "/projects/samba-trips/photos/photo-5.jpg",
    country: "Tanzania + Zanzíbar",
    title: "Welcome to Africa",
    dates: "Próximamente",
    continent: "África",
  },
];

/* ─── Trip poster card ─── */
function TripPoster({ trip, index }: { trip: Trip; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.01, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.8, ease: EASE }}
      data-hover
      className="group relative"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden shadow-[0_25px_60px_-18px_rgba(8,28,58,0.35)]"
        style={{ background: NAVY }}
      >
        <Image
          src={trip.photo}
          alt={`${trip.title} — ${trip.country}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
          quality={85}
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>
      {/* Caption below */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: ORANGE, fontFamily: MONO }}
          >
            {trip.continent} · {trip.country}
          </p>
          <p
            className="mt-1 text-lg leading-tight"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              color: NAVY,
              letterSpacing: "-0.02em",
            }}
          >
            {trip.title}
          </p>
          {trip.partner && (
            <p
              className="mt-1 text-[10px]"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              × {trip.partner}
            </p>
          )}
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.25em] shrink-0 pt-1"
          style={{ color: NAVY, fontFamily: MONO }}
        >
          {trip.dates}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── FAQ item ─── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="border-t pt-5 pb-2"
      style={{ borderColor: NAVY }}
    >
      <div className="flex items-baseline gap-4">
        <span
          className="text-[10px] uppercase tracking-[0.25em] shrink-0"
          style={{ color: ORANGE, fontFamily: MONO }}
        >
          0{index + 1}
        </span>
        <div>
          <h4
            className="text-lg md:text-xl leading-tight"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              color: NAVY,
              letterSpacing: "-0.01em",
            }}
          >
            {q}
          </h4>
          <p
            className="mt-3 text-sm leading-relaxed max-w-2xl"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function SambaDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-12%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div
      style={{
        background: BG,
        color: NAVY,
        fontFamily: SANS,
      }}
    >
      {/* ─── Top bar ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{
          background: "rgba(8,28,58,0.3)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-opacity"
          style={{ fontFamily: SANS }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: ORANGE }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em] text-white/70"
            style={{ fontFamily: MONO }}
          >
            sambatrips.com · en vivo
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero full-bleed ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/samba-trips/hero-video-poster.jpg"
            alt="Playa tropical con palmeras al atardecer"
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
                "linear-gradient(180deg, rgba(8,28,58,0.45) 0%, rgba(8,28,58,0.15) 40%, rgba(8,28,58,0.3) 70%, rgba(8,28,58,0.92) 100%)",
            }}
          />
        </motion.div>

        {/* Samba sun decoration */}
        <motion.div
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute top-28 right-6 md:right-16 w-20 md:w-28"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <SambaSun color={ORANGE} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: heroContentY, opacity: heroFade }}
          className="relative z-10 w-full px-6 md:px-12 pt-40 pb-20 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-8 text-white/85"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border border-white/30 rounded-full"
              style={{ fontFamily: MONO }}
            >
              Caso de estudio · 04
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO }}
            >
              2025
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                Samba
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: EASE }}
                className="text-[clamp(3.5rem,12vw,11rem)] leading-[0.85] italic"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  color: ORANGE,
                  letterSpacing: "-0.04em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                trips.
              </motion.h1>
            </div>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed text-white/90"
              style={{ fontFamily: SANS, fontWeight: 400 }}
            >
              La casa digital de{" "}
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: ORANGE, textDecoration: "underline", textUnderlineOffset: 4 }}
                data-hover
              >
                @oli_czudny
              </a>
              . Creator de viaje con 96K que no quería una landing — quería un
              sitio donde su comunidad pudiera apuntarse a los trips y pagar en
              3 clics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://sambatrips.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                style={{
                  background: ORANGE,
                  color: "white",
                  fontFamily: MONO,
                }}
              >
                Visitar el sitio
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 border text-white/90"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  fontFamily: MONO,
                }}
              >
                @oli_czudny
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Stats strip ─── */}
      <section
        className="px-6 md:px-12 py-10 md:py-14 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: NAVY,
          color: BG,
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { n: "96K", label: "Seguidores IG" },
            { n: "491", label: "Posts" },
            { n: "06", label: "Trips activos" },
            { n: "03", label: "Continentes" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="flex md:flex-col gap-4 md:gap-1 items-baseline md:items-start"
            >
              <span
                className="text-4xl md:text-5xl leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  color: i === 0 ? ORANGE : BG,
                  letterSpacing: "-0.03em",
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

      {/* ─── Narrative intro ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            El proyecto
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1] mb-12"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Creator con comunidad.{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Una web que cierra.
            </span>
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: NAVY, fontFamily: SANS, fontWeight: 400 }}
          >
            Oli Czudny lleva años organizando viajes en grupo y documentándolos
            en Instagram. <strong style={{ fontWeight: 600 }}>96K</strong>{" "}
            personas le siguen. Cada vez que anunciaba un trip, le llegaban
            docenas de DMs — la web tenía que absorber ese tráfico y convertir
            interés en reserva sin perder la estética cruda de sus posts.
          </p>
        </div>
      </section>

      {/* ─── Editorial trip posters gallery ─── */}
      <section className="px-6 md:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            Los trips
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Seis carteles.{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Seis historias.
            </span>
          </h2>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Cada trip tiene su póster — diseño estilo concierto, co-brand con
            el partner local, foto real de la edición anterior. Así es como se
            comunican en Instagram y así viven en la web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {trips.map((trip, i) => (
            <TripPoster key={trip.title} trip={trip} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Cross-link to Entre Olas (using the real Surf House poster) ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden shadow-2xl">
              <Image
                src="/projects/samba-trips/photos/photo-2.jpg"
                alt="Cartel de Surf House Conil — Samba Trips × Entre Olas"
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                className="object-cover"
                quality={85}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: ORANGE, fontFamily: MONO }}
            >
              Bonus · el universo conecta
            </p>
            <h3
              className="text-4xl md:text-6xl leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              La edición de Conil la co-produce{" "}
              <span
                style={{
                  color: ORANGE,
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Entre Olas.
              </span>
            </h3>
            <p
              className="mt-6 max-w-lg text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(238,235,220,0.72)", fontFamily: SANS }}
            >
              Construí las dos webs. La de Samba, la de Entre Olas. Cuando los
              colegas colaboran y el ecosistema se cruza, el trabajo cobra otro
              sentido.
            </p>
            <Link
              href="/proyecto/entre-olas-surf"
              data-hover
              className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 rounded-full group"
              style={{
                background: ORANGE,
                color: NAVY,
                fontFamily: MONO,
              }}
            >
              <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                Ver Entre Olas
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Creator block — Oli ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: LAVENDER, color: NAVY }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-12 right-8 w-24 md:w-32 opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <SambaSun color={NAVY} />
        </motion.div>

        <div className="relative max-w-5xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
          >
            El creator detrás
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[0.95] mb-12"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Oliver Czudny,{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              aka Oli.
            </span>
          </h2>

          {/* Atmospheric mood photo */}
          <motion.div
            initial={{ opacity: 0.01, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[16/7] w-full overflow-hidden mb-14"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/samba-trips/oli-mood.jpg"
              alt="Paisaje atmosférico de un viaje documentado por Oli Czudny"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              quality={85}
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "white",
                fontFamily: MONO,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              shot by @oli_czudny · lombok
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-start">
            <div>
              <p
                className="text-xl md:text-2xl leading-snug"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  color: NAVY,
                }}
              >
                «Porque lo mejor de recorrer el mundo no son los lugares, sino
                las personas con las que los compartes. Viajamos juntos,
                vivimos intensamente… y la vida se vuelve{" "}
                <span style={{ color: ORANGE, fontStyle: "italic" }}>
                  samba
                </span>
                .»
              </p>
              <p
                className="mt-8 max-w-lg text-base leading-relaxed"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                Oli lleva 491 posts documentando trips. Cuando monetizó con
                reservas, la web tenía que estar a la altura de su comunidad —
                no por encima, no por debajo. Cruda y bien hecha.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-5 border"
                style={{ borderColor: NAVY, background: BG }}
              >
                <p
                  className="text-4xl md:text-5xl leading-none"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    color: ORANGE,
                    letterSpacing: "-0.03em",
                  }}
                >
                  96K
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
                >
                  Seguidores IG
                </p>
              </div>
              <div
                className="p-5 border"
                style={{ borderColor: NAVY, background: BG }}
              >
                <p
                  className="text-4xl md:text-5xl leading-none"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: "-0.03em",
                  }}
                >
                  491
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
                >
                  Posts · reels
                </p>
              </div>
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="col-span-2 p-5 flex items-center justify-between group"
                style={{
                  background: NAVY,
                  color: BG,
                }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] opacity-60"
                    style={{ fontFamily: MONO }}
                  >
                    Instagram
                  </p>
                  <p
                    className="mt-1 text-xl"
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 600,
                    }}
                  >
                    @oli_czudny
                  </p>
                </div>
                <span
                  className="text-2xl group-hover:translate-x-1 transition-transform"
                  style={{ color: ORANGE }}
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pillars — brand values ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
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
            Los pilares de la marca
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Más que viajes,{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              experiencias.
            </span>
          </h2>
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            {
              n: "01",
              title: "Planea tu aventura",
              desc: "Acompañamiento en cada paso. Organizar el viaje tan emocionante como vivirlo.",
            },
            {
              n: "02",
              title: "Beneficios exclusivos",
              desc: "Trato VIP, detalles sorpresa y ese algo inesperado que lleva el viaje al siguiente nivel.",
            },
            {
              n: "03",
              title: "Conexiones locales",
              desc: "Red de amigos locales que abren puertas que otros viajeros no saben que existen.",
            },
            {
              n: "04",
              title: "Viajes a medida",
              desc: "Aquí no hay viajes genéricos. Cada aventura tan única como quien la vive.",
            },
          ].map((p) => (
            <motion.div
              key={p.n}
              variants={
                {
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE },
                  },
                } as Variants
              }
              className="border-t pt-6"
              style={{ borderColor: NAVY }}
            >
              <span
                className="text-xs"
                style={{ color: ORANGE, fontFamily: MONO, fontWeight: 500 }}
              >
                {p.n}
              </span>
              <h4
                className="mt-3 text-xl md:text-2xl leading-tight"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  color: NAVY,
                }}
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

      {/* ─── FAQ ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM }}
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
            style={{ color: MUTED, fontFamily: MONO }}
          >
            Preguntas frecuentes
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Lo que{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              todos preguntan.
            </span>
          </h2>
        </motion.div>

        <div>
          {[
            {
              q: "¿Los vuelos están incluidos?",
              a: "No, cada viajero reserva su vuelo. Les orientamos sobre fechas, rutas y tarifas, y coordinamos llegadas.",
            },
            {
              q: "¿Me ayudan con el visado?",
              a: "Sí. Si el destino requiere visado, se explica en la ficha del trip y se acompaña el proceso paso a paso.",
            },
            {
              q: "¿Puedo cancelar y recibir reembolso?",
              a: "La política está detallada por edición. En general: la señal no se devuelve, el pago final se puede transferir a otro trip con aviso.",
            },
            {
              q: "¿Qué está incluido en el precio?",
              a: "Alojamiento, actividades del programa, algunas comidas y transporte local. Los extras se pagan aparte con transparencia.",
            },
          ].map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Ownership + tech compact ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28 border-t"
        style={{ borderColor: LINE }}
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
              style={{ color: MUTED, fontFamily: MONO }}
            >
              Lo que construí
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: "-0.025em",
              }}
            >
              De punta a punta,{" "}
              <span
                style={{
                  color: ORANGE,
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                sin postureo.
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
              {[
                "Diseño editorial + identidad visual adaptada a IG",
                "Desarrollo sobre Webflow con CMS Collections custom",
                "Catálogo de 6+ trips gestionable sin tocar código",
                "Reservas con señal y pago final integrados en Stripe",
                "Fichas de destino con co-branding por partner local",
                "Feed de Instagram embebido como prueba social",
                "SEO internacional (ES / EN) + multimoneda",
              ].map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-4 py-3 border-b text-sm md:text-base"
                  style={{ borderColor: LINE }}
                >
                  <span
                    className="text-[10px] mt-1.5 shrink-0"
                    style={{ color: ORANGE, fontFamily: MONO, fontWeight: 500 }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: NAVY, fontFamily: SANS }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Webflow",
                "CMS Collections",
                "Stripe Checkout",
                "Calendly",
                "Instagram Embed",
                "Plus Jakarta Sans",
                "Flan Juicebox",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border"
                  style={{
                    borderColor: NAVY,
                    color: NAVY,
                    fontFamily: MONO,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section
        className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: ORANGE, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-5xl md:text-8xl leading-[0.88]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              color: BG,
              letterSpacing: "-0.04em",
            }}
          >
            La vida
            <br />
            se vuelve{" "}
            <span
              style={{
                color: ORANGE,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              samba.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(238,235,220,0.72)", fontFamily: SANS }}
          >
            La web está viva, cada edición abre reservas desde el CMS y la
            comunidad de 96K de Oli se convierte en viajeros reales.
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://sambatrips.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 rounded-full flex items-center gap-2"
              style={{
                background: ORANGE,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 600,
              }}
            >
              Visitar sambatrips.com
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <Link
              href="/"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{
                color: "rgba(238,235,220,0.6)",
                fontFamily: MONO,
              }}
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
          © {new Date().getFullYear()} · Samba Trips · Caso de estudio
        </span>
      </footer>
    </div>
  );
}
