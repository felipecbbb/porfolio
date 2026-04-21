"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { ProjectDetail } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function ProyectosClient({
  projects,
}: {
  projects: ProjectDetail[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const main = p.category.split("—")[0].trim();
      if (main) set.add(main);
    });
    return ["Todos", ...Array.from(set).sort()];
  }, [projects]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const years = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.year));
    return Array.from(set).sort().reverse();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return projects.filter((p) => {
      if (
        activeCategory !== "Todos" &&
        p.category.split("—")[0].trim() !== activeCategory
      )
        return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (activeYear && p.year !== activeYear) return false;
      if (q) {
        const haystack = normalize(
          [
            p.title,
            p.description,
            p.category,
            p.client ?? "",
            p.tags.join(" "),
          ].join(" "),
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [projects, query, activeCategory, activeTag, activeYear]);

  const hasFilters =
    !!query ||
    activeCategory !== "Todos" ||
    !!activeTag ||
    !!activeYear;

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 bg-background text-foreground">
      {/* Header */}
      <section className="px-6 md:px-12 pb-10 md:pb-14">
        <div className="flex items-baseline justify-between mb-6">
          <Link
            href="/"
            data-hover
            className="text-xs font-mono uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
          >
            ← Volver
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-foreground/40">
            {projects.length.toString().padStart(2, "0")} proyectos
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.88] tracking-tighter"
            >
              Proyectos<span className="text-foreground/30">.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="max-w-md text-sm font-mono text-foreground/50 leading-relaxed"
          >
            Catálogo completo. SaaS, webs, e-commerce, plataformas. Busca por
            nombre, filtra por categoría o por tecnología.
          </motion.p>
        </div>
      </section>

      {/* Search + filters */}
      <section className="px-6 md:px-12 pb-10 border-b border-foreground/10">
        {/* Search */}
        <div className="relative mb-8 max-w-3xl">
          <div className="flex items-center gap-4 border border-foreground/15 focus-within:border-foreground/50 transition-colors py-4 px-5">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0 text-foreground/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proyecto, cliente, tecnología…"
              aria-label="Buscar proyectos"
              className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder:text-foreground/30 font-mono"
            />
            {query && (
              <button
                data-hover
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="text-foreground/40 hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/40 mb-3">
            Categoría
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  data-hover
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs uppercase tracking-[0.2em] font-mono px-4 py-2 border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/20 text-foreground/70 hover:border-foreground/60"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech tags */}
        <div className="mb-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/40 mb-3">
            Stack / tecnología
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = activeTag === t;
              return (
                <button
                  key={t}
                  data-hover
                  onClick={() => setActiveTag(active ? null : t)}
                  className={`text-[11px] font-mono px-3 py-1.5 border transition-colors ${
                    active
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year + clear */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/40 mb-3">
              Año
            </p>
            <div className="flex flex-wrap gap-2">
              {years.map((y) => {
                const active = activeYear === y;
                return (
                  <button
                    key={y}
                    data-hover
                    onClick={() => setActiveYear(active ? null : y)}
                    className={`text-[11px] font-mono px-3 py-1.5 border transition-colors ${
                      active
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          </div>

          {hasFilters && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-hover
              onClick={() => {
                setQuery("");
                setActiveCategory("Todos");
                setActiveTag(null);
                setActiveYear(null);
              }}
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors underline underline-offset-4"
            >
              Limpiar filtros
            </motion.button>
          )}
        </div>
      </section>

      {/* Results count */}
      <section className="px-6 md:px-12 pt-8 pb-4 flex items-baseline justify-between">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-foreground/50">
          {filtered.length === projects.length
            ? "Mostrando todos"
            : `${filtered.length} de ${projects.length}`}
        </p>
        <span
          aria-hidden
          className="flex-1 mx-4 border-b border-foreground/10"
        />
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-foreground/30">
          ({filtered.length.toString().padStart(2, "0")})
        </p>
      </section>

      {/* Cards grid */}
      <section className="px-6 md:px-12">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
              >
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="py-20 md:py-28 text-center"
              >
                <p className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground/10">
                  ∅
                </p>
                <p className="mt-6 text-base font-mono text-foreground/50">
                  Nada por aquí con esos filtros.
                </p>
                <button
                  data-hover
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("Todos");
                    setActiveTag(null);
                    setActiveYear(null);
                  }}
                  className="mt-6 text-[11px] font-mono uppercase tracking-[0.2em] underline underline-offset-4 hover:text-foreground/80"
                >
                  Limpiar y volver
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>
    </div>
  );
}

/* ─── Project card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: ProjectDetail;
  index: number;
}) {
  const hasImage = !!project.featuredImage;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 6) * 0.05 }}
      className="group relative"
    >
      <Link
        href={`/proyecto/${project.slug}`}
        data-hover
        className="block relative overflow-hidden aspect-[4/5] border border-foreground/10"
        style={{
          background: hasImage ? "#111" : project.theme.heroGradient,
        }}
      >
        {hasImage ? (
          <Image
            src={project.featuredImage!}
            alt={`Foto destacada de ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-end p-8"
            style={{ color: project.theme.fg }}
          >
            <p
              className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[0.9] tracking-tighter"
              style={{ fontFamily: project.theme.font }}
            >
              {project.title}
            </p>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Top tags */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 bg-white/90 text-black backdrop-blur"
          >
            {project.id}
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 bg-white/90 text-black backdrop-blur"
          >
            {project.year}
          </span>
        </div>

        {/* Bottom reveal on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 mb-1">
            Ver proyecto ↗
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 bg-white/15 text-white backdrop-blur-sm border border-white/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Caption */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40 shrink-0">
            {project.category.split("—")[0].trim()}
          </span>
        </div>
        {project.client && (
          <p className="mt-1 text-[11px] font-mono text-foreground/40">
            {project.client}
          </p>
        )}
        <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
