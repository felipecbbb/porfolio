"use client";

import Image from "next/image";
import type { ProjectDetail } from "@/data/projects";

/* =========================================
   Wrapper: foto real para webs · cover diseñado para SaaS
   ========================================= */
export default function ProjectCover({
  project,
  hover,
}: {
  project: ProjectDetail;
  hover: boolean;
}) {
  // Slugs que siempre usan cover diseñado (SaaS sin foto + casos editoriales)
  const designedOnly = new Set([
    "lunin",
    "icaro",
    "wavepanel",
    "noa",
    "la-inquieta",
    "internacional-pedro-lezcano",
    "jm-padel-academy",
    "kujme",
  ]);

  // Logo de imagen disponible (se mostrará en blanco sobre la foto). Para el
  // resto se usa el NOMBRE tipografiado (como en Lunin).
  const BRAND_LOGO: Record<string, { src: string; h: string; keepColor?: boolean }> = {
    "waya-surf": { src: "/projects/waya-surf/waya-isotipo.png", h: "30cqi" },
    "grupo-axial": { src: "/projects/grupo-axial/logo.png", h: "8.5cqi" },
    "samba-trips": { src: "/projects/samba-trips/logo.png", h: "26cqi" },
    "alma-de-nomada": { src: "/projects/alma-de-nomada/logo.png", h: "28cqi" },
    // Isotipo oficial a todo color (cartel amarillo): no invertir a blanco.
    "entre-olas-surf": { src: "/projects/entre-olas-surf/isotipo.png", h: "34cqi", keepColor: true },
  };

  // Logos de TEXTO (sus webs no tienen logo-imagen): replicamos su tipografía.
  const WORDMARK: Record<string, { text: string; font: string; weight: number; ls: string; sun?: boolean }> = {
    "lorena-amadio": { text: "Lorena Amadio", font: "var(--font-raleway), system-ui, sans-serif", weight: 500, ls: "0.01em", sun: true },
  };

  // Si tiene foto real y no está en la lista de "solo diseño", muestra la foto
  // con la marca (logo o nombre) integrada abajo, estilo Lunin/ÍCARO.
  if (project.featuredImage && !designedOnly.has(project.slug)) {
    const logo = BRAND_LOGO[project.slug];
    const wm = WORDMARK[project.slug];
    return (
      <>
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          quality={90}
          sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
          style={{
            objectFit: "cover",
            transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 48%, rgba(0,0,0,0.62) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "7cqi",
            display: "flex",
            justifyContent: "center",
            padding: "0 8cqi",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={project.title}
              style={{
                height: logo.h,
                width: "auto",
                maxWidth: "86%",
                filter: logo.keepColor
                  ? "drop-shadow(0 6px 22px rgba(0,0,0,0.5))"
                  : "brightness(0) invert(1)",
              }}
            />
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: wm?.sun ? "3.5cqi" : 0, justifyContent: "center" }}>
              {wm?.sun && (
                <span
                  aria-hidden
                  style={{
                    width: "7cqi",
                    height: "7cqi",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      "radial-gradient(circle at 48% 44%, rgba(246,164,85,0.98) 0%, rgba(249,181,105,0.7) 38%, rgba(255,238,213,0.12) 92%)",
                  }}
                />
              )}
              <span
                style={{
                  color: "#fff",
                  fontFamily: wm?.font ?? project.theme.font,
                  fontWeight: wm?.weight ?? 600,
                  fontSize: "clamp(17px, 10.5cqi, 40px)",
                  letterSpacing: wm?.ls ?? "-0.01em",
                  lineHeight: 1,
                  textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                  whiteSpace: "nowrap",
                }}
              >
                {wm?.text ?? project.title}
              </span>
            </span>
          )}
        </div>
      </>
    );
  }

  switch (project.slug) {
    case "lunin":
      return <LuninCover hover={hover} />;
    case "icaro":
      return <IcaroCover hover={hover} />;
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
   LUNIN COCKTAIL BAR — foto real + marca (oro/serif)
   ------------------------------------------------------------ */
function LuninCover({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0d0d0d" }}>
      <Image
        src="/projects/lunin/cover-cherry.jpg"
        alt="Lunin Cocktail Bar"
        fill
        sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.05)" : "scale(1)",
        }}
      />
      {/* Degradado inferior para el rótulo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,13,0.15) 0%, transparent 30%, transparent 55%, rgba(13,13,13,0.85) 100%)",
        }}
      />
      {/* Rótulo de marca */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center" style={{ padding: "6cqi" }}>
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: "#f9f2e0",
            fontSize: "clamp(24px, 17cqi, 56px)",
            lineHeight: 1,
          }}
        >
          LUNIN
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(8px, 2.8cqi, 11px)",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#deab3b",
            marginTop: "3cqi",
          }}
        >
          Cocktail Bar
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   ÍCARO — sneakers · foto real + logo (minimalista)
   ------------------------------------------------------------ */
function IcaroCover({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0a0a0a" }}>
      <Image
        src="/projects/icaro/cover.jpg"
        alt="ÍCARO"
        fill
        quality={92}
        sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Logo ÍCARO vectorial (invertido a blanco) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/icaro/logo.svg"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: "7cqi",
          transform: "translateX(-50%)",
          width: "52cqi",
          filter: "brightness(0) invert(1)",
        }}
      />
    </div>
  );
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
          className="leading-[0.9]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            fontSize: "clamp(20px, 15cqi, 54px)",
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
          className="leading-[0.9]"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            color: "#0a1628",
            fontSize: "clamp(34px, 28cqi, 86px)",
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
          className="leading-[1.05]"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#3d3528",
            fontSize: "clamp(26px, 19cqi, 58px)",
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
    <Image
      src="/projects/la-inquieta/cartel.png"
      alt="Cartel de La Inquieta · Caseta Nº154 · Feria de Jerez"
      fill
      sizes="(max-width: 440px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
      style={{
        objectFit: "cover",
        objectPosition: "center top",
        transition: "transform 1s cubic-bezier(.2,.8,.2,1)",
        transform: hover ? "scale(1.04)" : "scale(1)",
      }}
    />
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
          fontSize: "clamp(150px, 95cqi, 360px)",
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
            fontSize: "clamp(28px, 17cqi, 66px)",
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
            fontSize: "clamp(16px, 9cqi, 30px)",
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
            fontSize: "clamp(24px, 16cqi, 62px)",
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
            fontSize: "clamp(10px, 4.5cqi, 18px)",
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
   KUJME — SaaS email marketing IA · minimalista cream + terracota
   ------------------------------------------------------------ */
function KujmeCover({ hover }: { hover: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#f0ebe3" }}
    >
      {/* Halo terracota sutil — único elemento decorativo */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "-25%",
          right: "-20%",
          width: "70%",
          aspectRatio: "1",
          background: "radial-gradient(circle, rgba(196,88,46,0.18) 0%, transparent 70%)",
          filter: "blur(24px)",
          transition: "transform 1.1s cubic-bezier(.2,.8,.2,1)",
          transform: hover ? "scale(1.12)" : "scale(1)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          style={{
            color: "#a62a1a",
            fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(9px, 3cqi, 12px)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: "8cqi",
          }}
        >
          Email · IA
        </span>
        <h3
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#1a1a2e",
            lineHeight: 0.9,
            fontSize: "clamp(34px, 26cqi, 90px)",
            margin: 0,
          }}
        >
          kujme<span style={{ color: "#a62a1a" }}>.</span>
        </h3>
        <span
          style={{
            color: "rgba(26,26,46,0.6)",
            fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: "clamp(9px, 3cqi, 12px)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginTop: "7cqi",
          }}
        >
          trabaja mientras duermes
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
        padding: "clamp(16px, 7cqi, 40px)",
      }}
    >
      <span
        style={{
          fontSize: "clamp(24px, 14cqi, 64px)",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 0.98,
          textAlign: "center",
        }}
      >
        {title}
      </span>
    </div>
  );
}
