
// src/components/Header.jsx
// src/components/Header.jsx
// src/components/Header.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Play,
  Wand2,
  Film,
  Mic2,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";

import "../styles/components/header.css";

/* =====================================================
   PRODUCT NAVIGATION
===================================================== */

const PRODUCT_LINKS = [
  {
    icon: <Wand2 size={18} />,
    title: "AI Auto-Edit",
    desc: "Turn raw footage into a finished cut in minutes",
    href: "/product/auto-edit",
    color: "primary",
  },
  {
    icon: <Mic2 size={18} />,
    title: "Voice & Captions",
    desc: "AI voiceover, subtitles, and multi-language dubbing",
    href: "/product/captions",
    color: "secondary",
  },
  {
    icon: <Layers size={18} />,
    title: "Smart Timeline",
    desc: "Drag, trim, and remix with AI-assisted editing",
    href: "/product/timeline",
    color: "tertiary",
  },
  {
    icon: <Zap size={18} />,
    title: "Instant Render",
    desc: "Export in 4K in a fraction of the usual time",
    href: "/product/render",
    color: "accent",
  },
];

/* =====================================================
   MAIN NAVIGATION
===================================================== */

const NAV_LINKS = [
  { label: "Product", type: "dropdown" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Showcase", href: "/showcase" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  /* =====================================================
     SCROLL STATE
  ===================================================== */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =====================================================
     CLOSE MENUS ON ROUTE CHANGE
  ===================================================== */

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
    setMobileProductOpen(false);
  }, [location.pathname]);

  /* =====================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  ===================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =====================================================
     CLOSE DESKTOP DROPDOWN WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    const onClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProductOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setProductOpen(false);
        setMobileOpen(false);
        setMobileProductOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const toggleMobile = useCallback(() => {
    setMobileOpen((current) => !current);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileProductOpen(false);
  }, []);

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}
      >
        <div className="hdr__inner">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="hdr__logo"
            aria-label="ReelCraft home"
            onClick={closeMobile}
          >
            <span className="hdr__logo-mark">
              <Film
                size={20}
                strokeWidth={2.4}
              />

              <Sparkles
                size={11}
                className="hdr__logo-spark"
                strokeWidth={3}
              />
            </span>

            <span className="hdr__logo-text">
              Reel
              <span className="hdr__logo-accent">
                Craft
              </span>
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            className="hdr__nav"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((item) =>
              item.type === "dropdown" ? (
                <div
                  key={item.label}
                  className="hdr__dropdown-wrap"
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    className={`hdr__link hdr__link--trigger ${
                      productOpen ? "is-open" : ""
                    }`}
                    onClick={() =>
                      setProductOpen((current) => !current)
                    }
                    aria-expanded={productOpen}
                    aria-haspopup="true"
                    aria-controls="product-menu"
                  >
                    {item.label}

                    <ChevronDown
                      size={15}
                      className="hdr__chevron"
                      strokeWidth={2.5}
                    />
                  </button>

                  <div
                    id="product-menu"
                    className={`hdr__dropdown ${
                      productOpen
                        ? "hdr__dropdown--open"
                        : ""
                    }`}
                    role="menu"
                  >
                    <div className="hdr__dropdown-grid">
                      {PRODUCT_LINKS.map((product) => (
                        <Link
                          key={product.title}
                          to={product.href}
                          className={`hdr__dropdown-item hdr__dropdown-item--${product.color}`}
                          role="menuitem"
                          onClick={() =>
                            setProductOpen(false)
                          }
                        >
                          <span className="hdr__dropdown-icon">
                            {product.icon}
                          </span>

                          <span className="hdr__dropdown-body">
                            <strong>
                              {product.title}
                            </strong>

                            <span>
                              {product.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="hdr__dropdown-footer">
                      <Link
                        to="/product"
                        className="hdr__dropdown-cta"
                        onClick={() =>
                          setProductOpen(false)
                        }
                      >
                        <span>
                          See everything ReelCraft can do
                        </span>

                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`hdr__link ${
                    location.pathname === item.href
                      ? "is-active"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="hdr__actions">
            <Link
              to="/showcase"
              className="hdr__watch-link"
            >
              <span className="hdr__watch-icon">
                <Play
                  size={11}
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>

              <span className="hdr__watch-label">
                Watch demo
              </span>
            </Link>

            {/* Marketing CTA — no authentication */}
            <Link
              to="/product"
              className="hdr__cta"
            >
              <Sparkles
                size={15}
                strokeWidth={2.4}
              />

              <span>Explore ReelCraft</span>
            </Link>

            {/* Mobile menu */}
            <button
              type="button"
              className="hdr__burger"
              onClick={toggleMobile}
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <aside
        id="mobile-navigation"
        className={`hdr__mobile ${
          mobileOpen ? "hdr__mobile--open" : ""
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="hdr__mobile-scroll">
          {/* Product */}
          <button
            type="button"
            className="hdr__mobile-item hdr__mobile-item--trigger"
            onClick={() =>
              setMobileProductOpen((current) => !current)
            }
            aria-expanded={mobileProductOpen}
          >
            <span>Product</span>

            <ChevronDown
              size={18}
              className={`hdr__chevron ${
                mobileProductOpen ? "is-flipped" : ""
              }`}
            />
          </button>

          {/* Product submenu */}
          <div
            className={`hdr__mobile-sub ${
              mobileProductOpen
                ? "hdr__mobile-sub--open"
                : ""
            }`}
          >
            {PRODUCT_LINKS.map((product) => (
              <Link
                key={product.title}
                to={product.href}
                className="hdr__mobile-sub-item"
                onClick={closeMobile}
              >
                <span
                  className={`hdr__dropdown-icon hdr__dropdown-icon--${product.color}`}
                >
                  {product.icon}
                </span>

                <span className="hdr__mobile-sub-content">
                  <strong>{product.title}</strong>

                  <span>{product.desc}</span>
                </span>
              </Link>
            ))}

            <Link
              to="/product"
              className="hdr__mobile-product-link"
              onClick={closeMobile}
            >
              <span>View all product features</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Standard navigation */}
          {NAV_LINKS.filter(
            (link) => link.type !== "dropdown"
          ).map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`hdr__mobile-item ${
                location.pathname === item.href
                  ? "is-active"
                  : ""
              }`}
              onClick={closeMobile}
            >
              {item.label}
            </Link>
          ))}

          <div className="hdr__mobile-divider" />

          {/* Marketing-only actions */}
          <Link
            to="/showcase"
            className="hdr__mobile-demo"
            onClick={closeMobile}
          >
            <span className="hdr__mobile-demo-icon">
              <Play
                size={12}
                fill="currentColor"
                strokeWidth={0}
              />
            </span>

            Watch demo
          </Link>

          <Link
            to="/product"
            className="hdr__cta hdr__cta--mobile"
            onClick={closeMobile}
          >
            <Sparkles
              size={16}
              strokeWidth={2.4}
            />

            Explore ReelCraft
          </Link>
        </div>
      </aside>

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {mobileOpen && (
        <button
          type="button"
          className="hdr__backdrop"
          aria-label="Close navigation menu"
          onClick={closeMobile}
        />
      )}
    </>
  );
}