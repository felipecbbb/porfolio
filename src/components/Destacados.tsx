"use client";

/* =========================================================
   Destacados — banda editorial oscura con scroll horizontal
   (drag/snap), marquee infinito y tarjetas XXL con parallax
   de imagen. Los proyectos con `destacado: true` en projects.ts.
   Enlazada desde el inicio vía /proyectos#destacados.
   ========================================================= */

import Link from "next/link";
import { motion } from "framer-motion";
import { type ProjectDetail, L } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { INK, CREAM, MUTED } from "@/lib/brand";

const T = {
  es: { badge: "Selección personal", title: "Destacados", hint: "Arrastra para ver más", cta: "Ver proyecto" },
  en: { badge: "Personal selection", title: "Featured", hint: "Drag to see more", cta: "View project" },
  de: { badge: "Persönliche Auswahl", title: "Highlights", hint: "Ziehen für mehr", cta: "Projekt ansehen" },
};

export default function Destacados({ projects }: { projects: ProjectDetail[] }) {
  const { lang } = useLang();
  const t = T[lang] ?? T.es;
  const destacados = projects.filter((p) => p.destacado);
  if (destacados.length === 0) return null;

  const marquee = destacados.map((p) => p.title.toUpperCase()).join("  ✦  ") + "  ✦  ";

  return (
    <section
      id="destacados"
      style={{
        background: INK,
        color: CREAM,
        padding: "clamp(70px, 9vw, 110px) 0 clamp(60px, 8vw, 100px)",
        scrollMarginTop: 80,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Cabecera */}
      <div
        style={{
          padding: "0 clamp(20px, 5vw, 77px)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 14,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(46px, 7vw, 96px)",
            lineHeight: 0.95,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "'Fraunces', Georgia, serif",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {t.title}
          <span style={{ color: "#E9E44F", fontStyle: "normal" }}> ✦</span>
        </motion.h2>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(243,239,228,0.55)",
          }}
        >
          · {t.badge} — {String(destacados.length).padStart(2, "0")}
        </div>
      </div>

      {/* Marquee infinito */}
      <div aria-hidden style={{ whiteSpace: "nowrap", marginBottom: "clamp(30px, 4vw, 50px)", opacity: 0.28 }}>
        <div className="dest-marquee" style={{ display: "inline-block" }}>
          {[0, 1].map((k) => (
            <span
              key={k}
              style={{
                fontSize: "clamp(20px, 2.4vw, 34px)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                paddingRight: 8,
              }}
            >
              {marquee}
            </span>
          ))}
        </div>
      </div>

      {/* Pista horizontal con snap */}
      <div
        className="dest-track"
        style={{
          display: "flex",
          gap: "clamp(16px, 2vw, 28px)",
          overflowX: "auto",
          padding: "4px clamp(20px, 5vw, 77px) 26px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {destacados.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ scrollSnapAlign: "start", flexShrink: 0 }}
          >
            <Link
              href={`/proyecto/${p.slug}`}
              className="dest-card"
              style={{
                display: "block",
                position: "relative",
                width: "clamp(280px, 62vw, 680px)",
                aspectRatio: "4 / 3",
                borderRadius: 18,
                overflow: "hidden",
                textDecoration: "none",
                color: CREAM,
                background: "#1c1c1c",
              }}
            >
              {p.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  loading="lazy"
                  className="dest-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    transition: "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.25) 45%, rgba(8,8,8,0.05) 100%)",
                }}
              />
              {/* Nº editorial */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 22,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "rgba(243,239,228,0.85)",
                }}
              >
                {String(i + 1).padStart(2, "0")} / {String(destacados.length).padStart(2, "0")}
              </div>
              <div style={{ position: "absolute", left: 24, right: 24, bottom: 22 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(243,239,228,0.7)",
                    marginBottom: 8,
                  }}
                >
                  {L(p.category, lang)} · {p.year}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(26px, 3.4vw, 44px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </div>
                  <span
                    className="dest-cta"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      opacity: 0.85,
                      transition: "transform 0.4s ease",
                      display: "inline-block",
                    }}
                  >
                    {t.cta} →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div
        style={{
          padding: "6px clamp(20px, 5vw, 77px) 0",
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        ← {t.hint} →
      </div>

      <style jsx global>{`
        .dest-marquee {
          animation: dest-scroll 28s linear infinite;
        }
        @keyframes dest-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .dest-track::-webkit-scrollbar { height: 0; }
        .dest-track { scrollbar-width: none; }
        .dest-card:hover .dest-img { transform: scale(1.05); }
        .dest-card:hover .dest-cta { transform: translateX(6px); }
        @media (prefers-reduced-motion: reduce) {
          .dest-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
