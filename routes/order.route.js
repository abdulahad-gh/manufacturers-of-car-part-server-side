const express = require('express')
const routes =  express.Router()
const orderControllers  = require('../controllers/order.controller')


routes.post('/',orderControllers.addOrder)
routes.get('/:email',orderControllers.getAllOrder)



module.exports = routes