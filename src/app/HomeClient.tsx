"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { type ProjectDetail } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";
import ProjectCardVertical from "@/components/ProjectCardVertical";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import SiteFooter from "@/components/SiteFooter";
import { INK, BG, CREAM, YELLOW, MUTED, LINE, Mark, Serif } from "@/lib/brand";

const SANS =
  "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif";

export default function HomeClient({ projects }: { projects: ProjectDetail[] }) {
  return (
    <main
      style={{
        background: CREAM,
        color: INK,
        minHeight: "100dvh",
        fontFamily: SANS,
        letterSpacing: "-0.005em",
        overflow: "hidden",
      }}
    >
      <BlendNav active="home" />
      <HeroXXL />
      <ThreeWords />
      <FeaturedProjects projects={projects.slice(0, 4)} />
      <Manifesto />
      <ServicesList />
      <AboutSplit />
      <TestimonialsBlock />
      <ContactCTA />
      <SiteFooter />
    </main>
  );
}

/* =========================================
   HERO — propuesta de valor (vender)
   ========================================= */
function HeroXXL() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section
      className="grid-paper"
      style={{
        padding: "clamp(120px, 18vh, 200px) clamp(20px, 5vw, 77px) 60px",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        background: CREAM,
      }}
    >
      <motion.div style={{ y, opacity }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            {t.hero.name}
          </span>
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: 22,
          }}
        >
          {t.hero.badge}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(38px, 6.4vw, 96px)",
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: 1100,
          }}
        >
          {t.hero.headPre}{" "}
          <Mark>{t.hero.headMark}</Mark> {t.hero.headPost}
        </motion.h1>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            marginTop: 44,
          }}
        >
          <Link
            href="/contacto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 30px",
              borderRadius: 999,
              background: INK,
              color: BG,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.01em",
              transition: "transform 0.25s ease, opacity 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t.hero.ctaPrimary} <span>→</span>
          </Link>
          <Link
            href="/proyectos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 30px",
              borderRadius: 999,
              border: `1.5px solid ${INK}`,
              color: INK,
              background: "transparent",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.01em",
              transition: "background 0.25s ease, color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = INK;
              e.currentTarget.style.color = BG;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = INK;
            }}
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 56,
            paddingTop: 36,
            borderTop: `1px solid ${LINE}`,
            maxWidth: 1100,
          }}
          className="hero-foot"
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {t.hero.location}
          </div>
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            {t.hero.bodyA}{" "}
            <span style={{ color: MUTED }}>{t.hero.bodyB}</span>
          </p>
        </div>
      </motion.div>

      <ScrollHint />
      <style jsx>{`
        @media (max-width: 720px) {
          :global(.hero-foot) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-top: 36px !important;
            padding-top: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

function ScrollHint() {
  const { t } = useLang();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 32,
        left: "clamp(20px, 5vw, 77px)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: MUTED,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
      className="hero-scroll"
    >
      <span
        style={{ width: 28, height: 1, background: MUTED, display: "inline-block" }}
      />
      {t.hero.scroll}
      <style jsx>{`
        @media (max-width: 720px) {
          .hero-scroll {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================
   EN 3 PALABRAS (pág. 4 del PDF)
   ========================================= */
function ThreeWords() {
  const { lang } = useLang();
  const d = {
    es: { lead: "En 3 palabras:", words: ["Desarrollo", "Estrategia", "Automatización"] },
    en: { lead: "In 3 words:", words: ["Development", "Strategy", "Automation"] },
    de: { lead: "In 3 Worten:", words: ["Entwicklung", "Strategie", "Automatisierung"] },
  }[lang];

  return (
    <section
      className="grid-paper-dark"
      style={{
        background: INK,
        color: BG,
        padding: "clamp(72px, 11vw, 130px) clamp(20px, 5vw, 77px)",
        overflow: "hidden",
      }}
    >
      <Serif
        style={{
          display: "block",
          color: YELLOW,
          fontSize: "clamp(34px, 6vw, 80px)",
          lineHeight: 1,
          marginBottom: "clamp(28px, 4vw, 48px)",
        }}
      >
        {d.lead}
      </Serif>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {d.words.map((w, i) => (
          <div
            key={w}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "clamp(14px, 2.5vw, 32px)",
              padding: "clamp(12px, 1.6vw, 20px) 0",
              borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 600,
                color: YELLOW,
                letterSpacing: "0.1em",
                width: "1.6em",
                flexShrink: 0,
              }}
            >
              0{i + 1}
            </span>
            <span
              style={{
                fontSize: "clamp(30px, 5.5vw, 76px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {w}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================
   MANIFIESTO (págs. 2-3 del PDF, con subrayado)
   ========================================= */
function Manifesto() {
  const { lang } = useLang();
  const d = {
    es: {
      label: "· El contexto",
      p1mark: "La inteligencia artificial está cambiando la forma de trabajar, vender y construir negocios.",
      p1rest:
        " Pero para muchas empresas sigue siendo un territorio complejo, lleno de ruido, promesas exageradas y herramientas difíciles de implementar.",
      p2mark: "Yo actúo como puente entre la tecnología y los resultados reales.",
      p2rest:
        " Combino desarrollo web, aplicaciones digitales e inteligencia artificial para crear soluciones prácticas: trabajar mejor, automatizar procesos y crecer de forma más eficiente.",
    },
    en: {
      label: "· The context",
      p1mark: "Artificial intelligence is changing how we work, sell and build businesses.",
      p1rest:
        " But for many companies it's still a complex territory — full of noise, overblown promises and tools that are hard to implement.",
      p2mark: "I act as the bridge between technology and real results.",
      p2rest:
        " I combine web development, digital apps and AI to create practical solutions: work better, automate processes and grow more efficiently.",
    },
    de: {
      label: "· Der Kontext",
      p1mark: "Künstliche Intelligenz verändert, wie wir arbeiten, verkaufen und Unternehmen aufbauen.",
      p1rest:
        " Doch für viele Firmen bleibt es komplexes Terrain — voller Lärm, übertriebener Versprechen und schwer umsetzbarer Tools.",
      p2mark: "Ich bin die Brücke zwischen Technologie und echten Ergebnissen.",
      p2rest:
        " Ich verbinde Webentwicklung, digitale Apps und KI zu praktischen Lösungen: besser arbeiten, Prozesse automatisieren und effizienter wachsen.",
    },
  }[lang];

  const para: React.CSSProperties = {
    fontSize: "clamp(24px, 3.4vw, 46px)",
    lineHeight: 1.32,
    letterSpacing: "-0.02em",
    fontWeight: 500,
    margin: 0,
    maxWidth: 1180,
  };

  return (
    <section
      className="grid-paper"
      style={{
        background: CREAM,
        color: INK,
        padding: "clamp(90px, 14vw, 150px) clamp(20px, 5vw, 77px)",
        borderTop: "1px solid rgba(26,25,22,0.1)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: MUTED,
          marginBottom: 40,
        }}
      >
        {d.label}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ ...para, marginBottom: "clamp(36px, 5vw, 64px)" }}
      >
        <Mark>{d.p1mark}</Mark>
        <span style={{ color: MUTED }}>{d.p1rest}</span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        style={para}
      >
        <Mark>{d.p2mark}</Mark>
        <span style={{ color: MUTED }}>{d.p2rest}</span>
      </motion.p>
    </section>
  );
}

/* =========================================
   FEATURED PROJECTS (preview of 4)
   ========================================= */
const DEST_LINK = {
  es: "Destacados",
  en: "Featured",
  de: "Highlights",
};

function FeaturedProjects({ projects }: { projects: ProjectDetail[] }) {
  const { t, lang } = useLang();
  return (
    <section
      className="grid-paper"
      style={{
        padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 77px)",
        background: CREAM,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 60,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 14,
            }}
          >
            {t.projects.label}
          </div>
          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            {t.projects.title}
          </h2>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link
          href="/proyectos#destacados"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 28px",
            borderRadius: 999,
            border: `1.5px solid ${INK}`,
            color: BG,
            background: INK,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            transition: "all 0.3s ease",
          }}
        >
          {DEST_LINK[lang] ?? DEST_LINK.es} <span style={{ color: "#E9E44F" }}>✦</span>
        </Link>
        <Link
          href="/proyectos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 28px",
            borderRadius: 999,
            border: `1.5px solid ${INK}`,
            color: INK,
            background: "transparent",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = INK;
            e.currentTarget.style.color = BG;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = INK;
          }}
        >
          {t.projects.seeAll} <span>→</span>
        </Link>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(20px, 2vw, 32px)",
        }}
        className="home-proj-grid"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ProjectCardVertical project={p} ctaLabel={t.projects.seeOne} />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          :global(.home-proj-grid) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 760px) {
          :global(.home-proj-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================
   SERVICES (editorial list, dark)
   ========================================= */
function ServicesList() {
  const { t, lang } = useLang();
  const lead = {
    es: "Cuatro formas de",
    en: "Four ways to",
    de: "Vier Wege,",
  }[lang];
  const leadAccent = {
    es: "trabajar juntos.",
    en: "work together.",
    de: "zusammenzuarbeiten.",
  }[lang];
  return (
    <section
      className="grid-paper-dark"
      style={{
        padding: "clamp(90px, 14vw, 140px) clamp(20px, 5vw, 77px)",
        background: INK,
        color: BG,
      }}
    >
      <div style={{ marginBottom: 60, maxWidth: 1200 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: 20,
          }}
        >
          {t.services.label}
        </div>
        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 84px)",
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          {t.services.title}
          <span style={{ color: YELLOW }}>.</span>
        </h2>
        <p
          style={{
            fontSize: "clamp(20px, 2.4vw, 32px)",
            lineHeight: 1.25,
            margin: "20px 0 0",
            fontWeight: 500,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "-0.02em",
          }}
        >
          {lead} <Serif style={{ color: YELLOW }}>{leadAccent}</Serif>
        </p>
      </div>

      <div>
        {t.services.list.map((s, i) => (
          <ServiceRow key={s.id} index={i} {...s} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  id,
  title,
  desc,
  includes,
  index,
}: {
  id: string;
  title: string;
  desc: string;
  includes: string[];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      style={{
        borderTop: `1px solid rgba(255,255,255,0.12)`,
        padding: "28px 0",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr auto",
          gap: "clamp(16px, 3vw, 60px)",
          alignItems: "baseline",
        }}
        className="home-svc-row"
      >
        <span style={{ fontSize: 13, color: MUTED, letterSpacing: "0.15em", fontWeight: 600 }}>
          / {id}
        </span>
        <h3
          style={{
            fontSize: "clamp(26px, 5vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            margin: 0,
            color: open ? YELLOW : BG,
            transition: "color 0.4s ease",
          }}
        >
          {title}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ fontSize: 22, fontWeight: 300, color: open ? YELLOW : BG, display: "inline-block" }}
        >
          +
        </motion.span>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr",
            gap: "clamp(16px, 3vw, 60px)",
            paddingTop: 28,
            paddingBottom: 8,
          }}
          className="home-svc-row-open"
        >
          <div />
          <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0, color: "rgba(255,255,255,0.75)", maxWidth: 520 }}>
            {desc}
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 14,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {includes.map((it) => (
              <li key={it} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: YELLOW }}>·</span> {it}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 720px) {
          :global(.home-svc-row) {
            grid-template-columns: 36px 1fr auto !important;
          }
          :global(.home-svc-row-open) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* =========================================
   ABOUT SPLIT 60/40
   ========================================= */
function AboutSplit() {
  const { t } = useLang();
  return (
    <section
      className="grid-paper"
      style={{
        padding: "clamp(90px, 14vw, 140px) clamp(20px, 5vw, 77px)",
        background: CREAM,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: MUTED,
          marginBottom: 20,
        }}
      >
        {t.about.label}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "end",
          marginBottom: 60,
        }}
        className="home-about-grid"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(32px, 5vw, 72px)",
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            margin: 0,
          }}
        >
          {t.about.headlineA}
          <br />
          <span style={{ color: MUTED }}>{t.about.headlineB}</span>
          <br />
          {t.about.headlineC}
          <br />
          <Mark>{t.about.headlineD}</Mark>
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}>
            <strong style={{ fontWeight: 700 }}>{t.about.body1Strong}</strong> {t.about.body1}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0, color: MUTED }}>
            {t.about.body2Pre}
            <strong style={{ color: INK }}>{t.about.body2Mid}</strong>
            {t.about.body2Post}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          paddingTop: 40,
          borderTop: `1px solid ${LINE}`,
        }}
        className="home-stats-grid"
      >
        {t.about.stats.map((s) => (
          <Stat key={s.label} num={s.num} label={s.label} />
        ))}
      </div>

      <div style={{ marginTop: 60 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: 16,
          }}
        >
          {t.about.stack}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "Stripe", "OpenAI"].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: `1px solid ${LINE}`,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "#444",
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.home-about-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.home-stats-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {num}
      </div>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
          marginTop: 10,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* =========================================
   TESTIMONIALS (papel crema + cuadrícula)
   ========================================= */
function TestimonialsBlock() {
  const { t } = useLang();
  return (
    <section
      className="grid-paper"
      style={{
        padding: "clamp(90px, 14vw, 140px) clamp(20px, 5vw, 77px)",
        background: CREAM,
        borderTop: "1px solid rgba(26,25,22,0.1)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: MUTED,
          marginBottom: 20,
        }}
      >
        {t.testimonials.label}
      </div>
      <h2
        style={{
          fontSize: "clamp(34px, 5vw, 72px)",
          lineHeight: 1,
          fontWeight: 700,
          letterSpacing: "-0.035em",
          margin: "0 0 60px",
        }}
      >
        {t.testimonials.titleA}
        <br />
        <span style={{ color: MUTED }}>{t.testimonials.titleB}</span>{" "}
        <Mark>{t.testimonials.titleC}</Mark>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            t.testimonials.items.length === 1 ? "1fr" : "repeat(2, 1fr)",
          gap: "clamp(24px, 4vw, 60px)",
          maxWidth: t.testimonials.items.length === 1 ? 900 : undefined,
        }}
        className="home-t-grid"
      >
        {t.testimonials.items.map((it, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              margin: 0,
              padding: "32px 0",
              borderTop: `1px solid ${LINE}`,
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <Serif
              style={{
                display: "block",
                fontSize: 64,
                lineHeight: 0.5,
                marginBottom: 24,
                color: INK,
              }}
            >
              &ldquo;
            </Serif>
            <p
              style={{
                fontSize: "clamp(19px, 2vw, 28px)",
                lineHeight: 1.4,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: "0 0 32px",
              }}
            >
              {it.quote}
            </p>
            <footer style={{ fontSize: 14, color: MUTED }}>
              <strong style={{ color: INK, fontWeight: 700 }}>{it.name}</strong> · {it.role}
            </footer>
          </motion.blockquote>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.home-t-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================
   CONTACT CTA (dark)
   ========================================= */
function ContactCTA() {
  const { t } = useLang();
  return (
    <section
      id="contacto"
      className="grid-paper-dark"
      style={{
        padding: "clamp(110px, 16vw, 160px) clamp(20px, 5vw, 77px)",
        background: INK,
        color: BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background: YELLOW,
          filter: "blur(180px)",
          opacity: 0.16,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1400 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: 24,
          }}
        >
          {t.contact.label}
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(40px, 6.5vw, 96px)",
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: "0 0 50px",
            wordBreak: "break-word",
          }}
        >
          {t.contact.titleA}
          <br />
          {t.contact.titleB}
          <br />
          <Serif style={{ color: YELLOW }}>{t.contact.titleAccent}</Serif>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "clamp(28px, 5vw, 80px)",
            maxWidth: 1280,
            alignItems: "start",
          }}
          className="home-contact-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ContactForm />
          </motion.div>

          <div>
            <QuickContact tone="dark" />
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.65)",
                margin: "0 0 28px",
                maxWidth: 440,
              }}
            >
              {t.contact.body}
            </p>
            <a
              href="mailto:hola@felippecamara.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 22px",
                borderRadius: 999,
                background: "transparent",
                color: BG,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.01em",
                border: "1.5px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, background 0.3s ease, color 0.3s ease",
                marginBottom: 36,
                maxWidth: "100%",
                wordBreak: "break-all",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = YELLOW;
                e.currentTarget.style.color = INK;
                e.currentTarget.style.borderColor = YELLOW;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = BG;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              hola@felippecamara.com <span style={{ fontSize: 18 }}>→</span>
            </a>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: 16,
              }}
            >
              {t.contact.follow}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <SocialLink label="Instagram" handle="@felippe.camara" href="https://instagram.com/felippe.camara" />
              <SocialLink label="TikTok" handle="@felippe.camara" href="https://tiktok.com/@felippe.camara" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.home-contact-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function SocialLink({ label, handle, href }: { label: string; handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        color: BG,
        textDecoration: "none",
        fontSize: 17,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        transition: "color 0.3s ease, padding-left 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = YELLOW;
        e.currentTarget.style.paddingLeft = "8px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = BG;
        e.currentTarget.style.paddingLeft = "0";
      }}
    >
      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
        <span
          style={{
            color: MUTED,
            fontSize: 13,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginRight: 14,
          }}
        >
          {label}
        </span>
        {handle}
      </span>
      <span style={{ fontSize: 18 }}>↗</span>
    </a>
  );
}
