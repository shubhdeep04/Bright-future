const express = require("express");
const router = express.Router();
const {
  createCollaboration,
  getAllCollaborations,
  getCollaborationById,
  updateCollaboration,
  deleteCollaboration,
} = require("../controllers/collaborationController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public — anyone can submit a collaboration inquiry
router.post("/", createCollaboration);

// Admin only — view, update status, delete inquiries
router.get("/", protect, admin, getAllCollaborations);
router.get("/:id", protect, admin, getCollaborationById);
router.put("/:id", protect, admin, updateCollaboration);
router.delete("/:id", protect, admin, deleteCollaboration);

module.exports = router;