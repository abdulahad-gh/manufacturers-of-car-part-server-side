const mongoose = require('mongoose')
const validator=  require('validator')
const storeSchema = mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:[true,"please, provide a store name"],
        lowercase:true,
        enum:{
            values:['dhaka','chattogram','barishal','maymanshingh','syhlet','rajshahi','rangpur','khulna'],
            message:"this moment we have no plan in {VALUE} location. we are sorry!"
        }

    },
    contactNumber:String,
    email:{
        type:String,
        required:[true,"please, provide a email"],
        validate:[validator.isEmail,"please, provide a valid email"]
    },
    status:{
        type:String,
        enum:{
            values:['active','in-active'],
            message:"{VALUE} this value isn't aggre with our system!- only active or in-active"
        },
        default:'active'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Store = mongoose.model('Store',storeSchema)

module.exports = Store;