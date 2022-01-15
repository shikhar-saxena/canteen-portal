const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator = require("email-validator"); // To check if email is valid or not

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
        type: String,
        unique: true,
		required: true,
        validate: {
            validator: function(v) {
                return emailValidator.validate(v);
            },
            message: (props) => `${props.value} is not a valid email address!`
        }
	},
    contactNo: {
        //TODO: validate number
        type: Number,
        required: true
    },
    age: {
        // Validate age TODO:
        type: Number,
        required: true
    },
    batchName: {
        enum: {
            values: ["UG1", "UG2", "UG3", "UG4", "UG5"],
            message: '{VALUE} is not supported'
        },
        required: true
    }
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);