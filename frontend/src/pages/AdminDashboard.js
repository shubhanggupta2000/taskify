import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, assignTask } from "../services/taskService";
import { uploadFile } from "../services/fileService";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAssign = async (taskId, userId) => {
    await assignTask(taskId, userId);
    // Update tasks state if needed
  };

  const handleFileUpload = async (taskId) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    await uploadFile(formData);
    // Update task with file path if needed
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleAssign(task.id, 1)}>Assign</button>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button onClick={() => handleFileUpload(task.id)}>
              Upload File
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
