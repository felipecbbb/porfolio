"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang, LANGS, type Lang } from "@/lib/i18n";
import { FcLogo } from "@/lib/brand";

const INK = "#1a1916";
const BG = "#ffffff";
const YELLOW = "#ece84d";

type Active = "home" | "projects" | "contact" | "none";

export function LangSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang } = useLang();
  const fg = tone === "light" ? "#fff" : INK;
  const dim = tone === "light" ? "rgba(255,255,255,0.55)" : "#949494";

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {LANGS.map((l, i) => {
        const active = l.code === lang;
        return (
          <span key={l.code} style={{ display: "inline-flex", alignItems: "center" }}>
            {i > 0 && (
              <span aria-hidden style={{ color: dim, padding: "0 6px" }}>
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setLang(l.code as Lang)}
              aria-pressed={active}
              aria-label={l.label}
              style={{
                background: "transparent",
                border: 0,
                padding: "4px 2px",
                color: active ? fg : dim,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: active ? 600 : 500,
                letterSpacing: "inherit",
                textTransform: "inherit",
                borderBottom: active ? `1px solid ${fg}` : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {l.short}
            </button>
          </span>
        );
      })}
    </div>
  );
}

export default function BlendNav({ active = "none" }: { active?: Active }) {
  const { t } = useLang();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY;
      setScrolled(s > 30);
      if (s > 200 && s > lastScroll.current) setHidden(true);
      else setHidden(false);
      lastScroll.current = s;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Barra crema OPACA al hacer scroll (sin translucidez sucia sobre secciones
  // oscuras). Con el drawer abierto, el header se integra con el fondo oscuro
  // del menú → logo y aspas en blanco. Sin mix-blend-mode.
  const bar = scrolled && !open; // barra crema sólida
  const fg = open ? "#fff" : INK; // color de contenido del header

  const linkStyle = (isActive: boolean) => ({
    color: INK,
    textDecoration: "none" as const,
    borderBottom: isActive ? `1.5px solid ${INK}` : "1.5px solid transparent",
    paddingBottom: 2,
    fontWeight: isActive ? 600 : 500,
  });

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: bar
            ? "calc(12px + env(safe-area-inset-top))"
            : "calc(18px + env(safe-area-inset-top))",
          paddingBottom: bar ? 12 : 18,
          paddingLeft: "clamp(16px, 5vw, 77px)",
          paddingRight: "clamp(16px, 5vw, 77px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          background: bar ? "#f3efe4" : "transparent",
          borderBottom: bar ? "1px solid rgba(26,25,22,0.12)" : "1px solid transparent",
          boxShadow: bar ? "0 6px 20px rgba(26,25,22,0.06)" : "none",
          color: fg,
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.5s cubic-bezier(.2,.8,.2,1), background 0.25s ease, padding 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          pointerEvents: hidden && !open ? "none" : "auto",
        }}
      >
        <Link
          href="/"
          aria-label="Felipe Cámara — inicio"
          className="blendnav-logo"
          style={{ color: fg, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          <FcLogo size={32} color={fg} withWordmark tone={open ? "light" : "dark"} />
        </Link>

        <nav
          className="blendnav-desktop"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        >
          <Link href="/" style={linkStyle(active === "home")}>
            {t.nav.home}
          </Link>
          <Link href="/proyectos" style={linkStyle(active === "projects")}>
            {t.nav.projects}
          </Link>
          <Link href="/#contacto" style={linkStyle(active === "contact")}>
            {t.nav.contact}
          </Link>
          <span
            aria-hidden
            style={{
              width: 1,
              height: 16,
              background: "rgba(26,25,22,0.25)",
              display: "inline-block",
            }}
          />
          <LangSwitcher tone="dark" />
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="blendnav-burger"
          style={{
            display: "none",
            background: "transparent",
            border: 0,
            color: fg,
            padding: 12,
            margin: -8,
            minWidth: 44,
            minHeight: 44,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              transform: open ? "translateY(5px) rotate(45deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              marginTop: 6,
              opacity: open ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              marginTop: 6,
              transform: open ? "translateY(-9px) rotate(-45deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        style={{
          position: "fixed",
          inset: 0,
          background: INK,
          color: BG,
          zIndex: 99,
          paddingTop: "calc(96px + env(safe-area-inset-top))",
          paddingRight: "max(28px, env(safe-area-inset-right))",
          paddingBottom: "max(40px, env(safe-area-inset-bottom))",
          paddingLeft: "max(28px, env(safe-area-inset-left))",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          <Link
            onClick={() => setOpen(false)}
            href="/"
            style={{ color: BG, textDecoration: "none", padding: "10px 0" }}
          >
            {t.nav.home}
            <span style={{ color: YELLOW }}>.</span>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/proyectos"
            style={{ color: BG, textDecoration: "none", padding: "10px 0" }}
          >
            {t.nav.projects}
            <span style={{ color: YELLOW }}>.</span>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/#contacto"
            style={{ color: BG, textDecoration: "none", padding: "10px 0" }}
          >
            {t.nav.contact}
            <span style={{ color: YELLOW }}>.</span>
          </Link>
        </nav>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Lang / Sprache
          </span>
          <LangSwitcher tone="light" />
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 760px) {
          .blendnav-desktop { display: none !important; }
          .blendnav-burger { display: inline-flex !important; flex-direction: column; align-items: center; justify-content: center; }
        }
        @media (max-width: 420px) {
          .blendnav-logo .fc-wordmark { display: none !important; }
        }
      `}</style>
    </>
  );
}
