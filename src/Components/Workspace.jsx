"use client";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Workspace = () => {
  return (
    <div className="relative flex justify-between items-center p-16 py-20 bg-white">
      <div className="w-[40%] h-fit">
        <Image
          className="shadow-2xl"
          src={"/Frame 4.png"}
          width={450}
          height={450}
          alt="Code"
        />
      </div>

      <div className="grid w-1/2 gap-10 justify-center h-fit px-16">
        <h1 className="text-5xl">Code, Collaborate, Create</h1>
        <p className="text-lg">
          Build, test, and refine projects seamlessly in a collaborative
          environment, empowering you to create, launch, and improve new
          campaigns without needing support from your product team.
        </p>
        {/* Button */}
        <button className="relative px-4 py-3 w-fit gap-5 bg-black text-white overflow-hidden flex justify-between items-center group uppercase animate-tilt-in-bottom-3">
          <Link to="/workspace">Try It Yourself</Link>
          <BsArrowUpRight className="xl:text-xl text-sm group-hover:animate-slideAndReset size:5 xl:size-6" />
        </button>
      </div>
    </div>
  );
};

export default Workspace;
