import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Root Component for Categories Menu
function CategoriesMenu({ categories }) {
  return (
    <ul className="flex flex-wrap h-full gap-4">
      {categories.map((category) => (
        <CategoryDropdown key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default CategoriesMenu;

// Recursive Dropdown Component
function CategoryDropdown({ category }) {
  const navigate = useNavigate();
  const hasChildren = category.children && category.children.length > 0;
  const categoryProduct = (item) => {
    navigate(`category/${item.name}/`);
  };

  return (
    <li>
      {hasChildren ? (
        // If the category has children, create a dropdown
        <details>
          <summary>{category.name}</summary>
          <ul>
            {category.children.map((child) => (
              // Recursively render children categories
              <CategoryDropdown key={child.id} category={child} />
            ))}
          </ul>
        </details>
      ) : (
        // If no children, just display the name
        <span
          onClick={() => categoryProduct(category)}
          className="cursor-pointer"
        >
          <p className="text-base">{category.name}</p>
        </span>
      )}
    </li>
  );
}
