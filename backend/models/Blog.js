const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    image: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, default: "Updates" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug =
      this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
      "-" +
      Date.now();
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
