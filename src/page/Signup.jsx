import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const submitSignupForm = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmpassword) {
        const response = await axios.post(
          "http://localhost:8000/account/api/create-user/",
          { username: username, password: password },
        );
        console.log("create-user-api", response.data);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "80vh",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Sign up
        </Typography>

        <Box component="form" sx={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="confirm Password"
            type="password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          <Button
            onClick={submitSignupForm}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
