const stockServices = require('../services/stock.services')

//createStockController
exports.createStockController = async(req,res)=>{
    try {
        
        const stockDoc = req.body
        const data = await stockServices.createStockService(stockDoc);
       res.status(200).json({
        status:'success',
        message:'successfully create a stock.'
       })
    }catch(error){
    res.status(400).json({
        status:'fail',
        error:error.message
    })
    }
}