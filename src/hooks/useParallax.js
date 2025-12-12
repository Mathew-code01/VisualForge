// src/hooks/useParallax.js
import { useEffect, useState } from "react";

/**
 * useParallax(ref, strength)
 * returns a y offset value you can use in style transform translateY(...)
 * strength: 0.0 - 1.0 (0 = no parallax, 1 = strong)
 */
export default function useParallax(ref, strength = 0.12) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!ref || !ref.current) return;

    const el = ref.current;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const winH =
            window.innerHeight || document.documentElement.clientHeight;
          // distance from center: -1 .. 1
          const dist = (rect.top + rect.height / 2 - winH / 2) / (winH / 2);
          // clamp and scale by strength
          const value = Math.max(-1, Math.min(1, dist)) * strength * 100; // px
          setOffset(value);
          ticking = false;
        });
        ticking = true;
      }
    }

    // init
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, strength]);

  return offset;
}
