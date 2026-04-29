"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { L, type ProjectDetail } from "@/data/projects";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav, { LangSwitcher } from "@/components/BlendNav";

const INK = "#0a0a0a";
const BG = "#ffffff";
const MUTED = "#949494";
const LINE = "#e5e5e5";
const CORAL = "#c65248";
const ACCENT = "#f6f361";

export default function HomeClient({ projects }: { projects: ProjectDetail[] }) {
  return (
    <main
      style={{
        background: BG,
        color: INK,
        minHeight: "100vh",
        fontFamily:
          "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
        letterSpacing: "-0.005em",
        overflow: "hidden",
      }}
    >
      <BlendNav active="home" />
      <HeroXXL />
      <NameMarquee />
      <FeaturedProjects projects={projects.slice(0, 4)} />
      <WordMarquee />
      <ServicesList />
      <AboutSplit />
      <TestimonialsBlock />
      <ContactCTA />
      <Footer />
    </main>
  );
}

/* =========================================
   HERO XXL
   ========================================= */
function HeroXXL() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section
      style={{
        padding: "clamp(120px, 18vh, 220px) clamp(20px, 5vw, 77px) 60px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <motion.div style={{ y, opacity }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {t.hero.badge}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#15c28b",
                boxShadow: "0 0 0 4px rgba(21,194,139,.2)",
              }}
            />
            {t.hero.available}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(54px, 12vw, 200px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {t.hero.line1}
          <br />
          <span style={{ color: MUTED }}>{t.hero.line2}</span>
          <br />
          {t.hero.line3}
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </motion.h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 56,
            paddingTop: 36,
            borderTop: `1px solid ${LINE}`,
            maxWidth: 1200,
          }}
          className="hero-foot"
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {t.hero.location}
          </div>
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 20px)",
              lineHeight: 1.45,
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
        fontWeight: 500,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: MUTED,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          width: 28,
          height: 1,
          background: MUTED,
          display: "inline-block",
        }}
      />
      {t.hero.scroll}
    </div>
  );
}

/* =========================================
   NAME MARQUEE (big black)
   ========================================= */
function NameMarquee() {
  const row = Array.from({ length: 10 });
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "20px 0",
        background: INK,
        color: BG,
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 50,
          whiteSpace: "nowrap",
          animation: "home-mq-a 28s linear infinite",
          fontSize: "clamp(40px, 8vw, 100px)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {row.map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 50 }}>
            Felipe Cámara <span style={{ color: CORAL }}>✦</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes home-mq-a {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* =========================================
   FEATURED PROJECTS (preview of 4)
   ========================================= */
function FeaturedProjects({ projects }: { projects: ProjectDetail[] }) {
  const { t } = useLang();
  return (
    <section
      style={{
        padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 77px)",
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
              fontWeight: 500,
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
              fontSize: "clamp(48px, 10vw, 160px)",
              lineHeight: 0.9,
              fontWeight: 500,
              letterSpacing: "-0.06em",
              margin: 0,
            }}
          >
            {t.projects.title}
            <span style={{ color: CORAL, fontStyle: "italic" }}>{t.projects.titleAccent}</span>
          </h2>
        </div>
        <Link
          href="/proyectos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 28px",
            borderRadius: 999,
            border: `1px solid ${INK}`,
            color: INK,
            background: "transparent",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(40px, 6vw, 100px) clamp(20px, 3vw, 40px)",
        }}
        className="home-proj-grid"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <FeaturedCard project={p} />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.home-proj-grid) {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeaturedCard({ project }: { project: ProjectDetail }) {
  const { t, lang } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!wrap.current || !btn.current) return;
    const r = wrap.current.getBoundingClientRect();
    btn.current.style.left = `${e.clientX - r.left}px`;
    btn.current.style.top = `${e.clientY - r.top}px`;
  };

  return (
    <Link
      href={`/proyecto/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        ref={wrap}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          aspectRatio: "4 / 3",
          background: project.theme.bg,
          cursor: "none",
        }}
      >
        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            sizes="(max-width: 860px) 100vw, 45vw"
            style={{
              objectFit: "cover",
              transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
              transform: hover ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: project.theme.bg,
              color: project.theme.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <span
              style={{
                fontSize: "clamp(36px, 7vw, 100px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                textAlign: "center",
              }}
            >
              {project.title}
            </span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)",
            opacity: hover ? 1 : 0,
            transition: "opacity 0.65s ease",
            pointerEvents: "none",
          }}
        />
        <div
          ref={btn}
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "1.5px solid #fff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translate(-50%, -50%) scale(${hover ? 1 : 0})`,
            transition: "transform 0.4s cubic-bezier(.2,.8,.2,1)",
            pointerEvents: "none",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.15)",
            zIndex: 2,
          }}
        >
          {t.projects.seeOne}
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", gap: 16 }}>
        <h3
          style={{
            fontSize: "clamp(22px, 2.4vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {project.title}
          <span style={{ color: CORAL, fontStyle: "italic", marginLeft: "0.3em" }}>↗</span>
        </h3>
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: MUTED,
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          {project.year}
        </span>
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.02em",
        }}
      >
        {L(project.category, lang)}
      </div>
    </Link>
  );
}

/* =========================================
   WORD MARQUEE (second, lighter)
   ========================================= */
function WordMarquee() {
  const { lang } = useLang();
  const wordsByLang: Record<Lang, string[]> = {
    es: ["desarrollo", "diseño", "estrategia", "producto", "growth"],
    en: ["development", "design", "strategy", "product", "growth"],
    de: ["entwicklung", "design", "strategie", "produkt", "growth"],
  };
  const words = wordsByLang[lang];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "26px 0",
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          whiteSpace: "nowrap",
          animation: "home-mq-b 38s linear infinite",
          fontSize: "clamp(36px, 6vw, 80px)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontStyle: "italic",
        }}
      >
        {row.map((w, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>
            {w} <span style={{ color: CORAL, fontStyle: "normal" }}>·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes home-mq-b {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* =========================================
   SERVICES (editorial list)
   ========================================= */
function ServicesList() {
  const { t } = useLang();
  return (
    <section
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
            fontWeight: 500,
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
            fontSize: "clamp(48px, 10vw, 160px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
          }}
        >
          {t.services.title}
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </h2>
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
        <span
          style={{
            fontSize: 13,
            color: MUTED,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          / {id}
        </span>
        <h3
          style={{
            fontSize: "clamp(26px, 5vw, 68px)",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            margin: 0,
            color: open ? CORAL : BG,
            transition: "color 0.4s ease",
          }}
        >
          {title}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: BG,
            display: "inline-block",
          }}
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
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.5,
              margin: 0,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 520,
            }}
          >
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
                <span style={{ color: CORAL }}>·</span> {it}
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
      style={{
        padding: "clamp(90px, 14vw, 140px) clamp(20px, 5vw, 77px)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
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
            fontSize: "clamp(34px, 5.5vw, 88px)",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {t.about.headlineA}
          <br />
          <span style={{ color: MUTED }}>{t.about.headlineB}</span>
          <br />
          {t.about.headlineC}
          <br />
          <span style={{ color: MUTED }}>{t.about.headlineD}</span>
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}>
            <strong style={{ fontWeight: 600 }}>{t.about.body1Strong}</strong> {t.about.body1}
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
            fontWeight: 500,
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
      <div
        style={{
          fontSize: "clamp(38px, 6vw, 80px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
          marginTop: 10,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* =========================================
   TESTIMONIALS
   ========================================= */
function TestimonialsBlock() {
  const { t } = useLang();
  return (
    <section
      style={{
        padding: "clamp(90px, 14vw, 140px) clamp(20px, 5vw, 77px)",
        background: "#f7f7f7",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
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
          fontSize: "clamp(40px, 8vw, 120px)",
          lineHeight: 0.95,
          fontWeight: 500,
          letterSpacing: "-0.05em",
          margin: "0 0 60px",
        }}
      >
        {t.testimonials.titleA}
        <br />
        <span style={{ color: MUTED }}>{t.testimonials.titleB}</span> {t.testimonials.titleC}
        <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(24px, 4vw, 60px)",
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
            <span
              style={{
                display: "block",
                fontSize: 64,
                fontWeight: 500,
                color: CORAL,
                lineHeight: 0.5,
                marginBottom: 24,
                fontStyle: "italic",
              }}
            >
              “
            </span>
            <p
              style={{
                fontSize: "clamp(19px, 2vw, 30px)",
                lineHeight: 1.35,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: "0 0 32px",
              }}
            >
              {it.quote}
            </p>
            <footer style={{ fontSize: 14, color: MUTED }}>
              <strong style={{ color: INK, fontWeight: 600 }}>{it.name}</strong> · {it.role}
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
   CONTACT CTA
   ========================================= */
function ContactCTA() {
  const { t } = useLang();
  return (
    <section
      id="contacto"
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
          background: CORAL,
          filter: "blur(180px)",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background: ACCENT,
          filter: "blur(180px)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1400 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
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
            fontSize: "clamp(48px, 12vw, 200px)",
            lineHeight: 0.95,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: "0 0 50px",
            wordBreak: "break-word",
          }}
        >
          {t.contact.titleA}
          <br />
          {t.contact.titleB}
          <br />
          <span style={{ fontStyle: "italic", color: CORAL }}>{t.contact.titleAccent}</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 5vw, 80px)",
            maxWidth: 1200,
          }}
          className="home-contact-grid"
        >
          <div>
            <a
              href="mailto:felipe@kujme.es"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 28px",
                borderRadius: 999,
                background: CORAL,
                color: BG,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "transform 0.3s ease, background 0.3s ease",
                marginBottom: 24,
                maxWidth: "100%",
                wordBreak: "break-all",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              felipe@kujme.es <span style={{ fontSize: 20 }}>→</span>
            </a>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                maxWidth: 440,
              }}
            >
              {t.contact.body}
            </p>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: 20,
              }}
            >
              {t.contact.follow}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SocialLink
                label="Instagram"
                handle="@felippe.lab"
                href="https://instagram.com/felippe.lab"
              />
              <SocialLink
                label="TikTok"
                handle="@felippe.lab"
                href="https://tiktok.com/@felippe.lab"
              />
              <SocialLink label="Email" handle="felipe@kujme.es" href="mailto:felipe@kujme.es" />
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
        e.currentTarget.style.color = CORAL;
        e.currentTarget.style.paddingLeft = "8px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = BG;
        e.currentTarget.style.paddingLeft = "0";
      }}
    >
      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
        <span style={{ color: MUTED, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginRight: 14 }}>
          {label}
        </span>
        {handle}
      </span>
      <span style={{ fontSize: 18 }}>↗</span>
    </a>
  );
}

/* =========================================
   FOOTER
   ========================================= */
function Footer() {
  const { t } = useLang();
  return (
    <footer
      style={{
        padding: "26px clamp(20px, 5vw, 77px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
        color: MUTED,
        letterSpacing: "0.02em",
        flexWrap: "wrap",
        gap: 16,
        background: INK,
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <span style={{ color: MUTED }}>{t.footer.rights}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <LangSwitcher tone="light" />
        <Link href="/proyectos" style={{ color: BG, textDecoration: "none", fontWeight: 500 }}>
          {t.footer.seeProjects}
        </Link>
      </div>
    </footer>
  );
}
