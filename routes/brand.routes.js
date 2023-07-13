const express = require("express");
const brandControllers = require("../controllers/brand.controllers");
const routes = express.Router();

routes
  .route("/")
  .post(brandControllers.createBrandController)
  .get(brandControllers.getBrandController);

module.exports = routes;
