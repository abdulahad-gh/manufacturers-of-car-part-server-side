// const { ObjectId } = require('mongodb')
const { ObjectId } = require('mongodb')
const Order = require('../models/Order')



//addOrderService
exports.addOrder = async(orderInfo)=>{
    const result = await Order.create(orderInfo)
    const findOrderById = await Order.find({_id: result._id})
    return findOrderById
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