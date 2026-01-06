// src/components/TrustedBy.jsx


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
    <div className="trusted-micro-bar">
      <div className="micro-container">
        {/* Low-profile label */}
        <span className="micro-label">Trusted By</span>
        
        <div className="micro-ticker-viewport">
          <div className="micro-track">
            {[...brandIcons, ...brandIcons].map((brand, i) => (
              <div key={i} className="micro-item">
                {brand.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;