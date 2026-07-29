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
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://pragyaeducation.netlify.app",
//   ],
//   credentials: true,
// }));
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

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
// app.use("/api/payment", require("./routes/paymentRoutes"));

// let dbConnected = false;

// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "API is running",
//     dbStatus: dbConnected ? "connected" : "disconnected",
//   });
// });

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     dbConnected = true;
//   } catch (err) {
//     dbConnected = false;
//     console.error("❌ MongoDB connection failed:", err.message);
//     if (process.env.NODE_ENV === "production") {
//       console.error("Exiting because MongoDB is required in production.");
//       process.exit(1);
//     }
//     console.warn("Continuing without MongoDB. Some routes may fail until the database is available.");
//   }

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "API is running"
//   });
// });





//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// startServer();\


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();


// =======================
// CORS CONFIG
// =======================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://pragyaeducatio.netlify.app",
  "https://pragyaeducation.netlify.app"
];


app.use(
  cors({
    origin: function (origin, callback) {

      // Allow Postman / server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


// =======================
// BODY PARSER
// =======================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// =======================
// STATIC FILES
// =======================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// =======================
// API ROUTES
// =======================

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
app.use("/api/payment", require("./routes/paymentRoutes"));



// =======================
// HEALTH CHECK
// =======================

let dbConnected = false;


app.get("/", (req, res) => {

  res.json({
    status: "OK",
    message: "API is running"
  });

});


app.get("/api/health", (req, res) => {

  res.json({
    status: "OK",
    message: "API is running",
    dbStatus: dbConnected
      ? "connected"
      : "disconnected"
  });

});



// =======================
// ERROR HANDLER
// =======================

app.use(notFound);

app.use(errorHandler);



// =======================
// SERVER START
// =======================

const PORT = process.env.PORT || 5000;


const startServer = async () => {

  try {

    await connectDB();

    dbConnected = true;

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(
      "MongoDB Error:",
      error.message
    );

  }


  app.listen(
    PORT,
    "0.0.0.0",
    () => {

      console.log(
        `Server running on port ${PORT}`
      );

    }
  );

};


startServer();