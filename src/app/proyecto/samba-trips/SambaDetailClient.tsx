"use client";

import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

const BG = "#eeebdc";
const CREAM = "#f5f1e4";
const NAVY = "#081c3a";
const LAVENDER = "#c0c0d3";
const ORANGE = "#fe6c01";
const LINE = "rgba(8,28,58,0.1)";
const MUTED = "rgba(8,28,58,0.55)";

const EASE = [0.22, 1, 0.36, 1] as const;

const DISPLAY = "var(--font-unbounded), 'Impact', sans-serif";
const SANS = "var(--font-jakarta), system-ui, sans-serif";
const MONO = "var(--font-mono), monospace";

type TripCont = "Asia" | "África" | "Europa" | "Africa" | "Europe" | "Afrika" | "Europa-de";

interface Trip {
  photo: string;
  country: string;
  title: string;
  partner?: string;
  dates: string;
  continent: string;
}

const T: Record<Lang, {
  case: string;
  hero1: string;
  hero2: string;
  heroPpre: string;
  heroPpost: string;
  visit: string;
  stats: { n: string; label: string }[];
  proj: string;
  projA: string;
  projHl: string;
  projP: string;
  tripsLabel: string;
  tripsA: string;
  tripsHl: string;
  tripsP: string;
  trips: Trip[];
  bonusLabel: string;
  bonusA: string;
  bonusHl: string;
  bonusP: string;
  seeEntreOlas: string;
  creatorLabel: string;
  creatorTitleA: string;
  creatorHl: string;
  creatorShot: string;
  creatorQuoteA: string;
  creatorQuoteHl: string;
  creatorQuoteB: string;
  creatorBio: string;
  followers: string;
  posts: string;
  pillarsLabel: string;
  pillarsA: string;
  pillarsHl: string;
  pillars: { n: string; title: string; desc: string }[];
  faqLabel: string;
  faqA: string;
  faqHl: string;
  faq: { q: string; a: string }[];
  ownLabel: string;
  ownA: string;
  ownHl: string;
  ownList: string[];
  closingA: string;
  closingHl: string;
  closingP: string;
  ctaSee: string;
  ctaBack: string;
  footerNote: string;
  status: string;
}> = {
  es: {
    case: "Caso de estudio · 04",
    hero1: "Samba",
    hero2: "trips.",
    heroPpre: "La casa digital de ",
    heroPpost: ". Creator de viaje con 96K que no quería una landing — quería un sitio donde su comunidad pudiera apuntarse a los trips y pagar en 3 clics.",
    visit: "Visitar el sitio",
    stats: [
      { n: "96K", label: "Seguidores IG" },
      { n: "491", label: "Posts" },
      { n: "06", label: "Trips activos" },
      { n: "03", label: "Continentes" },
    ],
    proj: "El proyecto",
    projA: "Creator con comunidad. ",
    projHl: "Una web que cierra.",
    projP:
      "Oli Czudny lleva años organizando viajes en grupo y documentándolos en Instagram. 96K personas le siguen. Cada vez que anunciaba un trip, le llegaban docenas de DMs — la web tenía que absorber ese tráfico y convertir interés en reserva sin perder la estética cruda de sus posts.",
    tripsLabel: "Los trips",
    tripsA: "Seis carteles. ",
    tripsHl: "Seis historias.",
    tripsP:
      "Cada trip tiene su póster — diseño estilo concierto, co-brand con el partner local, foto real de la edición anterior. Así es como se comunican en Instagram y así viven en la web.",
    trips: [
      { photo: "/projects/samba-trips/photos/photo-1.jpg", country: "Filipinas", title: "Siargao Surf Trip", partner: "SurfPlusFriends", dates: "12–19 Marzo", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-2.jpg", country: "España", title: "Surf House · Conil", partner: "Entre Olas", dates: "23–26 Abril", continent: "Europa" },
      { photo: "/projects/samba-trips/photos/photo-3.jpg", country: "Indonesia", title: "Lombok Surf Trip", partner: "Easy Rizzy", dates: "2–9 Marzo", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-4.jpg", country: "Marruecos", title: "Sahara Escape", partner: "Barefootrips Morocco", dates: "1–8 Octubre", continent: "África" },
      { photo: "/projects/samba-trips/photos/photo-6.jpg", country: "Maldivas", title: "¿Has visto a Nemo?", partner: "Akiri Holidays", dates: "13–20 Junio", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-5.jpg", country: "Tanzania + Zanzíbar", title: "Welcome to Africa", dates: "Próximamente", continent: "África" },
    ],
    bonusLabel: "Bonus · el universo conecta",
    bonusA: "La edición de Conil la co-produce ",
    bonusHl: "Entre Olas.",
    bonusP:
      "Construí las dos webs. La de Samba, la de Entre Olas. Cuando los colegas colaboran y el ecosistema se cruza, el trabajo cobra otro sentido.",
    seeEntreOlas: "Ver Entre Olas",
    creatorLabel: "El creator detrás",
    creatorTitleA: "Oliver Czudny, ",
    creatorHl: "aka Oli.",
    creatorShot: "shot by @oli_czudny · lombok",
    creatorQuoteA:
      "«Porque lo mejor de recorrer el mundo no son los lugares, sino las personas con las que los compartes. Viajamos juntos, vivimos intensamente… y la vida se vuelve ",
    creatorQuoteHl: "samba",
    creatorQuoteB: ".»",
    creatorBio:
      "Oli lleva 491 posts documentando trips. Cuando monetizó con reservas, la web tenía que estar a la altura de su comunidad — no por encima, no por debajo. Cruda y bien hecha.",
    followers: "Seguidores IG",
    posts: "Posts · reels",
    pillarsLabel: "Los pilares de la marca",
    pillarsA: "Más que viajes, ",
    pillarsHl: "experiencias.",
    pillars: [
      { n: "01", title: "Planea tu aventura", desc: "Acompañamiento en cada paso. Organizar el viaje tan emocionante como vivirlo." },
      { n: "02", title: "Beneficios exclusivos", desc: "Trato VIP, detalles sorpresa y ese algo inesperado que lleva el viaje al siguiente nivel." },
      { n: "03", title: "Conexiones locales", desc: "Red de amigos locales que abren puertas que otros viajeros no saben que existen." },
      { n: "04", title: "Viajes a medida", desc: "Aquí no hay viajes genéricos. Cada aventura tan única como quien la vive." },
    ],
    faqLabel: "Preguntas frecuentes",
    faqA: "Lo que ",
    faqHl: "todos preguntan.",
    faq: [
      { q: "¿Los vuelos están incluidos?", a: "No, cada viajero reserva su vuelo. Les orientamos sobre fechas, rutas y tarifas, y coordinamos llegadas." },
      { q: "¿Me ayudan con el visado?", a: "Sí. Si el destino requiere visado, se explica en la ficha del trip y se acompaña el proceso paso a paso." },
      { q: "¿Puedo cancelar y recibir reembolso?", a: "La política está detallada por edición. En general: la señal no se devuelve, el pago final se puede transferir a otro trip con aviso." },
      { q: "¿Qué está incluido en el precio?", a: "Alojamiento, actividades del programa, algunas comidas y transporte local. Los extras se pagan aparte con transparencia." },
    ],
    ownLabel: "Lo que construí",
    ownA: "De punta a punta, ",
    ownHl: "sin postureo.",
    ownList: [
      "Diseño editorial + identidad visual adaptada a IG",
      "Desarrollo sobre Webflow con CMS Collections custom",
      "Catálogo de 6+ trips gestionable sin tocar código",
      "Reservas con señal y pago final integrados en Stripe",
      "Fichas de destino con co-branding por partner local",
      "Feed de Instagram embebido como prueba social",
      "SEO internacional (ES / EN) + multimoneda",
    ],
    closingA: "La vida\nse vuelve ",
    closingHl: "samba.",
    closingP:
      "La web está viva, cada edición abre reservas desde el CMS y la comunidad de 96K de Oli se convierte en viajeros reales.",
    ctaSee: "Visitar sambatrips.com",
    ctaBack: "← Volver al portfolio",
    footerNote: "Samba Trips · Caso de estudio",
    status: "sambatrips.com · en vivo",
  },
  en: {
    case: "Case study · 04",
    hero1: "Samba",
    hero2: "trips.",
    heroPpre: "The digital home of ",
    heroPpost: ". A travel creator with 96K who didn't want a landing — he wanted a site where his community could sign up for trips and pay in 3 clicks.",
    visit: "Visit the site",
    stats: [
      { n: "96K", label: "IG followers" },
      { n: "491", label: "Posts" },
      { n: "06", label: "Active trips" },
      { n: "03", label: "Continents" },
    ],
    proj: "The project",
    projA: "Creator with community. ",
    projHl: "A site that closes.",
    projP:
      "Oli Czudny has been organizing group trips for years and documenting them on Instagram. 96K people follow him. Every time he announced a trip, dozens of DMs came in — the site had to absorb that traffic and turn interest into bookings without losing the raw aesthetic of his posts.",
    tripsLabel: "The trips",
    tripsA: "Six posters. ",
    tripsHl: "Six stories.",
    tripsP:
      "Every trip has its poster — concert-style design, co-brand with the local partner, real photo from the previous edition. That's how they communicate on Instagram and that's how they live on the web.",
    trips: [
      { photo: "/projects/samba-trips/photos/photo-1.jpg", country: "Philippines", title: "Siargao Surf Trip", partner: "SurfPlusFriends", dates: "Mar 12–19", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-2.jpg", country: "Spain", title: "Surf House · Conil", partner: "Entre Olas", dates: "Apr 23–26", continent: "Europe" },
      { photo: "/projects/samba-trips/photos/photo-3.jpg", country: "Indonesia", title: "Lombok Surf Trip", partner: "Easy Rizzy", dates: "Mar 2–9", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-4.jpg", country: "Morocco", title: "Sahara Escape", partner: "Barefootrips Morocco", dates: "Oct 1–8", continent: "Africa" },
      { photo: "/projects/samba-trips/photos/photo-6.jpg", country: "Maldives", title: "Have you seen Nemo?", partner: "Akiri Holidays", dates: "Jun 13–20", continent: "Asia" },
      { photo: "/projects/samba-trips/photos/photo-5.jpg", country: "Tanzania + Zanzibar", title: "Welcome to Africa", dates: "Coming soon", continent: "Africa" },
    ],
    bonusLabel: "Bonus · the universe connects",
    bonusA: "The Conil edition is co-produced by ",
    bonusHl: "Entre Olas.",
    bonusP:
      "I built both sites. Samba's, Entre Olas'. When friends collaborate and the ecosystem crosses, the work means more.",
    seeEntreOlas: "See Entre Olas",
    creatorLabel: "The creator behind it",
    creatorTitleA: "Oliver Czudny, ",
    creatorHl: "aka Oli.",
    creatorShot: "shot by @oli_czudny · lombok",
    creatorQuoteA:
      "\"The best part of traveling the world isn't the places — it's the people you share them with. We travel together, live intensely… and life turns into ",
    creatorQuoteHl: "samba",
    creatorQuoteB: ".\"",
    creatorBio:
      "Oli has 491 posts documenting trips. When he monetized with bookings, the site had to match his community — not above, not below. Raw and well-made.",
    followers: "IG followers",
    posts: "Posts · reels",
    pillarsLabel: "The brand pillars",
    pillarsA: "More than trips, ",
    pillarsHl: "experiences.",
    pillars: [
      { n: "01", title: "Plan your adventure", desc: "Hands-on at every step. Organizing the trip as exciting as living it." },
      { n: "02", title: "Exclusive perks", desc: "VIP treatment, surprise details and that unexpected something that takes the trip up a level." },
      { n: "03", title: "Local connections", desc: "A network of local friends who open doors other travelers don't know exist." },
      { n: "04", title: "Trips made to measure", desc: "No generic trips here. Each adventure as unique as the person living it." },
    ],
    faqLabel: "Frequently asked",
    faqA: "What ",
    faqHl: "everyone asks.",
    faq: [
      { q: "Are flights included?", a: "No, each traveler books their own flight. We give guidance on dates, routes and fares, and coordinate arrivals." },
      { q: "Do you help with visas?", a: "Yes. If the destination requires a visa, it's explained in the trip page and we walk you through it step by step." },
      { q: "Can I cancel and get a refund?", a: "Policy is detailed per edition. In general: the deposit isn't refunded, the final payment can be transferred to another trip with notice." },
      { q: "What's included in the price?", a: "Accommodation, program activities, some meals and local transport. Extras are paid separately, transparently." },
    ],
    ownLabel: "What I built",
    ownA: "End to end, ",
    ownHl: "no posturing.",
    ownList: [
      "Editorial design + visual identity adapted to IG",
      "Built on Webflow with custom CMS Collections",
      "Catalog of 6+ trips, manageable without touching code",
      "Bookings with deposit and final payment via Stripe",
      "Destination pages with local-partner co-branding",
      "Embedded Instagram feed as social proof",
      "International SEO (ES / EN) + multi-currency",
    ],
    closingA: "Life turns\ninto ",
    closingHl: "samba.",
    closingP:
      "The site is live, every edition opens bookings from the CMS, and Oli's 96K community turns into real travelers.",
    ctaSee: "Visit sambatrips.com",
    ctaBack: "← Back to portfolio",
    footerNote: "Samba Trips · Case study",
    status: "sambatrips.com · live",
  },
  de: {
    case: "Fallstudie · 04",
    hero1: "Samba",
    hero2: "trips.",
    heroPpre: "Das digitale Zuhause von ",
    heroPpost: ". Ein Reise-Creator mit 96K, der keine Landing wollte — er wollte eine Site, auf der seine Community sich für Trips anmelden und in 3 Klicks zahlen kann.",
    visit: "Site besuchen",
    stats: [
      { n: "96K", label: "IG-Follower" },
      { n: "491", label: "Posts" },
      { n: "06", label: "Aktive Trips" },
      { n: "03", label: "Kontinente" },
    ],
    proj: "Das Projekt",
    projA: "Creator mit Community. ",
    projHl: "Eine Site, die schließt.",
    projP:
      "Oli Czudny organisiert seit Jahren Gruppenreisen und dokumentiert sie auf Instagram. 96K Menschen folgen ihm. Jedes Mal, wenn er eine Reise ankündigte, kamen Dutzende DMs — die Site musste diesen Traffic absorbieren und Interesse in Buchungen verwandeln, ohne die rohe Ästhetik seiner Posts zu verlieren.",
    tripsLabel: "Die Trips",
    tripsA: "Sechs Plakate. ",
    tripsHl: "Sechs Geschichten.",
    tripsP:
      "Jede Reise hat ihr Plakat — Konzert-Stil-Design, Co-Brand mit dem lokalen Partner, echtes Foto der vorigen Edition. So kommunizieren sie auf Instagram, und so leben sie im Web.",
    trips: [
      { photo: "/projects/samba-trips/photos/photo-1.jpg", country: "Philippinen", title: "Siargao Surf Trip", partner: "SurfPlusFriends", dates: "12.–19. März", continent: "Asien" },
      { photo: "/projects/samba-trips/photos/photo-2.jpg", country: "Spanien", title: "Surf House · Conil", partner: "Entre Olas", dates: "23.–26. April", continent: "Europa" },
      { photo: "/projects/samba-trips/photos/photo-3.jpg", country: "Indonesien", title: "Lombok Surf Trip", partner: "Easy Rizzy", dates: "2.–9. März", continent: "Asien" },
      { photo: "/projects/samba-trips/photos/photo-4.jpg", country: "Marokko", title: "Sahara Escape", partner: "Barefootrips Morocco", dates: "1.–8. Oktober", continent: "Afrika" },
      { photo: "/projects/samba-trips/photos/photo-6.jpg", country: "Malediven", title: "Hast du Nemo gesehen?", partner: "Akiri Holidays", dates: "13.–20. Juni", continent: "Asien" },
      { photo: "/projects/samba-trips/photos/photo-5.jpg", country: "Tansania + Sansibar", title: "Welcome to Africa", dates: "Bald", continent: "Afrika" },
    ],
    bonusLabel: "Bonus · das Universum verbindet",
    bonusA: "Die Conil-Edition co-produziert ",
    bonusHl: "Entre Olas.",
    bonusP:
      "Ich habe beide Sites gebaut. Die von Samba, die von Entre Olas. Wenn Freunde kollaborieren und das Ökosystem sich kreuzt, wird die Arbeit bedeutsamer.",
    seeEntreOlas: "Entre Olas ansehen",
    creatorLabel: "Der Creator dahinter",
    creatorTitleA: "Oliver Czudny, ",
    creatorHl: "aka Oli.",
    creatorShot: "shot by @oli_czudny · lombok",
    creatorQuoteA:
      "„Das Beste am Bereisen der Welt sind nicht die Orte, sondern die Menschen, mit denen du sie teilst. Wir reisen zusammen, leben intensiv… und das Leben wird zu ",
    creatorQuoteHl: "samba",
    creatorQuoteB: ".\"",
    creatorBio:
      "Oli hat 491 Posts, in denen er Trips dokumentiert. Als er mit Buchungen monetarisierte, musste die Site auf Augenhöhe mit seiner Community sein — nicht darüber, nicht darunter. Roh und gut gemacht.",
    followers: "IG-Follower",
    posts: "Posts · Reels",
    pillarsLabel: "Die Marken-Säulen",
    pillarsA: "Mehr als Reisen, ",
    pillarsHl: "Erlebnisse.",
    pillars: [
      { n: "01", title: "Plane dein Abenteuer", desc: "Begleitung bei jedem Schritt. Die Reise zu organisieren ist genauso aufregend wie sie zu erleben." },
      { n: "02", title: "Exklusive Vorteile", desc: "VIP-Behandlung, Überraschungs-Details und das Unerwartete, das die Reise auf das nächste Level hebt." },
      { n: "03", title: "Lokale Verbindungen", desc: "Ein Netzwerk lokaler Freunde, die Türen öffnen, die andere Reisende nicht kennen." },
      { n: "04", title: "Maßgeschneiderte Reisen", desc: "Hier gibt es keine generischen Reisen. Jedes Abenteuer so einzigartig wie die Person, die es lebt." },
    ],
    faqLabel: "Häufige Fragen",
    faqA: "Was ",
    faqHl: "alle fragen.",
    faq: [
      { q: "Sind Flüge inklusive?", a: "Nein, jeder Reisende bucht seinen eigenen Flug. Wir beraten zu Daten, Routen und Tarifen und koordinieren Ankünfte." },
      { q: "Helft ihr beim Visum?", a: "Ja. Wenn das Ziel ein Visum erfordert, wird es auf der Trip-Seite erklärt und Schritt für Schritt begleitet." },
      { q: "Kann ich stornieren und Geld zurück?", a: "Die Politik ist pro Edition detailliert. Allgemein: die Anzahlung wird nicht erstattet, die Restzahlung kann mit Vorlauf auf eine andere Reise übertragen werden." },
      { q: "Was ist im Preis enthalten?", a: "Unterkunft, Programm-Aktivitäten, einige Mahlzeiten und lokaler Transport. Extras werden transparent separat bezahlt." },
    ],
    ownLabel: "Was ich gebaut habe",
    ownA: "Von Anfang bis Ende, ",
    ownHl: "ohne Posing.",
    ownList: [
      "Redaktionelles Design + visuelle Identität an IG angepasst",
      "Entwicklung auf Webflow mit eigenen CMS Collections",
      "Katalog mit 6+ Trips, ohne Code verwaltbar",
      "Buchungen mit Anzahlung und Restzahlung über Stripe",
      "Ziel-Seiten mit Co-Branding pro lokalem Partner",
      "Eingebetteter Instagram-Feed als Social Proof",
      "Internationales SEO (ES / EN) + Multi-Währung",
    ],
    closingA: "Das Leben\nwird zu ",
    closingHl: "samba.",
    closingP:
      "Die Site lebt, jede Edition öffnet Buchungen aus dem CMS, und Olis 96K-Community wird zu echten Reisenden.",
    ctaSee: "sambatrips.com besuchen",
    ctaBack: "← Zurück zum Portfolio",
    footerNote: "Samba Trips · Fallstudie",
    status: "sambatrips.com · live",
  },
};

function SambaSun({ className, color = ORANGE }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <circle cx="50" cy="50" r="16" fill={color} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 50 + Math.cos(angle) * 24;
        const y1 = 50 + Math.sin(angle) * 24;
        const x2 = 50 + Math.cos(angle) * 40;
        const y2 = 50 + Math.sin(angle) * 40;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="5" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

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
  const inView = useInView(ref, { once: true, margin: "-40px" });
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

function TripPoster({ trip, index }: { trip: Trip; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.01, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.8, ease: EASE }}
      data-hover
      className="group relative"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden shadow-[0_25px_60px_-18px_rgba(8,28,58,0.35)]"
        style={{ background: NAVY }}
      >
        <Image
          src={trip.photo}
          alt={`${trip.title} — ${trip.country}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
          quality={85}
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: ORANGE, fontFamily: MONO }}
          >
            {trip.continent} · {trip.country}
          </p>
          <p
            className="mt-1 text-lg leading-tight"
            style={{ fontFamily: DISPLAY, fontWeight: 600, color: NAVY, letterSpacing: "-0.02em" }}
          >
            {trip.title}
          </p>
          {trip.partner && (
            <p
              className="mt-1 text-[10px]"
              style={{ color: MUTED, fontFamily: MONO }}
            >
              × {trip.partner}
            </p>
          )}
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.25em] shrink-0 pt-1"
          style={{ color: NAVY, fontFamily: MONO }}
        >
          {trip.dates}
        </span>
      </div>
    </motion.div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="border-t pt-5 pb-2"
      style={{ borderColor: NAVY }}
    >
      <div className="flex items-baseline gap-4">
        <span
          className="text-[10px] uppercase tracking-[0.25em] shrink-0"
          style={{ color: ORANGE, fontFamily: MONO }}
        >
          0{index + 1}
        </span>
        <div>
          <h4
            className="text-lg md:text-xl leading-tight"
            style={{ fontFamily: DISPLAY, fontWeight: 600, color: NAVY, letterSpacing: "-0.01em" }}
          >
            {q}
          </h4>
          <p
            className="mt-3 text-sm leading-relaxed max-w-2xl"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SambaDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-12%"]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, 0]);

  return (
    <div style={{ background: BG, color: NAVY, fontFamily: SANS }}>
      <BlendNav active="projects" />

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-8 -bottom-8"
        >
          <Image
            src="/projects/samba-trips/hero-video-poster.jpg"
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,28,58,0.45) 0%, rgba(8,28,58,0.15) 40%, rgba(8,28,58,0.3) 70%, rgba(8,28,58,0.92) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: heroFade }}
          className="absolute top-28 right-6 md:right-16 w-20 md:w-28"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <SambaSun color={ORANGE} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: heroContentY, opacity: heroFade }}
          className="relative z-10 w-full px-6 md:px-12 pt-32 pb-16 md:pb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-8 text-white/85 flex-wrap"
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border border-white/30 rounded-full"
              style={{ fontFamily: MONO }}
            >
              {t.case}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO }}>
              2025
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="text-[clamp(2.75rem,12vw,11rem)] leading-[0.9] text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                {t.hero1}
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.65, ease: EASE }}
                className="text-[clamp(2.75rem,12vw,11rem)] leading-[0.9] italic"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  color: ORANGE,
                  letterSpacing: "-0.04em",
                  textShadow: "0 4px 30px rgba(0,0,0,0.35)",
                }}
              >
                {t.hero2}
              </motion.h1>
            </div>
          </div>

          <div className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-xl text-base md:text-lg leading-relaxed text-white/90"
              style={{ fontFamily: SANS, fontWeight: 400 }}
            >
              {t.heroPpre}
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: ORANGE, textDecoration: "underline", textUnderlineOffset: 4 }}
                data-hover
              >
                @oli_czudny
              </a>
              {t.heroPpost}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://sambatrips.com"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2"
                style={{ background: ORANGE, color: "white", fontFamily: MONO }}
              >
                {t.visit}
                <span>↗</span>
              </a>
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs uppercase tracking-[0.25em] px-6 py-3.5 flex items-center gap-2 border text-white/90"
                style={{ borderColor: "rgba(255,255,255,0.35)", fontFamily: MONO }}
              >
                @oli_czudny
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        className="px-6 md:px-12 py-10 md:py-14 border-b"
        style={{ borderColor: "rgba(255,255,255,0.12)", background: NAVY, color: BG }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="flex md:flex-col gap-4 md:gap-1 items-baseline md:items-start"
            >
              <span
                className="text-3xl md:text-5xl leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 700,
                  color: i === 0 ? ORANGE : BG,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.n}
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.3em] opacity-70"
                style={{ fontFamily: MONO }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-4xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.proj}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05] mb-10"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY, letterSpacing: "-0.03em" }}
          >
            {t.projA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.projHl}
            </span>
          </h2>
          <p
            className="text-base md:text-xl leading-relaxed max-w-2xl"
            style={{ color: NAVY, fontFamily: SANS, fontWeight: 400 }}
          >
            {t.projP}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.tripsLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY, letterSpacing: "-0.03em" }}
          >
            {t.tripsA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.tripsHl}
            </span>
          </h2>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: MUTED, fontFamily: SANS }}
          >
            {t.tripsP}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.trips.map((trip, i) => (
            <TripPoster key={trip.title} trip={trip} index={i} />
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-28 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden shadow-2xl">
              <Image
                src="/projects/samba-trips/photos/photo-2.jpg"
                alt="Surf House Conil — Samba Trips × Entre Olas"
                fill
                sizes="(max-width: 768px) 80vw, 380px"
                className="object-cover"
                quality={85}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-4"
              style={{ color: ORANGE, fontFamily: MONO }}
            >
              {t.bonusLabel}
            </p>
            <h3
              className="text-3xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.025em" }}
            >
              {t.bonusA}
              <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
                {t.bonusHl}
              </span>
            </h3>
            <p
              className="mt-6 max-w-lg text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(238,235,220,0.72)", fontFamily: SANS }}
            >
              {t.bonusP}
            </p>
            <Link
              href="/proyecto/entre-olas-surf"
              data-hover
              className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 rounded-full group"
              style={{ background: ORANGE, color: NAVY, fontFamily: MONO }}
            >
              <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                {t.seeEntreOlas}
              </span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden"
        style={{ background: LAVENDER, color: NAVY }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-12 right-8 w-24 md:w-32 opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <SambaSun color={NAVY} />
        </motion.div>

        <div className="relative max-w-5xl">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-8"
            style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
          >
            {t.creatorLabel}
          </p>
          <h2
            className="text-4xl md:text-7xl leading-[0.95] mb-10"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY, letterSpacing: "-0.03em" }}
          >
            {t.creatorTitleA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.creatorHl}
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0.01, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-[16/7] w-full overflow-hidden mb-12"
            style={{ background: NAVY }}
          >
            <Image
              src="/projects/samba-trips/oli-mood.jpg"
              alt="Travel landscape from Oli Czudny"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              quality={85}
            />
            <span
              className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "white",
                fontFamily: MONO,
                textShadow: "0 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              {t.creatorShot}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-16 items-start">
            <div>
              <p
                className="text-lg md:text-2xl leading-snug"
                style={{ fontFamily: DISPLAY, fontWeight: 400, color: NAVY }}
              >
                {t.creatorQuoteA}
                <span style={{ color: ORANGE, fontStyle: "italic" }}>{t.creatorQuoteHl}</span>
                {t.creatorQuoteB}
              </p>
              <p
                className="mt-8 max-w-lg text-base leading-relaxed"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                {t.creatorBio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 border" style={{ borderColor: NAVY, background: BG }}>
                <p
                  className="text-3xl md:text-5xl leading-none"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    color: ORANGE,
                    letterSpacing: "-0.03em",
                  }}
                >
                  96K
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
                >
                  {t.followers}
                </p>
              </div>
              <div className="p-5 border" style={{ borderColor: NAVY, background: BG }}>
                <p
                  className="text-3xl md:text-5xl leading-none"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: "-0.03em",
                  }}
                >
                  491
                </p>
                <p
                  className="mt-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: NAVY, fontFamily: MONO, opacity: 0.6 }}
                >
                  {t.posts}
                </p>
              </div>
              <a
                href="https://instagram.com/oli_czudny"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="col-span-2 p-5 flex items-center justify-between group"
                style={{ background: NAVY, color: BG }}
              >
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] opacity-60"
                    style={{ fontFamily: MONO }}
                  >
                    Instagram
                  </p>
                  <p
                    className="mt-1 text-xl"
                    style={{ fontFamily: DISPLAY, fontWeight: 600 }}
                  >
                    @oli_czudny
                  </p>
                </div>
                <span
                  className="text-2xl group-hover:translate-x-1 transition-transform"
                  style={{ color: ORANGE }}
                >
                  ↗
                </span>
              </a>
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
          className="mb-10 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.pillarsLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY, letterSpacing: "-0.03em" }}
          >
            {t.pillarsA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.pillarsHl}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={
            {
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            } as Variants
          }
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
        >
          {t.pillars.map((p) => (
            <motion.div
              key={p.n}
              variants={
                {
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                } as Variants
              }
              className="border-t pt-6"
              style={{ borderColor: NAVY }}
            >
              <span
                className="text-xs"
                style={{ color: ORANGE, fontFamily: MONO, fontWeight: 500 }}
              >
                {p.n}
              </span>
              <h4
                className="mt-3 text-xl md:text-2xl leading-tight"
                style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY }}
              >
                {p.title}
              </h4>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: MUTED, fontFamily: SANS }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32" style={{ background: CREAM }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-3xl"
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
            style={{ color: MUTED, fontFamily: MONO }}
          >
            {t.faqLabel}
          </p>
          <h2
            className="text-3xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: DISPLAY, fontWeight: 700, color: NAVY, letterSpacing: "-0.03em" }}
          >
            {t.faqA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.faqHl}
            </span>
          </h2>
        </motion.div>

        <div>
          {t.faq.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-16 md:py-28 border-t"
        style={{ borderColor: LINE }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-20">
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
              {t.ownLabel}
            </p>
            <h3
              className="text-2xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: "-0.025em",
              }}
            >
              {t.ownA}
              <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
                {t.ownHl}
              </span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="space-y-0">
              {t.ownList.map((line, i) => (
                <li
                  key={line}
                  className="flex items-start gap-4 py-3 border-b text-sm md:text-base"
                  style={{ borderColor: LINE }}
                >
                  <span
                    className="text-[10px] mt-1.5 shrink-0"
                    style={{ color: ORANGE, fontFamily: MONO, fontWeight: 500 }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: NAVY, fontFamily: SANS }}>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Webflow",
                "CMS Collections",
                "Stripe Checkout",
                "Calendly",
                "Instagram Embed",
                "Plus Jakarta Sans",
                "Flan Juicebox",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border"
                  style={{ borderColor: NAVY, color: NAVY, fontFamily: MONO }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="px-6 md:px-12 py-28 md:py-48 relative overflow-hidden"
        style={{ background: NAVY, color: BG }}
      >
        <motion.div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: ORANGE, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-4xl md:text-8xl leading-[0.95] md:leading-[0.88] whitespace-pre-line"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              color: BG,
              letterSpacing: "-0.04em",
            }}
          >
            {t.closingA}
            <span style={{ color: ORANGE, fontStyle: "italic", fontWeight: 400 }}>
              {t.closingHl}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(238,235,220,0.72)", fontFamily: SANS }}
          >
            {t.closingP}
          </motion.p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://sambatrips.com"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="group text-xs uppercase tracking-[0.25em] px-6 py-4 rounded-full flex items-center gap-2"
              style={{ background: ORANGE, color: NAVY, fontFamily: MONO, fontWeight: 600 }}
            >
              {t.ctaSee}
              <span>↗</span>
            </a>
            <Link
              href="/proyectos"
              data-hover
              className="text-xs uppercase tracking-[0.25em] hover:opacity-100 transition-opacity"
              style={{ color: "rgba(238,235,220,0.6)", fontFamily: MONO }}
            >
              {t.ctaBack}
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
