const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ItemSchema } = require("../models/Item");

const VendorSchema = new Schema({
  managerName: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // items: [ItemSchema],
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
