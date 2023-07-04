const mongoose = require('mongoose')

const partSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name can't empty"],
        unique:[true,'name must be unique']
    },
    desc:String,
    price:Number,
    img:String,
    stock:{
        type:String,
        required:[true,"stock can't be empty"],
        enum: ['in-stock','out-of-stock','discontinued'],
        default:'in-stock'
    },
    availableQuan:Number,
    minQuan:Number,

},{
    timestamps:true
})

const Part  = mongoose.model('Part',partSchema)
module.exports = Part;