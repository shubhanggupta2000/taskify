import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Add token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const createTask = (data) => API.post("/tasks/create", data);
export const fetchTasks = () => API.get("/tasks");
export const updateTask = (data) => API.put("/tasks/update", data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
