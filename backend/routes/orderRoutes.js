const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/authMiddleware");

// Place an order
router.post("/place", verifyToken, async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            userId: req.user.id
        });

        await order.save();

        res.json({
            message: "Order placed successfully",
            order
        });
    } catch(err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// View user orders
router.get("/myorders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.json(orders);
    } catch(err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// View all orders (Admin)
router.get("/all", verifyToken, async (req, res) => {
    if(req.user.role !== "admin") return res.status(403).json({message: "Admin access required"});
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json(orders);
    } catch(err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;