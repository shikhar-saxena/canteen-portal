const router = require("express").Router();
const Vendor = require("../models/Vendor");
// const { Addon, Item } = require("../models/Item");

/**
 * Dashboard
 */

/* GET */
router.get("/", (req, res) => {
  // Display all food items of this vendor
  Vendor.findById(req.body.id, (err, vendor) => {
    console.log(vendor);
  });
  res.send("<p> You found me</p>");
});
router.post("/", (req, res) => {});

/**
 * Profile Page
 */

/* @GET */
router.get("/profile", (req, res) => {
  Vendor.findById(req.body.id, (err, vendor) => {
    if (err) {
      console.log(err);
      res.send("Nah");
    } else {
      (vendor) => res.json(vendor);
    }
  });
});

/* @PUT */
router.put("/profile", (req, res) => {
  console.log("TODO:");
});

module.exports = router;
