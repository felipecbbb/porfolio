"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Palette — WavePanel ─── */
const NAVY = "#0d2f38";
const NAVY_DEEP = "#081e25";
const NAVY_CARD = "#143843";
const YELLOW = "#ffcc00";
const YELLOW_SOFT = "#fff3b3";
const CREAM = "#f5f1e4";
const WHITE = "#ffffff";
const MUTED_DARK = "rgba(255,255,255,0.65)";
const MUTED_LIGHT = "rgba(13,47,56,0.6)";
const FAINT_DARK = "rgba(255,255,255,0.35)";
const LINE_LIGHT = "rgba(13,47,56,0.12)";
const LINE_DARK = "rgba(255,255,255,0.14)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "'Manrope', system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

/* ─── Animated counter ─── */
function AnimatedNumber({
  value,
  duration = 1.6,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {Math.round(display).toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}

/* ─── WavePanel logo ─── */
function WaveLogo({ className }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-0.5 ${className ?? ""}`}>
      <span style={{ color: WHITE, fontWeight: 400 }}>wave</span>
      <span style={{ color: YELLOW, fontWeight: 800 }}>panel</span>
    </span>
  );
}

/* ─── Mock Panel (the product UI recreated) ─── */
function PanelMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: EASE }}
      className="relative w-full max-w-[520px] mx-auto"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
        style={{
          background: NAVY_DEEP,
          border: `1px solid ${LINE_DARK}`,
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: LINE_DARK, background: NAVY }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 text-[10px] tracking-wide"
            style={{ color: FAINT_DARK, fontFamily: MONO }}
          >
            panel.wavepanel.app
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: YELLOW }}
            />
            <span
              className="text-[9px] uppercase tracking-widest"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              live
            </span>
          </span>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4" style={{ background: NAVY }}>
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-[10px] uppercase tracking-widest"
                style={{ color: FAINT_DARK, fontFamily: MONO }}
              >
                Lun 20 Abr
              </p>
              <p
                className="text-base font-semibold mt-0.5"
                style={{ color: WHITE, fontFamily: DISPLAY }}
              >
                Buenos días, Entre Olas
              </p>
            </div>
            <span
              className="text-[9px] uppercase tracking-widest px-2 py-1"
              style={{
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              PRO+
            </span>
          </div>

          {/* Revenue card */}
          <div
            className="rounded-xl p-4 border"
            style={{
              borderColor: LINE_DARK,
              background: `linear-gradient(135deg, ${NAVY_CARD} 0%, ${NAVY} 100%)`,
            }}
          >
            <p
              className="text-[9px] uppercase tracking-widest"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              Ingresos · semana en curso
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: WHITE, fontFamily: DISPLAY, letterSpacing: "-0.02em" }}
            >
              <AnimatedNumber value={4280} suffix=" €" />
            </p>
            <div
              className="mt-2 flex items-center gap-3 text-[11px]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              <span style={{ color: YELLOW }}>↑ 18%</span>
              <span>vs. semana anterior</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Reservas", value: 47, suffix: "" },
              { label: "Ocupación", value: 82, suffix: "%" },
              { label: "Bonos", value: 12, suffix: "" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3 border"
                style={{ borderColor: LINE_DARK, background: NAVY_CARD }}
              >
                <p
                  className="text-[9px] uppercase tracking-widest"
                  style={{ color: FAINT_DARK, fontFamily: MONO }}
                >
                  {s.label}
                </p>
                <p
                  className="text-xl font-bold mt-1"
                  style={{ color: WHITE, fontFamily: DISPLAY }}
                >
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </p>
              </div>
            ))}
          </div>

          {/* Upcoming bookings */}
          <div>
            <p
              className="text-[9px] uppercase tracking-widest mb-2"
              style={{ color: FAINT_DARK, fontFamily: MONO }}
            >
              Próximas clases
            </p>
            <div className="space-y-1.5">
              {[
                { t: "09:30", title: "Grupal · Roche · 6 plazas", left: "3 libres", accent: YELLOW },
                { t: "11:00", title: "Individual · Carmen L.", left: "COMPLETA", accent: WHITE },
                { t: "16:00", title: "Surf Camp · Villa", left: "12/12", accent: YELLOW },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 1.2 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg border"
                  style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
                >
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded"
                    style={{
                      background: b.accent,
                      color: NAVY,
                      fontFamily: MONO,
                    }}
                  >
                    {b.t}
                  </span>
                  <span
                    className="flex-1 text-[11px]"
                    style={{ color: WHITE, fontFamily: DISPLAY }}
                  >
                    {b.title}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: FAINT_DARK, fontFamily: MONO }}
                  >
                    {b.left}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating yellow glow */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 blur-3xl"
        style={{ background: YELLOW }}
      />
    </motion.div>
  );
}

/* ─── Modules grid — 4 real modules from wavepanel.app ─── */
function ModulesArchitecture() {
  const modules = [
    {
      n: "Incluido",
      emoji: "⚡",
      title: "Core — Gestión esencial",
      desc: "Panel, calendario, reservas, clientes, actividades y web pública con subdominio propio.",
      highlight: true,
    },
    {
      n: "Adicional",
      emoji: "🛍️",
      title: "Tienda e-commerce",
      desc: "Productos físicos, stock, carrito, pedidos, cupones y bonos/packs configurables.",
    },
    {
      n: "Adicional",
      emoji: "🏕️",
      title: "Surf Camps & Alojamiento",
      desc: "Ediciones, fotos, FAQs, depósitos, rooms, check-in digital y control de accesos.",
    },
    {
      n: "Premium",
      emoji: "💬",
      title: "WhatsApp Business",
      desc: "Bot de reservas, confirmaciones automáticas, incidencias y notificaciones.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modules.map((m, i) => (
        <motion.div
          key={m.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
          className="relative p-8 md:p-10 border transition-colors"
          style={{
            borderColor: m.highlight ? YELLOW : LINE_DARK,
            background: m.highlight ? NAVY_CARD : "transparent",
          }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-3xl">{m.emoji}</span>
            <span
              className="text-[9px] uppercase tracking-widest px-2 py-1"
              style={{
                background: m.highlight ? YELLOW : "transparent",
                color: m.highlight ? NAVY : YELLOW,
                border: m.highlight ? "none" : `1px solid ${YELLOW}`,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              {m.n}
            </span>
          </div>
          <h3
            className="text-2xl md:text-3xl leading-tight"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: WHITE,
            }}
          >
            {m.title}
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            {m.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── How it works: 3 steps ─── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Elige tu plan",
      desc: "Selecciona el plan que mejor se adapte a tu escuela. Puedes cambiar en cualquier momento, sin permanencia.",
    },
    {
      n: "02",
      title: "Configura tu escuela",
      desc: "Sube tu logo, elige colores, añade tus actividades, precios e instructores. Todo desde el panel.",
    },
    {
      n: "03",
      title: "Empieza a recibir reservas",
      desc: "Tu web y el sistema de reservas están online en menos de 24 horas. Tus clientes reservan y pagan solos.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
          className="relative p-8 border"
          style={{
            borderColor: LINE_LIGHT,
            background: WHITE,
          }}
        >
          <span
            className="absolute -top-4 left-6 px-3 py-1.5 text-[11px] font-bold"
            style={{
              background: NAVY,
              color: YELLOW,
              fontFamily: MONO,
            }}
          >
            {s.n}
          </span>
          <h3
            className="mt-4 text-2xl md:text-3xl leading-tight"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.02em",
            }}
          >
            {s.title}
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
          >
            {s.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Pricing plans — real from wavepanel.app ─── */
function PricingPlans() {
  const plans = [
    {
      name: "Basic",
      price: "29",
      suffix: "€/mes",
      sub: "14 días gratis · sin tarjeta",
      features: [
        "Core — Panel + web pública",
        "Calendario y reservas",
        "Clientes, actividades",
        "Stripe, PayPal, Redsys",
        "Subdominio .wavepanel.app",
        "0% comisión por reserva",
      ],
      cta: "Probar 14 días",
    },
    {
      name: "Pro",
      price: "74",
      suffix: "€/mes",
      sub: "Lo que usa Entre Olas",
      popular: true,
      features: [
        "Todo lo de Basic",
        "+ Módulo Tienda e-commerce",
        "+ Módulo Surf Camps & Rooms",
        "+ WhatsApp Business",
        "Dominio custom incluido",
        "Soporte prioritario",
      ],
      cta: "Probar 14 días",
    },
    {
      name: "Lifetime",
      price: "2900",
      suffix: "€ pago único",
      sub: "Mensualidad opcional",
      features: [
        "Todos los módulos para siempre",
        "Pago único, sin mensualidad",
        "Opción de mensualidad para extras",
        "Actualizaciones incluidas",
        "Voto preferente en el roadmap",
        "Ideal para escuelas asentadas",
      ],
      cta: "Contactar",
      lifetime: true,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
          className="relative p-8 md:p-10 border flex flex-col"
          style={{
            borderColor: p.popular ? YELLOW : LINE_LIGHT,
            background: p.popular ? NAVY : WHITE,
            color: p.popular ? WHITE : NAVY,
          }}
        >
          {p.popular && (
            <span
              className="absolute -top-3 left-6 px-3 py-1 text-[9px] uppercase tracking-widest"
              style={{
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              Más popular
            </span>
          )}
          {p.lifetime && (
            <span
              className="absolute -top-3 left-6 px-3 py-1 text-[9px] uppercase tracking-widest"
              style={{
                background: NAVY,
                color: YELLOW,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              Pago único
            </span>
          )}
          <p
            className="text-[10px] uppercase tracking-widest mb-4"
            style={{
              color: p.popular ? YELLOW : MUTED_LIGHT,
              fontFamily: MONO,
            }}
          >
            {p.name}
          </p>
          <p
            className="text-6xl md:text-7xl leading-none"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            {p.price}
            <span
              className="text-base align-top ml-1"
              style={{
                color: p.popular ? YELLOW : MUTED_LIGHT,
                fontWeight: 500,
              }}
            >
              {p.suffix}
            </span>
          </p>
          <p
            className="mt-2 text-[11px] uppercase tracking-widest"
            style={{
              color: p.popular ? YELLOW : MUTED_LIGHT,
              fontFamily: MONO,
              fontWeight: 600,
            }}
          >
            {p.sub}
          </p>
          <ul className="mt-8 space-y-3 flex-1">
            {p.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-sm"
                style={{
                  color: p.popular ? MUTED_DARK : MUTED_LIGHT,
                  fontFamily: DISPLAY,
                }}
              >
                <span style={{ color: YELLOW }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="https://www.wavepanel.app"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="mt-10 block text-center text-xs uppercase tracking-widest py-3.5 transition-colors"
            style={{
              background: p.popular ? YELLOW : NAVY,
              color: p.popular ? NAVY : YELLOW,
              fontFamily: MONO,
              fontWeight: 700,
            }}
          >
            {p.cta} ↗
          </a>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main ─── */
export default function WavepanelDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div
      style={{
        background: NAVY,
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
          background: `${NAVY_DEEP}cc`,
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
        <WaveLogo className="text-sm md:text-base" />
        <div className="hidden md:flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: YELLOW }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{ color: MUTED_DARK, fontFamily: MONO }}
          >
            Producto propio
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero with PanelMock ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-32 md:pt-40 pb-16"
      >
        {/* Dark gradient wash */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 75% 20%, ${YELLOW}18 0%, transparent 45%), ${NAVY}`,
          }}
        />

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 w-full"
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
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              Software para escuelas de surf
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED_DARK, fontFamily: MONO }}
            >
              Caso de estudio · 01
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.4, ease: EASE }}
                  className="text-[clamp(3rem,11vw,9rem)] leading-[0.88]"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    color: WHITE,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Tu escuela.
                </motion.h1>
              </div>
              <div className="overflow-hidden -mt-1 md:-mt-2">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.55, ease: EASE }}
                  className="text-[clamp(3rem,11vw,9rem)] leading-[0.88]"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    color: YELLOW,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Digitalizada.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-10 max-w-xl text-base md:text-lg leading-relaxed"
                style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
              >
                Panel de gestión completo, web pública, reservas online,
                tienda y pagos. Todo lo que necesita una escuela de surf, kite
                o deportes acuáticos. Desde{" "}
                <span style={{ color: YELLOW, fontWeight: 700 }}>29€/mes</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="https://www.wavepanel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                  style={{
                    background: YELLOW,
                    color: NAVY,
                    fontFamily: MONO,
                    fontWeight: 700,
                  }}
                >
                  Visitar wavepanel.app
                  <span className="transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
                <Link
                  href="/proyecto/entre-olas-surf"
                  data-hover
                  className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 border flex items-center gap-2"
                  style={{
                    borderColor: LINE_DARK,
                    color: MUTED_DARK,
                    fontFamily: MONO,
                  }}
                >
                  Ver Entre Olas
                </Link>
              </motion.div>
            </div>

            <PanelMock />
          </div>
        </motion.div>
      </section>

      {/* ─── Stats strip ─── */}
      <section
        className="px-6 md:px-12 py-14 md:py-16 border-y"
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { n: "0", suffix: "%", label: "Comisión por reserva" },
            { n: "14", suffix: " días", label: "Gratis · sin tarjeta" },
            { n: "24", suffix: "h", label: "Activación completa" },
            { n: "100", suffix: "%", label: "Personalizable" },
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
                  color: i === 0 ? YELLOW : WHITE,
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedNumber value={parseInt(s.n)} />
                {s.suffix}
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

      {/* ─── Narrative — de cliente a producto ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            La historia
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Empezó como un encargo.{" "}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              Terminó siendo un producto.
            </span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: NAVY, fontFamily: DISPLAY }}
            >
              Entre Olas Surf necesitaba gestionar reservas, clases, surf
              camps y tienda. Le construí la plataforma a medida. Funcionó tan
              bien que pensé: esto lo necesitan todas las escuelas.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
            >
              WavePanel es la productización de aquel encargo. Mismo código
              probado en producción, ahora escalable a cualquier escuela de
              surf, kite o deportes acuáticos.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Modular architecture ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: NAVY, color: WHITE }}
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
            style={{ color: YELLOW, fontFamily: MONO }}
          >
            Arquitectura modular
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Paga solo por{" "}
            <span style={{ color: YELLOW }}>lo que necesitas.</span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            WavePanel se organiza en 4 módulos. Todos los planes incluyen
            Core. Añade encima solo los que necesites, cuando los necesites.
          </p>
        </motion.div>
        <ModulesArchitecture />
      </section>

      {/* ─── How it works ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            Cómo funciona
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.03em",
            }}
          >
            Activo en menos de{" "}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              24 horas.
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED_LIGHT, fontFamily: DISPLAY }}
          >
            Sin complicaciones técnicas. El cliente se encarga de enseñar
            surf; WavePanel se encarga de lo digital.
          </p>
        </motion.div>

        <HowItWorks />
      </section>

      {/* ─── Testimonial Entre Olas ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NAVY_DEEP, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: YELLOW, fontFamily: MONO }}
          >
            Lo que dicen las escuelas que lo usan
          </p>
          <blockquote
            className="text-2xl md:text-4xl leading-snug"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 500,
              color: WHITE,
              letterSpacing: "-0.01em",
            }}
          >
            «Antes gestionábamos las reservas en un Excel y el WhatsApp
            echaba humo. Con WavePanel los clientes{" "}
            <span style={{ color: YELLOW, fontWeight: 700 }}>
              reservan ellos solos por la web
            </span>
            , los pagos llegan directos al Stripe y yo solo tengo que
            preocuparme de estar en la playa.»
          </blockquote>
          <p
            className="mt-6 text-sm"
            style={{ color: MUTED_DARK, fontFamily: MONO }}
          >
            — Entre Olas Surf · Cádiz · ★★★★★
          </p>
        </motion.div>
      </section>

      {/* ─── Pricing ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: CREAM, color: NAVY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-12"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED_LIGHT, fontFamily: MONO }}
          >
            Planes
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[0.95]"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Precios{" "}
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              sin sorpresas.
            </span>
          </h2>
        </motion.div>
        <PricingPlans />
      </section>

      {/* ─── Cross-link Entre Olas ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NAVY, color: WHITE }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center max-w-6xl mx-auto"
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              El caso real
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[1]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Entre Olas Surf lo usa{" "}
              <span style={{ color: YELLOW }}>cada día.</span>
            </h3>
            <p
              className="mt-6 max-w-md text-base leading-relaxed"
              style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
            >
              La escuela de surf de Playa de Roche gestiona reservas, clases,
              bonos y surf camps con WavePanel. La plataforma que les
              construí a medida — ahora productizada para cualquiera.
            </p>
            <Link
              href="/proyecto/entre-olas-surf"
              data-hover
              className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 group"
              style={{
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              <span className="text-xs uppercase tracking-[0.25em]">
                Ver caso Entre Olas
              </span>
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div
            className="relative aspect-[4/3] overflow-hidden"
            style={{ background: NAVY_DEEP }}
          >
            <Image
              src="/projects/entre-olas-surf/aerial-house.jpg"
              alt="Villa privada del surf camp de Entre Olas, gestionado con WavePanel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Tech stack ─── */}
      <section
        className="px-6 md:px-12 py-20 md:py-24 border-t"
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP, color: WHITE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              Bajo el capó
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[0.95]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Stack pensado para{" "}
              <span style={{ color: YELLOW }}>escalar.</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Next.js 16",
              "Node.js",
              "TypeScript",
              "PostgreSQL",
              "Supabase",
              "Stripe",
              "Resend",
              "Vercel",
              "Tailwind",
              "Framer Motion",
              "Manrope",
              "GitHub Actions",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 text-xs"
                style={{
                  borderColor: LINE_DARK,
                  color: WHITE,
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
        className="px-6 md:px-12 py-32 md:py-44 relative overflow-hidden"
        style={{ background: NAVY, color: WHITE }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: YELLOW, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
            ¿Listo para{" "}
            <span style={{ color: YELLOW }}>digitalizar tu escuela?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED_DARK, fontFamily: DISPLAY }}
          >
            WavePanel está en producción. Mi producto, construido con lo que
            aprendí sacando Entre Olas adelante.
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://www.wavepanel.app"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{
                background: YELLOW,
                color: NAVY,
                fontFamily: MONO,
                fontWeight: 700,
              }}
            >
              Visitar wavepanel.app
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
        style={{ borderColor: LINE_DARK, background: NAVY_DEEP }}
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
          © {new Date().getFullYear()} · WavePanel · Producto propio
        </span>
      </footer>
    </div>
  );
}
