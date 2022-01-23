const router = require("express").Router();
const validator = require("validator");
const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
const bcrypt = require("bcryptjs");

function checkEmpty(val) {
  if (!val || validator.isEmpty(val)) return true;
  else return false;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { salt, hashedPassword };
}

function registerNewBuyer(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const age = req.body.age;
  const batchName = req.body.batchName;
  const password = req.body.password;
  const repassword = req.body.repassword;

  if (
    checkEmpty(name) ||
    checkEmpty(age) ||
    checkEmpty(email) ||
    checkEmpty(contact) ||
    checkEmpty(batchName) ||
    checkEmpty(password) ||
    checkEmpty(repassword)
  )
    res.status(400).json({
      error: "All Fields required",
    });

  if (password !== repassword)
    res.status(400).json({
      error: "Password and Confirm Password do not match",
    });

  if (!validator.isEmail(email))
    res.status(400).json({
      error: "Invalid Email",
    });

  // Check if email is unique
  Vendor.findOne({ email }).then(function (vendor) {
    if (vendor)
      /* email not unique */
      res.status(400).json({
        error: "Email already exists",
      });
  });

  // const phoneno = /^\d{10}$/;
  // if(contact.match)

  // if(contact)
  // TODO: contact validation age validation and batchName validation

  const newBuyer = new Buyer({
    name,
    age,
    email,
    contact,
    batchName,
    /* password auth TODO: */
  });

  newBuyer
    .save()
    .then((buyer) => res.status(200).json(buyer))
    .catch((err) => res.status(400).json({ error: err }));

  next();
}

function registerNewVendor(req, res, next) {
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
    checkEmpty(contact) ||
    checkEmpty(openTime) ||
    checkEmpty(closeTime) ||
    checkEmpty(password) ||
    checkEmpty(repassword)
  )
    res.status(400).json({
      error: "All Fields required",
    });

  if (password !== repassword)
    res.status(400).json({
      error: "Password and Confirm Password do not match",
    });

  if (!validator.isEmail(email))
    res.status(400).json({
      error: "Invalid Email",
    });

  // Check if shopName and email are unique
  Vendor.findOne({ email }).then(function (vendor) {
    if (vendor)
      /* email not unique */
      res.status(400).json({
        error: "Email already exists",
      });
  });

  Vendor.findOne({ shopName }).then(function (vendor) {
    if (vendor)
      /* shopName not unique */
      res.status(400).json({
        error: "Shop Name already exists",
      });
  });

  // TODO: contact validation openTime < closeTime

  const newVendor = new Vendor({
    managerName,
    shopName,
    email,
    contact,
    openTime,
    closeTime,
    /* password auth TODO: */
  });

  newVendor
    .save()
    .then((vendor) => res.status(200).json(vendor))
    .catch((err) => res.status(400).json({ error: err }));

  next();
}

// Common register middleware
function registerUser(req, res, next) {
  const choice = req.body.choice;

  if (checkEmpty(choice))
    res.status(400).json({
      error: "User Type required",
    });

  if (choice === "Vendor") registerNewVendor(req, res, next);

  if (choice === "Buyer") registerNewBuyer(req, res, next);

  next();
}

/**
 * @get request
 */
router.get("/", (req, res) => {
  res.send("<p> You found me</p>");
});

/**
 * @post Register new user
 */
router.post("/", registerUser);

module.exports = router;
