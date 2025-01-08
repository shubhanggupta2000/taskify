import React, { useEffect, useState } from "react";
import { createTask, fetchTaskById } from "../api";
import { useParams } from "react-router-dom";

const EditTasks = () => {
  const { pid } = useParams();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const pMap = { LOW: 0, MEDIUM: 1, HIGH: 2 };
  const priority = ["LOW", "MEDIUM", "HIGH"];
  
  useEffect(() => {
    console.log(pid);
    setLoading(true);
    const getTasks = async () => {
      const res = await fetchTaskById(pid);
      setTasks(res.data);
      console.log(res.data);

      setLoading(false);
    };
    getTasks();
  }, [pid]);

  const handleCreate = async () => {
    const res = await createTask(tasks);
    setTasks(...tasks, res.data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
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
            value={tasks.title}
            onChange={(e) => setTasks({ ...tasks, title: e.target.value })}
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
            value={tasks.description}
            onChange={(e) =>
              setTasks({ ...tasks, description: e.target.value })
            }
          />{" "}
        </div>
        <div className="mb-3">
          <label for="priority" className="form-label">
            Priority - {tasks.priority}
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="2"
            value={pMap[tasks.priority]}
            id="priority"
            onChange={(e) =>
              setTasks({ ...tasks, priority: priority[e.target.value] })
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
            value={tasks.dueDate}
            id="dueDate"
            onChange={(e) =>
              setTasks({ ...tasks, dueDate: e.target.value })}
          />
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          Add Task
        </button>
      </div>

    </div>
  );
};

export default EditTasks;
