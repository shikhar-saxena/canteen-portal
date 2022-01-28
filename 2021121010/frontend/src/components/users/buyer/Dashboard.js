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
  const [items, setItems] = useState([]);
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
        // navigate("/login");
        console.log(error);
      });
  }, [wallet]);

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
          <List component="nav">
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
        <FoodItems choice={"buyer"} wallet={wallet} setWallet={setWallet} />
      </Grid>
    </div>
  );
};

export default BuyerDashboard;
