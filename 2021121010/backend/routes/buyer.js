const router = require("express").Router();
const Buyer = require("../models/Buyer");

/**
 * Dashboard
 */

/**
 * Profile Page
 */

router.get("/", (req, res) => {
  res.send("<p> You found me</p>");
});
router.post("/", (req, res) => {});

module.exports = router;
