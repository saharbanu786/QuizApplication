// Login.jsx
import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      alert("Logged in successfully!");
      localStorage.setItem("token", response.data.token); // Save token if needed
      navigate("/"); // Redirect to home after login
    } catch (error) {
      alert("Login failed! Please check your email and password.");
    }
  };

  return (
    <div className="login-page">
      <Navbar /> {/* Add Navbar here */}
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
