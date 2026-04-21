"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Palette — Grupo Axial ─── */
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

const brands = [
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
];

export default function GrupoAxialDetailClient() {
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
      {/* ─── Top bar ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{
          background: `${BLACK}cc`,
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${LINE_DARK}`,
        }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs uppercase tracking-[0.2em] hover:opacity-100 transition-opacity"
          style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: GREEN }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: MUTED_DARK, fontFamily: MONO }}
          >
            2021 — 2024 · Las Palmas
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero — billboard photo ─── */}
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
            alt="Valla publicitaria de Grupo Axial con vista a las cumbres de Gran Canaria"
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
          className="relative z-10 w-full px-6 md:px-12 pt-40 pb-20 md:pb-28"
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
              Caso de éxito · WordPress
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              Colaboración 2021 — 2024
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="text-[clamp(3.5rem,13vw,12rem)] leading-[0.85]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  color: WHITE,
                  letterSpacing: "-0.04em",
                }}
              >
                Grupo
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.55, ease: EASE }}
                className="text-[clamp(3.5rem,13vw,12rem)] leading-[0.85]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  color: GREEN,
                  letterSpacing: "-0.04em",
                }}
              >
                Axial.
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
              Ecosistema de movilidad de Las Palmas — bici, moto, alquiler y
              taller. Estuve <strong style={{ color: GREEN }}>3 años</strong>{" "}
              al cargo de todo lo digital: construí dos webs en WordPress y
              llevé las redes de 4 de sus marcas con producción propia de
              contenido. Ya no lo gestiono, pero el trabajo sigue vivo.
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
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
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
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Stats strip ─── */}
      <section
        className="px-6 md:px-12 py-14 md:py-16 border-y"
        style={{ borderColor: LINE_DARK, background: GRAPHITE }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { n: "3", label: "Años de colaboración", highlight: true },
            { n: "02", label: "Webs en WordPress" },
            { n: "04", label: "Cuentas IG gestionadas" },
            { n: "100%", label: "Contenido producido in-house" },
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

      {/* ─── Narrative ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM, color: BLACK }}
      >
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            El proyecto
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: BLACK,
              letterSpacing: "-0.03em",
            }}
          >
            Caso de éxito en{" "}
            <span style={{ color: GREEN }}>WordPress</span> + 3 años llevando{" "}
            <span style={{ color: GREEN }}>las redes del grupo.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: BLACK, fontFamily: DISPLAY }}
            >
              Cuando entré, Grupo Axial tenía presencia física reconocida pero
              cero coherencia digital. Webs anticuadas, Instagram abandonado,
              cada marca con su voz. Un grupo fuerte en la calle — invisible
              en internet.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              Construí grupoaxial.es y axialrent.com sobre WordPress +
              Elementor — editables por el cliente, sin depender de mí. Y
              durante 3 años llevé Instagram de Grupo Axial, Moto Axial,
              Axial Bike y Axial Rent con producción propia de fotografía,
              reels y campañas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Brand grid with real store photos ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: BLACK, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: GREEN, fontFamily: MONO }}
          >
            Las marcas que llevé
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: WHITE,
              letterSpacing: "-0.03em",
            }}
          >
            Cuatro marcas.{" "}
            <span style={{ color: GREEN }}>Una sola voz.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {brands.map((b, i) => (
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
                alt={`${b.name} — foto real de la tienda`}
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
                <div className="flex items-baseline justify-between gap-3">
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
                    className="text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 shrink-0"
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

      {/* ─── Lo que hice ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM, color: BLACK }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
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
              Lo que construí
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Web, foto, reels,{" "}
              <span style={{ color: GREEN }}>tres años seguidos.</span>
            </h3>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              WordPress para que el cliente no dependa de nadie. Instagram
              trabajado con calendario y producción propia. Un grupo con voz.
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
            {[
              "grupoaxial.es sobre WordPress + Elementor — web matriz editable",
              "axialrent.com con catálogo de alquiler actualizable",
              "SEO local: Las Palmas de Gran Canaria y Canarias",
              "Calendario editorial semanal para 4 cuentas IG",
              "Sesiones de fotografía propia en cada tienda",
              "Reels y vídeos con voz de marca coherente",
              "Campañas de ofertas y novedades (rebajas, temporadas)",
              "Gestión de DMs y atención pre-venta en 4 marcas",
            ].map((line) => (
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
                className="flex items-start gap-5 py-5 border-b"
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

      {/* ─── Showcase: full-bleed moto photo ─── */}
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
            alt="Moto Piaggio en la tienda de Moto Axial Center — sesión de producto"
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
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-6 md:py-10 flex items-end justify-between">
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: GREEN, fontFamily: MONO }}
            >
              Producción propia · Moto Axial
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.3em] hidden md:block"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: MONO }}
            >
              Instagram @motoaxial
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── Closing ─── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44 relative overflow-hidden"
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
            className="text-5xl md:text-8xl leading-[0.88]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            Somos movimiento,{" "}
            <span style={{ color: GREEN }}>somos Axial.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            Tres años construyendo la voz digital del grupo de movilidad más
            fuerte de Las Palmas. Dos webs WordPress editables, cuatro cuentas
            IG gestionadas, producción propia. Ya no lo llevo, pero el trabajo
            sigue vivo en grupoaxial.es y axialrent.com.
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
              Ver grupoaxial.es
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              ← Todos los proyectos
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between"
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
          © {new Date().getFullYear()} · Grupo Axial · 2021—2024
        </span>
      </footer>
    </div>
  );
}
