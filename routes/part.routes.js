const express = require('express');
const routes = express.Router()
const PartControllers =  require('../controllers/part.controller');
const uploder = require('../middleware/uploder');


routes.post('/file-upload',uploder.single('image'),PartControllers.postFileController)
routes.post('/add-part',PartControllers.postPartController)
routes.post('/add-part-many',PartControllers.postManyDataController)
routes.route('/bulk-update').patch(PartControllers.patchManyPartController)
routes.route('/bulk-delete').delete(PartControllers.deleteManyPartController)

routes.get('/',PartControllers.getAllPartController)

routes.route('/:id')
.get(PartControllers.getOnePartController)
.patch(PartControllers.patchOnePartController)
.delete(PartControllers.deleteOnePartController)




module.exports = routes;