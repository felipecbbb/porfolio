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

/* ─── Palette (from psicolorenaamadio.com real CSS) ─── */
const BG = "#f5f1ee";
const BG_WARM = "#ede4d8";
const FG = "#1d2430";
const PEACH = "#f4b07e";
const PEACH_SOFT = "#f6c2a9";
const BEIGE = "#dfc2a6";
const LINE = "rgba(29,36,48,0.08)";
const MUTED = "rgba(29,36,48,0.55)";
const FAINT = "rgba(29,36,48,0.35)";

const EASE = [0.22, 1, 0.36, 1] as const;
const SERIF = "var(--font-cormorant), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-dm-sans), system-ui, sans-serif";

/* ─── Word-by-word reveal for quotes ─── */
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

/* ─── Decorative tulip sketch (inspired by site's alt text) ─── */
function TulipOrnament({
  className,
  stroke = PEACH,
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      stroke={stroke}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* stem */}
      <path d="M60 200 C 58 150, 62 110, 60 70" />
      {/* left leaf */}
      <path d="M60 140 C 36 130, 22 150, 18 168 C 32 168, 50 162, 60 152" />
      {/* right leaf */}
      <path d="M60 120 C 80 112, 96 124, 100 140 C 86 140, 70 136, 60 128" />
      {/* tulip bud */}
      <path d="M46 70 C 46 48, 56 36, 60 28 C 64 36, 74 48, 74 70 C 74 82, 64 88, 60 90 C 56 88, 46 82, 46 70 Z" />
      {/* inner petal line */}
      <path d="M60 30 C 60 50, 60 70, 60 88" />
      <path d="M52 50 C 54 60, 56 70, 58 82" />
      <path d="M68 50 C 66 60, 64 70, 62 82" />
    </svg>
  );
}

/* ─── Breathing blob ─── */
function Blob({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{
        scale: [1, 1.08, 1],
        rotate: [0, 8, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
      style={{
        background: color,
        borderRadius: "48% 52% 60% 40% / 45% 55% 45% 55%",
        filter: "blur(40px)",
      }}
    />
  );
}

/* ─── Service card ─── */
function ServiceCard({
  index,
  duration,
  title,
  blurb,
  accent,
}: {
  index: number;
  duration: string;
  title: string;
  blurb: string;
  accent: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: EASE }}
      className="relative p-8 md:p-10 border group"
      style={{
        borderColor: LINE,
        background: accent ? PEACH : "transparent",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{
            color: accent ? FG : FAINT,
            fontFamily: SANS,
          }}
        >
          0{index + 1}
        </span>
        <span
          className="text-xs uppercase tracking-widest"
          style={{
            color: accent ? FG : MUTED,
            fontFamily: SANS,
          }}
        >
          {duration}
        </span>
      </div>
      <h3
        className="mt-8 text-3xl md:text-4xl leading-[1.05]"
        style={{ fontFamily: SERIF, fontWeight: 500, color: FG }}
      >
        {title}
      </h3>
      <p
        className="mt-6 text-sm leading-relaxed"
        style={{
          color: accent ? FG : MUTED,
          fontFamily: SANS,
        }}
      >
        {blurb}
      </p>
    </motion.div>
  );
}

/* ─── Book mockup ─── */
function BookCover({
  title,
  subtitle,
  description,
  bg,
  fg,
  italic,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  description: string;
  bg: string;
  fg: string;
  italic?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rot = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      style={{ y, rotate: rot }}
      className="relative"
    >
      <div
        className="aspect-[2/3] p-8 md:p-10 flex flex-col justify-between shadow-[0_30px_60px_-20px_rgba(29,36,48,0.25)]"
        style={{
          background: bg,
          color: fg,
          borderRadius: "2px",
        }}
      >
        <div>
          <p
            className="text-[10px] uppercase tracking-widest opacity-70"
            style={{ fontFamily: SANS }}
          >
            Lorena Amadio
          </p>
          <div
            className="w-8 h-px mt-3 opacity-40"
            style={{ background: fg }}
          />
        </div>

        <div>
          <h4
            className={`text-2xl md:text-3xl leading-[1.1] ${italic ? "italic" : ""}`}
            style={{ fontFamily: SERIF, fontWeight: 500 }}
          >
            {title}
          </h4>
          <p
            className="mt-4 text-xs leading-relaxed opacity-80"
            style={{ fontFamily: SANS }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <p
        className="mt-6 text-sm leading-relaxed"
        style={{ color: MUTED, fontFamily: SANS }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function LorenaDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  const areas = [
    "Ansiedad",
    "Estrés",
    "Duelo",
    "Terapia de pareja",
    "Depresión",
    "Autoestima y límites",
    "Cambios vitales",
    "Bloqueo emocional",
    "Conflictos familiares",
    "Sobrecarga mental",
  ];

  const pillars = [
    {
      title: "Espacio Seguro y Ético",
      desc: "Confidencialidad absoluta, cero juicios. Cumplimiento total de la normativa de protección de datos.",
    },
    {
      title: "Herramientas Prácticas",
      desc: "Técnicas y recursos aplicables desde la primera sesión. Nada teórico sin aterrizaje.",
    },
    {
      title: "Resultados Duraderos",
      desc: "Métodos basados en evidencia, adaptados a ti, enfocados a generar un cambio sostenible.",
    },
    {
      title: "Comodidad Online",
      desc: "Videollamada por Google Meet desde cualquier lugar. La calidad y flexibilidad que necesitas.",
    },
  ];

  return (
    <div
      style={{
        background: BG,
        color: FG,
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
          className="text-xs uppercase tracking-widest hover:opacity-100 transition-opacity"
          style={{ color: MUTED, fontFamily: SANS, letterSpacing: "0.18em" }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: PEACH }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            Web publicada · psicolorenaamadio.com
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden px-6 md:px-12 pt-32 md:pt-40 pb-20"
      >
        {/* Breathing blobs */}
        <Blob
          className="absolute -top-20 -left-20 w-[420px] h-[420px] opacity-60"
          color={PEACH_SOFT}
        />
        <Blob
          className="absolute top-1/3 -right-32 w-[520px] h-[520px] opacity-40"
          color={BEIGE}
        />

        {/* Tulip decorations */}
        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="absolute top-24 right-10 md:right-24 w-20 md:w-32 opacity-30"
        >
          <TulipOrnament />
        </motion.div>
        <motion.div
          style={{ y: heroY }}
          className="absolute bottom-32 left-6 md:left-20 w-14 md:w-20 opacity-20 rotate-[-15deg]"
        >
          <TulipOrnament stroke={FG} />
        </motion.div>

        {/* Big 02 faint */}
        <motion.span
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute right-6 md:right-12 bottom-6 md:bottom-10 leading-none select-none pointer-events-none"
        >
          <span
            className="text-[28vw] md:text-[18vw] block italic"
            style={{
              fontFamily: SERIF,
              color: FG,
              opacity: 0.05,
              fontWeight: 500,
            }}
          >
            02
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
            className="flex items-center gap-3 mb-10"
          >
            <span
              className="text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full"
              style={{
                background: "white",
                color: FG,
                fontFamily: SANS,
                border: `1px solid ${LINE}`,
              }}
            >
              Web · Psicología
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              2025
            </span>
          </motion.div>

          <h1
            className="text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] max-w-5xl"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            <WordReveal text="Lorena" delay={0.3} />
            <br />
            <span className="italic" style={{ color: PEACH }}>
              <WordReveal text="Amadio." delay={0.5} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Diseñé y desarrollé la web de una psicóloga sanitaria. Un espacio
            online cálido, humano — con reservas en un solo paso y el cuidado
            que quien entra necesita.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://psicolorenaamadio.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
              style={{ background: FG, color: BG, fontFamily: SANS }}
            >
              psicolorenaamadio.com
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              Diseño · desarrollo · SEO
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Quiet quote ─── */}
      <section className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] opacity-10"
        >
          <TulipOrnament stroke={PEACH} />
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center">
          <p
            className="text-[clamp(2rem,6vw,5rem)] leading-[1.1] italic"
            style={{ fontFamily: SERIF, fontWeight: 500, color: FG }}
          >
            <WordReveal text="Si estás aquí," />
            <br />
            <WordReveal text="ya diste un paso" delay={0.4} />
            <br />
            <WordReveal text="importante." delay={0.9} />
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-12 text-[10px] uppercase tracking-[0.35em]"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            — del copy de Lorena
          </motion.p>
        </div>
      </section>

      {/* ─── What I built ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 border-t"
        style={{ borderColor: LINE }}
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
              style={{ color: FAINT, fontFamily: SANS }}
            >
              El proyecto
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.05]"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Una web que{" "}
              <span className="italic" style={{ color: PEACH }}>
                respira.
              </span>
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: SANS }}
            >
              Porque pedir cita a un psicólogo ya pide suficiente valor como
              para que la web también te ponga a prueba.
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              } as Variants
            }
            className="space-y-0"
          >
            {[
              "Identidad visual web, jerarquía y ritmo tipográfico",
              "Reservas online integradas con Calendly (pago + consentimiento en un paso)",
              "Formulario interno de nuevo paciente con validaciones y firma",
              "Newsletter con Supabase y confirmación por email",
              "SEO técnico: meta, sitemap, Open Graph, canonical, Schema",
              "Accesibilidad AA y rendimiento web como requisito de diseño",
              "Legal completo: aviso, cookies, privacidad y condiciones",
              "Landing de sus dos libros con enlace a Amazon",
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
                className="flex items-start gap-5 py-5 border-b"
                style={{ borderColor: LINE }}
              >
                <span
                  className="text-[10px] font-mono mt-1.5 opacity-40 shrink-0"
                  style={{ fontFamily: SANS }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-base md:text-lg leading-snug"
                  style={{ color: FG, fontFamily: SANS }}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ─── Booking flow ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: BG_WARM }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            La reserva
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05]"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Agenda online{" "}
            <span className="italic" style={{ color: PEACH }}>
              en un solo paso.
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Rellena el formulario, elige horario y paga. El consentimiento se
            firma en el mismo flujo. Sin idas y venidas.
          </p>
        </motion.div>

        <div className="mt-16 md:mt-20 relative">
          {/* Horizontal line connector */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px origin-left"
            style={{ background: PEACH }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {[
              {
                n: "01",
                title: "Rellena tus datos",
                desc: "Formulario de nuevo paciente con validaciones y documentación legal integrada.",
              },
              {
                n: "02",
                title: "Selecciona horario",
                desc: "Calendly integrado con la disponibilidad real. Elige el hueco que te funciona.",
              },
              {
                n: "03",
                title: "Paga y firma",
                desc: "Pago y consentimiento informado en el mismo paso. Recibes confirmación por email.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.2 + 0.3,
                  duration: 0.8,
                  ease: EASE,
                }}
                className="relative"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: BG,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <span
                    className="text-2xl italic"
                    style={{ fontFamily: SERIF, color: PEACH }}
                  >
                    {step.n}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed max-w-xs"
                  style={{ color: MUTED, fontFamily: SANS }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
            className="text-4xl md:text-6xl leading-[1.05] max-w-2xl"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Tres{" "}
            <span className="italic" style={{ color: PEACH }}>
              modalidades.
            </span>
          </motion.h2>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em]"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            (03)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ServiceCard
            index={0}
            duration="1 hora"
            title="Cita individual"
            blurb="Sesión completa para la exploración profunda de tus desafíos emocionales, el desarrollo de estrategias detalladas y el trabajo en tus objetivos a largo plazo."
            accent={false}
          />
          <ServiceCard
            index={1}
            duration="30 minutos"
            title="Individual Express"
            blurb="Sesión breve y focalizada, ideal para seguimiento, resolución de dudas puntuales o para recibir una herramienta específica que puedas aplicar ya."
            accent={true}
          />
          <ServiceCard
            index={2}
            duration="1 hora"
            title="Terapia de pareja"
            blurb="Espacio de colaboración enfocado en mejorar la comunicación, resolver conflictos, reconstruir la confianza y redefinir la dinámica de la relación."
            accent={false}
          />
        </div>
      </section>

      {/* ─── Áreas ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 border-t"
        style={{ borderColor: LINE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              En qué trabaja
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Las cosas que{" "}
              <span className="italic" style={{ color: PEACH }}>
                pesan.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              } as Variants
            }
            className="flex flex-wrap gap-3"
          >
            {areas.map((area) => (
              <motion.span
                key={area}
                variants={
                  {
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  } as Variants
                }
                className="px-5 py-2.5 rounded-full border text-sm"
                style={{
                  borderColor: LINE,
                  background: "white",
                  color: FG,
                  fontFamily: SANS,
                }}
              >
                {area}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Books ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: BG_WARM }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            Sus libros
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05]"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            Lecturas para tu{" "}
            <span className="italic" style={{ color: PEACH }}>
              bienestar.
            </span>
          </h2>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            Dos guías con lenguaje claro, ejercicios y propuestas para usar
            fuera de consulta. La web las presenta con el mismo cuidado que la
            terapia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
          <BookCover
            title="Cómo frenar en un mundo que va tan deprisa"
            subtitle="Recupera tu bienestar en la era del FoMO"
            description="Una guía práctica para recuperar tu atención, salir del piloto automático y aprender a pausar en medio del ruido digital."
            bg={PEACH}
            fg={FG}
          />
          <BookCover
            title="Abrir cuando"
            subtitle="Una guía emocional cuando la vida se siente demasiado"
            description="Tu botiquín de primeros auxilios emocionales. Palabras y herramientas precisas para los momentos en que más lo necesitas."
            bg={FG}
            fg={BG}
            italic
            delay={0.15}
          />
        </div>
      </section>

      {/* ─── Pillars ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl leading-[1.05] max-w-2xl mb-16"
          style={{
            fontFamily: SERIF,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          Cuatro{" "}
          <span className="italic" style={{ color: PEACH }}>
            principios
          </span>{" "}
          que ordenaron el diseño.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
              className="p-8 md:p-10 border flex gap-6 items-start"
              style={{ borderColor: LINE, background: "white" }}
            >
              <span
                className="text-3xl italic shrink-0"
                style={{ fontFamily: SERIF, color: PEACH }}
              >
                0{i + 1}
              </span>
              <div>
                <h3
                  className="text-2xl leading-tight"
                  style={{ fontFamily: SERIF, fontWeight: 600 }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: MUTED, fontFamily: SANS }}
                >
                  {p.desc}
                </p>
              </div>
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
              style={{ color: FAINT, fontFamily: SANS }}
            >
              Bajo el capó
            </p>
            <h3
              className="text-3xl md:text-4xl leading-[1.05]"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              Stack elegido para que la web{" "}
              <span className="italic" style={{ color: PEACH }}>
                no estorbe.
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "React",
              "React Router",
              "Vite",
              "Calendly",
              "Supabase",
              "Google Meet",
              "Resend · SMTP",
              "Cormorant Garamond",
              "DM Sans",
              "Schema · SEO",
              "Google Analytics",
              "Hostinger",
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
                  color: FG,
                  fontFamily: SANS,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden">
        <Blob
          className="absolute top-10 right-10 w-[420px] h-[420px] opacity-30"
          color={PEACH_SOFT}
        />
        <div className="relative max-w-4xl">
          <h2
            className="text-5xl md:text-8xl leading-[0.95]"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Un paso puede{" "}
            <span className="italic" style={{ color: PEACH }}>
              cambiar tu dirección.
            </span>
          </h2>
          <p
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            La web está en producción, recibe reservas a diario y lleva a
            Lorena pacientes que antes no habrían escrito. Eso es diseño que
            trabaja.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://psicolorenaamadio.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 rounded-full flex items-center gap-2"
              style={{ background: FG, color: BG, fontFamily: SANS }}
            >
              Visitar la web
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <Link
              href="/"
              data-hover
              className="text-xs uppercase tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: SANS }}
            >
              ← Volver al portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between"
        style={{ borderColor: LINE }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: SANS }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: FAINT, fontFamily: SANS }}
        >
          © {new Date().getFullYear()} · Lorena Amadio · Caso de estudio
        </span>
      </footer>
    </div>
  );
}
