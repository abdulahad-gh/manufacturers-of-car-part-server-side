const express = require('express')

const routes = express.Router()

routes.get('/',(req,res,next)=>{
    res.send('part get route with mvc arch...')
})

module.exports = routes;