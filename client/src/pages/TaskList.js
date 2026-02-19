import React, { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter / Sort / Search
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Apply search + filter + sort
  const processedTasks = [...tasks]
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (filter === "all" ? true : t.status === filter))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  // Add or Update (real-time UI)
  const handleSave = async (data) => {
    try {
      if (editingTask) {
        const res = await updateTask(editingTask._id, data);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? res.data : t))
        );
      } else {
        const res = await addTask(data);
        setTasks((prev) => [res.data, ...prev]);
      }

      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      alert("Failed to save task");
    }
  };

  // Delete (real-time UI)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  // Status change (real-time UI)
  const handleStatusChange = async (id, status) => {
    try {
      const res = await updateTask(id, { status });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="center-text">Loading tasks...</p>;
  if (error) return <p className="center-text" style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>My Tasks</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Add New Task
        </button>
      </div>

      {/* Filter / Sort / Search */}
      <div className="filter-bar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Task List */}
      {processedTasks.length === 0 ? (
        <p className="center-text">No Results Found</p>
      ) : (
        processedTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={(t) => {
              setEditingTask(t);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))
      )}

      {/* Task Form */}
      {showForm && (
        <TaskForm
          initial={editingTask}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default TaskList;
