const Collaboration = require("../models/Collaboration");

// @desc    Submit a new collaboration inquiry (public)
// @route   POST /api/collaborations
const createCollaboration = async (req, res, next) => {
  try {
    const { organizationName, contactPerson, email, phone, collaborationType, message } = req.body;

    if (!organizationName || !contactPerson || !email || !collaborationType || !message) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const collaboration = await Collaboration.create({
      organizationName,
      contactPerson,
      email,
      phone,
      collaborationType,
      message,
    });

    res.status(201).json({
      message: "Thank you! Your collaboration request has been received. We'll get back to you soon.",
      collaboration,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all collaboration inquiries (admin)
// @route   GET /api/collaborations
const getAllCollaborations = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const collaborations = await Collaboration.find(filter).sort({ createdAt: -1 });
    res.json(collaborations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single collaboration inquiry (admin)
// @route   GET /api/collaborations/:id
const getCollaborationById = async (req, res, next) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration inquiry not found" });
    }
    res.json(collaboration);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a collaboration inquiry's status (admin)
// @route   PUT /api/collaborations/:id
const updateCollaboration = async (req, res, next) => {
  try {
    const { status } = req.body;
    const collaboration = await Collaboration.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }) },
      { new: true, runValidators: true }
    );
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration inquiry not found" });
    }
    res.json(collaboration);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a collaboration inquiry (admin)
// @route   DELETE /api/collaborations/:id
const deleteCollaboration = async (req, res, next) => {
  try {
    const collaboration = await Collaboration.findByIdAndDelete(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration inquiry not found" });
    }
    res.json({ message: "Collaboration inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCollaboration,
  getAllCollaborations,
  getCollaborationById,
  updateCollaboration,
  deleteCollaboration,
};