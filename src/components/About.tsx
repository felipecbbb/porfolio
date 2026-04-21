"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Proyectos", value: "15+" },
  { label: "Clientes", value: "10+" },
  { label: "Tests escritos", value: "102" },
  { label: "Cafés", value: "∞" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-mi"
      className="px-6 md:px-12 py-24 md:py-32 bg-foreground text-background"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-widest text-background/40 mb-16">
          Sobre mí
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl md:text-4xl font-bold leading-tight tracking-tight"
            >
              Soy Felipe. Desarrollo software, diseño webs y gestiono redes
              sociales.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 text-background/50 leading-relaxed"
            >
              Mi diferencial es que no solo hago una cosa. Entiendo el negocio,
              diseño la solución y la construyo. Sin intermediarios, sin teléfono
              roto, sin excusas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-background/50 leading-relaxed"
            >
              Fundé Kujme, un SaaS de email marketing con IA. Gestiono marcas
              en redes sociales. Y estoy construyendo en público todo lo que
              hago.
            </motion.p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <span className="text-3xl md:text-5xl font-bold">
                    {stat.value}
                  </span>
                  <p className="mt-2 font-mono text-xs text-background/40 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 pt-8 border-t border-background/10"
            >
              <p className="font-mono text-xs text-background/40 uppercase tracking-widest mb-4">
                Stack principal
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "Tailwind",
                  "Supabase",
                  "PostgreSQL",
                  "Stripe",
                  "OpenAI",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-widest border border-background/15 px-3 py-1.5 text-background/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
