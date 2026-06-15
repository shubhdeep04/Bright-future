const Event = require("../models/Event");

// @desc    Create event (admin)
const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all events (optionally filter upcoming/past)
const getEvents = async (req, res, next) => {
  try {
    const { type } = req.query;
    let filter = {};
    const now = new Date();
    if (type === "upcoming") filter.date = { $gte: now };
    if (type === "past") filter.date = { $lt: now };

    const events = await Event.find(filter).sort({ date: type === "past" ? -1 : 1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Update event (admin)
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event (admin)
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (error) {
    next(error);
  }
};

// @desc    Register for event
const registerForEvent = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.maxParticipants > 0 && event.registrations.length >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.registrations.push({ name, email, phone });
    await event.save();
    res.status(201).json({ message: "Registered successfully", event });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
};
