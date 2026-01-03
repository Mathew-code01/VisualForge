// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlay } from "react-icons/fi"; // Switched to more "Action" based icons
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/pages/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-root">
      <Header />
      
      <main className="notfound-main">
        {/* Vibrant Accent Orb - Matches the high-end design aesthetic */}
        <div className="notfound-vibrant-orb" />
        
        <div className="notfound-container">
          <div className="notfound-visual">
            <h1 className="notfound-404">404</h1>
            <div className="notfound-line-accent" />
          </div>

          <div className="notfound-text-content">
            <span className="notfound-tagline">Sequence Interrupted</span>
            <h2 className="notfound-title">Scene Not Found.</h2>
            <p className="notfound-description">
              The asset you're looking for either never made the final cut 
              or has been moved to a new directory.
            </p>

            <div className="notfound-actions">
              <Link to="/" className="btn-vibrant">
                <FiArrowLeft /> <span>Return to Index</span>
              </Link>
              <Link to="/work" className="btn-outline">
                <FiPlay /> <span>Explore Archive</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}