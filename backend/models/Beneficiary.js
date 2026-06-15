const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    guardianName: { type: String },
    contact: { type: String },
    address: { type: String },
    program: { type: String, required: true },
    schoolName: { type: String },
    grade: { type: String },
    caseNotes: [
      {
        note: String,
        date: { type: Date, default: Date.now },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    supportHistory: [
      {
        type: { type: String },
        description: String,
        date: { type: Date, default: Date.now },
        amount: Number,
      },
    ],
    sponsorshipStatus: {
      type: String,
      enum: ["unsponsored", "sponsored", "completed"],
      default: "unsponsored",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
