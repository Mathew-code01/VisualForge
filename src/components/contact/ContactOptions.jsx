

// src/components/contact/ContactOptions.jsx

import { Rocket, Users, MessageCircleQuestion, ArrowUpRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactOptions.css";

const OPTIONS = [
  {
    icon: Rocket,
    title: "Start a Project",
    text: "For brands, products, campaigns, and digital experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    text: "Working on something interesting? Let's explore how we can work together.",
  },
  {
    icon: MessageCircleQuestion,
    title: "General Inquiry",
    text: "Questions about BigDay, services, or partnerships.",
  },
];

export default function ContactOptions() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="contact-options section-dark" data-theme="dark">
      <div
        ref={ref}
        className={["contact-options__grid", "section-container", inView ? "is-in-view" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {OPTIONS.map((option, index) => {
          const Icon = option.icon;

          return (
            <div
              key={option.title}
              className="contact-options__card surface"
              style={{ transitionDelay: inView ? `${index * 110}ms` : "0ms" }}
            >
              <span className="contact-options__icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>

              <h3 className="contact-options__title">{option.title}</h3>
              <p className="contact-options__text">{option.text}</p>

              <span className="contact-options__arrow" aria-hidden="true">
                <ArrowUpRight size={17} strokeWidth={1.8} />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}