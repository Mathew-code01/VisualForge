// src/pages/Work.jsx

// src/pages/Work.jsx

import WorkHero from "../components/work/WorkHero";
import FeaturedWork from "../components/work/FeaturedProject";
import "../styles/pages/work.css";

const Work = () => {
  return (
    <main className="work-page-main">
      <WorkHero />
      <FeaturedWork />
    </main>
  );
};

export default Work;

