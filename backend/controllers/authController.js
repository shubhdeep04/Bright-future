// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || "7d",
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// const registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password, phone, role } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists with this email" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       phone,
//       role: role === "admin" ? "user" : role || "user", // prevent self-assign admin
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// const loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     if (!user.isActive) {
//       return res.status(403).json({ message: "Account is deactivated. Contact admin." });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       avatar: user.avatar,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get current user profile
// // @route   GET /api/auth/profile
// const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update profile
// // @route   PUT /api/auth/profile
// const updateProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.name = req.body.name || user.name;
//     user.phone = req.body.phone || user.phone;
//     if (req.body.avatar) user.avatar = req.body.avatar;
//     if (req.body.password) user.password = req.body.password;

//     const updated = await user.save();
//     res.json({
//       _id: updated._id,
//       name: updated.name,
//       email: updated.email,
//       role: updated.role,
//       phone: updated.phone,
//       avatar: updated.avatar,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { registerUser, loginUser, getProfile, updateProfile };

const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/generateOTP");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  token: generateToken(user._id),
});

// ---------------------------------------------------------
// @desc    Register new user (email + password)
// @route   POST /api/auth/register
// ---------------------------------------------------------
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const otp = generateOTP();
    const verificationToken = otp;

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role === "admin" ? "user" : role || "user",
      authProvider: "local",
      isVerified: false,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Send verification email with OTP and fallback link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;
    const emailSent = await sendEmail({
      to: email,
      subject: "Verify Your Email - Bright Futures Foundation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#d97706;">Bright Futures Foundation</h2>
          <p>Hi ${name},</p>
          <p>Thank you for registering! Please verify your email by either:</p>
          <ol>
            <li>Clicking the button below</li>
            <li>Entering the code in the app</li>
          </ol>
          <p><a href="${verificationLink}" style="background-color:#d97706; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">Verify Email</a></p>
          <p>Verification code: <strong>${otp}</strong></p>
          <p>This code expires in 10 minutes and the link expires in 24 hours.</p>
          <p>If you did not create this account, you can ignore this email.</p>
        </div>
      `,
    });

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send verification email. Please try again." });
    }

    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
      email: user.email,
    });
  } catch (error) {
    console.error("Register error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

// ---------------------------------------------------------
// @desc    Login user (email + password)
// @route   POST /api/auth/login
// ---------------------------------------------------------
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated. Contact admin." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first. Check your inbox for the verification link." });
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    console.error("Login error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Login failed" });
  }
};

// ---------------------------------------------------------
// @desc    Verify email with token
// @route   POST /api/auth/verify-email
// ---------------------------------------------------------
const verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.body;
    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== token) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Verification code has expired. Please register again." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({
      message: "Email verified successfully! You can now login.",
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Verify email error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Email verification failed" });
  }
};

// ---------------------------------------------------------
// @desc    Google login/signup. Frontend sends Google ID token.
// @route   POST /api/auth/google
// ---------------------------------------------------------
const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Missing Google credential" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = "google";
        user.isVerified = true;
        if (!user.avatar && picture) user.avatar = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
        avatar: picture || "",
        isVerified: true,
        role: "user",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated. Contact admin." });
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    console.error("Google auth error FULL STACK:", error);
    res.status(401).json({ message: "Google sign-in failed. Please try again." });
  }
};

// ---------------------------------------------------------
// @desc    Request an email OTP for login/signup
// @route   POST /api/auth/otp/request
// ---------------------------------------------------------
const requestOtp = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    let user = await User.findOne({ email });

    if (!user) {
      if (!name) {
        return res.status(400).json({ message: "Name is required for new account signup" });
      }
      user = await User.create({
        name,
        email,
        authProvider: "local",
        isVerified: false,
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated. Contact admin." });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const emailSent = await sendEmail({
      to: user.email,
      subject: "Your Bright Futures Foundation Login Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#d97706;">Bright Futures Foundation</h2>
          <p>Hi ${user.name},</p>
          <p>Your one-time login code is:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color:#111;">${otp}</p>
          <p>This code will expire in 10 minutes. If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email. Please try again." });
    }

    res.json({ message: "OTP sent to your email", email: user.email });
  } catch (error) {
    console.error("Request OTP error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to send OTP" });
  }
};

// ---------------------------------------------------------
// @desc    Verify OTP and log the user in
// @route   POST /api/auth/otp/verify
// ---------------------------------------------------------
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP request found. Please request a new code." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new code." });
    }

    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();

    res.json(buildAuthResponse(user));
  } catch (error) {
    console.error("Verify OTP error FULL STACK:", error);
    res.status(500).json({ message: error.message || "OTP verification failed" });
  }
};

// ---------------------------------------------------------
// @desc    Get current user profile
// @route   GET /api/auth/profile
// ---------------------------------------------------------
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -otp -otpExpires");
    res.json(user);
  } catch (error) {
    console.error("Get profile error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to load profile" });
  }
};

// ---------------------------------------------------------
// @desc    Update profile
// @route   PUT /api/auth/profile
// ---------------------------------------------------------
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    if (req.body.avatar) user.avatar = req.body.avatar;
    if (req.body.password) user.password = req.body.password;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      phone: updated.phone,
      avatar: updated.avatar,
    });
  } catch (error) {
    console.error("Update profile error FULL STACK:", error);
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  googleAuth,
  requestOtp,
  verifyOtp,
  getProfile,
  updateProfile,
};