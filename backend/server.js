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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ecommerce-project-covbzl4g-surajsinghnarwariyas-projects.vercel.app"
  ],
  credentials: true
}));

app.options("*", cors());

// ================= RAZORPAY SETUP =================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// CREATE ORDER
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating Razorpay order");
  }
});

// OTHER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ================= DB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= ERROR =================
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});