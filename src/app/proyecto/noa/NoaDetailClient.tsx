"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Palette ─── */
const NAVY = "#0b0f1a";
const BG = "#fafaf7";
const TEAL = "#0fb8a1";
const TEAL_SOFT = "#e6f7f5";
const LINE = "rgba(11,15,26,0.08)";
const MUTED = "rgba(11,15,26,0.55)";
const FAINT = "rgba(11,15,26,0.35)";

/* ─── Easing ─── */
const EASE = [0.77, 0, 0.175, 1] as const;

/* ─── Animated counter ─── */
function AnimatedNumber({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
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

  const formatted =
    decimals > 0
      ? display.toFixed(decimals).replace(".", ",")
      : Math.round(display).toLocaleString("es-ES");

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ─── Typewriter ─── */
function Typewriter({
  text,
  delay = 0,
  speed = 28,
  caret = true,
  className,
}: {
  text: string;
  delay?: number;
  speed?: number;
  caret?: boolean;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setI((v) => {
          if (v >= text.length) {
            clearInterval(interval);
            return v;
          }
          return v + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [isInView, delay, speed, text.length]);

  return (
    <span ref={ref} className={className}>
      {text.slice(0, i)}
      {caret && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{ color: TEAL }}
        >
          ▌
        </motion.span>
      )}
    </span>
  );
}

/* ─── Scroll-linked parallax helper ─── */
function useParallax(distance: number) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

/* ─── Floating dashboard mock ─── */
function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ rotate, y }}
      className="relative w-full max-w-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: EASE }}
        className="rounded-2xl border bg-white shadow-[0_30px_80px_-20px_rgba(11,15,26,0.18)]"
        style={{ borderColor: LINE }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: LINE }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span
            className="ml-3 font-mono text-[10px] tracking-wide"
            style={{ color: FAINT }}
          >
            heynoa.es/dashboard
          </span>
        </div>

        <div className="p-5 space-y-4">
          {/* Greeting */}
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: FAINT }}
            >
              18 abr 2026
            </p>
            <p className="text-lg font-semibold mt-1" style={{ color: NAVY }}>
              Buenos días, Felipe
            </p>
          </div>

          {/* Balance */}
          <div
            className="rounded-xl p-4 border"
            style={{ borderColor: LINE, background: TEAL_SOFT }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: FAINT }}
            >
              Balance mes
            </p>
            <p
              className="text-3xl font-bold tracking-tight mt-1"
              style={{ color: NAVY }}
            >
              +
              <AnimatedNumber value={2847} />
              <span className="text-xl opacity-60"> €</span>
            </p>
            <div className="flex gap-4 mt-2 text-[11px]" style={{ color: MUTED }}>
              <span>
                <span style={{ color: TEAL }}>↑</span> 4.280 €
              </span>
              <span>
                <span style={{ color: "#e05b5b" }}>↓</span> 1.433 €
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-3 border"
              style={{ borderColor: LINE }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: FAINT }}
              >
                Facturas
              </p>
              <p className="text-xl font-bold mt-1" style={{ color: NAVY }}>
                <AnimatedNumber value={16} />
              </p>
              <p className="text-[10px]" style={{ color: MUTED }}>
                2 pendientes · 467,50 € sin cobrar
              </p>
            </div>
            <div
              className="rounded-xl p-3 border"
              style={{ borderColor: LINE }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: FAINT }}
              >
                Próximo impuesto
              </p>
              <p className="text-xl font-bold mt-1" style={{ color: NAVY }}>
                <AnimatedNumber value={1204} /> €
              </p>
              <p className="text-[10px]" style={{ color: MUTED }}>
                Vence en 17 días
              </p>
            </div>
          </div>

          {/* AI prompt */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="rounded-xl p-3 border"
            style={{
              borderColor: TEAL,
              background: "white",
            }}
          >
            <div className="flex items-start gap-2">
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: TEAL, color: "white" }}
              >
                ✦ Noa
              </span>
              <p className="text-[12px] leading-snug" style={{ color: NAVY }}>
                <Typewriter
                  text="Tienes 2 facturas pendientes por 467,50 €. Estudio Luna lleva 30 días. ¿Envío recordatorio?"
                  delay={1800}
                  speed={18}
                  caret={false}
                />
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full text-white"
                style={{ background: NAVY }}
              >
                Enviar
              </button>
              <button
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ borderColor: LINE, color: MUTED }}
              >
                Ignorar
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating decoration */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-80 blur-2xl"
        style={{ background: TEAL }}
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-40 blur-3xl"
        style={{ background: "#4c6bff" }}
      />
    </motion.div>
  );
}

/* ─── Chat bubble ─── */
function ChatBubble({
  from,
  text,
  delay = 0,
  typing = false,
}: {
  from: "user" | "noa";
  text: string;
  delay?: number;
  typing?: boolean;
}) {
  const isUser = from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-md rounded-2xl px-5 py-3 text-sm md:text-base leading-snug`}
        style={{
          background: isUser ? NAVY : "white",
          color: isUser ? BG : NAVY,
          border: isUser ? "none" : `1px solid ${LINE}`,
        }}
      >
        {!isUser && (
          <p
            className="font-mono text-[10px] uppercase tracking-widest mb-1"
            style={{ color: TEAL }}
          >
            ✦ Noa
          </p>
        )}
        {typing ? (
          <Typewriter text={text} delay={delay * 1000 + 400} speed={22} />
        ) : (
          text
        )}
      </div>
    </motion.div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  emoji,
  title,
  desc,
  index,
}: {
  emoji: string;
  title: string;
  desc: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      className="relative p-6 md:p-8 border group cursor-default overflow-hidden"
      style={{ borderColor: LINE, background: hovered ? "white" : "transparent" }}
    >
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ background: TEAL }}
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <div className="flex items-start justify-between">
        <span className="text-2xl">{emoji}</span>
        <span
          className="font-mono text-[10px]"
          style={{ color: FAINT }}
        >{`0${index + 1}`}</span>
      </div>
      <h4 className="mt-6 text-lg font-semibold" style={{ color: NAVY }}>
        {title}
      </h4>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: MUTED }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ─── Integrations data ─── */
const integrations = [
  { name: "BBVA", status: "live" },
  { name: "ING", status: "live" },
  { name: "Revolut", status: "live" },
  { name: "CaixaBank", status: "live" },
  { name: "Telegram", status: "live" },
  { name: "Google Calendar", status: "soon" },
  { name: "Gmail", status: "soon" },
  { name: "Google Drive", status: "soon" },
  { name: "Instagram", status: "soon" },
  { name: "Shopify", status: "soon" },
  { name: "Spotify", status: "soon" },
  { name: "Home Assistant", status: "soon" },
] as const;

/* ─── Main component ─── */
export default function NoaDetailClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  // cursor gradient
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 15 });
  const springY = useSpring(my, { stiffness: 60, damping: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      style={{
        background: BG,
        color: NAVY,
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="fixed pointer-events-none z-0 opacity-[0.06] blur-3xl"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          width: 500,
          height: 500,
          background: TEAL,
          borderRadius: "50%",
        }}
      />

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
          className="font-mono text-xs uppercase tracking-widest hover:opacity-100 transition-opacity"
          style={{ color: MUTED }}
        >
          ← Felipe Cámara
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: TEAL }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: FAINT }}
          >
            En producción · Sigo construyendo
          </span>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-32 md:pt-40 pb-16"
      >
        {/* Grid background */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${NAVY} 1px, transparent 1px), linear-gradient(90deg, ${NAVY} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            y: heroY,
          }}
        />

        {/* Big 01 bg */}
        <motion.span
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute -right-6 md:right-8 top-16 md:top-20 font-bold select-none pointer-events-none"
        >
          <span
            className="text-[22vw] md:text-[16vw] font-bold leading-none block"
            style={{ color: NAVY, opacity: 0.04 }}
          >
            01
          </span>
        </motion.span>

        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 w-full items-center"
        >
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: TEAL_SOFT, color: NAVY }}
              >
                SaaS · Asistente financiero IA
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: FAINT }}
              >
                2026
              </span>
            </motion.div>

            <div className="overflow-hidden mt-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
                className="text-[clamp(4rem,14vw,12rem)] font-bold tracking-tighter leading-[0.82]"
              >
                Noa.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-6 text-xl md:text-2xl max-w-xl leading-snug"
              style={{ color: NAVY }}
            >
              Tu asistente personal con IA. Todo lo que necesitas, un solo sitio.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-6 max-w-lg text-base leading-relaxed"
              style={{ color: MUTED }}
            >
              La diseñé, desarrollé y sigo construyéndola. El producto que los
              autónomos españoles necesitaban — y nadie estaba haciendo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://heynoa.es"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-full flex items-center gap-2 transition-colors"
                style={{ background: NAVY, color: BG }}
              >
                heynoa.es
                <span className="transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <span
                className="font-mono text-xs"
                style={{ color: FAINT }}
              >
                Diseño + desarrollo + producto
              </span>
            </motion.div>
          </div>

          {/* Right — mock */}
          <div className="relative flex justify-center lg:justify-end">
            <DashboardMock />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: FAINT }}
          >
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-6"
            style={{ background: NAVY, opacity: 0.3 }}
          />
        </motion.div>
      </section>

      {/* ─── Stats band ─── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-b" style={{ borderColor: LINE }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-widest mb-10"
          style={{ color: FAINT }}
        >
          Lo que hay dentro
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { value: 12, suffix: "+", label: "integraciones" },
            { value: 3, suffix: "", label: "plataformas" },
            { value: 6, suffix: "", label: "módulos principales" },
            { value: 100, suffix: "%", label: "construido por mí" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
            >
              <p className="text-5xl md:text-6xl font-bold tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="mt-2 font-mono text-xs uppercase tracking-widest"
                style={{ color: MUTED }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── What I built — ownership ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: FAINT }}
            >
              El proyecto
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
              Producto
              <br />
              completo.
              <br />
              <span style={{ color: TEAL }}>End-to-end.</span>
            </h2>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
            className="space-y-5"
          >
            {[
              "Arquitectura técnica y decisiones de producto",
              "Landing, dashboard, onboarding y pasarela Stripe",
              "Integración bancaria vía Open Banking: BBVA, ING, Revolut, CaixaBank",
              "IA nativa conectada a OpenAI para consultas en lenguaje natural",
              "Bot de Telegram (@heynoa_bot) para entrada rápida desde el móvil",
              "6 módulos: Finanzas, Facturación, Impuestos, CRM, Productividad, Noa IA",
              "Sigo construyendo. Mantenimiento y nuevas features en producción.",
            ].map((line) => (
              <motion.li
                key={line}
                variants={
                  {
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  } as Variants
                }
                className="flex items-start gap-4 pb-5 border-b"
                style={{ borderColor: LINE }}
              >
                <span
                  className="mt-2 w-2 h-2 rounded-full shrink-0"
                  style={{ background: TEAL }}
                />
                <span className="text-base md:text-lg" style={{ color: NAVY }}>
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ─── AI chat section ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: NAVY, color: BG }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-widest mb-6"
          style={{ color: TEAL }}
        >
          Noa IA
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] max-w-3xl"
        >
          Preguntas en tu idioma.
          <br />
          <span style={{ opacity: 0.4 }}>
            Respuestas con cifras reales.
          </span>
        </motion.h2>

        <div className="mt-16 max-w-2xl mx-auto space-y-4">
          <ChatBubble from="user" text="¿Quién me debe dinero?" delay={0} />
          <ChatBubble
            from="noa"
            text="Estudio Luna — 467,50 €. 30 días de retraso. ¿Envío recordatorio?"
            delay={0.6}
            typing
          />
          <ChatBubble from="user" text="¿Cuánto de IVA llevo este trimestre?" delay={2.4} />
          <ChatBubble
            from="noa"
            text="1.204 € a pagar. Vence el 20 de julio. Puedo preparártelo."
            delay={3}
            typing
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center max-w-xl mx-auto text-sm"
          style={{ color: "rgba(250,250,247,0.55)" }}
        >
          Conectada al banco, a las facturas y al calendario. Sin tener que
          explicarle nada — Noa ya sabe.
        </motion.p>
      </section>

      {/* ─── 3 pilares ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline justify-between mb-16"
        >
          <p
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: FAINT }}
          >
            Los pilares
          </p>
          <span
            className="font-mono text-[10px]"
            style={{ color: FAINT }}
          >
            (03)
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {[
            {
              n: "01",
              title: "Entiende tu negocio",
              desc:
                "Se conecta a tus bancos, lee tus facturas, conoce a tus clientes. No necesitas explicarle nada.",
            },
            {
              n: "02",
              title: "Actúa por ti",
              desc:
                "Crea facturas, clasifica gastos, avisa de impagos, prepara los impuestos. Tú decides, Noa ejecuta.",
            },
            {
              n: "03",
              title: "Se conecta con todo",
              desc:
                "Bancos, calendario, redes, ecommerce, domótica. Cualquier plataforma que uses.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="relative p-8 md:p-10 border"
              style={{ borderColor: LINE }}
            >
              <span
                className="absolute top-6 right-6 font-mono text-[10px]"
                style={{ color: FAINT }}
              >
                {p.n}
              </span>
              <span
                className="block w-8 h-8 rounded-full"
                style={{ background: TEAL_SOFT }}
              >
                <span
                  className="block w-3 h-3 rounded-full translate-x-2.5 translate-y-2.5"
                  style={{ background: TEAL }}
                />
              </span>
              <h3 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight">
                {p.title}
              </h3>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: MUTED }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 6 funciones grid ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ borderColor: LINE }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] max-w-2xl"
        >
          Seis módulos.
          <br />
          <span style={{ color: MUTED }}>Un solo cerebro.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {[
            {
              emoji: "💰",
              title: "Finanzas",
              desc:
                "Sync bancario cada hora. Clasificación con IA. Gastos deducibles. Dashboard en tiempo real.",
            },
            {
              emoji: "📄",
              title: "Facturación",
              desc:
                "Facturas PDF con plantillas. Retención, IVA, IGIC. Envío por email en un click.",
            },
            {
              emoji: "🧮",
              title: "Impuestos",
              desc:
                "IRPF, IVA, IGIC, Modelo 130. Calculados desde tus facturas reales. Alertas trimestrales.",
            },
            {
              emoji: "👥",
              title: "CRM",
              desc:
                "Contactos con historial, notas, tags. Se crean solos cuando importas facturas.",
            },
            {
              emoji: "📅",
              title: "Productividad",
              desc:
                "Calendario con 3 vistas. Proyectos con deadline. Timer flotante para time tracking.",
            },
            {
              emoji: "✦",
              title: "Noa IA",
              desc:
                "«¿Quién me debe dinero?» — Noa accede a tus datos y responde con cifras reales.",
            },
          ].map((f, i) => (
            <FeatureCard key={f.title} index={i} {...f} />
          ))}
        </div>
      </section>

      {/* ─── Integraciones marquee ─── */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="px-6 md:px-12 flex items-baseline justify-between mb-10">
          <p
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: FAINT }}
          >
            Integraciones
          </p>
          <p
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: FAINT }}
          >
            {integrations.filter((i) => i.status === "live").length} en vivo ·{" "}
            {integrations.filter((i) => i.status === "soon").length} próximas
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${BG}, transparent)`,
            }}
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${BG}, transparent)`,
            }}
          />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...integrations, ...integrations].map((it, i) => (
              <div
                key={`${it.name}-${i}`}
                className="flex items-center gap-2 border px-5 py-3 rounded-full"
                style={{
                  borderColor: LINE,
                  background: it.status === "live" ? "white" : "transparent",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: it.status === "live" ? TEAL : FAINT,
                  }}
                />
                <span
                  className="font-mono text-sm"
                  style={{
                    color: it.status === "live" ? NAVY : MUTED,
                  }}
                >
                  {it.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-sm max-w-md mx-auto"
          style={{ color: MUTED }}
        >
          Y cualquier plataforma que conectes vía API. Noa crece.
        </motion.p>
      </section>

      {/* ─── Multiplataforma ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ borderColor: LINE }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl"
        >
          <p
            className="font-mono text-[10px] uppercase tracking-widest mb-4"
            style={{ color: FAINT }}
          >
            Multiplataforma
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
            Un cerebro.
            <br />
            <span style={{ color: MUTED }}>Todas las interfaces.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              tag: "WEB",
              title: "heynoa.es",
              desc: "Panel completo desde cualquier navegador. PWA instalable.",
              state: "En vivo",
            },
            {
              tag: "TELEGRAM",
              title: "@heynoa_bot",
              desc: "Comandos rápidos, fotos de tickets, chat con Noa.",
              state: "En vivo",
            },
            {
              tag: "DEVICE",
              title: "noa",
              desc: "Pantalla táctil con voz. Widgets, música, domótica.",
              state: "Próximamente",
            },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: EASE }}
              className="p-8 md:p-10 border relative overflow-hidden"
              style={{
                borderColor: LINE,
                background: i === 2 ? "transparent" : "white",
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: TEAL }}
              >
                {p.tag}
              </span>
              <p className="mt-4 text-2xl font-bold tracking-tight">
                {p.title}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: MUTED }}
              >
                {p.desc}
              </p>
              <div
                className="mt-8 pt-4 border-t font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"
                style={{ borderColor: LINE, color: p.state === "En vivo" ? TEAL : FAINT }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: p.state === "En vivo" ? TEAL : FAINT }}
                />
                {p.state}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Device mockup callout ─── */}
      <DeviceCallout />

      {/* ─── Tech stack ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t" style={{ borderColor: LINE }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: FAINT }}
            >
              Bajo el capó
            </p>
            <h3 className="mt-4 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
              Stack elegido
              <br />
              <span style={{ color: MUTED }}>sin fuegos artificiales.</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Next.js",
              "Node.js",
              "Express",
              "PostgreSQL",
              "Stripe",
              "OpenAI",
              "Gemini",
              "Telegram Bot API",
              "Open Banking APIs",
              "Tailwind",
              "Framer Motion",
              "Vercel",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 font-mono text-xs"
                style={{ borderColor: LINE, color: NAVY }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${TEAL}, transparent 60%)`,
          }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl"
        >
          Noa sigue
          <br />
          <span style={{ color: TEAL }}>creciendo.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mt-6 max-w-xl text-base md:text-lg"
          style={{ color: MUTED }}
        >
          Cada semana hay features nuevas, módulos nuevos, integraciones nuevas.
          Building in public, en producción.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="relative mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://heynoa.es"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="group font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-full flex items-center gap-2"
            style={{ background: NAVY, color: BG }}
          >
            Ver Noa en vivo
            <span className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <Link
            href="/"
            data-hover
            className="font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Volver al portfolio
          </Link>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between"
        style={{ borderColor: LINE }}
      >
        <Link
          href="/"
          data-hover
          className="font-mono text-xs opacity-40 hover:opacity-100 transition-opacity"
        >
          Felipe Cámara
        </Link>
        <span
          className="font-mono text-[10px]"
          style={{ color: FAINT }}
        >
          © {new Date().getFullYear()} · Noa · Caso de estudio
        </span>
      </footer>
    </div>
  );
}

/* ─── Device callout (separate component for clarity) ─── */
function DeviceCallout() {
  const { ref, y } = useParallax(30);
  return (
    <section
      ref={ref}
      className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
      style={{ background: TEAL_SOFT }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-widest mb-4"
            style={{ color: NAVY, opacity: 0.5 }}
          >
            Noa Device
          </p>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
            Tu negocio,
            <br />
            <span style={{ color: TEAL }}>siempre visible.</span>
          </h3>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: NAVY, opacity: 0.7 }}
          >
            Una pantalla inteligente en tu mesa. Widgets personalizables,
            asistente por voz, control de domótica, música — todo con las manos
            libres.
          </p>
          <ul className="mt-8 space-y-3 text-sm" style={{ color: NAVY }}>
            {[
              "Pantalla táctil de 7–10 pulgadas",
              "«Hey Noa, ¿quién me debe?» — asistente por voz",
              "Widgets de finanzas, calendario, música",
              "Control de luces, temperatura y dispositivos",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: TEAL }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div style={{ y }} className="flex justify-center">
          {/* Device mock */}
          <div
            className="relative w-full max-w-sm aspect-[4/3] rounded-[28px] p-4 shadow-[0_40px_80px_-20px_rgba(11,15,26,0.25)]"
            style={{
              background: NAVY,
              border: `1px solid ${NAVY}`,
            }}
          >
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full"
              style={{ background: "rgba(250,250,247,0.1)" }}
            />
            <div
              className="w-full h-full rounded-[16px] p-4 flex flex-col justify-between"
              style={{ background: BG }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold" style={{ color: NAVY }}>
                  Buenos días
                </p>
                <p
                  className="font-mono text-[10px]"
                  style={{ color: FAINT }}
                >
                  9:41
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="rounded-lg p-2"
                  style={{ background: TEAL_SOFT }}
                >
                  <p
                    className="font-mono text-[8px] uppercase"
                    style={{ color: FAINT }}
                  >
                    Balance
                  </p>
                  <p className="text-lg font-bold" style={{ color: NAVY }}>
                    +2.847 €
                  </p>
                </div>
                <div
                  className="rounded-lg p-2 border"
                  style={{ borderColor: LINE }}
                >
                  <p
                    className="font-mono text-[8px] uppercase"
                    style={{ color: FAINT }}
                  >
                    Próximo
                  </p>
                  <p className="text-xs font-semibold mt-1" style={{ color: NAVY }}>
                    10:00 Cliente
                  </p>
                  <p className="text-xs" style={{ color: MUTED }}>
                    14:00 Entrega
                  </p>
                </div>
              </div>
              <div
                className="text-[10px] font-mono px-2 py-1.5 rounded-md flex items-center gap-2"
                style={{ background: NAVY, color: BG }}
              >
                <span style={{ color: TEAL }}>✦</span>
                <Typewriter
                  text="Hey Noa, ¿qué tengo hoy?"
                  delay={600}
                  speed={38}
                  caret
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
