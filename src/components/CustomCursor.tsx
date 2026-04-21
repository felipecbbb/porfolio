"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    window.addEventListener("mousemove", move);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, [data-hover]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 48 : 12,
            height: isHovering ? 48 : 12,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
