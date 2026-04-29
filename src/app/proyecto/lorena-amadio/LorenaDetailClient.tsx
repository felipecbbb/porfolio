"use client";

import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const BG = "#f5f1ee";
const BG_WARM = "#ede4d8";
const FG = "#1d2430";
const PEACH = "#f4b07e";
const PEACH_SOFT = "#f6c2a9";
const BEIGE = "#dfc2a6";
const LINE = "rgba(29,36,48,0.08)";
const MUTED = "rgba(29,36,48,0.55)";
const FAINT = "rgba(29,36,48,0.35)";

const EASE = [0.22, 1, 0.36, 1] as const;
const SERIF = "var(--font-cormorant), Georgia, 'Times New Roman', serif";
const SANS = "var(--font-dm-sans), system-ui, sans-serif";

const T: Record<Lang, {
  badge: string;
  status: string;
  heroP: string;
  heroAside: string;
  quoteA: string;
  quoteB: string;
  quoteC: string;
  quoteCite: string;
  proj: string;
  projTitleA: string;
  projTitleHl: string;
  projP: string;
  builtList: string[];
  bookingLabel: string;
  bookingTitleA: string;
  bookingTitleHl: string;
  bookingP: string;
  steps: { n: string; title: string; desc: string }[];
  servicesTitleA: string;
  servicesHl: string;
  services: { duration: string; title: string; blurb: string; accent: boolean }[];
  areasLabel: string;
  areasTitleA: string;
  areasHl: string;
  areas: string[];
  booksLabel: string;
  booksTitleA: string;
  booksHl: string;
  booksP: string;
  books: { title: string; subtitle: string; description: string; bg: string; fg: string; italic?: boolean }[];
  pillarsTitleA: string;
  pillarsHl: string;
  pillarsB: string;
  pillars: { title: string; desc: string }[];
  hood: string;
  hoodTitleA: string;
  hoodHl: string;
  closingA: string;
  closingHl: string;
  closingP: string;
  visit: string;
  back: string;
  footerNote: string;
}> = {
  es: {
    badge: "Web · Psicología",
    status: "Web publicada · psicolorenaamadio.com",
    heroP:
      "Diseñé y desarrollé la web de una psicóloga sanitaria. Un espacio online cálido, humano — con reservas en un solo paso y el cuidado que quien entra necesita.",
    heroAside: "Diseño · desarrollo · SEO",
    quoteA: "Si estás aquí,",
    quoteB: "ya diste un paso",
    quoteC: "importante.",
    quoteCite: "— del copy de Lorena",
    proj: "El proyecto",
    projTitleA: "Una web que ",
    projTitleHl: "respira.",
    projP:
      "Porque pedir cita a un psicólogo ya pide suficiente valor como para que la web también te ponga a prueba.",
    builtList: [
      "Identidad visual web, jerarquía y ritmo tipográfico",
      "Reservas online integradas con Calendly (pago + consentimiento en un paso)",
      "Formulario interno de nuevo paciente con validaciones y firma",
      "Newsletter con Supabase y confirmación por email",
      "SEO técnico: meta, sitemap, Open Graph, canonical, Schema",
      "Accesibilidad AA y rendimiento web como requisito de diseño",
      "Legal completo: aviso, cookies, privacidad y condiciones",
      "Landing de sus dos libros con enlace a Amazon",
    ],
    bookingLabel: "La reserva",
    bookingTitleA: "Agenda online ",
    bookingTitleHl: "en un solo paso.",
    bookingP:
      "Rellena el formulario, elige horario y paga. El consentimiento se firma en el mismo flujo. Sin idas y venidas.",
    steps: [
      { n: "01", title: "Rellena tus datos", desc: "Formulario de nuevo paciente con validaciones y documentación legal integrada." },
      { n: "02", title: "Selecciona horario", desc: "Calendly integrado con la disponibilidad real. Elige el hueco que te funciona." },
      { n: "03", title: "Paga y firma", desc: "Pago y consentimiento informado en el mismo paso. Recibes confirmación por email." },
    ],
    servicesTitleA: "Tres ",
    servicesHl: "modalidades.",
    services: [
      { duration: "1 hora", title: "Cita individual", blurb: "Sesión completa para la exploración profunda de tus desafíos emocionales, el desarrollo de estrategias detalladas y el trabajo en tus objetivos a largo plazo.", accent: false },
      { duration: "30 minutos", title: "Individual Express", blurb: "Sesión breve y focalizada, ideal para seguimiento, resolución de dudas puntuales o para recibir una herramienta específica que puedas aplicar ya.", accent: true },
      { duration: "1 hora", title: "Terapia de pareja", blurb: "Espacio de colaboración enfocado en mejorar la comunicación, resolver conflictos, reconstruir la confianza y redefinir la dinámica de la relación.", accent: false },
    ],
    areasLabel: "En qué trabaja",
    areasTitleA: "Las cosas que ",
    areasHl: "pesan.",
    areas: [
      "Ansiedad", "Estrés", "Duelo", "Terapia de pareja", "Depresión",
      "Autoestima y límites", "Cambios vitales", "Bloqueo emocional",
      "Conflictos familiares", "Sobrecarga mental",
    ],
    booksLabel: "Sus libros",
    booksTitleA: "Lecturas para tu ",
    booksHl: "bienestar.",
    booksP:
      "Dos guías con lenguaje claro, ejercicios y propuestas para usar fuera de consulta. La web las presenta con el mismo cuidado que la terapia.",
    books: [
      { title: "Cómo frenar en un mundo que va tan deprisa", subtitle: "Recupera tu bienestar en la era del FoMO", description: "Una guía práctica para recuperar tu atención, salir del piloto automático y aprender a pausar en medio del ruido digital.", bg: PEACH, fg: FG },
      { title: "Abrir cuando", subtitle: "Una guía emocional cuando la vida se siente demasiado", description: "Tu botiquín de primeros auxilios emocionales. Palabras y herramientas precisas para los momentos en que más lo necesitas.", bg: FG, fg: BG, italic: true },
    ],
    pillarsTitleA: "Cuatro ",
    pillarsHl: "principios",
    pillarsB: " que ordenaron el diseño.",
    pillars: [
      { title: "Espacio Seguro y Ético", desc: "Confidencialidad absoluta, cero juicios. Cumplimiento total de la normativa de protección de datos." },
      { title: "Herramientas Prácticas", desc: "Técnicas y recursos aplicables desde la primera sesión. Nada teórico sin aterrizaje." },
      { title: "Resultados Duraderos", desc: "Métodos basados en evidencia, adaptados a ti, enfocados a generar un cambio sostenible." },
      { title: "Comodidad Online", desc: "Videollamada por Google Meet desde cualquier lugar. La calidad y flexibilidad que necesitas." },
    ],
    hood: "Bajo el capó",
    hoodTitleA: "Stack elegido para que la web ",
    hoodHl: "no estorbe.",
    closingA: "Un paso puede ",
    closingHl: "cambiar tu dirección.",
    closingP:
      "La web está en producción, recibe reservas a diario y lleva a Lorena pacientes que antes no habrían escrito. Eso es diseño que trabaja.",
    visit: "Visitar la web",
    back: "← Volver al portfolio",
    footerNote: "Lorena Amadio · Caso de estudio",
  },
  en: {
    badge: "Web · Psychology",
    status: "Live · psicolorenaamadio.com",
    heroP:
      "I designed and built the website for a clinical psychologist. A warm, human online space — with one-step bookings and the care anyone landing needs.",
    heroAside: "Design · development · SEO",
    quoteA: "If you're here,",
    quoteB: "you've already taken",
    quoteC: "an important step.",
    quoteCite: "— from Lorena's copy",
    proj: "The project",
    projTitleA: "A site that ",
    projTitleHl: "breathes.",
    projP:
      "Because booking a therapist takes courage — the website shouldn't make it harder.",
    builtList: [
      "Web visual identity, hierarchy and typographic rhythm",
      "Online bookings via Calendly (payment + consent in one step)",
      "Internal new-patient form with validations and signature",
      "Newsletter on Supabase with email confirmation",
      "Technical SEO: meta, sitemap, Open Graph, canonical, Schema",
      "AA accessibility and web performance as a design requirement",
      "Full legal: notice, cookies, privacy and terms",
      "Landing for her two books with Amazon link",
    ],
    bookingLabel: "The booking",
    bookingTitleA: "Book online ",
    bookingTitleHl: "in one step.",
    bookingP:
      "Fill the form, pick a slot and pay. Consent is signed in the same flow. No back-and-forth.",
    steps: [
      { n: "01", title: "Fill your details", desc: "New-patient form with validations and integrated legal docs." },
      { n: "02", title: "Pick a time", desc: "Calendly with real availability. Choose the slot that works for you." },
      { n: "03", title: "Pay and sign", desc: "Payment and informed consent in the same step. Email confirmation." },
    ],
    servicesTitleA: "Three ",
    servicesHl: "formats.",
    services: [
      { duration: "1 hour", title: "Individual session", blurb: "A full session for deep exploration of your emotional challenges, building detailed strategies and working on long-term goals.", accent: false },
      { duration: "30 minutes", title: "Express session", blurb: "A short focused session — ideal for follow-up, quick questions or getting one specific tool you can apply right away.", accent: true },
      { duration: "1 hour", title: "Couples therapy", blurb: "A collaborative space focused on improving communication, resolving conflicts, rebuilding trust and redefining the relationship dynamic.", accent: false },
    ],
    areasLabel: "Working areas",
    areasTitleA: "The things that ",
    areasHl: "weigh.",
    areas: [
      "Anxiety", "Stress", "Grief", "Couples therapy", "Depression",
      "Self-esteem and boundaries", "Life changes", "Emotional block",
      "Family conflict", "Mental overload",
    ],
    booksLabel: "Her books",
    booksTitleA: "Readings for your ",
    booksHl: "wellbeing.",
    booksP:
      "Two guides with clear language, exercises and prompts for use outside the office. The site presents them with the same care as the therapy.",
    books: [
      { title: "How to slow down in a world moving too fast", subtitle: "Recover your wellbeing in the FoMO era", description: "A practical guide to reclaim your attention, get off autopilot and learn to pause amid the digital noise.", bg: PEACH, fg: FG },
      { title: "Open When", subtitle: "An emotional guide when life feels too much", description: "Your emotional first-aid kit. Precise words and tools for the moments you need them most.", bg: FG, fg: BG, italic: true },
    ],
    pillarsTitleA: "Four ",
    pillarsHl: "principles",
    pillarsB: " that ordered the design.",
    pillars: [
      { title: "Safe & Ethical Space", desc: "Absolute confidentiality, zero judgment. Full data-protection compliance." },
      { title: "Practical Tools", desc: "Techniques and resources usable from session one. Nothing theoretical without grounding." },
      { title: "Lasting Results", desc: "Evidence-based methods, adapted to you, focused on sustainable change." },
      { title: "Online Convenience", desc: "Video call via Google Meet from anywhere. The quality and flexibility you need." },
    ],
    hood: "Under the hood",
    hoodTitleA: "Stack chosen so the web ",
    hoodHl: "stays out of the way.",
    closingA: "One step can ",
    closingHl: "change your direction.",
    closingP:
      "The site is live, takes bookings every day and brings Lorena patients who wouldn't have written otherwise. That's design that works.",
    visit: "Visit the site",
    back: "← Back to portfolio",
    footerNote: "Lorena Amadio · Case study",
  },
  de: {
    badge: "Web · Psychologie",
    status: "Live · psicolorenaamadio.com",
    heroP:
      "Ich habe die Website einer klinischen Psychologin entworfen und gebaut. Ein warmer, menschlicher Online-Raum — mit Ein-Schritt-Buchungen und der Sorgfalt, die jeder Besucher braucht.",
    heroAside: "Design · Entwicklung · SEO",
    quoteA: "Wenn du hier bist,",
    quoteB: "hast du schon",
    quoteC: "einen wichtigen Schritt gemacht.",
    quoteCite: "— aus Lorenas Copy",
    proj: "Das Projekt",
    projTitleA: "Eine Website, die ",
    projTitleHl: "atmet.",
    projP:
      "Einen Therapeuten zu buchen kostet Mut — die Website sollte das nicht schwerer machen.",
    builtList: [
      "Visuelle Web-Identität, Hierarchie und typografischer Rhythmus",
      "Online-Buchung über Calendly (Zahlung + Einverständnis in einem Schritt)",
      "Internes Neupatienten-Formular mit Validierungen und Unterschrift",
      "Newsletter über Supabase mit E-Mail-Bestätigung",
      "Technisches SEO: Meta, Sitemap, Open Graph, Canonical, Schema",
      "AA-Barrierefreiheit und Web-Performance als Design-Anforderung",
      "Vollständiges Recht: Impressum, Cookies, Datenschutz und AGB",
      "Landing für ihre zwei Bücher mit Amazon-Link",
    ],
    bookingLabel: "Die Buchung",
    bookingTitleA: "Online buchen ",
    bookingTitleHl: "in einem Schritt.",
    bookingP:
      "Formular ausfüllen, Slot wählen und zahlen. Die Einwilligung wird im selben Flow unterschrieben. Kein Hin-und-Her.",
    steps: [
      { n: "01", title: "Daten eintragen", desc: "Neupatienten-Formular mit Validierungen und integrierten Rechtsdokumenten." },
      { n: "02", title: "Termin wählen", desc: "Calendly mit echter Verfügbarkeit. Wähle den Slot, der dir passt." },
      { n: "03", title: "Bezahlen und unterschreiben", desc: "Zahlung und informierte Einwilligung im selben Schritt. E-Mail-Bestätigung." },
    ],
    servicesTitleA: "Drei ",
    servicesHl: "Formate.",
    services: [
      { duration: "1 Stunde", title: "Einzelsitzung", blurb: "Eine vollständige Sitzung für die tiefe Erkundung deiner emotionalen Herausforderungen, den Aufbau detaillierter Strategien und die Arbeit an langfristigen Zielen.", accent: false },
      { duration: "30 Minuten", title: "Express-Sitzung", blurb: "Eine kurze, fokussierte Sitzung — ideal für Nachsorge, schnelle Fragen oder ein konkretes Werkzeug, das du sofort anwenden kannst.", accent: true },
      { duration: "1 Stunde", title: "Paartherapie", blurb: "Ein kollaborativer Raum für bessere Kommunikation, Konfliktlösung, Vertrauensaufbau und neue Beziehungs-Dynamik.", accent: false },
    ],
    areasLabel: "Arbeitsbereiche",
    areasTitleA: "Die Dinge, die ",
    areasHl: "schwer wiegen.",
    areas: [
      "Angst", "Stress", "Trauer", "Paartherapie", "Depression",
      "Selbstwertgefühl und Grenzen", "Lebensveränderungen", "Emotionale Blockade",
      "Familienkonflikte", "Mentale Überlastung",
    ],
    booksLabel: "Ihre Bücher",
    booksTitleA: "Lektüre für dein ",
    booksHl: "Wohlbefinden.",
    booksP:
      "Zwei Ratgeber mit klarer Sprache, Übungen und Anregungen für die Anwendung außerhalb der Praxis. Die Website präsentiert sie mit derselben Sorgfalt wie die Therapie.",
    books: [
      { title: "Wie man bremst in einer Welt, die so schnell läuft", subtitle: "Wohlbefinden zurückgewinnen in der FoMO-Ära", description: "Ein praktischer Leitfaden, um deine Aufmerksamkeit zurückzuholen, den Autopiloten zu verlassen und im digitalen Lärm zu pausieren.", bg: PEACH, fg: FG },
      { title: "Öffnen wenn", subtitle: "Ein emotionaler Leitfaden, wenn das Leben zu viel ist", description: "Dein emotionaler Erste-Hilfe-Kasten. Präzise Worte und Werkzeuge für die Momente, in denen du sie am meisten brauchst.", bg: FG, fg: BG, italic: true },
    ],
    pillarsTitleA: "Vier ",
    pillarsHl: "Prinzipien",
    pillarsB: ", die das Design strukturiert haben.",
    pillars: [
      { title: "Sicherer & ethischer Raum", desc: "Absolute Vertraulichkeit, null Urteil. Volle Datenschutz-Compliance." },
      { title: "Praktische Werkzeuge", desc: "Techniken und Ressourcen, die ab Sitzung eins anwendbar sind. Nichts Theoretisches ohne Erdung." },
      { title: "Nachhaltige Ergebnisse", desc: "Evidenzbasierte Methoden, an dich angepasst, auf nachhaltigen Wandel ausgerichtet." },
      { title: "Online-Komfort", desc: "Videoanruf über Google Meet von überall. Die Qualität und Flexibilität, die du brauchst." },
    ],
    hood: "Unter der Haube",
    hoodTitleA: "Stack so gewählt, dass die Website ",
    hoodHl: "nicht stört.",
    closingA: "Ein Schritt kann ",
    closingHl: "deine Richtung ändern.",
    closingP:
      "Die Website ist live, nimmt täglich Buchungen entgegen und bringt Lorena Patienten, die sonst nicht geschrieben hätten. Das ist Design, das arbeitet.",
    visit: "Website besuchen",
    back: "← Zurück zum Portfolio",
    footerNote: "Lorena Amadio · Fallstudie",
  },
};

function WordReveal({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TulipOrnament({ className, stroke = PEACH }: { className?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      stroke={stroke}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M60 200 C 58 150, 62 110, 60 70" />
      <path d="M60 140 C 36 130, 22 150, 18 168 C 32 168, 50 162, 60 152" />
      <path d="M60 120 C 80 112, 96 124, 100 140 C 86 140, 70 136, 60 128" />
      <path d="M46 70 C 46 48, 56 36, 60 28 C 64 36, 74 48, 74 70 C 74 82, 64 88, 60 90 C 56 88, 46 82, 46 70 Z" />
      <path d="M60 30 C 60 50, 60 70, 60 88" />
      <path d="M52 50 C 54 60, 56 70, 58 82" />
      <path d="M68 50 C 66 60, 64 70, 62 82" />
    </svg>
  );
}

function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <motion.div
      aria-hidden
      animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      style={{
        background: color,
        borderRadius: "48% 52% 60% 40% / 45% 55% 45% 55%",
        filter: "blur(40px)",
      }}
    />
  );
}

function ServiceCard({
  index,
  duration,
  title,
  blurb,
  accent,
}: {
  index: number;
  duration: string;
  title: string;
  blurb: string;
  accent: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: EASE }}
      className="relative p-7 md:p-10 border group"
      style={{ borderColor: LINE, background: accent ? PEACH : "transparent" }}
    >
      <div className="flex items-baseline justify-between">
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: accent ? FG : FAINT, fontFamily: SANS }}
        >
          0{index + 1}
        </span>
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: accent ? FG : MUTED, fontFamily: SANS }}
        >
          {duration}
        </span>
      </div>
      <h3
        className="mt-7 text-2xl md:text-4xl leading-[1.1]"
        style={{ fontFamily: SERIF, fontWeight: 500, color: FG }}
      >
        {title}
      </h3>
      <p
        className="mt-5 text-sm leading-relaxed"
        style={{ color: accent ? FG : MUTED, fontFamily: SANS }}
      >
        {blurb}
      </p>
    </motion.div>
  );
}

function BookCover({
  title,
  subtitle,
  description,
  bg,
  fg,
  italic,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  description: string;
  bg: string;
  fg: string;
  italic?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rot = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      style={{ y, rotate: rot }}
      className="relative"
    >
      <div
        className="aspect-[2/3] p-7 md:p-10 flex flex-col justify-between shadow-[0_30px_60px_-20px_rgba(29,36,48,0.25)]"
        style={{ background: bg, color: fg, borderRadius: "2px" }}
      >
        <div>
          <p
            className="text-[10px] uppercase tracking-widest opacity-70"
            style={{ fontFamily: SANS }}
          >
            Lorena Amadio
          </p>
          <div className="w-8 h-px mt-3 opacity-40" style={{ background: fg }} />
        </div>

        <div>
          <h4
            className={`text-2xl md:text-3xl leading-[1.1] ${italic ? "italic" : ""}`}
            style={{ fontFamily: SERIF, fontWeight: 500 }}
          >
            {title}
          </h4>
          <p
            className="mt-4 text-xs leading-relaxed opacity-80"
            style={{ fontFamily: SANS }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <p
        className="mt-6 text-sm leading-relaxed"
        style={{ color: MUTED, fontFamily: SANS }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function LorenaDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div style={{ background: BG, color: FG, fontFamily: SANS }}>
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden px-6 md:px-12 pt-28 md:pt-40 pb-16"
      >
        <Blob className="absolute -top-20 -left-20 w-[420px] h-[420px] opacity-60" color={PEACH_SOFT} />
        <Blob className="absolute top-1/3 -right-32 w-[520px] h-[520px] opacity-40" color={BEIGE} />

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="absolute top-24 right-10 md:right-24 w-20 md:w-32 opacity-30"
        >
          <TulipOrnament />
        </motion.div>
        <motion.div
          style={{ y: heroY }}
          className="absolute bottom-32 left-6 md:left-20 w-14 md:w-20 opacity-20 rotate-[-15deg]"
        >
          <TulipOrnament stroke={FG} />
        </motion.div>

        <motion.span
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute right-6 md:right-12 bottom-6 md:bottom-10 leading-none select-none pointer-events-none"
        >
          <span
            className="text-[28vw] md:text-[18vw] block italic"
            style={{ fontFamily: SERIF, color: FG, opacity: 0.05, fontWeight: 500 }}
          >
            02
          </span>
        </motion.span>

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8 flex-wrap"
          >
            <span
              className="text-[10px] uppercase tracking-[0.25em] px-4 py-1.5 rounded-full"
              style={{ background: "white", color: FG, fontFamily: SANS, border: `1px solid ${LINE}` }}
            >
              {t.badge}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              2025
            </span>
          </motion.div>

          <h1
            className="text-[clamp(2.75rem,11vw,10rem)] leading-[0.95] max-w-5xl"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            <WordReveal text="Lorena" delay={0.3} />
            <br />
            <span className="italic" style={{ color: PEACH }}>
              <WordReveal text="Amadio." delay={0.5} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.heroP}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://psicolorenaamadio.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
              style={{ background: FG, color: BG, fontFamily: SANS }}
            >
              psicolorenaamadio.com
              <span>↗</span>
            </a>
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              {t.heroAside}
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-44 relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] opacity-10"
        >
          <TulipOrnament stroke={PEACH} />
        </motion.div>

        <div className="relative max-w-4xl mx-auto text-center">
          <p
            className="text-[clamp(1.6rem,6vw,5rem)] leading-[1.15] italic"
            style={{ fontFamily: SERIF, fontWeight: 500, color: FG }}
          >
            <WordReveal text={t.quoteA} />
            <br />
            <WordReveal text={t.quoteB} delay={0.4} />
            <br />
            <WordReveal text={t.quoteC} delay={0.9} />
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-10 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            {t.quoteCite}
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32 border-t" style={{ borderColor: LINE }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              {t.proj}
            </p>
            <h2
              className="text-3xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {t.projTitleA}
              <span className="italic" style={{ color: PEACH }}>{t.projTitleHl}</span>
            </h2>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: SANS }}
            >
              {t.projP}
            </p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              } as Variants
            }
            className="space-y-0"
          >
            {t.builtList.map((line, i) => (
              <motion.li
                key={line}
                variants={
                  {
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.7, ease: EASE },
                    },
                  } as Variants
                }
                className="flex items-start gap-5 py-5 border-b"
                style={{ borderColor: LINE }}
              >
                <span
                  className="text-[10px] mt-1.5 opacity-40 shrink-0"
                  style={{ fontFamily: SANS }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-base md:text-lg leading-snug"
                  style={{ color: FG, fontFamily: SANS }}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32" style={{ background: BG_WARM }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            {t.bookingLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {t.bookingTitleA}
            <span className="italic" style={{ color: PEACH }}>{t.bookingTitleHl}</span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.bookingP}
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 relative">
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
            className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px origin-left"
            style={{ background: PEACH }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {t.steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.8, ease: EASE }}
                className="relative"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{ background: BG, border: `1px solid ${LINE}` }}
                >
                  <span
                    className="text-2xl italic"
                    style={{ fontFamily: SERIF, color: PEACH }}
                  >
                    {step.n}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: SERIF, fontWeight: 500 }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed max-w-xs"
                  style={{ color: MUTED, fontFamily: SANS }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl leading-[1.05] max-w-2xl"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {t.servicesTitleA}
            <span className="italic" style={{ color: PEACH }}>{t.servicesHl}</span>
          </motion.h2>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em]"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            (03)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.services.map((s, i) => (
            <ServiceCard key={s.title} index={i} {...s} />
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 border-t"
        style={{ borderColor: LINE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              {t.areasLabel}
            </p>
            <h2
              className="text-3xl md:text-5xl leading-[1.05]"
              style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {t.areasTitleA}
              <span className="italic" style={{ color: PEACH }}>{t.areasHl}</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              } as Variants
            }
            className="flex flex-wrap gap-3"
          >
            {t.areas.map((area) => (
              <motion.span
                key={area}
                variants={
                  {
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: EASE },
                    },
                  } as Variants
                }
                className="px-5 py-2.5 rounded-full border text-sm"
                style={{
                  borderColor: LINE,
                  background: "white",
                  color: FG,
                  fontFamily: SANS,
                }}
              >
                {area}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32" style={{ background: BG_WARM }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: FAINT, fontFamily: SANS }}
          >
            {t.booksLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {t.booksTitleA}
            <span className="italic" style={{ color: PEACH }}>{t.booksHl}</span>
          </h2>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.booksP}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
          {t.books.map((b, i) => (
            <BookCover
              key={b.title}
              title={b.title}
              subtitle={b.subtitle}
              description={b.description}
              bg={b.bg}
              fg={b.fg}
              italic={b.italic}
              delay={i * 0.15}
            />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl leading-[1.05] max-w-2xl mb-14"
          style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          {t.pillarsTitleA}
          <span className="italic" style={{ color: PEACH }}>{t.pillarsHl}</span>
          {t.pillarsB}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
              className="p-7 md:p-10 border flex gap-6 items-start"
              style={{ borderColor: LINE, background: "white" }}
            >
              <span
                className="text-3xl italic shrink-0"
                style={{ fontFamily: SERIF, color: PEACH }}
              >
                0{i + 1}
              </span>
              <div>
                <h3
                  className="text-2xl leading-tight"
                  style={{ fontFamily: SERIF, fontWeight: 600 }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: MUTED, fontFamily: SANS }}
                >
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 border-t"
        style={{ borderColor: LINE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: FAINT, fontFamily: SANS }}
            >
              {t.hood}
            </p>
            <h3
              className="text-2xl md:text-4xl leading-[1.05]"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              {t.hoodTitleA}
              <span className="italic" style={{ color: PEACH }}>{t.hoodHl}</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "React",
              "React Router",
              "Vite",
              "Calendly",
              "Supabase",
              "Google Meet",
              "Resend · SMTP",
              "Cormorant Garamond",
              "DM Sans",
              "Schema · SEO",
              "Google Analytics",
              "Hostinger",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 text-xs"
                style={{ borderColor: LINE, color: FG, fontFamily: SANS }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 md:py-44 relative overflow-hidden">
        <Blob className="absolute top-10 right-10 w-[420px] h-[420px] opacity-30" color={PEACH_SOFT} />
        <div className="relative max-w-4xl">
          <h2
            className="text-4xl md:text-8xl leading-[0.95]"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            {t.closingA}
            <span className="italic" style={{ color: PEACH }}>{t.closingHl}</span>
          </h2>
          <p
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.closingP}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://psicolorenaamadio.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 rounded-full flex items-center gap-2"
              style={{ background: FG, color: BG, fontFamily: SANS }}
            >
              {t.visit}
              <span>↗</span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity"
              style={{ fontFamily: SANS }}
            >
              {t.back}
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: LINE }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: SANS }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: FAINT, fontFamily: SANS }}
        >
          © {new Date().getFullYear()} · {t.footerNote}
        </span>
      </footer>
    </div>
  );
}
