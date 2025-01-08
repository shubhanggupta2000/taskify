import React, { useState } from "react";
import axios from "axios";
import { login } from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({email, password});

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect user to the dashboard
      window.location.href = "/";
      toast.success(
        "Logged in successfully!"
      );
      setTimeout(() => {
        nav('/');
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
      console.error("Login failed:", error);
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to="/register"
          className="btn btn-link"
        >
          Switch to Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
