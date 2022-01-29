const router = require("express").Router();
const { Addon, Item } = require("../models/Item");
const authenticateToken = require("../lib/jwtAuth");
const checkEmpty = require("../lib/checkEmpty");
const Buyer = require("../models/Buyer");
const Order = require("../models/Order");

/**
 * Authentication wrapper middleware (for Buyer)
 * (checks if user accessing the page is Buyer)
 */
function checkBuyer(req, res, next) {
  if (req.user.user.choice !== "Buyer")
    return res
      .status(403)
      .json({ error: "You are not authorized to this page" });

  next();
}

/**
 * Profile Page
 */

router.get("/profile", authenticateToken, checkBuyer, async (req, res) => {
  const buyer = await Buyer.findById(req.user.user._id);
  if (buyer) return res.status(200).json(buyer);
});

/**
 * Dashboard
 */
router.get("/", authenticateToken, checkBuyer, (req, res) => {
  Item.find()
    .populate("vendor")
    .exec((error, items) => {
      if (error) return res.status(500).json({ error });
      else return res.status(200).json(items);
    });
});

// Add wallet money
router.put("/", authenticateToken, checkBuyer, async (req, res) => {
  let buyer = await Buyer.findById(req.user.user._id);
  if (!buyer) return res.sendStatus(500);

  let addedAmount = req.body.addedAmount;

  if (!addedAmount)
    return res.status(400).json({
      error: "Please add amount",
    });

  try {
    addedAmount = parseInt("" + addedAmount);

    if (addedAmount < 0) throw new Error();
  } catch (error) {
    return res.status(400).json({ error: "Invalid Added Amount" });
  }

  buyer = await Buyer.findOneAndUpdate(
    { _id: buyer._id },
    { wallet: buyer.wallet + addedAmount },
    { new: true }
  );

  if (buyer) return res.status(200).json(buyer);
  else return res.sendStatus(500);
});

// TODO: favourite section

// Place Order
router.post("/:itemId", authenticateToken, checkBuyer, async (req, res) => {
  const buyer = await Buyer.findById(req.user.user._id);
  if (!buyer) return res.sendStatus(500);

  let cost = req.body.itemPrice;
  const placedTime = req.body.placedTime;
  const quantity = req.body.quantity;
  const checked = req.body.checked;
  let wallet = req.body.wallet;

  try {
    parseInt(quantity);
    if (quantity <= 0) throw new Error();
  } catch (err) {
    return res.status(400).json({ error: "Invalid Quantity" });
  }

  let addons = [];

  checked.forEach((addon) => {
    // console.log(addon);
    if (addon.check) {
      cost += addon.addonPrice;
      addons = [...addons, addon];
    }
  });

  cost = cost * quantity;

  if (cost > wallet)
    return res
      .status(400)
      .json({ error: "Insufficient Money to buy the item" });

  wallet = wallet - cost;

  console.log(JSON.stringify(addons));

  const newOrder = new Order({
    placedTime,
    item: req.params.itemId,
    buyer: buyer._id,
    quantity,
    cost,
    addons,
  });

  try {
    let order = await newOrder.save();
    await Buyer.findOneAndUpdate({ _id: buyer._id }, { wallet: wallet });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

/**
 * My Orders
 */

module.exports = router;
