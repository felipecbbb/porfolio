"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const BG = "#fffdf7";
const SAND = "#f3ecdd";
const YELLOW = "#f3c900";
const NAVY = "#0f2f39";
const NAVY_SOFT = "#214a57";
const TEXT = "#2d3d45";
const MUTED = "#64757d";
const LINE = "#d7d0c2";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-bebas), 'Impact', sans-serif";
const SANS = "var(--font-manrope), system-ui, sans-serif";
const MONO = "var(--font-space), monospace";

const T: Record<Lang, {
  badge: string;
  status: string;
  hero1: string;
  hero2: string;
  heroP: string;
  marqueeItems: string[];
  sceneLabel: string;
  sceneA: string;
  sceneHl: string;
  scenePhotos: string;
  capTeam: string;
  capVilla: string;
  capRooftop: string;
  proj: string;
  projA: string;
  projHl: string;
  projP: string;
  builtList: string[];
  bonosLabel: string;
  bonosA: string;
  bonosHl: string;
  bonosP: string;
  bonosBono: string;
  bonosClasses: string;
  bonosDiscount: string;
  expA: string;
  expHl: string;
  services: { title: string; blurb: string; key: keyof typeof serviceIcons }[];
  villaCapA: string;
  villaCapB: string;
  campLabel: string;
  campA: string;
  campHl: string;
  campP: string;
  campStats: { n: string; u: string }[];
  editions: string;
  camps: { dates: string; tag: string; nights: string }[];
  reviewsLabel: string;
  reviewsA: string;
  reviewsHl: string;
  reviews: { who: string; meta: string; text: string; initials: string }[];
  bookingA: string;
  bookingHl: string;
  bookingSteps: { n: string; title: string; desc: string }[];
  step: string;
  hood: string;
  hoodA: string;
  hoodHl: string;
  closingA: string;
  closingHl: string;
  closingP: string;
  visit: string;
  back: string;
  footerNote: string;
}> = {
  es: {
    badge: "Playa de Roche · Cádiz",
    status: "En vivo · entreolasurf.com",
    hero1: "ENTRE",
    hero2: "OLAS.",
    heroP:
      "Escuela de surf con alma. Diseñé y construí la web entera — clases con sistema de bonos, e-commerce, reservas online y 4 ediciones de surf camp en villa privada.",
    marqueeItems: ["ROCHE", "CÁDIZ", "SURF CAMP", "VILLA PRIVADA", "+18", "BONOS -30%", "ROCHE", "CONIL"],
    sceneLabel: "La escena",
    sceneA: "Playa de Roche.",
    sceneHl: "Gente real.",
    scenePhotos: "Fotos del cliente",
    capTeam: "Equipo · Roche",
    capVilla: "Villa · drone",
    capRooftop: "Terraza · golden hour",
    proj: "El proyecto",
    projA: "Una web que",
    projHl: "vende surf.",
    projP:
      "Había escuela, había olas, había reputación. Faltaba la web que cerrase el círculo. La construí.",
    builtList: [
      "Diseño y desarrollo full-stack de todo el site",
      "Sistema de bonos con descuento progresivo (-7% a -30%)",
      "Reservas online con disponibilidad real por fechas",
      "E-commerce para merchandising con checkout completo",
      "4 ediciones de surf camp gestionables con plazas y reservas",
      "Hero con vídeo integrado y estética de Playa de Roche",
      "SEO técnico: OG, Schema, sitemap, canonical",
      "Integración con WhatsApp, Instagram y TikTok",
    ],
    bonosLabel: "El sistema de bonos",
    bonosA: "Cuantas más clases,",
    bonosHl: "más ahorras.",
    bonosP:
      "Packs de 2 a 7 sesiones con descuento progresivo. Motor propio con válidez de 180 días por bono comprado.",
    bonosBono: "Bono",
    bonosClasses: "clases",
    bonosDiscount: "Descuento",
    expA: "La experiencia",
    expHl: "completa.",
    services: [
      { key: "group", title: "Clases Grupales", blurb: "90 minutos. Máx. 6 personas. Material y seguro incluidos. Niveles desde cero." },
      { key: "individual", title: "Clases Individuales", blurb: "90 minutos. Atención 100% personalizada. Progresa el doble de rápido." },
      { key: "yoga", title: "Clases de Yoga", blurb: "Sesiones al aire libre para complementar la evolución en el agua." },
      { key: "paddle", title: "Paddle Surf", blurb: "Clases y rutas en aguas tranquilas de Conil. Todos los niveles." },
      { key: "skate", title: "Surf Skate", blurb: "Entrenamiento técnico en tierra para mejorar maniobras y equilibrio." },
      { key: "rental", title: "Alquiler de Material", blurb: "Tablas, neoprenos, paddle, bodyboard y skate. Sin complicaciones." },
    ],
    villaCapA: "Villa · +1000 m²",
    villaCapB: "Entre Olas Surf Camp",
    campLabel: "Surf Camp · +18",
    campA: "LA EXPERIENCIA",
    campHl: "QUE NO OLVIDARÁS.",
    campP:
      "Villa privada de +1000 m², piscina, pensión completa, transporte, surf todos los días, aventura y fiestas. Plazas limitadas por edición.",
    campStats: [
      { n: "1000", u: "m² villa" },
      { n: "4", u: "días / 3 noches" },
      { n: "+18", u: "solo adultos" },
      { n: "∞", u: "olas" },
    ],
    editions: "Ediciones gestionables",
    camps: [
      { dates: "20–23 Marzo", tag: "XXL", nights: "4 días / 3 noches" },
      { dates: "10–13 Abril", tag: "XXL", nights: "4 días / 3 noches" },
      { dates: "16–19 Abril", tag: "Sambatrips", nights: "4 días / 3 noches" },
      { dates: "9–13 Septiembre", tag: "Sambatrips", nights: "5 días / 4 noches" },
    ],
    reviewsLabel: "Opiniones reales",
    reviewsA: "Lo que dicen",
    reviewsHl: "sus alumnos.",
    reviews: [
      { who: "Laura García", meta: "Clase grupal · Roche", text: "Una experiencia increíble. Los instructores son muy profesionales y pacientes. Conseguí ponerme de pie en la tabla el primer día.", initials: "LG" },
      { who: "Carlos Martínez", meta: "Surf Camp · Conil", text: "El campamento de surf fue lo mejor de mis vacaciones. Aprendí mucho y conocí gente increíble. Ambiente inmejorable.", initials: "CM" },
      { who: "Familia Rodríguez", meta: "Clase grupal · Roche", text: "Hicimos el curso familiar y fue perfecto. Los niños se lo pasaron genial y los instructores se adaptaron a cada edad.", initials: "FR" },
    ],
    bookingA: "Reservar es",
    bookingHl: "así de rápido.",
    bookingSteps: [
      { n: "01", title: "Elige tu pack", desc: "Clase suelta, bono de 2-7 sesiones o surf camp. Disponibilidad en tiempo real." },
      { n: "02", title: "Reserva y paga", desc: "Checkout completo con carrito, cuenta de usuario y confirmación por email." },
      { n: "03", title: "Surfea", desc: "Te esperamos en Playa de Roche. Material y seguro incluidos." },
    ],
    step: "PASO",
    hood: "Bajo el capó",
    hoodA: "Stack pensado para",
    hoodHl: "cargar rápido.",
    closingA: "NOS VEMOS",
    closingHl: "EN EL AGUA.",
    closingP:
      "La web está viva. Cada fin de semana entran reservas y el sistema de bonos convierte sin intermediarios.",
    visit: "Visitar entreolasurf.com",
    back: "← Volver al portfolio",
    footerNote: "Entre Olas · Caso de estudio",
  },
  en: {
    badge: "Playa de Roche · Cádiz",
    status: "Live · entreolasurf.com",
    hero1: "BETWEEN",
    hero2: "WAVES.",
    heroP:
      "A surf school with soul. I designed and built the entire site — classes with bundle pricing, e-commerce, online bookings and 4 editions of surf camp in a private villa.",
    marqueeItems: ["ROCHE", "CÁDIZ", "SURF CAMP", "PRIVATE VILLA", "18+", "BUNDLES -30%", "ROCHE", "CONIL"],
    sceneLabel: "The scene",
    sceneA: "Playa de Roche.",
    sceneHl: "Real people.",
    scenePhotos: "Client photos",
    capTeam: "Team · Roche",
    capVilla: "Villa · drone",
    capRooftop: "Terrace · golden hour",
    proj: "The project",
    projA: "A site that",
    projHl: "sells surf.",
    projP:
      "There was a school, there were waves, there was reputation. The website was missing. I built it.",
    builtList: [
      "Full-stack design and development of the whole site",
      "Bundle system with progressive discount (-7% to -30%)",
      "Online bookings with real per-date availability",
      "E-commerce for merchandise with full checkout",
      "4 manageable surf-camp editions with seats and bookings",
      "Hero with embedded video and Playa de Roche aesthetic",
      "Technical SEO: OG, Schema, sitemap, canonical",
      "WhatsApp, Instagram and TikTok integration",
    ],
    bonosLabel: "The bundle system",
    bonosA: "More classes,",
    bonosHl: "more savings.",
    bonosP:
      "Packs of 2 to 7 sessions with progressive discount. Custom engine, valid 180 days per bundle.",
    bonosBono: "Bundle",
    bonosClasses: "classes",
    bonosDiscount: "Discount",
    expA: "The full",
    expHl: "experience.",
    services: [
      { key: "group", title: "Group classes", blurb: "90 minutes. Max 6 people. Gear and insurance included. From beginner level." },
      { key: "individual", title: "Private classes", blurb: "90 minutes. 100% personalized attention. Progress twice as fast." },
      { key: "yoga", title: "Yoga classes", blurb: "Outdoor sessions to complement your progress in the water." },
      { key: "paddle", title: "Paddle Surf", blurb: "Classes and routes in calm Conil waters. All levels." },
      { key: "skate", title: "Surf Skate", blurb: "Land-based technical training to improve maneuvers and balance." },
      { key: "rental", title: "Gear rental", blurb: "Boards, wetsuits, paddle, bodyboard and skate. Hassle-free." },
    ],
    villaCapA: "Villa · +1000 m²",
    villaCapB: "Entre Olas Surf Camp",
    campLabel: "Surf Camp · 18+",
    campA: "AN EXPERIENCE",
    campHl: "YOU WON'T FORGET.",
    campP:
      "Private villa of +1000 m², pool, full board, transport, surf every day, adventure and parties. Limited seats per edition.",
    campStats: [
      { n: "1000", u: "m² villa" },
      { n: "4", u: "days / 3 nights" },
      { n: "+18", u: "adults only" },
      { n: "∞", u: "waves" },
    ],
    editions: "Manageable editions",
    camps: [
      { dates: "Mar 20–23", tag: "XXL", nights: "4 days / 3 nights" },
      { dates: "Apr 10–13", tag: "XXL", nights: "4 days / 3 nights" },
      { dates: "Apr 16–19", tag: "Sambatrips", nights: "4 days / 3 nights" },
      { dates: "Sep 9–13", tag: "Sambatrips", nights: "5 days / 4 nights" },
    ],
    reviewsLabel: "Real reviews",
    reviewsA: "What",
    reviewsHl: "students say.",
    reviews: [
      { who: "Laura García", meta: "Group class · Roche", text: "An incredible experience. The instructors are very professional and patient. I stood up on the board the first day.", initials: "LG" },
      { who: "Carlos Martínez", meta: "Surf Camp · Conil", text: "The surf camp was the best part of my vacation. I learned a lot and met amazing people. Unbeatable vibe.", initials: "CM" },
      { who: "Rodríguez family", meta: "Group class · Roche", text: "We did the family course and it was perfect. The kids loved it and the instructors adapted to each age.", initials: "FR" },
    ],
    bookingA: "Booking is",
    bookingHl: "this fast.",
    bookingSteps: [
      { n: "01", title: "Pick your pack", desc: "Single class, 2-7 bundle or surf camp. Real-time availability." },
      { n: "02", title: "Book and pay", desc: "Full checkout with cart, user account and email confirmation." },
      { n: "03", title: "Surf", desc: "We'll see you at Playa de Roche. Gear and insurance included." },
    ],
    step: "STEP",
    hood: "Under the hood",
    hoodA: "A stack chosen to",
    hoodHl: "load fast.",
    closingA: "SEE YOU",
    closingHl: "IN THE WATER.",
    closingP:
      "The site is alive. Bookings every weekend and the bundle system converts without middlemen.",
    visit: "Visit entreolasurf.com",
    back: "← Back to portfolio",
    footerNote: "Entre Olas · Case study",
  },
  de: {
    badge: "Playa de Roche · Cádiz",
    status: "Live · entreolasurf.com",
    hero1: "ZWISCHEN",
    hero2: "WELLEN.",
    heroP:
      "Eine Surfschule mit Seele. Ich habe die komplette Website entworfen und gebaut — Kurse mit Paketsystem, E-Commerce, Online-Buchungen und 4 Surf-Camp-Editionen in einer Privatvilla.",
    marqueeItems: ["ROCHE", "CÁDIZ", "SURF CAMP", "PRIVATVILLA", "+18", "PAKETE -30%", "ROCHE", "CONIL"],
    sceneLabel: "Die Szene",
    sceneA: "Playa de Roche.",
    sceneHl: "Echte Menschen.",
    scenePhotos: "Fotos des Kunden",
    capTeam: "Team · Roche",
    capVilla: "Villa · Drohne",
    capRooftop: "Terrasse · goldene Stunde",
    proj: "Das Projekt",
    projA: "Eine Site, die",
    projHl: "Surf verkauft.",
    projP:
      "Es gab Schule, Wellen, Ruf. Es fehlte die Website, die den Kreis schließt. Ich habe sie gebaut.",
    builtList: [
      "Full-Stack-Design und -Entwicklung der gesamten Site",
      "Pakete-System mit progressivem Rabatt (-7% bis -30%)",
      "Online-Buchungen mit echter Datums-Verfügbarkeit",
      "E-Commerce für Merchandise mit komplettem Checkout",
      "4 verwaltbare Surf-Camp-Editionen mit Plätzen und Buchungen",
      "Hero mit eingebettetem Video und Playa-de-Roche-Ästhetik",
      "Technisches SEO: OG, Schema, Sitemap, Canonical",
      "WhatsApp-, Instagram- und TikTok-Integration",
    ],
    bonosLabel: "Das Paket-System",
    bonosA: "Mehr Kurse,",
    bonosHl: "mehr Ersparnis.",
    bonosP:
      "Pakete von 2 bis 7 Sitzungen mit progressivem Rabatt. Eigene Engine, gültig 180 Tage pro Paket.",
    bonosBono: "Paket",
    bonosClasses: "Kurse",
    bonosDiscount: "Rabatt",
    expA: "Die volle",
    expHl: "Erfahrung.",
    services: [
      { key: "group", title: "Gruppenkurse", blurb: "90 Minuten. Max. 6 Personen. Material und Versicherung inklusive. Ab Anfänger-Level." },
      { key: "individual", title: "Einzelkurse", blurb: "90 Minuten. 100% persönliche Betreuung. Doppelt so schneller Fortschritt." },
      { key: "yoga", title: "Yoga-Stunden", blurb: "Outdoor-Sessions als Ergänzung zum Wasser-Training." },
      { key: "paddle", title: "Paddle Surf", blurb: "Kurse und Routen in den ruhigen Gewässern von Conil. Alle Level." },
      { key: "skate", title: "Surf Skate", blurb: "Technisches Land-Training, um Manöver und Balance zu verbessern." },
      { key: "rental", title: "Material-Verleih", blurb: "Boards, Neoprenanzüge, Paddle, Bodyboard und Skate. Ohne Aufwand." },
    ],
    villaCapA: "Villa · +1000 m²",
    villaCapB: "Entre Olas Surf Camp",
    campLabel: "Surf Camp · +18",
    campA: "EINE ERFAHRUNG,",
    campHl: "DIE DU NICHT VERGISST.",
    campP:
      "Privatvilla mit +1000 m², Pool, Vollpension, Transport, Surf jeden Tag, Abenteuer und Partys. Begrenzte Plätze pro Edition.",
    campStats: [
      { n: "1000", u: "m² Villa" },
      { n: "4", u: "Tage / 3 Nächte" },
      { n: "+18", u: "nur Erwachsene" },
      { n: "∞", u: "Wellen" },
    ],
    editions: "Verwaltbare Editionen",
    camps: [
      { dates: "20.–23. März", tag: "XXL", nights: "4 Tage / 3 Nächte" },
      { dates: "10.–13. April", tag: "XXL", nights: "4 Tage / 3 Nächte" },
      { dates: "16.–19. April", tag: "Sambatrips", nights: "4 Tage / 3 Nächte" },
      { dates: "9.–13. September", tag: "Sambatrips", nights: "5 Tage / 4 Nächte" },
    ],
    reviewsLabel: "Echte Bewertungen",
    reviewsA: "Was",
    reviewsHl: "Schüler sagen.",
    reviews: [
      { who: "Laura García", meta: "Gruppenkurs · Roche", text: "Eine unglaubliche Erfahrung. Die Instruktoren sind sehr professionell und geduldig. Ich stand am ersten Tag auf dem Board.", initials: "LG" },
      { who: "Carlos Martínez", meta: "Surf Camp · Conil", text: "Das Surf-Camp war der beste Teil meines Urlaubs. Ich habe viel gelernt und tolle Leute kennengelernt. Unschlagbare Stimmung.", initials: "CM" },
      { who: "Familie Rodríguez", meta: "Gruppenkurs · Roche", text: "Wir haben den Familien-Kurs gemacht und es war perfekt. Die Kinder hatten Spaß und die Instruktoren passten sich jedem Alter an.", initials: "FR" },
    ],
    bookingA: "Buchen ist",
    bookingHl: "so schnell.",
    bookingSteps: [
      { n: "01", title: "Pack auswählen", desc: "Einzelkurs, 2-7er-Paket oder Surf Camp. Echtzeit-Verfügbarkeit." },
      { n: "02", title: "Buchen und zahlen", desc: "Vollständiger Checkout mit Warenkorb, Benutzerkonto und E-Mail-Bestätigung." },
      { n: "03", title: "Surfen", desc: "Wir sehen uns am Playa de Roche. Material und Versicherung inklusive." },
    ],
    step: "SCHRITT",
    hood: "Unter der Haube",
    hoodA: "Ein Stack, gewählt zum",
    hoodHl: "schnellen Laden.",
    closingA: "WIR SEHEN UNS",
    closingHl: "IM WASSER.",
    closingP:
      "Die Site lebt. Jedes Wochenende kommen Buchungen und das Paket-System konvertiert ohne Mittelsmänner.",
    visit: "entreolasurf.com besuchen",
    back: "← Zurück zum Portfolio",
    footerNote: "Entre Olas · Fallstudie",
  },
};

function Sun({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <circle cx="100" cy="100" r="36" fill={YELLOW} />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 56;
        const y1 = 100 + Math.sin(angle) * 56;
        const x2 = 100 + Math.cos(angle) * 82;
        const y2 = 100 + Math.sin(angle) * 82;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={YELLOW}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </motion.svg>
  );
}

function ScrollWave({ color = NAVY }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 1200 160"
        className="w-full h-auto"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <motion.path
          d="M0 80 C 100 30, 200 130, 300 80 C 400 30, 500 130, 600 80 C 700 30, 800 130, 900 80 C 1000 30, 1100 130, 1200 80"
          style={{ pathLength }}
        />
        <motion.path
          d="M0 110 C 100 60, 200 160, 300 110 C 400 60, 500 160, 600 110 C 700 60, 800 160, 900 110 C 1000 60, 1100 160, 1200 110"
          style={{ pathLength, opacity: 0.4 }}
        />
      </svg>
    </div>
  );
}

function Marquee({
  items,
  color = NAVY,
  bg = "transparent",
}: {
  items: string[];
  color?: string;
  bg?: string;
}) {
  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ background: bg, borderColor: color + "20" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-2xl md:text-5xl"
            style={{ fontFamily: DISPLAY, color, letterSpacing: "0.02em" }}
          >
            {item} <span style={{ color: YELLOW }}>✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const serviceIcons = {
  group: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  individual: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  yoga: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  paddle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  skate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  rental: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
};

function ServiceCard({
  icon,
  title,
  blurb,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  blurb: string;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-hover
      className="relative p-7 md:p-10 border transition-colors duration-300"
      style={{
        borderColor: LINE,
        background: hover ? NAVY : "transparent",
        color: hover ? BG : TEXT,
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center transition-colors"
        style={{ color: hover ? YELLOW : NAVY }}
      >
        {icon}
      </div>
      <h3
        className="mt-6 text-3xl md:text-4xl leading-[0.95]"
        style={{ fontFamily: DISPLAY, letterSpacing: "0.01em" }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ fontFamily: SANS, color: hover ? "rgba(255,253,247,0.7)" : MUTED }}
      >
        {blurb}
      </p>
    </motion.div>
  );
}

const bonos = [
  { count: "2", discount: "7" },
  { count: "3", discount: "14" },
  { count: "5", discount: "23" },
  { count: "7", discount: "30" },
];

export default function EntreOlasDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);
  const titleX = useTransform(heroProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: SANS }}>
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden px-6 md:px-12 pt-28 md:pt-40 pb-16"
      >
        <motion.div
          aria-hidden
          style={{ y: heroY, opacity: heroFade }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/entre-olas-surf/aerial-beach.jpg"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(0.95)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${BG}ee 0%, ${BG}99 35%, ${BG}99 70%, ${BG}f5 100%), radial-gradient(ellipse at 80% 20%, ${SAND}cc 0%, transparent 55%)`,
            }}
          />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroFade }}
          className="absolute top-20 right-6 md:right-20 w-32 md:w-60"
        >
          <Sun />
        </motion.div>

        <motion.span
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute right-6 bottom-32 select-none pointer-events-none leading-none"
        >
          <span
            className="text-[18vw] md:text-[14vw] block"
            style={{ fontFamily: DISPLAY, color: NAVY, opacity: 0.05 }}
          >
            03
          </span>
        </motion.span>

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-6 flex-wrap"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5"
              style={{ background: NAVY, color: YELLOW, fontFamily: MONO }}
            >
              {t.badge}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              2025
            </span>
          </motion.div>

          <motion.h1 style={{ x: titleX }} className="relative">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.35, ease: EASE }}
                className="block text-[clamp(3.5rem,18vw,16rem)] leading-[0.85]"
                style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
              >
                {t.hero1}
              </motion.span>
            </span>
            <span className="block overflow-hidden -mt-1 md:-mt-4">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.55, ease: EASE }}
                className="block text-[clamp(3.5rem,18vw,16rem)] leading-[0.85] italic"
                style={{
                  fontFamily: DISPLAY,
                  color: YELLOW,
                  WebkitTextStroke: `2px ${NAVY}`,
                  letterSpacing: "0.005em",
                }}
              >
                {t.hero2}
              </motion.span>
            </span>
          </motion.h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: TEXT, fontFamily: SANS }}
            >
              {t.heroP}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="https://entreolasurf.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 transition-colors"
                style={{ background: NAVY, color: YELLOW, fontFamily: MONO }}
              >
                entreolasurf.com
                <span>↗</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <ScrollWave />
          </motion.div>
        </motion.div>
      </section>

      <Marquee items={t.marqueeItems} color={NAVY} bg={SAND} />

      <section className="px-6 md:px-12 py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-12 max-w-4xl flex-wrap gap-3"
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              {t.sceneLabel}
            </p>
            <h2
              className="text-3xl md:text-6xl leading-[0.95]"
              style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
            >
              {t.sceneA}{" "}
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                {t.sceneHl}
              </span>
            </h2>
          </div>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em] shrink-0"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.scenePhotos}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="md:col-span-5 md:row-span-2 relative aspect-[3/4] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/team-beach.jpg"
              alt="Entre Olas team"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={85}
              loading="eager"
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "white", fontFamily: MONO, textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
            >
              {t.capTeam}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/aerial-house.jpg"
              alt="Villa from drone"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              quality={85}
              loading="eager"
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "white", fontFamily: MONO, textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
            >
              {t.capVilla}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/entre-olas-surf/rooftop.jpg"
              alt="Terrace with pool"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              quality={85}
              className="object-cover"
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "white", fontFamily: MONO, textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
            >
              {t.capRooftop}
            </span>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              {t.proj}
            </p>
            <h2
              className="text-4xl md:text-7xl leading-[0.92]"
              style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
            >
              {t.projA}
              <br />
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                {t.projHl}
              </span>
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
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              } as Variants
            }
            className="space-y-0"
          >
            {t.builtList.map((line) => (
              <motion.li
                key={line}
                variants={
                  {
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
                  } as Variants
                }
                className="flex items-start gap-5 py-5 border-b group"
                style={{ borderColor: LINE }}
              >
                <span
                  className="text-xl mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: YELLOW }}
                >
                  ✺
                </span>
                <span
                  className="text-base md:text-lg leading-snug"
                  style={{ color: TEXT, fontFamily: SANS }}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 overflow-hidden"
        style={{ background: SAND }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-14"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.bonosLabel}
          </p>
          <h2
            className="text-4xl md:text-7xl leading-[0.92]"
            style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
          >
            {t.bonosA}
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.bonosHl}
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.bonosP}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {bonos.map((b, i) => {
            const highlight = i === bonos.length - 1;
            return (
              <motion.div
                key={b.count}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE, type: "spring", stiffness: 180 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative p-5 md:p-8 flex flex-col justify-between aspect-[3/4]"
                style={{
                  background: highlight ? NAVY : BG,
                  color: highlight ? BG : NAVY,
                  border: `2px solid ${highlight ? NAVY : LINE}`,
                }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ fontFamily: MONO, color: highlight ? YELLOW : MUTED }}
                  >
                    {t.bonosBono}
                  </p>
                  <p
                    className="text-6xl md:text-8xl leading-none mt-3"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {b.count}
                  </p>
                  <p
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ fontFamily: SANS }}
                  >
                    {t.bonosClasses}
                  </p>
                </div>
                <div className="mt-6">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ fontFamily: MONO, color: highlight ? YELLOW : MUTED }}
                  >
                    {t.bonosDiscount}
                  </p>
                  <p
                    className="text-4xl md:text-6xl leading-none mt-2"
                    style={{ fontFamily: DISPLAY, color: highlight ? YELLOW : NAVY }}
                  >
                    −{b.discount}%
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl leading-[0.92] max-w-2xl"
            style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
          >
            {t.expA}
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.expHl}
            </span>
          </motion.h2>
          <span
            className="hidden md:block text-[10px] uppercase tracking-[0.3em]"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            (06)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i}
              icon={serviceIcons[s.key]}
              title={s.title}
              blurb={s.blurb}
            />
          ))}
        </div>
      </section>

      <section className="relative">
        <motion.div
          initial={{ opacity: 0.01 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
          style={{ background: NAVY }}
        >
          <Image
            src="/projects/entre-olas-surf/interior-patio.jpg"
            alt="Villa courtyard pool and hammocks"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,47,57,0) 55%, rgba(15,47,57,0.85) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-6 md:py-10 flex items-end justify-between flex-wrap gap-2">
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              {t.villaCapA}
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.3em] hidden md:block"
              style={{ color: "rgba(255,253,247,0.7)", fontFamily: MONO }}
            >
              {t.villaCapB}
            </p>
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] opacity-10"
        >
          <Sun />
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              {t.campLabel}
            </p>
            <h2
              className="text-4xl md:text-8xl leading-[0.92] md:leading-[0.88]"
              style={{ fontFamily: DISPLAY, color: BG, letterSpacing: "0.005em" }}
            >
              {t.campA}
              <br />
              <span style={{ color: YELLOW }}>{t.campHl}</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(255,253,247,0.72)", fontFamily: SANS }}
            >
              {t.campP}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={
              {
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              } as Variants
            }
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {t.campStats.map((f) => (
              <motion.div
                key={f.u}
                variants={
                  {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  } as Variants
                }
                className="border-t pt-4"
                style={{ borderColor: "rgba(255,253,247,0.2)" }}
              >
                <p
                  className="text-4xl md:text-6xl leading-none"
                  style={{ fontFamily: DISPLAY, color: YELLOW }}
                >
                  {f.n}
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,253,247,0.5)", fontFamily: MONO }}
                >
                  {f.u}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0.01, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ background: NAVY_SOFT }}
            >
              <Image
                src="/projects/entre-olas-surf/interior-living.jpg"
                alt="Villa living room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover"
              />
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ background: NAVY_SOFT }}
            >
              <Image
                src="/projects/entre-olas-surf/interior-pool.jpg"
                alt="Villa pool patio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="mt-16">
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-8"
              style={{ color: YELLOW, fontFamily: MONO }}
            >
              {t.editions}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.camps.map((c, i) => (
                <motion.div
                  key={c.dates}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
                  className="p-5 border"
                  style={{ borderColor: "rgba(255,253,247,0.2)" }}
                >
                  <span
                    className="text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: YELLOW, fontFamily: MONO }}
                  >
                    {c.tag}
                  </span>
                  <p
                    className="mt-3 text-2xl md:text-4xl leading-tight"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {c.dates}
                  </p>
                  <p
                    className="mt-2 text-xs"
                    style={{ color: "rgba(255,253,247,0.55)", fontFamily: SANS }}
                  >
                    {c.nights}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.reviewsLabel}
          </p>
          <h2
            className="text-4xl md:text-7xl leading-[0.92] max-w-2xl"
            style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
          >
            {t.reviewsA}
            <br />
            <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
              {t.reviewsHl}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.reviews.map((r, i) => (
            <motion.article
              key={r.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              className="p-7 md:p-10 border flex flex-col"
              style={{ borderColor: LINE, background: BG }}
            >
              <div className="text-xl tracking-wider" style={{ color: YELLOW }}>
                {"★★★★★"}
              </div>
              <blockquote
                className="mt-6 text-base leading-relaxed flex-1"
                style={{ color: TEXT, fontFamily: SANS }}
              >
                «{r.text}»
              </blockquote>
              <footer
                className="mt-6 pt-6 border-t flex items-center gap-4"
                style={{ borderColor: LINE }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: NAVY, color: YELLOW, fontFamily: MONO }}
                >
                  {r.initials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: NAVY, fontFamily: SANS }}
                  >
                    {r.who}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: MUTED, fontFamily: MONO }}
                  >
                    {r.meta}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32"
        style={{ background: SAND }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl leading-[0.92] max-w-2xl mb-14"
          style={{ fontFamily: DISPLAY, color: NAVY, letterSpacing: "0.005em" }}
        >
          {t.bookingA}
          <br />
          <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
            {t.bookingHl}
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {t.bookingSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: EASE }}
              className="relative"
            >
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: YELLOW, fontFamily: MONO }}
              >
                {t.step} {s.n}
              </span>
              <h3
                className="mt-3 text-3xl md:text-5xl leading-tight"
                style={{ fontFamily: DISPLAY, color: NAVY }}
              >
                {s.title}
              </h3>
              <p
                className="mt-4 text-sm leading-relaxed max-w-xs"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                {s.desc}
              </p>
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
              style={{ color: MUTED, fontFamily: MONO }}
            >
              {t.hood}
            </p>
            <h3
              className="text-3xl md:text-5xl leading-[1]"
              style={{ fontFamily: DISPLAY, color: NAVY }}
            >
              {t.hoodA}
              <br />
              <span style={{ color: YELLOW, WebkitTextStroke: `1.5px ${NAVY}` }}>
                {t.hoodHl}
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Vite", "Supabase", "Stripe", "YouTube Embed",
              "Bebas Neue", "Manrope", "Space Grotesk",
              "E-commerce", "Calendar", "WhatsApp Business",
              "Schema · SEO", "Vercel",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="border px-4 py-3 text-xs"
                style={{ borderColor: LINE, color: NAVY, fontFamily: MONO }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-28 md:py-48 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[420px] h-[420px] opacity-25"
        >
          <Sun />
        </motion.div>

        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-5xl md:text-9xl leading-[0.9] md:leading-[0.85]"
            style={{ fontFamily: DISPLAY, color: BG }}
          >
            {t.closingA}
            <br />
            <span style={{ color: YELLOW }}>{t.closingHl}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(255,253,247,0.72)", fontFamily: SANS }}
          >
            {t.closingP}
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://entreolasurf.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 flex items-center gap-2"
              style={{ background: YELLOW, color: NAVY, fontFamily: MONO }}
            >
              {t.visit}
              <span>↗</span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: "rgba(255,253,247,0.6)", fontFamily: MONO }}
            >
              {t.back}
            </Link>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-6 border-t flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: LINE, background: BG }}
      >
        <Link
          href="/"
          data-hover
          className="text-xs opacity-40 hover:opacity-100 transition-opacity"
          style={{ fontFamily: MONO, color: NAVY }}
        >
          Felipe Cámara
        </Link>
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED, fontFamily: MONO }}
        >
          © {new Date().getFullYear()} · {t.footerNote}
        </span>
      </footer>
    </div>
  );
}
