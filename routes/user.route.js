const express = require('express');
const Route = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require("../middleware/verifyToken")

// Route.use(verifyToken)

Route.post('/signup',userController.signupController)
Route.post('/signin',userController.signinController)
Route.get('/me',verifyToken,userController.getMe)

Route.put('/:email',userController.userFindByEmailController)

module.exports=Route