import React from "react";
import { Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className="relative flex justify-between">
      <div className="flex flex-col gap-10 w-[35%] justify-center px-16 h-screen">
        <h1 className="text-5xl">Improve your skills by study with coding </h1>
        <p className="text-lg">
          Create, launch, and iterate on new marketing campaigns without
          distracting your product team.
        </p>
        {/* Button */}
        <div className="flex gap-3">
          <button className="relative px-4 py-3 w-fit gap-5 bg-black text-white overflow-hidden flex justify-between items-center group uppercase animate-tilt-in-bottom-3">
            Get Started
            <BsArrowUpRight className=" xl:text-xl text-sm group-hover:animate-slideAndReset size:5 xl:size-6" />
          </button>
          <a href="http://localhost:5173">
            <button className="relative px-4 py-3 w-fit gap-5 bg-success text-white overflow-hidden flex justify-between items-center group uppercase animate-tilt-in-bottom-3">
              Ask SavvyAI
              <BsArrowUpRight className=" xl:text-xl text-sm group-hover:animate-slideAndReset size:5 xl:size-6" />
            </button>
          </a>
        </div>
      </div>

      <div className="grid justify-center">
        <Image
          src={"/Frame 1 (2).png"}
          width={0}
          height={0}
          sizes="500px"
          style={{ height: "100vh", width: "auto" }}
          alt="LogoBg"
        />

        <Image
          className="absolute bg-white rounded-md shadow-2xl right-[30vw] top-[30vh]"
          src={"/Frame 3.png"}
          width={450}
          height={450}
          alt="code"
        />
      </div>
    </div>
  );
};

export default LandingPage;
