// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Static folder for uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/donations", require("./routes/donationRoutes"));
// app.use("/api/volunteers", require("./routes/volunteerRoutes"));
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/gallery", require("./routes/galleryRoutes"));
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/campaigns", require("./routes/campaignRoutes"));
// app.use("/api/blogs", require("./routes/blogRoutes"));
// app.use("/api/testimonials", require("./routes/testimonialRoutes"));
// app.use("/api/beneficiaries", require("./routes/beneficiaryRoutes"));
// app.use("/api/content", require("./routes/contentRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/analytics", require("./routes/analyticsRoutes"));
// app.use("/api/upload", require("./routes/uploadRoutes"));

// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", message: "Education NGO API is running" });
// });

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/volunteers", require("./routes/volunteerRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/beneficiaries", require("./routes/beneficiaryRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 🔥 IMPORTANT FIX
const startServer = async () => {
  try {
    await connectDB(); // WAIT for DB

    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
  } catch (err) {
    console.log("❌ Server startup error:", err);
  }
};

startServer();