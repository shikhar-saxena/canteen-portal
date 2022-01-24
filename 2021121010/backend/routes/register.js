const router = require("express").Router();
const validator = require("validator");
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
const checkEmpty = require("../lib/checkEmpty");
const hashPassword = require("../lib/hashPassword");

async function registerNewBuyer(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  let age = req.body.age;
  const batchName = req.body.batchName;
  const password = req.body.password;
  const repassword = req.body.repassword;

  if (
    checkEmpty(name) ||
    checkEmpty(email) ||
    checkEmpty(batchName) ||
    checkEmpty(password) ||
    checkEmpty(repassword)
  )
    return res.status(400).json({
      error: "All Fields required",
    });

  if (password !== repassword)
    return res.status(400).json({
      error: "Password and Confirm Password do not match",
    });

  if (!validator.isEmail(email))
    return res.status(400).json({
      error: "Invalid Email",
    });

  if (!(age > 0 && age < 120))
    return res.status(400).json({
      error: "Invalid Age",
    });

  const phoneNo = /^\d{10}$/;
  if (!("" + contact).match(phoneNo))
    /* Invalid Contact No */
    return res.status(400).json({
      error: "Invalid Contact Number",
    });

  // Check if email is unique
  let buyer = await Buyer.findOne({ email });
  if (buyer)
    /* email not unique */
    return res.status(400).json({
      error: "Email already exists",
    });

  const newBuyer = new Buyer({
    name,
    age,
    email,
    contact,
    batchName,
    password: hashPassword(password),
  });

  try {
    buyer = await newBuyer.save();
    return res.status(200).json(buyer);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function registerNewVendor(req, res) {
  const managerName = req.body.managerName;
  const shopName = req.body.shopName;
  const email = req.body.email;
  const contact = req.body.contact;
  const openTime = req.body.openTime;
  const closeTime = req.body.closeTime;
  const password = req.body.password;
  const repassword = req.body.repassword;

  if (
    checkEmpty(managerName) ||
    checkEmpty(shopName) ||
    checkEmpty(email) ||
    // checkEmpty(contact) ||
    checkEmpty(openTime) ||
    checkEmpty(closeTime) ||
    checkEmpty(password) ||
    checkEmpty(repassword)
  )
    return res.status(400).json({
      error: "All Fields required",
    });

  if (password !== repassword)
    return res.status(400).json({
      error: "Password and Confirm Password do not match",
    });

  if (!validator.isEmail(email))
    return res.status(400).json({
      error: "Invalid Email",
    });

  const phoneNo = /^\d{10}$/;
  if (!("" + contact).match(phoneNo))
    /* Invalid Contact No */
    return res.status(400).json({
      error: "Invalid Contact Number",
    });

  if (openTime === closeTime)
    return res.status(400).json({
      error: "Opening and Closing Time cannot be same",
    });

  // Check if shopName and email are unique
  let vendor = await Vendor.findOne({ email });
  if (vendor)
    /* email not unique */
    return res.status(400).json({
      error: "Email already exists",
    });

  vendor = await Vendor.findOne({ shopName });
  if (vendor)
    /* shopName not unique */
    return res.status(400).json({
      error: "Shop Name already exists",
    });

  const newVendor = new Vendor({
    managerName,
    shopName,
    email,
    contact,
    openTime,
    closeTime,
    password: hashPassword(password),
  });

  console.log(newVendor);

  try {
    vendor = await newVendor.save();
    return res.status(200).json(vendor);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// Common register middleware
function registerUser(req, res) {
  const choice = req.body.choice;

  if (checkEmpty(choice))
    return res.status(400).json({
      error: "User Type required",
    });

  if (choice === "Vendor") return registerNewVendor(req, res);

  if (choice === "Buyer") return registerNewBuyer(req, res);
}

// /**
//  * @get request
//  */
// router.get("/", (req, res) => {
//   res.send("<p> You found me</p>");
// });

/**
 * @post Register new user
 */
router.post("/", registerUser);

module.exports = router;
