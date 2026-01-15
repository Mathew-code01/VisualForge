// src/context/useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  // SAFETY: If context is missing, return a default loading state instead of crashing
  if (!context) {
    return { user: null, isAdmin: false, loading: true };
  }
  return context;
};