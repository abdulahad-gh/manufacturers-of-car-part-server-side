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

//getAllOrderController
exports.getAllOrderByEmail = async(req,res)=>{
    try {
        const email = req.params.email
        const data = await orderServices.getAllOrderByEmail(email)
        console.log(data)
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

//deleteOrderById
exports.deleteOrderById = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await orderServices.deleteOrderById(id)
        console.log(data)
        res.status(200).json({
            status:"success",
            message:"successfully deleted order "
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            error:error.message
        })
    }
}