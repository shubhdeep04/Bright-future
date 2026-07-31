// const SiteContent = require("../models/SiteContent");

// // @desc    Get all site content (key-value map)
// // @route   GET /api/content
// const getAllContent = async (req, res, next) => {
//   try {
//     const items = await SiteContent.find({});
//     const map = {};
//     items.forEach((item) => {
//       map[item.key] = item.value;
//     });
//     res.json(map);
//   } catch (error) {
//     next(error);
//   }
// };




// const createContact = async (req, res, next) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const contact = await Contact.create(req.body);

//     res.status(201).json({
//       message: "Message sent successfully",
//       contact
//     });
//   } catch (error) {
//     next(error);
//   }
// };







// // @desc    Update or create a content key (admin)
// // @route   PUT /api/content/:key
// const updateContent = async (req, res, next) => {
//   try {
//     const { value, section } = req.body;
//     const updated = await SiteContent.findOneAndUpdate(
//       { key: req.params.key },
//       { value, section: section || "general" },
//       { upsert: true, new: true }
//     );
//     res.json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Bulk update content (admin)
// // @route   POST /api/content/bulk
// const bulkUpdateContent = async (req, res, next) => {
//   try {
//     const updates = req.body; // { key: value, ... }
//     const ops = Object.entries(updates).map(([key, value]) => ({
//       updateOne: {
//         filter: { key },
//         update: { $set: { value } },
//         upsert: true,
//       },
//     }));
//     await SiteContent.bulkWrite(ops);
//     res.json({ message: "Content updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { getAllContent, updateContent, bulkUpdateContent };
const SiteContent = require("../models/SiteContent");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage location for images uploaded from the Site Content admin panel
// (hero slides, program images, impact story photos, team member photos).
const contentUploadDir = path.join(__dirname, "..", "uploads", "content");
if (!fs.existsSync(contentUploadDir)) {
  fs.mkdirSync(contentUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, contentUploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// @desc    Upload an image for site content (hero slides, programs, team, etc.)
// @route   POST /api/content/upload
const uploadContentImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/content/${req.file.filename}`;
    res.json({ url });
  } catch (error) {
    next(error);
  }
};

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




const createContact = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const contact = await Contact.create(req.body);

    res.status(201).json({
      message: "Message sent successfully",
      contact
    });
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

module.exports = { getAllContent, updateContent, bulkUpdateContent, upload, uploadContentImage };