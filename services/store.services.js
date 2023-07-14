const Store = require('../models/Store')

exports.createStoreService =async (storeDoc) => {
    const result  = await Store.create(storeDoc)
    return result;
}