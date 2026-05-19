"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en" | "de";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "es", label: "Español", short: "ES" },
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
];

type Dict = {
  nav: {
    home: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    available: string;
    line1: string;
    line2: string;
    line3: string;
    location: string;
    bodyA: string;
    bodyB: string;
    scroll: string;
  };
  projects: {
    label: string;
    title: string;
    titleAccent: string;
    seeAll: string;
    seeOne: string;
  };
  services: {
    label: string;
    title: string;
    list: {
      id: string;
      title: string;
      desc: string;
      includes: string[];
    }[];
  };
  about: {
    label: string;
    headlineA: string;
    headlineB: string;
    headlineC: string;
    headlineD: string;
    body1Strong: string;
    body1: string;
    body2Pre: string;
    body2Mid: string;
    body2Post: string;
    stats: { num: string; label: string }[];
    stack: string;
  };
  testimonials: {
    label: string;
    titleA: string;
    titleB: string;
    titleC: string;
    items: { quote: string; name: string; role: string }[];
  };
  contact: {
    label: string;
    titleA: string;
    titleB: string;
    titleAccent: string;
    body: string;
    follow: string;
  };
  form: {
    intro: string;
    next: string;
    back: string;
    send: string;
    sending: string;
    enterHint: string;
    pickHint: string;
    step: (n: number, total: number) => string;
    steps: {
      name: { q: string; placeholder: string; err: string };
      email: { q: string; placeholder: string; err: string };
      project: { q: string; options: string[] };
      budget: { q: string; sub: string; options: string[] };
      message: { q: string; placeholder: string; optional: string };
    };
    success: {
      title: string;
      body: string;
      again: string;
      open: string;
    };
  };
  footer: {
    rights: string;
    seeProjects: string;
  };
};

const ES: Dict = {
  nav: { home: "Inicio", projects: "Proyectos", contact: "Contacto" },
  hero: {
    badge: "· Felipe Cámara / Portfolio 2026",
    available: "Disponible para proyectos",
    line1: "Desarrollo.",
    line2: "Diseño.",
    line3: "Estrategia",
    location: "Freelance · España",
    bodyA: "No solo diseño, no solo programo, no solo estrategia.",
    bodyB:
      "Las tres cosas: entiendo el negocio, diseño la solución y la construyo.",
    scroll: "Desliza",
  },
  projects: {
    label: "· 02 / Proyectos",
    title: "Últimos",
    titleAccent: ".",
    seeAll: "Ver todos",
    seeOne: "Ver →",
  },
  services: {
    label: "· 03 / Servicios",
    title: "Lo que hago",
    list: [
      {
        id: "01",
        title: "Desarrollo de Software",
        desc: "SaaS, apps web, plataformas, automatizaciones. Código limpio, escalable, con tests.",
        includes: [
          "Arquitectura técnica",
          "Desarrollo full-stack",
          "Base de datos y API",
          "Deploy y mantenimiento",
          "Tests automatizados",
        ],
      },
      {
        id: "02",
        title: "Desarrollo Web",
        desc: "Webs que convierten. Rápidas, responsive, optimizadas para SEO y pensadas para vender.",
        includes: [
          "Diseño UI/UX",
          "Desarrollo responsive",
          "SEO técnico",
          "Optimización de velocidad",
          "Analytics",
        ],
      },
      {
        id: "03",
        title: "Gestión de Redes Sociales",
        desc: "Estrategia, contenido y gestión completa. Para empresas e influencers que quieren crecer de verdad.",
        includes: [
          "Estrategia de contenido",
          "Creación de publicaciones",
          "Gestión de comunidad",
          "Informes mensuales",
          "Crecimiento orgánico",
        ],
      },
      {
        id: "04",
        title: "Consultoría Digital",
        desc: "Te digo lo que necesitas oír, no lo que quieres escuchar. Análisis, plan de acción, ejecución.",
        includes: [
          "Auditoría digital",
          "Plan de acción",
          "Recomendaciones técnicas",
          "Seguimiento",
        ],
      },
    ],
  },
  about: {
    label: "· 04 / Sobre mí",
    headlineA: "Soy Felipe.",
    headlineB: "Desarrollo software,",
    headlineC: "diseño webs y",
    headlineD: "gestiono redes sociales",
    body1Strong:
      "Mi diferencial es que no solo hago una cosa.",
    body1:
      "Entiendo el negocio, diseño la solución y la construyo. Sin intermediarios, sin teléfono roto, sin excusas.",
    body2Pre: "Fundé ",
    body2Mid: "Kujme",
    body2Post:
      ", un SaaS de email marketing con IA. Gestiono marcas en redes sociales. Y estoy construyendo en público todo lo que hago.",
    stats: [
      { num: "150+", label: "Proyectos entregados" },
      { num: "100+", label: "Clientes" },
      { num: "5", label: "Años en esto" },
      { num: "∞", label: "Cafés" },
    ],
    stack: "Stack principal",
  },
  testimonials: {
    label: "· 05 / Lo que dicen",
    titleA: "Palabra de",
    titleB: "quien lo",
    titleC: "usa",
    items: [
      {
        quote:
          "Felipe no solo ejecuta, entiende lo que necesitas antes de que tú mismo lo sepas. El mejor profesional con el que he trabajado.",
        name: "Víctor Bueno Ureña",
        role: "Fundador · Waya Surf · Gran Canaria",
      },
      {
        quote:
          "La diferencia de trabajar con alguien que programa, diseña y entiende de negocio es brutal. Todo encaja.",
        name: "Próximo testimonio",
        role: "¿Serás tú?",
      },
    ],
  },
  contact: {
    label: "· 06 / Contacto",
    titleA: "¿Tienes un",
    titleB: "proyecto?",
    titleAccent: "Hablemos.",
    body:
      "Respuesta en menos de 24h. Cuéntame qué necesitas y te digo si soy la persona indicada — o te mando a alguien que sí.",
    follow: "Sígueme",
  },
  form: {
    intro: "Cuéntamelo en 1 minuto",
    next: "Siguiente",
    back: "Atrás",
    send: "Enviar",
    sending: "Abriendo email…",
    enterHint: "pulsa Enter ↵",
    pickHint: "elige una opción",
    step: (n, total) => `Paso ${n} de ${total}`,
    steps: {
      name: {
        q: "¿Cómo te llamas?",
        placeholder: "Tu nombre",
        err: "Necesito al menos 2 letras",
      },
      email: {
        q: "¿Tu email?",
        placeholder: "tu@email.com",
        err: "Ese email no me cuadra",
      },
      project: {
        q: "¿De qué va el proyecto?",
        options: [
          "Desarrollo web",
          "Software a medida (SaaS, app)",
          "Redes sociales",
          "Consultoría",
          "Otro",
        ],
      },
      budget: {
        q: "¿Presupuesto aproximado?",
        sub: "Sé honesto, así te digo si puedo ayudarte de verdad.",
        options: [
          "Menos de 1.000€",
          "1.000€ – 3.000€",
          "3.000€ – 6.000€",
          "6.000€ – 12.000€",
          "Más de 12.000€",
          "Aún no lo sé",
        ],
      },
      message: {
        q: "Cuéntame más",
        placeholder: "Plazos, objetivos, contexto… lo que se te ocurra.",
        optional: "opcional",
      },
    },
    success: {
      title: "Listo. Mensaje preparado.",
      body: "He abierto tu cliente de email con todo rellenado. Solo te falta darle a enviar.",
      again: "Enviar otro",
      open: "Abrir email otra vez",
    },
  },
  footer: {
    rights: "© 2026 Felipe Cámara — Todos los derechos reservados",
    seeProjects: "Ver proyectos →",
  },
};

const EN: Dict = {
  nav: { home: "Home", projects: "Work", contact: "Contact" },
  hero: {
    badge: "· Felipe Cámara / Portfolio 2026",
    available: "Available for projects",
    line1: "Development.",
    line2: "Design.",
    line3: "Strategy",
    location: "Freelance · Spain",
    bodyA: "Not just design, not just code, not just strategy.",
    bodyB:
      "All three: I understand the business, design the solution and build it.",
    scroll: "Scroll",
  },
  projects: {
    label: "· 02 / Work",
    title: "Latest",
    titleAccent: ".",
    seeAll: "View all",
    seeOne: "View →",
  },
  services: {
    label: "· 03 / Services",
    title: "What I do",
    list: [
      {
        id: "01",
        title: "Software Development",
        desc: "SaaS, web apps, platforms, automations. Clean, scalable code with tests.",
        includes: [
          "Technical architecture",
          "Full-stack development",
          "Database & API",
          "Deploy & maintenance",
          "Automated testing",
        ],
      },
      {
        id: "02",
        title: "Web Development",
        desc: "Websites that convert. Fast, responsive, SEO-optimized and built to sell.",
        includes: [
          "UI/UX design",
          "Responsive development",
          "Technical SEO",
          "Speed optimization",
          "Analytics",
        ],
      },
      {
        id: "03",
        title: "Social Media Management",
        desc: "Strategy, content and full management. For brands and creators who want to actually grow.",
        includes: [
          "Content strategy",
          "Post creation",
          "Community management",
          "Monthly reports",
          "Organic growth",
        ],
      },
      {
        id: "04",
        title: "Digital Consulting",
        desc: "I tell you what you need to hear, not what you want to hear. Analysis, plan, execution.",
        includes: [
          "Digital audit",
          "Action plan",
          "Technical recommendations",
          "Follow-up",
        ],
      },
    ],
  },
  about: {
    label: "· 04 / About",
    headlineA: "I'm Felipe.",
    headlineB: "I build software,",
    headlineC: "design websites and",
    headlineD: "run social media",
    body1Strong: "My edge is I don't just do one thing.",
    body1:
      "I understand the business, design the solution and build it. No middlemen, no broken phone, no excuses.",
    body2Pre: "I founded ",
    body2Mid: "Kujme",
    body2Post:
      ", an AI email marketing SaaS. I manage brands on social media. And I'm building everything in public.",
    stats: [
      { num: "150+", label: "Projects shipped" },
      { num: "100+", label: "Clients" },
      { num: "5", label: "Years doing this" },
      { num: "∞", label: "Coffees" },
    ],
    stack: "Core stack",
  },
  testimonials: {
    label: "· 05 / What they say",
    titleA: "Words from",
    titleB: "those who",
    titleC: "use it",
    items: [
      {
        quote:
          "Felipe doesn't just execute — he understands what you need before you do. The best professional I've ever worked with.",
        name: "Víctor Bueno Ureña",
        role: "Founder · Waya Surf · Gran Canaria",
      },
      {
        quote:
          "Working with someone who codes, designs and gets business is a different league. Everything fits.",
        name: "Next testimonial",
        role: "Will it be you?",
      },
    ],
  },
  contact: {
    label: "· 06 / Contact",
    titleA: "Got a",
    titleB: "project?",
    titleAccent: "Let's talk.",
    body:
      "Reply in under 24h. Tell me what you need and I'll say if I'm the right person — or send you to someone who is.",
    follow: "Follow me",
  },
  form: {
    intro: "Tell me in 1 minute",
    next: "Next",
    back: "Back",
    send: "Send",
    sending: "Opening email…",
    enterHint: "press Enter ↵",
    pickHint: "pick one",
    step: (n, total) => `Step ${n} of ${total}`,
    steps: {
      name: {
        q: "What's your name?",
        placeholder: "Your name",
        err: "At least 2 letters please",
      },
      email: {
        q: "Your email?",
        placeholder: "you@email.com",
        err: "That email doesn't look right",
      },
      project: {
        q: "What kind of project?",
        options: [
          "Web development",
          "Custom software (SaaS, app)",
          "Social media",
          "Consulting",
          "Other",
        ],
      },
      budget: {
        q: "Rough budget?",
        sub: "Be honest — that way I can tell you if I can actually help.",
        options: [
          "Under €1,000",
          "€1,000 – €3,000",
          "€3,000 – €6,000",
          "€6,000 – €12,000",
          "Over €12,000",
          "Not sure yet",
        ],
      },
      message: {
        q: "Tell me more",
        placeholder: "Timelines, goals, context… whatever you want.",
        optional: "optional",
      },
    },
    success: {
      title: "Done. Message ready.",
      body: "I opened your email client with everything filled in. Just hit send.",
      again: "Send another",
      open: "Open email again",
    },
  },
  footer: {
    rights: "© 2026 Felipe Cámara — All rights reserved",
    seeProjects: "View projects →",
  },
};

const DE: Dict = {
  nav: { home: "Start", projects: "Projekte", contact: "Kontakt" },
  hero: {
    badge: "· Felipe Cámara / Portfolio 2026",
    available: "Verfügbar für Projekte",
    line1: "Entwicklung.",
    line2: "Design.",
    line3: "Strategie",
    location: "Freelance · Spanien",
    bodyA: "Nicht nur Design, nicht nur Code, nicht nur Strategie.",
    bodyB:
      "Alle drei: Ich verstehe das Geschäft, entwerfe die Lösung und baue sie.",
    scroll: "Scrollen",
  },
  projects: {
    label: "· 02 / Projekte",
    title: "Aktuelles",
    titleAccent: ".",
    seeAll: "Alle ansehen",
    seeOne: "Ansehen →",
  },
  services: {
    label: "· 03 / Leistungen",
    title: "Was ich mache",
    list: [
      {
        id: "01",
        title: "Software-Entwicklung",
        desc: "SaaS, Web-Apps, Plattformen, Automatisierungen. Sauberer, skalierbarer Code mit Tests.",
        includes: [
          "Technische Architektur",
          "Full-Stack-Entwicklung",
          "Datenbank & API",
          "Deploy & Wartung",
          "Automatisierte Tests",
        ],
      },
      {
        id: "02",
        title: "Web-Entwicklung",
        desc: "Websites, die konvertieren. Schnell, responsiv, SEO-optimiert und zum Verkaufen gebaut.",
        includes: [
          "UI/UX-Design",
          "Responsive Entwicklung",
          "Technisches SEO",
          "Geschwindigkeitsoptimierung",
          "Analytics",
        ],
      },
      {
        id: "03",
        title: "Social-Media-Management",
        desc: "Strategie, Content und komplettes Management. Für Marken und Creator, die wirklich wachsen wollen.",
        includes: [
          "Content-Strategie",
          "Erstellung von Posts",
          "Community-Management",
          "Monatliche Reports",
          "Organisches Wachstum",
        ],
      },
      {
        id: "04",
        title: "Digital-Beratung",
        desc: "Ich sage dir, was du hören musst, nicht was du hören willst. Analyse, Plan, Umsetzung.",
        includes: [
          "Digital-Audit",
          "Aktionsplan",
          "Technische Empfehlungen",
          "Follow-up",
        ],
      },
    ],
  },
  about: {
    label: "· 04 / Über mich",
    headlineA: "Ich bin Felipe.",
    headlineB: "Ich entwickle Software,",
    headlineC: "gestalte Websites und",
    headlineD: "manage Social Media",
    body1Strong: "Mein Unterschied: Ich mache nicht nur eine Sache.",
    body1:
      "Ich verstehe das Geschäft, entwerfe die Lösung und baue sie. Keine Mittelsmänner, keine stille Post, keine Ausreden.",
    body2Pre: "Ich habe ",
    body2Mid: "Kujme",
    body2Post:
      " gegründet — ein KI-E-Mail-Marketing-SaaS. Ich manage Marken in Social Media. Und ich baue alles öffentlich auf.",
    stats: [
      { num: "150+", label: "Gelieferte Projekte" },
      { num: "100+", label: "Kunden" },
      { num: "5", label: "Jahre dabei" },
      { num: "∞", label: "Kaffees" },
    ],
    stack: "Haupt-Stack",
  },
  testimonials: {
    label: "· 05 / Stimmen",
    titleA: "Worte von",
    titleB: "denen, die es",
    titleC: "nutzen",
    items: [
      {
        quote:
          "Felipe führt nicht nur aus — er versteht, was du brauchst, bevor du es selbst weißt. Der beste Profi, mit dem ich je gearbeitet habe.",
        name: "Víctor Bueno Ureña",
        role: "Gründer · Waya Surf · Gran Canaria",
      },
      {
        quote:
          "Mit jemandem zu arbeiten, der programmiert, gestaltet und Geschäft versteht, ist eine andere Liga. Alles passt.",
        name: "Nächste Stimme",
        role: "Wirst du es sein?",
      },
    ],
  },
  contact: {
    label: "· 06 / Kontakt",
    titleA: "Hast du ein",
    titleB: "Projekt?",
    titleAccent: "Sprechen wir.",
    body:
      "Antwort in unter 24h. Erzähl mir, was du brauchst — ich sage dir, ob ich die richtige Person bin oder leite dich an jemanden weiter.",
    follow: "Folge mir",
  },
  form: {
    intro: "Erzähl es mir in 1 Minute",
    next: "Weiter",
    back: "Zurück",
    send: "Senden",
    sending: "E-Mail öffnen…",
    enterHint: "Enter drücken ↵",
    pickHint: "wähle eine Option",
    step: (n, total) => `Schritt ${n} von ${total}`,
    steps: {
      name: {
        q: "Wie heißt du?",
        placeholder: "Dein Name",
        err: "Mindestens 2 Buchstaben",
      },
      email: {
        q: "Deine E-Mail?",
        placeholder: "du@email.com",
        err: "Diese E-Mail sieht falsch aus",
      },
      project: {
        q: "Was für ein Projekt?",
        options: [
          "Web-Entwicklung",
          "Maßgeschneiderte Software (SaaS, App)",
          "Social Media",
          "Beratung",
          "Anderes",
        ],
      },
      budget: {
        q: "Ungefähres Budget?",
        sub: "Sei ehrlich — so kann ich dir sagen, ob ich wirklich helfen kann.",
        options: [
          "Unter 1.000 €",
          "1.000 € – 3.000 €",
          "3.000 € – 6.000 €",
          "6.000 € – 12.000 €",
          "Über 12.000 €",
          "Weiß noch nicht",
        ],
      },
      message: {
        q: "Erzähl mir mehr",
        placeholder: "Zeitrahmen, Ziele, Kontext… was immer du willst.",
        optional: "optional",
      },
    },
    success: {
      title: "Fertig. Nachricht bereit.",
      body: "Ich habe dein E-Mail-Programm mit allem vorausgefüllt geöffnet. Nur noch senden.",
      again: "Eine weitere senden",
      open: "E-Mail wieder öffnen",
    },
  },
  footer: {
    rights: "© 2026 Felipe Cámara — Alle Rechte vorbehalten",
    seeProjects: "Projekte ansehen →",
  },
};

const DICTS: Record<Lang, Dict> = { es: ES, en: EN, de: DE };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lang") as Lang | null;
      if (saved && (saved === "es" || saved === "en" || saved === "de")) {
        setLangState(saved);
        document.documentElement.lang = saved;
        return;
      }
      const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
      const guess: Lang =
        nav === "en" ? "en" : nav === "de" ? "de" : "es";
      setLangState(guess);
      document.documentElement.lang = guess;
    } catch {
      /* noop */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    } catch {
      /* noop */
    }
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) {
    throw new Error("useLang must be used inside LanguageProvider");
  }
  return ctx;
}
