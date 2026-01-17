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
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Trigger loader on EVERY route change
  useEffect(() => {
    setLoading(true);

    // We scroll to top immediately when path changes
    window.scrollTo(0, 0);

    // If it's not the first load, we make the loader faster (transition mode)
    // If you want it to wait for specific data, you can pass a prop to Loader
  }, [location.pathname]);

  const handleLoadingFinished = () => {
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      {/* Key is essential here: it forces React to re-mount the loader 
         component on every path change, triggering the animation.
      */}
      {loading && (
        <Loader
          key={location.pathname}
          onLoadingComplete={handleLoadingFinished}
          isTransition={!!sessionStorage.getItem("vf-intro")}
        />
      )}

      <ScrollToTop />
      <Header />
      <main className={loading ? "content-hidden" : "content-fade-in"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;