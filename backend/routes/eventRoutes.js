const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/:id/register", registerForEvent);

router.post("/", protect, admin, createEvent);
router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;
