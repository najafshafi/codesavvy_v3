// import { useState, useEffect } from 'react';
// import axiosInstance from '../../Auth/axiosInstance';
// import { useParams } from 'react-router-dom';
// import './CardQuiz.css'; // Import external CSS

// export default function App() {
//     const [quiz, setQuiz] = useState(null);
//     const [flippedStates, setFlippedStates] = useState([]);
//     const [showAll, setShowAll] = useState(false);
//     const [input, setInput] = useState('');
//     const [score, setScore] = useState(100);
//     const [chances, setChances] = useState(3);
//     const [resultMessage, setResultMessage] = useState('');
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [showNext, setShowNext] = useState(false);
//     const { id } = useParams();

//     useEffect(() => {
//         axiosInstance
//             .get(`/quiz/${id}`)
//             .then((response) => {
//                 const quizData = response.data.quiz;
//                 setQuiz(quizData);
//                 setFlippedStates(new Array(quizData.questions.length).fill(false));
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     if (!quiz) {
//         return <div>Loading...</div>;
//     }

//     const currentQuestion = quiz.questions[currentQuestionIndex];
//     const totalItems = currentQuestion.solutionCharacters.length;
//     const pointsPerItem = 100 / totalItems;

//     const handleClick = (index) => {
//         if (showAll || flippedStates[index]) return;

//         setScore((prev) => Math.max(prev - pointsPerItem, 0));

//         const updatedStates = [...flippedStates];
//         updatedStates[index] = true;
//         setFlippedStates(updatedStates);
//     };

//     const handleShowAnswer = () => {
//         if (showAll || showNext) {
//             setCurrentQuestionIndex(prev => prev + 1);
//             setShowAll(false);
//             setShowNext(false);
//             setInput('');
//             setFlippedStates(new Array(totalItems).fill(false));
//         } else {
//             setShowAll(true);
//             setScore(0);
//             setShowNext(true);
//             setResultMessage(`Answer revealed! The correct answer is "${currentQuestion.solutionCharacters.join('')}"`);
//         }
//     };

//     const handleSubmit = () => {
//         const actualWord = currentQuestion.solutionCharacters.join('').toLowerCase();
//         if (input.toLowerCase() === actualWord) {
//             setResultMessage(`Correct! Your score: ${score.toFixed(2)}`);
//             setShowAll(true);
//             setShowNext(true);
//         } else {
//             if (chances > 1) {
//                 setChances((prev) => prev - 1);
//                 setResultMessage(`Incorrect! ${chances - 1} chance(s) remaining.`);
//             } else {
//                 setScore(0);
//                 setChances((prev) => prev - 1);
//                 setResultMessage(`Incorrect! The correct answer was "${actualWord}".`);
//                 setShowAll(true);
//                 setShowNext(true);
//             }
//         }
//     };

//     const resetGame = () => {
//         setFlippedStates(new Array(totalItems).fill(false));
//         setShowAll(false);
//         setInput('');
//         setScore(100);
//         setChances(3);
//         setResultMessage('');
//         setShowNext(false);
//     };

//     const handleSaveScore = () => {
//         axiosInstance
//             .post('/score/save', { quizId: quiz._id, score })
//             .then((response) => {
//                 console.log('Score saved successfully:', response.data);
//             })
//             .catch((error) => console.error('Error saving score:', error));
//     };

//     return (
//         <div className="app-container">
//             <h4 className="question-title mb-5">Question {currentQuestionIndex + 1}: {quiz.questions[currentQuestionIndex].question}</h4>
//             <div className="question">{currentQuestion.questionText}</div>
//             <div className="container">
//                 {currentQuestion.solutionCharacters.map((item, i) => (
//                     <div className="box" key={i} onClick={() => handleClick(i)}>
//                         <div
//                             className="front-box"
//                             style={{
//                                 transform: flippedStates[i] || showAll ? 'rotateX(180deg)' : 'rotateX(0deg)',
//                             }}>
//                             {'🔒'}
//                         </div>
//                         <div
//                             className="back-box"
//                             style={{
//                                 transform: flippedStates[i] || showAll ? 'rotateX(0deg)' : 'rotateX(180deg)',
//                             }}>
//                             {item}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button className="button" onClick={handleShowAnswer}>
//                 {showNext ? 'Next Question' : 'Show Answer'}
//             </button>
//             <input
//                 className="input"
//                 type="text"
//                 placeholder="Enter your guess"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button className="button" onClick={handleSubmit} disabled={chances === 0 || score === 0}>
//                 Submit
//             </button>
//             <div className="score">Score: {score.toFixed(2)} / 100</div>
//             <div className="score">Chances Left: {chances}</div>
//             {resultMessage && <div className="result">{resultMessage}</div>}
//             {showAll && (
//                 <button className="button" onClick={handleSaveScore}>
//                     Save Score
//                 </button>
//             )}
//         </div>
//     );
// }




// import { useState, useEffect } from 'react';
// import axiosInstance from '../../Auth/axiosInstance';
// import { useParams } from 'react-router-dom';
// import './CardQuiz.css'; // Import external CSS

// export default function App() {
//     const [quiz, setQuiz] = useState(null);
//     const [flippedStates, setFlippedStates] = useState([]);
//     const [showAll, setShowAll] = useState(false);
//     const [input, setInput] = useState('');
//     const [score, setScore] = useState(100);
//     const [chances, setChances] = useState(3);
//     const [resultMessage, setResultMessage] = useState('');
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [totalScore, setTotalScore] = useState(0);  // Track total score for all questions
//     const [totalGainedScore, setTotalGainedScore] = useState(0);  // Track gained score across questions
//     const [showNext, setShowNext] = useState(false);  // Track whether the "Next Question" button should be shown
//     const { id } = useParams();

//     // Fetch quiz data
//     useEffect(() => {
//         axiosInstance
//             .get(`/quiz/${id}`)
//             .then((response) => {
//                 const quizData = response.data.quiz;
//                 setQuiz(quizData);
//                 setFlippedStates(new Array(quizData.questions.length).fill(false));
//                 calculateTotalScore(quizData.questions);  // Calculate total score for all questions
//             })
//             .catch((error) => console.error(error));
//     }, [id]);

//     // Calculate total score of all questions
//     const calculateTotalScore = (questions) => {
//         const total = questions.length * 100;  // Assuming each question is worth 100 points
//         setTotalScore(total);
//     };

//     if (!quiz) {
//         return <div>Loading...</div>;
//     }

//     const currentQuestion = quiz.questions[currentQuestionIndex];
//     const totalItems = currentQuestion.solutionCharacters.length;
//     const pointsPerItem = 100 / totalItems;

//     // Handle click on answer item
//     const handleClick = (index) => {
//         if (showAll || flippedStates[index]) return;

//         setScore((prev) => Math.max(prev - pointsPerItem, 0));

//         const updatedStates = [...flippedStates];
//         updatedStates[index] = true;
//         setFlippedStates(updatedStates);
//     };

//     // Show answer and move to next question
//     const handleShowAnswer = () => {
//         if (currentQuestionIndex === quiz.questions.length - 1) {
//             setShowNext(false); // Do not show next question button after the last question
//             setTotalGainedScore(prev => prev + score);  // Add the score of the last question
//             handleSaveScore(); // Automatically save score when the last question is answered
//         } else {
//             setShowAll(true);
//             setShowNext(true);
//         }
//     };

//     // Handle submit for answer
//     const handleSubmit = () => {
//         const actualWord = currentQuestion.solutionCharacters.join('').toLowerCase();
//         if (input.toLowerCase() === actualWord) {
//             setResultMessage(`Correct! Your score: ${score.toFixed(2)}`);
//             setTotalGainedScore((prev) => prev + score);  // Add gained score for correct answer
//             setShowAll(true);
//             setShowNext(true);
//         } else {
//             if (chances > 1) {
//                 setChances((prev) => prev - 1);
//                 setResultMessage(`Incorrect! ${chances - 1} chance(s) remaining.`);
//             } else {
//                 setScore(0);
//                 setChances((prev) => prev - 1);
//                 setResultMessage(`Incorrect! The correct answer was "${actualWord}".`);
//                 setShowAll(true);
//                 setShowNext(true);
//             }
//         }
//     };

//     // Automatically save the score after the last question
//     const handleSaveScore = () => {
//         const finalScore = totalGainedScore;  // Total score gained during the quiz
//         const totalPossibleScore = totalScore;  // Maximum possible score
//         axiosInstance
//             .post('/score/save', { quizId: quiz._id, score: finalScore, totalScore: totalPossibleScore })
//             .then((response) => {
//                 console.log('Score saved successfully:', response.data);
//             })
//             .catch((error) => console.error('Error saving score:', error));
//     };

//     return (
//         <div className="app-container">
//             <h4 className="question-title mb-5">
//                 Question {currentQuestionIndex + 1}: {quiz.questions[currentQuestionIndex].question}
//             </h4>
//             <div className="question">{currentQuestion.questionText}</div>
//             <div className="container">
//                 {currentQuestion.solutionCharacters.map((item, i) => (
//                     <div className="box" key={i} onClick={() => handleClick(i)}>
//                         <div
//                             className="front-box"
//                             style={{
//                                 transform: flippedStates[i] || showAll ? 'rotateX(180deg)' : 'rotateX(0deg)',
//                             }}>
//                             {'🔒'}
//                         </div>
//                         <div
//                             className="back-box"
//                             style={{
//                                 transform: flippedStates[i] || showAll ? 'rotateX(0deg)' : 'rotateX(180deg)',
//                             }}>
//                             {item}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button className="button" onClick={handleShowAnswer}>
//                 {showNext ? 'Next Question' : 'Show Answer'}
//             </button>
//             <input
//                 className="input"
//                 type="text"
//                 placeholder="Enter your guess"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button className="button" onClick={handleSubmit} disabled={chances === 0 || score === 0}>
//                 Submit
//             </button>
//             <div className="score">Score: {score.toFixed(2)} / 100</div>
//             <div className="score">Chances Left: {chances}</div>
//             <div className="score">
//                 Total Score: {totalGainedScore} / {totalScore}
//             </div>
//             {resultMessage && <div className="result">{resultMessage}</div>}
//         </div>
//     );
// }

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

    // Handle show answer and move to next question
    const handleShowAnswer = () => {
        // Show the answer for the current question
        setShowAll(true);
        setScore(0);  // Set score to 0 once the answer is shown

        // Do not disable the Next button; allow user to move to the next question
        if (currentQuestionIndex === quiz.questions.length - 1) {
            setTotalGainedScore(prev => prev + score);  // Add the score of the last question
            handleSaveScore(); // Automatically save score when the last question is answered
            setIsQuizComplete(true);  // Mark quiz as complete
        }
    };

    // Handle submit for answer
    const handleSubmit = () => {
        const actualWord = currentQuestion.solutionCharacters.join('').toLowerCase();
        if (input.toLowerCase() === actualWord) {
            setResultMessage(`Correct! Your score: ${score.toFixed(1)}`);  // Format score to 1 decimal place
            setTotalGainedScore((prev) => prev + score);  // Add gained score for correct answer
            setShowAll(true);  // Show the answer once it's submitted
            setInput('');  // Clear the input field
            if (currentQuestionIndex === quiz.questions.length - 1) {
                handleSaveScore();  // Automatically save score on last question submission
                setIsQuizComplete(true);  // Mark quiz as complete
            } else {
                setCurrentQuestionIndex(prev => prev + 1);  // Move to the next question
            }
        } else {
            if (chances > 1) {
                setChances((prev) => prev - 1);
                setResultMessage(`Incorrect! ${chances - 1} chance(s) remaining.`);
            } else {
                setScore(0);
                setChances(0);  // No chances left
                setResultMessage(`Incorrect! The correct answer was "${actualWord}".`);
                handleSaveScore();  // Automatically save score when chances are over
                setIsQuizComplete(true);  // Mark quiz as complete
            }
            setInput('');  // Clear the input field after an attempt
        }
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
                onClick={handleShowAnswer}
                disabled={chances === 0 || score === 0 || isQuizComplete}  // Disable show answer on quiz completion
            >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Show Answer'}
            </button>
            <button
                className="button"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                disabled={chances === 0 || score === 0 || isQuizComplete || input === ''}
            >
                Next Question
            </button>
            <div className="score">Score: {score.toFixed(1)} / 100</div>
            <div className="score">Chances Left: {chances}</div>
            <div className="score">
                Total Score: {totalGainedScore.toFixed(1)} / {totalScore.toFixed(1)}
            </div>
            {resultMessage && <div className="result">{resultMessage}</div>}
        </div>
    );
}
