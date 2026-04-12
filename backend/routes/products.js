const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");


// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// file filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });


// ================= ROUTES =================

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// PROTECTED
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);


module.exports = router;