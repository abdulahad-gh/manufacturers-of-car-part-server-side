const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const partSchema = mongoose.Schema(
  {
    part: {
      type: String,
      required: [true, "name can't empty"],
      unique: [true, "name must be unique"],
    },
    desc: String,
    price: Number,
    img: String,
    // brand: {
    //   name: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //   },
    //   id: { type: ObjectId, ref: "Brand", required: true },
    // },
    stock: {
      type: String,
      required: [true, "stock can't be empty"],
      enum: ["in-stock", "out-of-stock", "discontinued"],
      default: "in-stock",
    },

    availableQuan: Number,
    minQuan: Number,
  },
  {
    timestamps: true,
  }
);

//pre middleware before save
partSchema.pre("save", function (next) {
  if (Number(this.stock) === 0) {
    this.stock = "out-of-stock";
  }
  next();
});

//post middleware after save
partSchema.post("save", function (doc, next) {
  console.log(`this is from ${doc.part}`);
  next();
});
partSchema.method.logger = function () {
  console.log("this is from logger...", this.part);
};

const Part = mongoose.model("Part", partSchema);
module.exports = Part;
