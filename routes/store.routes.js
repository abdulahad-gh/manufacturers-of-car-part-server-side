const express = require('express')
const storeControllers = require('../controllers/store.controller')

const routes = express.Router()

routes
.route('/')
    .post(storeControllers.createStoreController)



module.exports = routes;