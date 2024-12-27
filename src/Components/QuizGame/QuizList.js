import React, { useState, useEffect } from "react";
import axiosInstance from "../../Auth/axiosInstance";
import { styled } from "@stitches/react";
import { useNavigate } from 'react-router-dom';
import "./QuizList.css"

const PageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});
const QuizCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "250px",
  height: "300px",
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

const QuizImage = styled("img", {
  width: "100%",
  height: "150px",
  objectFit: "cover",
});

const QuizTitle = styled("h3", {
  fontSize: "18px",
  fontWeight: "600",
  margin: "10px 0",
});

const DifficultyLevel = styled("p", {
  fontSize: "14px",
  fontWeight: "500",
  color: "#555",
});

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); // This should navigate to /quiz/{quizId}
  };

  useEffect(() => {
    axiosInstance
      .get("quiz/allquiz")
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);
  
const InfoText = styled('p', {
    fontSize: '14px',
    fontWeight: '400',
    color: '#555',
    margin: '5px 0',
});

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleQuizClick = (quizId) => {
        navigate(`/quiz/${quizId}`); // Navigate to the quiz detail page
    };

    useEffect(() => {
        axiosInstance.get('quiz/allquiz')
            .then(response => {
                setQuizzes(response.data);
                console.log()  // This should include attempts and scores
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching quizzes:", error);
                setLoading(false);
            });
    }, []);

  if (loading) {
    return <PageContainer>Loading quizzes...</PageContainer>;
  }
    return (
        <PageContainer>
            <h2>All Quizzes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {quizzes.map((quiz) => (
                    <QuizCard key={quiz._id} onClick={() => handleQuizClick(quiz._id)} style={{ position: 'relative' }}>
                        {/* Badge with the number of questions */}
                        <div className="badge">

                        </div>
                        <div className="badges">
                            <span>Points: {quiz.questionsLength * 100}</span>
                        </div>

                        <QuizImage
                            src="https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY="
                            alt="Quiz Image"
                        />
                        <QuizTitle>{quiz.title}</QuizTitle>
                        <InfoText>
                            Topics: <span className="topics">{quiz.category || "General"}</span>
                        </InfoText>
                        <div className="Wardflex">
                            <InfoText>
                                <span className="diff">Difficulty:</span> {quiz.difficulty}
                            </InfoText>
                            <div>
                                <InfoText>Total Questions: {quiz.questionsLength}</InfoText>
                                <InfoText>Scored: {quiz.score} / {quiz.questionsLength * 100} </InfoText>
                                <InfoText>Attempts: {quiz.attempts}</InfoText>

                            </div>
                        </div>
                    </QuizCard>
                ))}
            </div>
        </PageContainer>


    );
};

export default QuizList;
