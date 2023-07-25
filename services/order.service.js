// const { ObjectId } = require('mongodb')
const { ObjectId } = require('mongodb')
const Order = require('../models/Order')



//addOrderService
exports.addOrder = async(orderInfo)=>{
    const result = await Order.create(orderInfo)
    console.log(orderInfo)
    console.log(result)
    const findOrderById = await Order.find({_id: result._id})
    console.log(findOrderById)
    return findOrderById
}