const { postPartService } = require("../services/part.services")

//create part
module.exports.postPartController = async(req,res,next)=>{
try {
       const data = req.body
       console.log(req.body)
       const result = await postPartService(data)
       res.status(200).json({
success:true,
message:'successfully post a part.',
data:result
       })
} catch (error) {
       res.status(404).json({
              success:false,
              message:error.message
       })
}
}
//  export const  getAllPartController =  async(req,res,next)=>{
//         const result = await 
//         re
        
//  }
