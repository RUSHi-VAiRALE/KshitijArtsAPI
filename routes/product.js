require("dotenv").config();
const router = require("express").Router();
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const {verifyToken, verifyandAdmin} = require("./verifyToken");
const mongoose = require("mongoose");

router.post("/products", verifyandAdmin, async (req , res)=>{
    const newProduct = Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct);
    } catch (error) {
        console.log(error);
    }
});

router.get("/allProducts", async(req , res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        res.send(error);
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(error){
        res.send(error);
    }
})

module.exports = router