// src/pages/NotFound.jsx
// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import "../styles/pages/notfound.css";
import "../styles/theme.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Header />

      <section className="notfound-page">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>

        <Link to="/" className="back-link">
          ← Go Back Home
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default NotFound;

