require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/",(req,res)=>{
    res.send("API running");
});

app.listen(5000,()=>{
    console.log("Server started on port 5000");
});