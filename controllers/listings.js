const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
   const allListing = await Listing.find({});
//    console.log(allListing[0]);
   res.render("listings/index.ejs", {allListing});
};


module.exports.renderNewForm =  (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListingRoute = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })

    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};


module.exports.createListingRoute = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New listing created");
    res.redirect("/listings");
};


module.exports.editListingRoute = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


module.exports.updateListingRoute = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    
   

    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListingRoute = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
};