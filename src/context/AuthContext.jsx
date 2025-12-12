// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = window.firebaseAuth;

    const unsubscribe = window.firebaseOnAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          setUser(user);

          const tokenResult = await user.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
