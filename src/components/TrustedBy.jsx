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
    <section className="trusted-section-standard">
      <div className="trusted-container">
        <div className="trusted-header-v2">
          <h3 className="trusted-title">Strategic Partnerships</h3>
          <p className="trusted-subtitle">Driving innovation for the world's leading brands.</p>
        </div>

        <div className="marquee-wrapper-elite">
          <div className="marquee-track">
            {/* Triple the icons for high-speed screen coverage and ultra-smooth loop */}
            {[...brandIcons, ...brandIcons, ...brandIcons].map((brand, i) => (
              <div key={i} className="brand-box">
                <div className="brand-icon-wrapper">
                  {brand.icon}
                </div>
              </div>
            ))}
          </div>
          {/* Edge gradients for cinematic depth */}
          <div className="marquee-fade-left"></div>
          <div className="marquee-fade-right"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;