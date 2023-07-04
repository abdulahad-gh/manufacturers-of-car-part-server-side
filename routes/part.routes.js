const express = require('express');
const routes = express.Router()
const postPartControllers =  require('../controllers/part.controller')


routes.post('/add-part',postPartControllers.postPartController)
// .get('/',postPartController)

module.exports = routes;