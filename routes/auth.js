require("dotenv").config();
const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyandAdmin } = require("./verifyToken");
const Cart = require("../models/cart");

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.fName,
        lastName: req.body.lName,
        phoneNumber: req.body.phone,
        cartId: new Cart({
            userId: ""
        })
    });
    try {
        const ok = await newUser.save();
        ok.cartId.userId = ok._id;
        ok.cartId.save();
        res.status(201).json(ok);
        console.log(ok);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

router.post("/login", (req, res) => {
    // console.log(req)
    try {
        User.findOne({ username: req.body.userName }, (err, user) => {
            if(user) {
                if (user.password === req.body.password) {
                    const accessToken = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.TOK);
                    res.status(201).send({ id: user.id, username: user.username, isAdmin: user.isAdmin, firstName: user.firstName, cartid: user.cartId._id, accessToken: accessToken });
                    console.log(user);
                }
                else {
                    res.status(500).json("invalid");
                }
            }
            else{
                res.status(500).send("not ok")
            }
        });
    } catch (err) {
        res.status(500).send("a not olk");
    }
});

router.get("/now", verifyToken, (req, res) => {
    res.send("authenticated");
})


module.exports = router