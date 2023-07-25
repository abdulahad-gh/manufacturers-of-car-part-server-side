const reviewService = require('../services/review.service')

exports.review = async(req,res)=>{
    try {
        const data = await reviewService.review()
        res.status(200).json({
            status:'success',
            message:'sucessfully get all data',
            data
        })
        
    } catch (error) {
        res.status(400).json({
            status:'failed',
            error:error.message
        })
    }
}
