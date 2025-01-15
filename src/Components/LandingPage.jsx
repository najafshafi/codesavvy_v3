import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";

const carouselData = [
  {
    id: 1,
    title: "Welcome to",
    subtitle: "CodeSavvy",
    description:
      "CodeSavvy is here to help you learn coding in a fun and easy way. Whether you're just starting out or already know a bit, we’ll guide you step by step. It’s a place where everyone can learn and become a future innovator!",
    imgSrc: "/heroHome4.svg",
    btnText: "Get Started",
    btnLink: "#marquee",
    btnColor: "#3e324f",
  },
  {
    id: 2,
    title: "Interactive",
    subtitle: "Quizzes and Exercises",
    description:
      "Learn coding by trying out fun quizzes and exercises that make learning exciting. Practice what you learn and build your skills at your own pace. No matter how much you know, you can always improve with CodeSavvy!",
    imgSrc: "/heroHome1.png",
    btnText: "Start Learning",
    btnLink: "/learning",
    btnColor: "#3e324f",
  },
  {
    id: 3,
    title: "Meet",
    subtitle: "CodeSavvyAI",
    description:
      "CodeSavvyAI is your very own helper to make coding easier. Got stuck on a problem? Just ask! It’s like having a teacher who is always there to explain, solve problems, and guide you through tricky tasks.",
    imgSrc: "/heroHome8.png",
    btnText: "Ask CodeSavvy AI",
    btnLink: "http://localhost:5173",
    btnColor: "#3e324f",
  },
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex items-center justify-center overflow-hidden bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: 'url("/heroBackground.png")' }}
    >
      <div className="w-full max-w-7xl lg:h-[calc(100vh-3rem)] xxxl:h-[45vh]">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={false}
          indicators={false}
        >
          {carouselData.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="flex h-screen xxxl:h-[45vh] justify-between p-10">
                {/* TEXT */}
                <div className="flex flex-col gap-4 md:gap-7 lg:gap-10 smd:w-[75%] md:w-[45%] justify-center">
                  <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                    {item.title}{" "}
                    <span className=" font-bold bg-gradient-to-r from-gradColor3 to-gradColor1 bg-clip-text text-transparent">
                      {item.subtitle}
                    </span>
                  </h1>
                  <p className="text-base md:text-lg">{item.description}</p>
                  <div className="flex gap-3">
                    <a href={item.btnLink} className="group">
                      <button class="overflow-hidden relative w-56 p-2 h-12 bg-Third text-Primary border-none rounded-md text-base md:text-lg font-bold cursor-pointer z-10">
                        {item.btnText}
                        <span class="absolute w-60 h-32 -top-8 -left-2 bg-Primary transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                        <span class="absolute w-60 h-32 -top-8 -left-2 bg-gradColor2 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                        <span class="absolute w-60 h-32 -top-8 -left-2 bg-gradColor1 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                        <span class="group-hover:!opacity-100 group-hover:duration-1000 duration-100 z-20 opacity-0 absolute top-[10px] left-10">
                          {item.btnText}
                        </span>
                      </button>
                    </a>
                  </div>
                </div>

                {/* IMAGE */}
                <div className="items-center justify-center md:w-[45%] lg:w-1/2 md:grid hidden w-1/2">
                  <Image
                    src={item.imgSrc}
                    width={500}
                    height={500}
                    className="md:w-[370px] lg:w-[500px] h-auto"
                    alt="Carousel Item"
                  />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LandingPage;
