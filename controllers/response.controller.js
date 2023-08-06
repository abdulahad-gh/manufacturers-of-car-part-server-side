//function for handle success response
const successResponse = (res,{statusCode = 200,message='success',payload={}})=>{
    return res.status(statusCode).json({
        success:true,
        message,
        payload
    })
}

//function for handle error response
const errorResponse = (res,{statusCode=500,message='internal server error'})=>{
    return res.status(statusCode).json({
        success:false,
        message
    })
}


module.exports = {
    successResponse,
    errorResponse
}