"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Felipe no solo ejecuta, entiende lo que necesitas antes de que tú mismo lo sepas. El mejor profesional con el que he trabajado.",
    name: "Cliente Savanna",
    role: "Marca de lifestyle",
  },
  {
    quote:
      "La diferencia de trabajar con alguien que programa, diseña y entiende de negocio es brutal. Todo encaja.",
    name: "Próximo testimonio",
    role: "¿Serás tú?",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-16">
          Lo que dicen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                ease: [0.77, 0, 0.175, 1],
              }}
              className="border-l-2 border-foreground/10 pl-8"
            >
              <p className="text-lg md:text-xl leading-relaxed text-foreground/70 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="font-mono text-xs text-foreground/40 mt-1">
                  {t.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
