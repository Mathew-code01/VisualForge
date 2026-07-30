// src/components/contact/ContactPhilosophy.jsx

import { useInView } from "../../hooks/useInView";
import "../../styles/components/contactPhilosophy.css";

const POINTS = [
  { number: "01", title: "Strategy first" },
  { number: "02", title: "Multidisciplinary approach" },
  { number: "03", title: "Built for ambitious ideas" },
];

export default function ContactPhilosophy() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="contact-philosophy section-light" data-theme="light">
      <div
        ref={ref}
        className={[
          "contact-philosophy__inner",
          "section-container",
          inView ? "is-in-view" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="contact-philosophy__head">
          <h2 className="contact-philosophy__title">
            Different challenges.
            <br />
            One shared purpose.
          </h2>

          <p className="contact-philosophy__copy">
            We combine strategy, creativity, communication, digital experience,
            and technology to make ideas clearer.
          </p>
        </div>

        <div className="contact-philosophy__points">
          {POINTS.map((point, index) => (
            <div
              key={point.number}
              className="contact-philosophy__point"
              style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
            >
              <span className="contact-philosophy__point-number mono">
                {point.number}
              </span>
              <span className="contact-philosophy__point-title">
                {point.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
