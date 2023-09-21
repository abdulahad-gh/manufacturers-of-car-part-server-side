const storeServices = require("../services/store.services");

//createStoreController
exports.createStoreController = async (req, res) => {
  try {
    const storeDoc = req.body;
    const data = await storeServices.createStoreService(storeDoc);
    return res.status(200).json( {
      message: "successfully created a store",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

//getAllStoreController
exports.getAllStoreController = async (req, res,next) => {
  try {
    const data = await storeServices.getAllStoreService();
    return res.status(200).json({message:'successfully all store',payload:data})

  } catch (error) {
   next(error)
  }
};

//updateStoreByIdController
exports.updateStoreByIdController = async (req, res,next) => {
  try {
    const { id } = req.params;
    const updateStoreDoc = req.body;
    const data = await storeServices.updateStoreByIdService(id, updateStoreDoc);
    return res.status(200).json({message:'successfully updated a store',payload:data})

  } catch (error) {
   next(error)
  }
};
