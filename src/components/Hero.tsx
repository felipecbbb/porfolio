"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const line1 = "Desarrollo.";
const line2 = "Diseño.";
const line3 = "Estrategia.";

const letterVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.77, 0, 0.175, 1] as const,
      delay: i * 0.03,
    },
  }),
};

function AnimatedLine({
  text,
  baseDelay,
}: {
  text: string;
  baseDelay: number;
}) {
  return (
    <span className="flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/hero-ambient.jpg"
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(100%) contrast(1.05)", opacity: 0.18 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--background) 0%, transparent 25%, transparent 60%, var(--background) 100%)",
          }}
        />
      </div>

      {/* Main heading */}
      <div className="flex-1 flex items-center">
        <div>
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
            <AnimatedLine text={line1} baseDelay={0} />
            <AnimatedLine text={line2} baseDelay={12} />
            <AnimatedLine text={line3} baseDelay={22} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
            className="mt-8 max-w-md text-foreground/50 font-mono text-sm leading-relaxed"
          >
            No solo diseño, no solo programo, no solo estrategia.
            <br />
            Las tres cosas. Entiendo el negocio, diseño la solución y la
            construyo.
          </motion.p>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="flex items-end justify-between border-t border-foreground/10 pt-6"
      >
        <div className="font-mono text-xs text-foreground/40 space-y-1">
          <p>Felipe Cámara Barroso</p>
          <p>Freelance — España</p>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="font-mono text-xs text-foreground/40"
        >
          scroll ↓
        </motion.div>

        <div className="font-mono text-xs text-foreground/40">
          <p>Disponible para proyectos</p>
        </div>
      </motion.div>
    </section>
  );
}
