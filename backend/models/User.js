// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true, minlength: 6 },
//     phone: { type: String, trim: true },
//     role: {
//       type: String,
//       enum: ["admin", "donor", "volunteer", "user"],
//       default: "user",
//     },
//     avatar: { type: String, default: "" },
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Password is no longer always required: Google-signup users and
    // email-OTP-only users may not have one.
    password: { type: String, minlength: 6 },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ["admin", "donor", "volunteer", "user"],
      default: "user",
    },
    avatar: { type: String, default: "" },
    isActive: { type: Boolean, default: true },

    // --- Google OAuth ---
    googleId: { type: String, default: null },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // --- Email verification ---
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },

    // --- Email OTP login/verification ---
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

// IMPORTANT: async pre-save hooks should NOT call next() manually.
// Modern Mongoose handles async middleware via the returned promise.
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);