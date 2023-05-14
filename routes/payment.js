require("dotenv").config();
const Razorpay  = require("razorpay");
const router = require("express").Router();


router.post("/orders",(req,res)=>{
let instance = new Razorpay({ key_id: process.env.RAZ_ID, key_secret: process.env.RAZ_SECRET })
const amt = req.body.amount;
const amt1 = amt.split(" ")[1];
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

module.exports = router;