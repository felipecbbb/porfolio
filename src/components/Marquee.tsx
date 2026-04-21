"use client";

import { motion } from "framer-motion";

export default function Marquee({ text = "Felipe Cámara" }: { text?: string }) {
  const repeated = Array(8).fill(text);

  return (
    <div className="overflow-hidden py-8 border-y border-foreground/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-tighter text-foreground/5"
          >
            {t} ·
          </span>
        ))}
        {repeated.map((t, i) => (
          <span
            key={`dup-${i}`}
            className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-tighter text-foreground/5"
          >
            {t} ·
          </span>
        ))}
      </motion.div>
    </div>
  );
}
