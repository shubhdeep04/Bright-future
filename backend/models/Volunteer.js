const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number },
    address: { type: String },
    skills: [{ type: String }],
    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Both", "Flexible"],
      default: "Flexible",
    },
    interestArea: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    assignedActivities: [
      {
        title: String,
        date: Date,
        description: String,
        status: { type: String, enum: ["upcoming", "completed"], default: "upcoming" },
      },
    ],
    attendance: [
      {
        date: Date,
        present: Boolean,
      },
    ],
    certificateIssued: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
