
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Eye,
  EyeOff,
  Fingerprint,
  Layers,
  Lock,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import "../styles/pages/adminlogin.css";

/* ================================================================
   DATA — the four disciplines, shown as an ambient system readout
   on the brand panel. Keeps this screen visually tied to the
   public site's Capabilities section without duplicating copy.
================================================================ */

const DISCIPLINES = [
  { icon: Compass, label: "Strategy" },
  { icon: Fingerprint, label: "Brand Identity" },
  { icon: MessageSquare, label: "Communication" },
  { icon: Layers, label: "Digital Experiences" },
];

const MAX_ATTEMPTS = 5;
const LOCK_REDIRECT_SECONDS = 6;

export default function AdminLogin() {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [view, setView] = useState("gate"); // gate | form | locked
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatus] = useState("idle"); // idle | verifying | granted
  const [error, setError] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(LOCK_REDIRECT_SECONDS);

  const remainingAttempts = Math.max(MAX_ATTEMPTS - attempts, 0);

  /* ============================================================
     ENTRANCE
  ============================================================ */

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* ============================================================
     LOCKDOWN COUNTDOWN
  ============================================================ */

  useEffect(() => {
    if (view !== "locked") return;

    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [view, countdown, navigate]);

  /* ============================================================
     AUTH — Firebase logic unchanged
  ============================================================ */

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("verifying");

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      const credential = await signInWithEmailAndPassword(auth, sanitizedEmail, password);
      const tokenResult = await credential.user.getIdTokenResult(true);

      if (!tokenResult.claims.admin) {
        setError("This account does not have admin access.");
        await auth.signOut();
        setStatus("idle");
        return;
      }

      setStatus("granted");

      setTimeout(() => {
        navigate("/admin-upload");
      }, 850);
    } catch (err) {
      console.error(err);

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= MAX_ATTEMPTS) {
        setView("locked");
      } else {
        setError("We couldn't verify those credentials.");
      }

      setStatus("idle");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setError("");
      setStatus("reset-sent");
    } catch (err) {
      console.error(err);
      setError("We couldn't send a reset link to that address.");
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className={`admin-auth theme-dark ${mounted ? "is-mounted" : ""}`} data-theme="dark">
      {/* ==========================================================
          LAYOUT — two-column cinematic split
      ========================================================== */}

      <div className="admin-auth__grid">
        {/* ========================================================
            BRAND PANEL (left)
        ======================================================== */}

        <aside className="admin-brand" aria-hidden="true">
          <div className="admin-brand__mesh" />
          <div className="admin-brand__glow admin-brand__glow--one" />
          <div className="admin-brand__glow admin-brand__glow--two" />

          <div className="admin-brand__particles">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="admin-brand__particle"
                style={{
                  left: `${8 + i * 9}%`,
                  animationDelay: `${i * 0.9}s`,
                  animationDuration: `${10 + (i % 4)}s`,
                }}
              />
            ))}
          </div>

          <div className="admin-brand__content">
            <div className="admin-brand__top">
              <span className="admin-brand__mark">BIG DAY</span>
              <span className="admin-brand__system mono">System / Operations</span>
            </div>

            <div className="admin-brand__statement">
              <h1>Turning complex ideas into clear experiences.</h1>
              <p>
                Internal management platform for strategy, brand,
                communication, and digital experiences.
              </p>
            </div>

            <div className="admin-brand__disciplines">
              {DISCIPLINES.map((item) => {
                const Icon = item.icon;
                return (
                  <span className="admin-brand__discipline glass" key={item.label}>
                    <Icon size={14} strokeWidth={1.8} />
                    {item.label}
                  </span>
                );
              })}
            </div>

            <div className="admin-brand__meta">
              <div className="admin-brand__meta-row">
                <span>System</span>
                <strong>Big Day Operations</strong>
              </div>
              <div className="admin-brand__meta-row">
                <span>Version</span>
                <strong className="mono">2026.1</strong>
              </div>
              <div className="admin-brand__meta-row">
                <span>Status</span>
                <strong className="admin-brand__status">
                  <span className="admin-brand__status-dot" />
                  Secure Connection
                </strong>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================
            AUTHENTICATION PANEL (right)
        ======================================================== */}

        <section className="admin-panel">
          <div className="admin-panel__inner">
            {/* ======================================================
                ENTRY GATE
            ====================================================== */}

            {view === "gate" && (
              <div className="admin-card glass admin-card--gate">
                <span className="eyebrow admin-card__eyebrow">Restricted Access</span>

                <h2 className="admin-card__title">Authorized team members only.</h2>

                <p className="admin-card__text">
                  This environment is reserved for authorized Big Day team
                  members.
                </p>

                <button type="button" className="btn btn-primary btn-lg admin-card__cta" onClick={() => setView("form")}>
                  Continue Authentication
                  <ArrowRight size={16} strokeWidth={2} />
                </button>

                <Link to="/" className="admin-card__back-link">
                  <ArrowLeft size={14} strokeWidth={1.8} />
                  Back to Public Site
                </Link>
              </div>
            )}

            {/* ======================================================
                LOGIN FORM
            ====================================================== */}

            {view === "form" && (
              <div className="admin-card glass admin-card--form">
                <button
                  type="button"
                  className="admin-card__nav-back"
                  onClick={() => {
                    setView("gate");
                    setError("");
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={1.8} />
                  Back
                </button>

                <div className="admin-card__status-badge">
                  <ShieldCheck size={13} strokeWidth={1.8} />
                  Authentication Required
                </div>

                <h2 className="admin-card__title admin-card__title--form">Secure sign in.</h2>

                {error && <div className="admin-alert">{error}</div>}

                {status === "reset-sent" && (
                  <div className="admin-alert admin-alert--success">
                    Recovery link sent — check your inbox.
                  </div>
                )}

                <form className="admin-form" onSubmit={handleLogin} noValidate>
                  <div className="admin-field">
                    <label htmlFor="admin-email">Email Address</label>
                    <input
                      id="admin-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@bigday.studio"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="admin-field">
                    <div className="admin-field__label-row">
                      <label htmlFor="admin-password">Password</label>
                      <button type="button" className="admin-field__forgot" onClick={handleForgotPassword}>
                        Forgot password?
                      </button>
                    </div>

                    <div className="admin-field__password">
                      <input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />

                      <button
                        type="button"
                        className="admin-field__toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={17} strokeWidth={1.8} /> : <Eye size={17} strokeWidth={1.8} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg admin-form__submit ${status === "verifying" ? "is-loading" : ""} ${status === "granted" ? "is-granted" : ""}`}
                    disabled={status === "verifying" || status === "granted"}
                  >
                    {status === "verifying" && "Verifying Identity…"}
                    {status === "granted" && "Access Granted"}
                    {status === "idle" && "Sign In"}
                  </button>

                  <div className="admin-form__footer mono">
                    <Lock size={12} strokeWidth={1.8} />
                    Secure session · {remainingAttempts} attempt{remainingAttempts === 1 ? "" : "s"} remaining
                  </div>
                </form>
              </div>
            )}

            {/* ======================================================
                LOCKED STATE
            ====================================================== */}

            {view === "locked" && (
              <div className="admin-card glass admin-card--locked">
                <span className="admin-card__lock-icon">
                  <ShieldAlert size={30} strokeWidth={1.6} />
                </span>

                <h2 className="admin-card__title">Access temporarily locked.</h2>

                <p className="admin-card__text">
                  Too many failed attempts. For security, this session has
                  been suspended.
                </p>

                <div className="admin-card__countdown">
                  <span className="mono">{String(countdown).padStart(2, "0")}</span>
                  <span>Redirecting to the public site…</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}