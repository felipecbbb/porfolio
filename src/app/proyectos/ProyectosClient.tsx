"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { ProjectDetail } from "@/data/projects";

const INK = "#0a0a0a";
const BG = "#ffffff";
const MUTED = "#949494";
const LINE = "#e5e5e5";
const ACCENT = "#f6f361";
const CORAL = "#c65248";

interface Props {
  projects: ProjectDetail[];
}

function getCategories(projects: ProjectDetail[]) {
  const cats = new Set<string>();
  projects.forEach((p) => {
    const main = p.category.split("—")[0]?.trim() || p.category;
    cats.add(main);
  });
  return ["Todos", ...Array.from(cats)];
}

export default function ProyectosClient({ projects }: Props) {
  const [filter, setFilter] = useState("Todos");

  const filtered = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((p) => p.category.startsWith(filter)),
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
      <BlendNav />
      <HeroBlock count={filtered.length} />
      <FilterBar
        categories={getCategories(projects)}
        active={filter}
        onChange={setFilter}
      />

      <div style={{ padding: "0 clamp(20px, 5vw, 77px) 80px" }}>
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ marginBottom: 100 }}
          >
            <FeatureCard project={featured} />
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
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "140px 20px",
              color: MUTED,
              fontSize: 18,
            }}
          >
            No hay proyectos en esta categoría.
          </div>
        )}
      </div>

      <Marquee />

      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: "30px clamp(20px, 5vw, 77px)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.02em",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>© 2026 Felipe Cámara</span>
        <Link
          href="/"
          style={{ color: INK, textDecoration: "none", fontWeight: 500 }}
        >
          ← Volver a inicio
        </Link>
      </footer>

      <style jsx global>{`
        @media (max-width: 860px) {
          .proy-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function BlendNav() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      if (s > 200 && s > lastScroll.current) setHidden(true);
      else setHidden(false);
      lastScroll.current = s;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "24px clamp(20px, 5vw, 77px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        mixBlendMode: "difference",
        color: "#fff",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: "-0.01em",
        }}
      >
        Felipe Cámara
      </Link>
      <nav
        style={{
          display: "flex",
          gap: 32,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Inicio
        </Link>
        <Link
          href="/proyectos"
          style={{
            color: "#fff",
            textDecoration: "none",
            borderBottom: "1px solid #fff",
            paddingBottom: 2,
          }}
        >
          Proyectos
        </Link>
      </nav>
    </header>
  );
}

function HeroBlock({ count }: { count: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      style={{
        padding: "clamp(140px, 18vh, 220px) clamp(20px, 5vw, 77px) 40px",
        position: "relative",
      }}
    >
      <motion.div style={{ y, opacity }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 40,
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
            · 01 / Portfolio
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
            {String(count).padStart(2, "0")} proyectos seleccionados
          </div>
        </div>

        <h1
          style={{
            fontSize: "clamp(80px, 14vw, 220px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
          }}
        >
          Proyectos
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            marginTop: 48,
            paddingTop: 40,
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
            Selección 2024 — 2026
          </div>
          <p
            style={{
              fontSize: "clamp(18px, 1.4vw, 22px)",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 620,
              fontWeight: 400,
            }}
          >
            Webs, SaaS, landings y plataformas. Cada una hecha a medida,
            pensada para convertir y para durar.{" "}
            <span style={{ color: MUTED }}>
              Haz click en cualquier proyecto para ver el detalle.
            </span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function FilterBar({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div
      style={{
        padding: "30px clamp(20px, 5vw, 77px) 80px",
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
        Filtrar
      </span>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            border: `1px solid ${active === c ? INK : LINE}`,
            background: active === c ? INK : "transparent",
            color: active === c ? BG : INK,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            if (active !== c) e.currentTarget.style.borderColor = INK;
          }}
          onMouseLeave={(e) => {
            if (active !== c) e.currentTarget.style.borderColor = LINE;
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function FeatureCard({ project }: { project: ProjectDetail }) {
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
        />
        <div>
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
            · Proyecto destacado · {project.year}
          </div>
          <h2
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 0.95,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
            }}
          >
            {project.title}
            <ArrowInline />
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              color: "#333",
              marginBottom: 28,
              maxWidth: 520,
            }}
          >
            {project.description}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {project.tags.slice(0, 5).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.proy-feature) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Link>
  );
}

function ProjectCard({ project }: { project: ProjectDetail }) {
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
      />
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <h3
            style={{
              fontSize: "clamp(24px, 2.2vw, 34px)",
              lineHeight: 1,
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
          {project.category}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.slice(0, 4).map((t) => (
            <Tag key={t} small>
              {t}
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
}: {
  image?: string;
  themeBg: string;
  themeFg: string;
  title: string;
  large?: boolean;
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
          fontSize: large ? 14 : 12,
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.15)",
          zIndex: 2,
        }}
      >
        Ver proyecto →
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
          fontSize: "clamp(40px, 7vw, 100px)",
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
  const items = [
    "Desarrollo",
    "Diseño",
    "Estrategia",
    "SaaS",
    "Web",
    "E-commerce",
    "Landing",
    "Automatización",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div
      style={{
        borderTop: `1px solid ${LINE}`,
        borderBottom: `1px solid ${LINE}`,
        overflow: "hidden",
        padding: "30px 0",
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
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
        }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 60,
            }}
          >
            {t}
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
