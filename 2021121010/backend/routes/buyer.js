const router = require("express").Router();
const { Addon, Item } = require("../models/Item");
const authenticateToken = require("../lib/jwtAuth");
const checkEmpty = require("../lib/checkEmpty");
const Buyer = require("../models/Buyer");

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

//TODO: Edit profile

/**
 * Dashboard
 */

// TODO: Search bar ?
router.get("/", authenticateToken, checkBuyer, async (req, res) => {
  const items = await Item.find();
  if (items) return res.status(200).json(items);
});

// TODO: favourite section

module.exports = router;
