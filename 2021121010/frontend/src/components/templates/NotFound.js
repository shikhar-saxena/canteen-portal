import { Grid, Typography } from "@mui/material";

function NotFound() {
  return (
    <Grid align="center">
      <Typography variant="h3" color="secondary" style={{ padding: "2rem" }}>
        The given page could not be found
      </Typography>
    </Grid>
  );
}

export default NotFound;
