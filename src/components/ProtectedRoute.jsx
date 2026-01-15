// src/components/ProtectedRoute.jsx
// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAdmin, children }) {
  // If not an admin, send them back to login, not a dead end 404
  if (!isAdmin) return <Navigate to="/admin-login" replace />;
  return children;
}