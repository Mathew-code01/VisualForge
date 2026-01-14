// src/components/ProtectedRouteWrapper.jsx
import React from "react";
import { useAuth } from "../context/useAuth";
import ProtectedRoute from "./ProtectedRoute";

export default function ProtectedRouteWrapper({ children }) {
  const { isAdmin, loading } = useAuth(); // Assuming your context has a loading state

  if (loading) return null; // Or a high-end spinner/loader

  // 🔒 PRODUCTION READY: No more devBypass
  return <ProtectedRoute isAdmin={isAdmin}>{children}</ProtectedRoute>;
}