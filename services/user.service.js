const User = require("../models/User")
const token = require('../utils/token')

//signupService
module.exports.signupService = async(email,userDoc)=>{
    const filter = {email}
    const updateDoc = {
        $set:userDoc
    }
    const options = {upsert:true}
    const result = await User.findOneAndUpdate(filter,updateDoc,options)

    
    return result
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

//checkAdminService
module.exports.checkAdmin = async(email)=>{
    const user = await User.find({email})
    return user
}

//updateUserInfo
module.exports.updateUserInfo = async(email,data)=>{
    const filter = {email}
    const updateData = {
        $set:data
    }
    const options = {
        upsert:true
    }
    const user = await User.findOneAndUpdate(filter,updateData,options)
    return user
}
