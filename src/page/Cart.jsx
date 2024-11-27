import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { cartFetchData, updateCartItem } from "../rdx/slice/cartSlice";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch(updateCartItem({ id, quantity: newQuantity }));
  };

  useEffect(() => {
    dispatch(cartFetchData());
  }, [dispatch]);

  if (status == "loading") {
    return <div>Loading</div>;
  } else if (status == "failed") {
    return <div>Failed</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-2 md:col-span-2">
          <div className="grid grid-cols-5 gap-4 p-4 border-b items-center">
            <div>
              <p>Image</p>
            </div>
            <div className="">
              {/*<p>Title</p>
              <p>Color</p>
              <p>Size</p>
              */}
              <p>Product Detail</p>
            </div>

            {/* Price Column */}
            <div>
              <p>Price</p>
            </div>

            {/* Quantity Column */}
            <div>
              <p>Quantity</p>
            </div>

            {/* Total Price Column */}
            <div>
              <p>Total</p>
            </div>
          </div>
        </div>

        {/* Total Section */}
        <div className="border-2 p-4">
          <p className="font-semibold">Total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-2 md:col-span-2">
          {items?.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-4 p-4 border-b items-center"
            >
              <div>
                <img
                  src=""
                  alt="Product Image"
                  className="w-24 h-24 object-cover"
                />
              </div>

              {/* Product Details (Title, Color, Size) */}
              {/* <div className="grid grid-cols-1 gap-1">*/}
              <div className="">
                <p>{item.product.title}</p>
                <p>{item?.color}</p>
                <p>{item?.size}</p>
              </div>

              {/* Price Column */}
              <div>
                <p>{item.product?.price}</p>
              </div>

              {/* Quantity Column */}
              <div className="flex flex-col">
                <Button
                  size="small"
                  className="w-1"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <FaPlus />
                </Button>
                <div className="m-2">
                  {/*<input value={item.quantity} className="w-12 text-center" />*/}
                  <p style={{ padding: "0 0 0 19px" }}>{item.quantity}</p>
                </div>
                <Button
                  size="small"
                  className="w-1"
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  <FaMinus />
                </Button>
              </div>

              {/* Total Price Column */}
              <div>
                <p>{item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 p-4">
          <p className="font-semibold">Total</p>
          <p>$total_price</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
