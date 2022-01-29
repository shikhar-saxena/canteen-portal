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

function VendorOrder({ order, choice }) {
  // const [checkAddons, setCheckAddons] = useState(false);
  // const [orderChoice, setOrderChoice] = useState(0); // 1 for move to next stage, otherwise reject

  const [orderStatus, setOrderStatus] = useState("PLACED");

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
                  orderStatus !== "READY FOR PICKUP"
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
  //   return (
  //     <TableContainer
  //       component={Paper}
  //       elevation={6}
  //       xs={12}
  //       md={3}
  //       lg={3}
  //       sx={{ width: "auto", margin: "1rem" }}
  //     >
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell
  //               style={{
  //                 fontWeight: 700,
  //                 textTransform: "uppercase",
  //                 color: "#4527a0",
  //               }}
  //             >
  //               Placed Time
  //             </TableCell>
  //             <TableCell
  //               style={{
  //                 fontWeight: 700,
  //                 textTransform: "uppercase",
  //                 color: "#4527a0",
  //               }}
  //             >
  //               Item Name
  //             </TableCell>
  //             <TableCell
  //               style={{
  //                 fontWeight: 700,
  //                 textTransform: "uppercase",
  //                 color: "#4527a0",
  //               }}
  //             >
  //               Food Type
  //             </TableCell>
  //             {(() => {
  //               if (choice === "buyer")
  //                 return (
  //                   <>
  //                     <TableCell
  //                       style={{
  //                         fontWeight: 700,
  //                         textTransform: "uppercase",
  //                         color: "#4527a0",
  //                       }}
  //                     >
  //                       Shop
  //                     </TableCell>
  //                     <TableCell
  //                       style={{
  //                         fontWeight: 700,
  //                         textTransform: "uppercase",
  //                         color: "#4527a0",
  //                       }}
  //                     >
  //                       Contact
  //                     </TableCell>
  //                   </>
  //                 );
  //             })()}
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           <TableRow>
  //             <TableCell>{item.name}</TableCell>
  //             <TableCell>{item.price}</TableCell>
  //             <TableCell>{item.foodType}</TableCell>
  //             {(() => {
  //               if (choice === "buyer")
  //                 return (
  //                   <>
  //                     <TableCell>{item.vendor.shopName}</TableCell>
  //                     <TableCell>{item.vendor.contact}</TableCell>
  //                   </>
  //                 );
  //             })()}
  //           </TableRow>
  //           <TableRow>
  //             <TableCell style={{ paddingBottom: 1, paddingTop: 0 }} colSpan={6}>
  //               <Box sx={{ margin: 1 }}>
  //                 <Typography variant="h6" gutterBottom component="div">
  //                   Addons
  //                 </Typography>
  //                 <Table size="small">
  //                   <TableHead>
  //                     <TableRow>
  //                       <TableCell
  //                         style={{
  //                           color: "#4527a0",
  //                           fontWeight: 700,
  //                           textTransform: "uppercase",
  //                         }}
  //                       >
  //                         Name
  //                       </TableCell>
  //                       <TableCell
  //                         style={{
  //                           color: "#4527a0",
  //                           fontWeight: 700,
  //                           textTransform: "uppercase",
  //                         }}
  //                       >
  //                         Price
  //                       </TableCell>
  //                       {(() => {
  //                         if (choice === "buyer" && available)
  //                           return <TableCell />;
  //                       })()}
  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {item.addons.map((addon, index) => {
  //                       return (
  //                         <TableRow>
  //                           <TableCell>{addon.name}</TableCell>
  //                           <TableCell>{addon.price}</TableCell>
  //                           {(() => {
  //                             if (choice === "buyer" && available)
  //                               return (
  //                                 <TableCell>
  //                                   <Checkbox
  //                                     checked={checked[index].check}
  //                                     onChange={(e) =>
  //                                       handleChange(e, index, addon._id)
  //                                     }
  //                                   />
  //                                 </TableCell>
  //                               );
  //                           })()}
  //                         </TableRow>
  //                       );
  //                     })}
  //                   </TableBody>
  //                 </Table>
  //               </Box>
  //               <Box sx={{ margin: 1 }}>
  //                 <Typography variant="h6" gutterBottom component="div">
  //                   Tags
  //                 </Typography>
  //                 <Stack direction="row" spacing={1}>
  //                   {item.tags.map((tag) => (
  //                     <Tag text={tag} />
  //                   ))}
  //                 </Stack>
  //               </Box>
  //             </TableCell>
  //           </TableRow>
  //           <TableRow>
  //             <TableCell />
  //             {(() => {
  //               if (choice === "buyer") {
  //                 if (available)
  //                   return (
  //                     <>
  //                       <TableCell>
  //                         <TextField
  //                           label="Quantity"
  //                           // variant="contained"
  //                           type="number"
  //                           InputLabelProps={{
  //                             shrink: true,
  //                           }}
  //                           size="small"
  //                           style={{ maxWidth: "6rem" }}
  //                           value={quantity === 0 ? "" : quantity}
  //                           onChange={(event) => setQuantity(event.target.value)}
  //                         />
  //                       </TableCell>
  //                       <TableCell>
  //                         <Button
  //                           variant="outlined"
  //                           style={{ marginInline: "auto" }}
  //                           onClick={(event) =>
  //                             addOrder(event, item, checked, quantity, wallet)
  //                           }
  //                         >
  //                           Buy
  //                         </Button>
  //                       </TableCell>
  //                     </>
  //                   );
  //                 else
  //                   return (
  //                     <>
  //                       <TableCell />
  //                       <TableCell align="center">
  //                         <Button
  //                           color="secondary"
  //                           style={{ marginInline: "auto" }}
  //                         >
  //                           Unavailable
  //                         </Button>
  //                       </TableCell>
  //                     </>
  //                   );
  //               } else {
  //                 return (
  //                   <>
  //                     <TableCell align="center">
  //                       <Button
  //                         variant="contained"
  //                         color="secondary"
  //                         style={{ marginInline: "auto" }}
  //                         onClick={(event) => deleteItem(item.name)}
  //                       >
  //                         Delete
  //                       </Button>
  //                     </TableCell>
  //                   </>
  //                 );
  //               }
  //             })()}
  //           </TableRow>
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
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
        // console.log(error);
        navigate("/login");
      });
  }, [choice]);

  // for(let i = 0; i < orders.length; i++) {
  //   let ordersPerItem = orders[i];

  // }

  if (choice === "vendor")
    return (
      <Grid container>
        {orders.map((ordersPerItem) => {
          return ordersPerItem.map((order) => {
            return <VendorOrder choice={choice} order={order} />;
          });
        })}
      </Grid>
    );
  else return <>dfsdf</>;
}
