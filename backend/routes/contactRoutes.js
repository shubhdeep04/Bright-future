const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", createContact);
router.get("/", protect, admin, getContacts);
router.put("/:id", protect, admin, updateContactStatus);
router.delete("/:id", protect, admin, deleteContact);

module.exports = router;
