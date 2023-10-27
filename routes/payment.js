require("dotenv").config();
const Razorpay  = require("razorpay");
require("dotenv").config();
const router = require("express").Router();
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const {verifyToken, verifyandAdmin} = require("./verifyToken");
const mongoose = require("mongoose");
const { functions } = require("lodash");

router.post("/orders",(req,res)=>{

let instance = new Razorpay({ key_id: process.env.RAZ_ID, key_secret: process.env.RAZ_SECRET })
let amt =Number(req.body.amount);
console.log(amt)
if (req.body.quantity) {
    const amt1 = Number(amt) * req.body.quantity;
    amt = amt1
} else {
    const amt1 = Number(amt);
    amt = amt1
}

console.log(amt)
let options = {
    amount: Number(amt * 100),  // amount in the smallest currency unit
    currency: "INR",
};
instance.orders.create(options, function(err, order) {
    if (err) {
        res.status(500).json("server error");
    } else {
        res.status(200).json(order);
    }
});
})

router.post("/verify/:ID", async (req,res)=>{
    console.log(req.body)
    console.log(req.params.ID)
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    let crypto = require("crypto");
    let expectedSignature = crypto.createHmac('sha256', process.env.RAZ_SECRET)
                                .update(body.toString())
                                .digest('hex');
                                console.log("sig received " ,req.body.response.razorpay_signature);
                                console.log("sig generated " ,expectedSignature);
let response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature)
    {
        let result = Array.isArray(req.body.proInfo)
        if (result) {
            console.log("\n\n\n\n\nfirst\n\n\n\n\n\n")
            tempArray = req.body.proInfo;
            tempArray.forEach(async element => {
                try {
            const updateOrder = await Cart.findByIdAndUpdate(req.params.ID,
                {
                    $push:{
                        orders:{
                            pId:element.productId,

                            pName : element.proName,

                            pImg : "",

                            pPrice : element.proPrice,

                            pQuantity : element.quantity,

                            raz_pay_id : req.body.response.razorpay_payment_id,

                            raz_order_id : req.body.response.razorpay_order_id,

                            raz_signature : req.body.response.razorpay_signature
                        }
                    }
                });
                console.log(updateOrder)
                
        } catch (error) {
            console.log(error)
        }
            });
            res.status(200).json("Sign Valid")
        } else {
            console.log("\n\n\n\nsecond\n\n\n")
            try {
            const updateOrder = await Cart.findByIdAndUpdate(req.params.ID,
                {
                    $push:{
                        orders:{
                            pId:req.body.proInfo.pId,

                            pName : req.body.proInfo.pName,

                            pImg : req.body.proInfo.pImg,

                            pPrice : req.body.proInfo.pPrice,

                            pQuantity : req.body.proInfo.pQuant,

                            raz_pay_id : req.body.response.razorpay_payment_id,

                            raz_order_id : req.body.response.razorpay_order_id,

                            raz_signature : req.body.response.razorpay_signature
                        }
                    }
                });
                console.log(updateOrder)
                res.status(200).json("Sign Valid")
        } catch (error) {
            console.log(error)
        }
        }
    }
    else{
        console.log("im in this")
        res.status(500).json("sign Invalid")
    }
})

module.exports = router;