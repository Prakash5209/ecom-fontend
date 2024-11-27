import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";

function Navbar() {
  const logout_button = () => {
    localStorage.removeItem("sown_access");
    window.location.href = "/";
    alert("logged out");
  };

  const auth = localStorage.getItem("sown_access");

  return (
    <div className="bg-red-300">
      <div className="flex justify-around p-3">
        <div>
          <NavLink className="p-2" to="/">
            Home
          </NavLink>
        </div>
        <div className="flex">
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField fullWidth label="fullWidth" id="fullWidth" />
          </Box>
        </div>
        <div>
          <NavLink className="p-2" to="/cart">
            Cart
          </NavLink>
          {auth ? (
            <Button
              variant="outlined"
              size="small"
              type="submit"
              onClick={logout_button}
            >
              Logout
            </Button>
          ) : (
            <NavLink className="p-2" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
