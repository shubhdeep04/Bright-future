// console.log("✅ authRoutes loaded");


// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, getProfile);
// router.put("/profile", protect, updateProfile);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
  googleAuth,
  requestOtp,
  verifyOtp,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.post("/otp/request", requestOtp);
router.post("/otp/verify", verifyOtp);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;