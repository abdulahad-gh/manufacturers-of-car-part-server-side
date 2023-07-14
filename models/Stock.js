const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can't empty"],
    unique: [true, "name must be unique"],
  },
  price: {
    type: Number,
    required: [true, "please, provide price"],
  },
  quantity: {
    type: Number,
    required: [true, "please, provide quantity"],
  },
  part: {
    type: ObjectId,
    ref: "Part",
  },
  brand: {
    name: {
      type: String,
      required: [true, "please, provide a brand name"],
    },
    id: {
      type: ObjectId,
      ref: "Brand",
    },
  },
  store: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Store",
    },
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
