const partServices = require("../services/part.services")

//createPartController
module.exports.postPartController = async(req,res,next)=>{
try {
       const data = req.body
       console.log(req.body)
       const result = await partServices.postPartService(data)
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
}}
 
//getAllPartController//
module.exports.getAllPartController =  async(req,res,next)=>{
try {
       const data = await partServices.getAllPartService()
       res.status(200).json({
              success:true,
              message:'successfully get all parts.',
              data
                     })
       
} catch (error) {
       res.status(404).json({
              success:false,
              message:error.message
       })
}        
 }
