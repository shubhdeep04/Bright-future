const mongoose = require("mongoose");

// Generic key-value store for editable site content (hero text, stats, mission, etc.)
const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    section: { type: String, default: "general" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
