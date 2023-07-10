const { default: mongoose, Mongoose } = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types.ObjectId
const Part = require("../models/Part");

//postPartService //
exports.postPartService = async (data) => {
  const result = await Part.create(data);
  return result;
};
//postManyDataService//
exports.postManyDataService = async (datas) => {
  const result = await Part.create(datas);
  return result;
};

//getAllPartService//
exports.getAllPartService = async (query) => {
  const data = await Part.find(query).find({});
  console.log(data);
  return data;
};

//getOnePartService//
exports.getOnePartService = async (id) => {
  const data = await Part.find({ _id: id });
  return data;
};

//deleteOnePartService//
exports.deleteOnePartService = async (id) => {
  const data = await Part.deleteOne({ _id: id });
  return data;
};
//deleteManyPartService//
exports.deleteManyPartService = async (ids) => {
  const data = await Part.deleteMany(ids);
  return data;
};
//patchOnePartService//
exports.patchOnePartService = async (id, updateDoc) => {
  const data = await Part.findOneAndUpdate({ _id: id }, updateDoc);
  return data;
};

//patchManyPartService//
exports.patchManyPartService = async (doc) => {
  // const data = await Part.updateMany({_id:doc.ids},doc.updateDoc,{runValidators:true})
  const products = [];
  doc.ids.forEach((item) => {
    products.push(
      Part.updateOne({ _id: item.id }, { price: item.product.price })
    );
  });

  const data = await Promise.all(products);
  return data;
};

//checkIdExistsService
exports.checkIdExists = async (id) => {
  const existsId = await Part.findOne({ _id: id });
  return existsId;
};
