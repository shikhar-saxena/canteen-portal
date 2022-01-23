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
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
    required: true, //!!!
  },
  foodType: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  addons: [AddonSchema],
  tag: [String],
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Addon, Item, AddonSchema, ItemSchema };
