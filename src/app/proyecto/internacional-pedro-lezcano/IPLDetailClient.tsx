"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

/* ── Brand tokens (extraídos del CSS real) ─────── */
const CREAM = "#f9f8f6";
const CHARCOAL = "#0e131f";
const SLATE = "#1e293b";
const GOLD = "#c5a059";
const GOLD_DIM = "#8a703e";
const GOLD_SOFT = "#e8d8a8";
const PAPER = "#ffffff";
const LINE = "#e3dfd6";
const MUTED = "#6b6657";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERIF = "var(--font-merriweather), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-inter), system-ui, sans-serif";

type Copy = {
  badge: string;
  status: string;
  back: string;
  hero1: string;
  hero2: string;
  heroDates: string;
  heroLocation: string;
  heroP: string;
  prizeBig: string;
  prizeLabel: string;
  memorialQuote: string;
  memorialAuthor: string;
  marquee: string[];
  challengeLabel: string;
  challengeTitle: string;
  challengeBody: string;
  solutionLabel: string;
  solutionTitle: string;
  solutionBody: string;
  factsLabel: string;
  factsTitle: string;
  facts: { num: string; unit: string; label: string }[];
  galleryLabel: string;
  galleryTitle: string;
  gallery: { src: string; caption: string; tall?: boolean }[];
  sponsorsLabel: string;
  sponsorsTitle: string;
  sponsorsBody: string;
  closingTitle: string;
  closingP: string;
  visit: string;
  footerNote: string;
};

const T: Record<Lang, Copy> = {
  es: {
    badge: "Las Palmas de Gran Canaria · FIAGC",
    status: "En vivo · internacionalpedrolezcano.es",
    back: "Volver a proyectos",
    hero1: "Internacional",
    hero2: "Pedro Lezcano",
    heroDates: "XVIII Edición · 28 marzo – 5 abril 2026",
    heroLocation: "Círculo Mercantil, Las Palmas de Gran Canaria",
    heroP:
      "Landing oficial del torneo internacional de ajedrez más importante de Canarias. 9 días, 9 rondas, GMs de todo el mundo y la responsabilidad de hacer que cuatro audiencias muy distintas convivan en una sola página.",
    prizeBig: "22.000€",
    prizeLabel: "en bolsa de premios. Cifra hero, no escondida en bases PDF.",
    memorialQuote: "«El ajedrez es la vida en miniatura.»",
    memorialAuthor: "Pedro Lezcano Montalvo · poeta canario",
    marquee: [
      "XVIII EDICIÓN",
      "·",
      "28 MAR — 5 ABR 2026",
      "·",
      "22.000€",
      "·",
      "SUIZO 9 RONDAS",
      "·",
      "90′+30″",
      "·",
      "VALIDEZ FIDE",
      "·",
      "LAS PALMAS",
      "·",
    ],
    challengeLabel: "I. El reto",
    challengeTitle: "Un torneo institucional con diez capas que no pueden chocar.",
    challengeBody:
      "Bases técnicas FIDE, categorías por edad y ELO, palmarés histórico, ritmo de partidas, alojamiento oficial, ocho sponsors públicos (Cabildo, Ayuntamiento, IMD, Federación, clubes), inscripción con transferencia bancaria, retransmisión en cinco plataformas y una capa turística de la isla. Todo bajo el peso de un memorial — Pedro Lezcano fue figura cultural en Canarias antes que ajedrecística.",
    solutionLabel: "II. La solución",
    solutionTitle: "La web como tablero — diez secciones, un solo hilo dorado.",
    solutionBody:
      "Hero charcoal con grid de tablero sutil. Cita memorial visible desde el primer scroll. La bolsa de 22.000€ tratada como dato hero, no enterrada en un PDF. Cronograma de 9 rondas con enlaces en directo a Chess-Results, Lichess, Chess.com, Chessbase e Info64. Formulario de inscripción con cuota dinámica (early/late), exención para GM/IM y subida del justificante bancario. Sponsors institucionales separados del flujo comercial.",
    factsLabel: "III. Datos del torneo",
    factsTitle: "Lo que importa, en cuatro números.",
    facts: [
      { num: "22.000", unit: "€", label: "Bolsa total de premios" },
      { num: "9", unit: "rondas", label: "Sistema suizo · 90′+30″" },
      { num: "22", unit: "países", label: "GMs y aficionados" },
      { num: "5", unit: "plataformas", label: "Retransmisión en directo" },
    ],
    galleryLabel: "IV. Visualmente",
    galleryTitle: "Cartel, sede y peso institucional.",
    gallery: [
      { src: "/projects/internacional-pedro-lezcano/poster.jpg", caption: "Cartel oficial XVIII edición", tall: true },
      { src: "/projects/internacional-pedro-lezcano/venue.png", caption: "Círculo Mercantil · sede" },
      { src: "/projects/internacional-pedro-lezcano/hotel-astoria.png", caption: "Hotel Bull Astoria · oficial" },
      { src: "/projects/internacional-pedro-lezcano/hotel-nh.png", caption: "NH Imperial Playa · oficial" },
    ],
    sponsorsLabel: "V. Sponsors",
    sponsorsTitle: "Ocho instituciones detrás de una landing.",
    sponsorsBody:
      "Cabildo de Gran Canaria, Instituto Municipal de Deportes (IMD), Ayuntamiento de Las Palmas, Federación Canaria de Ajedrez (FECA), Federación Insular de Ajedrez de Gran Canaria (FIAGC), Club Grandama, Club La Caja Vecindario. Cada logo debía pesar igual sin pelearse en el grid.",
    closingTitle: "El ajedrez, también, se diseña.",
    closingP:
      "Una landing institucional puede ser muchas cosas — fría, burocrática, ilegible. Aquí elegí lo opuesto: editorial, jerárquica y con un solo hilo dorado conduciendo la lectura. La web está viva y se actualiza cada edición.",
    visit: "Visita internacionalpedrolezcano.es",
    footerNote: "Felipe Cámara · Diseño y desarrollo web",
  },
  en: {
    badge: "Las Palmas de Gran Canaria · FIAGC",
    status: "Live · internacionalpedrolezcano.es",
    back: "Back to projects",
    hero1: "Internacional",
    hero2: "Pedro Lezcano",
    heroDates: "XVIII Edition · 28 March – 5 April 2026",
    heroLocation: "Círculo Mercantil, Las Palmas de Gran Canaria",
    heroP:
      "Official landing for the largest international chess tournament in the Canary Islands. 9 days, 9 rounds, Grandmasters from around the world — and the duty of making four very different audiences coexist on one page.",
    prizeBig: "€22,000",
    prizeLabel: "prize pool. Headline figure, not buried inside a PDF.",
    memorialQuote: "\"Chess is life in miniature.\"",
    memorialAuthor: "Pedro Lezcano Montalvo · Canarian poet",
    marquee: [
      "XVIII EDITION",
      "·",
      "28 MAR — 5 APR 2026",
      "·",
      "€22,000",
      "·",
      "SWISS · 9 ROUNDS",
      "·",
      "90′+30″",
      "·",
      "FIDE-RATED",
      "·",
      "LAS PALMAS",
      "·",
    ],
    challengeLabel: "I. The brief",
    challengeTitle: "An institutional tournament with ten layers that can't collide.",
    challengeBody:
      "FIDE rules, age and ELO categories, historical roll of honour, time controls, official lodging, eight public sponsors (Cabildo, City Council, IMD, Federation, clubs), bank-transfer entry, livestream on five platforms and an island tourism layer. All under the weight of a memorial — Pedro Lezcano was a cultural figure in the Canaries before a chess one.",
    solutionLabel: "II. The build",
    solutionTitle: "The site as a chessboard — ten sections, one golden thread.",
    solutionBody:
      "Charcoal hero with a subtle board grid. Memorial quote visible from the first scroll. The €22,000 prize pool treated as headline, not hidden in a PDF. 9-round schedule with live links to Chess-Results, Lichess, Chess.com, Chessbase and Info64. Entry form with dynamic fee (early/late), GM/IM exemption and proof-of-payment upload. Institutional sponsors separated from the commercial flow.",
    factsLabel: "III. The facts",
    factsTitle: "What matters, in four numbers.",
    facts: [
      { num: "22,000", unit: "€", label: "Total prize pool" },
      { num: "9", unit: "rounds", label: "Swiss system · 90′+30″" },
      { num: "22", unit: "countries", label: "GMs and amateurs" },
      { num: "5", unit: "platforms", label: "Live broadcast" },
    ],
    galleryLabel: "IV. Visually",
    galleryTitle: "Poster, venue and institutional weight.",
    gallery: [
      { src: "/projects/internacional-pedro-lezcano/poster.jpg", caption: "Official XVIII edition poster", tall: true },
      { src: "/projects/internacional-pedro-lezcano/venue.png", caption: "Círculo Mercantil · venue" },
      { src: "/projects/internacional-pedro-lezcano/hotel-astoria.png", caption: "Hotel Bull Astoria · official" },
      { src: "/projects/internacional-pedro-lezcano/hotel-nh.png", caption: "NH Imperial Playa · official" },
    ],
    sponsorsLabel: "V. Sponsors",
    sponsorsTitle: "Eight institutions behind one landing.",
    sponsorsBody:
      "Cabildo de Gran Canaria, Instituto Municipal de Deportes (IMD), Las Palmas City Council, Canarian Chess Federation (FECA), Gran Canaria Insular Chess Federation (FIAGC), Club Grandama, Club La Caja Vecindario. Each logo had to weigh the same without fighting in the grid.",
    closingTitle: "Chess, too, can be designed.",
    closingP:
      "An institutional landing can be many things — cold, bureaucratic, unreadable. Here I chose the opposite: editorial, hierarchical and with one golden thread leading the read. The site is live and refreshed each edition.",
    visit: "Visit internacionalpedrolezcano.es",
    footerNote: "Felipe Cámara · Web design & development",
  },
  de: {
    badge: "Las Palmas de Gran Canaria · FIAGC",
    status: "Live · internacionalpedrolezcano.es",
    back: "Zurück zu Projekten",
    hero1: "Internacional",
    hero2: "Pedro Lezcano",
    heroDates: "XVIII. Ausgabe · 28. März – 5. April 2026",
    heroLocation: "Círculo Mercantil, Las Palmas de Gran Canaria",
    heroP:
      "Offizielle Landing für das größte internationale Schachturnier der Kanarischen Inseln. 9 Tage, 9 Runden, Großmeister aus aller Welt — und die Pflicht, vier sehr unterschiedliche Zielgruppen auf einer Seite zu vereinen.",
    prizeBig: "22.000€",
    prizeLabel: "Preisgeld. Headline-Zahl, nicht in einer PDF versteckt.",
    memorialQuote: "„Schach ist das Leben im Kleinen.\"",
    memorialAuthor: "Pedro Lezcano Montalvo · kanarischer Dichter",
    marquee: [
      "XVIII. AUSGABE",
      "·",
      "28. MÄRZ — 5. APRIL 2026",
      "·",
      "22.000€",
      "·",
      "SCHWEIZER · 9 RUNDEN",
      "·",
      "90′+30″",
      "·",
      "FIDE-WERTUNG",
      "·",
      "LAS PALMAS",
      "·",
    ],
    challengeLabel: "I. Die Aufgabe",
    challengeTitle: "Ein institutionelles Turnier mit zehn Schichten, die nicht kollidieren dürfen.",
    challengeBody:
      "FIDE-Regeln, Alters- und ELO-Kategorien, historische Bestenliste, Bedenkzeit, offizielle Unterkunft, acht öffentliche Sponsoren (Cabildo, Stadtverwaltung, IMD, Verband, Clubs), Anmeldung per Banküberweisung, Livestream auf fünf Plattformen und eine Insel-Tourismus-Ebene. Alles unter dem Gewicht eines Memorials — Pedro Lezcano war eine kulturelle Figur auf den Kanaren, bevor er eine schachliche war.",
    solutionLabel: "II. Die Umsetzung",
    solutionTitle: "Die Site als Schachbrett — zehn Abschnitte, ein goldener Faden.",
    solutionBody:
      "Charcoal-Hero mit dezentem Brett-Grid. Memorial-Zitat vom ersten Scroll an sichtbar. Das Preisgeld von 22.000€ als Headline, nicht in einer PDF versteckt. 9-Runden-Programm mit Live-Links zu Chess-Results, Lichess, Chess.com, Chessbase und Info64. Anmeldeformular mit dynamischer Gebühr (early/late), GM/IM-Befreiung und Beleg-Upload. Institutionelle Sponsoren vom kommerziellen Fluss getrennt.",
    factsLabel: "III. Die Fakten",
    factsTitle: "Was zählt, in vier Zahlen.",
    facts: [
      { num: "22.000", unit: "€", label: "Gesamtes Preisgeld" },
      { num: "9", unit: "Runden", label: "Schweizer System · 90′+30″" },
      { num: "22", unit: "Länder", label: "GMs und Amateure" },
      { num: "5", unit: "Plattformen", label: "Live-Übertragung" },
    ],
    galleryLabel: "IV. Visuell",
    galleryTitle: "Plakat, Veranstaltungsort und institutionelles Gewicht.",
    gallery: [
      { src: "/projects/internacional-pedro-lezcano/poster.jpg", caption: "Offizielles Plakat XVIII. Ausgabe", tall: true },
      { src: "/projects/internacional-pedro-lezcano/venue.png", caption: "Círculo Mercantil · Veranstaltungsort" },
      { src: "/projects/internacional-pedro-lezcano/hotel-astoria.png", caption: "Hotel Bull Astoria · offiziell" },
      { src: "/projects/internacional-pedro-lezcano/hotel-nh.png", caption: "NH Imperial Playa · offiziell" },
    ],
    sponsorsLabel: "V. Sponsoren",
    sponsorsTitle: "Acht Institutionen hinter einer Landing.",
    sponsorsBody:
      "Cabildo de Gran Canaria, Instituto Municipal de Deportes (IMD), Stadtverwaltung Las Palmas, Kanarischer Schachverband (FECA), Insularer Schachverband Gran Canaria (FIAGC), Club Grandama, Club La Caja Vecindario. Jedes Logo musste gleich wiegen, ohne im Grid zu kämpfen.",
    closingTitle: "Auch Schach lässt sich gestalten.",
    closingP:
      "Eine institutionelle Landing kann vieles sein — kalt, bürokratisch, unlesbar. Hier wählte ich das Gegenteil: redaktionell, hierarchisch und mit einem goldenen Faden, der das Lesen führt. Die Site ist live und wird jede Ausgabe aktualisiert.",
    visit: "Besuche internacionalpedrolezcano.es",
    footerNote: "Felipe Cámara · Webdesign & Entwicklung",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Tablero sutil de fondo — referencia visual al hero real del cliente */
const BOARD_GRID =
  "linear-gradient(rgba(197,160,89,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.06) 1px, transparent 1px)";

export default function IPLDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div
      style={{
        background: CREAM,
        color: SLATE,
        fontFamily: SANS,
        minHeight: "100dvh",
      }}
    >
      <BlendNav />

      {/* ── HERO charcoal con grid de tablero ─────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100dvh",
          padding: "clamp(24px, 4vw, 56px)",
          paddingTop: "clamp(80px, 10vh, 120px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CHARCOAL,
          color: CREAM,
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: BOARD_GRID,
            backgroundSize: "64px 64px",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: `radial-gradient(circle at top right, ${GOLD}1a 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GOLD,
            fontWeight: 500,
          }}
        >
          <Link
            href="/proyectos"
            style={{ color: GOLD, textDecoration: "none", borderBottom: `1px solid ${GOLD_DIM}` }}
          >
            ← {t.back}
          </Link>
          <span>{t.status}</span>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, marginTop: "auto", position: "relative" }}>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            {t.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: "clamp(48px, 8vw, 132px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: CREAM,
              margin: 0,
            }}
          >
            {t.hero1}
            <br />
            <span
              style={{
                color: GOLD,
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              {t.hero2}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(18px, 2vw, 24px)",
                color: CREAM,
              }}
            >
              {t.heroDates}
            </span>
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.06em",
                color: GOLD_SOFT,
                fontWeight: 400,
              }}
            >
              {t.heroLocation}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              maxWidth: 640,
              fontSize: "clamp(15px, 1.3vw, 17px)",
              lineHeight: 1.65,
              color: "#cfcabb",
              marginTop: 32,
              fontWeight: 300,
            }}
          >
            {t.heroP}
          </motion.p>
        </motion.div>

        {/* Premio + cita memorial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "minmax(240px, 0.55fr) 1fr",
            gap: "clamp(24px, 4vw, 64px)",
            alignItems: "end",
            marginTop: 56,
            paddingTop: 36,
            borderTop: `1px solid ${GOLD}40`,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 900,
                fontSize: "clamp(60px, 10vw, 140px)",
                lineHeight: 0.9,
                color: GOLD,
                letterSpacing: "-0.03em",
                display: "block",
              }}
            >
              {t.prizeBig}
            </span>
            <p
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#cfcabb",
                lineHeight: 1.5,
                maxWidth: 280,
              }}
            >
              {t.prizeLabel}
            </p>
          </div>

          <blockquote
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(18px, 1.8vw, 26px)",
              lineHeight: 1.35,
              color: CREAM,
              paddingLeft: "clamp(20px, 3vw, 36px)",
              borderLeft: `2px solid ${GOLD}`,
              maxWidth: 540,
            }}
          >
            {t.memorialQuote}
            <footer
              style={{
                fontFamily: SANS,
                fontStyle: "normal",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GOLD,
                marginTop: 14,
                fontWeight: 500,
              }}
            >
              — {t.memorialAuthor}
            </footer>
          </blockquote>
        </motion.div>
      </section>

      {/* ── MARQUEE ───────────────────────────────── */}
      <section
        style={{
          background: CREAM,
          borderBottom: `1px solid ${LINE}`,
          padding: "clamp(20px, 3vw, 32px) 0",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 44, ease: "linear", repeat: Infinity }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "clamp(28px, 4.5vw, 56px)",
            color: CHARCOAL,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          {[...t.marquee, ...t.marquee, ...t.marquee].map((w, i) => (
            <span
              key={i}
              style={{
                padding: "0 clamp(14px, 2vw, 28px)",
                color: w === "·" ? GOLD : CHARCOAL,
              }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── I. EL RETO ────────────────────────────── */}
      <Section>
        <SectionHeader label={t.challengeLabel} title={t.challengeTitle} />
        <Prose>{t.challengeBody}</Prose>
      </Section>

      {/* ── II. LA SOLUCIÓN ───────────────────────── */}
      <Section background={PAPER}>
        <SectionHeader label={t.solutionLabel} title={t.solutionTitle} />
        <Prose>{t.solutionBody}</Prose>
      </Section>

      {/* ── III. FACTS ────────────────────────────── */}
      <Section>
        <SectionHeader label={t.factsLabel} title={t.factsTitle} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 0,
            marginTop: 56,
            border: `1px solid ${CHARCOAL}`,
            background: PAPER,
          }}
        >
          {t.facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "clamp(28px, 3vw, 40px)",
                borderRight: i < t.facts.length - 1 ? `1px solid ${LINE}` : "none",
                borderTop: `4px solid ${GOLD}`,
                position: "relative",
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 900,
                    fontSize: "clamp(44px, 5vw, 72px)",
                    color: CHARCOAL,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {f.num}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: GOLD_DIM,
                    marginLeft: 8,
                    letterSpacing: "0.04em",
                    fontWeight: 500,
                  }}
                >
                  {f.unit}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: MUTED,
                  lineHeight: 1.5,
                  marginTop: 16,
                  fontFamily: SANS,
                }}
              >
                {f.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── IV. GALERÍA ───────────────────────────── */}
      <Section background={PAPER}>
        <SectionHeader label={t.galleryLabel} title={t.galleryTitle} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginTop: 56,
            alignItems: "start",
          }}
        >
          {t.gallery.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.08 }}
              style={{ margin: 0 }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: g.tall ? "3/4" : "4/3",
                  overflow: "hidden",
                  background: CHARCOAL,
                  border: `1px solid ${LINE}`,
                }}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: g.src.endsWith(".png") ? "contain" : "cover", padding: g.src.endsWith(".png") ? 12 : 0 }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: MUTED,
                  fontWeight: 500,
                }}
              >
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>

      {/* ── V. SPONSORS ───────────────────────────── */}
      <Section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.55fr) 1fr",
            gap: "clamp(28px, 5vw, 80px)",
            alignItems: "start",
          }}
        >
          <SectionHeader label={t.sponsorsLabel} title={t.sponsorsTitle} inline />
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(15px, 1.2vw, 17px)",
              lineHeight: 1.7,
              color: SLATE,
              fontWeight: 400,
              maxWidth: 640,
              paddingTop: 16,
            }}
          >
            {t.sponsorsBody}
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 24,
            padding: "32px clamp(20px, 3vw, 48px)",
            background: PAPER,
            border: `1px solid ${LINE}`,
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {[
            { src: "/projects/internacional-pedro-lezcano/cabildo.jpg", alt: "Cabildo de Gran Canaria" },
            { src: "/projects/internacional-pedro-lezcano/fiagc.png", alt: "FIAGC" },
            { src: "/projects/internacional-pedro-lezcano/feca.png", alt: "FECA" },
          ].map((s) => (
            <div
              key={s.src}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/2",
                opacity: 0.85,
                filter: "grayscale(20%)",
              }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </motion.div>
      </Section>

      {/* ── CIERRE charcoal ───────────────────────── */}
      <section
        style={{
          background: CHARCOAL,
          color: CREAM,
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: BOARD_GRID,
            backgroundSize: "64px 64px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}
        >
          <h3
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1,
              color: CREAM,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t.closingTitle.split(",").map((part, i, arr) => (
              <span key={i}>
                {i > 0 && ", "}
                {i === arr.length - 1 ? (
                  <span style={{ color: GOLD, fontStyle: "italic", fontWeight: 300 }}>
                    {part.trim()}
                  </span>
                ) : (
                  part.trim()
                )}
              </span>
            ))}
          </h3>
          <p
            style={{
              maxWidth: 680,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.65,
              color: "#cfcabb",
              margin: "28px 0 44px",
              fontWeight: 300,
            }}
          >
            {t.closingP}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
            }}
          >
            <a
              href="https://internacionalpedrolezcano.es"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                background: GOLD,
                color: CHARCOAL,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
                fontFamily: SANS,
              }}
            >
              {t.visit} <span style={{ fontSize: 18 }}>↗</span>
            </a>
            <Link
              href="/proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.04em",
                fontFamily: SANS,
              }}
            >
              ← {t.back}
            </Link>
          </div>
        </motion.div>
      </section>

      <footer
        style={{
          background: CHARCOAL,
          color: GOLD_DIM,
          borderTop: `1px solid ${GOLD}30`,
          padding: "32px clamp(24px, 4vw, 56px)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {t.footerNote}
      </footer>
    </div>
  );
}

function Section({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: string;
}) {
  return (
    <section
      style={{
        padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
        background: background ?? "transparent",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  inline = false,
}: {
  label: string;
  title: string;
  inline?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span
        style={{
          fontFamily: SANS,
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: GOLD_DIM,
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize: inline
            ? "clamp(28px, 3.6vw, 48px)"
            : "clamp(32px, 4.5vw, 64px)",
          lineHeight: 1.05,
          color: CHARCOAL,
          margin: "16px 0 0",
          letterSpacing: "-0.02em",
          maxWidth: 900,
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      style={{
        marginTop: 36,
        fontFamily: SERIF,
        fontWeight: 300,
        fontSize: "clamp(16px, 1.4vw, 20px)",
        lineHeight: 1.7,
        color: SLATE,
        maxWidth: 760,
      }}
    >
      {children}
    </motion.p>
  );
}
