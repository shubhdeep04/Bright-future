const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    collaborationType: {
      type: String,
      required: [true, "Collaboration type is required"],
      enum: [
        "CSR Partnership",
        "School / Institution Partnership",
        "NGO Collaboration",
        "Volunteer Group",
        "Corporate Sponsorship",
        "Other",
      ],
      default: "Other",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "In Discussion", "Partnered", "Declined"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collaboration", collaborationSchema);