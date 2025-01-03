import axios from "axios";

export const getNotifications = () => {
  return axios.get("/api/notifications");
};