"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { LangSwitcher } from "@/components/BlendNav";
import { INK, BG, YELLOW, MUTED, Mark, FcLogo } from "@/lib/brand";

export default function SiteFooter() {
  const { t, lang } = useLang();

  const nav = {
    es: { label: "Navegación", items: [["Inicio", "/"], ["Proyectos", "/proyectos"], ["Contacto", "/contacto"]] },
    en: { label: "Navigation", items: [["Home", "/"], ["Work", "/proyectos"], ["Contact", "/contacto"]] },
    de: { label: "Navigation", items: [["Start", "/"], ["Projekte", "/proyectos"], ["Kontakt", "/contacto"]] },
  }[lang];

  const reachLabel = { es: "Contacto", en: "Get in touch", de: "Kontakt" }[lang];
  const followLabel = { es: "Sígueme", en: "Follow", de: "Folgen" }[lang];

  return (
    <footer
      className="grid-paper-dark"
      style={{
        background: INK,
        color: BG,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "clamp(64px, 9vw, 110px) clamp(20px, 5vw, 77px) 28px",
      }}
    >
      {/* Logo (lockup tipografiado — sustituir por el logotipo nuevo cuando llegue) */}
      <div style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}>
        <FcLogo size={46} color={BG} withWordmark withTagline tone="light" />
      </div>

      {/* Columnas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "clamp(28px, 4vw, 56px)",
          paddingBottom: "clamp(40px, 6vw, 64px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
        className="site-footer-grid"
      >
        <div>
          <p
            style={{
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: 380,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            {t.hero.headPre} <Mark>{t.hero.headMark}</Mark> {t.hero.headPost}
          </p>
        </div>

        <FooterCol label={nav.label}>
          {nav.items.map(([txt, href]) => (
            <FooterLink key={href} href={href}>
              {txt}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol label={followLabel}>
          <FooterLink href="https://instagram.com/felippe.camara" external>
            Instagram ↗
          </FooterLink>
          <FooterLink href="https://tiktok.com/@felippe.camara" external>
            TikTok ↗
          </FooterLink>
        </FooterCol>

        <FooterCol label={reachLabel}>
          <FooterLink href="mailto:hola@felippecamara.com" external>
            hola@felippecamara.com
          </FooterLink>
          <span style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{t.hero.location}</span>
        </FooterCol>
      </div>

      {/* Barra inferior */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          fontSize: 13,
          color: MUTED,
          letterSpacing: "0.02em",
        }}
      >
        <span>{t.footer.rights}</span>
        <LangSwitcher tone="light" />
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.site-footer-grid) {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px 24px !important;
          }
        }
        @media (max-width: 520px) {
          :global(.site-footer-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: MUTED,
          marginBottom: 18,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const style: React.CSSProperties = {
    color: BG,
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "-0.01em",
    width: "fit-content",
    transition: "color 0.25s ease",
  };
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = YELLOW;
  };
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = BG;
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </Link>
  );
}
