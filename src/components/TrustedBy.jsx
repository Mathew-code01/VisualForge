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
    <section className="trusted-section-split">
      <div className="trusted-container-grid">
        
        {/* Left Side: Fixed Content */}
        <div className="trusted-info-aside">
          {/* Tag size reduced for elegance per saved instructions */}
          <span className="trusted-tag">Selected Collaborations</span>
          <h2 className="trusted-title">Global <br/>Network</h2>
          <p className="trusted-description">
            Editorial partners for the world's most ambitious narratives.
          </p>
        </div>

        {/* Right Side: Marquee */}
        <div className="marquee-viewport-right">
          <div className="marquee-track">
            {[...brandIcons, ...brandIcons].map((brand, i) => (
              <div key={i} className="brand-item" title={brand.name}>
                <div className="brand-icon">
                  {brand.icon}
                </div>
              </div>
            ))}
          </div>
          {/* High-blur masks for sophisticated transitions */}
          <div className="mask-left-overlay"></div>
          <div className="mask-right-overlay"></div>
        </div>

      </div>
    </section>
  );
};

export default TrustedBy;