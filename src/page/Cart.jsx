import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Trash2,
  Plus,
  Minus,
  Info,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";
import {
  cartFetchData,
  updateCartItem,
  deleteCartItem,
} from "../rdx/slice/cartSlice";

function Cart() {
  // callback request from khalti start

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  console.log("query", queryParams);

  useEffect(() => {
    const khaltiPaymentVerify = async () => {
      const response = await axios.get(
        `http://localhost:8000/checkout/api/khalti-verify?status=${JSON.stringify({ query: queryParams })}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sown_access")}`,
          },
        },
      );
    };
    khaltiPaymentVerify();
  }, []);

  //callback request from khalti end

  const [open, setOpen] = useState(false);
  const [removeid, setRemoveid] = useState(null);
  const [activeInfoTab, setActiveInfoTab] = useState("shipping");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const gotoNavigate = () => {
    navigate("/checkout/");
  };

  const handleUpdateQuantity = (id, newQuantity, operation) => {
    dispatch(
      updateCartItem({
        id,
        quantity: newQuantity,
        operation_status: operation,
      }),
    );
  };

  const removecartitem = (id) => {
    dispatch(deleteCartItem({ id }));
  };

  useEffect(() => {
    dispatch(cartFetchData());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-gray-600 bg-gray-100">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-red-500 bg-red-50">
        Failed to load cart
      </div>
    );
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const renderInfoContent = () => {
    switch (activeInfoTab) {
      case "shipping":
        return (
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Truck className="mr-3 text-blue-500" size={24} />
              Shipping Information
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Free shipping on orders over NRP 5000</li>
              <li>• Estimated delivery: 3-5 business days</li>
              <li>• Tracking available for all orders</li>
              <li>• International shipping options available</li>
            </ul>
          </div>
        );
      case "promo":
        return (
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Tag className="mr-3 text-green-500" size={24} />
              Promo & Discounts
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>🎉 Current Offers:</p>
              <ul className="list-disc pl-5">
                <li>FIRST10: 10% off first purchase</li>
                <li>SUMMER25: 25% off summer collection</li>
                <li>Buy 2, Get 1 Free on selected items</li>
              </ul>
            </div>
          </div>
        );
      case "details":
      default:
        return (
          <div className="p-6 bg-white rounded-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Info className="mr-3 text-purple-500" size={24} />
              Cart Details
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>Total Unique Items: {items.length}</p>
              <p>
                Total Quantity:{" "}
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p>Subtotal: ${Number(totalPrice).toFixed(2)}</p>
              <p>Estimated Tax: ${Number(totalPrice * 0.08).toFixed(2)}</p>
            </div>
          </div>
        );
    }
  };

  console.log("item", items);

  return (
    <div className="bg-gray-50 w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 p-5 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
            <div className="col-span-1">Image</div>
            <div className="col-span-2">Product Detail</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
          </div>

          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 gap-4 p-5 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors group"
            >
              {/* Product Image */}
              <div className="col-span-1">
                <img
                  src={
                    item.product.productmodel_image[0].image ||
                    "/placeholder-image.png"
                  }
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="col-span-2">
                <p className="font-semibold text-lg text-gray-800">
                  {item.product.title}
                </p>
                <p className="text-sm text-gray-500">{item.color}</p>
                <p className="text-sm text-gray-500">{item.size}</p>
              </div>

              {/* Price */}
              <div>
                <p className="text-gray-700 font-medium">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>

              {/* Quantity Control */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        item.quantity + 1,
                        "addition",
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-l-full"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                  <span className="px-4 text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1),
                        "subtract",
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-r-full"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div>
                <p className="font-semibold text-gray-800">
                  ${Number(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Item */}
              <div>
                <button
                  onClick={() => {
                    handleOpen();
                    setRemoveid(item.id);
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary and Information Section */}
        <div className="lg:col-span-1 space-y-8">
          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center">
              <ShoppingCart className="mr-3 text-blue-500" size={24} />
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-700">
                <span>Total Items:</span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div className="flex justify-between items-center text-gray-800 font-bold text-lg border-t pt-4">
                <span>Total Price:</span>
                <span>${Number(totalPrice).toFixed(2)}</span>
              </div>
              <button
                onClick={gotoNavigate}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="bg-gray-100 rounded-lg">
            <div className="flex border-b">
              {["shipping", "promo", "details"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveInfoTab(tab)}
                  className={`flex-1 py-3 font-semibold capitalize ${
                    activeInfoTab === tab
                      ? "bg-white text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {renderInfoContent()}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  removecartitem(removeid);
                  handleClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
