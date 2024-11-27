import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Recursive Dropdown Component
function CategoryDropdown({ category }) {
  const navigate = useNavigate();
  const [catename, setCatename] = useState();
  const hasChildren = category.children && category.children.length > 0;
  const categoryProduct = (item) => {
    setCatename(item);
    navigate(`category/${item.name}/`, { state: { catename: item } });
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
          {category.name}
        </span>
      )}
    </li>
  );
}

// Root Component for Categories Menugg
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
