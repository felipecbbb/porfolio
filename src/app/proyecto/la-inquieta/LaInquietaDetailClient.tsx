"use client";

import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";

const project = getProjectBySlug("la-inquieta")!;

// Paleta Feria de Jerez
const CREAM = "#f3e7cf";
const CREAM_WARM = "#ead5b0";
const TEAL = "#13625a";
const TEAL_DEEP = "#0d4a42";
const CORAL = "#c65248";
const CORAL_DEEP = "#a83e36";
const GOLD = "#c89b4a";
const GOLD_LIGHT = "#e0bf80";
const INK = "#141414";

const FONT_DISPLAY = "var(--font-playfair), 'Playfair Display', Georgia, serif";
const FONT_BODY = "var(--font-yanone), 'Yanone Kaffeesatz', system-ui, sans-serif";

export default function LaInquietaDetailClient() {
  return (
    <main
      style={{
        background: CREAM,
        color: INK,
        fontFamily: FONT_BODY,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Patrón andalusí sutil de fondo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
          backgroundSize: "540px auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          opacity: 0.07,
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* NAV STICKY */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: `${TEAL_DEEP}f5`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: CREAM,
          borderBottom: `1px solid ${GOLD}30`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Link
            href="/proyectos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: CREAM,
              textDecoration: "none",
              fontFamily: FONT_BODY,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.85,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
          >
            <span style={{ fontSize: 20 }}>←</span> Proyectos
          </Link>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontStyle: "italic",
              fontSize: 15,
              color: GOLD_LIGHT,
              letterSpacing: "0.1em",
            }}
          >
            {project.category}
          </span>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section
        style={{
          position: "relative",
          background: TEAL,
          color: CREAM,
          padding: "80px 32px 100px",
          overflow: "hidden",
          borderBottom: `3px solid ${GOLD}`,
        }}
      >
        {/* Patrón teal más denso */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "540px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.85,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="li-hero-grid"
        >
          {/* Texto */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "8px 16px",
                border: `1px solid ${GOLD}`,
                color: GOLD_LIGHT,
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  background: CORAL,
                  borderRadius: "50%",
                }}
              />
              Caseta Nº154 · Feria de Jerez
            </div>

            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(64px, 9vw, 128px)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: CREAM,
                marginBottom: 20,
              }}
            >
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>La</span> Inquieta
            </h1>

            <div
              style={{
                display: "flex",
                gap: 32,
                marginBottom: 28,
                fontFamily: FONT_DISPLAY,
                fontStyle: "italic",
                fontSize: 20,
                letterSpacing: "0.1em",
                color: GOLD_LIGHT,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <SunIcon /> Sol de Fiesta
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                Luna de Fiesta <MoonIcon />
              </span>
            </div>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 20,
                lineHeight: 1.5,
                color: CREAM,
                opacity: 0.9,
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 40,
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    background: `${CREAM}20`,
                    border: `1px solid ${CREAM}40`,
                    color: CREAM,
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 28px",
                    background: CORAL,
                    color: CREAM,
                    textDecoration: "none",
                    fontFamily: FONT_BODY,
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    border: `1px solid ${CORAL_DEEP}`,
                    transition: "transform 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = CORAL_DEEP;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = CORAL;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Ver web en vivo <span>→</span>
                </a>
              )}
              <a
                href="https://github.com/felipecbbb/la-inquieta"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  background: "transparent",
                  color: CREAM,
                  textDecoration: "none",
                  fontFamily: FONT_BODY,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: `1px solid ${GOLD}`,
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${GOLD}20`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                GitHub <span>↗</span>
              </a>
            </div>
          </div>

          {/* Cartel */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/la-inquieta/cartel-hero.svg"
              alt="Cartel La Inquieta Feria de Jerez 2026"
              style={{
                width: "100%",
                maxWidth: 460,
                height: "auto",
                display: "block",
                filter: `drop-shadow(0 30px 50px rgba(0,0,0,0.4))`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== META BAR (año / cliente / category) ===== */}
      <section
        style={{
          position: "relative",
          background: CREAM_WARM,
          borderBottom: `1px solid ${INK}15`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="li-meta-grid"
        >
          <MetaItem label="Año" value={project.year} />
          <MetaItem label="Categoría" value="Caseta de Feria" />
          <MetaItem label="Cliente" value="La Inquieta" />
          <MetaItem label="Desplegada en" value="GitHub Pages" />
        </div>
      </section>

      {/* ===== LONG DESCRIPTION ===== */}
      <section style={{ position: "relative", padding: "100px 32px 60px", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <OrnamentalDivider />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: INK,
              textAlign: "center",
              margin: "32px 0 28px",
            }}
          >
            Una feria <em style={{ fontWeight: 400, color: CORAL_DEEP }}>en una web</em>
          </h2>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              lineHeight: 1.55,
              color: INK,
              opacity: 0.8,
              textAlign: "center",
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            {project.longDescription}
          </p>
        </div>
      </section>

      {/* ===== CHALLENGE + SOLUTION ===== */}
      <section style={{ position: "relative", padding: "60px 32px 100px", zIndex: 1 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
          className="li-cs-grid"
        >
          <ArabesqueCard title="El reto" accent={CORAL} body={project.challenge} />
          <ArabesqueCard title="La solución" accent={TEAL_DEEP} body={project.solution} />
        </div>
      </section>

      {/* ===== GALLERY / VISUAL SHOWCASE ===== */}
      <section
        style={{
          position: "relative",
          background: TEAL_DEEP,
          color: CREAM,
          padding: "100px 32px",
          zIndex: 1,
          borderTop: `1px solid ${GOLD}40`,
          borderBottom: `1px solid ${GOLD}40`,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "540px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel color={GOLD_LIGHT} text="Galería" />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              textAlign: "center",
              marginTop: 16,
              marginBottom: 56,
            }}
          >
            Cuatro bloques, <em style={{ fontWeight: 400, color: GOLD_LIGHT }}>un scroll</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
            className="li-gallery-grid"
          >
            {project.gallery.map((g, i) => (
              <GalleryCard key={i} index={i + 1} label={g.label} description={g.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ position: "relative", padding: "100px 32px", zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel color={CORAL_DEEP} text="Lo que hace" center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: INK,
              textAlign: "center",
              marginTop: 16,
              marginBottom: 48,
            }}
          >
            Detalles que <em style={{ fontWeight: 400, color: CORAL_DEEP }}>importan</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 14,
            }}
            className="li-feat-grid"
          >
            {project.features.map((f, i) => (
              <FeatureItem key={i} text={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section
        style={{
          position: "relative",
          background: CREAM_WARM,
          padding: "100px 32px",
          borderTop: `1px solid ${INK}15`,
          borderBottom: `1px solid ${INK}15`,
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel color={TEAL_DEEP} text="Resultados" center />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: INK,
              textAlign: "center",
              marginTop: 16,
              marginBottom: 48,
            }}
          >
            Lo que <em style={{ fontWeight: 400, color: CORAL_DEEP }}>queda</em>
          </h2>
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 16,
            }}
          >
            {project.results.map((r, i) => (
              <ResultItem key={i} index={i + 1} text={r} />
            ))}
          </ol>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        style={{
          position: "relative",
          background: TEAL_DEEP,
          color: CREAM,
          padding: "100px 32px 120px",
          textAlign: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/projects/la-inquieta/patron-fondo.svg')",
            backgroundSize: "540px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <OrnamentalDivider color={GOLD} />
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              margin: "32px 0 20px",
            }}
          >
            <em style={{ fontWeight: 300 }}>Caseta</em> abierta
          </h2>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              lineHeight: 1.5,
              color: CREAM,
              opacity: 0.85,
              marginBottom: 36,
            }}
          >
            La Inquieta ya está desplegada y lista para recibir a toda Cádiz. Entra a verla
            o revísate el repositorio.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 32px",
                background: CORAL,
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: `1px solid ${CORAL_DEEP}`,
                transition: "transform 0.3s, background 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = CORAL_DEEP;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CORAL;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Ver web en vivo <span>→</span>
            </a>
            <Link
              href="/proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 32px",
                background: "transparent",
                color: CREAM,
                textDecoration: "none",
                fontFamily: FONT_BODY,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: `1px solid ${GOLD}`,
                transition: "background 0.3s",
              }}
            >
              Otros proyectos
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 860px) {
          :global(.li-hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          :global(.li-meta-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          :global(.li-cs-grid),
          :global(.li-gallery-grid),
          :global(.li-feat-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ============ COMPONENTES AUXILIARES ============ */

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}

function OrnamentalDivider({ color = CORAL }: { color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        margin: "0 auto",
      }}
    >
      <span style={{ height: 1, width: 40, background: color, opacity: 0.4 }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8Z" fill={color} opacity="0.7" />
        <circle cx="12" cy="10" r="2" fill={CREAM} />
      </svg>
      <span style={{ height: 1, width: 40, background: color, opacity: 0.4 }} />
    </div>
  );
}

function SectionLabel({ text, color, center }: { text: string; color: string; center?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start" }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 14px",
          border: `1px solid ${color}`,
          color,
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: TEAL,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.01em",
          color: INK,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ArabesqueCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: CREAM_WARM,
        padding: "40px 34px 36px",
        borderLeft: `4px solid ${accent}`,
        boxShadow: `0 20px 40px -20px rgba(20,20,20,0.2)`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontFamily: FONT_DISPLAY,
          fontStyle: "italic",
          fontSize: 60,
          fontWeight: 900,
          color: accent,
          opacity: 0.1,
          lineHeight: 1,
        }}
      >
        “
      </div>
      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: "-0.01em",
          color: accent,
          marginBottom: 16,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          lineHeight: 1.55,
          color: INK,
          opacity: 0.85,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function GalleryCard({
  index,
  label,
  description,
}: {
  index: number;
  label: string;
  description: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: CREAM,
        color: INK,
        padding: "36px 30px",
        borderTop: `3px solid ${CORAL}`,
        boxShadow: `0 20px 40px -20px rgba(0,0,0,0.5)`,
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 14,
          color: CORAL_DEEP,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        0{index} · Bloque
      </div>
      <h3
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: "-0.01em",
          color: INK,
          marginBottom: 12,
        }}
      >
        {label}
      </h3>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          lineHeight: 1.45,
          color: INK,
          opacity: 0.78,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "18px 22px",
        background: CREAM_WARM,
        borderLeft: `2px solid ${CORAL}`,
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={CORAL_DEEP}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, marginTop: 2 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 17,
          lineHeight: 1.4,
          color: INK,
          opacity: 0.88,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function ResultItem({ index, text }: { index: number; text: string }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "20px 24px",
        background: CREAM,
        border: `1px solid ${INK}12`,
        transition: "transform 0.3s, border-color 0.3s",
      }}
    >
      <span
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 32,
          color: CORAL_DEEP,
          lineHeight: 1,
          minWidth: 44,
          letterSpacing: "-0.02em",
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          lineHeight: 1.45,
          color: INK,
          opacity: 0.88,
          paddingTop: 6,
        }}
      >
        {text}
      </span>
    </li>
  );
}
