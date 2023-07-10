const { checkIdExists } = require("../services/part.services")

exports.checkIdExists = async (id) => {
    const result = await checkIdExists(id)
    return result;
}