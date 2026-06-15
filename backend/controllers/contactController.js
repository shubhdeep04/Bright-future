const Contact = require("../models/Contact");

const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message sent successfully. We'll get back to you soon!", contact });
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    contact.status = req.body.status || contact.status;
    await contact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    await contact.deleteOne();
    res.json({ message: "Contact removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createContact, getContacts, updateContactStatus, deleteContact };
