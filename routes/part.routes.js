const express = require('express');
const { postPartController } = require('../controllers/part.controller');

const routes = express.Router()

routes.get('/',postPartController)

module.exports = routes;