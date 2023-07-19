const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      // required: [true, "please, provide a eamil"],
      validate: [validator.isEmail, "please, provide a valid email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message: "password should be strong.",
      },
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          console.log(value === this.password);
          return value === this.password;
        },
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
    imgURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.methods.comparePassword = function (password, hashPass) {
  const idValidPass = bcrypt.compareSync(password, hashPass);
  return idValidPass;
};

userSchema.pre("save", function (next) {
  const encyrptPassword = bcrypt.hashSync(this.password);
  this.password = encyrptPassword;
  this.confirmPassword = undefined;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
