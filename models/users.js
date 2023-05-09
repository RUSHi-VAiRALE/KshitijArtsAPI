const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String, required : true, unique : true
        },
        email : {
            type : String, required : true, unique: true
        },
        password : {
            type : String, required : true,unique: true
        },
        phoneNumber : {
            type : Number,required : true,unique : true
        },
        firstName : {
            type : String,required : true
        },
        lastName : {
            type : String,required : true
        },
        isAdmin : {
            type : Boolean,
            default : false,
        },
        cartId : {
            type:Object
        }
},
    {timestamps : true}
);

module.exports = mongoose.model("User",userSchema);