const router = require("express").Router();
const Vendor = require("../models/Vendor");
const { Addon, Item } = require("../models/Item");
const Order = require("../models/Order");
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
    vendor: vendor._id,
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
  // const email = vendor.email;
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
    // email,
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

  Item.deleteOne({ name: req.params.name, vendor: vendor._id }).exec(
    (err, item) => {
      if (!err) return res.sendStatus(200);
      else return res.status(500).json({ error });
    }
  );
});

// Display all food items of this vendor
router.get("/", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);

  const items = Item.find({ vendor: vendor._id }).exec((error, items) => {
    if (error) return res.status(500).json({ error });
    else return res.status(200).json(items);
  });
});

/**
 * Orders page
 */

// Returns orders for a particular vendor
async function getOrders(vendor) {
  const items = await Item.find({ vendor: vendor._id });

  let orders = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i])
      orders = [...orders, await Order.find({ item: items[i]._id })];
  }

  return orders;
}

// Show all orders for this vendor
router.get("/orders", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);

  res.status(200).json(await getOrders(vendor));
});

async function checkOrderLimit(vendor) {
  let orders = await getOrders(vendor);

  let count = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === "ACCEPTED" || orders[i].status === "COOKING")
      count++;
  }

  return count;
}

// Move to the next stage
router.put(
  "/orders/:orderId",
  authenticateToken,
  checkVendor,
  async (req, res) => {
    const vendor = await Vendor.findById(req.user.user._id);
    if (!vendor) return res.sendStatus(500);

    let order = await Order.findById(req.params.orderId);

    // Whether Move to next stage (1) or reject
    let orderChoice = req.body.orderChoice;

    let newStatus, count;

    switch (order.status) {
      case "PLACED":
        count = await checkOrderLimit(vendor);
        if (orderChoice === 1) {
          if (count < 10) newStatus = "ACCEPTED";
          else
            return res
              .status(200)
              .json({ error: "You cannot accept more orders" });
        } else newStatus = "REJECTED";
        break;
      case "ACCEPTED":
        newStatus = "COOKING";
        break;
      case "COOKING":
        newStatus = "READY FOR PICKUP";
        break;
    }

    order = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      { status: newStatus },
      { new: true }
    );

    if (order) return res.status(200).json(order);
    else return res.sendStatus(500);
  }
);

module.exports = router;
