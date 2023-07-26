const express = require('express');
const Route = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require("../middleware/verifyToken")

// Route.use(verifyToken)

Route.post('/signup/confirmation/:token',userController.confirmationToken)
Route.post('/signin',userController.signinController)
Route.get('/me',verifyToken,userController.getMe)

Route.get('/all',verifyToken,userController.getAllUser)

Route.put('/update-user-info/:email',userController.updateUserInfo)
Route.get('/admin/:email',userController.checkAdmin)
Route.put('/:email',userController.signupController)

module.exports=Route