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
      // Safety: Strip lock if returning to site
      document.body.classList.remove("loader-active-lock");
      document.body.style.overflow = "visible";
    }
  }, []);

  const handleLoadingFinished = () => {
    setIntroDone(true);
    sessionStorage.setItem("vf-intro", "1");
  };

  return (
    <div className="page-wrapper">
      {!introDone && <Loader onLoadingComplete={handleLoadingFinished} />}

      <ScrollToTop />
      <Header />
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;