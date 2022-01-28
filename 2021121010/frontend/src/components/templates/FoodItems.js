import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import { Stack, Button, Grid, TextField, Checkbox } from "@mui/material";
import Tag from "./Tag";

function FoodItem({ item, choice, items, setItems, wallet, setWallet }) {
  let arr = [];
  for (let i = 0; i < item.addons.length; i++) {
    arr[i] = {
      addonName: item.addons[i].name,
      addonPrice: item.addons[i].price,
      check: false,
    };
  }

  const [available, setAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [checked, setChecked] = useState(arr);

  // For addon checkboxes
  const handleChange = (event, index) => {
    const updatedChange = [...checked];
    updatedChange[index].check = event.target.checked;
    setChecked(updatedChange);
  };

  useEffect(() => {
    if (choice === "buyer") {
      const current = new Date();

      // Finds and returns Date object for given time 'HH:MM'
      let setDateTime = function (date, time) {
        let sp = time.split(":");
        date.setHours(sp[0]);
        date.setMinutes(sp[1]);
        return date;
      };

      let currentTime = current.getTime(),
        openTime = setDateTime(
          new Date(current),
          item.vendor.openTime
        ).getTime(),
        closeTime = setDateTime(
          new Date(current),
          item.vendor.closeTime
        ).getTime();

      if (
        openTime < closeTime &&
        currentTime > openTime &&
        currentTime < closeTime
      )
        setAvailable(true);
      else if (
        openTime > closeTime &&
        !(currentTime < openTime && currentTime > closeTime)
      )
        setAvailable(true);
      else setAvailable(false);
    }
  }, [item, choice]);

  function deleteItem(name) {
    axios
      .delete(`/vendor/${name}`, {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      })
      .then((response) => {
        // setItems(response.data);
        // console.log("Success");
        let newItems = items.filter((it) => it.name !== name);
        setItems(newItems);
      })
      .catch((error) => {
        // navigate("/login");
      });
  }

  function addOrder(event, item, checked, quantity, wallet) {
    event.preventDefault();

    console.log(checked);

    const currentDate = new Date();
    const placedTime = currentDate.getHours() + ":" + currentDate.getMinutes();

    axios
      .post(
        `/buyer/${item._id}`,
        { itemPrice: item.price, placedTime, quantity, checked, wallet },
        {
          headers: { authorization: localStorage.getItem("authorization") },
        }
      )
      .then((response) => {
        setWallet(response.data.wallet);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    setQuantity(0);
  }

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      xs={12}
      md={3}
      lg={3}
      sx={{ width: "auto", margin: "1rem" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Item Name
            </TableCell>
            <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Item Price
            </TableCell>
            <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Food Type
            </TableCell>
            {(() => {
              if (choice === "buyer")
                return (
                  <>
                    <TableCell
                      style={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "#4527a0",
                      }}
                    >
                      Shop
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "#4527a0",
                      }}
                    >
                      Contact
                    </TableCell>
                  </>
                );
            })()}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.foodType}</TableCell>
            {(() => {
              if (choice === "buyer")
                return (
                  <>
                    <TableCell>{item.vendor.shopName}</TableCell>
                    <TableCell>{item.vendor.contact}</TableCell>
                  </>
                );
            })()}
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 1, paddingTop: 0 }} colSpan={6}>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Addons
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          color: "#4527a0",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        style={{
                          color: "#4527a0",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Price
                      </TableCell>
                      {(() => {
                        if (choice === "buyer") return <TableCell />;
                      })()}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.addons.map((addon, index) => {
                      return (
                        <TableRow>
                          <TableCell>{addon.name}</TableCell>
                          <TableCell>{addon.price}</TableCell>
                          {(() => {
                            if (choice === "buyer")
                              return (
                                <TableCell>
                                  <Checkbox
                                    checked={checked[index].check}
                                    onChange={(e) =>
                                      handleChange(e, index, addon._id)
                                    }
                                  />
                                </TableCell>
                              );
                          })()}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Tags
                </Typography>
                <Stack direction="row" spacing={1}>
                  {item.tags.map((tag) => (
                    <Tag text={tag} />
                  ))}
                </Stack>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            {(() => {
              if (choice === "buyer") {
                if (available)
                  return (
                    <>
                      <TableCell>
                        <TextField
                          label="Quantity"
                          // variant="contained"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          style={{ maxWidth: "6rem" }}
                          value={quantity === 0 ? "" : quantity}
                          onChange={(event) => setQuantity(event.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          style={{ marginInline: "auto" }}
                          onClick={(event) =>
                            addOrder(event, item, checked, quantity, wallet)
                          }
                        >
                          Buy
                        </Button>
                      </TableCell>
                    </>
                  );
                else
                  return (
                    <>
                      <TableCell />

                      <TableCell align="center">
                        <Button
                          color="secondary"
                          style={{ marginInline: "auto" }}
                        >
                          Unavailable
                        </Button>
                      </TableCell>
                    </>
                  );
              } else {
                return (
                  <>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginInline: "auto" }}
                        onClick={(event) => deleteItem(item.name)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                );
              }
            })()}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function FoodItems({ choice, wallet, setWallet }) {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/${choice}`, {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setItems(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [items, choice]);

  return (
    <Grid container>
      {items.map((item) => (
        <FoodItem
          key={item.name}
          item={item}
          choice={choice}
          items={items}
          setItems={setItems}
          wallet={wallet}
          setWallet={setWallet}
        />
      ))}
    </Grid>
  );
}
