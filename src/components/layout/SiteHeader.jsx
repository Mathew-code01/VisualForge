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

const SERVICES = [
  {
    number: "01",
    title: "Strategy",
    description: "Define the message.",
    href: "/services#strategy",
    icon: Target,
  },
  {
    number: "02",
    title: "Brand Identity",
    description: "Build a brand people remember.",
    href: "/services#brand-identity",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Communication",
    description: "Bring your story to life.",
    href: "/services#communication",
    icon: MessageSquare,
  },
  {
    number: "04",
    title: "Digital Experiences",
    description: "Products built for growth.",
    href: "/services#digital-experiences",
    icon: LayoutGrid,
  },
];

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

const DESKTOP_BREAKPOINT = 901;
const HOVER_CLOSE_DELAY = 150;
const HEADER_THEME_PROBE_Y = 90;

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

function useHeaderTheme(pathname) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-theme]")).filter(
      (el) => el !== document.documentElement
    );

    if (sections.length === 0) {
      const root = document.documentElement;
      const readRootTheme = () => setTheme(root.getAttribute("data-theme") || "dark");

      readRootTheme();

      const observer = new MutationObserver(readRootTheme);
      observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

      return () => observer.disconnect();
    }

    let ticking = false;

    const evaluate = () => {
  const sections = Array.from(
    document.querySelectorAll("[data-theme]")
  ).filter(
    (el) =>
      !el.classList.contains("bd-header") &&
      !el.classList.contains("bd-mobile")
  );

  console.clear();

  let next = "dark";

  sections.forEach((el) => {
    const rect = el.getBoundingClientRect();

    console.log({
      class: el.className,
      theme: el.dataset.theme,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
    });

    if (
      rect.top <= HEADER_THEME_PROBE_Y &&
      rect.bottom > HEADER_THEME_PROBE_Y
    ) {
      next = el.dataset.theme;
    }
  });

  console.log("ACTIVE THEME:", next);

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



export default function SiteHeader() {
  const location = useLocation();

  const isDesktop = useIsDesktop();
  const theme = useHeaderTheme(location.pathname);

  console.log("Header theme:", theme);

  const isLight = theme === "light";

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const servicesRef = useRef(null);
  const hoverCloseTimer = useRef(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
      setMobileServicesOpen(false);
    } else {
      setServicesOpen(false);
    }
  }, [isDesktop]);

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

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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

  const openServicesOnHover = useCallback(() => {
    clearTimeout(hoverCloseTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServicesOnHover = useCallback(() => {
    hoverCloseTimer.current = setTimeout(() => setServicesOpen(false), HOVER_CLOSE_DELAY);
  }, []);

  useEffect(() => () => clearTimeout(hoverCloseTimer.current), []);

  const toggleMobile = useCallback(() => setMobileOpen((c) => !c), []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, []);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <>
      {isDesktop && (
        <div
          className={["bd-header__scrim", servicesOpen ? "bd-header__scrim--visible" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
          onClick={() => setServicesOpen(false)}
        />
      )}

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
          <Link to="/" className="bd-header__logo" aria-label="Big Day — Home" onClick={closeMobile}>
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
          </Link>

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
                    onClick={() => setServicesOpen((c) => !c)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="bd-services-menu"
                    aria-label={servicesOpen ? "Close services menu" : "Open services menu"}
                  >
                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                      className={["bd-header__chevron", servicesOpen ? "is-open" : ""]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div
                  id="bd-services-menu"
                  role="menu"
                  aria-hidden={!servicesOpen}
                  className={["bd-header__mega", servicesOpen ? "bd-header__mega--open" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="bd-header__mega-top">
                    <span className="bd-header__mega-label">What we do</span>
                    <span className="bd-header__mega-count mono">04</span>
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
                          style={{ transitionDelay: servicesOpen ? `${index * 45}ms` : "0ms" }}
                          tabIndex={servicesOpen ? 0 : -1}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="bd-header__service-icon" aria-hidden="true">
                            <Icon size={18} strokeWidth={1.6} />
                          </span>

                          <span className="bd-header__service-number mono">{service.number}</span>
                          <h3 className="bd-header__service-title">{service.title}</h3>
                          <p className="bd-header__service-text">{service.description}</p>

                          <span className="bd-header__service-arrow" aria-hidden="true">
                            <ArrowUpRight size={16} strokeWidth={1.8} />
                          </span>
                        </Link>
                      );
                    })}
                  </div>

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

              {NAV_LINKS.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={["bd-header__nav-link", isActive(item.href) ? "is-active" : ""]
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

          <div className="bd-header__actions">
            <Link to="/contact" className="bd-header__cta">
              <span>Start a Project</span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            <button
              type="button"
              className={["bd-header__menu-button", mobileOpen ? "bd-header__menu-button--open" : ""]
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

      <aside
        id="bd-mobile-navigation"
        data-theme={theme}
        className={["bd-mobile", mobileOpen ? "bd-mobile--open" : ""].filter(Boolean).join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className="bd-mobile__inner">
          <div className="bd-mobile__intro">
            <span className="eyebrow">Big Day</span>
            <p>Strategy, design and visual storytelling for ambitious ideas.</p>
          </div>

          <div className="bd-mobile__services">
            <button
              type="button"
              className="bd-mobile__service-trigger"
              onClick={() => setMobileServicesOpen((c) => !c)}
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
                    <Icon size={16} strokeWidth={1.6} className="bd-mobile__service-icon" aria-hidden="true" />

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

          <nav className="bd-mobile__nav" aria-label="Mobile navigation">
            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={["bd-mobile__nav-link", isActive(item.href) ? "is-active" : ""]
                  .filter(Boolean)
                  .join(" ")}
                tabIndex={mobileOpen ? 0 : -1}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeMobile}
              >
                <span className="bd-mobile__nav-index mono">0{index + 2}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className="bd-mobile__footer">
            <Link to="/contact" className="bd-mobile__cta" tabIndex={mobileOpen ? 0 : -1} onClick={closeMobile}>
              <span>Start a Project</span>
              <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </Link>

            <p className="bd-mobile__footer-note">Let's build something people understand.</p>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button type="button" className="bd-backdrop" aria-label="Close navigation" onClick={closeMobile} />
      )}
    </>
  );
}