const Review = require('../models/Review')



//getAllReviewService
exports.review = async()=>{
    const result =  await Review.find({})
    return result
}