const Brand = require("../models/Brand");

//createBrandService
exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

//getBrandService
exports.getBrandService = async () => {
  const result = await Brand.find({}).populate('products').select('-brand');
  return result;
};
