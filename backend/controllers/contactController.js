// const Contact = require("../models/Contact");

// const createContact = async (req, res, next) => {
//   try {
//     const contact = await Contact.create(req.body);
//     res.status(201).json({ message: "Message sent successfully. We'll get back to you soon!", contact });
//   } catch (error) {
//     next(error);
//   }
// };

// const getContacts = async (req, res, next) => {
//   try {
//     const contacts = await Contact.find({}).sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateContactStatus = async (req, res, next) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ message: "Contact not found" });
//     contact.status = req.body.status || contact.status;
//     await contact.save();
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContact = async (req, res, next) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) return res.status(404).json({ message: "Contact not found" });
//     await contact.deleteOne();
//     res.json({ message: "Contact removed" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { createContact, getContacts, updateContactStatus, deleteContact };


const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

const ADMIN_NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "patleprajju@gmail.com";

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, inquiryType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      inquiryType,
      message,
      attachmentPath: req.file ? `/uploads/${req.file.filename}` : undefined,
      attachmentName: req.file ? req.file.originalname : undefined,
    });

    sendEmail({
      to: ADMIN_NOTIFY_EMAIL,
      subject: `New Contact Message: ${contact.subject || "No subject"}`,
      replyTo: contact.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color:#d97706;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ""}
          ${contact.inquiryType ? `<p><strong>Inquiry Type:</strong> ${contact.inquiryType}</p>` : ""}
          ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <div style="background:#f5f5f5; padding:12px; border-radius:8px; white-space:pre-wrap;">${contact.message}</div>
          ${
            req.file
              ? `<p style="margin-top:12px;"><strong>Attachment:</strong> ${req.file.originalname}</p>`
              : ""
          }
          <p style="margin-top:16px; font-size:12px; color:#777;">Submitted on ${new Date(
            contact.createdAt
          ).toLocaleString("en-IN")}</p>
        </div>
      `,
    }).catch((err) => console.error("Contact notification email failed:", err.message));

    res.status(201).json({ message: "Message sent successfully. We'll get back to you soon!", contact });
  } catch (error) {
    console.error("Create contact error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to send message" });
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Get contacts error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to fetch contacts" });
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
    console.error("Update contact error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to update contact" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    await contact.deleteOne();
    res.json({ message: "Contact removed" });
  } catch (error) {
    console.error("Delete contact error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to delete contact" });
  }
};

module.exports = { createContact, getContacts, updateContactStatus, deleteContact };