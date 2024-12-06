import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";

const Product = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const clickedCategory = location.state?.catename;

  // slider necessary component start
  function valuetext(value) {
    return `${value}°C`;
  }
  const [value2, setValue2] = useState([20, 37]);

  const minDistance = 10;
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };
  // slider necessary component end

  const NavigateproductDetail = (slug) => {
    navigate(`/P/${slug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!clickedCategory) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/category-product/${clickedCategory.name}/`,
        );
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clickedCategory]);

  const ProductCard = ({ item, onNavigate }) => (
    <div
      className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => onNavigate(item.slug)}
    >
      <div className="relative">
        <img
          src={
            item.image ||
            "https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
          }
          alt={item.title}
          className="w-full h-48 object-cover"
        />

        {/* heart and cart button */}
        {/* <div className="absolute top-2 right-2 flex space-x-2">
          <button className="bg-white/50 rounded-full p-2 hover:bg-white">
            <Heart className="text-gray-600 w-5 h-5" />
          </button>
          <button className="bg-white/50 rounded-full p-2 hover:bg-white">
            <ShoppingCart className="text-gray-600 w-5 h-5" />
          </button>
        </div> */}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
          {item.title.length > 60
            ? `${item.title.slice(0, 55)}...`
            : item.title}
        </h3>
        <div className="flex justify-between items-center">
          <Typography variant="subtitle2" className="text-gray-700">
            ${item.price}
          </Typography>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="col-span-2 p-4 border-r-2">
        <span className="text-lg mb-4">Categories:</span>
        <p className="">{clickedCategory?.name || "Products"}</p>
        {/* Add category list or filter options here */}
        <br />
        <div className="border p-2 rounded">
          <p>Select price range</p>
          <Slider
            getAriaLabel={() => "Minimum distance shift"}
            value={value2}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
          <p>
            Min:{value2[0]} Max:{value2[1]}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-10 p-4">
        {productList.length === 0 ? (
          <div className="text-center text-gray-500">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productList.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onNavigate={NavigateproductDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
