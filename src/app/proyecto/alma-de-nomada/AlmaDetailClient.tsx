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

/* ─── Palette (real from almadenomada.com) ─── */
const BG = "#faf6e8";
const CREAM = "#f3eedc";
const FOREST = "#184038";
const FOREST_DARK = "#132e29";
const FOREST_LINE = "#2f524b";
const TERRACOTA = "#d3623b";
const CORAL = "#ff5733";
const PEACH = "#ff8a5c";
const BORDER = "#e5dbc2";
const MUTED = "rgba(24,64,56,0.55)";
const FAINT = "rgba(24,64,56,0.35)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-changa), system-ui, sans-serif";
const SANS = "var(--font-poppins), system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

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

/* ─── Expanding rings ─── */
function ExpandingRings({
  color = TERRACOTA,
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <div className="relative w-full h-full">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
            animate={{ scale: [0.4, 1.4], opacity: [0.6, 0] }}
            transition={{
              duration: 4,
              delay: i * 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

/* ─── Destination data ─── */
interface Destination {
  country: string;
  photo: string;
  caption: string;
  tag: "Asia" | "Oceanía";
  span?: "tall" | "wide" | "big";
}

const destinations: Destination[] = [
  {
    country: "Australia",
    photo: "/projects/alma-de-nomada/destinations/australia.jpg",
    caption: "Nueva vida con estrategia",
    tag: "Oceanía",
    span: "big",
  },
  {
    country: "Sri Lanka",
    photo: "/projects/alma-de-nomada/destinations/sri-lanka.jpg",
    caption: "Surf, selva y espiritualidad",
    tag: "Asia",
    span: "tall",
  },
  {
    country: "Japón",
    photo: "/projects/alma-de-nomada/destinations/japon.jpg",
    caption: "Tradición y vanguardia",
    tag: "Asia",
  },
  {
    country: "Maldivas",
    photo: "/projects/alma-de-nomada/destinations/maldives.jpg",
    caption: "Calma y paraíso",
    tag: "Asia",
    span: "wide",
  },
  {
    country: "Tailandia",
    photo: "/projects/alma-de-nomada/destinations/tailandia.jpg",
    caption: "Templos y selva",
    tag: "Asia",
  },
  {
    country: "Nueva Zelanda",
    photo: "/projects/alma-de-nomada/destinations/new-zealand.jpg",
    caption: "Roadtrip consciente",
    tag: "Oceanía",
    span: "tall",
  },
  {
    country: "Vietnam",
    photo: "/projects/alma-de-nomada/destinations/vietnam.jpg",
    caption: "Ruta cultural y naturaleza",
    tag: "Asia",
  },
  {
    country: "Indonesia",
    photo: "/projects/alma-de-nomada/destinations/indonesia.jpg",
    caption: "Templos, volcanes y océano",
    tag: "Asia",
  },
];

/* ─── Editorial destination tile ─── */
function DestinationTile({
  d,
  index,
  className,
}: {
  d: Destination;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05, duration: 0.9, ease: EASE }}
      data-hover
      className={`relative group overflow-hidden ${className || ""}`}
      style={{ background: FOREST }}
    >
      <motion.div style={{ y }} className="absolute inset-0 -top-4 -bottom-4">
        <Image
          src={d.photo}
          alt={`${d.country} — ${d.caption}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]"
          quality={85}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(19,46,41,0) 40%, rgba(19,46,41,0.85) 100%)",
        }}
      />
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <span
          className="text-[10px] uppercase tracking-[0.3em] mb-2"
          style={{
            color: PEACH,
            fontFamily: MONO,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {d.tag} · {d.country}
        </span>
        <h3
          className="text-xl md:text-3xl leading-[1.05] text-white"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
          }}
        >
          {d.caption}
        </h3>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function AlmaDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-15%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  const expandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expandProgress } = useScroll({
    target: expandRef,
    offset: ["start end", "end start"],
  });
  const expandSpacing = useTransform(
    expandProgress,
    [0, 0.5, 1],
    ["-0.02em", "0.08em", "0.14em"]
  );

  return (
    <div
      style={{
        background: BG,
        color: FOREST,
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
          background: "rgba(19,46,41,0.35)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs uppercase tracking-[0.2em] text-white/75 hover:text-white transition-opacity"
          style={{ fontFamily: SANS }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: TERRACOTA }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em] text-white/60"
            style={{ fontFamily: MONO }}
          >
            almadenomada.com · en vivo
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero — full-bleed editorial ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end"
      >
        {/* Photo */}
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/alma-de-nomada/hero-photo.jpg"
            alt="Ainhoa balanceándose en una cuerda sobre el mar al atardecer"
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
                "linear-gradient(180deg, rgba(19,46,41,0.55) 0%, rgba(19,46,41,0.25) 35%, rgba(19,46,41,0.3) 65%, rgba(19,46,41,0.92) 100%)",
            }}
          />
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
              Caso de estudio · 05
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
                className="text-[clamp(3rem,10vw,9rem)] leading-[0.88] text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                Alma de
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-1 md:-mt-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: EASE }}
                className="text-[clamp(3rem,10vw,9rem)] leading-[0.88] italic"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  color: PEACH,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                Nómada.
              </motion.h1>
            </div>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed text-white/90"
              style={{ fontFamily: SANS, fontWeight: 300 }}
            >
              El hogar profesional de{" "}
              <a
                href="https://instagram.com/ainhhgarcia"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: PEACH, textDecoration: "underline", textUnderlineOffset: 4 }}
                data-hover
              >
                @ainhhgarcia
              </a>
              . Travel coach de 44K en Instagram que no quería una landing
              genérica — quería un sitio que convirtiera comunidad en clientes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://almadenomada.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                style={{
                  background: TERRACOTA,
                  color: BG,
                  fontFamily: MONO,
                }}
              >
                Visitar el sitio
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://instagram.com/ainhhgarcia"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 border text-white/90"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  fontFamily: MONO,
                }}
              >
                @ainhhgarcia
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── Stats strip ─── */}
      <section
        className="px-6 md:px-12 py-10 md:py-14 border-b"
        style={{
          borderColor: FOREST_LINE,
          background: FOREST_DARK,
          color: BG,
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { n: "44K", label: "Seguidores IG" },
            { n: "297", label: "Posts" },
            { n: "08", label: "Destinos" },
            { n: "01", label: "Consultoría" },
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
                  color: i === 0 ? TERRACOTA : BG,
                  letterSpacing: "-0.02em",
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
              color: FOREST,
              letterSpacing: "-0.025em",
            }}
          >
            Creadora de viaje con{" "}
            <span
              style={{
                color: TERRACOTA,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              audiencia real.
            </span>{" "}
            Una web a la altura.
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: FOREST, fontFamily: SANS, fontWeight: 300 }}
          >
            Ainhoa García lleva años viajando y documentándolo. Tiene{" "}
            <strong style={{ fontWeight: 500 }}>44.000 personas</strong>{" "}
            siguiéndola. Cuando decidió monetizar con consultorías, la web no
            podía ser un Linktree disfrazado — tenía que reflejar el nivel de
            la creadora y cerrar reservas sin fricción.
          </p>
        </div>
      </section>

      {/* ─── Central quote "expandirse" ─── */}
      <section
        ref={expandRef}
        className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden"
        style={{ background: CREAM }}
      >
        <ExpandingRings
          color={TERRACOTA}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-30"
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            La frase que lo ordena todo
          </p>
          <p
            className="text-[clamp(2.5rem,8vw,7rem)] leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              color: FOREST,
              letterSpacing: "-0.02em",
            }}
          >
            <WordReveal text="No es" />
            <br />
            <WordReveal text="escapar," delay={0.3} />
            <br />
            <span style={{ color: TERRACOTA, fontStyle: "italic" }}>
              <WordReveal text="es" delay={0.8} />{" "}
              <motion.span
                style={{
                  display: "inline-block",
                  letterSpacing: expandSpacing,
                }}
              >
                <WordReveal text="expandirse." delay={1.0} />
              </motion.span>
            </span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Toda la web respira esta idea: no escapar de lo que tienes, sino
            expandirlo. Cambio, no huida.
          </motion.p>
        </div>
      </section>

      {/* ─── Editorial destinations ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
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
            El atlas de destinos
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: FOREST,
              letterSpacing: "-0.025em",
            }}
          >
            Ocho sitios.{" "}
            <span
              style={{
                color: TERRACOTA,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Ocho formas de empezar.
            </span>
          </h2>
        </motion.div>

        {/* Editorial masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {/* Australia — hero tile */}
          <DestinationTile
            d={destinations[0]}
            index={0}
            className="col-span-2 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[560px]"
          />
          <DestinationTile
            d={destinations[1]}
            index={1}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-auto md:min-h-[270px]"
          />
          <DestinationTile
            d={destinations[2]}
            index={2}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-auto md:min-h-[270px]"
          />
          <DestinationTile
            d={destinations[3]}
            index={3}
            className="col-span-2 md:col-span-3 aspect-[3/2]"
          />
          <DestinationTile
            d={destinations[4]}
            index={4}
            className="col-span-1 md:col-span-3 aspect-[3/4] md:aspect-[3/2]"
          />
          <DestinationTile
            d={destinations[5]}
            index={5}
            className="col-span-1 md:col-span-2 aspect-[3/4] md:aspect-[4/5]"
          />
          <DestinationTile
            d={destinations[6]}
            index={6}
            className="col-span-2 md:col-span-2 aspect-[3/2] md:aspect-[4/5]"
          />
          <DestinationTile
            d={destinations[7]}
            index={7}
            className="col-span-2 md:col-span-2 aspect-[3/2] md:aspect-[4/5]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 text-center text-sm"
          style={{ color: MUTED, fontFamily: SANS }}
        >
          Fotografía y copy extraídos de almadenomada.com
        </motion.p>
      </section>

      {/* ─── Australia spotlight ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[4/5] order-2 md:order-1"
          >
            <Image
              src="/projects/alma-de-nomada/ainhoa-tramites.jpg"
              alt="Ainhoa en una calle residencial de Australia"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              quality={85}
            />
            <div
              className="absolute -bottom-5 -right-5 px-5 py-3 shadow-lg flex items-center gap-3"
              style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
            >
              <span className="text-lg">🇦🇺</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
                Página especial
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 md:order-2"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: TERRACOTA, fontFamily: MONO }}
            >
              Australia · el servicio estrella
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                color: FOREST,
                letterSpacing: "-0.025em",
              }}
            >
              ¿Cómo venir a{" "}
              <span
                style={{
                  color: TERRACOTA,
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                Australia?
              </span>
            </h2>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed"
              style={{ color: FOREST, fontFamily: SANS, fontWeight: 300 }}
            >
              Ainhoa vivió allí. La web tiene una landing dedicada donde
              convierte dudas en un plan: ciudad, visados, trámites, mindset.
              El servicio que más consultas genera.
            </p>
            <ul className="mt-6 space-y-2 text-sm" style={{ color: FOREST }}>
              {[
                "Elección de ciudad según perfil",
                "Visados paso a paso",
                "Trámites y logística",
                "Preparación mental para el cambio",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: TERRACOTA }}
                  />
                  <span style={{ fontFamily: SANS }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── Creator block — Ainhoa portrait + IG ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: FOREST_DARK, color: BG }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: TERRACOTA, filter: "blur(120px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-center">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-6"
              style={{ color: TERRACOTA, fontFamily: MONO }}
            >
              La creadora detrás
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Ainhoa lleva años{" "}
              <span style={{ color: TERRACOTA, fontStyle: "italic" }}>
                documentando
              </span>
              .
            </h2>

            <p
              className="mt-8 text-lg md:text-2xl leading-snug"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                color: "rgba(250,246,232,0.85)",
              }}
            >
              «Viajar me cambió la vida. Ahora ayudo a otras personas a
              diseñar la suya en{" "}
              <span style={{ color: TERRACOTA, fontStyle: "italic" }}>
                cualquier parte del mundo
              </span>
              .»
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-sm">
              <div
                className="pb-4 border-b"
                style={{ borderColor: FOREST_LINE }}
              >
                <p
                  className="text-3xl md:text-4xl"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    color: TERRACOTA,
                    letterSpacing: "-0.02em",
                  }}
                >
                  44K
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mt-1 opacity-60"
                  style={{ fontFamily: MONO }}
                >
                  Seguidores
                </p>
              </div>
              <div
                className="pb-4 border-b"
                style={{ borderColor: FOREST_LINE }}
              >
                <p
                  className="text-3xl md:text-4xl"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    color: BG,
                    letterSpacing: "-0.02em",
                  }}
                >
                  España · AU
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mt-1 opacity-60"
                  style={{ fontFamily: MONO }}
                >
                  Donde vive
                </p>
              </div>
            </div>

            <a
              href="https://instagram.com/ainhhgarcia"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="mt-10 inline-flex items-center gap-3 px-5 py-3 border rounded-full hover:opacity-100 transition-opacity"
              style={{ borderColor: FOREST_LINE, color: BG }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: TERRACOTA }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ fontFamily: MONO }}
              >
                @ainhhgarcia en Instagram
              </span>
              <span>↗</span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="relative w-full"
          >
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 8px rgba(250,246,232,0.06)",
              }}
            >
              <Image
                src="/projects/alma-de-nomada/ainhoa-portrait.jpg"
                alt="Ainhoa, fundadora de Alma de Nómada"
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover"
                quality={85}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(19,46,41,0) 55%, rgba(19,46,41,0.45) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: TERRACOTA }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: BG, fontFamily: MONO }}
                >
                  Ainhoa · en ruta
                </span>
              </div>
            </div>
            <div
              className="absolute -top-3 -left-3 px-3 py-1.5"
              style={{
                background: TERRACOTA,
                color: BG,
                fontFamily: MONO,
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
                Creator · Fundadora
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3 pillars compact ─── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
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
            El proceso · tres pasos, sin humo
          </p>
          <h3
            className="text-3xl md:text-5xl leading-[1]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: FOREST,
              letterSpacing: "-0.02em",
            }}
          >
            Destino · Trámites ·{" "}
            <span
              style={{
                color: TERRACOTA,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Mindset.
            </span>
          </h3>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            {
              n: "01",
              title: "Destino correcto",
              desc: "Encuentra el destino y el tipo de experiencia que encaja con tu momento de vida.",
            },
            {
              n: "02",
              title: "Trámites claros",
              desc: "Visados, documentación y planificación sin estrés ni confusión.",
            },
            {
              n: "03",
              title: "Mindset",
              desc: "Prepárate para el cambio, gestiona miedos y da el salto con confianza.",
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
              style={{ borderColor: BORDER }}
            >
              <span
                className="text-xs"
                style={{ color: TERRACOTA, fontFamily: MONO }}
              >
                {p.n}
              </span>
              <h4
                className="mt-3 text-xl md:text-2xl leading-tight"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 600,
                  color: FOREST,
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

      {/* ─── Ownership + tech compact strip ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28 border-t"
        style={{ borderColor: BORDER }}
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
                color: FOREST,
                letterSpacing: "-0.02em",
              }}
            >
              End-to-end,{" "}
              <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
                sin excusas.
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
                "Diseño visual, fotografía editorial y copy supervisado",
                "Desarrollo en Next.js 16 + Tailwind v4 desplegado en Vercel",
                "CMS custom para que Ainhoa añada destinos sin tocar código",
                "Modo claro / oscuro como decisión de marca",
                "Captura de leads y newsletter",
                "Integración con 4 partners (seguros y conectividad)",
                "SEO técnico y cookie consent legal",
              ].map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-4 py-3 border-b text-sm md:text-base"
                  style={{ borderColor: BORDER }}
                >
                  <span
                    className="text-[10px] mt-1.5 shrink-0"
                    style={{ color: TERRACOTA, fontFamily: MONO, fontWeight: 500 }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: FOREST, fontFamily: SANS }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Next.js 16",
                "Tailwind v4",
                "Vercel",
                "Poppins",
                "Changa",
                "CMS custom",
                "Lead capture",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border"
                  style={{
                    borderColor: BORDER,
                    color: FOREST,
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
        style={{ background: FOREST, color: BG }}
      >
        <ExpandingRings
          color={TERRACOTA}
          className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] opacity-40"
        />
        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-5xl md:text-8xl leading-[0.9]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              color: BG,
              letterSpacing: "-0.035em",
            }}
          >
            Expandir.{" "}
            <span style={{ color: TERRACOTA, fontStyle: "italic", fontWeight: 600 }}>
              No escapar.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(250,246,232,0.72)", fontFamily: SANS }}
          >
            La web está en producción. Cada semana entran consultas de gente
            de su comunidad que quiere algo distinto — y sale con un plan.
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://almadenomada.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{ background: TERRACOTA, color: BG, fontFamily: MONO }}
            >
              Visitar almadenomada.com
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <Link
              href="/"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{
                color: "rgba(250,246,232,0.6)",
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
        style={{ borderColor: BORDER, background: BG }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: MONO, color: FOREST }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} · Alma de Nómada · Caso de estudio
        </span>
      </footer>
    </div>
  );
}
