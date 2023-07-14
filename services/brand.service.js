const Brand = require("../models/Brand");

//createBrandService
exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

//getBrandService
exports.getBrandService = async () => {
  const result = await Brand.find({}).populate('products')
  return result;
};

//updateBrandByIdService
exports.updateBrandByIdService = async (id,updateDoc) => {
  const result = await Brand.updateOne({_id:id},updateDoc,{runValidators:true})
  console.log(result)
  return result;
};

//deleteBrandByIdService
exports.deleteBrandByIdService = async (id) => {
  const result = await Brand.deleteOne({_id:id})
  return result;
};


