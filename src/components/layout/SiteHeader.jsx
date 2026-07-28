// src/components/layout/SiteHeader.jsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import logoHorizontal from "../../assets/BIG DAY LOGO-02.png";
import logoStacked from "../../assets/BIG DAY LOGO-03.png";

import "../../styles/components/siteHeader.css";

/* ============================================================
   SERVICES
   ============================================================ */

const SERVICES = [
  {
    number: "01",
    title: "Strategy",
    description: "Define the message.",
    href: "/services/strategy",
  },
  {
    number: "02",
    title: "Brand Identity",
    description: "Build a brand people recognize and remember.",
    href: "/services/brand-identity",
  },
  {
    number: "03",
    title: "Communication",
    description: "Bring your story to life.",
    href: "/services/communication",
  },
  {
    number: "04",
    title: "Digital Experiences",
    description: "Build products and systems that support growth.",
    href: "/services/digital-experiences",
  },
];

/* ============================================================
   MAIN NAVIGATION
   ============================================================ */

const NAV_LINKS = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Process",
    href: "/process",
  },
  {
    label: "Insights",
    href: "/insights",
  },
];

/* ============================================================
   HEADER
   ============================================================ */

export default function SiteHeader() {
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesRef = useRef(null);

  /* ============================================================
     SCROLL BEHAVIOR
     ============================================================ */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  /* ============================================================
     ESCAPE KEY
     ============================================================ */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setServicesOpen(false);
      setMobileOpen(false);
      setMobileServicesOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    if (href === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === href ||
      location.pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      {/* ========================================================
          SITE HEADER
          ======================================================== */}

      <header
        className={[
          "bd-header",
          scrolled ? "bd-header--scrolled" : "",
          mobileOpen ? "bd-header--menu-open" : "",
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
              src={logoHorizontal}
              alt="Big Day"
              className="bd-header__logo-image bd-header__logo-image--wide"
            />

            <img
              src={logoStacked}
              alt=""
              aria-hidden="true"
              className="bd-header__logo-image bd-header__logo-image--stacked"
            />
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}

          <nav
            className="bd-header__nav"
            aria-label="Primary navigation"
          >
            {/* SERVICES */}

            <div
              className="bd-header__services"
              ref={servicesRef}
            >
              <button
                type="button"
                className={[
                  "bd-header__nav-link",
                  "bd-header__nav-link--button",
                  servicesOpen ? "is-open" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  setServicesOpen((current) => !current)
                }
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>

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

              {/* DESKTOP SERVICES MENU */}

              <div
                className={[
                  "bd-header__mega",
                  servicesOpen ? "bd-header__mega--open" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!servicesOpen}
              >
                <div className="bd-header__mega-inner">
                  <div className="bd-header__mega-top">
                    <span className="bd-header__mega-label">
                      What we do
                    </span>

                    <span className="bd-header__mega-count">
                      04 capabilities
                    </span>
                  </div>

                  <div className="bd-header__mega-grid">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.number}
                        to={service.href}
                        className="bd-header__service-card"
                        tabIndex={servicesOpen ? 0 : -1}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="bd-header__service-number">
                          {service.number}
                        </span>

                        <div className="bd-header__service-content">
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
                    ))}
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

                      <ArrowRight
                        size={15}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* STANDARD LINKS */}

            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={[
                  "bd-header__nav-link",
                  isActive(item.href) ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  isActive(item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ==================================================
              ACTIONS
              ================================================== */}

          <div className="bd-header__actions">
            <Link
              to="/contact"
              className="bd-header__cta"
            >
              <span>Start a Project</span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              className={[
                "bd-header__menu-button",
                mobileOpen
                  ? "bd-header__menu-button--open"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={toggleMobile}
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              aria-controls="bd-mobile-navigation"
            >
              <span className="bd-header__menu-icon">
                {mobileOpen ? (
                  <X
                    size={21}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    size={21}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE NAVIGATION
          ======================================================== */}

      <aside
        id="bd-mobile-navigation"
        className={[
          "bd-mobile",
          mobileOpen ? "bd-mobile--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className="bd-mobile__inner">
          {/* INTRO */}

          <div className="bd-mobile__intro">
            <span className="bd-mobile__eyebrow">
              Big Day
            </span>

            <p>
              Strategy, design and visual storytelling for
              ambitious ideas.
            </p>
          </div>

          {/* SERVICES */}

          <div className="bd-mobile__services">
            <button
              type="button"
              className="bd-mobile__service-trigger"
              onClick={() =>
                setMobileServicesOpen(
                  (current) => !current
                )
              }
              aria-expanded={mobileServicesOpen}
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span>Services</span>

              <ChevronDown
                size={19}
                strokeWidth={1.6}
                className={
                  mobileServicesOpen ? "is-open" : ""
                }
                aria-hidden="true"
              />
            </button>

            <div
              className={[
                "bd-mobile__service-list",
                mobileServicesOpen
                  ? "bd-mobile__service-list--open"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {SERVICES.map((service) => (
                <Link
                  key={service.number}
                  to={service.href}
                  className="bd-mobile__service"
                  tabIndex={
                    mobileOpen && mobileServicesOpen
                      ? 0
                      : -1
                  }
                  onClick={closeMobile}
                >
                  <span className="bd-mobile__service-number">
                    {service.number}
                  </span>

                  <span className="bd-mobile__service-copy">
                    <strong>{service.title}</strong>

                    <small>{service.description}</small>
                  </span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* MAIN NAV */}

          <nav
            className="bd-mobile__nav"
            aria-label="Mobile navigation"
          >
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
                aria-current={
                  isActive(item.href) ? "page" : undefined
                }
                onClick={closeMobile}
              >
                <span className="bd-mobile__nav-index">
                  0{index + 2}
                </span>

                <span>{item.label}</span>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
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

              <ArrowRight
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>

            <p className="bd-mobile__footer-note">
              Let's build something people understand.
            </p>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE BACKDROP
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