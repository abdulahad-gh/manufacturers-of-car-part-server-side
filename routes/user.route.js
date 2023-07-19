const express = require('express');
const Route = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require("../middleware/verifyToken")


Route.post('/signup',userController.signupController)
Route.post('/signin',userController.signinController)
Route.get('/me',verifyToken,userController.getMe)

module.exports=Route