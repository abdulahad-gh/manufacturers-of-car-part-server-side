const User = require("../models/User")


//signupService
module.exports.signupService = async(userData)=>{
    const data = userData
    const user = await User.create(data)
    return user
}


//userFindByEmailService
module.exports.userFindByEmailService = async(email)=>{
    const user = await User.find({email })
    return user
}