const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating:String,
    reviewOwner:String,
    reviewDesc:String,
    ownerImg:String
})

const Review = mongoose.model('Review',reviewSchema)
module.exports = Review;