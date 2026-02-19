const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// Create app
const app = express();

// =======================
// Middleware
// =======================
app.use(cors({
  origin: "*", // Allow requests from anywhere (Vercel, localhost, etc.)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// =======================
// Routes
// =======================
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// =======================
// Database Connection
// =======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
