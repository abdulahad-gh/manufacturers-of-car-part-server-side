const storeServices =  require('../services/store.services')


//createStoreController
exports.createStoreController = async (req,res)=>{
try{
    const storeDoc = req.body
    const data = await storeServices.createStoreService(storeDoc);
   res.status(200).json({
    status:'success',
    message:'successfully create a store.'
   })
}catch(error){
res.status(400).json({
    status:'fail',
    error:error.message
})
}
}


//getAllStoreController
exports.getAllStoreController = async (req,res)=>{
try{
    const data = await storeServices.getAllStoreService();
   res.status(200).json({
    status:'success',
    message:'successfully get all store.',
    data

   })
}catch(error){
res.status(400).json({
    status:'fail',
    error:error.message
})
}
}