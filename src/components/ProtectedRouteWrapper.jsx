// src/components/ProtectedRouteWrapper.jsx
import React from "react";
import { useAuth } from "../context/useAuth";
import ProtectedRoute from "./ProtectedRoute";

export default function ProtectedRouteWrapper({ children }) {
  const { isAdmin } = useAuth();

  // ================================================
  // ⚠️ DEV BYPASS — REMOVE IN PRODUCTION
  // If the URL contains ?dev=1 OR localStorage flag,
  // treat user as admin even without Firebase.
  // ================================================
  const devBypass =
    window.location.search.includes("dev=1") ||
    localStorage.getItem("dev-admin") === "true";

  if (devBypass) return children;
  // ================================================

  return <ProtectedRoute isAdmin={isAdmin}>{children}</ProtectedRoute>;
}
