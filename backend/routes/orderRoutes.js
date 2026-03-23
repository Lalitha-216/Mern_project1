const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/place", async (req, res) => {

    const order = new Order(req.body);

    await order.save();

    res.json({
        message: "Order placed successfully",
        order
    });

});

router.get("/:userId", async (req, res) => {

    const orders = await Order.find({
        userId: req.params.userId
    });

    res.json(orders);

});

module.exports = router;