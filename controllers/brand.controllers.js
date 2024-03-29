const brandService = require("../services/brand.service");
const { successResponse, errorResponse } = require("./response.controller");

//createBrand
exports.createBrandController = async (req, res, next) => {
  const brandData = req.body;
  const data = await brandService.createBrandService(brandData);
  try {
    if (!data) {
      return errorResponse(res,{message:'cannot crate a brand!'})

    }
    return res.status(200).json({message:'successfully create a brand',payload:data})

  } catch (error) {
   next(error)
  }
};

//getBrand
exports.getBrandController = async (req, res, next) => {

  const data = await brandService.getBrandService();
  try {
    if (!data) {
 return errorResponse(res,{message:'cannot get all brand!'})

    }
    return res.status(200).json({message:'successfully get all brand',payload:data})

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
   return res.status(200).json({message:'successfully updated',payload:data})
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
      return errorResponse(res,{message:'cannot delete any brand, with this id, plase provide a valid brand id!'})

    }
    return res.status(200).json({message:'successfully deleted brand',payload:data})

  } catch (error) {
   next(error)
  }
};
