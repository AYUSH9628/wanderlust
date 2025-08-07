const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");


let listingSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
       url:String,
       filename:String,
    },
    price:Number,
    location:{
        type:String,
    },
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

