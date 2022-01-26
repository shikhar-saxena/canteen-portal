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
  cost: {
    type: Number,
    required: true,
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
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
// const current = new Date();

// const time = current.toLocaleTimeString("en-US", {
//   hour: "2-digit",
//   minute: "2-digit",
// });

// console.log(time); // "5:25 AM"
// getHours and getMinutes
