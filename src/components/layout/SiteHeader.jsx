// src/components/layout/SiteHeader.jsx

// src/components/layout/SiteHeader.jsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Fingerprint,
  LayoutGrid,
  MessageSquare,
  Menu,
  Target,
  X,
} from "lucide-react";

import logoWhite from "../../assets/BIG DAY LOGO-02.png";
import logoBlack from "../../assets/BIG DAY LOGO-01.png";
import logoStacked from "../../assets/BIG DAY LOGO-03.png";

import "../../styles/components/siteHeader.css";

/* ============================================================
   SERVICES
   href points to anchors on the single /services page.
   Set a real `image` path later and the card renders it in
   place of the icon mark automatically.
   ============================================================ */

const SERVICES = [
  {
    number: "01",
    title: "Strategy",
    description: "Define the message.",
    href: "/services#strategy",
    icon: Target,
    image: null,
  },
  {
    number: "02",
    title: "Brand Identity",
    description: "Build a brand people recognize and remember.",
    href: "/services#brand-identity",
    icon: Fingerprint,
    image: null,
  },
  {
    number: "03",
    title: "Communication",
    description: "Bring your story to life.",
    href: "/services#communication",
    icon: MessageSquare,
    image: null,
  },
  {
    number: "04",
    title: "Digital Experiences",
    description: "Build products and systems that support growth.",
    href: "/services#digital-experiences",
    icon: LayoutGrid,
    image: null,
  },
];

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
];

const DESKTOP_BREAKPOINT = 901;
const HOVER_CLOSE_DELAY = 150;
const HEADER_THEME_PROBE_Y = 90;

/* ============================================================
   HOOK — is the viewport wide enough for the desktop nav?
   Used to fully UNMOUNT the mega menu on mobile, not just
   hide it with CSS.
   ============================================================ */

function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handle = (event) => setIsDesktop(event.matches);

    handle(mql);
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, [breakpoint]);

  return isDesktop;
}

/* ============================================================
   HOOK — per-section header theme
   Reuses the site's EXISTING convention: any element already
   carrying [data-theme="light"|"dark"] (as ServicesHero.jsx
   does) is treated as a themed section. The header watches
   which one currently sits at header height and adapts its
   own colors + logo to match — no new markup required on
   pages that already use this pattern.
   ============================================================ */

function useHeaderTheme(pathname) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("[data-theme]")
    ).filter((el) => el !== document.documentElement);

    if (sections.length === 0) {
      const root = document.documentElement;
      const readRootTheme = () =>
        setTheme(root.getAttribute("data-theme") || "dark");

      readRootTheme();

      const observer = new MutationObserver(readRootTheme);
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      return () => observer.disconnect();
    }

    let ticking = false;

    const evaluate = () => {
      let next = "dark";

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= HEADER_THEME_PROBE_Y && rect.bottom > HEADER_THEME_PROBE_Y) {
          next = el.getAttribute("data-theme") || "dark";
          break;
        }
      }

      setTheme(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluate);
        ticking = true;
      }
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return theme;
}

/* ============================================================
   HEADER
   ============================================================ */

export default function SiteHeader() {
  const location = useLocation();

  const isDesktop = useIsDesktop();
  const theme = useHeaderTheme(location.pathname);
  const isLight = theme === "light";

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const servicesRef = useRef(null);
  const hoverCloseTimer = useRef(null);

  /* ============================================================
     ENTRANCE MOTION — one-time stagger on first paint
     ============================================================ */

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ============================================================
     SCROLL STATE — rAF-throttled, single listener
     ============================================================ */

  useEffect(() => {
    let ticking = false;

    const commit = () => {
      setScrolled(window.scrollY > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(commit);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ============================================================
     CLOSE MENUS ON ROUTE CHANGE
     ============================================================ */

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  /* ============================================================
     FORCE-CLOSE MOBILE STATE WHEN VIEWPORT BECOMES DESKTOP
     ============================================================ */

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
      setMobileServicesOpen(false);
    } else {
      setServicesOpen(false);
    }
  }, [isDesktop]);

  /* ============================================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
     ============================================================ */

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  /* ============================================================
     DESKTOP OUTSIDE CLICK
     ============================================================ */

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  /* ============================================================
     ESCAPE KEY
     ============================================================ */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setServicesOpen(false);
      setMobileOpen(false);
      setMobileServicesOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ============================================================
     SERVICES — hover intent (desktop only)
     ============================================================ */

  const openServicesOnHover = useCallback(() => {
    clearTimeout(hoverCloseTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServicesOnHover = useCallback(() => {
    hoverCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
    }, HOVER_CLOSE_DELAY);
  }, []);

  useEffect(() => () => clearTimeout(hoverCloseTimer.current), []);

  /* ============================================================
     MOBILE MENU
     ============================================================ */

  const toggleMobile = useCallback(() => {
    setMobileOpen((current) => !current);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  /* ============================================================
     ACTIVE ROUTE
     ============================================================ */

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <>
      {/* ========================================================
          DESKTOP SCRIM — dims the page while the mega menu is
          open, giving it real depth instead of floating flat.
          ======================================================== */}

      {isDesktop && (
        <div
          className={[
            "bd-header__scrim",
            servicesOpen ? "bd-header__scrim--visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
          onClick={() => setServicesOpen(false)}
        />
      )}

      {/* ========================================================
          SITE HEADER
          ======================================================== */}

      <header
        data-header-state={scrolled ? "scrolled" : "top"}
        data-theme={theme}
        className={[
          "bd-header",
          scrolled ? "bd-header--scrolled" : "",
          mobileOpen ? "bd-header--menu-open" : "",
          mounted ? "bd-header--mounted" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="bd-header__inner">
          {/* ==================================================
              BRAND
              ================================================== */}

          <Link
            to="/"
            className="bd-header__logo"
            aria-label="Big Day — Home"
            onClick={closeMobile}
          >
            <img
              src={isLight ? logoBlack : logoWhite}
              alt="Big Day"
              className="bd-header__logo-image bd-header__logo-image--wide"
            />

            <img
              src={logoStacked}
              alt=""
              aria-hidden="true"
              className={[
                "bd-header__logo-image",
                "bd-header__logo-image--stacked",
                isLight ? "" : "bd-header__logo-image--invert",
              ]
                .filter(Boolean)
                .join(" ")}
            />

            <span className="bd-header__logo-accent" aria-hidden="true" />
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              Only mounted at desktop widths — not merely hidden.
              ================================================== */}

          {isDesktop && (
            <nav className="bd-header__nav" aria-label="Primary navigation">
              <div
                className="bd-header__services"
                ref={servicesRef}
                onMouseEnter={openServicesOnHover}
                onMouseLeave={closeServicesOnHover}
                style={{ "--stagger": 0 }}
              >
                <div
                  className={[
                    "bd-header__nav-link",
                    "bd-header__nav-link--services",
                    servicesOpen ? "is-open" : "",
                    isServicesActive ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Link
                    to="/services"
                    className="bd-header__services-label"
                    aria-current={isServicesActive ? "page" : undefined}
                  >
                    Services
                  </Link>

                  <button
                    type="button"
                    className="bd-header__services-toggle"
                    onClick={() => setServicesOpen((current) => !current)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="bd-services-menu"
                    aria-label={
                      servicesOpen ? "Close services menu" : "Open services menu"
                    }
                  >
                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                      className={[
                        "bd-header__chevron",
                        servicesOpen ? "is-open" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* DESKTOP SERVICES MEGA MENU */}

                <div
                  id="bd-services-menu"
                  role="menu"
                  aria-hidden={!servicesOpen}
                  className={[
                    "bd-header__mega",
                    servicesOpen ? "bd-header__mega--open" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="bd-header__mega-inner">
                    <div className="bd-header__mega-top">
                      <span className="bd-header__mega-label">What we do</span>
                      <span className="bd-header__mega-count">
                        04 capabilities
                      </span>
                    </div>

                    <div className="bd-header__mega-grid">
                      {SERVICES.map((service, index) => {
                        const Icon = service.icon;

                        return (
                          <Link
                            key={service.number}
                            to={service.href}
                            role="menuitem"
                            className="bd-header__service-card"
                            style={{
                              transitionDelay: servicesOpen
                                ? `${index * 45}ms`
                                : "0ms",
                            }}
                            tabIndex={servicesOpen ? 0 : -1}
                            onClick={() => setServicesOpen(false)}
                          >
                            <span
                              className="bd-header__service-visual"
                              aria-hidden="true"
                            >
                              {service.image ? (
                                <img src={service.image} alt="" loading="lazy" />
                              ) : (
                                <span className="bd-header__service-mark">
                                  <Icon size={22} strokeWidth={1.5} />
                                </span>
                              )}
                            </span>

                            <div className="bd-header__service-content">
                              <span className="bd-header__service-number">
                                {service.number}
                              </span>
                              <h3>{service.title}</h3>
                              <p>{service.description}</p>
                            </div>

                            <span className="bd-header__service-action">
                              <ArrowUpRight
                                size={17}
                                strokeWidth={1.7}
                                aria-hidden="true"
                              />
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="bd-header__mega-bottom">
                      <span className="bd-header__mega-summary">
                        Strategy · Identity · Communication · Digital
                      </span>

                      <Link
                        to="/services"
                        className="bd-header__mega-link"
                        tabIndex={servicesOpen ? 0 : -1}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span>View all services</span>
                        <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {NAV_LINKS.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={[
                    "bd-header__nav-link",
                    isActive(item.href) ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ "--stagger": index + 1 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* ==================================================
              ACTIONS
              ================================================== */}

          <div className="bd-header__actions">
            <Link to="/contact" className="bd-header__cta">
              <span>Start a Project</span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            {/* SINGLE close/open control — also serves as the
                only dismiss button for the mobile drawer below. */}
            <button
              type="button"
              className={[
                "bd-header__menu-button",
                mobileOpen ? "bd-header__menu-button--open" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="bd-mobile-navigation"
            >
              <span className="bd-header__menu-icon">
                {mobileOpen ? (
                  <X size={21} strokeWidth={1.7} aria-hidden="true" />
                ) : (
                  <Menu size={21} strokeWidth={1.7} aria-hidden="true" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE NAVIGATION
          No separate close button in here — the header's own
          toggle above is the single, permanent dismiss control.
          ======================================================== */}

      <aside
        id="bd-mobile-navigation"
        data-theme={theme}
        className={["bd-mobile", mobileOpen ? "bd-mobile--open" : ""]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className="bd-mobile__inner">
          {/* INTRO */}

          <div className="bd-mobile__intro">
            <span className="bd-mobile__eyebrow">Big Day</span>
            <p>
              Strategy, design and visual storytelling for ambitious ideas.
            </p>
          </div>

          {/* SERVICES */}

          <div className="bd-mobile__services">
            <button
              type="button"
              className="bd-mobile__service-trigger"
              onClick={() => setMobileServicesOpen((current) => !current)}
              aria-expanded={mobileServicesOpen}
              aria-controls="bd-mobile-services-list"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span>Services</span>
              <ChevronDown
                size={19}
                strokeWidth={1.6}
                className={mobileServicesOpen ? "is-open" : ""}
                aria-hidden="true"
              />
            </button>

            <div
              id="bd-mobile-services-list"
              className={[
                "bd-mobile__service-list",
                mobileServicesOpen ? "bd-mobile__service-list--open" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {SERVICES.map((service) => {
                const Icon = service.icon;

                return (
                  <Link
                    key={service.number}
                    to={service.href}
                    className="bd-mobile__service"
                    tabIndex={mobileOpen && mobileServicesOpen ? 0 : -1}
                    onClick={closeMobile}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.6}
                      className="bd-mobile__service-icon"
                      aria-hidden="true"
                    />

                    <span className="bd-mobile__service-copy">
                      <strong>{service.title}</strong>
                      <small>{service.description}</small>
                    </span>

                    <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
                  </Link>
                );
              })}

              <Link
                to="/services"
                className="bd-mobile__service-all"
                tabIndex={mobileOpen && mobileServicesOpen ? 0 : -1}
                onClick={closeMobile}
              >
                <span>View all services</span>
                <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* MAIN NAV */}

          <nav className="bd-mobile__nav" aria-label="Mobile navigation">
            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={[
                  "bd-mobile__nav-link",
                  isActive(item.href) ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeMobile}
              >
                <span className="bd-mobile__nav-index">0{index + 2}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* FOOTER */}

          <div className="bd-mobile__footer">
            <Link
              to="/contact"
              className="bd-mobile__cta"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobile}
            >
              <span>Start a Project</span>
              <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </Link>

            <p className="bd-mobile__footer-note">
              Let's build something people understand.
            </p>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE BACKDROP — closes on tap, but is not a close
          BUTTON in the accessibility sense; the header toggle is.
          ======================================================== */}

      {mobileOpen && (
        <button
          type="button"
          className="bd-backdrop"
          aria-label="Close navigation"
          onClick={closeMobile}
        />
      )}
    </>
  );
}