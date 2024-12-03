import React, { useState, useEffect } from 'react';
import './TimeApp.css';

const TimeApp = () => {
  const [endTime, setEndTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const timeRemaining = endTime - now;
        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          setTimerRunning(false);
          alert('Time is up!');
        }
        setRemainingTime(timeRemaining);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, endTime]);

  const handleSetTimer = () => {
    if (!minutes || isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid number of minutes.');
      return;
    }

    const now = Date.now();
    setEndTime(now + minutes * 60000);
    setRemainingTime(minutes * 60000);
    setTimerRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-app">

      <div className="timer-input">

        <button onClick={handleSetTimer}>Set Timer </button>

        <input
          type="number"
          placeholder="Enter minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />


        {timerRunning && (
          <div className="timer">
            <p>Time remaining: {formatTime(remainingTime)}</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default TimeApp;
