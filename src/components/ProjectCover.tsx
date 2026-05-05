"use client";

import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";

/* =========================================
   Wrapper: foto real para webs · cover diseñado para SaaS
   ========================================= */
export default function ProjectCover({
  project,
  large = false,
  hover,
}: {
  project: ProjectDetail;
  large?: boolean;
  hover: boolean;
}) {
  // Slugs que siempre usan cover diseñado (SaaS sin foto)
  const designedOnly = new Set(["wavepanel", "noa"]);

  // Si tiene foto real y no está en la lista de "solo diseño", muestra la foto
  if (project.featuredImage && !designedOnly.has(project.slug)) {
    return (
      <Image
        src={project.featuredImage}
        alt={project.title}
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
    );
  }

  switch (project.slug) {
    case "wavepanel":
      return <WavepanelCover hover={hover} />;
    case "noa":
      return <NoaCover hover={hover} />;
    case "lorena-amadio":
      return <LorenaCover hover={hover} />;
    default:
      return (
        <TypographicCover
          title={project.title}
          bg={project.theme.bg}
          fg={project.theme.fg}
        />
      );
  }
}

/* ------------------------------------------------------------
   WAVEPANEL — SaaS surf · navy + yellow
   ------------------------------------------------------------ */
function WavepanelCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 0%, #143843 0%, #0d2f38 55%, #081e25 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[120%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, #ffcc0044 0%, transparent 60%)",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.1)" : "scale(1)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[55%]"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 110 C 100 60, 200 160, 300 110 C 400 60, 500 160, 600 110 L600 200 L0 200 Z"
          fill="url(#wave-grad)"
        />
        <path
          d="M0 130 C 100 80, 200 180, 300 130 C 400 80, 500 180, 600 130"
          fill="none"
          stroke="#ffcc00"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span
          className="text-[10px] uppercase tracking-[0.4em] mb-4"
          style={{ color: "#ffcc00", fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          · SaaS · escuelas
        </span>
        <span
          className="text-[clamp(36px,7vw,72px)] leading-[0.9]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 400 }}>wave</span>
          <span style={{ color: "#ffcc00", fontWeight: 900 }}>panel</span>
        </span>
        <span
          className="mt-3 text-[10px] uppercase tracking-[0.3em]"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          panel · web · reservas · stripe
        </span>
      </div>

      <div className="absolute top-5 left-5 flex gap-2">
        <span
          className="text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,204,0,0.18)",
            color: "#ffcc00",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          0% comisión
        </span>
        <span
          className="text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full hidden sm:inline-block"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          14d gratis
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   NOA — IA finanzas · cream + teal · chart line
   ------------------------------------------------------------ */
function NoaCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(110% 80% at 20% 100%, #d1f1ed 0%, #f8fafc 60%)",
      }}
    >
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-[80%] aspect-square rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #00b8a955 0%, transparent 65%)",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.1)" : "scale(1)",
          filter: "blur(20px)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 600 280"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-1/2 opacity-90"
      >
        <path
          d="M20 220 C 120 200, 180 230, 240 180 C 300 130, 340 160, 380 110 C 420 70, 480 90, 580 50"
          fill="none"
          stroke="#00b8a9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {[
          { x: 20, y: 220 },
          { x: 240, y: 180 },
          { x: 380, y: 110 },
          { x: 580, y: 50 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#00b8a9" />
        ))}
      </svg>

      <div
        className="absolute top-5 right-5 px-3 py-2 rounded-xl shadow-md"
        style={{
          background: "#fff",
          border: "1px solid rgba(11,15,26,0.08)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <p
          className="text-[8px] uppercase tracking-[0.25em]"
          style={{ color: "rgba(11,15,26,0.45)" }}
        >
          Balance mes
        </p>
        <p className="text-[15px] font-bold" style={{ color: "#0a1628" }}>
          +2.847 €
        </p>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] mb-3 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(0,184,169,0.15)",
            color: "#00b8a9",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          ✦ asistente IA
        </span>
        <span
          className="text-[clamp(64px,11vw,128px)] leading-[0.9]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            color: "#0a1628",
          }}
        >
          Noa
          <span style={{ color: "#00b8a9", fontStyle: "italic" }}>.</span>
        </span>
        <span
          className="mt-2 text-[10px] uppercase tracking-[0.3em]"
          style={{
            color: "rgba(11,15,26,0.5)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          finanzas · facturas · impuestos
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   LORENA AMADIO — cream + peach · tulipán + serif
   ------------------------------------------------------------ */
function LorenaCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 100%, #f4b07e44 0%, #f5f1ea 55%)",
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 120 200"
        className="absolute -bottom-6 -left-4 w-1/3 max-w-[220px]"
        style={{
          opacity: 0.35,
          transition: "transform 1.2s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "translateY(-6px) rotate(-2deg)" : "translateY(0)",
        }}
      >
        <g
          fill="none"
          stroke="#c97b63"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M60 200 C 58 150, 62 110, 60 70" />
          <path d="M60 140 C 36 130, 22 150, 18 168 C 32 168, 50 162, 60 152" />
          <path d="M60 120 C 80 112, 96 124, 100 140 C 86 140, 70 136, 60 128" />
          <path d="M46 70 C 46 48, 56 36, 60 28 C 64 36, 74 48, 74 70 C 74 82, 64 88, 60 90 C 56 88, 46 82, 46 70 Z" />
          <path d="M60 30 C 60 50, 60 70, 60 88" />
          <path d="M52 50 C 54 60, 56 70, 58 82" />
          <path d="M68 50 C 66 60, 64 70, 62 82" />
        </g>
      </svg>

      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, #f4b07e88 0%, transparent 70%)",
          filter: "blur(20px)",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.15)" : "scale(1)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          className="text-[10px] uppercase tracking-[0.4em] mb-4"
          style={{
            color: "#c97b63",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Psicología clínica
        </span>
        <h3
          className="text-[clamp(34px,6vw,64px)] leading-[1.05]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#3d3528",
          }}
        >
          Lorena
          <br />
          <span style={{ fontStyle: "italic", color: "#c97b63" }}>Amadio.</span>
        </h3>
        <span
          className="mt-5 text-[11px] tracking-[0.18em] uppercase"
          style={{
            color: "rgba(61,53,40,0.55)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          un paso · puede cambiar tu dirección
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Fallback genérico
   ------------------------------------------------------------ */
function TypographicCover({
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
