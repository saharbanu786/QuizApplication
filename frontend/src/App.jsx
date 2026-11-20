import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
//import Scoreboard from "./pages/ScoreBoard";
import Admin from "./pages/Admin";
import "./App.css";

function AppContent() {
  const location = useLocation(); // Get the current location (route)

  return (
    <div className="container">
      {/* Only render Navbar if the current route is "/" (Home page) */}
      {location.pathname === "/" && (
        <nav className="navbar">
          <Link to="/" className="logo">Quiz App</Link>
          <div className="nav-links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/quiz">Start Quiz</Link>
            
            <Link to="/admin">Admin</Link>
          </div>
        </nav>
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
         
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
