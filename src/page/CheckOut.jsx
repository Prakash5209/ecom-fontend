import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { cartFetchData } from "../rdx/slice/cartSlice";
import TextField from "@mui/material/TextField";
function CheckOut() {
  const [userform, setUserform] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    full_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);
  console.log("ot", items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(cartFetchData());
    }
  }, [status, dispatch]);

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 border">
          {/* form div start */}
          <div className="text-center">
            <div>
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                size="small"
              />

              <TextField
                id="outlined-basic"
                label="middle name"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="last name"
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="full address"
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="city"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="state"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="zip code"
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <Button variant="outlined" sx={{}}>
                Checkout
              </Button>
            </div>
          </div>
          {/* form div end */}
        </div>
        <div className="col-span-1 border">
          <div>
            {items.map((i) => {
              <p key={i.id}>{i.product.title}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
