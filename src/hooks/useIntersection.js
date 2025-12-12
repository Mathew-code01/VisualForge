// src/hooks/useIntersection.js
import { useState, useEffect } from "react";

export default function useIntersection(
  ref,
  rootMargin = "0px",
  threshold = 0.15
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref && ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIntersecting(true); // degrade gracefully
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIntersecting(true);
          // don't auto-reset to false: we want once-visible behavior
        });
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}
