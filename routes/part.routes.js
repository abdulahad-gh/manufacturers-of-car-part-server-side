const express = require('express');
const routes = express.Router()
const PartControllers =  require('../controllers/part.controller')


routes.post('/add-part',PartControllers.postPartController)
routes.get('/',PartControllers.getAllPartController)

routes.route('/:id')
.get(PartControllers.getOnePartController)
.delete(PartControllers.deleteOnePartController)


module.exports = routes;