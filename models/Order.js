const { ObjectId } = mongoose.Schema.Types
const {  mongoose } = require("mongoose");

const orderSchema = mongoose.Schema()

const Order = mongoose.model('Order',orderSchema)
exports = Order;