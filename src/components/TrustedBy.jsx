// src/components/TrustedBy.jsx


// src/components/TrustedBy.jsx
// src/components/TrustedBy.jsx
// src/components/TrustedBy.jsx
// src/components/TrustedBy.jsx
import { 
  SiSamsung, SiMercedes, SiNike, SiNetflix, 
  SiAdidas, SiApple, SiSony, SiHonda 
} from "react-icons/si";
import "../styles/components/trustedby.css";

const brandIcons = [
  { icon: <SiSamsung />, name: "Samsung" },
  { icon: <SiSony />, name: "Sony" },
  { icon: <SiMercedes />, name: "Mercedes" },
  { icon: <SiNike />, name: "Nike" },
  { icon: <SiNetflix />, name: "Netflix" },
  { icon: <SiAdidas />, name: "Adidas" },
  { icon: <SiHonda />, name: "Honda" },
  { icon: <SiApple />, name: "Apple" },
];

const TrustedBy = () => {
  return (
    <section className="trusted-signature-section">
      <div className="trusted-inner">
        
        {/* Centered Header: Elegant & Minimal */}
        <header className="trusted-header-centered">
          <span className="trusted-tag-minimal">Collaborations</span>
          <h2 className="trusted-title-elegant">Global Network</h2>
        </header>

        {/* Full Width Ticker: Cinematic & Endless */}
        <div className="trusted-ticker-viewport">
          <div className="ticker-track">
            {/* Double the array for seamless loop */}
            {[...brandIcons, ...brandIcons, ...brandIcons].map((brand, i) => (
              <div key={i} className="ticker-item">
                <div className="ticker-icon-wrap">
                  {brand.icon}
                </div>
                <span className="ticker-brand-name">{brand.name}</span>
              </div>
            ))}
          </div>
          
          {/* Edge Blurs for the Glassmorphism feel */}
          <div className="ticker-mask-left"></div>
          <div className="ticker-mask-right"></div>
        </div>
        
        <p className="trusted-footer-note">
          Delivering high-fidelity editorial for the world's most ambitious narratives.
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;