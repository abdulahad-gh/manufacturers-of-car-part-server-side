const orderServices = require('../services/order.service')



//orderAddController
exports.addOrder = async(req,res)=>{
try {
    const orderInfo = req.body
    const data = await orderServices.addOrder(orderInfo)
    res.status(200).json({
        status:"success",
        message:"successfully order ",
        data
    })

} catch (error) {
    res.status(400).json({
        status:"failed",
        error:error.message
    })
}
}