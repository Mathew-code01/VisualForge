// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase/config"; // ✅ Corrected Path
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, ShieldAlert, ArrowLeft, ArrowRight } from "lucide-react";
import "../styles/pages/adminlogin.css";

export default function AdminLogin() {
  const [view, setView] = useState("gate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(6);

  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    if (view !== "locked") return;
    if (countdown === 0) {
      window.location.href = "/";
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [view, countdown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (view === "locked") return;

    setError("");
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdTokenResult(true);

      if (!token.claims.admin) {
        setError("ACCESS_DENIED: UNAUTHORIZED_ACCOUNT");
        await auth.signOut();
        setLoading(false);
        return;
      }

      window.location.href = "/admin-upload";
    } catch (err) {
      console.log(err)
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("IDENTITY_MISMATCH: INVALID_CREDENTIALS");
      if (newAttempts >= MAX_ATTEMPTS) setView("locked");
    } finally {
      setLoading(false);
    }
  };

  // 1. GATE VIEW
  if (view === "gate")
    return (
      <div className="admin-page-wrapper">
        <div className="admin-glass-card gate-anim">
          <div className="technical-id">SESSION_AUTH_01</div>
          <h1 className="admin-title">Restricted Area</h1>
          <p className="admin-subtitle">BigDay Media Central Management</p>

          <div className="gate-actions">
            <button
              className="admin-btn-elite-primary"
              onClick={() => setView("form")}
            >
              <span>Enter Credentials</span>
              <ArrowRight size={18} />
            </button>
            <button
              className="btn-elite-link"
              onClick={() => (window.location.href = "/")}
            >
              Back to Public Site
            </button>
          </div>
        </div>
      </div>
    );

  // 2. LOCKED VIEW
  if (view === "locked")
    return (
      <div className="admin-page-wrapper">
        <div className="admin-glass-card lock-anim error-state">
          <ShieldAlert size={48} className="icon-error" />
          <h1 className="admin-title">Lockdown</h1>
          <p className="admin-subtitle">
            Security breach detected. Redirecting to safe zone.
          </p>
          <div className="timer-ring">0{countdown}</div>
        </div>
      </div>
    );

  // 3. FORM VIEW
  return (
    <div className="admin-page-wrapper">
      <div className="admin-glass-card gate-anim">
        <button className="back-nav" onClick={() => setView("gate")}>
          <ArrowLeft size={16} /> <span>Back</span>
        </button>

        <header className="admin-header">
          <h1 className="admin-title">Authorize</h1>
          <p className="admin-subtitle">Secure Encrypted Environment</p>
        </header>

        <form onSubmit={handleLogin} className="admin-form">
          {error && <div className="error-log">{error}</div>}

          <div className="input-group">
            <label>IDENTITY_MAIL</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="administrator@bigday.com"
            />
          </div>

          <div className="input-group">
            <label>SECURITY_KEY</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn-elite-primary"
            disabled={loading}
          >
            {loading ? "VERIFYING..." : "GRANT ACCESS"}
          </button>

          <footer className="form-footer">
            <div className="attempt-counter">
              REM_ATTEMPTS: <span>0{MAX_ATTEMPTS - attempts}</span>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}