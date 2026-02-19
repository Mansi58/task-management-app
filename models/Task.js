const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,        // Title is mandatory
      trim: true,            // Remove extra spaces
    },
    description: {
      type: String,
      default: "",           // Optional field
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], // Only these values allowed
      default: "pending",
    },
    dueDate: {
      type: Date,            // Optional deadline
    },
  },
  {
    timestamps: true,        // Automatically adds createdAt & updatedAt
  }
);

// Create and export model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
