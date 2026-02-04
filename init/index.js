const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main () {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
     await Listing.deleteMany({});
     const listingWithOwner = initData.data.map((obj) => ({...obj, owner: ""}));
     await Listing.insertMany(listingWithOwner);
     console.log("data was intialized");
};

initDB();