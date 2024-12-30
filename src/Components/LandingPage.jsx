import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";

const carouselData = [
  {
    id: 1,
    title: "Welcome to",
    subtitle: "CodeSavvy",
    description:
      "Empowering the next generation of innovators through inclusive computer science education.",
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
      "Enhance your coding skills with our engaging quizzes and hands-on exercises designed for all levels.",
    imgSrc: "/heroHome1.png",
    btnText: "Start Learning",
    btnLink: "/learning",
    // btnColor: "#3e324f",
    btnColor: "#3e324f",
  },
  {
    id: 3,
    title: "Meet",
    subtitle: "CodeSavvyAI",
    description:
      "Your personal AI assistant, dedicated to solving coding challenges and guiding you through complex problems.",
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
      <div className="w-full max-w-7xl lg:h-[calc(100vh-3rem)]">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={false}
          indicators={false}
        >
          {carouselData.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="flex h-screen justify-between p-10">
                <div className="flex flex-col gap-10 w-[45%] justify-center">
                  <h1 className="text-3xl md:text-5xl">
                    {item.title}{" "}
                    <span className=" font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                      {item.subtitle}
                    </span>
                  </h1>
                  <p className="text-base md:text-lg">{item.description}</p>
                  <div className="flex gap-3">
                    <a href={item.btnLink}>
                      <button
                        id="herobtn"
                        className="relative px-4 py-3 w-fit text-white overflow-hidden flex justify-between items-center uppercase hover:scale-110 transition-all duration-300 ease-in-out"
                        style={{ backgroundColor: item.btnColor }}
                      >
                        <span
                          className={`flex items-center justify-between gap-5`}
                        >
                          {item.btnText}

                          <BsArrowUpRight className="xl:text-xl text-sm" />
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
                <div className="grid items-center justify-center">
                  <Image
                    src={item.imgSrc}
                    width={500}
                    height={500}
                    // style={{ width: "500px", height: "auto" }}
                    style={{ height: "500px", width: "auto" }}
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
