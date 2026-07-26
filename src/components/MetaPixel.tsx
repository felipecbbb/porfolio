"use client";

/* =========================================================
   MetaPixel — carga el pixel de Meta SOLO tras consentimiento (RGPD).
   - Si no hay NEXT_PUBLIC_META_PIXEL_ID, no renderiza ni carga nada.
   - Muestra un banner discreto (aceptar/rechazar) la primera visita.
   - La elección se guarda en localStorage; el pixel se inyecta solo
     si el usuario acepta.
   A tu volumen el pixel es MEDICIÓN + retargeting, no optimización.
   ========================================================= */

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { META_PIXEL_ID, HAS_PIXEL } from "@/lib/config";
import { INK, YELLOW } from "@/lib/brand";

const STORAGE_KEY = "fc-consent"; // "granted" | "denied"

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void; _fbq?: unknown };

let injected = false;
function injectPixel() {
  if (injected || typeof window === "undefined" || !META_PIXEL_ID) return;
  injected = true;
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  const w = window as FbqWindow;
  w.fbq?.("init", META_PIXEL_ID);
  w.fbq?.("track", "PageView");
}

export default function MetaPixel() {
  const { t } = useLang();
  const [decision, setDecision] = useState<"granted" | "denied" | null | "pending">(
    "pending"
  );

  useEffect(() => {
    if (!HAS_PIXEL) return;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    if (saved === "granted") {
      injectPixel();
      setDecision("granted");
    } else if (saved === "denied") {
      setDecision("denied");
    } else {
      setDecision(null); // sin decisión -> mostrar banner
    }
  }, []);

  if (!HAS_PIXEL) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
    if (value === "granted") injectPixel();
    setDecision(value);
  };

  // Solo se muestra el banner si no hay decisión previa.
  if (decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      style={{
        position: "fixed",
        left: "max(16px, env(safe-area-inset-left))",
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
        zIndex: 200,
        maxWidth: 520,
        margin: "0 auto",
        background: INK,
        color: "#f5f4ec",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 18,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        padding: "18px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 14,
      }}
    >
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, flex: "1 1 240px", minWidth: 0 }}>
        {t.consent.text}{" "}
        <a
          href="/privacidad"
          style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}
        >
          {t.consent.privacy}
        </a>
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => choose("denied")}
          style={{
            padding: "10px 16px",
            borderRadius: 999,
            background: "transparent",
            color: "#f5f4ec",
            border: "1.5px solid rgba(255,255,255,0.25)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t.consent.reject}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            background: YELLOW,
            color: INK,
            border: "none",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {t.consent.accept}
        </button>
      </div>
    </div>
  );
}
