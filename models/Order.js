const {  mongoose } = require("mongoose");
const validator = require('validator')
const orderSchema = mongoose.Schema({
    partId:String,
    partName:String,
    img:String,
    price:Number,
    email:{
        type:String,
        validate:[validator.isEmail,"your {VALUE} is not vaid email!"]

    },
    name:String,
    phone:String
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order;