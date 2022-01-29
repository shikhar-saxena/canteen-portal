import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "../../templates/axiosConfig";
import { Grid } from "@mui/material";

const Statistics = () => {
  const [count, setCount] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/vendor/statistics", {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setOrders(response.data.orders);
        setCount(response.data.count);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  orders.sort((a, b) => {
    let completedOrdersA, completedOrdersB;
    completedOrdersA = completedOrdersB = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[i].status === "COMPLETED") completedOrdersA++;
    }

    for (let i = 0; i < b.length; i++) {
      if (b[i].status === "COMPLETED") completedOrdersB++;
    }

    return completedOrdersB - completedOrdersA;
  });

  // console.log(JSON.stringify(orders));

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} padding={4}>
        <Typography variant="h4" color="primary">
          Statistics
        </Typography>
      </Grid>

      <Grid item xs={12} padding={4}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 500, textTransform: "uppercase" }}
        >
          Placed Order Count
        </Typography>
        <Typography style={{ fontSize: 50 }}>
          {count.placedOrderCount}
        </Typography>
      </Grid>
      <Grid item xs={12} padding={4}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 500, textTransform: "uppercase" }}
        >
          pending Order Count
        </Typography>
        <Typography style={{ fontSize: 50 }}>
          {count.pendingOrderCount}
        </Typography>
      </Grid>
      <Grid item xs={12} padding={4}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontWeight: 500, textTransform: "uppercase" }}
        >
          completed Order Count
        </Typography>
        <Typography style={{ fontSize: 50 }}>
          {count.completedOrderCount}
        </Typography>
      </Grid>
      <Grid item xs={12} padding={4}>
        <Typography
          variant="h5"
          color="primary"
          style={{
            fontWeight: 500,
            textTransform: "uppercase",
            paddingBottom: "0.5rem",
          }}
        >
          top 5 items sold
        </Typography>
        {orders.map((orderPerItem) => {
          return (
            <Typography style={{ padding: "0.5rem", fontSize: 20 }}>
              {orderPerItem[0].item.name}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Statistics;
