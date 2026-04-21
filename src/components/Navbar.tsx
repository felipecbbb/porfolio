"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-black/5"
    >
      <Link href="/" className="text-sm font-mono tracking-wider" data-hover>
        Felipe Cámara
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-hover
            className="text-xs font-mono uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      <Link
        href="/#contacto"
        data-hover
        className="text-xs font-mono uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-all duration-300"
      >
        Hablemos
      </Link>
    </motion.nav>
  );
}
