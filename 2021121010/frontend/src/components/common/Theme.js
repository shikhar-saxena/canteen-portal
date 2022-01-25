import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#4527a0",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
