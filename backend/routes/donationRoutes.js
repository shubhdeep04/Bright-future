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

// Public/optional auth — guest ya logged-in dono donate kar sakte hain
router.post("/", (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    protect(req, res, (err) => {
      if (err) return next(err);
      createDonation(req, res, next);
    });
  } else {
    createDonation(req, res, next);
  }
});

router.get("/stats", getDonationStats);
router.put("/:id/confirm", confirmDonation);
router.get("/my", protect, getMyDonations);
router.get("/", protect, admin, getDonations);
router.delete("/:id", protect, admin, deleteDonation);

module.exports = router;