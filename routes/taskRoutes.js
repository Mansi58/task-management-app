const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// Public: get tasks
router.route("/").get(getTasks);

// Protected: create task
router.route("/").post(protect, createTask);

// Protected: update & delete
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
