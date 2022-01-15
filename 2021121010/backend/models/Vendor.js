const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator = require("email-validator"); // To check if email is valid or not

// Create Schema
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
    validate: {
      validator: function (v) {
        return emailValidator.validate(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  contactNo: {
    //TODO: validate number
    type: Number,
    required: true,
  },
  // closeTime >= openTime VALIDATE TODO:
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    required: true,
  },
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);
