const router = require("express").Router();
const Vendor = require("../models/Vendor");
const { Addon, Item } = require("../models/Item");
const authenticateToken = require("../lib/jwtAuth");
const checkEmpty = require("../lib/checkEmpty");

/**
 * Authentication wrapper middleware (for Vendor)
 * (checks if user accessing the page is Vendor)
 */
function checkVendor(req, res, next) {
  if (req.user.user.choice !== "Vendor")
    return res
      .status(403)
      .json({ error: "You are not authorized to this page" });

  next();
}

/**
 * Profile page
 */
router.get("/profile", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (vendor) return res.status(200).json(vendor);
});

// TODO: Edit profile
router.put("/profile", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);

  const managerName = checkEmpty(req.body.managerName)
    ? vendor.managerName
    : req.body.managerName;
  const shopName = checkEmpty(req.body.shopName) ? shopName : req.body.shopName;
  const email = checkEmpty(req.body.email) ? email : req.body.email;
  const contact = checkEmpty(req.body.contact) ? contact : req.body.contact;
  const openTime = checkEmpty(req.body.openTime) ? openTime : req.body.openTime;
  const closeTime = checkEmpty(req.body.closeTime)
    ? closeTime
    : req.body.closeTime;
  const password = checkEmpty(req.body.password) ? password : req.body.password;

  //TODO:
  const repassword = checkEmpty(req.body.managerName)
    ? managerName
    : req.body.managerName;
});

/**
 * Dashboard
 */

// Add food items for this vendor
router.post("/", authenticateToken, checkVendor, async (req, res) => {
  let vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);

  const email = vendor.email;
  const name = req.body.name;
  const price = req.body.price;
  const foodType = req.body.foodType;
  const addons = req.body.addons;
  const tags = req.body.tags;

  if (checkEmpty(name) || checkEmpty(foodType))
    return res.status(400).json({
      error: "Please fill the required fields",
    });

  if (price <= 0)
    return res.status(400).json({
      error: "Invalid Price",
    });

  for (let addon in addons) {
    //TODO: Check empty for addon (in frontend)

    let addonPrice = addon.price;
    try {
      addonPrice = parseInt(addonPrice);
    } catch (err) {
      return res.status(400).json({
        error: "Invalid price in addon element", //TODO: In frontend
      });
    }
  }

  // TODO: check tags (not empty) in frontend

  const newItem = new Item({
    email,
    name,
    price,
    foodType,
    addons,
    tags,
  });

  try {
    const item = await newItem.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Edit food Item TODO:
router.put("/:name", authenticateToken, checkVendor, async (req, res) => {
  let vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);
  const email = vendor.email;
  const name = req.body.name;
  const price = req.body.price;
  const foodType = req.body.foodType;
  const addons = req.body.addons;
  const tags = req.body.tags;

  if (checkEmpty(name) || checkEmpty(foodType))
    return res.status(400).json({
      error: "Please fill the required fields",
    });

  for (let addon in addons) {
    //TODO: Check empty for addon (in frontend)

    let addonPrice = addon.price;
    try {
      addonPrice = parseInt(addonPrice);
    } catch (err) {
      return res.status(400).json({
        error: "Invalid price in addon element", //TODO: In frontend
      });
    }
  }

  // TODO: check tags (not empty) in frontend

  const newItem = new Item({
    email,
    name,
    price,
    foodType,
    addons,
    tags,
  });

  try {
    const item = await newItem.save();
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// delete food item
router.delete("/:name", authenticateToken, checkVendor, async (req, res) => {
  let vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);

  try {
    await Item.deleteOne({ email: vendor.email, name: req.params.name });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Display all food items of this vendor
router.get("/", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (vendor) {
    const items = await Item.find({ email: vendor.email });
    return res.status(200).json(items);
  }
});

module.exports = router;
