import React from "react";
import { Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="w-full lg:h-[calc(100vh-3rem)] bg-gray-100">
        <div
          className="flex bg-cover bg-no-repeat bg-center h-screen justify-between p-10 z-30 "
          style={{ backgroundImage: 'url("/heroBackground.png")' }}
        >
          <div className="flex flex-col gap-10 w-[40%] justify-center">
            <h1 className="text-5xl">
              Improve your skills by study with coding{" "}
            </h1>
            <p className="text-lg">
              Create, launch, and iterate on new marketing campaigns without
              distracting your product team.
            </p>
            {/* Button */}
            <div className="flex gap-3">
              <a href="#marquee">
                <button className="relative px-4 py-3 w-fit gap-5 text-nowrap bg-black text-white overflow-hidden flex justify-between items-center group uppercase">
                  Get Started
                  <BsArrowUpRight className="xl:text-xl text-sm group-hover:animate-slideAndReset size:5 xl:size-6" />
                </button>
              </a>
              <a href="http://localhost:5173">
                <button className="relative px-4 py-3 w-fit gap-5 text-nowrap bg-green-700 text-white overflow-hidden flex justify-between items-center group uppercase">
                  Ask SavvyAI
                  <BsArrowUpRight className="xl:text-xl text-sm group-hover:animate-slideAndReset size:5 xl:size-6" />
                </button>
              </a>
            </div>
          </div>

          <div className="grid items-center justify-center">
            <Image
              src={"/heroHome.png"}
              width={550}
              height={500}
              style={{ height: "auto", width: "full" }}
              alt="LogoBg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
