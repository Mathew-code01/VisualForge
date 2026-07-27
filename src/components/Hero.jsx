
// src/components/Hero.jsx

// src/components/Hero/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles, Play, ArrowRight, Wand2, Scissors,
  Mic2, Film, Star, Upload, Zap,
} from "lucide-react";
import "../styles/components/hero.css";

/* ── Rotating word data ── */
const ROTATING_WORDS = ["reels", "trailers", "podcasts", "ads", "shorts"];

/* ── Social proof avatars (replace src with real assets) ── */
const AVATAR_COLORS = ["primary", "secondary", "tertiary", "accent"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  /* Rotate headline word every 2.2s */
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  console.log(videoRef)

  const togglePlay = () => {
    setIsPlaying((v) => !v);
  };

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

        {/* ── Eyebrow badge ── */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <Sparkles size={13} strokeWidth={2.5} />
          Powered by ReelCraft AI Agent
        </div>

        {/* ── Headline ── */}
        <h1 className="hero__title">
          Edit stunning
          <span className="hero__rotator" aria-live="polite">
            <span
              key={wordIndex}
              className="hero__rotator-word"
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
          <br />
          in minutes, not hours.
        </h1>

        {/* ── Subheadline ── */}
        <p className="hero__subtitle">
          Drop your raw footage. Our AI agent cuts, captions, scores, and
          styles it into a finished video — while you focus on the story,
          not the timeline.
        </p>

        {/* ── CTA row ── */}
        <div className="hero__cta-row">
          <Link to="/signup" className="hero__cta-primary">
            <Upload size={18} strokeWidth={2.4} />
            Start editing free
            <ArrowRight size={16} className="hero__cta-arrow" />
          </Link>

          <button className="hero__cta-secondary" onClick={togglePlay}>
            <span className="hero__play-icon">
              <Play size={13} fill="currentColor" strokeWidth={0} />
            </span>
            Watch 60-sec demo
          </button>
        </div>

        {/* ── Social proof ── */}
        <div className="hero__proof">
          <div className="hero__avatars">
            {AVATAR_COLORS.map((c, i) => (
              <span key={i} className={`hero__avatar hero__avatar--${c}`}>
                {["JK", "MO", "SR", "TL"][i]}
              </span>
            ))}
          </div>
          <div className="hero__proof-text">
            <div className="hero__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span>Trusted by 40,000+ creators worldwide</span>
          </div>
        </div>

        {/* ── Product visual ── */}
        <div className="hero__visual">
          <div className="hero__visual-glow" />

          <div className="hero__frame">
            {/* Browser-style top bar */}
            <div className="hero__frame-bar">
              <span className="hero__frame-dot hero__frame-dot--red" />
              <span className="hero__frame-dot hero__frame-dot--yellow" />
              <span className="hero__frame-dot hero__frame-dot--green" />
              <div className="hero__frame-url">app.reelcraft.ai/editor</div>
            </div>

            {/* Mock editor canvas */}
            <div className="hero__canvas">
              <div className="hero__canvas-video">
                {!isPlaying ? (
                  <button
                    className="hero__canvas-play"
                    onClick={togglePlay}
                    aria-label="Play preview"
                  >
                    <Play size={26} fill="currentColor" strokeWidth={0} />
                  </button>
                ) : (
                  <div className="hero__canvas-playing">
                    <div className="hero__waveform">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <span
                          key={i}
                          style={{ animationDelay: `${i * 0.05}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Floating AI chips */}
                <div className="hero__chip hero__chip--1">
                  <Scissors size={13} />
                  Auto-cut applied
                </div>
                <div className="hero__chip hero__chip--2">
                  <Mic2 size={13} />
                  Captions generated
                </div>
                <div className="hero__chip hero__chip--3">
                  <Wand2 size={13} />
                  Style: Cinematic
                </div>
              </div>

              {/* Mock timeline */}
              <div className="hero__timeline">
                <div className="hero__timeline-track hero__timeline-track--video">
                  <span className="hero__clip hero__clip--1" />
                  <span className="hero__clip hero__clip--2" />
                  <span className="hero__clip hero__clip--3" />
                </div>
                <div className="hero__timeline-track hero__timeline-track--audio">
                  <span className="hero__audio-wave" />
                </div>
                <div className="hero__playhead" />
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="hero__float-card hero__float-card--left">
            <div className="hero__float-icon hero__float-icon--accent">
              <Zap size={16} />
            </div>
            <div>
              <strong>3.2x faster</strong>
              <span>than manual editing</span>
            </div>
          </div>

          <div className="hero__float-card hero__float-card--right">
            <div className="hero__float-icon hero__float-icon--tertiary">
              <Film size={16} />
            </div>
            <div>
              <strong>2.1M+ videos</strong>
              <span>rendered this month</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}