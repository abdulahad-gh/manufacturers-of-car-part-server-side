const brandService = require("../services/brand.service");

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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
