const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    amount: { type: Number, required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    purpose: { type: String, default: "General Donation" },
    paymentId: { type: String },
    orderId: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
      default: () => "BFF" + Date.now() + Math.floor(Math.random() * 1000), // ✅ pre hook hataya
    },
    isAnonymous: { type: Boolean, default: false },
    panNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);