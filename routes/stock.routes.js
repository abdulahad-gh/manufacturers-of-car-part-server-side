const express = require('express')
const stockControllers = require('../controllers/stock.controllers')

const routes = express.Router()

routes
    .route('/')
        .post(stockControllers.createStockController)



module.exports = routes;