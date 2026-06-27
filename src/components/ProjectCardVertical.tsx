"use client";

import { useState } from "react";
import Link from "next/link";
import { L, type ProjectDetail } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import ProjectCover from "@/components/ProjectCover";
import { INK, BG, MUTED, LINE, YELLOW } from "@/lib/brand";

/* Tarjeta vertical tipo card: portada (rectángulo vertical) + nombre +
   descripción corta debajo. Pensada para rejillas densas de 4 por fila. */
export default function ProjectCardVertical({
  project,
  ctaLabel,
}: {
  project: ProjectDetail;
  ctaLabel: string;
}) {
  const { lang } = useLang();
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/proyecto/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: BG,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${LINE}`,
          boxShadow: hover
            ? "0 18px 42px rgba(26,25,22,0.18)"
            : "0 6px 18px rgba(26,25,22,0.07)",
          transform: hover ? "translateY(-4px)" : "translateY(0)",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Portada — rectángulo vertical. container-type para que las covers
            escalen su tipografía respecto al ancho de la tarjeta (cqi), no del
            viewport. Esto evita que el texto se desborde en rejillas densas. */}
        <div
          style={{
            position: "relative",
            aspectRatio: "3 / 4",
            overflow: "hidden",
            background: project.theme.bg || "#f0f0f0",
            containerType: "inline-size",
          }}
        >
          <ProjectCover project={project} hover={hover} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)",
              opacity: hover ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              padding: "8px 14px",
              borderRadius: 999,
              background: YELLOW,
              color: INK,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transform: hover ? "translateY(0)" : "translateY(10px)",
              opacity: hover ? 1 : 0,
              transition: "transform 0.35s cubic-bezier(.2,.8,.2,1), opacity 0.35s ease",
              pointerEvents: "none",
            }}
          >
            {ctaLabel}
          </span>
        </div>

        {/* Texto */}
        <div
          style={{
            padding: "15px 16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1.12,
              color: INK,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.45,
              color: "#57544e",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {L(project.description, lang)}
          </p>
          <div
            style={{
              marginTop: "auto",
              paddingTop: 6,
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: MUTED,
              fontWeight: 600,
            }}
          >
            {L(project.category, lang)}
          </div>
        </div>
      </div>
    </Link>
  );
}
