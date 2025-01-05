import React, { useState, useEffect } from "react";
import axiosInstance from "../../../Auth/axiosInstance";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";
import "./QuizList.css";
import Loading from "../../../Components/Loading";

const PageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

const QuizCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  height: "350px",
  margin: "20px",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ddd",
  overflow: "hidden",
  cursor: "pointer",
  background: "#fff",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const QuizImageWrapper = styled("div", {
  position: "relative",
  width: "100%",
  height: "150px",
  backgroundColor: "#f0f0f0", // Placeholder background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const QuizImage = styled("img", {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
});

const QuizTitle = styled("h3", {
  fontSize: "18px",
  fontWeight: "600",
  margin: "10px 0",
});

const InfoText = styled("p", {
  fontSize: "14px",
  fontWeight: "400",
  color: "#555",
  margin: "5px 0",
});

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  useEffect(() => {
    axiosInstance
      .get("quiz/allquiz")
      .then((response) => {
        setQuizzes(response.data);

        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Show loading component while quizzes are being fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* <div className="relative w-full">
        <img
          src="./4.svg"
          alt="QUIZ"
          loading="lazy"
          className="h-auto w-full object-cover"
        />
      </div> */}
      <PageContainer>
        <h2 className="text-4xl uppercase m-5">
          <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            All Quizzes
          </span>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              onClick={() => handleQuizClick(quiz._id)}
              style={{ position: "relative" }}
            >
              <QuizImageWrapper>
                <QuizImage
                  src="https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY="
                  alt="Quiz Image"
                  onLoad={(e) => (e.target.style.opacity = 1)}
                />
              </QuizImageWrapper>
              <QuizTitle>{quiz.title}</QuizTitle>
              <InfoText>
                Topics:{" "}
                <span className="topics">{quiz.category || "General"}</span>
              </InfoText>
              <div className="Wardflex">
                <InfoText>
                  <span className="diff">Difficulty:</span> {quiz.difficulty}
                </InfoText>
                <div>
                  <InfoText>Total Questions: {quiz.questionsLength}</InfoText>
                  <InfoText>
                    Scored: {quiz.score} / {quiz.questionsLength * 100}{" "}
                  </InfoText>
                  <InfoText>Attempts: {quiz.attempts}</InfoText>
                </div>
              </div>
            </QuizCard>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default QuizList;
