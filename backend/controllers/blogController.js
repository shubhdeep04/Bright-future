const Blog = require("../models/Blog");

const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user._id });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};



















const getBlogs = async (req, res, next) => {
  try {
    const { category } = req.query;
    let filter = { isPublished: true };
    if (category) filter.category = category;
    const blogs = await Blog.find(filter).populate("author", "name").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("author", "name").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    await blog.deleteOne();
    res.json({ message: "Blog removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, getBlogs, getAllBlogsAdmin, getBlogBySlug, updateBlog, deleteBlog };
