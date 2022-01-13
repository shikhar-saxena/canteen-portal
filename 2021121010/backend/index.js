const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const mongoose = require("mongoose");

require("dotenv").config();


const PORT = process.env.PORT || 4000;
// const DB_NAME = "tutorial"

const app = express();

// routes
// var testAPIRouter = require("./routes/testAPI");
// var UserRouter = require("./routes/Users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully !");
// })

// setup API endpoints
// app.use("/testAPI", testAPIRouter);
// app.use("/user", UserRouter);

// A get function
app.get("/", (req, res) => {
    res.send("hello its me");
})

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});