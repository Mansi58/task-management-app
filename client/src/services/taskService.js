import axios from "axios";
import { getToken } from "./authService";

const API = axios.create({
  baseURL: "https://task-management-app.onrender.com/api/tasks",
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getTasks = () => API.get("/");
export const createTask = (task) => API.post("/", task);
export const updateTask = (id, task) => API.put(`/${id}`, task);
export const deleteTask = (id) => API.delete(`/${id}`);