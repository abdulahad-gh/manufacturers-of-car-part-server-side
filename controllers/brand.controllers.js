const brandService = require("../services/brand.service");
const { successResponse, errorResponse } = require("./response.controller");

//createBrand
exports.createBrandController = async (req, res, next) => {
  const brandData = req.body;
  const data = await brandService.createBrandService(brandData);
  try {
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "brand cannot created, someting went wrong...",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully create a brand",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//getBrand
exports.getBrandController = async (req, res, next) => {

  const data = await brandService.getBrandService();
  try {
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "brand data can't get, someting went wrong...",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully get brand",
      data,
    });
  } catch (error) {
    next(error)
  }
};

//updateBrand
exports.updateBrandByIdController = async (req, res, next) => {

  const {id} = req.params
  const updateDoc = req.body
  const data = await brandService.updateBrandByIdService(id,updateDoc);
  try {
    if (!data) {
      return errorResponse(res,{message:'cannot find any brand, with this id, plase provide a valid brand id!'})
    }
   return successResponse(res,{message:'successfully updated',payload:data})
  } catch (error) {
    next(error)
  }
};

//deleteBrand
exports.deleteBrandByIdController = async (req, res, next) => {

  const {id} = req.params
  const data = await brandService.deleteBrandByIdService(id);
  try {
    if (!data) {
      return res.status(400).json({
        status: "fail",
        error: "brand data can't delete with this id, someting went wrong...",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully deleted the brand",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
