import axios from "../templates/axiosConfig";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

const Profile = ({ choice }) => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  useEffect(() => {
    axios
      .get(`/${choice}/profile`, {
        headers: { authorization: localStorage.getItem("authorization") },
      })
      .then((response) => {
        // console.log(response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, []);

  return (
    <Grid container align={"center"} spacing={2} key={details["_id"]}>
      {/* <div>{JSON.stringify(details)}</div> */}
      <Grid item xs={12} padding={2}>
        <Typography variant="h4" color="primary">
          Profile
        </Typography>
      </Grid>
      {Object.entries(details).map((entry) => {
        let key = entry[0];
        let value = entry[1];

        if (
          !(
            key === "_id" ||
            key === "password" ||
            key === "__v" ||
            key === "wallet"
          )
        )
          return (
            <Grid item key={key} xs={12} padding={3}>
              <Typography
                style={{ fontWeight: 600, textTransform: "uppercase" }}
                color="primary"
              >
                {key}
              </Typography>
              <Typography>{value}</Typography>
            </Grid>
          );
      })}
    </Grid>
  );
};

export default Profile;
