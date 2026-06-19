const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    url: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
