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