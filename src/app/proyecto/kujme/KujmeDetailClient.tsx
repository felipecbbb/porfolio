"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, type Lang } from "@/lib/i18n";
import BlendNav from "@/components/BlendNav";

/* ── Brand tokens REALES (de la memoria del proyecto SAVANNA) ── */
const CREAM = "#f0ebe3";
const PAPER = "#faf7f2";
const INK = "#1a1a2e";
const INK_SOFT = "#2a2a3e";
const DASHED = "#c4b8a8";
const STAMP_RED = "#a62a1a";
const MUTED = "#7a7363";

const EASE = [0.22, 1, 0.36, 1] as const;

const SANS = "var(--font-inter), system-ui, sans-serif";
const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

type AgentRow = {
  n: string;
  name: string;
  model: string;
  cron: string;
  role: string;
};

type Copy = {
  badge: string;
  back: string;
  manifestoLabel: string;
  manifestoN: string;
  trackingLabel: string;
  trackingId: string;
  hero1: string;
  hero2: string;
  heroP: string;
  bigStat: string;
  bigLabel: string;
  marquee: string[];
  challengeLabel: string;
  challengeTitle: string;
  challengeBody: string;
  challengePoints: { num: string; label: string; cost: string }[];
  solutionLabel: string;
  solutionTitle: string;
  solutionBody: string;
  agentsLabel: string;
  agentsTitle: string;
  agentsBody: string;
  agentsHeaders: { n: string; agent: string; model: string; cron: string; role: string };
  agents: AgentRow[];
  flowLabel: string;
  flowTitle: string;
  flow: { time: string; event: string }[];
  stackLabel: string;
  stackTitle: string;
  apis: { name: string; purpose: string }[];
  costLabel: string;
  costTitle: string;
  costLines: { item: string; amount: string }[];
  costTotal: string;
  closingTitle: string;
  closingP: string;
  visit: string;
  cta: string;
  footerNote: string;
};

const T: Record<Lang, Copy> = {
  es: {
    badge: "Producto propio · 12 agentes IA",
    back: "Volver a proyectos",
    manifestoLabel: "Manifiesto Nº",
    manifestoN: "12—AGENTES—IA",
    trackingLabel: "Tracking",
    trackingId: "KJ-2026-0001-AG",
    hero1: "kujme",
    hero2: "agents",
    heroP:
      "Doce agentes IA jerárquicos que generan, publican y miden contenido todos los días sin tocar nada. Blog SEO, posts LinkedIn (Felipe + empresa), emails de conversión, análisis de competencia, sugerencias de comentarios y auditoría automática de calidad. Operativo 24/7. Coste real verificado.",
    bigStat: "6$",
    bigLabel: "al mes de coste operativo · 12 agentes · 7 APIs · sin equipo humano",
    marquee: [
      "DIRECTOR",
      "·",
      "NOTICIERO",
      "·",
      "INVESTIGADOR",
      "·",
      "REDACTOR",
      "·",
      "PUBLICADOR",
      "·",
      "CAZADOR",
      "·",
      "NURTURE",
      "·",
      "COMENTARISTA",
      "·",
      "AUDITOR SEO",
      "·",
      "ANALISTA",
      "·",
      "PRODUCT SCOUT",
      "·",
      "VIGILANTE",
      "·",
    ],
    challengeLabel: "01 · El reto",
    challengeTitle: "Un equipo de marketing cuesta entre 3.000 y 8.000 € al mes.",
    challengeBody:
      "Community manager, redactor SEO, alguien que mida, alguien que coordine. Y aun así muchos días no se publica nada — alguien está de vacaciones, de baja o sin tiempo. Las herramientas tipo Buffer programan pero no generan. ChatGPT genera pero no publica ni mantiene coherencia. Faltaba un sistema que orquestara IAs de verdad.",
    challengePoints: [
      { num: "01", label: "Community manager", cost: "1.500 — 2.500 €/mes" },
      { num: "02", label: "Redactor SEO", cost: "1.200 — 2.000 €/mes" },
      { num: "03", label: "Analítica & reporting", cost: "800 — 1.500 €/mes" },
      { num: "04", label: "Coordinación y dirección", cost: "1.000 — 2.000 €/mes" },
    ],
    solutionLabel: "02 · La solución",
    solutionTitle: "Doce agentes con jerarquía, cron y memoria.",
    solutionBody:
      "Cada agente tiene su rol, su modelo IA óptimo (Claude para estrategia, GPT-4o-mini para producción, Gemini Flash para emails), su frecuencia de cron y su nivel de autonomía. El Director planifica cada mañana basándose en métricas reales (GA4, Search Console) y noticias frescas (8 feeds RSS). El Redactor genera. El Auditor SEO revisa y corrige con Claude si baja de 85. El Publicador publica donde toque. El Vigilante reinicia agentes caídos. Todo orquestado por un dashboard React con barra de comandos en lenguaje natural.",
    agentsLabel: "03 · El equipo",
    agentsTitle: "Los doce agentes, en una tabla.",
    agentsBody:
      "Jerarquía piramidal: Estrategia (1) → Inteligencia (2) → Producción (5) → Calidad (3) → Infraestructura (1). Cada uno con su modelo, su cron y su misión.",
    agentsHeaders: {
      n: "Nº",
      agent: "Agente",
      model: "Modelo",
      cron: "Cron",
      role: "Misión",
    },
    agents: [
      { n: "01", name: "Director", model: "Claude Sonnet", cron: "06:30 diario", role: "Planifica el día, lee métricas + noticias, delega briefings" },
      { n: "02", name: "Noticiero", model: "GPT-4o-mini", cron: "06:00 diario", role: "8 feeds RSS reales (Google News, HubSpot, Product Hunt)" },
      { n: "03", name: "Investigador", model: "GPT-4o-mini", cron: "Lunes 07:00", role: "Tendencias del sector con datos verificados" },
      { n: "04", name: "Redactor", model: "GPT-4o + Gemini", cron: "07:00 diario", role: "Blog SEO, LinkedIn Felipe + Kujme, emails newsletter" },
      { n: "05", name: "Publicador", model: "—", cron: "Cada 30 min", role: "Publica contenido programado (Blog, LinkedIn API, Brevo)" },
      { n: "06", name: "Cazador", model: "GPT-4o-mini", cron: "08:00 + 20:00", role: "Oportunidades comerciales 2 veces al día" },
      { n: "07", name: "Nurture", model: "Gemini Flash", cron: "Miércoles 09:00", role: "Emails de conversión Free → Pago" },
      { n: "08", name: "Comentarista", model: "GPT-4o-mini", cron: "07:30 L-V", role: "5 sugerencias diarias con link directo a LinkedIn" },
      { n: "09", name: "Auditor SEO", model: "GPT + Claude", cron: "08:00 diario", role: "Audita blog+email, corrige hasta 3 intentos si <85" },
      { n: "10", name: "Analista", model: "GPT-4o-mini", cron: "Domingo 10:00", role: "Reportes con GA4 + Search Console reales" },
      { n: "11", name: "Product Scout", model: "GPT-4o-mini", cron: "Jueves 07:00", role: "Analiza Mailchimp, Brevo, MailerLite, Resend" },
      { n: "12", name: "Vigilante", model: "—", cron: "Cada 15 min", role: "10 patrones de error, reactiva agentes caídos" },
    ],
    flowLabel: "04 · Un día cualquiera",
    flowTitle: "El flujo diario, hora a hora.",
    flow: [
      { time: "06:00", event: "Noticiero · descarga noticias reales de 8 feeds RSS" },
      { time: "06:30", event: "Director · planifica el día con métricas + noticias" },
      { time: "07:00", event: "Redactor · genera blog, posts LinkedIn y emails" },
      { time: "07:30", event: "Comentarista · 5 sugerencias de comentarios LinkedIn" },
      { time: "08:00", event: "Auditor SEO · revisa y corrige hasta umbral 85" },
      { time: "08:15", event: "Felipe abre dashboard · aprueba en 5 min" },
      { time: "09:00", event: "LinkedIn Felipe · post se publica vía API" },
      { time: "10:00", event: "Email newsletter · envío vía Brevo" },
      { time: "12:00", event: "Blog · artículo SEO publicado en kujme.es/blog" },
      { time: "20:00", event: "Cazador · segunda ronda de oportunidades" },
      { time: "22:00", event: "Vigilante · check final del día, todo OK" },
    ],
    stackLabel: "05 · El stack",
    stackTitle: "Siete APIs orquestadas, una sola SQLite.",
    apis: [
      { name: "OpenAI GPT-4o-mini", purpose: "8 agentes operativos" },
      { name: "Claude Sonnet", purpose: "Director + correcciones SEO" },
      { name: "Gemini 2.5 Flash", purpose: "Emails (Redactor + Nurture)" },
      { name: "Google News RSS", purpose: "Noticiero — 8 feeds reales" },
      { name: "LinkedIn API", purpose: "Posts Felipe (empresa pendiente scope)" },
      { name: "Brevo API", purpose: "Envío de emails newsletter" },
      { name: "GA4 + Search Console", purpose: "Tráfico web + posiciones reales" },
    ],
    costLabel: "06 · El coste",
    costTitle: "Seis dólares al mes. Punto.",
    costLines: [
      { item: "Claude Sonnet · Director + correcciones SEO", amount: "$3" },
      { item: "OpenAI GPT-4o-mini · 9 agentes operativos", amount: "$3" },
      { item: "Gemini 2.5 Flash · emails Redactor + Nurture", amount: "Gratis" },
      { item: "LinkedIn API · publicación de posts", amount: "Gratis" },
      { item: "RSS · 8 feeds Google News", amount: "Gratis" },
      { item: "GA4 + Search Console · métricas reales", amount: "Gratis" },
      { item: "VPS Hostinger KVM · hosting dashboard + cron", amount: "$6" },
    ],
    costTotal: "$12 / mes operativo total · sustituye un equipo de 5.000€",
    closingTitle: "Un equipo entero. Por menos que una cena.",
    closingP:
      "Kujme empezó como herramienta de email marketing tradicional. Cuando entendí que la IA podía orquestar el equipo entero — no solo redactar — pivoté hacia el sistema actual. El producto sigue vivo, gestionando el contenido de mis propios canales y los del cliente fundador. Coste y resultados verificables.",
    visit: "Visita kujme.es",
    cta: "Ver más proyectos",
    footerNote: "Felipe Cámara · Diseño, desarrollo y orquestación IA",
  },
  en: {
    badge: "Own product · 12 AI agents",
    back: "Back to projects",
    manifestoLabel: "Manifest Nº",
    manifestoN: "12—AI—AGENTS",
    trackingLabel: "Tracking",
    trackingId: "KJ-2026-0001-AG",
    hero1: "kujme",
    hero2: "agents",
    heroP:
      "Twelve hierarchical AI agents that generate, publish and measure content every day, hands-off. SEO blog, LinkedIn posts (Felipe + company), conversion emails, competitor analysis, comment suggestions and automatic quality audit. Running 24/7. Verified real cost.",
    bigStat: "$6",
    bigLabel: "monthly operating cost · 12 agents · 7 APIs · no human team",
    marquee: [
      "DIRECTOR",
      "·",
      "NEWS",
      "·",
      "RESEARCHER",
      "·",
      "WRITER",
      "·",
      "PUBLISHER",
      "·",
      "HUNTER",
      "·",
      "NURTURE",
      "·",
      "COMMENTER",
      "·",
      "SEO AUDITOR",
      "·",
      "ANALYST",
      "·",
      "PRODUCT SCOUT",
      "·",
      "WATCHDOG",
      "·",
    ],
    challengeLabel: "01 · The brief",
    challengeTitle: "A marketing team costs between €3,000 and €8,000 a month.",
    challengeBody:
      "Community manager, SEO writer, someone to measure, someone to coordinate. And still many days nothing gets published — someone's on holiday, on leave or out of time. Tools like Buffer schedule but don't generate. ChatGPT generates but doesn't publish or maintain coherence. A system was needed to orchestrate AIs for real.",
    challengePoints: [
      { num: "01", label: "Community manager", cost: "€1,500 — 2,500/mo" },
      { num: "02", label: "SEO writer", cost: "€1,200 — 2,000/mo" },
      { num: "03", label: "Analytics & reporting", cost: "€800 — 1,500/mo" },
      { num: "04", label: "Coordination & direction", cost: "€1,000 — 2,000/mo" },
    ],
    solutionLabel: "02 · The build",
    solutionTitle: "Twelve agents with hierarchy, cron and memory.",
    solutionBody:
      "Each agent has its role, its optimal AI model (Claude for strategy, GPT-4o-mini for production, Gemini Flash for emails), its cron frequency and its autonomy level. The Director plans each morning based on real metrics (GA4, Search Console) and fresh news (8 RSS feeds). The Writer generates. The SEO Auditor reviews and corrects with Claude if score drops below 85. The Publisher publishes wherever it belongs. The Watchdog restarts dead agents. All orchestrated by a React dashboard with a natural-language command bar.",
    agentsLabel: "03 · The team",
    agentsTitle: "The twelve agents, in one table.",
    agentsBody:
      "Pyramidal hierarchy: Strategy (1) → Intelligence (2) → Production (5) → Quality (3) → Infrastructure (1). Each with its model, its cron and its mission.",
    agentsHeaders: {
      n: "Nº",
      agent: "Agent",
      model: "Model",
      cron: "Cron",
      role: "Mission",
    },
    agents: [
      { n: "01", name: "Director", model: "Claude Sonnet", cron: "06:30 daily", role: "Plans the day, reads metrics + news, delegates briefings" },
      { n: "02", name: "News", model: "GPT-4o-mini", cron: "06:00 daily", role: "8 real RSS feeds (Google News, HubSpot, Product Hunt)" },
      { n: "03", name: "Researcher", model: "GPT-4o-mini", cron: "Mon 07:00", role: "Industry trends with verified data" },
      { n: "04", name: "Writer", model: "GPT-4o + Gemini", cron: "07:00 daily", role: "SEO blog, LinkedIn Felipe + Kujme, newsletter emails" },
      { n: "05", name: "Publisher", model: "—", cron: "Every 30 min", role: "Publishes scheduled content (Blog, LinkedIn API, Brevo)" },
      { n: "06", name: "Hunter", model: "GPT-4o-mini", cron: "08:00 + 20:00", role: "Commercial opportunities twice a day" },
      { n: "07", name: "Nurture", model: "Gemini Flash", cron: "Wed 09:00", role: "Conversion emails Free → Paid" },
      { n: "08", name: "Commenter", model: "GPT-4o-mini", cron: "07:30 Mon-Fri", role: "5 daily LinkedIn comment suggestions with direct link" },
      { n: "09", name: "SEO Auditor", model: "GPT + Claude", cron: "08:00 daily", role: "Audits blog+email, corrects up to 3 attempts if <85" },
      { n: "10", name: "Analyst", model: "GPT-4o-mini", cron: "Sun 10:00", role: "Reports with real GA4 + Search Console data" },
      { n: "11", name: "Product Scout", model: "GPT-4o-mini", cron: "Thu 07:00", role: "Analyzes Mailchimp, Brevo, MailerLite, Resend" },
      { n: "12", name: "Watchdog", model: "—", cron: "Every 15 min", role: "10 error patterns, restarts dead agents" },
    ],
    flowLabel: "04 · A regular day",
    flowTitle: "The daily flow, hour by hour.",
    flow: [
      { time: "06:00", event: "News · downloads real news from 8 RSS feeds" },
      { time: "06:30", event: "Director · plans the day with metrics + news" },
      { time: "07:00", event: "Writer · generates blog, LinkedIn posts and emails" },
      { time: "07:30", event: "Commenter · 5 LinkedIn comment suggestions" },
      { time: "08:00", event: "SEO Auditor · reviews and corrects until threshold 85" },
      { time: "08:15", event: "Felipe opens dashboard · approves in 5 min" },
      { time: "09:00", event: "LinkedIn Felipe · post published via API" },
      { time: "10:00", event: "Newsletter email · sent via Brevo" },
      { time: "12:00", event: "Blog · SEO article published at kujme.es/blog" },
      { time: "20:00", event: "Hunter · second round of opportunities" },
      { time: "22:00", event: "Watchdog · final check of the day, all OK" },
    ],
    stackLabel: "05 · The stack",
    stackTitle: "Seven APIs orchestrated, one SQLite.",
    apis: [
      { name: "OpenAI GPT-4o-mini", purpose: "8 operational agents" },
      { name: "Claude Sonnet", purpose: "Director + SEO corrections" },
      { name: "Gemini 2.5 Flash", purpose: "Emails (Writer + Nurture)" },
      { name: "Google News RSS", purpose: "News — 8 real feeds" },
      { name: "LinkedIn API", purpose: "Felipe posts (company pending scope)" },
      { name: "Brevo API", purpose: "Newsletter email sending" },
      { name: "GA4 + Search Console", purpose: "Real web traffic + positions" },
    ],
    costLabel: "06 · The cost",
    costTitle: "Six dollars a month. That's it.",
    costLines: [
      { item: "Claude Sonnet · Director + SEO corrections", amount: "$3" },
      { item: "OpenAI GPT-4o-mini · 9 operational agents", amount: "$3" },
      { item: "Gemini 2.5 Flash · Writer + Nurture emails", amount: "Free" },
      { item: "LinkedIn API · post publishing", amount: "Free" },
      { item: "RSS · 8 Google News feeds", amount: "Free" },
      { item: "GA4 + Search Console · real metrics", amount: "Free" },
      { item: "Hostinger VPS KVM · dashboard + cron hosting", amount: "$6" },
    ],
    costTotal: "$12/month total operating cost · replaces a €5,000 team",
    closingTitle: "A whole team. For less than a dinner.",
    closingP:
      "Kujme started as a traditional email marketing tool. When I realized AI could orchestrate the entire team — not just write — I pivoted to the current system. The product is alive, managing my own channels and the founding client's content. Cost and results verifiable.",
    visit: "Visit kujme.es",
    cta: "See more projects",
    footerNote: "Felipe Cámara · Design, development & AI orchestration",
  },
  de: {
    badge: "Eigenes Produkt · 12 KI-Agenten",
    back: "Zurück zu Projekten",
    manifestoLabel: "Manifest Nº",
    manifestoN: "12—KI—AGENTEN",
    trackingLabel: "Tracking",
    trackingId: "KJ-2026-0001-AG",
    hero1: "kujme",
    hero2: "agents",
    heroP:
      "Zwölf hierarchische KI-Agenten, die täglich Inhalte erstellen, veröffentlichen und messen — komplett automatisch. SEO-Blog, LinkedIn-Posts (Felipe + Firma), Konversions-Emails, Wettbewerbsanalyse, Kommentar-Vorschläge und automatische Qualitätsprüfung. 24/7 in Betrieb. Verifizierte reale Kosten.",
    bigStat: "6$",
    bigLabel: "monatliche Betriebskosten · 12 Agenten · 7 APIs · ohne menschliches Team",
    marquee: [
      "DIREKTOR",
      "·",
      "NACHRICHTEN",
      "·",
      "FORSCHER",
      "·",
      "REDAKTEUR",
      "·",
      "PUBLISHER",
      "·",
      "JÄGER",
      "·",
      "NURTURE",
      "·",
      "KOMMENTATOR",
      "·",
      "SEO-AUDITOR",
      "·",
      "ANALYST",
      "·",
      "PRODUCT SCOUT",
      "·",
      "WACHHUND",
      "·",
    ],
    challengeLabel: "01 · Die Aufgabe",
    challengeTitle: "Ein Marketing-Team kostet zwischen 3.000 und 8.000 € pro Monat.",
    challengeBody:
      "Community Manager, SEO-Redakteur, jemand zur Messung, jemand zur Koordination. Und an vielen Tagen wird trotzdem nichts veröffentlicht — jemand ist im Urlaub, krank oder hat keine Zeit. Tools wie Buffer planen, generieren aber nicht. ChatGPT generiert, veröffentlicht aber nicht und hält keine Kohärenz. Es brauchte ein System, das KIs wirklich orchestriert.",
    challengePoints: [
      { num: "01", label: "Community Manager", cost: "1.500 — 2.500 €/Monat" },
      { num: "02", label: "SEO-Redakteur", cost: "1.200 — 2.000 €/Monat" },
      { num: "03", label: "Analytics & Reporting", cost: "800 — 1.500 €/Monat" },
      { num: "04", label: "Koordination & Leitung", cost: "1.000 — 2.000 €/Monat" },
    ],
    solutionLabel: "02 · Die Umsetzung",
    solutionTitle: "Zwölf Agenten mit Hierarchie, Cron und Gedächtnis.",
    solutionBody:
      "Jeder Agent hat seine Rolle, sein optimales KI-Modell (Claude für Strategie, GPT-4o-mini für Produktion, Gemini Flash für Emails), seine Cron-Frequenz und seinen Autonomie-Grad. Der Direktor plant jeden Morgen basierend auf echten Metriken (GA4, Search Console) und frischen News (8 RSS-Feeds). Der Redakteur generiert. Der SEO-Auditor prüft und korrigiert mit Claude, wenn unter 85. Der Publisher veröffentlicht. Der Wachhund startet tote Agenten neu. Alles orchestriert von einem React-Dashboard mit natürlichsprachiger Kommando-Leiste.",
    agentsLabel: "03 · Das Team",
    agentsTitle: "Die zwölf Agenten, in einer Tabelle.",
    agentsBody:
      "Pyramidenhierarchie: Strategie (1) → Intelligenz (2) → Produktion (5) → Qualität (3) → Infrastruktur (1). Jeder mit Modell, Cron und Mission.",
    agentsHeaders: {
      n: "Nº",
      agent: "Agent",
      model: "Modell",
      cron: "Cron",
      role: "Mission",
    },
    agents: [
      { n: "01", name: "Direktor", model: "Claude Sonnet", cron: "06:30 täglich", role: "Plant den Tag, liest Metriken + News, delegiert Briefings" },
      { n: "02", name: "Nachrichten", model: "GPT-4o-mini", cron: "06:00 täglich", role: "8 echte RSS-Feeds (Google News, HubSpot, Product Hunt)" },
      { n: "03", name: "Forscher", model: "GPT-4o-mini", cron: "Mo 07:00", role: "Branchentrends mit verifizierten Daten" },
      { n: "04", name: "Redakteur", model: "GPT-4o + Gemini", cron: "07:00 täglich", role: "SEO-Blog, LinkedIn Felipe + Kujme, Newsletter-Emails" },
      { n: "05", name: "Publisher", model: "—", cron: "Alle 30 Min", role: "Veröffentlicht geplanten Inhalt (Blog, LinkedIn, Brevo)" },
      { n: "06", name: "Jäger", model: "GPT-4o-mini", cron: "08:00 + 20:00", role: "Kommerzielle Chancen zweimal täglich" },
      { n: "07", name: "Nurture", model: "Gemini Flash", cron: "Mi 09:00", role: "Konversions-Emails Free → Bezahlt" },
      { n: "08", name: "Kommentator", model: "GPT-4o-mini", cron: "07:30 Mo-Fr", role: "5 tägliche LinkedIn-Kommentar-Vorschläge mit Direktlink" },
      { n: "09", name: "SEO-Auditor", model: "GPT + Claude", cron: "08:00 täglich", role: "Auditiert Blog+Email, korrigiert bis zu 3-mal bei <85" },
      { n: "10", name: "Analyst", model: "GPT-4o-mini", cron: "So 10:00", role: "Berichte mit echten GA4 + Search Console Daten" },
      { n: "11", name: "Product Scout", model: "GPT-4o-mini", cron: "Do 07:00", role: "Analysiert Mailchimp, Brevo, MailerLite, Resend" },
      { n: "12", name: "Wachhund", model: "—", cron: "Alle 15 Min", role: "10 Fehlermuster, startet tote Agenten neu" },
    ],
    flowLabel: "04 · Ein normaler Tag",
    flowTitle: "Der tägliche Flow, Stunde für Stunde.",
    flow: [
      { time: "06:00", event: "Nachrichten · lädt echte News von 8 RSS-Feeds" },
      { time: "06:30", event: "Direktor · plant den Tag mit Metriken + News" },
      { time: "07:00", event: "Redakteur · generiert Blog, LinkedIn-Posts und Emails" },
      { time: "07:30", event: "Kommentator · 5 LinkedIn-Kommentar-Vorschläge" },
      { time: "08:00", event: "SEO-Auditor · prüft und korrigiert bis Schwelle 85" },
      { time: "08:15", event: "Felipe öffnet Dashboard · genehmigt in 5 Min" },
      { time: "09:00", event: "LinkedIn Felipe · Post via API veröffentlicht" },
      { time: "10:00", event: "Newsletter-Email · Versand via Brevo" },
      { time: "12:00", event: "Blog · SEO-Artikel auf kujme.es/blog veröffentlicht" },
      { time: "20:00", event: "Jäger · zweite Runde Chancen" },
      { time: "22:00", event: "Wachhund · Finaler Check des Tages, alles OK" },
    ],
    stackLabel: "05 · Der Stack",
    stackTitle: "Sieben APIs orchestriert, eine SQLite.",
    apis: [
      { name: "OpenAI GPT-4o-mini", purpose: "8 operative Agenten" },
      { name: "Claude Sonnet", purpose: "Direktor + SEO-Korrekturen" },
      { name: "Gemini 2.5 Flash", purpose: "Emails (Redakteur + Nurture)" },
      { name: "Google News RSS", purpose: "Nachrichten — 8 echte Feeds" },
      { name: "LinkedIn API", purpose: "Felipe-Posts (Firma scope pending)" },
      { name: "Brevo API", purpose: "Newsletter-Email-Versand" },
      { name: "GA4 + Search Console", purpose: "Echter Web-Traffic + Positionen" },
    ],
    costLabel: "06 · Die Kosten",
    costTitle: "Sechs Dollar pro Monat. Das war's.",
    costLines: [
      { item: "Claude Sonnet · Direktor + SEO-Korrekturen", amount: "$3" },
      { item: "OpenAI GPT-4o-mini · 9 operative Agenten", amount: "$3" },
      { item: "Gemini 2.5 Flash · Redakteur + Nurture Emails", amount: "Gratis" },
      { item: "LinkedIn API · Post-Veröffentlichung", amount: "Gratis" },
      { item: "RSS · 8 Google News Feeds", amount: "Gratis" },
      { item: "GA4 + Search Console · echte Metriken", amount: "Gratis" },
      { item: "Hostinger VPS KVM · Dashboard + Cron Hosting", amount: "$6" },
    ],
    costTotal: "$12/Monat Gesamtbetriebskosten · ersetzt ein 5.000€-Team",
    closingTitle: "Ein ganzes Team. Für weniger als ein Abendessen.",
    closingP:
      "Kujme begann als traditionelles Email-Marketing-Tool. Als ich verstand, dass KI das ganze Team orchestrieren konnte — nicht nur schreiben — pivotierte ich zum aktuellen System. Das Produkt lebt, verwaltet meine eigenen Kanäle und die Inhalte des Gründungskunden. Kosten und Ergebnisse verifizierbar.",
    visit: "Besuche kujme.es",
    cta: "Weitere Projekte sehen",
    footerNote: "Felipe Cámara · Design, Entwicklung & KI-Orchestrierung",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const dashedBorder = `2px dashed ${DASHED}`;
const inkBorder = `2px solid ${INK}`;

export default function KujmeDetailClient() {
  const { lang } = useLang();
  const t = T[lang];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      style={{
        background: CREAM,
        color: INK,
        fontFamily: SANS,
        minHeight: "100dvh",
      }}
    >
      <BlendNav />

      {/* ── HERO shipping label ─────────────────── */}
      <section
        ref={heroRef}
        style={{
          padding: "clamp(80px, 10vh, 120px) clamp(24px, 4vw, 56px) clamp(48px, 8vh, 80px)",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {/* Top bar tipo shipping label */}
        <div
          style={{
            background: INK,
            color: PAPER,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <Link
            href="/proyectos"
            style={{
              color: PAPER,
              textDecoration: "none",
              opacity: 0.7,
            }}
          >
            ← {t.back}
          </Link>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span>
              <span style={{ opacity: 0.5 }}>{t.trackingLabel}:</span>{" "}
              {t.trackingId}
            </span>
            <span style={{ color: "#E0F657" }}>● ACTIVE</span>
          </div>
        </div>

        {/* Manifiesto */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          style={{
            background: PAPER,
            border: inkBorder,
            borderTop: "none",
            padding: "clamp(32px, 5vw, 64px)",
            position: "relative",
          }}
        >
          {/* Stamp circular */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 24,
              right: "clamp(24px, 5vw, 64px)",
              width: 96,
              height: 96,
              borderRadius: "50%",
              border: `2px solid ${STAMP_RED}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-8deg)",
              color: STAMP_RED,
              fontFamily: MONO,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              lineHeight: 1.2,
              textAlign: "center",
              opacity: 0.85,
            }}
          >
            KUJME
            <br />
            <span style={{ fontSize: 18, letterSpacing: "0" }}>2026</span>
            <br />
            v.12
          </div>

          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
              marginBottom: 12,
            }}
          >
            {t.manifestoLabel} {t.manifestoN}
          </div>

          <motion.h1
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(64px, 12vw, 200px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: INK,
              margin: 0,
              y: heroY,
            }}
          >
            {t.hero1}
            <span style={{ color: STAMP_RED }}>.</span>
            <span style={{ display: "block", fontWeight: 300, fontStyle: "italic" }}>
              {t.hero2}
            </span>
          </motion.h1>

          <p
            style={{
              maxWidth: 740,
              marginTop: 32,
              fontSize: "clamp(15px, 1.35vw, 18px)",
              lineHeight: 1.6,
              color: INK_SOFT,
            }}
          >
            {t.heroP}
          </p>

          {/* Big stat row */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: dashedBorder,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "clamp(20px, 3vw, 48px)",
              alignItems: "end",
            }}
          >
            <span
              style={{
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: "clamp(72px, 10vw, 160px)",
                lineHeight: 0.85,
                color: INK,
                letterSpacing: "-0.05em",
              }}
            >
              {t.bigStat}
            </span>
            <p
              style={{
                maxWidth: 480,
                fontSize: "clamp(13px, 1.1vw, 15px)",
                lineHeight: 1.45,
                color: INK_SOFT,
                paddingBottom: 12,
                fontFamily: MONO,
                letterSpacing: "0.01em",
              }}
            >
              {t.bigLabel}
            </p>
          </div>

          {/* Logo file row */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: dashedBorder,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>{t.badge}</span>
            <div
              style={{
                position: "relative",
                width: 80,
                height: 28,
                opacity: 0.85,
              }}
            >
              <Image
                src="/projects/kujme/logo.svg"
                alt="Kujme"
                fill
                style={{ objectFit: "contain", objectPosition: "right" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE INK con los 12 agentes ─────── */}
      <section
        style={{
          background: INK,
          color: PAPER,
          padding: "clamp(20px, 3vw, 32px) 0",
          overflow: "hidden",
          borderTop: inkBorder,
          borderBottom: inkBorder,
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 52, ease: "linear", repeat: Infinity }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: "clamp(20px, 2.6vw, 36px)",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          {[...t.marquee, ...t.marquee, ...t.marquee].map((w, i) => (
            <span
              key={i}
              style={{
                padding: "0 clamp(14px, 2vw, 28px)",
                color: w === "·" ? STAMP_RED : PAPER,
              }}
            >
              {w}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── 01. EL RETO ─────────────────────────── */}
      <Section>
        <SectionHeader label={t.challengeLabel} title={t.challengeTitle} />
        <Prose>{t.challengeBody}</Prose>

        <div
          style={{
            marginTop: 56,
            border: inkBorder,
            background: PAPER,
          }}
        >
          {t.challengePoints.map((p, i) => (
            <motion.div
              key={p.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 40px)",
                padding: "clamp(20px, 2.5vw, 32px)",
                borderBottom: i < t.challengePoints.length - 1 ? dashedBorder : "none",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 14,
                  color: STAMP_RED,
                  letterSpacing: "0.1em",
                  minWidth: 32,
                }}
              >
                {p.num}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontWeight: 500,
                  fontSize: "clamp(16px, 1.4vw, 20px)",
                  color: INK,
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: INK_SOFT,
                  letterSpacing: "0.04em",
                  textAlign: "right",
                }}
              >
                {p.cost}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 02. LA SOLUCIÓN ─────────────────────── */}
      <Section background={PAPER}>
        <SectionHeader label={t.solutionLabel} title={t.solutionTitle} />
        <Prose>{t.solutionBody}</Prose>
      </Section>

      {/* ── 03. LOS 12 AGENTES (tabla manifesto) ── */}
      <Section>
        <SectionHeader label={t.agentsLabel} title={t.agentsTitle} />
        <Prose>{t.agentsBody}</Prose>

        <div
          style={{
            marginTop: 56,
            border: inkBorder,
            background: PAPER,
            overflow: "auto",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1.2fr 1.2fr 1.3fr 2.5fr",
              gap: 16,
              padding: "14px 20px",
              background: INK,
              color: PAPER,
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              minWidth: 720,
            }}
          >
            <span>{t.agentsHeaders.n}</span>
            <span>{t.agentsHeaders.agent}</span>
            <span>{t.agentsHeaders.model}</span>
            <span>{t.agentsHeaders.cron}</span>
            <span>{t.agentsHeaders.role}</span>
          </div>

          {t.agents.map((a, i) => (
            <motion.div
              key={a.n}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ delay: (i % 6) * 0.04 }}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1.2fr 1.2fr 1.3fr 2.5fr",
                gap: 16,
                padding: "14px 20px",
                borderBottom: i < t.agents.length - 1 ? dashedBorder : "none",
                fontFamily: SANS,
                fontSize: 14,
                minWidth: 720,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  color: STAMP_RED,
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.05em",
                }}
              >
                {a.n}
              </span>
              <span style={{ fontWeight: 700, color: INK }}>{a.name}</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: INK_SOFT,
                  letterSpacing: "0.01em",
                }}
              >
                {a.model}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: INK_SOFT,
                  letterSpacing: "0.02em",
                }}
              >
                {a.cron}
              </span>
              <span style={{ color: INK_SOFT, fontSize: 13, lineHeight: 1.45 }}>
                {a.role}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 04. FLUJO DIARIO (timeline) ─────────── */}
      <Section background={PAPER}>
        <SectionHeader label={t.flowLabel} title={t.flowTitle} />

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 0,
            border: inkBorder,
            background: CREAM,
          }}
        >
          {t.flow.map((f, i) => (
            <motion.div
              key={f.time}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ delay: (i % 6) * 0.04 }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "clamp(20px, 3vw, 48px)",
                alignItems: "center",
                padding: "clamp(16px, 2vw, 24px)",
                borderBottom: i < t.flow.length - 1 ? dashedBorder : "none",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 28px)",
                  color: INK,
                  letterSpacing: "0.02em",
                  minWidth: 90,
                }}
              >
                {f.time}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  color: INK_SOFT,
                  lineHeight: 1.5,
                }}
              >
                {f.event}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 05. EL STACK / APIs ─────────────────── */}
      <Section>
        <SectionHeader label={t.stackLabel} title={t.stackTitle} />

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 0,
            border: inkBorder,
            background: PAPER,
          }}
        >
          {t.apis.map((api, i) => (
            <motion.div
              key={api.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ delay: (i % 4) * 0.06 }}
              style={{
                padding: "clamp(20px, 2.5vw, 28px)",
                borderRight: dashedBorder,
                borderBottom: dashedBorder,
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 13,
                  color: INK,
                  letterSpacing: "0.04em",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {api.name}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: INK_SOFT,
                  lineHeight: 1.45,
                }}
              >
                {api.purpose}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── 06. EL COSTE (factura) ──────────────── */}
      <Section background={PAPER}>
        <SectionHeader label={t.costLabel} title={t.costTitle} />

        <div
          style={{
            marginTop: 56,
            border: inkBorder,
            background: CREAM,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 24px",
              background: INK,
              color: PAPER,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Invoice — {t.costLabel.split(" · ")[1] ?? "Cost breakdown"}</span>
            <span style={{ color: "#E0F657" }}>● PAGADO</span>
          </div>
          {t.costLines.map((line, i) => (
            <motion.div
              key={line.item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ delay: (i % 4) * 0.05 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: i < t.costLines.length - 1 ? dashedBorder : `2px solid ${INK}`,
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 15,
                  color: INK,
                }}
              >
                {line.item}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 15,
                  color: line.amount.toLowerCase().includes("gratis") || line.amount.toLowerCase().includes("free")
                    ? MUTED
                    : INK,
                  letterSpacing: "0.04em",
                }}
              >
                {line.amount}
              </span>
            </motion.div>
          ))}
          <div
            style={{
              padding: "20px 24px",
              background: INK,
              color: PAPER,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            {t.costTotal}
          </div>
        </div>
      </Section>

      {/* ── CIERRE INK ──────────────────────────── */}
      <section
        style={{
          background: INK,
          color: PAPER,
          padding: "clamp(80px, 14vh, 160px) clamp(24px, 4vw, 56px)",
          position: "relative",
          overflow: "hidden",
          borderTop: inkBorder,
        }}
      >
        {/* Dashed border interno */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 24,
            border: `2px dashed ${PAPER}40`,
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
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E0F657",
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            · 07 · Conclusión
          </div>
          <h3
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(40px, 7vw, 100px)",
              lineHeight: 0.95,
              color: PAPER,
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            {t.closingTitle}
          </h3>
          <p
            style={{
              maxWidth: 720,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(250,247,242,0.8)",
              margin: "32px 0 48px",
            }}
          >
            {t.closingP}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <a
              href="https://kujme.es"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                background: PAPER,
                color: INK,
                textDecoration: "none",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.visit} <span style={{ fontSize: 16 }}>↗</span>
            </a>
            <Link
              href="/proyectos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 28px",
                border: `2px solid ${PAPER}`,
                color: PAPER,
                textDecoration: "none",
                fontFamily: MONO,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ← {t.cta}
            </Link>
          </div>
        </motion.div>
      </section>

      <footer
        style={{
          background: INK,
          color: "rgba(250,247,242,0.45)",
          padding: "20px clamp(24px, 4vw, 56px)",
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: 600,
          borderTop: dashedBorder,
        }}
      >
        {t.footerNote} · {t.trackingId}
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
        borderBottom: dashedBorder,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: STAMP_RED,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: "clamp(36px, 5.5vw, 76px)",
          lineHeight: 0.95,
          color: INK,
          margin: "16px 0 0",
          letterSpacing: "-0.025em",
          maxWidth: 1000,
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
        fontSize: "clamp(16px, 1.4vw, 20px)",
        lineHeight: 1.65,
        color: INK_SOFT,
        maxWidth: 820,
        fontWeight: 400,
      }}
    >
      {children}
    </motion.p>
  );
}
