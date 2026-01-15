// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
import { createContext, useEffect, useState, useCallback } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Professional Logout Function ---
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      window.location.href = "/admin-login"; // Hard redirect to clear any states
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        try {
          const tokenResult = await currentUser.getIdTokenResult(true);
          setIsAdmin(!!tokenResult.claims.admin);
        } catch (error) {
          console.log(error)
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setTimeout(() => setLoading(false), 400);
    });

    return () => unsubscribe();
  }, []);

  // --- Session Timeout Logic ---
  useEffect(() => {
    if (!isAdmin) return;

    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      // Auto logout after 15 minutes of inactivity
      timeout = setTimeout(() => {
        alert("Session expired due to inactivity.");
        logout();
      }, 15 * 60 * 1000);
    };

    // Events that reset the timer
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer(); // Start timer on mount

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      clearTimeout(timeout);
    };
  }, [isAdmin, logout]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };