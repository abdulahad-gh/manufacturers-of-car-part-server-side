const userController = require('../controllers/user.controller')
const express = require('express');
const Route = express.Router()

Route.post('/signup',userController.signupController)
Route.post('/signin',userController.signinController)

module.exports=Route;