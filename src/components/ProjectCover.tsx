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
  // Slugs que siempre usan cover diseñado (SaaS sin foto + casos editoriales)
  const designedOnly = new Set([
    "wavepanel",
    "noa",
    "la-inquieta",
    "internacional-pedro-lezcano",
    "jm-padel-academy",
    "kujme",
  ]);

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
    case "la-inquieta":
      return <LaInquietaCover hover={hover} />;
    case "internacional-pedro-lezcano":
      return <IPLCover hover={hover} />;
    case "jm-padel-academy":
      return <JMPadelCover hover={hover} />;
    case "kujme":
      return <KujmeCover hover={hover} />;
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
   LA INQUIETA — feria de Jerez · cream + teal · arco mozárabe
   ------------------------------------------------------------ */
function LaInquietaCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#f3e7cf" }}
    >
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.09 }}
      >
        <defs>
          <pattern
            id="andalusi-stars"
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="#0d4a42"
              strokeWidth="0.9"
              strokeLinejoin="round"
            >
              <path d="M28 6 L33 18 L46 19 L36 28 L39 41 L28 34 L17 41 L20 28 L10 19 L23 18 Z" />
              <circle cx="28" cy="28" r="2.4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#andalusi-stars)" />
      </svg>

      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-[70%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, #c6524833 0%, transparent 70%)",
          filter: "blur(22px)",
          transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.18)" : "scale(1)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-16 w-[55%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, #0d4a4226 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          className="text-[10px] uppercase tracking-[0.4em] mb-5"
          style={{
            color: "#c65248",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          · Feria de Jerez · Nº154
        </span>

        <div
          className="relative"
          style={{
            paddingTop: 18,
            paddingBottom: 8,
            paddingLeft: "clamp(20px, 4vw, 44px)",
            paddingRight: "clamp(20px, 4vw, 44px)",
          }}
        >
          <svg
            aria-hidden
            viewBox="0 0 240 160"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{
              transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
              transform: hover ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            <path
              d="M14 158 L14 80 C 14 38, 60 14, 120 14 C 180 14, 226 38, 226 80 L226 158"
              fill="none"
              stroke="#0d4a42"
              strokeWidth="1.4"
              opacity="0.55"
            />
            <path
              d="M30 158 L30 86 C 30 50, 70 30, 120 30 C 170 30, 210 50, 210 86 L210 158"
              fill="none"
              stroke="#0d4a42"
              strokeWidth="0.7"
              opacity="0.3"
            />
          </svg>

          <h3
            className="relative text-[clamp(34px,6.4vw,66px)] leading-[1.02]"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#0d4a42",
            }}
          >
            La{" "}
            <span style={{ fontStyle: "italic", color: "#c65248" }}>
              Inquieta.
            </span>
          </h3>
        </div>

        <span
          className="mt-5 text-[10px] uppercase tracking-[0.32em]"
          style={{
            color: "rgba(13,74,66,0.55)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          transporte · bebidas · dj
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   INTERNACIONAL PEDRO LEZCANO — torneo ajedrez · charcoal + gold
   ------------------------------------------------------------ */
function IPLCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0e131f" }}
    >
      {/* Grid de tablero sutil */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,89,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Halo dorado en esquina */}
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[80%] aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(197,160,89,0.22) 0%, transparent 65%)",
          filter: "blur(24px)",
          transition: "transform 1.2s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.12)" : "scale(1)",
        }}
      />

      {/* Rey ♔ gigante semi-transparente — pieza icónica */}
      <div
        aria-hidden
        className="absolute"
        style={{
          right: "-2%",
          bottom: "-12%",
          fontSize: "clamp(280px, 38vw, 520px)",
          lineHeight: 1,
          color: "#c5a059",
          opacity: 0.22,
          fontFamily:
            "'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols', serif",
          transition: "transform 1.4s cubic-bezier(.2,.8,.2,1), opacity .8s ease",
          transform: hover
            ? "translate(-4px, -10px) rotate(-2deg)"
            : "translate(0, 0)",
          textShadow: "0 8px 40px rgba(0,0,0,0.4)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        ♔
      </div>

      {/* Esquina sup-izq: eyebrow XVIII */}
      <div
        className="absolute top-5 left-5 flex items-center gap-2"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.35em] px-2.5 py-1"
          style={{
            background: "rgba(197,160,89,0.15)",
            color: "#c5a059",
            fontWeight: 700,
            border: "1px solid rgba(197,160,89,0.35)",
          }}
        >
          XVIII · 2026
        </span>
        <span
          className="text-[9px] uppercase tracking-[0.3em] hidden sm:inline"
          style={{ color: "rgba(232,216,168,0.55)" }}
        >
          Memorial
        </span>
      </div>

      {/* Bloque tipográfico principal */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
        <span
          className="text-[10px] uppercase tracking-[0.35em] mb-3"
          style={{
            color: "#c5a059",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          Internacional
        </span>
        <h3
          className="leading-[0.95]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "#f9f8f6",
            fontSize: "clamp(40px, 7.2vw, 80px)",
          }}
        >
          Pedro
          <br />
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              color: "#c5a059",
            }}
          >
            Lezcano.
          </span>
        </h3>
      </div>

      {/* Esquina inf-izq: dato hero */}
      <div
        className="absolute bottom-5 left-5 flex flex-col gap-1"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.32em]"
          style={{ color: "rgba(232,216,168,0.5)" }}
        >
          Bolsa de premios
        </span>
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            color: "#c5a059",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          22.000€
        </span>
      </div>

      {/* Esquina inf-der: meta */}
      <div
        className="absolute bottom-5 right-5 text-right hidden sm:flex flex-col gap-1"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.32em]"
          style={{ color: "rgba(232,216,168,0.5)" }}
        >
          Las Palmas · GC
        </span>
        <span
          className="text-[10px] tracking-[0.18em] uppercase"
          style={{ color: "#c5a059", fontWeight: 500 }}
        >
          28 mar — 5 abr
        </span>
      </div>

      {/* Borde dorado interno fino */}
      <div
        aria-hidden
        className="absolute inset-3 pointer-events-none"
        style={{
          border: "1px solid rgba(197,160,89,0.18)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------
   JM PADEL ACADEMY — branding deportivo · royal + lime
   ------------------------------------------------------------ */
function JMPadelCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#3858B8" }}
    >
      {/* Marco de pista — verde lima */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: "8% 6%",
          border: "4px solid #E0F657",
          transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.015)" : "scale(1)",
        }}
      />
      {/* Línea horizontal media */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "6%",
          right: "6%",
          height: 0,
          borderTop: "2px solid #E0F657",
          opacity: 0.65,
        }}
      />
      {/* Línea vertical media-superior */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "8%",
          bottom: "50%",
          left: "50%",
          width: 0,
          borderLeft: "2px solid #E0F657",
          opacity: 0.65,
        }}
      />
      {/* Línea vertical media-inferior */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          bottom: "8%",
          left: "50%",
          width: 0,
          borderLeft: "2px solid #E0F657",
          opacity: 0.65,
        }}
      />

      {/* Esquinas brillantes (efecto cancha iluminada) */}
      {[
        { top: "8%", left: "6%" },
        { top: "8%", right: "6%" },
        { bottom: "8%", left: "6%" },
        { bottom: "8%", right: "6%" },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            ...pos,
            width: 40,
            height: 40,
            borderTop: pos.top ? "6px solid #E0F657" : "none",
            borderBottom: pos.bottom ? "6px solid #E0F657" : "none",
            borderLeft: pos.left ? "6px solid #E0F657" : "none",
            borderRight: pos.right ? "6px solid #E0F657" : "none",
          }}
        />
      ))}

      {/* Pelota lima — el único punto orgánico */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 28,
          height: 28,
          background: "#E0F657",
          left: "calc(50% + 6px)",
          top: "calc(50% + 4px)",
          boxShadow: "0 0 24px rgba(168,211,59,0.6)",
          transition: "transform 1.2s cubic-bezier(.2,.8,.2,1)",
          transform: hover
            ? "translate(60px, -32px) scale(1.15)"
            : "translate(0, 0) scale(1)",
        }}
      />

      {/* Bloque tipográfico central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h3
          className="leading-[0.9]"
          style={{
            fontFamily: "'Archivo', system-ui, sans-serif",
            fontWeight: 900,
            fontStyle: "italic",
            textTransform: "uppercase",
            letterSpacing: "-0.025em",
            color: "#ffffff",
            fontSize: "clamp(40px, 7.5vw, 90px)",
            textShadow: "0 2px 24px rgba(0,0,0,0.18)",
          }}
        >
          JM PADEL
          <br />
          ACADEMY
        </h3>
        <span
          className="mt-3"
          style={{
            fontFamily: "'Archivo', system-ui, sans-serif",
            fontWeight: 700,
            fontStyle: "italic",
            textTransform: "uppercase",
            color: "#E0F657",
            fontSize: "clamp(14px, 1.6vw, 20px)",
            letterSpacing: "0.02em",
          }}
        >
          Eleva tu juego.
        </span>
      </div>

      {/* Esquina sup-izq: badge */}
      <div
        className="absolute top-5 left-5"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.32em] px-2.5 py-1"
          style={{
            background: "#E0F657",
            color: "#1a1a1a",
            fontWeight: 700,
          }}
        >
          Branding
        </span>
      </div>

      {/* Esquina inf-izq y inf-der: meta */}
      <div
        className="absolute bottom-5 left-5 hidden sm:block"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 9,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
          fontWeight: 600,
        }}
      >
        Logo · Manual · Ebook · RRSS
      </div>
      <div
        className="absolute bottom-5 right-5 hidden sm:block"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 9,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
          fontWeight: 600,
        }}
      >
        2025
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   KUJME — SaaS email marketing IA · estética postal cream + terracota
   ------------------------------------------------------------ */
function KujmeCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#f0ebe3" }}
    >
      {/* Sobre / papel kraft de fondo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(196,88,46,0.04) 0px, rgba(196,88,46,0.04) 1px, transparent 1px, transparent 14px)",
        }}
      />

      {/* Banda postal diagonal arriba */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: 16,
          right: -40,
          width: 220,
          height: 32,
          background: "#a62a1a",
          transform: "rotate(15deg)",
          transformOrigin: "center",
          boxShadow: "0 2px 0 rgba(0,0,0,0.06)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: 52,
          right: -40,
          width: 220,
          height: 8,
          background: "repeating-linear-gradient(90deg, #1a1a2e 0 6px, transparent 6px 12px)",
          transform: "rotate(15deg)",
          opacity: 0.4,
        }}
      />

      {/* Sello "PRIORITY" estilo postal */}
      <div
        aria-hidden
        className="absolute"
        style={{
          top: 24,
          left: 24,
          width: 56,
          height: 56,
          border: "2px solid #a62a1a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#a62a1a",
          lineHeight: 1.05,
          textAlign: "center",
          background: "rgba(250,247,242,0.85)",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "rotate(-8deg)" : "rotate(-4deg)",
        }}
      >
        SaaS
        <br />
        ES
      </div>

      {/* Bloque tipográfico central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span
          className="text-[10px] uppercase tracking-[0.32em] mb-3"
          style={{
            color: "#a62a1a",
            fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
            fontWeight: 700,
          }}
        >
          12 · AGENTES · IA
        </span>
        <h3
          className="leading-[0.88]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#1a1a2e",
            fontSize: "clamp(56px, 10vw, 120px)",
          }}
        >
          kujme
          <span style={{ color: "#a62a1a" }}>.</span>
        </h3>
        <span
          className="mt-3 text-[11px] tracking-[0.18em] uppercase"
          style={{
            color: "rgba(26,26,46,0.65)",
            fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
            fontWeight: 600,
          }}
        >
          $6/mes · trabaja mientras duermes
        </span>
      </div>

      {/* Línea de dirección estilo postal abajo */}
      <div
        className="absolute bottom-5 left-5 right-5 flex justify-between items-end gap-3"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(26,26,46,0.55)",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          Recogida → Empaquetado
          <br />
          → Entregado
        </div>
        <div
          aria-hidden
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            opacity: 0.65,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 2,
                background: "#1a1a2e",
              }}
            />
          ))}
        </div>
      </div>

      {/* Esquina sup-der: badge precio */}
      <div
        className="absolute top-5 right-5"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.22em] px-2.5 py-1"
          style={{
            background: "#e8dfd3",
            color: "#1a1a2e",
            fontWeight: 700,
            border: "1px solid rgba(196,88,46,0.25)",
          }}
        >
          Desde 9€/mes
        </span>
      </div>

      {/* Marco kraft fino */}
      <div
        aria-hidden
        className="absolute inset-3 pointer-events-none"
        style={{
          border: "1px solid rgba(26,26,46,0.12)",
        }}
      />
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
