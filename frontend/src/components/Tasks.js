import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetchTasks();
      setTasks(res.data);
    };
    getTasks();
  }, []);

  const handleCreate = async () => {
    const res = await createTask(newTask);
    setTasks([...tasks, res.data]);
    setNewTask({ title: "", description: "" });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Tasks</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreate} className="btn btn-success">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button
              onClick={() => handleDelete(task.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
