const Testimonial = require("../models/Testimonial");

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ message: "Thank you for your feedback! It will appear after review.", testimonial });
  } catch (error) {
    next(error);
  }
};

const getTestimonials = async (req, res, next) => {
  try {
    const { all } = req.query;
    let filter = {};
    if (!all) filter.isApproved = true;
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    await testimonial.deleteOne();
    res.json({ message: "Testimonial removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTestimonial, getTestimonials, updateTestimonial, deleteTestimonial };
