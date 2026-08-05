// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Trigger loader on EVERY route change
  useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };
}, []);

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
  onFinish={handleLoadingFinished}
/>
      )}

      <ScrollToTop />
      <SiteHeader />
      <main className={loading ? "content-hidden" : "content-fade-in"}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default MainLayout;