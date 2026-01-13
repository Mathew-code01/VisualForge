// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("vf-intro");
    if (alreadySeen) {
      setIntroDone(true);
    }
  }, []);

  const handleLoadingFinished = () => {
    setIntroDone(true);
    sessionStorage.setItem("vf-intro", "1");
  };

  return (
    <>
      {/* This loader waits for the initial site load + video background */}
      {!introDone && (
        <Loader onLoadingComplete={handleLoadingFinished} />
      )}

      <ScrollToTop />
      <Header />
      {/* We add a key to main to trigger re-renders on route change if needed */}
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;