import React from "react";

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-card">
      <div className="task-left">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}

        {task.dueDate && (
          <p>
            <b>Due:</b> {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}

        <span className={`status ${task.status}`}>{task.status}</span>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button className="btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
