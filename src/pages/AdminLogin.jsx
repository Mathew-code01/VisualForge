// src/pages/AdminLogin.jsx
// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import "../styles/pages/adminlogin.css";
import { Eye, EyeOff, UserCheck, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [showGate, setShowGate] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [countdown, setCountdown] = useState(6);

  // Redirect timer after lock
  useEffect(() => {
    if (!locked) return;

    if (countdown === 0) {
      window.location.href = "/";
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [locked, countdown]);

  // -----------------------------
  // ⚡ LOGIN HANDLER
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (locked) return;

    setError("");
    setLoading(true);

    // ==============================
    // ⚠️ DEVELOPMENT BYPASS
    // Skip Firebase completely
    // ==============================
    if (password.includes("admin")) {
      localStorage.setItem("dev-admin", "true");
      window.location.href = "/admin-upload?dev=1";
      return;
    }

    // ==============================
    // REAL LOGIN (kept for later)
    // ==============================
    try {
      const res = await window.firebaseSignIn(
        window.firebaseAuth,
        email,
        password
      );

      const token = await res.user.getIdTokenResult();

      if (!token.claims.admin) {
        setError("ACCESS DENIED — You are not registered as an Admin.");
        setLoading(false);
        return;
      }

      window.location.href = "/admin-upload";
    } catch (err) {
      console.log(err);
      setAttempts((prev) => prev + 1);
      setError("Invalid email or password.");

      if (attempts + 1 >= 5) {
        setLocked(true);
      }
    }

    setLoading(false);
  };


  // -----------------------------
  // ⚡ ADMIN GATE SCREEN
  // -----------------------------
  if (showGate) {
    return (
      <div className="admin-gate-container">
        <div className="admin-gate-box">
          <UserCheck size={80} className="gate-icon" />
          <h1 className="gate-title">Admin Verification</h1>
          <p className="gate-subtitle">Are you an authorized administrator?</p>

          <div className="gate-buttons">
            <button className="yes-btn" onClick={() => setShowGate(false)}>
              Yes, Continue
            </button>

            <button className="no-btn" onClick={() => (window.location.href = "/")}>
              No, Take Me Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // ⚡ LOCKED STATE UI
  // -----------------------------
  if (locked) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box lock-box">
          <ShieldAlert size={80} className="lock-icon" />
          <h2>Too Many Attempts</h2>
          <p>You will be redirected to the homepage in {countdown} seconds.</p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // ⚡ MAIN LOGIN FORM
  // -----------------------------
  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        {/* LOGO AREA */}
        <div className="admin-login-logo">
          <div className="logo-circle"></div>
          <h1>Admin Panel</h1>
          <p className="subtitle">Secure Access • Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="admin-form">
          {error && <p className="error">{error}</p>}

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
              />

              <span
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>

          <p className="attempt-text">
            Attempts left: <strong>{5 - attempts}</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
