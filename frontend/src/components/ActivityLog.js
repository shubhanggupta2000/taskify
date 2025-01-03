import React, { useEffect, useState } from "react";
import { getActivityLogs } from "../services/activityLogService";

const ActivityLog = ({ taskId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await getActivityLogs(taskId);
      setLogs(response.data);
    };
    fetchLogs();
  }, [taskId]);

  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
