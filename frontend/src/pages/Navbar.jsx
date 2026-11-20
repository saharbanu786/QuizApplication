// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
//import "../App.css"; // Import the CSS for styling

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/quiz" className="nav-link">Quiz</Link>
      <Link to="/register" className="nav-link">Register</Link>
      <Link to="/login" className="nav-link">Login</Link>
      
      <Link to="/admin" className="nav-link">Admin</Link> {/* Added Admin link */}
    </div>
  );
}
