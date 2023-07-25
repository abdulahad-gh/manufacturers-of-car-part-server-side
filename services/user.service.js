const User = require("../models/User")
const token = require('../utils/token')

//signupService
module.exports.signupService = async(userDoc)=>{
    
   const user = await User.create(userDoc)
    return user
}


//userFindByEmailService
module.exports.userFindByEmailService = async(email)=>{
    let user = await User.find({email })
    if(user[0]){
        user = user[0]
    }else{
        user = ""
        user = false
    }
    return user
}

//confirmationTokenService
module.exports.confirmationTokenService = async(token)=>{
    const user = await User.find({confirmationToken:token })
    return user
}
