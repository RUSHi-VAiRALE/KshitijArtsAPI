require("dotenv").config();
const router = require("express").Router();
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const {verifyToken, verifyandAdmin} = require("./verifyToken");
const mongoose = require("mongoose");
const { functions } = require("lodash");

router.post("/cart/:id", verifyToken, async (req , res)=>{
    console.log("req.body");
    const newCart = new Cart(
        {
            userId : req.params.id,
            
                $push :{
                    products:{
                productId : req.body._id,
                proURL : req.body.imgURL,
                proPrice : req.body.price,
                proName : req.body.name,
                proDisc : req.body.discription}
                }
                
            
        }
    );
    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (error) {
        console.log(error);
    }
});

router.get("/allCart/:id", verifyToken, async (req , res)=>{
        try {
            const cart = await Cart.findById(req.params.id);
            res.status(200).json(cart.products);
        } catch (error) {
            console.log(error);
        }
})

router.post("/updateCart/:id", verifyToken, async (req , res)=>{
        try {
            console.log(req.body)
            const updateCart = await Cart.findByIdAndUpdate(req.params.id,
                {
                    $push:{
                        products:{
                            productId:req.body._id,
                            proURL : req.body.imgURL,
                            proPrice : req.body.price,
                            proDisc : req.body.discription,
                            proName : req.body.name
                        }
                    }
                });
                console.log(updateCart)
                res.status(200).send(updateCart);
        } catch (error) {
            console.log(error);
        }
    
});

router.post("/incqty/:id/:ind",async(req, res)=>{
    console.log("im also in");
    try {
        const updateQty = await Cart.findByIdAndUpdate(req.params.id,{
            $inc:{
                [`products.${req.params.ind}.quantity`]:1
            }
        });
        console.log(updateQty)
        res.status(200).send("ok");
    } catch (error) {
        console.log(error)
    }
})

router.post("/decqty/:id/:ind",async(req, res)=>{
    console.log("im also in");
    try {
        const updateQty = await Cart.findByIdAndUpdate(req.params.id,{
            $inc:{
                [`products.${req.params.ind}.quantity`]:-1
            }
        });
        console.log(updateQty)
        res.status(200).send("ok");
    } catch (error) {
        console.log(error)
    }
})

router.delete("/deleteCart/:idC/:idP", verifyToken, async (req , res)=>{
    console.log(req.params)
        try {
            const nice = await Cart.updateOne({_id:req.params.idC},{$pull:{products:{_id:req.params.idP}}})
            console.log(nice)
            res.status(200).send("User has been deleted");
        } catch (error) {
            console.log(error);
        }
});


module.exports = router