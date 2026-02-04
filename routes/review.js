const express = require("express")
const router  = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isloggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Reviews
//Post Route
router.post("/",validateReview ,isloggedIn ,wrapAsync(reviewController.reviewsPostRoute));


//Delete Review Route
router.delete("/:reviewid",isloggedIn ,isReviewAuthor ,wrapAsync(reviewController.deleteReviewRoute));

module.exports = router;