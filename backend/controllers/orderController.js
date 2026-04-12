const Order = require("../models/Order");


// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user, // from auth middleware
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};