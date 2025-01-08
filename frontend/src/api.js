import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const getUsers = () => API.get("/auth/users");

// Task APIs
export const createTask = (data) => API.post("/tasks", data); // Adjusted for RESTful convention (POST to "/tasks")
export const fetchTasks = () => API.get("/tasks"); // Fetch all tasks
export const fetchTaskById = (id) => API.get(`/tasks/${id}`); // Fetch single task by ID
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data); // Updated endpoint to match task ID in URL
export const deleteTask = (id) => API.delete(`/tasks/${id}`); // Task deletion

// File Upload API
export const uploadTaskFile = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post(`/tasks/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Logs API
export const fetchTaskLogs = (id) => API.get(`/tasks/${id}/logs`);
