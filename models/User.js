const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require('crypto')

const userSchema = mongoose.Schema(
  {
 name:{
  type: String,
  unique:true,
  lowercase:true,
  trim:true

 },
 email:{
  type: String,
  required:[true,"please provide a email!"],
  validate:[validator.isEmail,"please, provide a valid email"],
  unique:true,
  lowercase:true,
  trim:true

 },
    password: {
      type: String,
      validate: {
        validator: async (value) => {
          return await validator.isStrongPassword(value);
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
        message: "password don't matched, please type again!",
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
      enum: ["user", "store-manager", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },
    imgURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    confirmationToken:String,
    confirmationTokenExpired:Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
  },
  {
    timestamps: true,
  }
  );
  
  userSchema.pre("save",  function (next) {
    const  plainPassword = this.password
    const encyrptPassword =  bcrypt.hashSync(plainPassword,9);
    this.password = encyrptPassword;
    this.confirmPassword = undefined;
  
    next();
  });

  userSchema.methods.comparePassword =  function (password, hashPass) {
    const isValidPass = bcrypt.compareSync(password,hashPass)

    return isValidPass;
  };




// //add method for generate confirmation token
// userSchema.methods.generateConfirmationToken = function (){
//   const token = crypto.randomBytes(32).toString("hex")
//   this.confirmationToken = token
//   const date =  new Date;
//   date.setDate(date.getDate()+1)
//   this.confirmationTokenExpired = date

//   return token
// }


const User = mongoose.model("User", userSchema);
module.exports = User;
