const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// =========================
// ✅ CORS CONFIG (FIXED)
// =========================
app.use(
  cors({
    origin: [
      "https://task-management-frontend-tan-six.vercel.app", // your Vercel frontend
      "http://localhost:3000" // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ IMPORTANT: Express 5 does NOT support "*" or "/*" here
// Use REGEX instead:
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
  res.send("API is running 🚀");
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