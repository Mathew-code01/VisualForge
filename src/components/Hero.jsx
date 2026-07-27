
// src/components/Hero.jsx

// src/components/Hero/Hero.jsx
// src/components/Hero/Hero.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Play, Star, Clapperboard, Palette,
  Bot, Code2, CheckCircle2, Layers, Cpu,
} from "lucide-react";
import "../styles/components/hero.css";

/* =====================================================
   SERVICE ROTATION DATA
   Drives both the rotating headline word and the
   active-state colouring of the four floating cards
   in the visual — kept in one array so they stay in sync.
===================================================== */

const SERVICES = [
  { word: "videos",    label: "Video Editing",   icon: <Clapperboard size={14} />, color: "primary" },
  { word: "interfaces",label: "UI/UX Design",    icon: <Palette size={14} />,      color: "secondary" },
  { word: "agents",    label: "AI Agents",       icon: <Bot size={14} />,          color: "tertiary" },
  { word: "products",  label: "Full-Stack Apps", icon: <Code2 size={14} />,        color: "accent" },
];

const AVATAR_COLORS = ["primary", "secondary", "tertiary", "accent"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SERVICES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const active = SERVICES[index];

  return (
    <section className="hero">
      {/* ── Background layers ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">

        {/* ── Eyebrow badge — cycles through the 4 disciplines ── */}
        <div className={`hero__badge hero__badge--${active.color}`}>
          <span className="hero__badge-dot" />
          {active.icon}
          <span key={index} className="hero__badge-text">
            {active.label}
          </span>
        </div>

        {/* ── Headline ── */}
        <h1 className="hero__title">
          We build stunning
          <span className="hero__rotator" aria-live="polite">
            <span key={index} className={`hero__rotator-word hero__rotator-word--${active.color}`}>
              {active.word}
            </span>
          </span>
          <br />
          from concept to launch.
        </h1>

        {/* ── Subheadline ── */}
        <p className="hero__subtitle">
          One team, four disciplines. Video editing, UI/UX design, AI agents,
          and full-stack development — built together so nothing gets lost
          in translation between departments that don't talk to each other.
        </p>

        {/* ── Service pills row ── */}
        <div className="hero__pills" role="list">
          {SERVICES.map((s, i) => (
            <span
              key={s.label}
              role="listitem"
              className={`hero__pill hero__pill--${s.color} ${i === index ? "is-active" : ""}`}
            >
              {s.icon}
              {s.label}
            </span>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div className="hero__cta-row">
          <Link to="/contact" className="hero__cta-primary">
            Start your project
            <ArrowRight size={16} className="hero__cta-arrow" />
          </Link>

          <button className="hero__cta-secondary" onClick={() => setIsPlaying((v) => !v)}>
            <span className="hero__play-icon">
              <Play size={13} fill="currentColor" strokeWidth={0} />
            </span>
            Watch our reel
          </button>
        </div>

        {/* ── Social proof ── */}
        <div className="hero__proof">
          <div className="hero__avatars">
            {AVATAR_COLORS.map((c, i) => (
              <span key={i} className={`hero__avatar hero__avatar--${c}`}>
                {["BD", "MK", "SR", "TL"][i]}
              </span>
            ))}
          </div>
          <div className="hero__proof-text">
            <div className="hero__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>Trusted across video, design, AI, and engineering projects</span>
          </div>
        </div>

        {/* ── Product visual: four-discipline showcase ── */}
        <div className="hero__visual">
          <div className="hero__visual-glow" />

          <div className="hero__frame">
            <div className="hero__frame-bar">
              <span className="hero__frame-dot hero__frame-dot--red" />
              <span className="hero__frame-dot hero__frame-dot--yellow" />
              <span className="hero__frame-dot hero__frame-dot--green" />
              <div className="hero__frame-url">bigday.studio/work</div>
            </div>

            <div className="hero__canvas">

              {/* Central showcase panel */}
              <div className="hero__canvas-main">
                {!isPlaying ? (
                  <button
                    className="hero__canvas-play"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play showreel"
                  >
                    <Play size={26} fill="currentColor" strokeWidth={0} />
                  </button>
                ) : (
                  <div className="hero__canvas-playing">
                    <div className="hero__waveform">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} style={{ animationDelay: `${i * 0.05}s` }} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="hero__canvas-label">
                  <Layers size={13} />
                  Latest showreel
                </div>
              </div>

              {/* Four discipline mini-cards */}
              <div className="hero__discipline-grid">
                <div className="hero__discipline-card hero__discipline-card--primary">
                  <Clapperboard size={16} />
                  <span>Video</span>
                </div>
                <div className="hero__discipline-card hero__discipline-card--secondary">
                  <Palette size={16} />
                  <span>UI/UX</span>
                </div>
                <div className="hero__discipline-card hero__discipline-card--tertiary">
                  <Cpu size={16} />
                  <span>AI</span>
                </div>
                <div className="hero__discipline-card hero__discipline-card--accent">
                  <Code2 size={16} />
                  <span>Code</span>
                </div>
              </div>

            </div>
          </div>

          {/* Floating stat cards */}
          <div className="hero__float-card hero__float-card--left">
            <div className="hero__float-icon hero__float-icon--primary">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <strong>120+ projects</strong>
              <span>shipped across 4 disciplines</span>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--right">
            <div className="hero__float-icon hero__float-icon--accent">
              <Star size={16} fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <strong>One team</strong>
              <span>zero handoff friction</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}