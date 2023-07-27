const mongoose = require('mongoose');
const Brand = require("../models/Brand");
const Part = require("../models/Part");
const  {ObjectId} = mongoose.Types


//postPartService //
exports.postPartService = async (data) => {
  const result = await Part.create(data);
  //for update brand model products info array
  // const { _id: productId, brand } = result;
  // const res = await Brand.updateOne(
  //   { _id: brand.id },
  //   { $push: { products: productId } },
  //   { runValidators: true }
  // );
  return result;
};

//postManyDataService//
exports.postManyDataService = async (datas) => {
  const result = await Part.create(datas);
  return result;
};

//getAllPartService//
exports.getAllPartService = async (filters, queries) => {
  // const data = await Part.find(filters)
  //   .skip(queries.skip)
  //   .limit(queries.limit)
  //   .select(queries.select)
  //   .sort(queries.sortBy);
  // const total = await Part.countDocuments(filters);
  // const totalPage = Math.ceil((total / queries.limit));
  // return { total, totalPage, data };

  //mongoose 

  const data = await Part.aggregate([
    {
      $match:{}
    },
    // {
    //   $group:{
    //     _id:"$brand",
    //     totalPrice:{$sum:"$price"},
    //     totalAvg:{$avg:"$price"}
    //   }
    // },
    // {
    //   $sort:{totalPrice : -1}
    // }

  ])

  return  data;
};

//getOnePartService//
exports.getOnePartService = async (id) => {
  // const data = await Part.find({ _id: id }).populate('brand.id');
  const data = await Part.aggregate([
    {  $match: { _id: new ObjectId(id) } }
  ]);
  // console.log(data);
  return data;
};

//deleteOnePartService//
exports.deleteOnePartService = async (id) => {
  console.log(id,'71');
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
  // const data = await Part.findOneAndUpdate({ _id: id }, updateDoc);

  const data = await Part.aggregate([
    {
      $match:{_id: new ObjectId(id)}
    },
    {
      $set:{...updateDoc,modified:"$$NOW"}
    }
  ]);
  console.log({...updateDoc,modified:"$$NOW"})
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
