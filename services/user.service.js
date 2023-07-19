const User = require("../models/User");


//signupService
exports.signupService = async(userData)=>{
    console.log(userData,99)
    // const user = 
    console.log(await User.create(userData))
    // return user
}


//userFindByEmailService
exports.userFindByEmailService = async(email)=>{
    const user = await User.find({email })
    return user
}