const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect, admin } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|mov|avi|avif/; // ✅ avif added
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (allowed.test(ext)) return cb(null, true);
    cb(new Error("Only images and videos are allowed"));
  },
});

// @desc    Upload single file (admin)
// @route   POST /api/upload
router.post("/", protect, admin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ url: fileUrl, filename: req.file.filename });
});

module.exports = router;