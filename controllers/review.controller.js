const reviewService = require('../services/review.service')

exports.review = async(req,res,next)=>{
    try {
        const data = await reviewService.review()
        return successResponse(res,{message:'successfully get all review',payload:data})

        
    } catch (error) {
       next(error)
    }
}
