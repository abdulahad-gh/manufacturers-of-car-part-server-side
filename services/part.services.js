const Part = require("../models/Part")



// exports.getAllPartService = async()=>{
// const data = await Part.
// }

exports.postPartService = async (data) => {
    const result = await Part.create(data)
    return result
}