const express = require("express");
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin);

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
