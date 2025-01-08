import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../api";
import DatePicker from "react-datepicker";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 0,
    dueDate: undefined,
  });
  const priority = ["LOW", "MEDIUM", "HIGH"];
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
        <div className="mb-3">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label for="description" className="form-label">
            Description
          </label>
          <textarea
            placeholder="Description"
            className="form-control"
            id="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />{" "}
        </div>
        <div className="mb-3">
          <label for="priority" className="form-label">
            Priority - {priority[newTask.priority]}
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="2"
            value={newTask.priority}
            id="priority"
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label for="dueDate" className="form-label">
            Due Date
          </label>
          <input type="datetime-local"
                      className="form-control"
            value={newTask.dueDate}
            id="dueDate"
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })}
          />
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          Add Task
        </button>
      </div>
      <ul className="row container pt-4">
        {tasks.map((task) => (
          <div key={task.id} className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <button
                onClick={() => handleDelete(task.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
