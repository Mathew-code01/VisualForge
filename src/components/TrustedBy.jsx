// src/components/TrustedBy.jsx


// src/components/TrustedBy.jsx
import { 
  SiSamsung, 
  SiMercedes, 
  SiNike, 
  SiNetflix, 
  SiAdidas, 
  SiApple,
  SiSony,
  SiHonda 
} from "react-icons/si";
import "../styles/components/trustedby.css";

const TrustedBy = () => {
  // These Si (Simple Icons) are highly stable and consistent
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

  return (
    <div className="trusted-by-section">
      <div className="trusted-header">
        <span className="trusted-label">Global Partners & Collaborations</span>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {/* Spread icons twice for seamless looping */}
          {[...brandIcons, ...brandIcons].map((brand, i) => (
            <div key={i} className="brand-logo-item">
              {brand.icon}
              <span className="brand-name-tooltip">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;