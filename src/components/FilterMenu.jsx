// src/components/FilterMenu.jsx

import "../styles/components/filtermenu.css";
import "../styles/theme.css";

function FilterMenu({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-menu">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selectedCategory === cat ? "active" : ""}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterMenu;
