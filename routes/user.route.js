const express = require('express')
const Route = express.Router()
const userController = require('../controllers/user.controller')

Route.post('signup',userController.signupController)