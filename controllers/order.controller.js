const orderServices = require('../services/order.service')



//orderAddController
exports.addOrder = async(req,res,next)=>{
try {
    const orderInfo = req.body
    const data = await orderServices.addOrder(orderInfo)
    if(!data){
        return res.status(400).json({success:false,message:'already exists order'})
    }
    return res.status(200).json({message:'successfully add order list',payload:data})
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
        return res.status(200).json({message:'successfully get all order',payload:data})

    } catch (error) {
       next(error)
    }
}

//deleteOrderById
exports.deleteOrderById = async(req,res,next)=>{
    try {
        const id = req.params.id
        console.log(id)
        const data = await orderServices.deleteOrderById(id)
        return res.status(200).json({message:'successfully deleted order',payload:data})
       
    } catch (error) {
      next(error)
    }
}

//getAllOrder
exports.getAllOrder = async(req,res,next)=>{
    try {
        const data = await orderServices.getAllOrder()
   if(!data){
    return errorResponse(res,{message:'cannot get all order!'})
   }

   return res.status(200).json({message:'successfully get all order',payload:data})

    } catch (error) {
       next(error)
    }
}

//getOrderDetailsById
exports.getOrderById = async(req,res,next)=>{
    try {
        console.log(req.params.id,'from controllers');
        const order = await orderServices.getOrderById(req.params.id)
        return res.status(200).json({message:'successfully get order details by id',payload:order})
    } catch (error) {
        next(error)
    }
}