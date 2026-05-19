"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

/* ── Brand tokens (extraídos de wayasurf.com) ───── */
const YELLOW = "#FDD802";
const YELLOW_SOFT = "#ffe94d";
const YELLOW_DEEP = "#e8c702";
const DARK = "#1a1a1a";
const WHITE = "#ffffff";
const GRAY_LIGHT = "#f5f5f5";
const GRAY_LINE = "#e8e8e8";
const GRAY = "#666666";
const GRAY_DEEP = "#444444";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-outfit), system-ui, sans-serif";
const SANS = "var(--font-inter), system-ui, sans-serif";

type Copy = {
  badge: string;
  status: string;
  back: string;
  hero1: string;
  heroNomeLabel: string;
  heroNomeMeaning: string;
  heroP: string;
  statBig: string;
  statLabel: string;
  marquee: string[];
  methodLabel: string;
  methodA: string;
  methodHl: string;
  method1Title: string;
  method1Body: string;
  method2Title: string;
  method2Body: string;
  levelsLabel: string;
  levelsA: string;
  levelsHl: string;
  levels: { range: string; title: string; body: string }[];
  victorLabel: string;
  victorTitle: string;
  victorBody: string;
  victorMeta: string;
  servicesLabel: string;
  servicesA: string;
  servicesHl: string;
  services: { tag: string; title: string; body: string; img: string }[];
  bonoLabel: string;
  bonoA: string;
  bonoHl: string;
  bonoBody: string;
  bonoTags: string[];
  galleryLabel: string;
  galleryA: string;
  galleryHl: string;
  gallery: { src: string; caption: string }[];
  testimonialBody: string;
  testimonialMeta: string;
  closingA: string;
  closingHl: string;
  closingP: string;
  visit: string;
  footerNote: string;
};

const T: Record<Lang, Copy> = {
  es: {
    badge: "Playa del Hombre · Telde · Gran Canaria",
    status: "En vivo · wayasurf.com",
    back: "Volver a proyectos",
    hero1: "WAYA",
    heroNomeLabel: "Suajili para",
    heroNomeMeaning: "camino",
    heroP:
      "Web para la escuela de Víctor Bueno Ureña. 15 años poniendo a gente de pie sobre una tabla en el Atlántico canario. Una web que cuenta el método antes que el precio.",
    statBig: "95%",
    statLabel:
      "de los alumnos se pone de pie en su primera clase. La cifra que abre la conversación.",
    marquee: [
      "PLAYA DEL HOMBRE",
      "·",
      "TELDE",
      "·",
      "ATLÁNTICO",
      "·",
      "15 AÑOS",
      "·",
      "GRUPOS DE 8",
      "·",
      "WAYA KIDS",
      "·",
      "BONO RESIDENTE",
      "·",
      "FEDERACIÓN ESPAÑOLA",
      "·",
    ],
    methodLabel: "El método",
    methodA: "Antes del mar,",
    methodHl: "la arena.",
    method1Title: "Teoría en arena",
    method1Body:
      "El alumno entiende olas, corrientes, la postura y los movimientos sin agua. Se práctica en seco hasta que el cuerpo lo recuerda.",
    method2Title: "Práctica en agua",
    method2Body:
      "Grupos de ocho como máximo. El instructor en el agua, no en la orilla. Una primera ola en la primera clase — no es promesa, es porcentaje.",
    levelsLabel: "Niveles",
    levelsA: "El camino",
    levelsHl: "tiene tres tramos.",
    levels: [
      {
        range: "0—1",
        title: "Tu primera ola",
        body: "Nunca te has subido a una tabla. Sales del agua de pie y queriendo volver.",
      },
      {
        range: "2—3",
        title: "Paddle out",
        body: "Ya remas, ya lees el line-up. Aprendes a buscar la ola correcta y a salir sin pelearte con la espuma.",
      },
      {
        range: "4+",
        title: "Libertad",
        body: "Surfeas a tu ritmo. Las clases se vuelven sesiones — pulir, corregir, perder el miedo a olas más grandes.",
      },
    ],
    victorLabel: "Víctor",
    victorTitle: "Quien enseña importa.",
    victorBody:
      "Víctor Bueno Ureña lleva quince años titulado por la Federación Española de Surf. Antes de Waya, surfeó en escuelas dentro y fuera de España. La web le dedica una sección entera — no como CV, como contexto: el alumno sabe a quién está pagando.",
    victorMeta: "Fundador e instructor · Waya Surf",
    servicesLabel: "Servicios",
    servicesA: "Tres puertas",
    servicesHl: "al mismo mar.",
    services: [
      {
        tag: "Desde 40€ · 2h",
        title: "Clases",
        body: "Material, neopreno y seguro incluidos. Grupales, privadas, semi-privadas y familiares.",
        img: "/projects/waya-surf/service-clases.jpg",
      },
      {
        tag: "Desde 5€",
        title: "Alquiler",
        body: "Tablas soft y de fibra, neoprenos y duchas. Para quien ya sabe y solo necesita material.",
        img: "/projects/waya-surf/service-alquiler.jpg",
      },
      {
        tag: "Próximamente",
        title: "Surf Camp",
        body: "Alojamiento, coaching diario y yoga. El paquete completo para venir una semana a por todo.",
        img: "/projects/waya-surf/service-surfcamp.jpg",
      },
    ],
    bonoLabel: "Bono residente",
    bonoA: "Para quien vive",
    bonoHl: "donde otros vienen de vacaciones.",
    bonoBody:
      "Gran Canaria es destino turístico — y eso suele pisar al residente. Diseñé un bloque separado en la web para el bono local: packs de 4 u 8 sesiones, tarifa reducida, sin mezclar con el flujo del turista. Conversión de barrio.",
    bonoTags: ["Pack 4 sesiones", "Pack 8 sesiones", "Tarifa local", "Sin caducidad agresiva"],
    galleryLabel: "Galería",
    galleryA: "Lo que ves",
    galleryHl: "al entrar.",
    gallery: [
      { src: "/projects/waya-surf/carousel-grupales.jpg", caption: "Clases grupales" },
      { src: "/projects/waya-surf/carousel-privadas.jpg", caption: "Clases privadas" },
      { src: "/projects/waya-surf/carousel-semiprivadas.jpg", caption: "Semi-privadas" },
      { src: "/projects/waya-surf/carousel-familiar.jpg", caption: "Familiares" },
    ],
    testimonialBody:
      "«Víctor es un gran instructor, paciente y tranquilizador. Muy recomendable.»",
    testimonialMeta: "Elena · Reseña Google 5.0",
    closingA: "El camino,",
    closingHl: "una web.",
    closingP:
      "15 años de escuela condensados en un site que no te empuja a reservar — te empuja a entender. Reservar viene solo cuando lo entiendes.",
    visit: "Visita wayasurf.com",
    footerNote: "Felipe Cámara · Diseño y desarrollo web",
  },
  en: {
    badge: "Playa del Hombre · Telde · Gran Canaria",
    status: "Live · wayasurf.com",
    back: "Back to projects",
    hero1: "WAYA",
    heroNomeLabel: "Swahili for",
    heroNomeMeaning: "path",
    heroP:
      "Site for Víctor Bueno Ureña's school. 15 years getting people on a board in the Canarian Atlantic. A website that tells the method before the price.",
    statBig: "95%",
    statLabel:
      "of students stand up in their first class. The number that opens the conversation.",
    marquee: [
      "PLAYA DEL HOMBRE",
      "·",
      "TELDE",
      "·",
      "ATLANTIC",
      "·",
      "15 YEARS",
      "·",
      "GROUPS OF 8",
      "·",
      "WAYA KIDS",
      "·",
      "RESIDENT PASS",
      "·",
      "SPANISH FEDERATION",
      "·",
    ],
    methodLabel: "The method",
    methodA: "Before the sea,",
    methodHl: "the sand.",
    method1Title: "Theory on sand",
    method1Body:
      "Students understand waves, currents, stance and movement without water. Dry practice until the body remembers.",
    method2Title: "Practice in water",
    method2Body:
      "Groups of eight max. Instructor in the water, not on the shore. A first wave on day one — not a promise, a percentage.",
    levelsLabel: "Levels",
    levelsA: "The path",
    levelsHl: "has three stages.",
    levels: [
      {
        range: "0—1",
        title: "Your first wave",
        body: "Never been on a board. You leave the water standing — and wanting to come back.",
      },
      {
        range: "2—3",
        title: "Paddle out",
        body: "You paddle, you read the line-up. You learn to pick the right wave and get out without fighting whitewater.",
      },
      {
        range: "4+",
        title: "Freedom",
        body: "You surf at your own pace. Classes become sessions — polish, correct, lose the fear of bigger waves.",
      },
    ],
    victorLabel: "Víctor",
    victorTitle: "Who teaches matters.",
    victorBody:
      "Víctor Bueno Ureña has been certified by the Spanish Surf Federation for fifteen years. Before Waya he surfed and taught inside and outside Spain. The site gives him a full section — not as a CV, as context: the student knows who they're paying.",
    victorMeta: "Founder & instructor · Waya Surf",
    servicesLabel: "Services",
    servicesA: "Three doors",
    servicesHl: "to the same sea.",
    services: [
      {
        tag: "From €40 · 2h",
        title: "Lessons",
        body: "Board, wetsuit and insurance included. Group, private, semi-private and family.",
        img: "/projects/waya-surf/service-clases.jpg",
      },
      {
        tag: "From €5",
        title: "Rental",
        body: "Soft and fiberglass boards, wetsuits and showers. For those who already know and just need gear.",
        img: "/projects/waya-surf/service-alquiler.jpg",
      },
      {
        tag: "Coming soon",
        title: "Surf Camp",
        body: "Accommodation, daily coaching and yoga. The full package for those coming for a week.",
        img: "/projects/waya-surf/service-surfcamp.jpg",
      },
    ],
    bonoLabel: "Resident pass",
    bonoA: "For people who live",
    bonoHl: "where others come on holiday.",
    bonoBody:
      "Gran Canaria is a tourist destination — and that usually steamrolls the resident. I built a separate block in the site for the local pass: 4 or 8 session packs, reduced rate, not mixed with the tourist flow. Local conversion.",
    bonoTags: ["4-session pack", "8-session pack", "Local rate", "No aggressive expiry"],
    galleryLabel: "Gallery",
    galleryA: "What you see",
    galleryHl: "when you walk in.",
    gallery: [
      { src: "/projects/waya-surf/carousel-grupales.jpg", caption: "Group lessons" },
      { src: "/projects/waya-surf/carousel-privadas.jpg", caption: "Private lessons" },
      { src: "/projects/waya-surf/carousel-semiprivadas.jpg", caption: "Semi-private" },
      { src: "/projects/waya-surf/carousel-familiar.jpg", caption: "Family" },
    ],
    testimonialBody:
      "\"Víctor is a great instructor, patient and reassuring. Highly recommended.\"",
    testimonialMeta: "Elena · Google 5.0 review",
    closingA: "The path,",
    closingHl: "as a website.",
    closingP:
      "15 years of school condensed into a site that doesn't push you to book — it pushes you to understand. Booking happens on its own once you understand.",
    visit: "Visit wayasurf.com",
    footerNote: "Felipe Cámara · Web design & development",
  },
  de: {
    badge: "Playa del Hombre · Telde · Gran Canaria",
    status: "Live · wayasurf.com",
    back: "Zurück zu Projekten",
    hero1: "WAYA",
    heroNomeLabel: "Suaheli für",
    heroNomeMeaning: "Weg",
    heroP:
      "Website für die Schule von Víctor Bueno Ureña. 15 Jahre, in denen Menschen am kanarischen Atlantik aufs Brett kamen. Eine Site, die die Methode vor dem Preis erzählt.",
    statBig: "95%",
    statLabel:
      "der Schüler stehen in ihrer ersten Klasse. Die Zahl, die das Gespräch eröffnet.",
    marquee: [
      "PLAYA DEL HOMBRE",
      "·",
      "TELDE",
      "·",
      "ATLANTIK",
      "·",
      "15 JAHRE",
      "·",
      "GRUPPEN À 8",
      "·",
      "WAYA KIDS",
      "·",
      "RESIDENT-PASS",
      "·",
      "SPANISCHER VERBAND",
      "·",
    ],
    methodLabel: "Die Methode",
    methodA: "Vor dem Meer,",
    methodHl: "der Sand.",
    method1Title: "Theorie am Sand",
    method1Body:
      "Schüler verstehen Wellen, Strömungen, Haltung und Bewegung ohne Wasser. Trockenübung, bis der Körper sich erinnert.",
    method2Title: "Praxis im Wasser",
    method2Body:
      "Gruppen à acht. Lehrer im Wasser, nicht am Ufer. Eine erste Welle am ersten Tag — kein Versprechen, sondern Prozentsatz.",
    levelsLabel: "Stufen",
    levelsA: "Der Weg",
    levelsHl: "hat drei Etappen.",
    levels: [
      {
        range: "0—1",
        title: "Deine erste Welle",
        body: "Nie auf einem Brett gestanden. Du verlässt das Wasser stehend — und willst zurück.",
      },
      {
        range: "2—3",
        title: "Paddle out",
        body: "Du paddelst, du liest das Line-up. Du lernst die richtige Welle zu wählen und rauszukommen.",
      },
      {
        range: "4+",
        title: "Freiheit",
        body: "Du surfst im eigenen Tempo. Klassen werden Sessions — polieren, korrigieren, größere Wellen.",
      },
    ],
    victorLabel: "Víctor",
    victorTitle: "Wer lehrt, zählt.",
    victorBody:
      "Víctor Bueno Ureña ist seit fünfzehn Jahren vom Spanischen Surfverband zertifiziert. Vor Waya surfte und lehrte er in und außerhalb Spaniens. Die Site widmet ihm einen ganzen Bereich — nicht als CV, sondern als Kontext: der Schüler weiß, wen er bezahlt.",
    victorMeta: "Gründer & Lehrer · Waya Surf",
    servicesLabel: "Services",
    servicesA: "Drei Türen",
    servicesHl: "zum selben Meer.",
    services: [
      {
        tag: "Ab 40€ · 2h",
        title: "Kurse",
        body: "Brett, Neopren und Versicherung inklusive. Gruppe, privat, semi-privat und Familie.",
        img: "/projects/waya-surf/service-clases.jpg",
      },
      {
        tag: "Ab 5€",
        title: "Verleih",
        body: "Soft- und Glasfaserbretter, Neopren und Duschen. Für die, die schon können und nur Material brauchen.",
        img: "/projects/waya-surf/service-alquiler.jpg",
      },
      {
        tag: "Demnächst",
        title: "Surf Camp",
        body: "Unterkunft, tägliches Coaching und Yoga. Das volle Paket für eine Woche.",
        img: "/projects/waya-surf/service-surfcamp.jpg",
      },
    ],
    bonoLabel: "Resident-Pass",
    bonoA: "Für Menschen, die dort leben,",
    bonoHl: "wo andere Urlaub machen.",
    bonoBody:
      "Gran Canaria ist Touristenziel — und das überrollt meist die Einheimischen. Ich baute einen separaten Block auf der Site für den lokalen Pass: 4- oder 8-Sessions, reduzierter Tarif, nicht im Touristenfluss vermischt. Lokale Konversion.",
    bonoTags: ["4-Sessions-Pack", "8-Sessions-Pack", "Lokaler Tarif", "Keine aggressive Frist"],
    galleryLabel: "Galerie",
    galleryA: "Was du siehst,",
    galleryHl: "wenn du ankommst.",
    gallery: [
      { src: "/projects/waya-surf/carousel-grupales.jpg", caption: "Gruppenkurse" },
      { src: "/projects/waya-surf/carousel-privadas.jpg", caption: "Privatkurse" },
      { src: "/projects/waya-surf/carousel-semiprivadas.jpg", caption: "Semi-privat" },
      { src: "/projects/waya-surf/carousel-familiar.jpg", caption: "Familie" },
    ],
    testimonialBody:
      "„Víctor ist ein großartiger Lehrer, geduldig und beruhigend. Sehr zu empfehlen.\"",
    testimonialMeta: "Elena · Google 5.0 Bewertung",
    closingA: "Der Weg,",
    closingHl: "als Website.",
    closingP:
      "15 Jahre Schule verdichtet in einer Site, die dich nicht zur Buchung drängt — sondern zum Verstehen. Buchung kommt von selbst, sobald du verstehst.",
    visit: "Besuche wayasurf.com",
    footerNote: "Felipe Cámara · Webdesign & Entwicklung",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Accent inline = palabra resaltada en amarillo con peso light, sustituyendo el italic editorial */
function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: DISPLAY,
        fontWeight: 300,
        color: YELLOW_DEEP,
        position: "relative",
        display: "inline-block",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span
        style={{
          position: "absolute",
          left: "-0.05em",
          right: "-0.05em",
          bottom: "0.06em",
          height: "0.32em",
          background: YELLOW,
          zIndex: 0,
        }}
        aria-hidden
      />
    </span>
  );
}

export default function WayaSurfDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div
      style={{
        background: WHITE,
        color: DARK,
        fontFamily: SANS,
        minHeight: "100dvh",
      }}
    >
      <BlendNav />

      {/* ── HERO ─────────────────────────────────────── */}
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
          overflow: "hidden",
          background: WHITE,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: GRAY,
            fontFamily: SANS,
            fontWeight: 500,
          }}
        >
          <Link
            href="/proyectos"
            style={{ color: GRAY, textDecoration: "none", borderBottom: `1px solid ${GRAY_LINE}` }}
          >
            ← {t.back}
          </Link>
          <span>{t.status}</span>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, marginTop: "auto" }}>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: DARK,
              marginBottom: 24,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 12px",
              background: YELLOW,
              borderRadius: 4,
            }}
          >
            {t.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(120px, 28vw, 440px)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              color: DARK,
              margin: 0,
            }}
          >
            {t.hero1}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginTop: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GRAY,
                fontWeight: 500,
              }}
            >
              {t.heroNomeLabel}
            </span>
            <span
              style={{
                fontFamily: DISPLAY,
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 52px)",
                color: DARK,
                lineHeight: 1,
              }}
            >
              <Hl>{t.heroNomeMeaning}</Hl>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              maxWidth: 620,
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.55,
              color: GRAY_DEEP,
              marginTop: 32,
              fontWeight: 400,
            }}
          >
            {t.heroP}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(140px, 0.4fr) 1fr",
            gap: "clamp(20px, 3vw, 48px)",
            alignItems: "end",
            marginTop: 48,
            paddingTop: 32,
            borderTop: `1px solid ${GRAY_LINE}`,
          }}
        >
          <span
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(80px, 12vw, 180px)",
              lineHeight: 0.85,
              color: DARK,
              letterSpacing: "-0.04em",
              textShadow: `4px 4px 0 ${YELLOW}`,
            }}
          >
            {t.statBig}
          </span>
          <p
            style={{
              maxWidth: 480,
              fontSize: "clamp(14px, 1.2vw, 17px)",
              lineHeight: 1.5,
              color: GRAY_DEEP,
              paddingBottom: 14,
            }}
          >
            {t.statLabel}
          </p>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <section
        style={{
          background: DARK,
          color: WHITE,
          padding: "clamp(20px, 3vw, 36px) 0",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 84px)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          {[...t.marquee, ...t.marquee, ...t.marquee].map((w, i) => (
            <span
              key={i}
              style={{
                padding: "0 clamp(16px, 2vw, 32px)",
                color: w === "·" ? YELLOW : WHITE,
              }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── MÉTODO ───────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
          maxWidth: 1280,
          margin: "0 auto",
          background: WHITE,
        }}
      >
        <SectionHeader label={t.methodLabel} pre={t.methodA} hl={t.methodHl} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px, 4vw, 64px)",
            marginTop: 64,
          }}
        >
          {[
            { n: "01", title: t.method1Title, body: t.method1Body },
            { n: "02", title: t.method2Title, body: t.method2Body },
          ].map((m, i) => (
            <motion.div
              key={m.n}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.15 }}
              style={{
                position: "relative",
                paddingTop: 28,
                borderTop: `3px solid ${i === 0 ? DARK : YELLOW}`,
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: "clamp(60px, 8vw, 120px)",
                  color: DARK,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                {m.n}
              </span>
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  color: DARK,
                  margin: "16px 0 12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {m.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.6,
                  color: GRAY_DEEP,
                  maxWidth: 420,
                }}
              >
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── NIVELES ──────────────────────────────────── */}
      <section
        style={{
          background: GRAY_LIGHT,
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
          borderTop: `1px solid ${GRAY_LINE}`,
          borderBottom: `1px solid ${GRAY_LINE}`,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader label={t.levelsLabel} pre={t.levelsA} hl={t.levelsHl} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 0,
              marginTop: 64,
              border: `1px solid ${DARK}`,
              background: WHITE,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {t.levels.map((lv, i) => (
              <motion.div
                key={lv.range}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                transition={{ delay: i * 0.12 }}
                style={{
                  padding: "clamp(28px, 3vw, 44px)",
                  borderRight: i < t.levels.length - 1 ? `1px solid ${GRAY_LINE}` : "none",
                  borderBottom: `6px solid ${i === 0 ? YELLOW_SOFT : i === 1 ? YELLOW : YELLOW_DEEP}`,
                  position: "relative",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    fontSize: "clamp(36px, 5vw, 64px)",
                    color: DARK,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {lv.range}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 600,
                      fontSize: "clamp(20px, 2vw, 28px)",
                      color: DARK,
                      margin: "0 0 10px",
                    }}
                  >
                    {lv.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: GRAY_DEEP,
                    }}
                  >
                    {lv.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÍCTOR ───────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
          maxWidth: 1280,
          margin: "0 auto",
          background: WHITE,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.9fr) 1.1fr",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
              background: DARK,
              borderRadius: 12,
            }}
          >
            <Image
              src="/projects/waya-surf/about-victor.jpg"
              alt="Víctor Bueno Ureña — Waya Surf"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <span
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: DARK,
                background: YELLOW,
                padding: "8px 12px",
                borderRadius: 4,
              }}
            >
              {t.victorLabel}
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <h3
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(42px, 6vw, 84px)",
                lineHeight: 0.95,
                color: DARK,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {t.victorTitle}
            </h3>
            <p
              style={{
                fontFamily: SANS,
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.65,
                color: GRAY_DEEP,
                margin: "28px 0 0",
              }}
            >
              {t.victorBody}
            </p>
            <p
              style={{
                marginTop: 24,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: GRAY,
                fontWeight: 500,
              }}
            >
              {t.victorMeta}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICIOS ────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <SectionHeader label={t.servicesLabel} pre={t.servicesA} hl={t.servicesHl} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(20px, 2vw, 32px)",
            marginTop: 64,
          }}
        >
          {t.services.map((s, i) => (
            <motion.article
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              style={{
                background: WHITE,
                border: `1px solid ${GRAY_LINE}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  background: GRAY_LIGHT,
                }}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: DARK,
                    marginBottom: 10,
                    fontWeight: 700,
                    background: YELLOW,
                    alignSelf: "flex-start",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {s.tag}
                </span>
                <h4
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 700,
                    fontSize: 24,
                    color: DARK,
                    margin: "8px 0 10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: GRAY_DEEP, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── BONO RESIDENTE ───────────────────────────── */}
      <section
        style={{
          background: YELLOW,
          color: DARK,
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.6fr) 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: DARK,
                fontWeight: 700,
              }}
            >
              {t.bonoLabel}
            </span>
            <h3
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: "clamp(48px, 7vw, 110px)",
                lineHeight: 0.92,
                color: DARK,
                margin: "20px 0 0",
                letterSpacing: "-0.03em",
              }}
            >
              {t.bonoA}
              <br />
              <span style={{ fontWeight: 300 }}>{t.bonoHl}</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.65,
                color: DARK,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {t.bonoBody}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 28,
              }}
            >
              {t.bonoTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12,
                    padding: "8px 14px",
                    border: `1.5px solid ${DARK}`,
                    borderRadius: 999,
                    color: DARK,
                    letterSpacing: "0.04em",
                    fontWeight: 600,
                    background: "transparent",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALERÍA ──────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(80px, 12vh, 140px) clamp(24px, 4vw, 56px)",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <SectionHeader label={t.galleryLabel} pre={t.galleryA} hl={t.galleryHl} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 64,
          }}
        >
          {t.gallery.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.08 }}
              style={{ margin: 0, position: "relative" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  background: GRAY_LIGHT,
                  borderRadius: 12,
                }}
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GRAY,
                  fontWeight: 500,
                }}
              >
                {g.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIO ───────────────────────────────── */}
      <section
        style={{
          background: DARK,
          color: WHITE,
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
        }}
      >
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            maxWidth: 980,
            margin: "0 auto",
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(26px, 3.5vw, 48px)",
            lineHeight: 1.25,
            color: WHITE,
            letterSpacing: "-0.02em",
          }}
        >
          {t.testimonialBody}
          <footer
            style={{
              marginTop: 32,
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: YELLOW,
            }}
          >
            — {t.testimonialMeta}
          </footer>
        </motion.blockquote>
      </section>

      {/* ── CIERRE ───────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h3
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(56px, 9vw, 140px)",
              lineHeight: 0.9,
              color: DARK,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            {t.closingA}
            <br />
            <span style={{ fontWeight: 300 }}>
              <Hl>{t.closingHl}</Hl>
            </span>
          </h3>
          <p
            style={{
              maxWidth: 640,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.6,
              color: GRAY_DEEP,
              margin: "32px 0 48px",
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
              href="https://wayasurf.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                background: YELLOW,
                color: DARK,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.04em",
                borderRadius: 12,
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
                border: `1.5px solid ${DARK}`,
                color: DARK,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                borderRadius: 12,
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
          borderTop: `1px solid ${GRAY_LINE}`,
          padding: "32px clamp(24px, 4vw, 56px)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: GRAY,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {t.footerNote}
      </footer>
    </div>
  );
}

function SectionHeader({ label, pre, hl }: { label: string; pre: string; hl: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: DARK,
          fontWeight: 700,
          background: YELLOW,
          padding: "4px 10px",
          borderRadius: 4,
          display: "inline-block",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: "clamp(44px, 7vw, 120px)",
          lineHeight: 0.9,
          color: DARK,
          margin: "20px 0 0",
          letterSpacing: "-0.03em",
        }}
      >
        {pre}
        <br />
        <span style={{ fontWeight: 300 }}>
          <Hl>{hl}</Hl>
        </span>
      </h2>
    </motion.div>
  );
}
