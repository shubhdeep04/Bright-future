const SiteContent = require("../models/SiteContent");

// @desc    Get all site content (key-value map)
// @route   GET /api/content
const getAllContent = async (req, res, next) => {
  try {
    const items = await SiteContent.find({});
    const map = {};
    items.forEach((item) => {
      map[item.key] = item.value;
    });
    res.json(map);
  } catch (error) {
    next(error);
  }
};

// @desc    Update or create a content key (admin)
// @route   PUT /api/content/:key
const updateContent = async (req, res, next) => {
  try {
    const { value, section } = req.body;
    const updated = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { value, section: section || "general" },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk update content (admin)
// @route   POST /api/content/bulk
const bulkUpdateContent = async (req, res, next) => {
  try {
    const updates = req.body; // { key: value, ... }
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { value } },
        upsert: true,
      },
    }));
    await SiteContent.bulkWrite(ops);
    res.json({ message: "Content updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContent, updateContent, bulkUpdateContent };
