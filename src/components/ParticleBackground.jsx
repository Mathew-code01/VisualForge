// src/components/ParticleBackground.jsx
import React, { useEffect, useRef, useMemo } from "react";

const ParticleBackground = ({ className }) => {
  const canvasRef = useRef(null);

  /**
   * CONFIGURATION
   * Colors updated to match your theme.css:
   * #6cd3ff (Primary Blue)
   * #ff4f6d (Accent Red)
   * #ffffff (Pure White/Sparkle)
   * #3ba7d0 (Primary Darker)
   */
  const config = useMemo(
    () => ({
      colors: ["#6cd3ff", "#ff4f6d", "#ffffff", "#3ba7d0"],
      maxParticles: 50, // Reduced slightly for a cleaner professional look
      speed: 0.35, // Slower speed feels more "premium" and less "busy"
      radius: 2, // Max radius of particles
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    // Helper: Convert hex to RGB once during initialization to save CPU
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    const init = () => {
      // Set canvas internal dimensions to match its display size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      particles = [];
      for (let i = 0; i < config.maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * config.radius + 1,
          dx: (Math.random() - 0.5) * config.speed,
          dy: (Math.random() - 0.5) * config.speed,
          rgb: hexToRgb(
            config.colors[Math.floor(Math.random() * config.colors.length)]
          ),
          alpha: Math.random() * 0.4 + 0.1, // Subtle transparency
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move particles
        p.x += p.dx;
        p.y += p.dy;

        // Wrap around screen edges
        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;

        if (p.y > canvas.height) p.y = 0;
        else if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1, // Sits just above the video but below the text
        pointerEvents: "none",
        mixBlendMode: "screen", // Blends highlights beautifully over dark video
        opacity: 0.7, // Overall master opacity
      }}
    />
  );
};

export default ParticleBackground;