"use client";
import React, { useState } from "react";
import Angular from "./AngularJS.json";
import Appml from "./APPML.json";
import Asp from "./ASP.json";
import Bootstrap from "./Bootstrap.json";
import Cp from "./C++.json";
import Canvas from "./Canvas.json";
import Css from "./CSS.json";
import DataScience from "./DataScience.json";
import Git from "./Git.json";
import Go from "./Go.json";
import Html from "./HTML.json";
import Java from "./Java.json";
import Javascript from "./Javascript.json";
import Json from "./JSON.json";
import Jquery from "./jQuery.json";
import Kotlin from "./Kotlin.json";
import Matlab from "./MatlabPilot.json";
import Mongo from "./MongoDB.json";
import Mysql from "./MySQL.json";
import Nodejs from "./NodeJS.json";
import Numpy from "./NumPy.json";
import Php from "./PHP.json";
import PostgreSQL from "./PostgreSQL.json";
import Python from "./Python.json";
import R from "./R.json";
import Rasberry from "./RasberryPi.json";
import ReactJSON from "./React.json";
import Rwd from "./RWD.json";
import Sass from "./Sass.json";
import Scipy from "./SciPy.json";
import Sidjango from "./SiDjango.json";
import TailwindCSS from "./TailwindCSS.json";
import Typescript from "./Typescript.json";
import Vue from "./Vue.json";
import XML from "./XML.json";
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
  Git,
  Go,
  Java,
  Javascript,
  Json,
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
  const [selectedFile, setSelectedFile] = useState("Angular"); // Default to Angular file
  const [selectedTopic, setSelectedTopic] = useState(
    Array.isArray(files[selectedFile]) ? files[selectedFile][0] : {} // Default to first topic or empty object
  );

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleFileSelection = (fileName) => {
    setSelectedFile(fileName);
    setSelectedTopic(Array.isArray(files[fileName]) ? files[fileName][0] : {});
  };

  const handleSidebarSelection = (title) => {
    const topic = Array.isArray(files[selectedFile])
      ? files[selectedFile].find((item) => item.title === title)
      : null;
    setSelectedTopic(topic || {});
  };

  return (
    <div className="relative flex flex-col border-8 border-gray-800 bg-[#f4f4f4] overflow-hidden">
      {/* Top Bar */}
      <div className="bg-gray-800 h-[4rem] text-white p-3 flex justify-start space-x-2 overflow-x-auto LearnTopbar">
        {Object.keys(files)
          .slice(0, 50)
          .map((fileName) => (
            <button
              key={fileName}
              onClick={() => handleFileSelection(fileName)}
              className={`px-4 py-1 rounded  ${
                fileName === selectedFile ? "bg-[#1691FF]" : "bg-gray-500"
              }`}
            >
              {fileName}
            </button>
          ))}
      </div>

      <div className="lg:hidden bg-gray-800 h-full absolute top-14 z-40 left-0 w-5 md:w-8 text-lg text-white flex items-center justify-center">
        <button
          onClick={handleMenuOpen}
          className="focus:outline-none shadow-lg"
        >
          <IoMdArrowDropright
            className={`size-7 md:size-10 text-white transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Desktop */}
        <div
          className={`hidden lg:block left-0 w-full md:w-64 bg-gray-800 text-white p-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-9rem)] LearnSidebar`}
        >
          <h2 className="text-xl font-bold mb-4">{selectedFile} Topics</h2>
          <ul className="space-y-2">
            {Array.isArray(files[selectedFile]) &&
            files[selectedFile].length > 0 ? (
              files[selectedFile].map((topic) => (
                <li
                  key={topic.title}
                  className="cursor-pointer hover:bg-gray-600 p-2 rounded"
                  onClick={() => handleSidebarSelection(topic.title)}
                >
                  {topic.title}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No topics available</li>
            )}
          </ul>
        </div>

        {/* Sidebar Mobile */}
        <div
          className={` fixed block lg:hidden ${isOpen === false ? "-translate-x-[1000px] transition-transform duration-500" : "translate-x-0 transition-transform duration-500"} left-0 w-full md:w-64 bg-gray-800 text-white p-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-9rem)] LearnSidebar`}
        >
          <h2 className="text-xl font-bold mb-4 ml-4">{selectedFile} Topics</h2>
          <ul className="space-y-2">
            {Array.isArray(files[selectedFile]) &&
            files[selectedFile].length > 0 ? (
              files[selectedFile].map((topic) => (
                <li
                  key={topic.title}
                  className="cursor-pointer hover:bg-gray-600 p-2 rounded"
                  onClick={() => handleSidebarSelection(topic.title)}
                >
                  {topic.title}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No topics available</li>
            )}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className=" lg:flex-1 p-8 ml-4 overflow-y-scroll h-[calc(100vh-9rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-10rem)]">
          <h2 className="text-3xl font-bold mb-4">
            {selectedTopic.title || "No Title"}
          </h2>
          <p className="text-lg mb-4">
            {selectedTopic.content || "No Content Available"}
          </p>
          <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto LearnSidebar">
            <code>
              {selectedTopic.code_example || "// No code example available"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Page;
