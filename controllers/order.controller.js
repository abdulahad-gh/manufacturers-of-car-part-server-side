const orderServices = require('../services/order.service')



//orderAddController
exports.addOrder = async(req,res,next)=>{
try {
    const orderInfo = req.body
    const data = await orderServices.addOrder(orderInfo)
    return successResponse(res,{message:'successfully add order list',payload:data})
} catch (error) {
   next(error)
}
}


//getAllOrderController
exports.getAllOrderByEmail = async(req,res,next)=>{
    try {
        const email = req.params.email
        const data = await orderServices.getAllOrderByEmail(email)
        console.log(data)
        return successResponse(res,{message:'successfully get all order',payload:data})

    } catch (error) {
       next(error)
    }
}

//deleteOrderById
exports.deleteOrderById = async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
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

//getAllOrder
exports.getAllOrder = async(req,res)=>{
    try {
        const data = await orderServices.getAllOrder()
   if(!data){
    return res.status(400).json({
        status:"failed",
        error:"something went wrong!!",

    })
   }
        res.status(200).json({
            status:"success",
            message:"successfully get all order",
            data
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            error:error.message
        })
    }
}