const { ObjectId } = mongoose.Schema.Types
const {  mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    name:[{
        type: ObjectId,
        ref:"Part"
    }]
})

const Order = mongoose.model('Order',orderSchema)
exports = Order;