import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
  cartFetchData,
  updateCartItem,
  deleteCartItem,
} from "../rdx/slice/cartSlice";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Cart() {
  // modal to confirm to remove cartitem from database
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // remove item object id state
  const [removeid, setRemoveid] = useState(null);

  //navigate to checkout page
  const navigate = useNavigate();
  const gotoNavigate = () => {
    navigate("/checkout/");
  };

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  console.log("cart items", items);

  const handleUpdateQuantity = (id, newQuantity, operation) => {
    dispatch(
      updateCartItem({
        id,
        quantity: newQuantity,
        operation_status: operation,
      }),
    );
    console.log("changed");
  };

  const removecartitem = (id) => {
    dispatch(deleteCartItem({ id }));
    console.log("delete cart item triggered");
  };

  //dispatch(cartFetchData());
  useEffect(() => {
    dispatch(cartFetchData());
  }, [dispatch]);

  if (status == "loading") {
    return <div>Loading</div>;
  } else if (status == "failed") {
    return <div>Failed</div>;
  }

  var to = 0;
  for (var i of items) {
    to += i.product.price * i.quantity;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border-2 md:col-span-2">
          <div className="grid grid-cols-6 gap-4 p-4 border-b items-center">
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
              className="grid grid-cols-6 gap-4 p-4 border-b items-center"
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
                    handleUpdateQuantity(item.id, item.quantity + 1, "addition")
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
                    handleUpdateQuantity(item.id, item.quantity - 1, "subtract")
                  }
                >
                  <FaMinus />
                </Button>
              </div>

              {/* Total Price Column */}
              <div>
                <p>{item.product.price * item.quantity}</p>
              </div>

              <div>
                <Button
                  onClick={() => {
                    handleOpen();
                    setRemoveid(item.id);
                  }}
                >
                  <HighlightOffIcon />
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you want to delete this cart item.
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          removecartitem(removeid);
                          handleClose();
                        }}
                      >
                        yes
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                      >
                        no
                      </Button>
                    </Typography>
                  </Box>
                </Modal>
                {/*<HighlightOffIcon onClick={() => removecartitem(item.id)} />*/}
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 p-4">
          <p className="font-semibold">Total price of all</p>
          <p>{to}</p>
          <Button variant="outlined" color="error" onClick={gotoNavigate}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
