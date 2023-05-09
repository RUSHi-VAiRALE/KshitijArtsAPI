require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {verifyToken, verifyandAdmin} = require("./verifyToken");
const router = require("express").Router();

router.get("/all-users",verifyandAdmin,async (req , res)=>{
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
    }
});

router.put("/update/:id", verifyToken, async (req , res)=>{
    try {
        if (req.params.id === req.user.id) {
            const users = await User.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },
            {new : true}
            );
            res.status(200).send("your data has been updated succesfully");
        } else {
            res.status(500).send("you are not allowed to do this action");
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete("/delete/:id", verifyToken, async (req , res)=>{
    try {
        if (req.params.id === req.user.id) {
            const users = await User.findByIdAndDelete(req.params.id)
            res.status(200).send("user has been deleted");
        } else {
            res.status(500).send("you are not allowed to do this action");
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;