const stockServices = require('../services/stock.services')

//createStockController
exports.createStockController = async(req,res,next)=>{
    try {
        
        const stockDoc = req.body
        const data = await stockServices.createStockService(stockDoc);
        return successResponse(res,{message:'successfully created a stock',payload:data})

    }catch(error){
  next((error))
    }
}