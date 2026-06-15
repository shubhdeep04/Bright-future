const express = require("express");
const router = express.Router();
const {
  registerVolunteer,
  getVolunteers,
  getMyVolunteerProfile,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    return protect(req, res, () => registerVolunteer(req, res, next));
  }
  return registerVolunteer(req, res, next);
});

router.get("/my", protect, getMyVolunteerProfile);
router.get("/", protect, admin, getVolunteers);
router.put("/:id", protect, admin, updateVolunteer);
router.delete("/:id", protect, admin, deleteVolunteer);

module.exports = router;
