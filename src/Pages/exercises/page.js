"use client";
import React, { useState } from "react";
import Angular from "./Angular.json";
import Appml from "./Appml.json";
import Asp from "./Asp.json";
import Bootstrap from "./Bootstrap.json";
import Cp from "./Cpp.json";
import Canvas from "./Canvas.json";
import Css from "./Css.json";
import DataScience from "./Datascience.json";
import Django from "./Django.json";
import Git from "./Git.json";
import Go from "./Go.json";
import Html from "./Html.json";
import Java from "./Java.json";
import Javascript from "./Jaavscript.json";
import Jquery from "./JQuery.json";
import Kotlin from "./Kotlin.json";
import Matlab from "./MatlabPilot.json";
import Mongo from "./Mongodb.json";
import Mysql from "./Mysql.json";
import Nodejs from "./Node.json";
import Numpy from "./Numpy.json";
import Php from "./Php.json";
import PostgreSQL from "./Postgresql.json";
import Python from "./Python.json";
import R from "./R.json";
import Rasberry from "./Rasberry.json";
import ReactJSON from "./React.json";
import Rwd from "./Rwd.json";
import Sass from "./Sass.json";
import Scipy from "./Scipy.json";
import Sidjango from "./SiDjango.json";
import TailwindCSS from "./Tailwindcss.json";
import Typescript from "./Typescript.json";
import Vue from "./Vue.json";
import XML from "./Xml.json";
import { IoMdArrowDropright } from "react-icons/io";

const files = {
  Angular,
  Appml,
  Asp,
  Bootstrap,
  Css,
  Html,
  Rasberry,
  Cpp: Cp,
  Canvas,
  DataScience,
  Django,
  Git,
  Go,
  Java,
  Javascript,
  Jquery,
  Kotlin,
  Matlab,
  Mongo,
  Mysql,
  Nodejs,
  Numpy,
  Php,
  PostgreSQL,
  Python,
  R,
  React: ReactJSON,
  Rwd,
  Sass,
  Scipy,
  Sidjango,
  TailwindCSS,
  Typescript,
  Vue,
  XML,
};

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  const [selectedFile, setSelectedFile] = useState("Angular"); // Default to Angular file
  const [selectedTopic, setSelectedTopic] = useState(
    Array.isArray(files[selectedFile]) ? files[selectedFile][0] : {} // Default to first topic or empty object
  );
  const [visibleAnswer, setVisibleAnswer] = useState(null); // Track the currently visible answer

  const handleFileSelection = (fileName) => {
    setSelectedFile(fileName);
    setSelectedTopic(Array.isArray(files[fileName]) ? files[fileName][0] : {});
    setVisibleAnswer(null); // Reset visible answer when switching files
  };

  const handleSidebarSelection = (question, index) => {
    const topic = Array.isArray(files[selectedFile])
      ? files[selectedFile][index]
      : null;
    setSelectedTopic(topic || {});
    setVisibleAnswer(null); // Reset the answer visibility when changing the question
  };

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswer(visibleAnswer === index ? null : index); // Toggle visibility of the answer
  };

  return (
    <div className="relative flex flex-col border-8 border-textColor1 bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-gray-800 h-[4rem] text-Primary p-3 flex justify-start space-x-2 overflow-x-auto LearnTopbar">
        {Object.keys(files)
          .slice(0, 50)
          .map((fileName) => (
            <button
              key={fileName}
              onClick={() => handleFileSelection(fileName)}
              className={`px-4 py-1 rounded  ${
                fileName === selectedFile ? "bg-theme" : "bg-textColor2"
              }`}
            >
              {fileName}
            </button>
          ))}
      </div>

      <div className="lg:hidden bg-textColor1 h-full absolute top-14 z-40 left-0 w-5 md:w-8 text-lg text-Primary flex items-center justify-center">
        <button
          onClick={handleMenuOpen}
          className="focus:outline-none shadow-lg"
        >
          <IoMdArrowDropright
            className={`size-7 md:size-10 text-primary transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Desktop */}
        <div
          className={`hidden lg:block left-0 w-full md:w-64 bg-textColor1 text-Primary p-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-9rem)] LearnSidebar`}
        >
          <h2 className="text-xl font-bold mb-4">{selectedFile} Topics</h2>
          <ul className="space-y-2">
            {Array.isArray(files[selectedFile]) &&
            files[selectedFile].length > 0 ? (
              files[selectedFile].map((topic, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-textColor2 p-2 rounded"
                  onClick={() => handleSidebarSelection(topic, index)}
                >
                  <span className="text-lg">Question {index + 1}</span>
                </li>
              ))
            ) : (
              <li className="text-textColor2">No topics available</li>
            )}
          </ul>
        </div>

        {/* Sidebar Mobile*/}
        <div
          className={` fixed block lg:hidden ${isOpen === false ? "-translate-x-[1000px] transition-transform duration-500" : "translate-x-0 transition-transform duration-500"} left-0 w-full md:w-64 bg-gray-800 text-white p-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-9rem)] LearnSidebar`}
        >
          <h2 className="text-xl font-bold mb-4 ml-4">{selectedFile} Topics</h2>
          <ul className="space-y-2">
            {Array.isArray(files[selectedFile]) &&
            files[selectedFile].length > 0 ? (
              files[selectedFile].map((topic, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-textColor2 p-2 rounded"
                  onClick={() => handleSidebarSelection(topic, index)}
                >
                  <span className="text-lg">Question {index + 1}</span>
                </li>
              ))
            ) : (
              <li className="text-textColor2">No topics available</li>
            )}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className=" lg:flex-1 p-8 ml-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-9rem)]">
          <h2 className="text-3xl font-bold mb-4">
            {selectedTopic.question || "No Question Selected"}
          </h2>
          <p className="text-lg mb-4">
            {selectedTopic.solution ? (
              <>
                {visibleAnswer === null ? (
                  <button
                    className="text-theme hover:underline"
                    onClick={() =>
                      toggleAnswerVisibility(selectedTopic.question)
                    }
                  >
                    Show Answer
                  </button>
                ) : (
                  <>
                    <pre className="bg-textColor1 text-Primary p-4 rounded-md overflow-x-auto">
                      <code>
                        {selectedTopic.solution ||
                          "// No code example available"}
                      </code>
                    </pre>
                    <button
                      className="text-theme hover:underline mt-2"
                      onClick={() => toggleAnswerVisibility(null)}
                    >
                      Hide Answer
                    </button>
                  </>
                )}
              </>
            ) : (
              "No Solution Available"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
