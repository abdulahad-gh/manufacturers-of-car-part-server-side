const Stock =  require('../models/Stock')

//createStockService
exports.createStockService = async(stockDoc)=>{
    const result = await Stock.create(stockDoc,{
        runValidators:true
    })
}