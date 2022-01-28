const router = require("express").Router();
const Vendor = require("../models/Vendor");
const { Addon, Item } = require("../models/Item");
const Order = require("../models/Order");
const authenticateToken = require("../lib/jwtAuth");
const checkEmpty = require("../lib/checkEmpty");
const { getOrders, checkOrderLimit, orderCount } = require("../lib/vendor");

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

// Show all orders for this vendor
router.get("/orders", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);

  res.status(200).json(await getOrders(vendor));
});

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

/**
 * Statistics Page
 */
router.get("/statistics", authenticateToken, checkVendor, async (req, res) => {
  const vendor = await Vendor.findById(req.user.user._id);
  if (!vendor) return res.sendStatus(500);
  let count = await orderCount(vendor);

  return res.status(200).json(count);
  // TOP 5 items TODO:
});

module.exports = router;
