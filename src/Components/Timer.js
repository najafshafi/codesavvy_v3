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
      <button
        onClick={handleSetShow}
        class="group fixed bottom-12 left-5 z-40 cursor-pointer outline-none border-none rounded-full flex flex-row items-center justify-center h-12 w-12 hover:!w-[100px] transition-all duration-[0.75s] before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:bg-theme before:ring-4 before:ring-offset-4 before:ring-theme before:rounded-full before:transition before:duration-300 before:ring-offset-[#fff] hover:before:scale-105 active:before:scale-95 text-white"
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
                <p className="font-semibold text-Primary">
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
