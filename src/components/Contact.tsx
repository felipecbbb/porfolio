"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contacto"
      className="px-6 md:px-12 py-24 md:py-32 bg-foreground text-background"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - CTA */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-background/40 mb-8">
              Contacto
            </h2>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]"
            >
              ¿Tienes un
              <br />
              proyecto?
              <br />
              Hablemos.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 space-y-4 font-mono text-sm"
            >
              <a
                href="mailto:felipe@kujme.es"
                data-hover
                className="block text-background/60 hover:text-background transition-colors"
              >
                felipe@kujme.es
              </a>
              <div className="flex gap-6 text-background/40">
                <a
                  href="https://instagram.com/felippe.lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="hover:text-background transition-colors text-xs uppercase tracking-widest"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@felippe.lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="hover:text-background transition-colors text-xs uppercase tracking-widest"
                >
                  TikTok
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-background/40 block mb-3">
                Nombre
              </label>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-background/20 pb-3 text-background focus:border-background outline-none transition-colors font-light"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-background/40 block mb-3">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-background/20 pb-3 text-background focus:border-background outline-none transition-colors font-light"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-background/40 block mb-3">
                ¿Qué necesitas?
              </label>
              <textarea
                rows={3}
                required
                className="w-full bg-transparent border-b border-background/20 pb-3 text-background focus:border-background outline-none transition-colors font-light resize-none"
                placeholder="Cuéntame tu proyecto..."
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-background/40 block mb-3">
                ¿Cómo me encontraste?
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-background/20 pb-3 text-background focus:border-background outline-none transition-colors font-light"
                placeholder="Instagram, Google, recomendación..."
              />
            </div>

            <motion.button
              type="submit"
              data-hover
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border border-background text-background font-mono text-xs uppercase tracking-widest py-4 mt-4 hover:bg-background hover:text-foreground transition-colors duration-500"
            >
              Enviar mensaje
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
