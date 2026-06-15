const Volunteer = require("../models/Volunteer");

// @desc    Register as volunteer
// @route   POST /api/volunteers
const registerVolunteer = async (req, res, next) => {
  try {
    const data = req.body;
    const volunteer = await Volunteer.create({
      ...data,
      user: req.user ? req.user._id : undefined,
    });
    res.status(201).json(volunteer);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all volunteers (admin)
// @route   GET /api/volunteers
const getVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get my volunteer profile / dashboard
// @route   GET /api/volunteers/my
const getMyVolunteerProfile = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findOne({ user: req.user._id });
    if (!volunteer) return res.status(404).json({ message: "No volunteer record found" });
    res.json(volunteer);
  } catch (error) {
    next(error);
  }
};

// @desc    Update volunteer status / assign activities (admin)
// @route   PUT /api/volunteers/:id
const updateVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    const allowed = [
      "status",
      "assignedActivities",
      "attendance",
      "certificateIssued",
      "skills",
      "availability",
    ];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) volunteer[field] = req.body[field];
    });

    const updated = await volunteer.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete volunteer (admin)
// @route   DELETE /api/volunteers/:id
const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    await volunteer.deleteOne();
    res.json({ message: "Volunteer removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerVolunteer,
  getVolunteers,
  getMyVolunteerProfile,
  updateVolunteer,
  deleteVolunteer,
};
