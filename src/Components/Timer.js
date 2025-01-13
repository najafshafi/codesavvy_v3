import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";

const Timer = () => {
  const [endTime, setEndTime] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleSetShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    let intervalId;

    if (timerRunning && !paused) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const timeRemaining = endTime - now;
        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          setTimerRunning(false);
          setShowPopup(true); // Show popup when time is up
        }
        setRemainingTime(timeRemaining);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, endTime, paused]);

  const handleSetTimer = () => {
    if (
      (isNaN(hours) || hours < 0) &&
      (isNaN(minutes) || minutes < 0) &&
      (isNaN(seconds) || seconds < 0)
    ) {
      alert("Please enter valid time values.");
      return;
    }

    const totalMilliseconds =
      (parseInt(hours || 0) * 3600 +
        parseInt(minutes || 0) * 60 +
        parseInt(seconds || 0)) *
      1000;
    const now = Date.now();
    setEndTime(now + totalMilliseconds);
    setRemainingTime(totalMilliseconds);
    setTimerRunning(true);
    setPaused(false); // Reset paused state when setting a new timer
  };

  const handlePause = () => {
    setPaused(true);
  };

  const handleResume = () => {
    const now = Date.now();
    setEndTime(now + remainingTime);
    setPaused(false);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setPaused(false);
    setRemainingTime(0);
    setEndTime(null);
  };

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600000);
    const mins = Math.floor((time % 3600000) / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* <button
        onClick={handleSetShow}
        className="fixed bottom-12 left-3 w-16 h-16 text-center rounded-full bg-[#1691FF] border border-blue-600 text-white z-40"
      >
        Timer
      </button> */}

      {/* <button class="group relative cursor-pointer outline-none border-none rounded-full flex flex-row items-center justify-center h-12 w-12 hover:!w-[100px] transition-all duration-[0.75s] before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:bg-[linear-gradient(130deg,#7209d4,#2832d4_33%,#00a5b2)] before:ring-4 before:ring-offset-4 before:ring-[#2832d4] before:rounded-full before:transition before:duration-300 before:ring-offset-[#fff] hover:before:scale-105 active:before:scale-95 text-white">
        <svg
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
        </svg>
        <span class="absolute right-1.5 text-[15px] font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-[1] group-hover:z-[9] pointer-events-none select-none opacity-0 group-hover:opacity-100 text-transparent group-hover:text-inherit group-active:right-2 transition-all duration-[2s] group-hover:duration-300 group-active:scale-[0.85]">
          Github
        </span>
      </button> */}

      <button
        onClick={handleSetShow}
        class="group fixed bottom-12 left-5 z-40 cursor-pointer outline-none border-none rounded-full flex flex-row items-center justify-center h-12 w-12 hover:!w-[100px] transition-all duration-[0.75s] before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:bg-[linear-gradient(130deg,#7209d4,#2832d4_33%,#00a5b2)] before:ring-4 before:ring-offset-4 before:ring-blue-600 before:rounded-full before:transition before:duration-300 before:ring-offset-[#fff] hover:before:scale-105 active:before:scale-95 text-white"
      >
        <MdTimer class="absolute left-2 group-hover:left-1.5 group-active:left-[10px] duration-300 transition-[left] z-10 w-8 h-8 text-white" />
        <span class="absolute right-1.5 text-lg font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-10 group-hover:z-10 pointer-events-none select-none opacity-0 group-hover:!opacity-100 text-transparent group-hover:text-inherit group-active:right-2 transition-all duration-1000 group-hover:duration-300 group-active:scale-[0.85]">
          Timer
        </span>
      </button>

      <div
        className={`max-w-6xl fixed z-30 bottom-0 left-36 flex flex-col shadow-lg ${
          isShow
            ? "translate-x-0 transition-transform duration-500 ease-in-out"
            : "-translate-x-[1000px] transition-transform duration-500 ease-in-out"
        }`}
      >
        <div className="border-2 bg-slate-900/95 p-4 mb-3">
          <div className="input-field flex gap-3 justify-start mb-4">
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex gap-4 justify-start items-center">
            <button
              onClick={handleSetTimer}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={timerRunning || paused}
            >
              Start Timer
            </button>
            {timerRunning && !paused && (
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                Pause Timer
              </button>
            )}
            {paused && (
              <button
                onClick={handleResume}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Resume Timer
              </button>
            )}
            <button
              onClick={handleStop}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Stop Timer
            </button>

            {timerRunning && (
              <div className="">
                <p className="font-semibold">
                  Time remaining: {formatTime(remainingTime)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="popup-content bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">
              Time is up! Well done for completing your task.
            </p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
