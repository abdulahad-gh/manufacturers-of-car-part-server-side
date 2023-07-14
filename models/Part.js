const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const partSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name can't empty"],
      unique: [true, "name must be unique"],
    },
    desc: String,
    price: Number,
    img: String,
    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: { type: ObjectId, ref: "Brand", required: true },
    },
    stock: {
      type: String,
      required: [true, "stock can't be empty"],
      enum: ["in-stock", "out-of-stock", "discontinued", "0"],
      default: "in-stock",
    },

    availableQuan: Number,
    minQuan: Number,
  },
  {
    timestamps: true,
  }
);

partSchema.pre("save", function (next) {
  if (this.stock == 0) {
    this.stock = "out-of-stock";
  }
  next();
});
partSchema.post("save", function (doc, next) {
  console.log(`this is from ${doc.name}`);
  next();
});
partSchema.method.logger = function () {
  console.log("this is from logger...", this.name);
};

const Part = mongoose.model("Part", partSchema);
module.exports = Part;
