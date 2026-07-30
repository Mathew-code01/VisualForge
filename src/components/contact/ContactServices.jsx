// src/components/contact/ContactServices.jsx

import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactServices.css";

const SERVICES = [
  { number: "01", title: "Strategy" },
  { number: "02", title: "Brand Identity" },
  { number: "03", title: "Creative Direction" },
  { number: "04", title: "Digital Experiences" },
  { number: "05", title: "AI & Technology" },
  { number: "06", title: "Content & Motion" },
];

export default function ContactServices({ selected, onSelect }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="contact-services section-light" data-theme="light">
      <div
        ref={ref}
        className={[
          "contact-services__inner",
          "section-container",
          inView ? "is-in-view" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="contact-services__header">
          <span className="eyebrow">Project Services</span>

          <h2 className="contact-services__title">
            What are you looking to create?
          </h2>

          <p className="contact-services__description">
            Select the area that best matches your project. If you're unsure,
            that's completely fine—we'll help determine the right approach
            together.
          </p>
        </div>

        <div className="contact-services__grid">
          {SERVICES.map((service, index) => (
            <button
              key={service.number}
              type="button"
              className={[
                "contact-services__card",
                selected === service.title ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                transitionDelay: inView ? `${index * 70}ms` : "0ms",
              }}
              onClick={() => onSelect?.(service.title)}
              aria-pressed={selected === service.title}
            >
              <span className="contact-services__number mono">
                {service.number}
              </span>

              <span className="contact-services__name">{service.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
