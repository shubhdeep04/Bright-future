const express = require("express");
const router = express.Router();
const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getTestimonials);
router.post("/", createTestimonial);
router.put("/:id", protect, admin, updateTestimonial);
router.delete("/:id", protect, admin, deleteTestimonial);

module.exports = router;
