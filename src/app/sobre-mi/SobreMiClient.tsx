"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";
import SiteFooter from "@/components/SiteFooter";
import { INK, BG, CREAM, YELLOW, MUTED, LINE, Serif } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1] as const;

type Facet = { n: string; title: string; desc: string; tag: string; img?: string };

type Dict = {
  eyebrow: string;
  title: string;
  titleItalic: string;
  intro: string;
  lead: string;
  facetsLabel: string;
  facets: Facet[];
  closingA: string;
  closingHl: string;
  closingP: string;
  cta: string;
  ctaProjects: string;
};

const T: Record<Lang, Dict> = {
  es: {
    eyebrow: "Sobre mí",
    title: "No vengo solo",
    titleItalic: "del código.",
    intro: "Felipe Cámara — Gran Canaria.",
    lead: "He organizado festivales, llenado salas con humoristas, trabajado con influencers, lanzado infoproductos, creado plataformas y dirigido una empresa de marketing. Todo eso es lo que hoy meto en cada web: no solo programo, entiendo el negocio y sé lo que vende.",
    facetsLabel: "Lo que he hecho",
    facets: [
      { n: "01", tag: "Eventos", title: "Festivales y fiestas", desc: "Organicé y produje festivales y fiestas: equipo, artistas, logística y miles de personas pasándolo bien." },
      { n: "02", tag: "Espectáculos", title: "Humoristas en directo", desc: "Llevé y produje shows de humoristas — contratación, producción y sala llena." },
      { n: "03", tag: "Creadores", title: "Trabajo con influencers", desc: "Campañas y colaboraciones con creadores: estrategia, contenido y resultados reales." },
      { n: "04", tag: "Lanzamientos", title: "Lanzamientos de infoproductos", desc: "Participé en lanzamientos de infoproductos: funnels, contenido y conversión de principio a fin." },
      { n: "05", tag: "Producto", title: "Plataformas a medida", desc: "Creé plataformas y SaaS desde cero — del diseño al código. Hoy: Noa." },
      { n: "06", tag: "Negocio", title: "Mi empresa de marketing", desc: "Dirigí una empresa de marketing: gestión de marcas, redes y campañas para clientes." },
    ],
    closingA: "Todo eso",
    closingHl: "lo meto en tu proyecto.",
    closingP: "Visión de negocio + diseño + código, de la misma mano. Sin intermediarios.",
    cta: "Hablemos",
    ctaProjects: "Ver proyectos",
  },
  en: {
    eyebrow: "About me",
    title: "I don't just come",
    titleItalic: "from code.",
    intro: "Felipe Cámara — Gran Canaria.",
    lead: "I've organised festivals, filled rooms with comedians, worked with influencers, launched infoproducts, built platforms and run a marketing company. That's what I bring to every website today: I don't just code, I understand the business and what sells.",
    facetsLabel: "What I've done",
    facets: [
      { n: "01", tag: "Events", title: "Festivals & parties", desc: "I organised and produced festivals and parties: crew, artists, logistics and thousands of people having a great time." },
      { n: "02", tag: "Shows", title: "Live comedians", desc: "I booked and produced comedy shows — talent, production and a packed room." },
      { n: "03", tag: "Creators", title: "Working with influencers", desc: "Campaigns and collabs with creators: strategy, content and real results." },
      { n: "04", tag: "Launches", title: "Infoproduct launches", desc: "I took part in infoproduct launches: funnels, content and conversion end to end." },
      { n: "05", tag: "Product", title: "Custom platforms", desc: "I built platforms and SaaS from scratch — from design to code. Today: Noa." },
      { n: "06", tag: "Business", title: "My marketing company", desc: "I ran a marketing company: brand management, social and campaigns for clients." },
    ],
    closingA: "All of that",
    closingHl: "goes into your project.",
    closingP: "Business vision + design + code, from one hand. No middlemen.",
    cta: "Let's talk",
    ctaProjects: "See projects",
  },
  de: {
    eyebrow: "Über mich",
    title: "Ich komme nicht nur",
    titleItalic: "vom Code.",
    intro: "Felipe Cámara — Gran Canaria.",
    lead: "Ich habe Festivals organisiert, Säle mit Comedians gefüllt, mit Influencern gearbeitet, Infoprodukte gelauncht, Plattformen gebaut und eine Marketingfirma geführt. Genau das bringe ich heute in jede Website ein: Ich programmiere nicht nur, ich verstehe das Geschäft.",
    facetsLabel: "Was ich gemacht habe",
    facets: [
      { n: "01", tag: "Events", title: "Festivals & Partys", desc: "Ich organisierte und produzierte Festivals und Partys: Team, Künstler, Logistik und tausende Gäste." },
      { n: "02", tag: "Shows", title: "Comedians live", desc: "Ich buchte und produzierte Comedy-Shows — Talent, Produktion und volles Haus." },
      { n: "03", tag: "Creators", title: "Arbeit mit Influencern", desc: "Kampagnen und Kollaborationen mit Creators: Strategie, Content und echte Ergebnisse." },
      { n: "04", tag: "Launches", title: "Infoprodukt-Launches", desc: "Ich war an Infoprodukt-Launches beteiligt: Funnels, Content und Conversion." },
      { n: "05", tag: "Produkt", title: "Maßgeschneiderte Plattformen", desc: "Ich baute Plattformen und SaaS von Grund auf — vom Design bis zum Code. Heute: Noa." },
      { n: "06", tag: "Business", title: "Meine Marketingfirma", desc: "Ich führte eine Marketingfirma: Markenführung, Social und Kampagnen für Kunden." },
    ],
    closingA: "All das",
    closingHl: "fließt in dein Projekt.",
    closingP: "Geschäftssinn + Design + Code, aus einer Hand. Ohne Mittelsmänner.",
    cta: "Sprechen wir",
    ctaProjects: "Projekte ansehen",
  },
};

function PhotoSlot({ img, label }: { img?: string; label: string }) {
  if (img) {
    return (
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg" style={{ background: CREAM }}>
        <Image src={img} alt={label} fill sizes="(max-width: 768px) 100vw, 50vw" quality={84} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className="w-full aspect-[4/3] rounded-lg flex items-center justify-center"
      style={{ background: CREAM, border: `1.5px dashed ${LINE}` }}
    >
      <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
        Foto · {label}
      </span>
    </div>
  );
}

export default function SobreMiClient() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div style={{ background: BG, color: INK }} className="min-h-screen">
      <BlendNav active="about" />

      {/* HERO */}
      <section className="grid-paper px-6 md:px-12 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.35em] mb-6"
            style={{ color: MUTED }}
          >
            {t.eyebrow} · {t.intro}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight"
          >
            {t.title} <Serif style={{ color: INK }}>{t.titleItalic}</Serif>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed"
            style={{ color: "#3a3833" }}
          >
            {t.lead}
          </motion.p>
        </div>
      </section>

      {/* PORTRAIT placeholder ancho */}
      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <PhotoSlot label="retrato / yo" />
        </div>
      </section>

      {/* FACETS */}
      <section className="px-6 md:px-12 py-16 md:py-24" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-12" style={{ color: MUTED }}>
            {t.facetsLabel}
          </p>
          <div className="space-y-16 md:space-y-24">
            {t.facets.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: EASE }}
                className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className="md:[direction:ltr]">
                  <PhotoSlot img={f.img} label={f.tag.toLowerCase()} />
                </div>
                <div className="md:[direction:ltr]">
                  <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                    {f.n} · {f.tag}
                  </span>
                  <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-[1.02] tracking-tight">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: "#3a3833" }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-6 md:px-12 py-24 md:py-32" style={{ background: INK, color: BG }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-7xl font-bold leading-[1.0] tracking-tight"
          >
            {t.closingA} <Serif style={{ color: YELLOW }}>{t.closingHl}</Serif>
          </motion.h2>
          <p className="mt-6 text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>{t.closingP}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#contacto" className="rounded-full px-7 py-3.5 font-semibold" style={{ background: YELLOW, color: INK }}>
              {t.cta}
            </Link>
            <Link href="/proyectos" className="rounded-full px-7 py-3.5 font-semibold border" style={{ borderColor: "rgba(255,255,255,0.3)", color: BG }}>
              {t.ctaProjects}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
