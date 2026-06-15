const Gallery = require("../models/Gallery");

const createGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const getGalleryItems = async (req, res, next) => {
  try {
    const { category, mediaType } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (mediaType) filter.mediaType = mediaType;
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    await item.deleteOne();
    res.json({ message: "Item removed" });
  } catch (error) {
    next(error);
  }
};

const updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

module.exports = { createGalleryItem, getGalleryItems, deleteGalleryItem, updateGalleryItem };
