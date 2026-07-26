"use client";

/* =========================================================
   /contacto — página de contacto dedicada.
   Nav + sección oscura con el formulario (pide también el teléfono
   del cliente) + email directo a hola@felippecamara.com + footer.
   ========================================================= */

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import QuickContact from "@/components/QuickContact";
import { INK, BG, YELLOW, MUTED, Serif } from "@/lib/brand";

export default function ContactoClient() {
  const { t } = useLang();
  return (
    <>
      <BlendNav active="contact" />
      <main
        className="grid-paper-dark"
        style={{
          background: INK,
          color: BG,
          minHeight: "100vh",
          paddingTop: "clamp(130px, 18vh, 220px)",
          paddingBottom: "clamp(70px, 10vw, 120px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-15%",
            left: "-8%",
            width: "42vw",
            height: "42vw",
            background: YELLOW,
            filter: "blur(190px)",
            opacity: 0.14,
            pointerEvents: "none",
          }}
        />
        <section
          style={{
            position: "relative",
            padding: "0 clamp(20px, 5vw, 77px)",
            maxWidth: 1320,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 22,
            }}
          >
            {t.contact.label}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              fontSize: "clamp(40px, 6.5vw, 92px)",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              margin: "0 0 48px",
              wordBreak: "break-word",
            }}
          >
            {t.contact.titleA}
            <br />
            {t.contact.titleB}
            <br />
            <Serif style={{ color: YELLOW }}>{t.contact.titleAccent}</Serif>
          </motion.h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              gap: "clamp(28px, 5vw, 80px)",
              alignItems: "start",
            }}
            className="home-contact-grid"
          >
            <ContactForm />

            <div>
              <QuickContact tone="dark" />
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
                  margin: "0 0 28px",
                  maxWidth: 440,
                }}
              >
                {t.contact.body}
              </p>
              <a
                href="mailto:hola@felippecamara.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 22px",
                  borderRadius: 999,
                  background: "transparent",
                  color: BG,
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  wordBreak: "break-all",
                }}
              >
                hola@felippecamara.com <span style={{ fontSize: 18 }}>→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
