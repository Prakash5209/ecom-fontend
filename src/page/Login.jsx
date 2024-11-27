import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logindata = {
    username: username,
    password: password,
  };
  const loginFunction = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/account/api/token/", logindata)
      .then((res) => {
        localStorage.setItem("sown_access", res.data.access);
        alert("logged in");
        window.location.href = "/";
        setUsername("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <form onSubmit={loginFunction}>
        <p className="category">This is login page</p>
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          value={username}
          onChange={(res) => setUsername(res.target.value)}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          value={password}
          onChange={(res) => setPassword(res.target.value)}
        />
        <br />
        <Button variant="contained" size="small" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
