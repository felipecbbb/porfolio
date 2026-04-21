"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects as projectData } from "@/data/projects";

interface Project {
  id: string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics?: string;
  year: string;
}

const projects: Project[] = [
  ...projectData.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    description: p.description,
    tags: p.tags,
    metrics: p.metrics,
    year: p.year,
  })),
  {
    id: String(projectData.length + 1).padStart(2, "0"),
    title: "Tu Proyecto",
    category: "El siguiente es el tuyo",
    description:
      "¿Tienes una idea? Hablemos. Desarrollo la solución técnica que tu negocio necesita.",
    tags: ["???"],
    year: "2026",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.77, 0, 0.175, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
      className="group border-b border-foreground/10 py-12 md:py-16"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
        {/* Number */}
        <span className="font-mono text-xs text-foreground/30">
          {project.id}
        </span>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
              <motion.span
                animate={{ x: isHovered ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                {project.title}
              </motion.span>
            </h3>
            <span className="font-mono text-xs text-foreground/40 uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <p className="mt-4 text-foreground/50 max-w-lg text-sm leading-relaxed">
            {project.description}
          </p>

          {project.metrics && (
            <p className="mt-2 font-mono text-xs text-foreground/30">
              {project.metrics}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest border border-foreground/10 px-3 py-1 text-foreground/40 group-hover:border-foreground/30 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.slug && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block mt-6 font-mono text-xs uppercase tracking-widest text-foreground/40"
            >
              Ver caso de estudio →
            </motion.span>
          )}
        </div>

        {/* Year */}
        <span className="font-mono text-xs text-foreground/30 hidden md:block">
          {project.year}
        </span>
      </div>

      {/* Expand line on hover */}
      <motion.div
        className="h-px bg-foreground mt-12 md:mt-16 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
      />
    </motion.div>
  );

  if (project.slug) {
    return (
      <Link href={`/proyecto/${project.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export default function Projects() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="trabajos" className="px-6 md:px-12 py-24 md:py-32">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-baseline justify-between mb-16"
      >
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40">
          Trabajos seleccionados
        </h2>
        <span className="font-mono text-xs text-foreground/30">
          ({String(projects.length).padStart(2, "0")})
        </span>
      </motion.div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
