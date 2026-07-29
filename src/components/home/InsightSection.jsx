// src\components\home\InsightSection.jsx


import React from "react";
import "../../styles/components/insightSection.css";

const insights = [
  {
    number: "01",
    category: "Perspective",
    title: "Why good ideas need room to become better.",
    description:
      "The strongest creative work rarely arrives fully formed. It develops through curiosity, clarity, and the willingness to keep asking better questions.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
  },
  {
    number: "02",
    category: "Technology",
    title: "Building with AI without losing the human idea.",
    description:
      "Emerging technology can accelerate the work, but meaningful experiences still begin with understanding people, context, and intent.",
    date: "May 27, 2026",
    readTime: "6 min read",
  },
  {
    number: "03",
    category: "Strategy",
    title: "Clarity is one of the most valuable things you can create.",
    description:
      "When everything feels important, nothing is. A clear strategy creates the focus needed to turn complexity into something people can actually understand.",
    date: "Apr 09, 2026",
    readTime: "5 min read",
  },
];

const InsightSection = () => {
  return (
    <section
      className="insights-section section-dark grain"
      data-theme="dark"
      aria-labelledby="insights-section-title"
    >
      {/* Ambient background treatment */}
      <div className="insights-section__ambient" aria-hidden="true">
        <span className="insights-section__ambient-orb" />
        <span className="insights-section__ambient-grid" />
      </div>

      <div className="section-container insights-section__container">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="insights-section__header">
          <div className="insights-section__eyebrow eyebrow">
            <span>07</span>
            <span>Insights</span>
          </div>

          <div className="insights-section__intro">
            <div className="insights-section__intro-copy">
              <h2
                id="insights-section-title"
                className="insights-section__title"
              >
                Thinking beyond
                <br />
                <span>the obvious.</span>
              </h2>

              <p className="insights-section__description">
                Ideas, perspectives, and observations from the intersection
                of strategy, creativity, technology, and culture.
              </p>
            </div>

            <div className="insights-section__index" aria-hidden="true">
              <span className="insights-section__index-number">03</span>
              <span className="insights-section__index-label">
                Articles
              </span>
            </div>
          </div>
        </header>

        {/* =====================================================
            ARTICLES
        ===================================================== */}

        <div className="insights-section__articles">
          {insights.map((article, index) => (
            <article
              className={`insights-section__article ${
                index === 0
                  ? "insights-section__article--featured"
                  : ""
              }`}
              key={article.number}
            >
              <div className="insights-section__article-number">
                <span>{article.number}</span>
              </div>

              <div className="insights-section__article-main">
                <div className="insights-section__article-meta">
                  <span className="insights-section__article-category">
                    {article.category}
                  </span>

                  <span
                    className="insights-section__meta-dot"
                    aria-hidden="true"
                  />

                  <span>{article.date}</span>
                </div>

                <h3 className="insights-section__article-title">
                  {article.title}
                </h3>

                <p className="insights-section__article-description">
                  {article.description}
                </p>
              </div>

              <div className="insights-section__article-side">
                <span className="insights-section__article-read">
                  {article.readTime}
                </span>

                <a
                  href="#"
                  className="insights-section__article-link"
                  aria-label={`Read ${article.title}`}
                >
                  <span>Read article</span>

                  <span
                    className="insights-section__article-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </div>

              <span
                className="insights-section__article-hover-line"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="insights-section__footer">
          <div className="insights-section__footer-line" />

          <div className="insights-section__footer-content">
            <p>
              Ideas worth
              <span> sharing.</span>
            </p>

            <span
              className="insights-section__footer-mark"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default InsightSection;
