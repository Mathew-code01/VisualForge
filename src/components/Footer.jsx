// src/components/Footer.jsx
// src/components/Footer.jsx
// src/components/Footer.jsx
import "../styles/components/footer.css";

function Footer() {
  return (
    <footer className="nf-footer">

      <div className="nf-footer-content">

        {/* Footer Links (Netflix style grid) */}
        <ul className="nf-footer-links">
          <li><a href="/work">Work</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>

        {/* Small Credits */}
        <p className="nf-footer-credit">
          © {new Date().getFullYear()} VisualForge — All rights reserved.
        </p>
        <small className="nf-footer-madeby">
          Crafted with care by Larry K.
        </small>
      </div>

    </footer>
  );
}

export default Footer;
