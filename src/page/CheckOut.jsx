import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { cartFetchData } from "../rdx/slice/cartSlice";
import axios from "axios";

const CheckOut = () => {
  const [userForm, setUserForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (status === "idle") {
      dispatch(cartFetchData());
    }
  }, [status, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    console.log("Checkout", { userForm, items, paymentMethod });

    if (paymentMethod == "khalti") {
      console.log("response only");
      try {
        const response = await axios.post(
          "http://localhost:8000/checkout/api/khalti-initiate/",
          {
            return_url: "http://localhost:5173/cart/",
            website_url: "https://localhost:5173/",
            amount: 10000,
            purchase_order_id: "Order01",
            purchase_order_name: "test",
            customer_info: {
              name: "prakash kumar chaudhary",
              email: "test@khalti.com",
              phone: "9800000001",
            },
          },
        );
        console.log(response.data.payment_url);
        window.open(response.data.payment_url, "_blank");
        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message,
        );
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <Typography
        variant="h4"
        className="text-center mb-6 font-bold text-gray-800"
      >
        Checkout
      </Typography>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card className="md:col-span-2">
          <CardContent>
            <Typography variant="h6" className="mb-4 text-gray-700">
              Customer Information
            </Typography>
            <div className="grid md:grid-cols-3 gap-4">
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={userForm.firstName}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={userForm.middleName}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userForm.lastName}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={userForm.phone}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={userForm.address}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                className="md:col-span-3"
                required
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={userForm.city}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={userForm.state}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
              <TextField
                fullWidth
                label="Zip Code"
                name="zipCode"
                value={userForm.zipCode}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary and Payment */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4 text-gray-700">
              Order Summary
            </Typography>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2 pb-2 border-b"
              >
                <div>
                  <Typography variant="body1">{item.product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                </div>
                <Typography variant="body1">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            ))}

            <Divider className="my-4" />

            <div className="flex justify-between mb-4">
              <Typography variant="subtitle1" className="font-bold">
                Total
              </Typography>
              <Typography variant="h6" className="font-bold">
                ${calculateTotal()}
              </Typography>
            </div>

            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              className="mb-4"
              onSubmit={() => {
                console.log("clicked");
              }}
            >
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Payment Method"
              >
                <MenuItem value="khalti">khalti</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Complete Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckOut;
