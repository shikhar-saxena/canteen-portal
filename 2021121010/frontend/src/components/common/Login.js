import { useState } from "react";
import axios from "../templates/axiosConfig";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState({ message: "", severity: "" });
  const [choice, setChoice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeChoice = (event) => {
    setChoice(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setChoice("");
    setPassword("");
  };

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      choice,
      password,
    };

    axios
      .post("/login", newUser)
      .then((response) => {
        localStorage.setItem("authorization", `Bearer ${response.data.token}`);
        resetInputs();
        navigate(`/${choice.toLowerCase()}`);
      })
      .catch((err) => {
        if (err.response)
          setError({ severity: "error", message: err.response.data.error });
      });
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" paddingTop={1} color="primary">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {(() => {
          if (error.severity)
            return (
              <Alert severity={error.severity} sx={{ maxWidth: 200 }}>
                {error.message}
              </Alert>
            );
        })()}
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="user-type">User Type</InputLabel>
          <Select
            value={choice}
            labelId="user-type"
            label="User Type"
            onChange={onChangeChoice}
            autoWidth
          >
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
