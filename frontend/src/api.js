import axios from "axios";

// Base API URL (Ensure this matches your backend URL)
const BASE_URL = "http://localhost:5000/api";

// Function to get the token from localStorage and add it to request headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);  // Check if the token is correct
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  

// ✅ User APIs
export const registerUser = (userData) => axios.post(`${BASE_URL}/users/register`, userData);
export const loginUser = (credentials) => axios.post(`${BASE_URL}/users/login`, credentials);
export const fetchUsers = () => axios.get(`${BASE_URL}/users`, getAuthHeaders());
export const updateUser = (userId, updatedData) =>
  axios.put(`${BASE_URL}/users/${userId}`, updatedData, getAuthHeaders());
export const deleteUser = (userId) => axios.delete(`${BASE_URL}/users/${userId}`, getAuthHeaders());
export const addUser = (userData) => axios.post(`${BASE_URL}/users/register`, userData, getAuthHeaders());

// ✅ Quiz APIs (Require Authentication)
export const fetchQuizzes = () => axios.get(`${BASE_URL}/quiz`, getAuthHeaders());
export const submitQuiz = (quizData) => axios.post(`${BASE_URL}/quiz`, quizData, getAuthHeaders());
export const updateQuiz = (quizId, updatedData) =>
  axios.put(`${BASE_URL}/quiz/${quizId}`, updatedData, getAuthHeaders());
export const deleteQuiz = (quizId) => axios.delete(`${BASE_URL}/quiz/${quizId}`, getAuthHeaders());
export const addQuiz = (quizData) => axios.post(`${BASE_URL}/quiz`, quizData, getAuthHeaders());

// ✅ Score APIs (Require Authentication)
export const fetchScoreboard = () => axios.get(`${BASE_URL}/score`, getAuthHeaders());
export const submitScore = (scoreData) => axios.post(`${BASE_URL}/score`, scoreData, getAuthHeaders());
export const updateScore = (scoreId, updatedData) =>
  axios.put(`${BASE_URL}/score/${scoreId}`, updatedData, getAuthHeaders());
export const deleteScore = (scoreId) => axios.delete(`${BASE_URL}/score/${scoreId}`, getAuthHeaders());
