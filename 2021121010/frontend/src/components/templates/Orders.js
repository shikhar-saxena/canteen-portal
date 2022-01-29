import { useEffect, useState } from "react";
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
import {
  Stack,
  Button,
  Grid,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import Tag from "./Tag";

function VendorOrder({ order }) {
  const [orderStatus, setOrderStatus] = useState("PLACED");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function updateOrder(event, orderChoice) {
    event.preventDefault();

    let initialStatus = orderStatus;

    axios
      .put(
        `/vendor/orders/${order._id}`,
        { orderChoice },
        {
          headers: { authorization: localStorage.getItem("authorization") },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setOrderStatus(response.data.status);
      })
      .catch((error) => {
        if (error) {
          setError(error.response.data.error);
          setOpen(true);
        }
        setOrderStatus(initialStatus);
        // console.log(error);
        // navigate("/login");
      });
  }

  useEffect(() => {
    // if (order.addons && order.addons.length !== 0) setCheckAddons(true);
    // else setCheckAddons(false);

    setOrderStatus(order.status);
  }, [order]);

  return (
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{ width: "auto", margin: "1rem" }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
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
              Placed Time
            </TableCell>
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
              Quantity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{order.placedTime}</TableCell>
            <TableCell>{order.item.name}</TableCell>
            <TableCell>{order.quantity}</TableCell>
          </TableRow>
          {(() => {
            if (order.addons.length > 0)
              return (
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 1, paddingTop: 0 }}
                    colSpan={1}
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" component="div">
                        Addons
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {order.addons.map((addon) => {
                          return (
                            <>
                              <Tag text={addon.addonName} />
                            </>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              );
            else return <></>;
          })()}
          <TableRow>
            <TableCell>
              <Typography color="secondary" sx={{ fontWeight: 550 }}>
                {orderStatus}
              </Typography>
            </TableCell>
            <TableCell>
              {(() => {
                if (orderStatus === "PLACED") {
                  return (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(event) => updateOrder(event, 0)}
                    >
                      reject
                    </Button>
                  );
                }
              })()}
            </TableCell>
            <TableCell>
              {(() => {
                if (
                  orderStatus !== "REJECTED" &&
                  orderStatus !== "READY FOR PICKUP" &&
                  orderStatus !== "COMPLETED"
                ) {
                  return (
                    <Button
                      variant="outlined"
                      onClick={(event) => updateOrder(event, 1)}
                    >
                      Move to Next stage
                    </Button>
                  );
                }
              })()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BuyerOrder({ order }) {
  const [orderStatus, setOrderStatus] = useState("PLACED");
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(true);

  function updateRating(event) {
    event.preventDefault();

    axios
      .put(
        `/buyer/orders/${order._id}/${rating}`,
        {},
        {
          headers: { authorization: localStorage.getItem("authorization") },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setRating(response.data.rating);
        setShowRating(false);
      })
      .catch((error) => {
        setRating(0);
        // console.log(error);
        // navigate("/login");
      });
  }

  function updateOrder(event) {
    event.preventDefault();

    let initialStatus = orderStatus;

    axios
      .put(
        `/buyer/orders/${order._id}`,
        {},
        {
          headers: { authorization: localStorage.getItem("authorization") },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setOrderStatus(response.data.status);
      })
      .catch((error) => {
        setOrderStatus(initialStatus);
        // console.log(error);
        // navigate("/login");
      });
  }

  useEffect(() => {
    // if (order.addons && order.addons.length !== 0) setCheckAddons(true);
    // else setCheckAddons(false);

    setOrderStatus(order.status);
  }, [order]);

  return (
    <TableContainer
      component={Paper}
      elevation={6}
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
              Placed Time
            </TableCell>
            <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Vendor Name
            </TableCell>
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
              Quantity
            </TableCell>
            <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Cost
            </TableCell>
            {/* TODO: */}
            {/* <TableCell
              style={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#4527a0",
              }}
            >
              Rating
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{order.placedTime}</TableCell>
            <TableCell>{order.item.vendor.shopName}</TableCell>
            <TableCell>{order.item.name}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.cost}</TableCell>
          </TableRow>
          {(() => {
            if (order.addons.length > 0)
              return (
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 1, paddingTop: 0 }}
                    colSpan={1}
                  >
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" component="div">
                        Addons
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {order.addons.map((addon) => {
                          return (
                            <>
                              <Tag text={addon.addonName} />
                            </>
                          );
                        })}
                      </Stack>
                    </Box>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              );
            else return <></>;
          })()}
          <TableRow>
            <TableCell>
              <Typography color="secondary" sx={{ fontWeight: 550 }}>
                {orderStatus}
              </Typography>
            </TableCell>
            <TableCell />
            {(() => {
              if (orderStatus === "COMPLETED") {
                return (
                  <TableCell
                    style={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#4527a0",
                    }}
                  >
                    Rating
                  </TableCell>
                );
              } else return <TableCell></TableCell>;
            })()}
            {(() => {
              if (orderStatus === "COMPLETED") {
                if (showRating) {
                  return (
                    <TableCell
                      style={{
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "#4527a0",
                      }}
                    >
                      <Select
                        value={rating}
                        label="Rating"
                        onChange={(e) => setRating(e.target.value)}
                        size="small"
                      >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </TableCell>
                  );
                } else {
                  return <TableCell>{rating}</TableCell>;
                }
              } else return <TableCell></TableCell>;
            })()}

            <TableCell>
              {(() => {
                if (orderStatus === "READY FOR PICKUP") {
                  return (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(event) => updateOrder(event)}
                    >
                      Picked up
                    </Button>
                  );
                } else if (orderStatus === "COMPLETED" && showRating) {
                  return (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(event) => updateRating(event)}
                    >
                      Add Rating
                    </Button>
                  );
                }
              })()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Orders({ choice }) {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/${choice}/orders`, {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        // console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        // console.log(error.response);
        navigate("/login");
      });
  }, [orders, choice]);

  // for(let i = 0; i < orders.length; i++) {
  //   let ordersPerItem = orders[i];

  // }

  if (choice === "vendor")
    return (
      <Grid container>
        {orders.map((ordersPerItem) => {
          return ordersPerItem.map((order) => {
            return <VendorOrder order={order} />;
          });
        })}
      </Grid>
    );
  else
    return (
      <Grid container>
        {orders.map((order) => {
          return <BuyerOrder order={order} />;
        })}
      </Grid>
    );
}
