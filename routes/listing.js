const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isloggedIn, isOwner, validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudinary.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single("listing[image]"),validatelisting, wrapAsync(listingController.createListingRoute));


router.route("/new")
    .get(isloggedIn,listingController.renderNewForm);




router.route("/:id")
    .get(wrapAsync(listingController.showListingRoute))
    .put(isloggedIn ,isOwner ,upload.single("listing[image]") ,validatelisting, wrapAsync(listingController.updateListingRoute))
    .delete(isloggedIn, isOwner ,wrapAsync(listingController.deleteListingRoute));



router.route("/:id/edit")
    .get(isloggedIn ,isOwner ,wrapAsync(listingController.editListingRoute));



module.exports = router;