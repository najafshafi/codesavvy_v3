import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import Features from "./Features";
import CodeSavvyMarquee from "./CodeSavvyMarquee";
import Lectures from "./Lectures";
import Workspace from "./Workspace";
// import Timer from "./Timer";

const Home = ({ user }) => {
  const sections = [
    {
      id: 1,
      title: "Color Picker",
      description: "CodeSavvy's color picker project",
      backgroundColor: "#F3ECEA",
      imageSrc: "./images/color.png",
      buttonText: "Color Picker",
      buttonLink: "/colorpicker",
      color1: " bg-[#ef81b2] ",
      color2: " bg-[#ec5a9f] ",
    },
    {
      id: 2,
      title: "Code Games",
      description: "Learn Coding concepts while playing games",
      backgroundColor: "#96D4D4",
      imageSrc: "./images/game.png",
      buttonText: "Play Games",
      buttonLink: "/coding-games",
      color1: " bg-[#3EB8BC] ",
      color2: " bg-[#35A0A4] ",
    },
  ];

  return (
    <div className="bg-[#F4F4F4]">
      <LandingPage />
      <CodeSavvyMarquee />
      <Features />
      <Workspace />

      <div className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center w-full xxxl:max-w-7xl">
          {sections.map((section) => (
            <div
              key={section.id}
              className="w-full lg:w-1/2 flex flex-col gap-7 px-4 py-7 md:py-10 justify-center items-center text-center"
              style={{
                backgroundColor: section.backgroundColor,
                fontFamily: "'Pacifico', cursive",
              }}
            >
              <h2 className="text-center text-3xl lg:text-4xl">
                {section.title}
              </h2>
              <p className="text-center">{section.description}</p>
              <img
                src={section.imageSrc}
                className="my-4 img-fluid"
                alt={section.title}
                style={{ height: "200px" }}
              />
              <div className="flex font-sans">
                <a href={section.buttonLink} className="group">
                  <button class="overflow-hidden relative w-56 p-2 h-12 bg-Third text-Primary border-none rounded-full text-base md:text-lg font-bold cursor-pointer z-10">
                    {section.buttonText}
                    <span class="absolute w-60 h-32 -top-8 -left-2 bg-Primary transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                    <span
                      class={`absolute w-60 h-32 -top-8 -left-2 ${section.color1} transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left`}
                    ></span>
                    <span
                      class={`absolute w-60 h-32 -top-8 -left-2 ${section.color2} transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left`}
                    ></span>
                    <span class="group-hover:!opacity-100 group-hover:duration-1000 duration-100 z-20 opacity-0 absolute top-[10px] left-14">
                      {section.buttonText}
                    </span>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Lectures />

      <Footer />
    </div>
  );
};

export default Home;
