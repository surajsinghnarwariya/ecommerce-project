const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Razorpay = require("razorpay");

// ROUTES IMPORT
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(
  cors({
    origin: "ecommerce-project-6rulmrb00-surajsinghnarwariyas-projects.vercel.app",
    credentials: true,
  })
);

// ================= RAZORPAY SETUP =================
const razorpay = new Razorpay({
  key_id: "rzp_test_ScBmMUe2t5toI0",
  key_secret: "o7SugJvzMBXjHB9CWvusyuEa",
});

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 CREATE ORDER API (IMPORTANT)
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ to paise
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Razorpay order");
  }
});

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// PRODUCT ROUTES
app.use("/api/products", productRoutes);

// ORDER ROUTES
app.use("/api/orders", orderRoutes);

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= ERROR HANDLER =================
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});