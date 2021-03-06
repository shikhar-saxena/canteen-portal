const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.DB_NAME;

const app = express();

// routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const vendorRouter = require("./routes/vendor");
const buyerRouter = require("./routes/buyer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect("mongodb://mongo:27017/" + DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/vendor", vendorRouter);
app.use("/buyer", buyerRouter);

// app.use("/register", registerRouter);
// app.use("/register", registerRouter);

// app.use("/testAPI", testAPIRouter);
// app.use("/user", UserRouter);

// A get function
app.get("/", (req, res) => {
  res.redirect("/register");
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
