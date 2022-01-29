const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  placedTime: {
    type: String,
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addons: [
    {
      addonName: String,
      addonPrice: Number,
      check: Boolean,
    },
  ],
  cost: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: [
      "PLACED",
      "ACCEPTED",
      "REJECTED",
      "COOKING",
      "READY FOR PICKUP",
      "COMPLETED",
    ],
    default: "PLACED",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
