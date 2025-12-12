
// src/components/Button.jsx
import "../styles/components/button.css";
import "../styles/theme.css";

function Button({ children, onClick, type = "button", variant = "primary", disabled = false }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
