const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
  name: {
    type: String,
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
  age: {
    type: Number,
    required: true,
  },
  batchName: {
    type: String,
    enum: ["UG1", "UG2", "UG3", "UG4", "UG5"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
  },
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);

/* Orders
Buyer id
vendor id
item id
quantity
status
cost = price * quantity
rating (by buyer)
*/
