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
module.exports.updateUserInfo = async(email,updateDoc)=>{
    const filter = {email}
    const options = {
    new:true,
    runvalidators:true
    }

    const user = await User.findOneAndUpdate(filter,updateDoc,options)
    return user
}

//getAllUserService
module.exports.getAllUser = async()=>{
    return  await User.find({})
}

//makeAdminService
module.exports.makeAdmin = async(email)=>{

    const filter =  {email:email}
    console.log(filter);
    const updateDoc = {
     $set: {role:"admin"}
    }

    const result = await User.findOneAndUpdate(filter,updateDoc,{new:true,upsert:true})
    return result
}