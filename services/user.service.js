const User = require("../models/User")


//signupService
module.exports.signupService = async(userData)=>{
    const data = userData
    console.log(data)
    const user = await User.create(data,{runValidators:true})
    return user
}


//userFindByEmailService
module.exports.userFindByEmailService = async(email)=>{
    const user = await User.find({email })
    return user
}

//confirmationTokenService
module.exports.confirmationTokenService = async(token)=>{
    const user = await User.find({confirmationToken:token })
    return user
}
