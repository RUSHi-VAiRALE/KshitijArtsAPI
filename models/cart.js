const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId : {type : String},
        products: [
        {
            productId : {
            type : String
            },
            proName : {
                type :String
            },
            proDisc : {
                type: String
            },
            quantity : {
                type : Number,
                default: 1
            },
            proPrice:{
                type:String,
            },
            proURL:{
                type:String,
            }
        }
        ]
        
},
{timestamps : true}
);

module.exports = mongoose.model("Cart",CartSchema);