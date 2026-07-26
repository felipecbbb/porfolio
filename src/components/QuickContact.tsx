"use client";

/* =========================================================
   QuickContact — vías de contacto de baja fricción para tráfico
   frío/de pago: agendar llamada (Cal.com) + WhatsApp precargado.
   Degrada con elegancia: si no hay CAL_URL ni WHATSAPP_NUMBER
   configurados, no renderiza nada (queda el formulario/email).
   ========================================================= */

import { useLang } from "@/lib/i18n";
import {
  CAL_URL,
  WHATSAPP_NUMBER,
  whatsappUrl,
  WA_MESSAGES,
  WORK_PHONE_DISPLAY,
  WORK_PHONE_TEL,
} from "@/lib/config";
import { YELLOW } from "@/lib/brand";

const BG = "#f5f4ec";

/** Dispara un evento estándar del pixel de Meta si está cargado. */
function track(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  w.fbq?.("track", event);
}

export default function QuickContact({
  tone = "dark",
}: {
  /** "dark" sobre fondo oscuro (por defecto), "light" sobre crema. */
  tone?: "dark" | "light";
}) {
  const { t, lang } = useLang();
  const hasCal = CAL_URL.length > 0;
  const hasWa = WHATSAPP_NUMBER.length > 0;
  if (!hasCal && !hasWa) return null;

  const onDark = tone === "dark";
  const secBorder = onDark ? "rgba(255,255,255,0.22)" : "rgba(26,25,22,0.25)";
  const secColor = onDark ? BG : "#1c1b1b";
  const mutedColor = onDark ? "rgba(255,255,255,0.6)" : "rgba(26,25,22,0.55)";
  const waHref = whatsappUrl(WA_MESSAGES[lang]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {hasCal ? (
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Schedule")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 26px",
            borderRadius: 999,
            background: YELLOW,
            color: "#1c1b1b",
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.01em",
            boxShadow: "0 10px 30px rgba(0,0,0,.25)",
          }}
        >
          {t.contact.scheduleCta} <span aria-hidden>→</span>
        </a>
      ) : null}

      {hasWa ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Contact")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 24px",
            borderRadius: 999,
            background: "transparent",
            color: secColor,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.01em",
            border: `1.5px solid ${secBorder}`,
          }}
        >
          {t.contact.whatsappCta} <span aria-hidden>↗</span>
        </a>
      ) : null}
      </div>

      <a
        href={`tel:${WORK_PHONE_TEL}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: mutedColor,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <span aria-hidden>Tel.</span> {WORK_PHONE_DISPLAY}
      </a>
    </div>
  );
}
