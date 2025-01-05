import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Auth/axiosInstance";
import { styled } from "@stitches/react";
import Loading from "../../../Components/Loading";

// Styled Components
const QuizContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
});

const QuizTitle = styled("h1", {
  fontSize: "2rem",
  marginBottom: "10px",
});

const QuizDescription = styled("p", {
  fontSize: "1rem",
  color: "#555",
  marginBottom: "20px",
  maxWidth: "600px",
});

const DifficultyLevel = styled("div", {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#007BFF",
  marginBottom: "20px",
});

const Error = styled("div", {
  fontSize: "1.5rem",
  color: "red",
  fontWeight: "bold",
});

export default function QuizAllData() {
  const { id } = useParams(); // Get quizId from the URL params
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Make an API request to fetch quiz details
        const response = await axiosInstance.get(`/quiz/${id}`);
        setQuiz(response.data); // Set the quiz data
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to load quiz data. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]); // Re-run when 'id' changes

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <QuizContainer>
      <QuizTitle>{quiz.title}</QuizTitle>
      <DifficultyLevel>Difficulty: {quiz.difficulty}</DifficultyLevel>
      <QuizDescription>{quiz.description}</QuizDescription>
    </QuizContainer>
  );
}
