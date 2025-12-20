// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { MdOutlineMovieFilter, MdWest } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/pages/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-root">
      <Header />

      {/* Cinematic Background Ambiance */}
      <div className="notfound-ambient-overlay" />

      <main className="notfound-content">
        <div className="notfound-visual-container">
          <MdOutlineMovieFilter className="notfound-icon" />
          <div className="glitch-wrapper">
            <h1 className="notfound-code" data-text="404">
              404
            </h1>
          </div>
        </div>

        <section className="notfound-text-block">
          <h2 className="notfound-title">Scene Not Found</h2>
          <p className="notfound-desc">
            The sequence you're looking for was either moved, deleted, or never
            made it to the final cut.
          </p>

          <div className="notfound-actions">
            <Link to="/" className="back-home-cta">
              <MdWest /> <span>Return to Home</span>
            </Link>
            <Link to="/work" className="secondary-cta">
              Browse Portfolio
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}