const reviewService = require('../services/review.service')

exports.review = async(req,res,next)=>{
    try {
        const data = await reviewService.review()
        return res.status(200).json({message:'successfully get all review',payload:data})

        
    } catch (error) {
       next(error)
    }
}
