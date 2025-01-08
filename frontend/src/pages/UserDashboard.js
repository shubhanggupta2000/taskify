import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchTasks } from "../api";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) return nav("/login");
    const fetcher = async () => {
      const response = await fetchTasks();
      setTasks(response.data);
    };

    fetcher();
  }, []);
  useEffect(() => {
    console.log(tasks);
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            User dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Logout
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <ul className="col">
        {tasks.map((task) => (
          <div key={task.id} className="card m-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <Link href={`/uploads/${task.filePath}`} download={task.filePath} className="btn btn-primary m-1">
                Download File
              </Link>
              {<button className="btn">Edit</button>}
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default UserDashboard;
