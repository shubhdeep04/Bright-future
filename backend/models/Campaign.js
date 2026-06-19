const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    category: { type: String, default: "Education" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

campaignSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now();
  }
  next();
});

module.exports = mongoose.model("Campaign", campaignSchema);
