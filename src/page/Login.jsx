import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginFunction = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:8000/account/api/token/", { username, password })
      .then((res) => {
        localStorage.setItem("sown_access", res.data.access);
        alert("Logged in successfully");
        window.location.href = "/";
      })
      .catch((e) => {
        setError("Invalid username or password");
        console.log(e);
      });
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={loginFunction} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mb: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          <Button
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
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
