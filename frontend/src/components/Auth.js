import React, { useState } from "react";
import { register, login } from "../api";
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isLogin ? await login(form) : await register(form);
      localStorage.setItem("token", res.data.token);
      toast.success(
        isLogin ? "Logged in successfully!" : "Registered successfully!"
      );
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
