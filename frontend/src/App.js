import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Tasks from "./components/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
