const mongoose = require('mongoose')

const partSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name can't be empty"],
        trim:true,
        minLength:2,
        maxLength:100,
        unique:true,
        lowercase:true
    },
    description:String,
    price:{
        type:Number,
        required:[true,"price must be an number"]
    },
    image:String,
    stock:{
        type:String,
        required:[true,"stock can't be empty"],
        enum:{
            value:['in-stock','out-of-stock','discontinued'],
            message:"stock can't assign as {VALUE}"
        }
    },
    brand:{
        type:String,
        required:[true,"please, provide a brand name"],
        minLength:2,
        maxLength:30,
        lowercase:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const Part  = mongoose.model('Part',partSchema)
module.exports = Part;