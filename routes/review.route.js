const express = require('express')

const routes = express.Router()
const reviewController= require('../controllers/review.controller')

routes.get('/',reviewController.review)

module.exports = routes;