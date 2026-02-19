import axios from "axios";
import { getToken } from "./authService";

// Create axios instance
const API = axios.create({
  baseURL: "https://task-management-app.onrender.com/api/tasks",
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Fetch all tasks
export const getTasks = () => API.get("/");

// Add new task
export const addTask = (taskData) => API.post("/", taskData);

// Update task
export const updateTask = (id, taskData) => API.put(`/${id}`, taskData);

// Delete task
export const deleteTask = (id) => API.delete(`/${id}`);
