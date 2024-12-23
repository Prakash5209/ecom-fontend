import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import {
  PackageOpen,
  Ruler,
  Palette,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import axios from "axios";
import { addToCart } from "../rdx/slice/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [stockValue, setStockValue] = useState(1);

  const currentUrl = window.location.href.split("/");
  const currentValue = currentUrl[currentUrl.length - 1];

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product-detail/${currentValue}`,
        );
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductInfo();
  }, [currentValue]);

  const handleStockDecrease = () => {
    setStockValue((prev) => Math.max(1, prev - 1));
  };

  const handleStockIncrease = () => {
    setStockValue((prev) => Math.min(detail.stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (detail.product_color.length > 0 && !color) {
      alert("Please select a color");
      return;
    }
    if (detail.product_size.length > 0 && !size) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      product: detail.id,
      quantity: stockValue,
      color,
      size,
    };

    dispatch(addToCart(cartItem));
  };

  if (!detail) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 shadow-lg"></div>
      </div>
    );
  }

  console.log(detail);
  const safeDescription = DOMPurify.sanitize(detail.description);

  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="w-full mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden h-auto">
        <div className="grid md:grid-cols-2 gap-8 p-8 w-full">
          {/* Product Image */}

          <div className="bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner h-4/5">
            <div className="w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={
                    detail.productmodel_image[0]?.image ||
                    "https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
                  }
                  alt={detail.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight flex items-center">
              <PackageOpen className="mr-4 text-blue-600" />
              {detail.title}
            </h1>

            <div className="bg-gray-100 rounded-lg p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Palette className="mr-2 text-blue-500" />
                  Category: {detail.category.name}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${
                    detail.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <PackageOpen className="mr-2" />
                  {detail.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  NPR {detail.price}
                </span>
                <span className="text-sm text-gray-600 flex items-center">
                  <Ruler className="mr-2 text-blue-500" />
                  Total Stock: {detail.stock}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            {detail.product_color.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Palette className="mr-2 text-blue-600" />
                  Select Color
                </h3>
                <div className="flex space-x-3">
                  {detail.product_color.map((col) => (
                    <button
                      key={col.id}
                      onClick={() =>
                        setColor(color === col.color ? null : col.color)
                      }
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center ${
                        color === col.color
                          ? "bg-green-500 text-white border-green-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: col.color }}
                      ></span>
                      {col.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {detail.product_size.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Ruler className="mr-2 text-blue-600" />
                  Select Size
                </h3>
                <div className="flex space-x-3">
                  {detail.product_size.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setSize(size === item.size ? null : item.size)
                      }
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                        size === item.size
                          ? "bg-green-500 text-white border-green-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={handleStockDecrease}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={stockValue <= 1}
                >
                  <Minus className="text-gray-600" />
                </button>
                <input
                  type="number"
                  value={stockValue}
                  min="1"
                  max={detail.stock}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setStockValue(Math.min(Math.max(val, 1), detail.stock));
                  }}
                  className="w-16 text-center border-x-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleStockIncrease}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={stockValue >= detail.stock}
                >
                  <Plus className="text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="mr-2" />
                <span className="font-semibold">Add to Cart</span>
              </button>

              <button
                // onClick={handleAddToCart}
                className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="mr-2" />
                <span className="font-semibold">Buy now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <PackageOpen className="mr-3 text-blue-600" />
            Product Description
          </h2>
          <div
            className="text-gray-700 prose max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: safeDescription }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
