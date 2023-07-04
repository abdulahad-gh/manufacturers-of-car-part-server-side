const Part = require("../models/Part")



//postPartService //
exports.postPartService = async (data) => {
    const result = await Part.create(data)
    return result
}

//getAllPartService//
exports.getAllPartService = async()=>{
const data = await Part.find()
return data
}

//getOnePartService//
exports.getOnePartService = async(id)=>{
const data = await Part.find({_id:id})
return data
}

//deleteOnePartService//
exports.deleteOnePartService = async(id)=>{
const data = await Part.deleteOne({_id:id})
return data
}
//patchOnePartService//
exports.patchOnePartService = async(id,updateDoc)=>{
const data = await Part.findOneAndUpdate({_id:id},updateDoc)
return data
}