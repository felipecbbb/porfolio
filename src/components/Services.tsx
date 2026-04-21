"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  includes: string[];
}

const services: Service[] = [
  {
    id: "01",
    title: "Desarrollo de Software",
    description:
      "SaaS, apps web, plataformas, automatizaciones. Código limpio, escalable, con tests.",
    price: "Consultar",
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
    description:
      "Webs que convierten. Rápidas, responsive, optimizadas para SEO y pensadas para vender.",
    price: "Consultar",
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
    description:
      "Estrategia, contenido y gestión completa. Para empresas e influencers que quieren crecer de verdad.",
    price: "Consultar",
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
    description:
      "Te digo lo que necesitas oír, no lo que quieres escuchar. Análisis, plan de acción, ejecución.",
    price: "Consultar",
    includes: [
      "Auditoría digital",
      "Plan de acción",
      "Recomendaciones técnicas",
      "Seguimiento",
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.77, 0, 0.175, 1],
      }}
      onClick={() => setExpanded(!expanded)}
      data-hover
      className="border border-foreground/10 p-8 md:p-10 hover:border-foreground/30 transition-colors duration-500 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] text-foreground/30">
            {service.id}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-2">
            {service.title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-foreground/30 group-hover:text-foreground transition-colors"
        >
          +
        </motion.span>
      </div>

      <p className="mt-4 text-foreground/50 text-sm leading-relaxed max-w-md">
        {service.description}
      </p>

      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
        className="overflow-hidden"
      >
        <ul className="mt-6 space-y-2">
          {service.includes.map((item) => (
            <li
              key={item}
              className="font-mono text-xs text-foreground/40 flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-foreground/30 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-6 pt-6 border-t border-foreground/5">
        <span className="font-mono text-sm font-medium">{service.price}</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="servicios" className="px-6 md:px-12 py-24 md:py-32">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-baseline justify-between mb-16"
      >
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40">
          Servicios
        </h2>
        <span className="font-mono text-xs text-foreground/30">
          ({String(services.length).padStart(2, "0")})
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
