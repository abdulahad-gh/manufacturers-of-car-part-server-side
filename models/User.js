const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please, provide a eamil"],
    validate: [validator.isEmail, "please, provide a valid email"],
    unique: [true, "this {VALUE} already exists"],
  },
  password: {
    type: String,
    required: [true, "please, provide a password"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minUppercase: 2,
          minLowercase: 2,
          minNumbers: 1,
          minSymbols: 1,
        }),
      message: "please, provide a valid password",
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "please, re-enter password"],
    validate: {
      validator: (value) => this.password === value,
      message: "password don't matched, pleas type again!",
    },
  },
  firstName: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  contactNumber: String,
  address: {
    type: String,
    maxLength: 100,
  },
  socialLinks: {
    facebook: String,
    linkedin: String,
    github: String,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);
module.exports = User;
