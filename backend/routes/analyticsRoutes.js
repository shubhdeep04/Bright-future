const express = require("express");
const router = express.Router();
const { getDashboardAnalytics } = require("../controllers/analyticsController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, admin, getDashboardAnalytics);

module.exports = router;
