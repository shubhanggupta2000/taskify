import axios from "axios";

export const getActivityLogs = (taskId) => {
  return axios.get(`/api/tasks/${taskId}/logs`);
};
