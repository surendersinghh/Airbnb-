const Listing = require("./models/listing.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");

module.exports.isloggedIn = (req, res, next) => {
     if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    } 
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; 
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
     let {id} = req.params;
        let listing = await Listing.findById(id);
        
        if(!listing.owner._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the owner of this listing");
            return res.redirect(`/listings/${id}`);
        }
        next();
};



//server side validation 
//when a client send a request from hopscotch and postman
module.exports.validatelisting = (req, res, next) => {
    let {error} = listingSchema.validate(req.body); 
    // let errMsg  = error.details.map((el) => el.message).join(",");
    if(error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};


//server side validation 
//when a client send a request from hopscotch and postman
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body); 
    // let errMsg  = error.details.map((el) => el.message).join(",");
    if(error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};


//reviews ko protect karna koi dusra user review ko delete na kar sake

module.exports.isReviewAuthor = async (req, res, next) => {
     let { id, reviewid } = req.params;
        let review = await Review.findById(reviewid);
        
        if(!review.author._id.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the author of this review");
            return res.redirect(`/listings/${id}`);
        }
        next();
};