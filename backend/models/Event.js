const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, default: "General" },
    isUpcoming: { type: Boolean, default: true },
    registrations: [
      {
        name: String,
        email: String,
        phone: String,
        registeredAt: { type: Date, default: Date.now },
      },
    ],
    maxParticipants: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
