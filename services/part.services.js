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