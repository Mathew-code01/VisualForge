// src/components/contact/ContactFinalCTA.jsx

import { ArrowUpRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactFinalCTA.css";

export default function ContactFinalCTA() {
  const [ref, inView] = useInView();

  return (
    <section className="contact-final section-dark" data-theme="dark">
      <div className="contact-final__background" aria-hidden="true">
        <div className="contact-final__glow" />
        <svg
          className="contact-final__lines"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path d="M0,220 C260,120 460,320 760,180 C920,110 1040,260 1200,170" />
          <path d="M0,120 C280,220 500,60 820,180 C980,240 1080,90 1200,150" />
        </svg>
      </div>

      <div
        ref={ref}
        className={[
          "contact-final__inner",
          "section-container",
          inView ? "is-in-view" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="eyebrow">Ready When You Are</span>

        <h2 className="contact-final__title">
          The next great idea
          <br />
          starts with a conversation.
        </h2>

        <p className="contact-final__copy">Let's figure out what comes next.</p>

        <a href="#contact-form" className="btn-blue contact-final__cta">
          <span>Start a Conversation</span>
          <ArrowUpRight size={17} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
