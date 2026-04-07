const express = require("express");
const router = express.Router();
const {verifyToken,isAdmin} = require("../middleware/authMiddleware");
const Product = require("../models/Product");


// GET all products (public)
router.get("/", async (req,res)=>{
    try{

        const {search, category, sort} = req.query;

        let filter = {};

        if(search){
            filter.name = { $regex: search, $options: "i" };
        }

        if(category){
            filter.category = category;
        }

        let query = Product.find(filter);

        if(sort === "price"){
            query = query.sort({price:1});
        }

        const products = await query;

        res.json(products);

    }catch(err){
        res.status(500).json({message:"Server error"});
    }
});

// GET product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    } catch(err) {
        res.status(500).json({message: "Server error"});
    }
});

router.put("/:id", verifyToken, isAdmin, async (req,res)=>{
    try{

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updatedProduct);

    }catch(err){
        res.status(500).json({message:"Server error"});
    }
});


// ADD product (ADMIN ONLY)
router.post("/add", verifyToken, isAdmin, async (req,res)=>{
    try{

        const {name,price,description,category,image} = req.body;

        const product = new Product({
            name,
            price,
            description,
            category,
            image
        });

        await product.save();

        res.json({
            message:"Product added successfully",
            product
        });

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
});


// DELETE product (ADMIN ONLY)
router.delete("/:id", verifyToken, isAdmin, async (req,res)=>{

    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted"
    });

});

module.exports = router;