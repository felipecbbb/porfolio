"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProjectDetail } from "@/data/projects";

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
      <BlendNav />
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
   HEADER mix-blend-mode difference
   ========================================= */
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
        <Link
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            borderBottom: "1px solid #fff",
            paddingBottom: 2,
          }}
        >
          Inicio
        </Link>
        <Link href="/proyectos" style={{ color: "#fff", textDecoration: "none" }}>
          Proyectos
        </Link>
        <a href="#contacto" style={{ color: "#fff", textDecoration: "none" }}>
          Contacto
        </a>
      </nav>
    </header>
  );
}

/* =========================================
   HERO XXL
   ========================================= */
function HeroXXL() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section
      style={{
        padding: "clamp(140px, 18vh, 220px) clamp(20px, 5vw, 77px) 60px",
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
            · Felipe Cámara / Portfolio 2026
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
            Disponible para proyectos
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(68px, 12vw, 200px)",
            lineHeight: 0.88,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
          }}
        >
          Desarrollo.
          <br />
          <span style={{ color: MUTED }}>Diseño.</span>
          <br />
          Estrategia
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
            Freelance · España
          </div>
          <p
            style={{
              fontSize: "clamp(17px, 1.3vw, 20px)",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            No solo diseño, no solo programo, no solo estrategia.{" "}
            <span style={{ color: MUTED }}>
              Las tres cosas: entiendo el negocio, diseño la solución y la construyo.
            </span>
          </p>
        </div>
      </motion.div>

      <ScrollHint />
      <style jsx>{`
        @media (max-width: 720px) {
          :global(.hero-foot) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

function ScrollHint() {
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
      Desliza
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
        padding: "24px 0",
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
          fontSize: "clamp(48px, 8vw, 100px)",
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
  return (
    <section
      style={{
        padding: "120px clamp(20px, 5vw, 77px)",
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
            · 02 / Proyectos
          </div>
          <h2
            style={{
              fontSize: "clamp(56px, 10vw, 160px)",
              lineHeight: 0.9,
              fontWeight: 500,
              letterSpacing: "-0.06em",
              margin: 0,
            }}
          >
            Últimos
            <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
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
          Ver todos <span>→</span>
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
          }
        }
      `}</style>
    </section>
  );
}

function FeaturedCard({ project }: { project: ProjectDetail }) {
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
                fontSize: "clamp(40px, 7vw, 100px)",
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
          Ver →
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", gap: 16 }}>
        <h3
          style={{
            fontSize: "clamp(24px, 2.4vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1,
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
        {project.category}
      </div>
    </Link>
  );
}

/* =========================================
   WORD MARQUEE (second, lighter)
   ========================================= */
function WordMarquee() {
  const words = ["desarrollo", "diseño", "estrategia", "producto", "growth"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "30px 0",
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
          fontSize: "clamp(42px, 6vw, 80px)",
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
  const services = [
    {
      id: "01",
      title: "Desarrollo de Software",
      desc: "SaaS, apps web, plataformas, automatizaciones. Código limpio, escalable, con tests.",
      includes: ["Arquitectura técnica", "Desarrollo full-stack", "Base de datos y API", "Deploy y mantenimiento", "Tests automatizados"],
    },
    {
      id: "02",
      title: "Desarrollo Web",
      desc: "Webs que convierten. Rápidas, responsive, optimizadas para SEO y pensadas para vender.",
      includes: ["Diseño UI/UX", "Desarrollo responsive", "SEO técnico", "Optimización de velocidad", "Analytics"],
    },
    {
      id: "03",
      title: "Gestión de Redes Sociales",
      desc: "Estrategia, contenido y gestión completa. Para empresas e influencers que quieren crecer de verdad.",
      includes: ["Estrategia de contenido", "Creación de publicaciones", "Gestión de comunidad", "Informes mensuales", "Crecimiento orgánico"],
    },
    {
      id: "04",
      title: "Consultoría Digital",
      desc: "Te digo lo que necesitas oír, no lo que quieres escuchar. Análisis, plan de acción, ejecución.",
      includes: ["Auditoría digital", "Plan de acción", "Recomendaciones técnicas", "Seguimiento"],
    },
  ];

  return (
    <section
      style={{
        padding: "140px clamp(20px, 5vw, 77px)",
        background: INK,
        color: BG,
      }}
    >
      <div style={{ marginBottom: 80, maxWidth: 1200 }}>
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
          · 03 / Servicios
        </div>
        <h2
          style={{
            fontSize: "clamp(56px, 10vw, 160px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: 0,
          }}
        >
          Lo que hago
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </h2>
      </div>

      <div>
        {services.map((s, i) => (
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
      style={{
        borderTop: `1px solid rgba(255,255,255,0.12)`,
        padding: "36px 0",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr auto",
          gap: "clamp(20px, 3vw, 60px)",
          alignItems: "baseline",
        }}
        className="home-svc-row"
      >
        <span
          style={{
            fontSize: 14,
            color: MUTED,
            letterSpacing: "0.15em",
            fontWeight: 500,
          }}
        >
          / {id}
        </span>
        <h3
          style={{
            fontSize: "clamp(32px, 5vw, 68px)",
            lineHeight: 1,
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
            fontSize: 24,
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
            gap: "clamp(20px, 3vw, 60px)",
            paddingTop: 32,
            paddingBottom: 8,
          }}
          className="home-svc-row"
        >
          <div />
          <p
            style={{
              fontSize: 18,
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
            grid-template-columns: 50px 1fr auto !important;
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
  return (
    <section
      style={{
        padding: "140px clamp(20px, 5vw, 77px)",
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
        · 04 / Sobre mí
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "clamp(40px, 6vw, 100px)",
          alignItems: "end",
          marginBottom: 80,
        }}
        className="home-about-grid"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(38px, 5.5vw, 88px)",
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Soy Felipe.
          <br />
          <span style={{ color: MUTED }}>Desarrollo software,</span>
          <br />
          diseño webs y
          <br />
          <span style={{ color: MUTED }}>gestiono redes sociales</span>
          <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
        </motion.h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0 }}>
            Mi diferencial es que no solo hago una cosa. Entiendo el negocio, diseño la
            solución y la construyo. Sin intermediarios, sin teléfono roto, sin excusas.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.55, margin: 0, color: MUTED }}>
            Fundé <strong style={{ color: INK }}>Kujme</strong>, un SaaS de email marketing con IA. Gestiono marcas en
            redes sociales. Y estoy construyendo en público todo lo que hago.
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
        <Stat num="15+" label="Proyectos entregados" />
        <Stat num="10+" label="Clientes" />
        <Stat num="102" label="Tests escritos" />
        <Stat num="∞" label="Cafés" />
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
          Stack principal
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "Supabase", "PostgreSQL", "Stripe", "OpenAI"].map(
            (t) => (
              <span
                key={t}
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
                {t}
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
          fontSize: "clamp(44px, 6vw, 80px)",
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
          letterSpacing: "0.2em",
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
  const items = [
    {
      quote:
        "Felipe no solo ejecuta, entiende lo que necesitas antes de que tú mismo lo sepas. El mejor profesional con el que he trabajado.",
      name: "Cliente Savanna",
      role: "Marca de lifestyle",
    },
    {
      quote:
        "La diferencia de trabajar con alguien que programa, diseña y entiende de negocio es brutal. Todo encaja.",
      name: "Próximo testimonio",
      role: "¿Serás tú?",
    },
  ];

  return (
    <section
      style={{
        padding: "140px clamp(20px, 5vw, 77px)",
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
        · 05 / Lo que dicen
      </div>
      <h2
        style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          lineHeight: 0.9,
          fontWeight: 500,
          letterSpacing: "-0.05em",
          margin: "0 0 80px",
        }}
      >
        Palabra de
        <br />
        <span style={{ color: MUTED }}>quien lo</span> usa
        <span style={{ color: CORAL, fontStyle: "italic" }}>.</span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(30px, 4vw, 60px)",
        }}
        className="home-t-grid"
      >
        {items.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              margin: 0,
              padding: "40px 0",
              borderTop: `1px solid ${LINE}`,
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 72,
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
                fontSize: "clamp(22px, 2vw, 30px)",
                lineHeight: 1.3,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: "0 0 40px",
              }}
            >
              {t.quote}
            </p>
            <footer style={{ fontSize: 14, color: MUTED }}>
              <strong style={{ color: INK, fontWeight: 600 }}>{t.name}</strong> · {t.role}
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
  return (
    <section
      id="contacto"
      style={{
        padding: "160px clamp(20px, 5vw, 77px)",
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
          · 06 / Contacto
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(60px, 12vw, 200px)",
            lineHeight: 0.9,
            fontWeight: 500,
            letterSpacing: "-0.06em",
            margin: "0 0 60px",
          }}
        >
          ¿Tienes un<br />proyecto?
          <br />
          <span style={{ fontStyle: "italic", color: CORAL }}>Hablemos.</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(30px, 5vw, 80px)",
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
                padding: "22px 36px",
                borderRadius: 999,
                background: CORAL,
                color: BG,
                textDecoration: "none",
                fontSize: 17,
                fontWeight: 500,
                letterSpacing: "0.02em",
                transition: "transform 0.3s ease, background 0.3s ease",
                marginBottom: 24,
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
              Respuesta en menos de 24h. Cuéntame qué necesitas y te digo si soy la
              persona indicada — o te mando a alguien que sí.
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
              Sígueme
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
        fontSize: 18,
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
      <span>
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
  return (
    <footer
      style={{
        padding: "30px clamp(20px, 5vw, 77px)",
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
      <span style={{ color: MUTED }}>© 2026 Felipe Cámara — Todos los derechos reservados</span>
      <Link href="/proyectos" style={{ color: BG, textDecoration: "none", fontWeight: 500 }}>
        Ver proyectos →
      </Link>
    </footer>
  );
}
