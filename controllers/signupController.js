const userService  = require('../services/user.service')

exports.signupController = async(req,res)=>{
try{
const data = await userService.signupService(req.body)
if(!data) {
    return res.status(500).json({
        status:"failed",
        error:"can't created account, something went wrong!!!"
    })
}
res.status(200).json({status:"success",message:"successfully signup.",data})
}
catch (error) {
    res.status(500).json({
        status:"failed",
        error
    })
}
}