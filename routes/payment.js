require("dotenv").config();
const Razorpay  = require("razorpay");
const router = require("express").Router();


router.post("/orders",(req,res)=>{
let instance = new Razorpay({ key_id: process.env.RAZ_ID, key_secret: process.env.RAZ_SECRET })
const amt = req.body.amount;
const amt1 = amt.split(" ")[1] * req.body.quantity;
console.log(amt1)
let options = {
    amount: Number(amt1 * 100),  // amount in the smallest currency unit
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

router.post("/verify",(req,res)=>{
    console.log(req.body)
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
        res.status(200).json("Sign Valid")
    }
    else{
        console.log("im in this")
        res.status(500).json("sign Invalid")
    }
})

module.exports = router;