import React from "react";
import { Image } from "react-bootstrap";
import { BsSoundwave } from "react-icons/bs";
import { IoLogoGitlab } from "react-icons/io5";

const Lectures = () => {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="relative flex flex-col-reverse justify-between lg:flex-row max-w-7xl gap-10 px-6 sm:px-10 lg:px-16 py-10 lg:py-16">
        {/* Text Section */}
        <div className="flex flex-col justify-evenly gap-8 w-full md:w-[75%] lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold lg:text-left">
            Get up and running fast together
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* University Section */}
            <div className="flex flex-col lg:w-2/3 items-center lg:items-start space-y-4">
              <BsSoundwave className="text-theme text-3xl" />
              <h3 className="text-xl font-semibold">University</h3>
              <p className="text-sm sm:text-base text-justify">
                Browse hundreds of in-depth courses, and guides to get up and
                running fast.
              </p>
            </div>

            {/* Showcase Section */}
            <div className="flex flex-col lg:w-2/3 items-center lg:items-start space-y-4">
              <IoLogoGitlab className="text-theme text-3xl" />
              <h3 className="text-xl font-semibold">Showcase</h3>
              <p className="text-sm sm:text-base text-justify">
                Get inspired by the incredible websites built by members of the
                community.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center w-full lg:w-[45%]">
          <Image
            src="/heroHome2.png"
            width={450}
            height={450}
            className="rounded-lg w-[500px] h-auto"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Lectures;
