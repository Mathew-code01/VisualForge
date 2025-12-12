// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
// src/layouts/MainLayout.jsx
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const routerState = useNavigation();
  const [introDone, setIntroDone] = useState(false);

  // Intro Loader — plays once per session
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("vf-intro");

    if (alreadySeen) {
      setIntroDone(true);
      return;
    }

    setTimeout(() => {
      setIntroDone(true);
      sessionStorage.setItem("vf-intro", "1");
    }, 2600); // length of intro animation
  }, []);

  // Route-based loading
  const isRouteLoading = routerState.state === "loading";

  return (
    <>
      {!introDone && <Loader mode="intro" />}
      {introDone && isRouteLoading && <Loader mode="regular" />}

      <ScrollToTop/>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

