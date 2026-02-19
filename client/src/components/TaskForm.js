import React, { useEffect, useState } from "react";

function TaskForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setStatus(initial.status || "pending");
      setDueDate(initial.dueDate ? initial.dueDate.substring(0, 10) : "");
    }
  }, [initial]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    setLoading(true);

    await onSave({
      title,
      description,
      status,
      dueDate: dueDate || null,
    });

    setLoading(false);
  };

  return (
    <div className="form-card">
      <h3>{initial ? "Edit Task" : "Add Task"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
