import React, { useState } from "react";
import { registerUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component


export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset error message before submission

    try {
      await registerUser(user);
      alert("Registered successfully!");
      setIsRegistered(true); // Show login link
      setTimeout(() => navigate("/login"), 1500); // Auto-redirect after 1.5 seconds
    } catch (error) {
      setError("Registration failed! Please try again.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-page">
      <Navbar /> {/* Add Navbar here */}
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="error">{error}</p>} {/* Display error message if any */}

        {isRegistered && (
          <p>
            Already registered?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
