const { postPartService } = require("../services/part.services")

//create part
exports.postPartController = async(req,res,next)=>{
       const data = req.body
       const result = await postPartService(data)
       res.status(200).json({
success:true,
message:'successfully post a part.',
data:result
       })

}
//  export const  getAllPartController =  async(req,res,next)=>{
//         const result = await 
//         re
        
//  }
