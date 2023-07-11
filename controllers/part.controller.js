const fs = require("fs");
const checkIdExistsMiddleware = require("../middleware/checkIdExists");
const partServices = require("../services/part.services");

//createPartController
module.exports.postPartController = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(req.body);
    const result = await partServices.postPartService(data);
    res.status(200).json({
      success: true,
      message: "successfully post a part.",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//createManyDataController
module.exports.postManyDataController = async (req, res, next) => {
  try {
//     console.log("hiii");
  fs.readFileSync("/data/parts.json",async(err,data)=>{
       if(err){
              console.log(err)
              return
       }
       const result = await partServices.postManyDataService(data)

  });
//     console.log(data, "hi");
//     res.status(200).json({
//       success: true, 
//       message: "successfully post all parts.",
//       data: result,,
//     });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//getAllPartController//
module.exports.getAllPartController = async (req, res, next) => {
  try {
    
    let filters = {...req.query}
    let filtersStringify = JSON.stringify(filters).replace(/\b(gt|lt|gte|lte)\b/g,match=>`$${match}`)

    filters=JSON.parse(filtersStringify)
    
    
    console.log(filters)
    console.log(filtersStringify)
    const queries = {}
    //query property exclude//
    const excludeFields = ['sort','page','limit','select']
  excludeFields.forEach(field => delete filters[field])
    if(req.query.sort){
      queries.sortBy=req.query.sort.split(',').join(' ')
    }
    if(req.query.select){
      queries.select=req.query.select.split(',').join(' ')
    }

    const data = await partServices.getAllPartService(filters,queries);
    res.status(200).json({
      success: true,
      message: "successfully get all parts.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//getOnePartController//
module.exports.getOnePartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await partServices.getOnePartService(id);
    res.status(200).json({
      success: true,
      message: "successfully get a part.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//deleteOnePartController//
module.exports.deleteOnePartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await partServices.deleteOnePartService(id);

    if (!data.deletedCount) {
      return res.status(400).json({
        success: false,
        message: "Couln't find id",
      });
    }
    res.status(200).json({
      success: true,
      message: "successfully deleted a part.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//patchOnePartController//
module.exports.patchOnePartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkIdExists = await checkIdExistsMiddleware.checkIdExists(id);
    console.log(checkIdExists);
    if (!checkIdExists) {
      return res.status(404).json({
        success: false,
        message: "Couldn't find id",
      });
    }
    const data = await partServices.patchOnePartService(id, req.body);
    res.status(200).json({
      success: true,
      message: "successfully updated a part.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//patchManyPartController//
module.exports.patchManyPartController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await partServices.patchManyPartService(req.body);
    res.status(200).json({
      success: true,
      message: "successfully updated  parts.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//deleteManyPartController//
module.exports.deleteManyPartController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await partServices.deleteManyPartService(req.body);
    res.status(200).json({
      success: true,
      message: "successfully deleted  parts.",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
