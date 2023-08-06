const mongoose = require('mongoose')
const { mongooseUrl } = require('../secret')

const connectDb = () =>{
  try {
    mongoose.connect(mongooseUrl)
    console.log('connected db successfully');
    
    mongoose.connection.on('error',(error)=>{
        console.log('db connection error')
    })
  } catch (error) {
    console.log('Could not connect to database',error.toString())
  }

}

module.exports = connectDb;