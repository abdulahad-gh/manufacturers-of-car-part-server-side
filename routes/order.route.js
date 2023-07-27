const express = require('express')
const routes =  express.Router()
const orderControllers  = require('../controllers/order.controller')


routes.get('/all',orderControllers.getAllOrder)

routes.post('/',orderControllers.addOrder)

routes.get('/:email',orderControllers.getAllOrderByEmail)
routes.delete('/:id',orderControllers.deleteOrderById)


module.exports = routes