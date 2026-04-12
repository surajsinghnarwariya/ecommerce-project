const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");


// CREATE ORDER (protected)
router.post("/", protect, createOrder);


module.exports = router;