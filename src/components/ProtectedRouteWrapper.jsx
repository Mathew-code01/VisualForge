// src/components/ProtectedRouteWrapper.jsx
import React from "react";
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteWrapper({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="admin-page-wrapper"
        style={{ background: "var(--color-bg-alt)" }}
      >
        <div
          className="admin-glass-card"
          style={{
            textAlign: "center",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Pulse now uses brand vibrant blue */}
          <div
            className="auth-pulse"
            style={{ background: "var(--color-secondary-bright)" }}
          ></div>
          <p
            style={{
              color: "var(--color-primary-deep)",
              letterSpacing: "0.3em",
              fontSize: "9px",
              fontWeight: "800",
              marginTop: "30px",
              opacity: 0.8,
              textTransform: "uppercase",
            }}
          >
            Verifying_Identity
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}