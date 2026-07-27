
// src/components/Header.jsx
// src/components/Header/Header.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, ArrowRight, Play,
  Film, Palette, Bot, Code2, Sparkles,
  Clapperboard, Layers, MonitorSmartphone, Cpu,
} from "lucide-react";
import logoHorizontal from "../../src/assets/BIG DAY LOGO-01.png";
import logoStacked from "../../src/assets/BIG DAY LOGO-03.png";
import "../styles/components/header.css";

/* =====================================================
   NAV DATA
   Four core service pillars — kept as data so the mega
   menu markup below stays declarative and easy to extend.
===================================================== */

const SERVICES = [
  {
    icon: <Clapperboard size={19} />,
    title: "Video Editing",
    desc: "Cinematic cuts, motion graphics, and AI-assisted post-production",
    href: "/services/video-editing",
    color: "primary",
  },
  {
    icon: <Palette size={19} />,
    title: "UI/UX Design",
    desc: "Interfaces engineered for clarity, conversion, and delight",
    href: "/services/ui-ux",
    color: "secondary",
  },
  {
    icon: <Bot size={19} />,
    title: "AI Agents",
    desc: "Custom AI systems that automate workflows and conversations",
    href: "/services/ai-agents",
    color: "tertiary",
  },
  {
    icon: <Code2 size={19} />,
    title: "Full-Stack Development",
    desc: "Production-grade web apps, from database to deployment",
    href: "/services/development",
    color: "accent",
  },
];

const NAV_LINKS = [
  { label: "Services", type: "dropdown" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
];

/* =====================================================
   HEADER
===================================================== */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  /* ── Scroll shadow / glass state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close everything on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  /* ── Lock body scroll while mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Close mega menu on outside click ── */
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ── Escape closes everything ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  return (
    <>
      <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
        <div className="hdr__inner">

          {/* =====================================================
              LOGO
              Two art-directed lockups switch at the 460px
              breakpoint via CSS (both render, only one shows) —
              this avoids any JS-driven layout flash on resize.
          ===================================================== */}
          <Link to="/" className="hdr__logo" aria-label="Big Day — home">
            <img
              src={logoHorizontal}
              alt="Big Day"
              className="hdr__logo-img hdr__logo-img--wide"
            />
            <img
              src={logoStacked}
              alt="Big Day"
              className="hdr__logo-img hdr__logo-img--stacked"
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hdr__nav" aria-label="Primary">
            {NAV_LINKS.map((item) =>
              item.type === "dropdown" ? (
                <div
                  key={item.label}
                  className="hdr__dropdown-wrap"
                  ref={dropdownRef}
                >
                  <button
                    className={`hdr__link hdr__link--trigger ${servicesOpen ? "is-open" : ""}`}
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className="hdr__chevron"
                      strokeWidth={2.5}
                    />
                  </button>

                  <div
                    className={`hdr__dropdown ${servicesOpen ? "hdr__dropdown--open" : ""}`}
                    role="menu"
                  >
                    <div className="hdr__dropdown-grid">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.title}
                          to={s.href}
                          className={`hdr__dropdown-item hdr__dropdown-item--${s.color}`}
                          role="menuitem"
                        >
                          <span className="hdr__dropdown-icon">{s.icon}</span>
                          <span className="hdr__dropdown-body">
                            <strong>{s.title}</strong>
                            <span>{s.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="hdr__dropdown-footer">
                      <Link to="/services" className="hdr__dropdown-cta">
                        <Sparkles size={14} />
                        See our full service breakdown
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`hdr__link ${location.pathname === item.href ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Right actions ── */}
          <div className="hdr__actions">
            <Link to="/work" className="hdr__watch-link">
              <span className="hdr__watch-icon">
                <Play size={11} fill="currentColor" strokeWidth={0} />
              </span>
              See our work
            </Link>

            <Link to="/contact" className="hdr__cta">
              Start your project
              <ArrowRight size={16} className="hdr__cta-arrow" />
            </Link>

            <button
              className="hdr__burger"
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}
      <div className={`hdr__mobile ${mobileOpen ? "hdr__mobile--open" : ""}`}>
        <div className="hdr__mobile-scroll">

          <button
            className="hdr__mobile-item hdr__mobile-item--trigger"
            onClick={() => setMobileServicesOpen((v) => !v)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown
              size={18}
              className={`hdr__chevron ${mobileServicesOpen ? "is-flipped" : ""}`}
            />
          </button>

          <div className={`hdr__mobile-sub ${mobileServicesOpen ? "hdr__mobile-sub--open" : ""}`}>
            {SERVICES.map((s) => (
              <Link key={s.title} to={s.href} className="hdr__mobile-sub-item">
                <span className={`hdr__dropdown-icon hdr__dropdown-icon--${s.color}`}>
                  {s.icon}
                </span>
                <span>
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </span>
              </Link>
            ))}
          </div>

          {NAV_LINKS.filter((l) => l.type !== "dropdown").map((item) => (
            <Link key={item.label} to={item.href} className="hdr__mobile-item">
              {item.label}
            </Link>
          ))}

          <div className="hdr__mobile-divider" />

          <Link to="/work" className="hdr__mobile-item">
            See our work
          </Link>

          <Link to="/contact" className="hdr__cta hdr__cta--mobile">
            Start your project
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Backdrop ── */}
      {mobileOpen && (
        <div className="hdr__backdrop" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}