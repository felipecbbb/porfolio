"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang, LANGS, type Lang } from "@/lib/i18n";

const INK = "#0a0a0a";
const BG = "#ffffff";
const CORAL = "#c65248";

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

  // When the header is "solid" (scrolled or drawer open) we drop mix-blend-mode
  // and switch to a dark surface with a backdrop blur. This is what fixes the
  // illegible header on mobile when scrolling over colored sections.
  const solid = scrolled || open;

  const linkStyle = (isActive: boolean) => ({
    color: "#fff",
    textDecoration: "none" as const,
    borderBottom: isActive ? "1px solid #fff" : "1px solid transparent",
    paddingBottom: 2,
  });

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: solid ? "14px clamp(16px, 5vw, 77px)" : "20px clamp(16px, 5vw, 77px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
          mixBlendMode: solid ? "normal" : "difference",
          background: solid ? "rgba(10,10,10,0.78)" : "transparent",
          backdropFilter: solid ? "saturate(140%) blur(14px)" : "none",
          WebkitBackdropFilter: solid ? "saturate(140%) blur(14px)" : "none",
          borderBottom: solid && !open ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          color: "#fff",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.5s cubic-bezier(.2,.8,.2,1), background 0.25s ease, padding 0.25s ease, border-color 0.25s ease",
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
              background: "rgba(255,255,255,0.35)",
              display: "inline-block",
            }}
          />
          <LangSwitcher tone="light" />
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
            color: "#fff",
            padding: 8,
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
          padding: "100px 28px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)",
          overflowY: "auto",
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
            <span style={{ color: CORAL }}>.</span>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/proyectos"
            style={{ color: BG, textDecoration: "none", padding: "10px 0" }}
          >
            {t.nav.projects}
            <span style={{ color: CORAL }}>.</span>
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/#contacto"
            style={{ color: BG, textDecoration: "none", padding: "10px 0" }}
          >
            {t.nav.contact}
            <span style={{ color: CORAL }}>.</span>
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
      `}</style>
    </>
  );
}
