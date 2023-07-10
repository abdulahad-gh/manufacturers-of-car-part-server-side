const app = require('./app')
const mongoose = require('mongoose')
const colors = require('colors')


//database connection
mongoose.connect(  process.env.DATABASE_LOCAL).then(()=>{
console.log('database connected successfully'.green)
})



//server
const port = process.env.PORT || 8080;


app.listen(port,() => {
    console.log("manufacturer", port);
})
