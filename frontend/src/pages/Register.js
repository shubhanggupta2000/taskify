import React, { useState } from "react";
import axios from "axios";
import { register } from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("User");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password, role });
      localStorage.setItem("token", res.data.token);
      toast.success("Registered successfully!");
      setTimeout(() => {
        nav('/');
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("/api/auth/register", { email, password, role });
  //     // Redirect to login
  //   } catch (error) {
  //     console.error("Registration failed", error);
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={name}
    //     onChange={(e) => setName(e.target.value)}
    //     placeholder="Name"
    //     required
    //   />
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //     required
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //     required
    //   />
    //   <select value={role} onChange={(e) => setRole(e.target.value)}>
    //     <option value="User">User</option>
    //     <option value="Admin">Admin</option>
    //   </select>
    //   <button type="submit">Register</button>
    // </form>
    <div className="login-container container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Choose User Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <Link to="/login" className="btn btn-link">
          Switch to Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
