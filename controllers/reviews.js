const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); 


module.exports.reviewsPostRoute = async(req, res) => {
    let {id} = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();   
    req.flash("success", "New Review added");

    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
};


module.exports.deleteReviewRoute = async (req, res) => {
    let {id, reviewid} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};