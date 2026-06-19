const express = require("express");
const router = express.Router();
const {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
  updateGalleryItem,
} = require("../controllers/galleryController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getGalleryItems);
router.post("/", protect, admin, createGalleryItem);
router.put("/:id", protect, admin, updateGalleryItem);
router.delete("/:id", protect, admin, deleteGalleryItem);

module.exports = router;
