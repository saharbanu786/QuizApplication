// import React, { useEffect, useState } from "react";
// import { fetchScoreboard } from "../api"; // Import API function

// const Scoreboard = () => {
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     const getScores = async () => {
//       try {
//         const response = await fetchScoreboard();
//         setScores(response.data);
//       } catch (error) {
//         console.error("Error fetching scoreboard:", error);
//       }
//     };
//     getScores();
//   }, []);

//   return (
//     <div className="scoreboard-container">
//       <h2>🏆 Scoreboard</h2>
//       <ul>
//         {scores.map((score, index) => (
//           <li key={index}>
//             <strong>{score.user?.name || "Unknown User"}:</strong> {score.points} points
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Scoreboard;
