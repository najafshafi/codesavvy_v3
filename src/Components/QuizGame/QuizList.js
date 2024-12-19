import React, { useState, useEffect } from 'react';
import axiosInstance from "../../Auth/axiosInstance"
import { styled } from '@stitches/react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const PageContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
});

const QuizCard = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '350px',
    margin: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    background: '#fff',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const QuizImage = styled('img', {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
});

const QuizTitle = styled('h3', {
    fontSize: '18px',
    fontWeight: '600',
    margin: '10px 0',
});

const DifficultyLevel = styled('p', {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
});

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate hook

    const handleQuizClick = (quizId) => {
        navigate(`/quiz/${quizId}`); // This should navigate to /quiz/{quizId}
    };

    useEffect(() => {
        axiosInstance.get('quiz/allquiz')
            .then(response => {
                setQuizzes(response.data);
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
                    <QuizCard key={quiz._id} onClick={() => handleQuizClick(quiz._id)}>
                        <QuizImage src="https://via.placeholder.com/250x150.png?text=Coding" alt="Quiz Image" />
                        <QuizTitle>{quiz.title}</QuizTitle>
                        <DifficultyLevel>Difficulty: {quiz.difficulty}</DifficultyLevel>
                    </QuizCard>
                ))}
            </div>
        </PageContainer>

    );
};

export default QuizList;
