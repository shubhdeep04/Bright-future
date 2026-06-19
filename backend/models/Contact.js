// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String },
//     subject: { type: String },
//     message: { type: String, required: true },
//     status: { type: String, enum: ["new", "read", "resolved"], default: "new" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Contact", contactSchema);


const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    inquiryType: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "resolved"], default: "new" },
    attachmentPath: { type: String },
    attachmentName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);