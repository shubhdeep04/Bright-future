const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getBlogs);
router.get("/admin/all", protect, admin, getAllBlogsAdmin);
router.get("/:slug", getBlogBySlug);
router.post("/", protect, admin, createBlog);
router.put("/:id", protect, admin, updateBlog);
router.delete("/:id", protect, admin, deleteBlog);

module.exports = router;
