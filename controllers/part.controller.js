const fs = require("fs");
const checkIdExistsMiddleware = require("../middleware/checkIdExists");
const partServices = require("../services/part.services");

//fileUploderController
module.exports.postFileController = (req,res)=>{
  try{
    res.status(200).json(req.file)
  }catch(error){

  }

}

//createPartController
module.exports.postPartController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await partServices.postPartService(data);
    return successResponse(res,{message:'successfully create a part',payload:data})

  } catch (error) {
    next(error)
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
       const data = await partServices.postManyDataService(data)

  });
  return successResponse(res,{message:'successfully created many part',payload:data})

  } catch (error) {
    next(error)
  }
};

//getAllPartController//
module.exports.getAllPartController = async (req, res, next) => {
  try {
    
    let filters = {...req.query}
    let filtersStringify = JSON.stringify(filters).replace(/\b(gt|lt|gte|lte)\b/g,match=>`$${match}`)
    filters=JSON.parse(filtersStringify)
    const queries = {}
    //query property exclude//
    const excludeFields = ['sort','page','limit','select']
  excludeFields.forEach(field => delete filters[field])
    if(req.query.sort){
      queries.sortBy=req.query.sort.split(',').join(' ')
    }
    if(req.query.select){
    queries.select =  req.query.select.split(',').join(' ')
    console.log(queries)

      
    }
    if(req.query.page){
      const {page=1,limit=10} = req.query
      console.log(req.query)
      //pagenation system
      //product 50
      //page 1 => 1-10
      //page 2 => 11-20 2-1 * 10
      //page 3 => 21-30 3-1 * 10
      //page 4 => 31-40 4-1 * 10
      //page 5 => 41-50 5-1 * 10
      queries.skip = (page-1) * parseInt(limit)
      queries.limit = parseInt(limit)
    }

    const data = await partServices.getAllPartService(filters,queries);
    return successResponse(res,{message:'successfully get all part',payload:data})

  } catch (error) {
   next(error)
  }
};
//getOnePartController//
module.exports.getOnePartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await partServices.getOnePartService(id);
    return successResponse(res,{message:'successfully get one part',payload:data})

  } catch (error) {
    next(error)
  }
};

//deleteOnePartController//
module.exports.deleteOnePartController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await partServices.deleteOnePartService(id);

    if (!data.deletedCount) {
      return errorResponse(res,{message:'cannot delete any part, with this id, plase provide a valid part id!'})

    }
    return successResponse(res,{message:'successfully deleted one part',payload:data})

  } catch (error) {
    next(error)
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
