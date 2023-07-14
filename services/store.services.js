const Store = require('../models/Store')


//createStoreService
exports.createStoreService =async (storeDoc) => {
    const result  = await Store.create(storeDoc,{runValidators:true})
    return result;
}

//getAllStoreService
exports.getAllStoreService =async () => {
    const result  = await Store.find({})
    return result;
}