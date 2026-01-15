// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  Eye,
  EyeOff,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Lock,
} from "lucide-react";
import "../styles/pages/adminlogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [view, setView] = useState("gate"); // gate | form | locked
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Security Logic States
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(6);

  const MAX_ATTEMPTS = 5;
  const remainingAttempts = MAX_ATTEMPTS - attempts;

  useEffect(() => {
    if (view !== "locked") return;
    if (countdown === 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [view, countdown, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      const res = await signInWithEmailAndPassword(
        auth,
        sanitizedEmail,
        password
      );
      const tokenResult = await res.user.getIdTokenResult(true);

      if (!tokenResult.claims.admin) {
        setError("IDENTITY_MISMATCH: ACCESS_DENIED");
        await auth.signOut();
        setLoading(false);
        return;
      }

      setTimeout(() => {
        navigate("/admin-upload");
      }, 800);
    } catch (err) {
      console.log(err)
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setView("locked");
      } else {
        setError(`SEC_ERROR: UNAUTHORIZED_ACCESS_DETECTED`);
      }
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("INPUT_REQUIRED: EMAIL");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setError("RECOVERY_LINK_DISPATCHED");
    } catch (err) {
      console.log(err)
      setError("RECOVERY_FAILED");
    }
  };

  return (
    <div className="admin-master-container">
      {/* --- HERO SIDE: THE MOTION CANVAS --- */}
      <div className="admin-hero-side">
        <div className="hero-content-wrapper">
          <div className="hero-node-id">CENTRAL_MANAGEMENT_NODE</div>
          <h2 className="hero-display-title">BigDay Media Agency</h2>
          <p className="hero-minimal-tagline">
            Visual Excellence Built for Impact.
          </p>
        </div>
        {/* Animated Background Element */}
        <div className="hero-mesh-gradient-sphere"></div>
      </div>

      {/* --- ACTION SIDE: THE CONTROL INTERFACE --- */}
      <div className="admin-action-side">
        <div className="form-ux-wrapper">
          {/* VIEW: GATE SCREEN (Initial Entry) */}
          {view === "gate" && (
            <div className="gate-screen-container gate-fade-in">
              <div className="gate-technical-id">SESSION_AUTH_01</div>
              <h1 className="gate-main-heading">Restricted Area</h1>
              <p className="gate-sub-heading">
                BigDay Media Central Management
              </p>

              <div className="gate-interaction-group">
                <button
                  className="btn-elite-action-primary"
                  onClick={() => setView("form")}
                >
                  <span className="btn-text">Enter Credentials</span>
                  <ArrowRight className="btn-icon-right" size={20} />
                </button>

                <Link to="/" className="btn-return-public-link">
                  <ExternalLink className="link-icon" size={14} />
                  <span className="link-text">Back to Public Site</span>
                </Link>
              </div>
            </div>
          )}

          {/* VIEW: LOGIN FORM SCREEN */}
          {view === "form" && (
            <div className="login-interface-container interface-fade-in">
              <button
                className="btn-navigation-back"
                onClick={() => setView("gate")}
              >
                <ArrowLeft className="nav-icon" size={16} />
                <span className="nav-text">BACK</span>
              </button>

              <div className="interface-header-block">
                <div className="ux-status-badge">
                  <ShieldCheck className="badge-icon" size={14} />
                  <span className="badge-text">AUTHORIZED_ACCESS</span>
                </div>
                <h2 className="interface-title-large">Secure Environment</h2>
              </div>

              {error && <div className="interface-error-log">{error}</div>}

              <form onSubmit={handleLogin} className="interface-form-element">
                {/* Email Input Group */}
                <div className="interface-input-group email-group">
                  <div className="input-label-row">
                    <label className="input-label-text">IDENTITY_MAIL</label>
                  </div>
                  <input
                    className="interface-text-input"
                    type="email"
                    placeholder="admin@bigday.media"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input Group */}
                <div className="interface-input-group password-group">
                  <div className="input-label-row">
                    <label className="input-label-text">SECURITY_KEY</label>
                    <span
                      onClick={handleForgotPassword}
                      className="btn-interface-recover"
                    >
                      RECOVER?
                    </span>
                  </div>
                  <div className="password-input-relative-container">
                    <input
                      className="interface-text-input password-input"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-password-visibility-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-elite-submit-primary"
                  disabled={loading}
                >
                  <span className="submit-btn-text">
                    {loading ? "VERIFYING_IDENTITY..." : "GRANT ACCESS"}
                  </span>
                </button>

                {/* Footer Security Status */}
                <div className="interface-security-footer">
                  <Lock className="footer-lock-icon" size={12} />
                  <span className="footer-status-text">
                    SYSTEM_STATUS: SECURE | REM_ATTEMPTS: 0{remainingAttempts}
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* VIEW: LOCKDOWN SCREEN */}
          {view === "locked" && (
            <div className="lockdown-screen-container lockdown-critical-anim">
              <ShieldAlert className="lockdown-icon-alert" size={64} />
              <h1 className="lockdown-title">System Lockdown</h1>
              <p className="lockdown-description">
                Security protocol active. Redirecting in {countdown}s
              </p>
              <div className="lockdown-timer-display">0{countdown}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}