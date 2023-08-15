const express = require('express');
const routes = express.Router()
const PartControllers =  require('../controllers/part.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');
const uploder = require('../middleware/uploder');



routes.post('/file-upload',uploder.single('okbro'),PartControllers.postFileController)
routes.post('/add-product',PartControllers.postPartController)
routes.post('/add-part-many',PartControllers.postManyDataController)
routes.route('/bulk-update').patch(PartControllers.patchManyPartController)
routes.route('/bulk-delete').delete(PartControllers.deleteManyPartController)

routes.get('/',PartControllers.getAllPartController)

routes.route('/:id')
.get(PartControllers.getOnePartController)
.patch(verifyToken,authorization("store-manager","admin"),PartControllers.patchOnePartController)
.delete(PartControllers.deleteOnePartController)




module.exports = routes;