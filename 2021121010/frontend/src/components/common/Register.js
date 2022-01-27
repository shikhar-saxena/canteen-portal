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

const Register = () => {
  const [error, setError] = useState({ message: "", severity: "" });
  const [choice, setChoice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [batchName, setBatchName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [managerName, setManagerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeChoice = (event) => {
    setChoice(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setChoice("");
    setContact(0);
    setAge(0);
    setBatchName("");
    setPassword("");
    setRePassword("");
    setManagerName("");
    setShopName("");
    setOpenTime("");
    setCloseTime("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      choice,
      contact,
      age,
      batchName,
      password,
      repassword,
      managerName,
      shopName,
      openTime,
      closeTime,
    };

    axios
      .post("/register", newUser)
      .then((response) => {
        setError({
          severity: "success",
          message: "Successfully registered. Please login.",
        });
        resetInputs();
      })
      .catch((err) => {
        if (err.response)
          setError({ severity: "error", message: err.response.data.error });
      });

    // resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" paddingTop={1} color="primary">
          Register
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
            label="User Type"
            labelId="user-type"
            onChange={onChangeChoice}
          >
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {(() => {
        if (choice === "Buyer")
          return (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={onChangeUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Age"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={age === 0 ? "" : age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="batch-name">Batch Name</InputLabel>
                  <Select
                    value={batchName}
                    labelId="batch-name"
                    label="Batch Name"
                    onChange={(e) => setBatchName(e.target.value)}
                    autoWidth
                  >
                    <MenuItem value={"UG1"}>UG1</MenuItem>
                    <MenuItem value={"UG2"}>UG2</MenuItem>
                    <MenuItem value={"UG3"}>UG3</MenuItem>
                    <MenuItem value={"UG4"}>UG4</MenuItem>
                    <MenuItem value={"UG5"}>UG5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </>
          );
        else if (choice === "Vendor")
          return (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Manager Name"
                  variant="outlined"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Shop Name"
                  variant="outlined"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="open-time">Opening Time</InputLabel>

                <TextField
                  variant="outlined"
                  value={openTime}
                  type="time"
                  onChange={(event) => setOpenTime(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="close-time">Closing Time</InputLabel>

                <TextField
                  variant="outlined"
                  value={closeTime}
                  type="time"
                  onChange={(event) => setCloseTime(event.target.value)}
                />
              </Grid>
            </>
          );
      })()}

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
          label="Contact"
          variant="outlined"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={contact === 0 ? "" : contact}
          onChange={(event) => setContact(event.target.value)}
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          value={repassword}
          type="password"
          onChange={(event) => setRePassword(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;
