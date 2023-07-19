const User = require("../models/User");

exports.signupService = async(userInfo)=>{
    console.log(userInfo,99)
    const user = await User.create(userInfo)
    return user
}