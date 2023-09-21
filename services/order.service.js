// const { ObjectId } = require('mongodb')
const { ObjectId } = require('mongodb')
const Order = require('../models/Order')


//addOrderService
exports.addOrder = async(orderInfo)=>{
    const findOrderById = await Order.find({_id: ObjectId(orderInfo.partId)})
    console.log(result,'with ress');

    if(!findOrderById){
        const result = await Order.create(orderInfo)
        return result
    }
    else{
        return false

    }     
}






//getAllOrderByEmailService
exports.getAllOrderByEmail = async(email)=>{
    const result = await Order.find({email})
    return result
}


//deleteOrderByIdService
exports.deleteOrderById = async(id)=>{
    const result = await Order.findOneAndDelete({_id:ObjectId(id)})
    return result
}


//getAllOrderService
exports.getAllOrder = async()=>{
    const result = await Order.find({})
    return result
}

//getOrderByIdService
exports.getOrderById = async(id)=>{
    const result = await Order.find({_id:ObjectId(id)})
    return result
}