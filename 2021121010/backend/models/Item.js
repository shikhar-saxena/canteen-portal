const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Addon = mongoose.model("Addon", AddonSchema);

const ItemSchema = new Schema({
  email: {
    // Vendor email
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    sum: 0, // Sum of ratings
    count: 0, // Count of buyer rating this item
  },
  foodType: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  addons: [AddonSchema],
  tags: [String],
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Addon, Item, AddonSchema, ItemSchema };
