import { useEffect, useState } from "react";
import { fetchUsers, fetchQuizzes, addUser, updateUser, deleteUser, addQuiz, updateQuiz, deleteQuiz } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "" });
  const [editUser, setEditUser] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "" });
  const [editQuiz, setEditQuiz] = useState(null);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
    fetchQuizzes().then((res) => setQuizzes(res.data));
  }, []);

  // adding or updating user
  const handleSaveUser = () => {
    if (editUser) {
      updateUser(editUser._id, editUser).then(() => {
        fetchUsers().then((res) => setUsers(res.data)); // Fetch updated users from backend
        setNotification("User updated successfully!");
        setEditUser(null);
      })
        .catch(() => setNotification("Failed to update user!"));
    } else {
      addUser(newUser)
      .then(() => fetchUsers()) // Fetch updated user list
      .then((res) => {
        setUsers(res.data); // Ensure the users state is updated immediately
        setNotification("User added successfully!");
        })
        .catch(() => setNotification("Failed to add user!"));
    }
    setNewUser({ name: "", email: "", password: "", role: "" });
  };

  // Deleting user
  const handleDeleteUser = (userId) => {
    if (!userId) {
      setNotification("Error: Invalid user ID!");
      return;
    }
    deleteUser(userId)
    .then(() => fetchUsers().then((res) => setUsers(res.data))) // Fetch updated users
    .then(() => setNotification("User deleted successfully!"))
    .catch(() => setNotification("Failed to delete user!"));
  };

  const handleSaveQuiz = () => {
    if (editQuiz) {
      updateQuiz(editQuiz._id, editQuiz)
        .then(() => fetchQuizzes()) // Fetch updated quiz list after update
        .then((res) => {
          setQuizzes(res.data); // Update quizzes state
          setNotification("Quiz updated successfully!");
          setEditQuiz(null); // Reset the edit form
        })
        .catch(() => setNotification("Failed to update quiz!"));
    } else {
      addQuiz(newQuiz)
        .then(() => fetchQuizzes()) // Fetch updated quiz list after adding
        .then((res) => {
          setQuizzes(res.data); // Ensure quizzes state is updated immediately
          setNotification("Quiz added successfully!");
          setNewQuiz({ question: "", options: ["", "", "", ""], correctAnswer: "" }); // Reset form fields
        })
        .catch(() => setNotification("Failed to add quiz!"));
    }
  };

  const handleDeleteQuiz = (quizId) => {
    if (!quizId) {
      setNotification("Error: Invalid quiz ID!");
      return;
    }

    deleteQuiz(quizId) // Call deleteQuiz to delete the quiz
      .then(() => fetchQuizzes()) // Fetch updated quiz list after deletion
      .then((res) => {
        setQuizzes(res.data); // Update quizzes state
        setNotification("Quiz deleted successfully!");
      })
      .catch(() => setNotification("Failed to delete quiz!"));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-content">
        <h2>Admin Panel</h2>
        {notification && <p className="notification">{notification}</p>}

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">Logout</button>

        {/* Users Section */}
        <div className="admin-section">
          <h3>Users</h3>
          <div className="admin-list">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user.id || user._id} className="admin-card">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <button onClick={() => setEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id || user._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>

          {/* Add/Edit User Form */}
          <h4>{editUser ? "Edit User" : "Add New User"}</h4>
          <input
            type="text"
            placeholder="Name"
            value={editUser ? editUser.name : newUser.name}
            onChange={(e) => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser ? editUser.email : newUser.email}
            onChange={(e) => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={editUser ? editUser.password : newUser.password}
            onChange={(e) => editUser ? setEditUser({ ...editUser, password: e.target.value }) : setNewUser({ ...newUser, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role (admin/user)"
            value={editUser ? editUser.role : newUser.role}
            onChange={(e) => editUser ? setEditUser({ ...editUser, role: e.target.value }) : setNewUser({ ...newUser, role: e.target.value })}
          />
          <button onClick={handleSaveUser}>{editUser ? "Update User" : "Add User"}</button>
        </div>

        {/* Quizzes Section */}
        <div className="admin-section">
          <h3>Quizzes</h3>
          <div className="admin-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.id || quiz._id} className="admin-card">
                  <p><strong>Question:</strong> {quiz.question}</p>
                  <button onClick={() => setEditQuiz(quiz)}>Edit</button>
                  <button onClick={() => handleDeleteQuiz(quiz.id || quiz._id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No quizzes available.</p>
            )}
          </div>

          {/* Add/Edit Quiz Form */}
          <h4>{editQuiz ? "Edit Quiz" : "Add New Quiz"}</h4>
          <input
            type="text"
            placeholder="Question"
            value={editQuiz ? editQuiz.question : newQuiz.question}
            onChange={(e) => editQuiz ? setEditQuiz({ ...editQuiz, question: e.target.value }) : setNewQuiz({ ...newQuiz, question: e.target.value })}
          />
          {newQuiz.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={editQuiz ? editQuiz.options[index] : option}
              onChange={(e) => {
                const updatedOptions = editQuiz ? [...editQuiz.options] : [...newQuiz.options];
                updatedOptions[index] = e.target.value;
                editQuiz ? setEditQuiz({ ...editQuiz, options: updatedOptions }) : setNewQuiz({ ...newQuiz, options: updatedOptions });
              }}
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={editQuiz ? editQuiz.correctAnswer : newQuiz.correctAnswer}
            onChange={(e) => editQuiz ? setEditQuiz({ ...editQuiz, correctAnswer: e.target.value }) : setNewQuiz({ ...newQuiz, correctAnswer: e.target.value })}
          />
          <button onClick={handleSaveQuiz}>{editQuiz ? "Update Quiz" : "Add Quiz"}</button>
        </div>
      </div>
    </div>
  );
}
