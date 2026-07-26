"use client";

/* =========================================================
   LANDING DE CIERRE — Web + reservas para turismo (tráfico Meta).
   Una promesa · una oferta · un CTA (agendar). Acceso al portfolio
   a un clic, pero sin la navegación completa que distrae.

   EDITA AQUÍ la oferta (precio, plazo, vertical) sin tocar el resto:
   ========================================================= */

import Link from "next/link";
import { motion } from "framer-motion";
import { INK, BG, CREAM, YELLOW, MUTED, LINE, Mark, Serif, FcLogo } from "@/lib/brand";
import { CAL_URL, VSL_URL } from "@/lib/config";

const OFFER = {
  vertical: "negocio de turismo en Canarias",
  priceFrom: "1.900 €", // ← confirma tu precio-desde real
  timeline: "3–4 semanas",
};

const SANS =
  "'Inter', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif";

/** CTA primario: agenda (Cal) o, si no hay Cal, al formulario. Dispara pixel. */
function ScheduleButton({ label = "Agenda 15 min", big }: { label?: string; big?: boolean }) {
  const href = CAL_URL || "/contacto";
  const external = CAL_URL.length > 0;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        const w = window as unknown as { fbq?: (...a: unknown[]) => void };
        w.fbq?.("track", "Schedule");
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: big ? "18px 34px" : "14px 26px",
        borderRadius: 999,
        background: YELLOW,
        color: INK,
        textDecoration: "none",
        fontSize: big ? 17 : 15,
        fontWeight: 700,
        letterSpacing: "0.01em",
        boxShadow: "0 12px 34px rgba(0,0,0,0.22)",
      }}
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}

function Section({
  children,
  dark,
  style,
}: {
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={dark ? "grid-paper-dark" : "grid-paper"}
      style={{
        background: dark ? INK : CREAM,
        color: dark ? BG : INK,
        padding: "clamp(72px, 11vw, 130px) clamp(20px, 5vw, 77px)",
        ...style,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

const label: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: MUTED,
  marginBottom: 22,
};

export default function TrabajoConmigoClient() {
  return (
    <main style={{ background: CREAM, color: INK, fontFamily: SANS, letterSpacing: "-0.005em", overflow: "hidden" }}>
      {/* Header mínimo: logo + acceso al portfolio (sin nav completa) */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px clamp(20px, 5vw, 77px)",
          background: "rgba(236,229,211,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <Link href="/" aria-label="Felipe Cámara — inicio" style={{ color: INK, textDecoration: "none" }}>
          <FcLogo size={30} color={INK} withWordmark tone="dark" />
        </Link>
        <Link
          href="/proyectos"
          style={{
            color: INK,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            borderBottom: `1.5px solid ${INK}`,
            paddingBottom: 2,
          }}
        >
          Ver proyectos →
        </Link>
      </header>

      {/* HERO */}
      <Section style={{ paddingTop: "clamp(56px, 8vw, 96px)" }}>
        <div style={{ ...label, color: INK, opacity: 0.55 }}>Web + Reservas · Canarias</div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            fontSize: "clamp(36px, 6vw, 82px)",
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: 960,
          }}
        >
          Recibe reservas directas{" "}
          <Mark>sin pagar comisiones</Mark> a las plataformas.
        </motion.h1>
        <p
          style={{
            fontSize: "clamp(18px, 2vw, 24px)",
            lineHeight: 1.5,
            margin: "26px 0 0",
            maxWidth: 680,
            color: "#3a3a36",
          }}
        >
          Diseño y programo la web con motor de reservas de tu {OFFER.vertical} —
          rápida, bonita y pensada para vender. Lista en {OFFER.timeline}.{" "}
          <span style={{ color: MUTED }}>Negocio, diseño y código en una sola cabeza, sin intermediarios.</span>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 36 }}>
          <ScheduleButton big />
          <span style={{ fontSize: 14, color: MUTED }}>
            Llamada de 15 min, sin compromiso · Respuesta en 24h
          </span>
        </div>

        {/* VSL / vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            marginTop: 48,
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${LINE}`,
            aspectRatio: "16 / 9",
            background: INK,
            position: "relative",
          }}
        >
          {VSL_URL ? (
            <video
              controls
              playsInline
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              src={VSL_URL}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: YELLOW,
                  color: INK,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                ▶
              </div>
              <span style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Aquí va tu vídeo de 60-90s
              </span>
            </div>
          )}
        </motion.div>
      </Section>

      {/* PROBLEMA */}
      <Section dark>
        <div style={label}>El problema</div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          Tu web no reserva. Y Booking, Airbnb o la agencia se llevan{" "}
          <Serif style={{ color: YELLOW }}>una comisión de cada cliente</Serif> que ya era tuyo.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", marginTop: 24, maxWidth: 720 }}>
          Recibes interés por Instagram y DMs, pero se pierde entre mensajes. La web es un folleto,
          no una máquina de reservas. Y cada mes pagas un 15-25% a plataformas por clientes que
          podrían reservarte directo.
        </p>
      </Section>

      {/* OFERTA */}
      <Section>
        <div style={label}>La solución</div>
        <h2
          style={{
            fontSize: "clamp(30px, 4.5vw, 60px)",
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            margin: 0,
          }}
        >
          Una web con reservas propias,{" "}
          <Mark>llave en mano</Mark>.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "clamp(28px, 5vw, 64px)",
            marginTop: 44,
            alignItems: "start",
          }}
          className="tc-offer-grid"
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Diseño a medida, con la estética de tu marca (no plantilla)",
              "Motor de reservas con pago/depósito (Stripe)",
              "Optimizada para móvil, velocidad y SEO local",
              "Integración con WhatsApp e Instagram",
              "Textos que venden + fotos tratadas",
              "Formación para que la gestiones tú",
            ].map((it) => (
              <li key={it} style={{ display: "flex", gap: 12, fontSize: 17, lineHeight: 1.45 }}>
                <span style={{ color: INK, fontWeight: 700 }}>✓</span> {it}
              </li>
            ))}
          </ul>

          <div
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 20,
              padding: "28px 26px",
              background: BG,
            }}
          >
            <div style={{ ...label, marginBottom: 10 }}>Inversión</div>
            <div style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              desde {OFFER.priceFrom}
            </div>
            <div style={{ color: MUTED, fontSize: 15, marginTop: 6 }}>
              Entrega en {OFFER.timeline} · pago en 2 partes
            </div>
            <div
              style={{
                marginTop: 22,
                paddingTop: 22,
                borderTop: `1px solid ${LINE}`,
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              <strong>Garantía sin riesgo:</strong> primero te presento el diseño de la home. Si
              no te convence, no seguimos y solo pagas esa fase. Cero letra pequeña.
            </div>
            <div style={{ marginTop: 22 }}>
              <ScheduleButton label="Reservar mi llamada" />
            </div>
          </div>
        </div>
      </Section>

      {/* 3 PASOS */}
      <Section dark>
        <div style={label}>Cómo trabajo</div>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px, 3vw, 40px)", marginTop: 8 }}
          className="tc-steps-grid"
        >
          {[
            { n: "01", t: "Llamada de 15 min", d: "Me cuentas tu negocio y te digo sin humo si puedo ayudarte y cómo." },
            { n: "02", t: "Diseño y construcción", d: "Diseño la home, la validas, y construyo la web + reservas completa." },
            { n: "03", t: "Lanzamiento", d: "La publicamos, te formo para gestionarla y empiezas a recibir reservas directas." },
          ].map((s) => (
            <div key={s.n} style={{ borderTop: `1px solid rgba(255,255,255,0.15)`, paddingTop: 20 }}>
              <div style={{ color: YELLOW, fontWeight: 700, fontSize: 15, letterSpacing: "0.1em" }}>{s.n}</div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "12px 0 8px" }}>{s.t}</h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.65)", fontSize: 15.5, lineHeight: 1.5 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRUEBA */}
      <Section>
        <div style={label}>Prueba</div>
        <blockquote style={{ margin: 0, maxWidth: 820 }}>
          <Serif style={{ display: "block", fontSize: 56, lineHeight: 0.5, color: INK, marginBottom: 20 }}>
            &ldquo;
          </Serif>
          <p style={{ fontSize: "clamp(22px, 2.6vw, 34px)", lineHeight: 1.35, fontWeight: 400, letterSpacing: "-0.01em", margin: "0 0 22px" }}>
            Felipe no solo ejecuta, entiende lo que necesitas antes de que tú mismo lo sepas. El
            mejor profesional con el que he trabajado.
          </p>
          <footer style={{ fontSize: 15, color: MUTED }}>
            <strong style={{ color: INK, fontWeight: 700 }}>Víctor Bueno Ureña</strong> · Fundador · Waya Surf
          </footer>
        </blockquote>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 44 }}>
          {[
            { slug: "samba-trips", name: "Samba Trips · 96K → reservas" },
            { slug: "entre-olas-surf", name: "Entre Olas Surf" },
            { slug: "waya-surf", name: "Waya Surf" },
          ].map((p) => (
            <Link
              key={p.slug}
              href={`/proyecto/${p.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 20px",
                borderRadius: 999,
                border: `1.5px solid ${INK}`,
                color: INK,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {p.name} <span aria-hidden>↗</span>
            </Link>
          ))}
          <Link
            href="/proyectos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 999,
              background: INK,
              color: BG,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Ver portfolio completo →
          </Link>
        </div>
      </Section>

      {/* CIERRE / AGENDA */}
      <Section dark style={{ position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "40vw",
            height: "40vw",
            background: YELLOW,
            filter: "blur(180px)",
            opacity: 0.16,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 68px)",
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: "0 0 16px",
            }}
          >
            Hablemos 15 minutos.
            <br />
            <Serif style={{ color: YELLOW }}>Sin compromiso.</Serif>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 0 32px" }}>
            Me cuentas tu negocio y te digo, sin rodeos, si una web con reservas te encaja y qué
            resultados esperar. Si no soy tu persona, te lo digo.
          </p>

          {CAL_URL ? (
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
                background: BG,
                minHeight: 640,
              }}
            >
              <iframe
                src={CAL_URL}
                title="Agenda una llamada"
                loading="lazy"
                style={{ width: "100%", height: 640, border: 0, display: "block" }}
              />
            </div>
          ) : (
            <ScheduleButton big label="Agenda tu llamada" />
          )}
        </div>
      </Section>

      {/* FOOTER mínimo */}
      <footer
        style={{
          background: INK,
          color: "rgba(255,255,255,0.6)",
          padding: "28px clamp(20px, 5vw, 77px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
        }}
      >
        <span>© 2026 Felipe Cámara · Gran Canaria</span>
        <span style={{ display: "flex", gap: 18 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Inicio
          </Link>
          <Link href="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>
            Proyectos
          </Link>
          <Link href="/privacidad" style={{ color: "inherit", textDecoration: "none" }}>
            Privacidad
          </Link>
        </span>
      </footer>

      <style jsx global>{`
        @media (max-width: 820px) {
          .tc-offer-grid {
            grid-template-columns: 1fr !important;
          }
          .tc-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
