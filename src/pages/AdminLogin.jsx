// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { Eye, EyeOff, UserCheck, ShieldAlert, Lock } from "lucide-react";
import "../styles/pages/adminlogin.css";

export default function AdminLogin() {
  const [view, setView] = useState("gate"); // "gate", "form", "locked"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(6);

  const MAX_ATTEMPTS = 5;

  // Handle Redirection when locked
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

    // Development Bypass Logic
    if (password.toLowerCase().includes("admin")) {
      localStorage.setItem("dev-admin", "true");
      window.location.href = "/admin-upload?dev=1";
      return;
    }

    try {
      const res = await window.firebaseSignIn(
        window.firebaseAuth,
        email,
        password
      );
      const token = await res.user.getIdTokenResult();

      if (!token.claims.admin) {
        setError("ACCESS DENIED — Unauthorized Account.");
        setLoading(false);
        return;
      }
      window.location.href = "/admin-upload";
    } catch (err) {
      console.log(err)
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError("Invalid credentials. Access logged.");

      if (newAttempts >= MAX_ATTEMPTS) {
        setView("locked");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Sub-Views ---

  if (view === "gate")
    return (
      <div className="admin-page-wrapper">
        <div className="admin-glass-card gate-anim">
          <UserCheck size={64} className="accent-icon" />
          <h1>Verification</h1>
          <p>Are you an authorized administrator?</p>
          <div className="gate-actions">
            <button className="btn-primary" onClick={() => setView("form")}>
              Yes, Access Panel
            </button>
            <button
              className="btn-outline"
              onClick={() => (window.location.href = "/")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );

  if (view === "locked")
    return (
      <div className="admin-page-wrapper">
        <div className="admin-glass-card lock-anim">
          <ShieldAlert size={64} className="error-icon" />
          <h2 className="text-error">System Lockdown</h2>
          <p>Too many failed attempts. Security protocol initiated.</p>
          <div className="timer-badge">Redirecting in {countdown}s</div>
        </div>
      </div>
    );

  return (
    <div className="admin-page-wrapper">
      <div className="admin-glass-card">
        <header className="admin-header">
          <div className="logo-ring">
            <Lock size={24} />
          </div>
          <h1>Admin Portal</h1>
          <p>Secure Encrypted Session</p>
        </header>

        <form onSubmit={handleLogin} className="admin-form">
          {error && <div className="error-banner">{error}</div>}

          <div className="input-field">
            <label>Identity (Email)</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@visualforge.com"
            />
          </div>

          <div className="input-field">
            <label>Security Key (Password)</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Verifying..." : "Authorize Access"}
          </button>

          <div className="security-footer">
            Attempts Remaining: <span>{MAX_ATTEMPTS - attempts}</span>
          </div>
        </form>
      </div>
    </div>
  );
}