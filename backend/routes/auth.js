const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { registerUser, loginUser } = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// LOGIN ✅ (यह missing है तुम्हारे में)
router.post("/login", loginUser);

// PROTECTED ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user,
  });
});

module.exports = router;