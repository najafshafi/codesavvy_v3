"use client";
import React from "react";
import { Image } from "react-bootstrap";

const Workspace = () => {
  return (
    <div className="flex justify-center items-center bg-white overflow-x-hidden">
      <div className="relative max-w-7xl gap-10 flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-16 ">
        {/* Left Section (Image) */}
        <div className="w-full md:w-[45%] lg:w-1/2 h-auto flex justify-center lg:justify-start">
          <Image
            src={"/Frame 4.png"}
            width={450}
            height={450}
            className="shadow-2xl rounded-lg w-[300px] lg:w-[500px] h-auto"
            alt="Code"
          />
        </div>

        {/* Right Section (Text + Button) */}
        <div className="flex flex-col w-full smd:w-[75%] md:w-[45%] lg:w-1/2 gap-7 justify-center h-auto px-4 sm:px-8 lg:px-12 sm:text-center lg:text-left">
          <h2 className="text-2xl smd:text-3xl lg:text-4xl font-bold text-nowrap">
            Code, Execute, Excel
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-textColor2 text-justify lg:text-left">
            Build, test, and refine projects seamlessly in a collaborative
            environment, empowering you to create, launch, and improve new
            campaigns without needing support from your product team.
          </p>
          {/* Button */}
          <a href="/workspace">
            <button
              type="submit"
              class="flex smd:mx-auto md:mx-0 lg:mx-0 w-fit md:w-[250px] lg:w-fit sm:justify-start md:justify-evenly gap-2 items-center shadow-xl text-lg text-theme backdrop-blur-md lg:font-semibold isolation-auto border-theme before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-theme hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              <span>Try it Yourself</span>
              <svg
                class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-theme bg-theme ease-linear duration-300 rounded-full border border-theme group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  class="fill-white group-hover:fill-theme"
                ></path>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
