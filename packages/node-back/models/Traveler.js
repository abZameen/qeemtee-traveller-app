const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { isMobilePhone } = require("validator");

const { Schema } = mongoose;

const travelerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"]
    },
    dob: {
      type: Date,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: [isMobilePhone, "invalid mobile phone"]
    }
    //    Schema Options
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Traveler", travelerSchema);
