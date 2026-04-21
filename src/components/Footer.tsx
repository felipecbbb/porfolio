"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="px-6 md:px-12 py-8 border-t border-foreground/10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p className="font-mono text-xs text-foreground/30">
          © {new Date().getFullYear()} Felipe Cámara — Todos los derechos
          reservados
        </p>

        <div className="flex gap-6">
          <a
            href="https://instagram.com/felippe.lab"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="font-mono text-[10px] uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@felippe.lab"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="font-mono text-[10px] uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
          >
            TikTok
          </a>
          <a
            href="mailto:felipe@kujme.es"
            data-hover
            className="font-mono text-[10px] uppercase tracking-widest text-foreground/30 hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
