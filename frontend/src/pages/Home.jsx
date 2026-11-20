// Home.jsx
import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same directory

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <h1>Welcome to Quiz Game</h1>
        <p>Test your knowledge and compete with others!</p>
      </div>
    </div>
  );
}
