import { useState, useEffect } from 'react';
import axiosInstance from '../../Auth/axiosInstance';
import { useParams } from 'react-router-dom';
import './CardQuiz.css'; // Import external CSS

export default function App() {
    const [quiz, setQuiz] = useState(null);
    const [flippedStates, setFlippedStates] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(100);
    const [chances, setChances] = useState(3);
    const [resultMessage, setResultMessage] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);  // Track total score for all questions
    const [totalGainedScore, setTotalGainedScore] = useState(0);  // Track gained score across questions
    const [isQuizComplete, setIsQuizComplete] = useState(false);  // Flag to track if quiz is complete
    const { id } = useParams();

    // Fetch quiz data
    useEffect(() => {
        axiosInstance
            .get(`/quiz/${id}`)
            .then((response) => {
                const quizData = response.data.quiz;
                setQuiz(quizData);
                setFlippedStates(new Array(quizData.questions.length).fill(false));
                calculateTotalScore(quizData.questions);  // Calculate total score for all questions
            })
            .catch((error) => console.error(error));
    }, [id]);

    // Calculate total score of all questions
    const calculateTotalScore = (questions) => {
        const total = questions.length * 100;  // Assuming each question is worth 100 points
        setTotalScore(total);
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalItems = currentQuestion.solutionCharacters.length;
    const pointsPerItem = 100 / totalItems;

    // Handle click on answer item
    const handleClick = (index) => {
        if (showAll || flippedStates[index]) return;

        setScore((prev) => Math.max(prev - pointsPerItem, 0));

        const updatedStates = [...flippedStates];
        updatedStates[index] = true;
        setFlippedStates(updatedStates);
    };

    // Handle show answer for the current question
    const handleShowAnswer = () => {
        // Show the answer for the current question
        setShowAll(true);
        setScore(0); // Set score to 0 for the current question

        if (currentQuestionIndex === quiz.questions.length - 1) {
            // If it's the last question, save the total gained score
            setTotalGainedScore((prev) => prev + score); // Add the score of the last question
            handleSaveScore(); // Automatically save the score for the entire quiz
            setIsQuizComplete(true); // Mark quiz as complete
        }
    };

    // Handle move to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            // Reset states for the next question
            setCurrentQuestionIndex((prev) => prev + 1);
            setShowAll(false); // Reset showAll for the next question
            setFlippedStates(new Array(quiz.questions[currentQuestionIndex + 1].solutionCharacters.length).fill(false)); // Reset flipped states
            setScore(100); // Reset score for the new question
            setChances(3); // Reset chances for the new question
            setResultMessage(''); // Clear result message
            setInput(''); // Clear input field
        }
    };


    const handleSubmit = () => {
        const actualWord = currentQuestion.solutionCharacters.join('').toLowerCase();
        if (input.toLowerCase() === actualWord) {
            setResultMessage(`Correct! Your score: ${score.toFixed(1)}`); // Format score to 1 decimal place
            setTotalGainedScore((prev) => prev + score); // Add gained score for correct answer
            setShowAll(true); // Show the answer for the current question
            setInput(''); // Clear the input field

            // If it's the last question, save the score and mark the quiz complete
            if (currentQuestionIndex === quiz.questions.length - 1) {
                handleSaveScore(); // Automatically save the total score
                setIsQuizComplete(true); // Mark quiz as complete
            } else {
                // Move to the next question without showing its answer
                setTimeout(() => {
                    setShowAll(false); // Hide the answer before switching
                    setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question
                    resetQuestionState(); // Reset states for the next question
                }, 1000); // Optional delay to show feedback before switching
            }
        } else {
            if (chances > 1) {
                setChances((prev) => prev - 1);
                setResultMessage(`Incorrect! ${chances - 1} chance(s) remaining.`);
            } else {
                setScore(0);
                setChances(0); // No chances left
                setResultMessage(`Incorrect! The correct answer was "${actualWord}".`);
                setShowAll(true); // Show the correct answer for the current question

                // If it's the last question or chances are over, save the score and mark the quiz complete
                if (currentQuestionIndex === quiz.questions.length - 1) {
                    handleSaveScore(); // Save the total score
                    setIsQuizComplete(true); // Mark quiz as complete
                } else {
                    // Move to the next question without showing its answer
                    setTimeout(() => {
                        setShowAll(false); // Hide the answer before switching
                        setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question
                        resetQuestionState(); // Reset states for the next question
                    }, 1000); // Optional delay to show feedback before switching
                }
            }
            setInput(''); // Clear the input field after an attempt
        }
    };

    // Helper function to reset question-related states
    const resetQuestionState = () => {
        setFlippedStates(
            new Array(quiz.questions[currentQuestionIndex + 1].solutionCharacters.length).fill(false)
        ); // Reset flipped states for the next question
        setScore(100); // Reset score for the new question
        setChances(3); // Reset chances for the new question
        setResultMessage(''); // Clear result message
    };


    // Automatically save the score after the last question or when chances are over
    const handleSaveScore = () => {
        const finalScore = totalGainedScore;  // Total score gained during the quiz
        const totalPossibleScore = totalScore;  // Maximum possible score
        axiosInstance
            .post('/score/save', { quizId: quiz._id, score: finalScore, totalScore: totalPossibleScore })
            .then((response) => {
                console.log('Score saved successfully:', response.data);
            })
            .catch((error) => console.error('Error saving score:', error));
    };

    return (
        <div className="app-container">
            <h4 className="question-title mb-5">
                Question {currentQuestionIndex + 1}: {quiz.questions[currentQuestionIndex].question}
            </h4>
            <div className="question">{currentQuestion.questionText}</div>
            <div className="container">
                {currentQuestion.solutionCharacters.map((item, i) => (
                    <div className="box" key={i} onClick={() => handleClick(i)}>
                        <div
                            className="front-box"
                            style={{
                                transform: flippedStates[i] || showAll ? 'rotateX(180deg)' : 'rotateX(0deg)',
                            }}>
                            {'🔒'}
                        </div>
                        <div
                            className="back-box"
                            style={{
                                transform: flippedStates[i] || showAll ? 'rotateX(0deg)' : 'rotateX(180deg)',
                            }}>
                            {item}
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="button"
                onClick={handleShowAnswer}
                disabled={isQuizComplete} // Disable for a completed quiz
            >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Show Answer'}
            </button>

            <input
                className="input"
                type="text"
                placeholder="Enter your guess"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isQuizComplete}  // Disable input after quiz completion
            />
            <button
                className="button"
                onClick={handleSubmit}
                disabled={chances === 0 || score === 0 || isQuizComplete}  // Disable submit when quiz is complete
            >
                Submit
            </button>

            <button
                className="button"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === quiz.questions.length - 1 || isQuizComplete}
            >
                Next Question
            </button>

            {/* <button
                className="button"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                disabled={chances === 0 || score === 0 || isQuizComplete || input === ''}
            >
                Next Question
            </button> */}
            <div className="score">Score: {score.toFixed(1)} / 100</div>
            <div className="score">Chances Left: {chances}</div>
            <div className="score">
                Total Score: {totalGainedScore.toFixed(1)} / {totalScore.toFixed(1)}
            </div>
            {resultMessage && <div className="result">{resultMessage}</div>}
        </div>
    );
}
