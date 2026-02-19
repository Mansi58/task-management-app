import axios from "axios";

// authService.js
const API_URL = "https://task-management-app-cioi.onrender.com/api/auth";



// Register
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// Login
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};
