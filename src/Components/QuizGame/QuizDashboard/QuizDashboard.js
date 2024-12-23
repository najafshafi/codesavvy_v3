import "./QuizDashboard.css";
import React from "react";
import CardQuiz from "../CardQuiz";
import Leaderboard from "../Leaderboard/Leaderboard";

const QuizDashboard = () => {
  return (
    <div className="dashboardLayout">
      <div className="quiz">
        <Leaderboard />
      </div>
      <div className="board">
        <CardQuiz />
      </div>
    </div>
  );
};

export default QuizDashboard;
