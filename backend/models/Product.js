const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1518443895914-6b9c2b9c53b5"
    }
});

module.exports = mongoose.model("Product",productSchema);