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
        ],
        orders : [{
            pId : {
                type:String
            },
            pImg : {
                type : String
            },
            pName : {
                type : String
            },
            pPrice :{
                type : Number
            },
            raz_pay_id :{
                type : String
            },
            raz_order_id : {
                type : String
            },
            raz_signature : {
                type : String
            }
        }
        ],
},
{timestamps : true}
);

module.exports = mongoose.model("Cart",CartSchema);