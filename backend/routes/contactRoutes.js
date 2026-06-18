// const express = require("express");
// const router = express.Router();
// const {
//   createContact,
//   getContacts,
//   updateContactStatus,
//   deleteContact,
// } = require("../controllers/contactController");
// const { protect, admin } = require("../middleware/authMiddleware");

// router.post("/", createContact);
// router.get("/", protect, admin, getContacts);
// router.put("/:id", protect, admin, updateContactStatus);
// router.delete("/:id", protect, admin, deleteContact);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// Multer config: saves files to /uploads with a unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/", upload.single("attachment"), createContact);
router.get("/", protect, admin, getContacts);
router.put("/:id", protect, admin, updateContactStatus);
router.delete("/:id", protect, admin, deleteContact);

module.exports = router;