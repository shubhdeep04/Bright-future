const express = require("express");
const router = express.Router();
const {
  createDonation,
  confirmDonation,
  getDonations,
  getMyDonations,
  getDonationStats,
  deleteDonation,
} = require("../controllers/donationController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public/optional auth
router.post("/", (req, res, next) => {
  // allow guest donations - try to attach user if token present
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    return protect(req, res, () => createDonation(req, res, next));
  }
  return createDonation(req, res, next);
});

router.get("/stats", getDonationStats);
router.put("/:id/confirm", confirmDonation);

router.get("/my", protect, getMyDonations);
router.get("/", protect, admin, getDonations);
router.delete("/:id", protect, admin, deleteDonation);

module.exports = router;
