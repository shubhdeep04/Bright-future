const express = require("express");
const router = express.Router();
const { getAllContent, updateContent, bulkUpdateContent } = require("../controllers/contentController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllContent);
router.put("/:key", protect, admin, updateContent);
router.post("/bulk", protect, admin, bulkUpdateContent);

module.exports = router;
