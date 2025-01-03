import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <a href={`/uploads/${task.filePath}`} download>
              Download File
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
