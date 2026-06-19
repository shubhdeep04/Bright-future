const express = require("express");
const router = express.Router();
const {
  createBeneficiary,
  getBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  deleteBeneficiary,
} = require("../controllers/beneficiaryController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin); // entire module is admin-only (sensitive data)

router.get("/", getBeneficiaries);
router.post("/", createBeneficiary);
router.get("/:id", getBeneficiaryById);
router.put("/:id", updateBeneficiary);
router.delete("/:id", deleteBeneficiary);

module.exports = router;
