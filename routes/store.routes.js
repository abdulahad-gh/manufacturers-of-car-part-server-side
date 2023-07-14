const express = require('express')
const storeControllers = require('../controllers/store.controller')

const routes = express.Router()

routes
.route('/')
    .post(storeControllers.createStoreController)
    .get(storeControllers.getAllStoreController)



module.exports = routes;