const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// =========================
// ✅ CORS CONFIG (FIXED FOR EXPRESS 5)
// =========================
const allowedOrigins = [
  "https://task-management-frontend-tan-six.vercel.app", // your Vercel frontend
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, Thunder Client)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle ALL preflight requests (Express 5 compatible)
app.options(/.*/, cors());

// =========================
// Middleware
// =========================
app.use(express.json());

// =========================
// Routes
// =========================
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// =========================
// MongoDB Connection
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});