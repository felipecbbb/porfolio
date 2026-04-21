"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { ProjectDetail } from "@/data/projects";

/* ─── Animated counter ─── */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
      className="text-4xl md:text-6xl font-bold"
    >
      {value}
      {suffix}
    </motion.span>
  );
}

/* ─── Feature card with stagger ─── */
function FeatureCard({
  feature,
  index,
  accent,
}: {
  feature: string;
  index: number;
  accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="flex items-center gap-4 py-4 border-b border-current/10"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      />
      <span className="text-sm md:text-base">{feature}</span>
    </motion.div>
  );
}

/* ─── Gallery mock card ─── */
function GalleryCard({
  item,
  index,
  theme,
}: {
  item: { label: string; description: string };
  index: number;
  theme: ProjectDetail["theme"];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.77, 0, 0.175, 1],
      }}
      data-hover
      className="group relative overflow-hidden"
      style={{ backgroundColor: theme.accentLight }}
    >
      {/* Placeholder visual */}
      <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden">
        {/* Abstract decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
            style={{ backgroundColor: theme.fg }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
        <div className="relative z-10 text-center px-8">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3 opacity-50"
            style={{ color: theme.fg }}
          >
            {item.label}
          </p>
          <p className="text-sm opacity-70" style={{ color: theme.fg }}>
            {item.description}
          </p>
        </div>
      </div>

      {/* Hover reveal bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: theme.accent }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
      />
    </motion.div>
  );
}

/* ─── Result item ─── */
function ResultItem({
  result,
  index,
  accent,
}: {
  result: string;
  index: number;
  accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="flex items-start gap-4 text-sm md:text-base leading-relaxed"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400 }}
        className="mt-1.5 w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      />
      {result}
    </motion.li>
  );
}

/* ─── Main detail page ─── */
export default function ProjectDetailClient({
  project,
}: {
  project: ProjectDetail;
}) {
  const { theme } = project;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.fg, fontFamily: theme.font }}>
      {/* ─── Sticky top bar ─── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md border-b"
        style={{
          backgroundColor: theme.bg + "cc",
          borderColor: theme.fg + "10",
        }}
      >
        <Link
          href="/"
          data-hover
          className="font-mono text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2"
        >
          ← Felipe Cámara
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest opacity-30">
          {project.category}
        </span>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      >
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: theme.heroGradient,
            y: heroY,
          }}
        />

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.06 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.04 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full"
            style={{ backgroundColor: theme.fg }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 pt-32"
        >
          {/* Project number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-[8rem] md:text-[12rem] font-bold leading-none absolute top-24 right-8 md:right-16 select-none pointer-events-none"
          >
            {project.id}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: theme.accent }}
            >
              {project.category} · {project.year}
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.77, 0, 0.175, 1],
              }}
              className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-tighter leading-[0.85]"
            >
              {project.title}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 max-w-lg text-base md:text-lg leading-relaxed opacity-60"
          >
            {project.longDescription}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: theme.tagBg,
                  color: theme.tagText,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="font-mono text-xs opacity-30"
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Challenge & Solution ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <ChallengeBlock
            label="El reto"
            text={project.challenge}
            accent={theme.accent}
          />
          <ChallengeBlock
            label="La solución"
            text={project.solution}
            accent={theme.accent}
          />
        </div>
      </section>

      {/* ─── Divider with accent ─── */}
      <div className="px-6 md:px-12">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="h-px origin-left"
          style={{ backgroundColor: theme.accent + "40" }}
        />
      </div>

      {/* ─── Gallery ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <SectionHeader label="Vistas del proyecto" accent={theme.accent} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-16">
          {project.gallery.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} theme={theme} />
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: theme.fg, color: theme.bg }}
      >
        <SectionHeader label="Funcionalidades" accent={theme.accent} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-12">
          {project.features.map((feature, i) => (
            <FeatureCard
              key={feature}
              feature={feature}
              index={i}
              accent={theme.accent}
            />
          ))}
        </div>
      </section>

      {/* ─── Results ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <SectionHeader label="Resultados" accent={theme.accent} />
        <ul className="mt-12 space-y-6 max-w-2xl">
          {project.results.map((result, i) => (
            <ResultItem
              key={i}
              result={result}
              index={i}
              accent={theme.accent}
            />
          ))}
        </ul>
      </section>

      {/* ─── Testimonial ─── */}
      {project.testimonial && (
        <section className="px-6 md:px-12 py-24 md:py-32">
          <TestimonialBlock
            testimonial={project.testimonial}
            accent={theme.accent}
            accentLight={theme.accentLight}
          />
        </section>
      )}

      {/* ─── CTA / Next project ─── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 text-center"
        style={{ backgroundColor: theme.fg, color: theme.bg }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">
            ¿Te gustaría algo así?
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
            Hablemos de tu proyecto.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contacto"
              data-hover
              className="font-mono text-xs uppercase tracking-widest border px-8 py-4 hover:bg-white/10 transition-colors duration-300"
              style={{ borderColor: theme.bg + "40" }}
            >
              Contactar
            </Link>
            <Link
              href="/#trabajos"
              data-hover
              className="font-mono text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              ← Ver más trabajos
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-8 flex items-center justify-between border-t"
        style={{ borderColor: theme.fg + "10" }}
      >
        <Link
          href="/"
          data-hover
          className="font-mono text-xs opacity-30 hover:opacity-100 transition-opacity"
        >
          Felipe Cámara
        </Link>
        <span className="font-mono text-[10px] opacity-20">
          © {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─── */

function SectionHeader({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4"
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <h2 className="font-mono text-xs uppercase tracking-widest opacity-50">
        {label}
      </h2>
    </motion.div>
  );
}

function ChallengeBlock({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <h2 className="font-mono text-xs uppercase tracking-widest opacity-50">
          {label}
        </h2>
      </div>
      <p className="text-lg md:text-xl leading-relaxed opacity-70">{text}</p>
    </motion.div>
  );
}

function TestimonialBlock({
  testimonial,
  accent,
  accentLight,
}: {
  testimonial: { quote: string; name: string; role: string };
  accent: string;
  accentLight: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto text-center py-16 px-8 md:px-16 relative"
      style={{ backgroundColor: accentLight + "40" }}
    >
      {/* Big quote mark */}
      <span
        className="absolute top-6 left-8 text-[6rem] leading-none font-serif opacity-10 select-none"
        style={{ color: accent }}
      >
        &ldquo;
      </span>
      <p className="text-xl md:text-2xl leading-relaxed italic opacity-80 relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-8">
        <p className="font-medium">{testimonial.name}</p>
        <p className="font-mono text-xs opacity-40 mt-1">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}
