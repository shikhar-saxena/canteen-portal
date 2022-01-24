const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Buyer = require("../models/Buyer");
const Vendor = require("../models/Vendor");
const checkEmpty = require("../lib/checkEmpty");

router.post("/", async (req, res) => {
  const choice = req.body.choice; // user type
  const email = req.body.email;
  const password = req.body.password;

  if (checkEmpty(choice) || checkEmpty(email) || checkEmpty(password))
    return res.status(400).json({
      error: "All Fields required",
    });

  if (!validator.isEmail(email))
    return res.status(400).json({
      error: "Invalid Email",
    });

  // Check if user exists
  const userType = choice === "Vendor" ? Vendor : Buyer;

  let user = await userType.findOne({ email });
  if (!user)
    /* email does not exist */
    return res.status(400).json({
      error: "Email not found",
    });

  if (!bcrypt.compareSync(password, user.password))
    /* Wrong password */
    return res.status(401).json({
      error: "Incorrect Password",
    });

  /* Put userType in the user object */
  user = { _id: user._id, choice: choice };

  console.log(user);

  // JWT auth
  jwt.sign({ user: user }, process.env.SECRET_KEY, (err, token) => {
    return res.json({ token });
  });
});

module.exports = router;
