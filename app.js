require("dotenv").config();
const express = require ("express");
const Razorpay = require("razorpay")
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/payment");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect(process.env.URL);

app.use(cors());
app.get("/",(req,res)=>{
    res.send("server is working");
});
app.use("/user",userRoutes);
app.use("/user/auth",authRoute);
app.use("/product",productRoutes);
app.use("/userCart",cartRoutes);
app.use("/payment",paymentRoutes);











app.listen(8000 , (req , res)=>{
    console.log("server is running on port 8000.");
});