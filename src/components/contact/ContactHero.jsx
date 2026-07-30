

// src/components/contact/ContactHero.jsx

import { ArrowUpRight, Mail } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactHero.css";

export default function ContactHero() {
  const [ref, inView] = useInView();

  return (
    <section
      className="contact-hero section-dark grain"
      data-theme="dark"
      aria-labelledby="contact-hero-title"
    >
      <div className="contact-hero__background" aria-hidden="true">
        <div className="contact-hero__glow" />
        <div className="contact-hero__dots">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
        <svg className="contact-hero__lines" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <path d="M0,260 C300,130 520,380 820,220 C980,140 1080,300 1200,210" />
          <path d="M0,140 C320,60 480,240 780,110 C940,40 1060,200 1200,90" />
        </svg>
      </div>

      <div
        ref={ref}
        className={["contact-hero__inner", "section-container", inView ? "is-in-view" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="eyebrow">Contact Big Day</span>

        <h1 id="contact-hero-title" className="contact-hero__title">
          Let's talk about
          <br />
          <span className="gradient-text">what you're building.</span>
        </h1>

        <p className="contact-hero__copy">
          Have an idea, a challenge, or an opportunity? Tell us what you're
          working on and we'll help figure out the clearest path forward.
        </p>

        <div className="contact-hero__actions">
          <a href="#contact-form" className="btn-blue contact-hero__primary">
            <span>Start a Conversation</span>
            <ArrowUpRight size={17} strokeWidth={2} />
          </a>

          <a href="mailto:hello@bigday.com" className="contact-hero__email">
            <Mail size={15} strokeWidth={1.8} />
            <span>hello@bigday.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}