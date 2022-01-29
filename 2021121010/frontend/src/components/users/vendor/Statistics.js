import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "../../templates/axiosConfig";
import { Grid } from "@mui/material";

const Statistics = () => {
  const [count, setCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/vendor/statistics", {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

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
    </Grid>
  );
};

export default Statistics;
