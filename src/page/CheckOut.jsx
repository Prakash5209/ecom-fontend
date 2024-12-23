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

//basic select
import Box from "@mui/material/Box";

import { cartFetchData } from "../rdx/slice/cartSlice";
import axios from "axios";

const CheckOut = () => {
  const [country_district, setCountry_district] = useState("");
  const [userForm, setUserForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    district: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const country_nepal_districts = [
    [
      "Bagmati Province",
      ["Kathmandu", 0],
      ["Lalitpur", 10],
      ["Bhaktapur", 15],
      ["Makwanpur", 40],
      ["Chitwan", 50],
      ["Sindhupalchowk", 60],
      ["Kavrepalanchok", 70],
      ["Rasuwa", 80],
      ["Dhading", 90],
      ["Nuwakot", 100],
    ],
    [
      "Province 1",
      ["Morang", 150],
      ["Sunsari", 160],
      ["Jhapa", 170],
      ["Ilam", 180],
      ["Taplejung", 200],
      ["Bhojpur", 210],
      ["Okhaldhunga", 220],
    ],
    [
      "Madhesh Province",
      ["Dhanusha", 130],
      ["Mahottari", 140],
      ["Sarlahi", 150],
      ["Bara", 160],
      ["Rautahat", 170],
      ["Parsa", 180],
    ],
    [
      "Gandaki Province",
      ["Pokhara", 120],
      ["Tanahun", 130],
      ["Gorkha", 140],
      ["Manang", 150],
      ["Mustang", 160],
      ["Baglung", 170],
      ["Parbat", 180],
    ],
    [
      "Lumbini Province",
      ["Rupandehi", 190],
      ["Kapilvastu", 200],
      ["Dang", 210],
      ["Palpa", 220],
      ["Arghakhanchi", 230],
    ],
    [
      "Karnali Province",
      ["Jumla", 250],
      ["Kalikot", 260],
      ["Mugu", 270],
      ["Dolpa", 280],
      ["Humla", 300],
    ],
    [
      "Sudurpashchim Province",
      ["Doti", 310],
      ["Achham", 320],
      ["Baitadi", 330],
      ["Darchula", 340],
      ["Kanchanpur", 350],
      ["Kailali", 360],
    ],
  ];

  const handleChange = (event, value) => {
    event.preventDefault();
    event.stopPropagation();
    setCountry_district(value);
    console.log("value: ", value);
  };
  console.log("valv", country_district);

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
            amount: 100000,
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

            <div className="grid md:grid-cols-1 gap-4 mt-4">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    District
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country_district || ""}
                    label="district"
                    onChange={handleChange}
                  >
                    {country_nepal_districts.map((province, index) => (
                      <div key={index}>
                        {province.slice(1).map((district, subindex) => (
                          <>
                            <MenuItem
                              key={subindex}
                              value={district[0]}
                              onClick={(event) =>
                                handleChange(event, district[0])
                              }
                            >
                              {district[0]}
                            </MenuItem>
                          </>
                        ))}
                      </div>
                    ))}
                    {/* <MenuItem value={10}>Ten</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={userForm.address}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                // className="md:col-span-3"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
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
                  NPR {(item.product.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            ))}

            <Divider className="my-4" />

            <div className="flex justify-between mb-4">
              <Typography variant="subtitle1" className="font-bold">
                Total
              </Typography>
              <Typography variant="h6" className="font-bold">
                NPR {calculateTotal()}
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
