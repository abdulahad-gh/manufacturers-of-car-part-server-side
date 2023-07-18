const User = require("../models/User");

exports.signupService = async(userInfo)=>{
    const user = await user.create(userInfo,{runValidators:true})
    return user
}