const mongoose = require("mongoose");
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types;
const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Part",
      },
    ],
    name: {
      type: String,
      required: [true, "please provide a brand name"],
      trim: true,
      minLength: [3, "brand name is too short , at least more then 3 "],
      maxLength: [100, "brand name is too long, please not more then 100"],
      unique: [true, "brand can't be duplicate"],
      lowercase: true,
    },
    desc: String,
    img: {
      type: String,
      validator: [validator.isURL, "please, provide a valid img url"],
    },
    location: String,
    email: {
      type: String,
      required: [true, "please, provie a email"],
      validator: [validator.isEmail, "please, provide a valid email"],
    },
    website: {
      type: String,
      required: [true, "please, provie a website url"],
      validator: [validator.isURL, "please, provide a valid url"],
    },
    supplier: {
      name: String,
      email: String,
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    status: {
      type: String,
      enum: ['active', 'in-active', 'discountinued'],
      default: "active",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
