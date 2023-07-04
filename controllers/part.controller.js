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
//getOnePartController//
module.exports.getOnePartController =  async(req,res,next)=>{
try {
       const {id} = req.params
       const data = await partServices.getOnePartService(id)
       res.status(200).json({
              success:true,
              message:'successfully get a part.',
              data
                     })
       
} catch (error) {
       res.status(404).json({
              success:false,
              message:error.message
       })
}        
 }
//deleteOnePartController//
module.exports.deleteOnePartController =  async(req,res,next)=>{
try {
       const {id} = req.params
       const data = await partServices.deleteOnePartService(id)
       res.status(200).json({
              success:true,
              message:'successfully deleted a part.',
              data
                     })
       
} catch (error) {
       res.status(404).json({
              success:false,
              message:error.message
       })
}        
 }
//patchOnePartController//
module.exports.patchOnePartController =  async(req,res,next)=>{
try {
       const {id} = req.params
       const data = await partServices.patchOnePartService(id,req.body)
       res.status(200).json({
              success:true,
              message:'successfully updated a part.',
              data
                     })
       
} catch (error) {
       res.status(404).json({
              success:false,
              message:error.message
       })
}        
 }
