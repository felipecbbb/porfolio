"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";
import { INK, BG, CREAM, YELLOW, MUTED, LINE, Serif } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1] as const;
const A = "/about";

type More = { tag: string; title: string; desc: string; kind: "image" | "video"; src: string; pos?: string };

type Dict = {
  eyebrow: string;
  intro: string;
  title1: string;
  titleItalic: string;
  lead: string;
  ev: { kicker: string; head: string; headIt: string; p: string; cap1: string; cap2: string; cap3: string; cap4: string; stat1n: string; stat1l: string; stat2n: string; stat2l: string };
  th: { kicker: string; head: string; headIt: string; p: string; cap1: string; cap2: string; cap3: string };
  moreKicker: string;
  moreHead: string;
  more: More[];
  closingA: string;
  closingHl: string;
  closingP: string;
  cta: string;
  ctaProjects: string;
};

const T: Record<Lang, Dict> = {
  es: {
    eyebrow: "Sobre mí",
    intro: "Felipe Cámara — Gran Canaria",
    title1: "No vengo",
    titleItalic: "solo del código.",
    lead: "Antes de las webs y el software hubo escenarios, focos y miles de personas. He producido festivales, llenado teatros con humoristas, trabajado con influencers y dirigido una agencia de marketing. Esa cabeza de productor es la que hoy meto en cada proyecto.",
    ev: {
      kicker: "01 · Eventos en directo",
      head: "Festivales y conciertos",
      headIt: "para miles.",
      p: "Festival de música latina en el sur de Gran Canaria: producción, equipo, artistas, logística y un escenario que hay que llenar. De la escaleta al último foco — y la presión de que todo salga a la hora.",
      cap1: "Antes de abrir puertas",
      cap2: "Yo, en el escenario",
      cap3: "Sala llena",
      cap4: "La banda",
      stat1n: "miles",
      stat1l: "de asistentes",
      stat2n: "0",
      stat2l: "margen de error",
    },
    th: {
      kicker: "02 · Espectáculos",
      head: "Humoristas y teatro,",
      headIt: "sala llena.",
      p: "Produje en teatro el show del humorista tinerfeño Abián Díaz —el de su piano, su «Show Patético» y +100k seguidores—: contratación, técnica, grabación y un aforo completo mirando al escenario.",
      cap1: "Teatro lleno",
      cap2: "Preparando la sala",
      cap3: "Abián Díaz, al piano",
    },
    moreKicker: "Y además",
    moreHead: "Lo que también he hecho.",
    more: [
      { tag: "Creadores", title: "Influencers", desc: "Campañas y colaboraciones con creadores: estrategia, contenido y resultados.", kind: "image", src: "/projects/lorena-amadio/lorena-portrait.jpg" },
      { tag: "Producción", title: "Grabación · Arehucas", desc: "Grabación con Arehucas del mejor coctelero del mundo.", kind: "video", src: `${A}/arehucas.mp4` },
      { tag: "Producto", title: "Plataformas", desc: "Plataformas y SaaS desde cero — del diseño al código. Hoy: Noa.", kind: "image", src: "/projects/icaro/cover.jpg" },
      { tag: "Negocio", title: "Plina", desc: "Mi agencia de marketing. Así se veía mi escritorio un día normal.", kind: "image", src: `${A}/plina-desk.jpg` },
    ],
    closingA: "Todo eso",
    closingHl: "lo meto en tu proyecto.",
    closingP: "Cabeza de productor + diseño + código, de la misma mano. Sin intermediarios.",
    cta: "Hablemos",
    ctaProjects: "Ver proyectos",
  },
  en: {
    eyebrow: "About me",
    intro: "Felipe Cámara — Gran Canaria",
    title1: "I don't just",
    titleItalic: "come from code.",
    lead: "Before websites and software there were stages, lights and thousands of people. I've produced festivals, filled theatres with comedians, worked with influencers and run a marketing agency. That producer's mindset is what I bring to every project today.",
    ev: {
      kicker: "01 · Live events",
      head: "Festivals and concerts",
      headIt: "for thousands.",
      p: "A Latin music festival in the south of Gran Canaria: production, crew, artists, logistics and a stage you have to fill. From the run sheet to the last spotlight — and the pressure of nailing it on time.",
      cap1: "Before doors open",
      cap2: "Me, on stage",
      cap3: "Packed house",
      cap4: "The band",
      stat1n: "thousands",
      stat1l: "of attendees",
      stat2n: "0",
      stat2l: "margin for error",
    },
    th: {
      kicker: "02 · Shows",
      head: "Comedians and theatre,",
      headIt: "full house.",
      p: "I produced the theatre show of Tenerife comedian Abián Díaz —the one with the piano, his «Show Patético» and 100k+ followers—: talent, tech, recording and a full auditorium facing the stage.",
      cap1: "Full theatre",
      cap2: "Setting up the room",
      cap3: "Abián Díaz, at the piano",
    },
    moreKicker: "And also",
    moreHead: "What else I've done.",
    more: [
      { tag: "Creators", title: "Influencers", desc: "Campaigns and collabs with creators: strategy, content and results.", kind: "image", src: "/projects/lorena-amadio/lorena-portrait.jpg" },
      { tag: "Production", title: "Recording · Arehucas", desc: "A shoot with Arehucas and the world's best bartender.", kind: "video", src: `${A}/arehucas.mp4` },
      { tag: "Product", title: "Platforms", desc: "Platforms and SaaS from scratch — from design to code. Today: Noa.", kind: "image", src: "/projects/icaro/cover.jpg" },
      { tag: "Business", title: "Plina", desc: "My marketing agency. This is what my desk looked like on a normal day.", kind: "image", src: `${A}/plina-desk.jpg` },
    ],
    closingA: "All of that",
    closingHl: "goes into your project.",
    closingP: "A producer's mindset + design + code, from one hand. No middlemen.",
    cta: "Let's talk",
    ctaProjects: "See projects",
  },
  de: {
    eyebrow: "Über mich",
    intro: "Felipe Cámara — Gran Canaria",
    title1: "Ich komme nicht",
    titleItalic: "nur vom Code.",
    lead: "Vor den Websites und der Software gab es Bühnen, Scheinwerfer und tausende Menschen. Ich habe Festivals produziert, Theater mit Comedians gefüllt, mit Influencern gearbeitet und eine Marketingagentur geführt. Dieses Produzenten-Mindset bringe ich heute in jedes Projekt.",
    ev: {
      kicker: "01 · Live-Events",
      head: "Festivals und Konzerte",
      headIt: "für Tausende.",
      p: "Ein Latin-Music-Festival im Süden von Gran Canaria: Produktion, Team, Künstler, Logistik und eine Bühne, die gefüllt werden muss. Vom Ablaufplan bis zum letzten Scheinwerfer.",
      cap1: "Vor dem Einlass",
      cap2: "Ich, auf der Bühne",
      cap3: "Volles Haus",
      cap4: "Die Band",
      stat1n: "Tausende",
      stat1l: "Besucher",
      stat2n: "0",
      stat2l: "Fehlertoleranz",
    },
    th: {
      kicker: "02 · Shows",
      head: "Comedians und Theater,",
      headIt: "ausverkauft.",
      p: "Ich produzierte die Theatershow des Comedians Abián Díaz aus Teneriffa —mit seinem Klavier, seiner «Show Patético» und +100k Followern—: Talent, Technik, Aufnahme und ein volles Auditorium.",
      cap1: "Volles Theater",
      cap2: "Saal vorbereiten",
      cap3: "Abián Díaz, am Klavier",
    },
    moreKicker: "Und außerdem",
    moreHead: "Was ich sonst gemacht habe.",
    more: [
      { tag: "Creators", title: "Influencer", desc: "Kampagnen und Kollaborationen: Strategie, Content und Ergebnisse.", kind: "image", src: "/projects/lorena-amadio/lorena-portrait.jpg" },
      { tag: "Produktion", title: "Aufnahme · Arehucas", desc: "Ein Dreh mit Arehucas und dem besten Barkeeper der Welt.", kind: "video", src: `${A}/arehucas.mp4` },
      { tag: "Produkt", title: "Plattformen", desc: "Plattformen und SaaS von Grund auf — vom Design bis zum Code. Heute: Noa.", kind: "image", src: "/projects/icaro/cover.jpg" },
      { tag: "Business", title: "Plina", desc: "Meine Marketingagentur. So sah mein Schreibtisch an einem normalen Tag aus.", kind: "image", src: `${A}/plina-desk.jpg` },
    ],
    closingA: "All das",
    closingHl: "fließt in dein Projekt.",
    closingP: "Produzenten-Mindset + Design + Code, aus einer Hand.",
    cta: "Sprechen wir",
    ctaProjects: "Projekte ansehen",
  },
};

function Clip({ src }: { src: string }) {
  return (
    <video src={src} autoPlay muted loop playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  );
}

function Cap({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="absolute bottom-3 left-3 z-10 text-[10px] uppercase tracking-[0.28em] px-2 py-1"
      style={{ color: "#fff", fontFamily: "var(--font-geist-mono), monospace", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
    >
      {children}
    </span>
  );
}

export default function SobreMiClient() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div style={{ background: INK, color: BG }} className="min-h-screen overflow-x-clip">
      <BlendNav active="about" />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <Image src={`${A}/concert-wide.jpg`} alt="" fill priority quality={82} sizes="100vw" className="object-cover" style={{ filter: "saturate(1.05)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${INK}cc 0%, ${INK}33 35%, ${INK}aa 78%, ${INK} 100%)` }} />
        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[11px] uppercase tracking-[0.35em] mb-5" style={{ color: YELLOW }}>
            {t.eyebrow} · {t.intro}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }} className="text-6xl md:text-[8.5rem] font-bold leading-[0.9] tracking-tight max-w-5xl">
            {t.title1} <Serif style={{ color: YELLOW }}>{t.titleItalic}</Serif>
          </motion.h1>
        </div>
      </section>

      {/* ===== LEAD ===== */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl text-2xl md:text-4xl font-medium leading-[1.25] tracking-tight" style={{ color: CREAM }}>
          {t.lead}
        </motion.p>
      </section>

      {/* ===== 01 · EVENTOS ===== */}
      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: YELLOW }}>{t.ev.kicker}</p>
            <h2 className="text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-3xl">
              {t.ev.head} <Serif style={{ color: YELLOW }}>{t.ev.headIt}</Serif>
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.66)" }}>{t.ev.p}</p>
          </motion.div>

          {/* masonry */}
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4">
            {[
              { kind: "video", src: `${A}/before-stage.mp4`, ar: "9 / 16", cap: t.ev.cap1, alt: "" },
              { kind: "image", src: `${A}/felipe-stage.jpg`, ar: "4 / 3", cap: t.ev.cap2, alt: "Felipe en el escenario antes del concierto" },
              { kind: "image", src: `${A}/concert-wide.jpg`, ar: "3 / 2", cap: t.ev.cap3, alt: "Concierto a sala llena" },
              { kind: "image", src: `${A}/singer.jpg`, ar: "4 / 3", cap: "", alt: "Artista en directo" },
              { kind: "image", src: `${A}/performer.jpg`, ar: "3 / 2", cap: t.ev.cap4, alt: "Artista en el escenario" },
              { kind: "image", src: `${A}/band.jpg`, ar: "3 / 2", cap: "", alt: "La banda de cara al público" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.01, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative overflow-hidden rounded-lg mb-3 md:mb-4 break-inside-avoid"
                style={{ aspectRatio: m.ar, border: `1px solid ${LINE}22` }}
              >
                {m.kind === "video" ? <Clip src={m.src} /> : <Image src={m.src} alt={m.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" quality={84} className="object-cover" />}
                {m.cap ? <Cap>{m.cap}</Cap> : null}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            {[[t.ev.stat1n, t.ev.stat1l], [t.ev.stat2n, t.ev.stat2l]].map(([n, l]) => (
              <div key={l} className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
                <p className="text-4xl md:text-6xl font-bold leading-none" style={{ color: YELLOW }}>{n}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 02 · TEATRO / HUMORISTAS ===== */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ background: "#121110" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <motion.div initial={{ opacity: 0.01, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[9/16] w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden rounded-lg" style={{ border: `1px solid ${LINE}22` }}>
              <Clip src={`${A}/theater-full.mp4`} />
              <Cap>{t.th.cap1}</Cap>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: YELLOW }}>{t.th.kicker}</p>
              <h2 className="text-4xl md:text-6xl font-bold leading-[0.96] tracking-tight">
                {t.th.head} <Serif style={{ color: YELLOW }}>{t.th.headIt}</Serif>
              </h2>
              <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.66)" }}>{t.th.p}</p>
            </motion.div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4">
            <motion.div initial={{ opacity: 0.01, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ border: `1px solid ${LINE}22` }}>
              <Clip src={`${A}/prep-room.mp4`} />
              <Cap>{t.th.cap2}</Cap>
            </motion.div>
            <motion.div initial={{ opacity: 0.01, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={`${A}/theater.jpg`} alt="Abián Díaz al piano · montaje del teatro" fill sizes="50vw" quality={84} className="object-cover" style={{ objectPosition: "40% 78%" }} />
              <Cap>{t.th.cap3}</Cap>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Y ADEMÁS ===== */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ background: CREAM, color: INK }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-3" style={{ color: MUTED }}>{t.moreKicker}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">{t.moreHead}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.more.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="rounded-lg p-3 flex flex-col gap-3" style={{ background: BG, border: `1px solid ${LINE}` }}>
                <div className="relative w-full aspect-[4/3] rounded overflow-hidden" style={{ background: INK }}>
                  {m.kind === "video" ? <Clip src={m.src} /> : <Image src={m.src} alt={m.title} fill sizes="(max-width: 1024px) 50vw, 25vw" quality={82} className="object-cover" style={m.pos ? { objectPosition: m.pos } : undefined} />}
                </div>
                <div className="px-2 pb-2">
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>{m.tag}</span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3a3833" }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING ===== */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-4xl md:text-7xl font-bold leading-[1.0] tracking-tight">
            {t.closingA} <Serif style={{ color: YELLOW }}>{t.closingHl}</Serif>
          </motion.h2>
          <p className="mt-6 text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>{t.closingP}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contacto" className="rounded-full px-7 py-3.5 font-semibold" style={{ background: YELLOW, color: INK }}>{t.cta}</Link>
            <Link href="/proyectos" className="rounded-full px-7 py-3.5 font-semibold border" style={{ borderColor: "rgba(255,255,255,0.3)", color: BG }}>{t.ctaProjects}</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
