const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getCampaigns,
  getCampaignBySlug,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getCampaigns);
router.get("/:slug", getCampaignBySlug);
router.post("/", protect, admin, createCampaign);
router.put("/:id", protect, admin, updateCampaign);
router.delete("/:id", protect, admin, deleteCampaign);

module.exports = router;
