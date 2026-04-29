"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { L, type ProjectDetail } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const INK = "#0a0a0a";
const BG = "#ffffff";
const MUTED = "#949494";
const LINE = "#e5e5e5";
const CORAL = "#c65248";

interface Props {
  projects: ProjectDetail[];
}

const PROYECTOS_T = {
  es: {
    badge: "· 01 / Portfolio",
    countSuffix: "proyectos seleccionados",
    title: "Proyectos",
    selection: "Selección 2024 — 2026",
    introMain:
      "Webs, SaaS, landings y plataformas. Cada una hecha a medida, pensada para convertir y para durar.",
    introMuted: "Haz click en cualquier proyecto para ver el detalle.",
    filter: "Filtrar",
    all: "Todos",
    featured: "Proyecto destacado",
    seeOne: "Ver proyecto →",
    empty: "No hay proyectos en esta categoría.",
    rights: "© 2026 Felipe Cámara",
    back: "← Volver a inicio",
  },
  en: {
    badge: "· 01 / Portfolio",
    countSuffix: "selected projects",
    title: "Work",
    selection: "Selection 2024 — 2026",
    introMain:
      "Websites, SaaS, landings and platforms. Each one custom-built, designed to convert and to last.",
    introMuted: "Click any project to see the detail.",
    filter: "Filter",
    all: "All",
    featured: "Featured project",
    seeOne: "View project →",
    empty: "No projects in this category.",
    rights: "© 2026 Felipe Cámara",
    back: "← Back home",
  },
  de: {
    badge: "· 01 / Portfolio",
    countSuffix: "ausgewählte Projekte",
    title: "Projekte",
    selection: "Auswahl 2024 — 2026",
    introMain:
      "Websites, SaaS, Landings und Plattformen. Jede maßgeschneidert, zum Konvertieren und Bestehen gebaut.",
    introMuted: "Klicke auf ein Projekt, um Details zu sehen.",
    filter: "Filter",
    all: "Alle",
    featured: "Ausgewähltes Projekt",
    seeOne: "Projekt ansehen →",
    empty: "Keine Projekte in dieser Kategorie.",
    rights: "© 2026 Felipe Cámara",
    back: "← Zurück zur Startseite",
  },
};

function getCategoryKeys(projects: ProjectDetail[]): string[] {
  const keys = new Set<string>();
  projects.forEach((p) => {
    const main = p.category.es.split("—")[0]?.trim() || p.category.es;
    keys.add(main);
  });
  return ["__all__", ...Array.from(keys)];
}

export default function ProyectosClient({ projects }: Props) {
  const { lang } = useLang();
  const t = PROYECTOS_T[lang];
  const [filter, setFilter] = useState<string>("__all__");

  const filtered = useMemo(
    () =>
      filter === "__all__"
        ? projects
        : projects.filter((p) => p.category.es.startsWith(filter)),
    [filter, projects]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main
      style={{
        background: BG,
        color: INK,
        minHeight: "100vh",
        fontFamily:
          "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
        letterSpacing: "-0.005em",
      }}
    >
      <BlendNav active="projects" />
      <HeroBlock count={filtered.length} t={t} />
      <FilterBar
        keys={getCategoryKeys(projects)}
        active={filter}
        onChange={setFilter}
        labels={(key) => (key === "__all__" ? t.all : key)}
        filterLabel={t.filter}
      />

      <div style={{ padding: "0 clamp(20px, 5vw, 77px) 80px" }}>
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ marginBottom: 80 }}
          >
            <FeatureCard project={featured} t={t} />
          </motion.div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(30px, 5vw, 80px) clamp(20px, 3vw, 40px)",
          }}
          className="proy-grid"
        >
          <AnimatePresence mode="popLayout">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.06,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <ProjectCard project={p} t={t} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "120px 20px",
              color: MUTED,
              fontSize: 18,
            }}
          >
            {t.empty}
          </div>
        )}
      </div>

      <Marquee />

      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "26px clamp(20px, 5vw, 77px)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.02em",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>{t.rights}</span>
        <Link
          href="/"
          style={{ color: INK, textDecoration: "none", fontWeight: 500 }}
        >
          {t.back}
        </Link>
      </footer>

      <style jsx global>{`
        @media (max-width: 860px) {
          .proy-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </main>
  );
}

type T = typeof PROYECTOS_T["es"];

function HeroBlock({ count, t }: { count: number; t: T }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      style={{
        padding: "clamp(120px, 18vh, 220px) clamp(20px, 5vw, 77px) 40px",
        position: "relative",
      }}
    >
      <motion.div style={{ y, opacity }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {t.badge}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {String(count).padStart(2, "0")} {t.countSuffix}
          </div>
        </div>

        <h1
          style={{
            fontSize: "clamp(64px, 14vw, 220px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {t.title}
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 48,
            paddingTop: 36,
            borderTop: `1px solid ${LINE}`,
            maxWidth: 1200,
          }}
          className="proy-hero-bottom"
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
            {t.selection}
          </div>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 22px)",
              lineHeight: 1.45,
              margin: 0,
              maxWidth: 620,
              fontWeight: 400,
            }}
          >
            {t.introMain}{" "}
            <span style={{ color: MUTED }}>{t.introMuted}</span>
          </p>
        </div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 720px) {
          :global(.proy-hero-bottom) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-top: 32px !important;
            padding-top: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FilterBar({
  keys,
  active,
  onChange,
  labels,
  filterLabel,
}: {
  keys: string[];
  active: string;
  onChange: (k: string) => void;
  labels: (key: string) => string;
  filterLabel: string;
}) {
  return (
    <div
      style={{
        padding: "20px clamp(20px, 5vw, 77px) 60px",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: MUTED,
          marginRight: 12,
        }}
      >
        {filterLabel}
      </span>
      {keys.map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            border: `1px solid ${active === k ? INK : LINE}`,
            background: active === k ? INK : "transparent",
            color: active === k ? BG : INK,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            if (active !== k) e.currentTarget.style.borderColor = INK;
          }}
          onMouseLeave={(e) => {
            if (active !== k) e.currentTarget.style.borderColor = LINE;
          }}
        >
          {labels(k)}
        </button>
      ))}
    </div>
  );
}

function FeatureCard({ project, t }: { project: ProjectDetail; t: T }) {
  const { lang } = useLang();
  const theme = project.theme;
  return (
    <Link
      href={`/proyecto/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "clamp(20px, 3vw, 60px)",
          alignItems: "center",
        }}
        className="proy-feature"
      >
        <MagneticMedia
          image={project.featuredImage}
          themeBg={theme.bg}
          themeFg={theme.fg}
          title={project.title}
          large
          ctaLabel={t.seeOne}
        />
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 18,
            }}
          >
            · {t.featured} · {project.year}
          </div>
          <h2
            style={{
              fontSize: "clamp(34px, 5vw, 72px)",
              lineHeight: 0.98,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}
          >
            {project.title}
            <ArrowInline />
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.5,
              color: "#333",
              marginBottom: 24,
              maxWidth: 520,
            }}
          >
            {L(project.description, lang)}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {project.tags.slice(0, 5).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.proy-feature) {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </Link>
  );
}

function ProjectCard({ project, t }: { project: ProjectDetail; t: T }) {
  const { lang } = useLang();
  const theme = project.theme;
  return (
    <Link
      href={`/proyecto/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <MagneticMedia
        image={project.featuredImage}
        themeBg={theme.bg}
        themeFg={theme.fg}
        title={project.title}
        ctaLabel={t.seeOne}
      />
      <div
        style={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <h3
            style={{
              fontSize: "clamp(22px, 2.2vw, 34px)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {project.title}
            <ArrowInline />
          </h3>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: MUTED,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
              alignSelf: "flex-start",
              marginTop: 8,
            }}
          >
            {project.year}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.05em",
            color: MUTED,
          }}
        >
          {L(project.category, lang)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag} small>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

function MagneticMedia({
  image,
  themeBg,
  themeFg,
  title,
  large,
  ctaLabel,
}: {
  image?: string;
  themeBg: string;
  themeFg: string;
  title: string;
  large?: boolean;
  ctaLabel: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!wrap.current || !btn.current) return;
    const r = wrap.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    btn.current.style.left = `${x}px`;
    btn.current.style.top = `${y}px`;
  };

  return (
    <div
      ref={wrap}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        aspectRatio: large ? "16 / 11" : "4 / 3",
        background: themeBg || "#f0f0f0",
        cursor: "none",
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            large
              ? "(max-width: 860px) 100vw, 60vw"
              : "(max-width: 860px) 100vw, 45vw"
          }
          style={{
            objectFit: "cover",
            transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
            transform: hover ? "scale(1.04)" : "scale(1)",
          }}
        />
      ) : (
        <TypographicPlaceholder title={title} bg={themeBg} fg={themeFg} />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.65s ease",
          pointerEvents: "none",
        }}
      />

      <div
        ref={btn}
        style={{
          position: "absolute",
          width: large ? 220 : 160,
          height: large ? 220 : 160,
          borderRadius: "50%",
          border: "1.5px solid #fff",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(-50%, -50%) scale(${hover ? 1 : 0})`,
          transition: "transform 0.4s cubic-bezier(.2,.8,.2,1)",
          pointerEvents: "none",
          fontSize: large ? 13 : 12,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.15)",
          zIndex: 2,
          textAlign: "center",
          padding: "0 16px",
        }}
      >
        {ctaLabel}
      </div>
    </div>
  );
}

function TypographicPlaceholder({
  title,
  bg,
  fg,
}: {
  title: string;
  bg: string;
  fg: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: bg || "#111",
        color: fg || "#fff",
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
        {title}
      </span>
    </div>
  );
}

function Tag({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      style={{
        padding: small ? "4px 10px" : "6px 14px",
        borderRadius: 999,
        border: `1px solid ${LINE}`,
        fontSize: small ? 11 : 12,
        fontWeight: 500,
        letterSpacing: "0.03em",
        color: "#555",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ArrowInline() {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        marginLeft: "0.3em",
        color: CORAL,
        fontWeight: 400,
      }}
    >
      ↗
    </span>
  );
}

function Marquee() {
  const { lang } = useLang();
  const items: Record<typeof lang, string[]> = {
    es: [
      "Desarrollo",
      "Diseño",
      "Estrategia",
      "SaaS",
      "Web",
      "E-commerce",
      "Landing",
      "Automatización",
    ],
    en: [
      "Development",
      "Design",
      "Strategy",
      "SaaS",
      "Web",
      "E-commerce",
      "Landing",
      "Automation",
    ],
    de: [
      "Entwicklung",
      "Design",
      "Strategie",
      "SaaS",
      "Web",
      "E-Commerce",
      "Landing",
      "Automatisierung",
    ],
  };
  const row = [...items[lang], ...items[lang], ...items[lang]];
  return (
    <div
      style={{
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
        overflow: "hidden",
        padding: "26px 0",
        background: INK,
        color: BG,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          whiteSpace: "nowrap",
          animation: "proy-scroll 40s linear infinite",
          fontSize: "clamp(32px, 6vw, 72px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
        }}
      >
        {row.map((label, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 60,
            }}
          >
            {label}
            <span style={{ color: CORAL }}>·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes proy-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
