"use client";

import { useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { type ProjectDetail } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";
import ProjectCardVertical from "@/components/ProjectCardVertical";
import SiteFooter from "@/components/SiteFooter";
import { INK, BG, CREAM, MUTED, LINE, Mark } from "@/lib/brand";

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

  return (
    <main
      className="grid-paper"
      style={{
        background: CREAM,
        color: INK,
        minHeight: "100dvh",
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

      <div style={{ padding: "0 clamp(20px, 5vw, 77px) 100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(20px, 2vw, 32px)",
          }}
          className="proy-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.05,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <ProjectCardVertical project={p} ctaLabel={t.seeOne} />
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

      <SiteFooter />

      <style jsx global>{`
        @media (max-width: 1100px) {
          .proy-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .proy-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
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
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: "-0.045em",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          <Mark>{t.title}</Mark>
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
