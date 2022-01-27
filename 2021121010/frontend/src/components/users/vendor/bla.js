import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../templates/axiosConfig";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const Bla = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("/vendor", {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  return (
    <Grid container spacing={3}>
      {items.map((item) => {
        return (
          <Grid item key={item._id} xs={12} md={6} lg={4}>
            <Card elevation={2}>
              <CardHeader title={item.name} subheader={item.foodType} />
              <CardContent>
                <Typography fontSize={28} color="textSecondary">
                  <CurrencyRupeeIcon />
                  {item.price}
                </Typography>
                {item.addons.map((addon) => {
                  return (
                    <>
                      <Typography fontStyle="bold">{addon.name}</Typography>
                      <Typography color="textSecondary">
                        <CurrencyRupeeIcon />
                        {addon.price}
                      </Typography>
                    </>
                  );
                })}

                {/* TAGS TODO: */}
              </CardContent>
            </Card>
            {/*   price: {
                        type: Number,
                        required: true,
                    },
                    // rating: {
                    //   type: Number,
                    //   default: 0,
                    //   sum: 0, // Sum of ratings
                    //   count: 0, // Count of buyer rating this item
                    // },
                    foodType: {
                        type: String,
                        enum: ["Veg", "Non-Veg"],
                        required: true,
                    },
                    addons: [AddonSchema],
                    tags: [String],}</Paper> */}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Bla;
