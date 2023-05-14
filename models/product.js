const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type : String, required : true
        },
        desc : {
            type : String, required : true
        },
        imgURL : {
            type : String, required : true
        },
        price : {
            type : String,
            required : true,
        },
        img1URL : {
            type : String, required : true
        },
        img2URL : {
            type : String, required : true
        },
        img3URL : {
            type : String, required : true
        },
        img4URL : {
            type : String, required : true
        },
        img5URL : {
            type : String, required : true
        },
        inStock : {
            type : Boolean,
            default : true
        }
},
{timestamps : true}
);

module.exports = mongoose.model("Product",ProductSchema);