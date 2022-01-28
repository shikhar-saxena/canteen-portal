import { useState, useEffect } from "react";
import axios from "../../templates/axiosConfig";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import FoodItems from "../../templates/FoodItems";
import { Stack, Typography } from "@mui/material";

const BuyerDashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);

  const [addedAmount, setAddedAmount] = useState(0);

  useEffect(() => {
    axios
      .get("/buyer/profile", {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setWallet(response.data.wallet);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/buyer", {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  const sortChange = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };

  const customFunction = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const addMoney = (event) => {
    event.preventDefault();

    axios
      .put(
        `/buyer`,
        { addedAmount },
        {
          headers: { authorization: localStorage.getItem("authorization") },
        }
      )
      .then((response) => {
        setWallet(response.data.wallet);
      })
      .catch((error) => {
        // console.log(error);
      });

    setAddedAmount(0);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={1}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      color="primary"
                    >
                      Wallet
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {wallet}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label="Add Money"
                        // variant="contained"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        size="small"
                        style={{ minWidth: "6rem" }}
                        value={addedAmount === 0 ? "" : addedAmount}
                        onChange={(event) => setAddedAmount(event.target.value)}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={addMoney}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <FoodItems choice={"buyer"} />
      </Grid>
    </div>
  );
};

export default BuyerDashboard;
