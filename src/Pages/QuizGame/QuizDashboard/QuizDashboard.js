import "./QuizDashboard.css";
import React from "react";
import CardQuiz from "../CardQuiz";
import Leaderboard from "../Leaderboard/Leaderboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles



const QuizDashboard = () => {
    return (
        <div className="dashboardLayout">
            
            <div className="quiz">
                <Leaderboard />
            </div>
            <div className="board">
                <CardQuiz />
                <ToastContainer position="bottom-right" />
            </div>
        </div>
    );
};

export default QuizDashboard;
