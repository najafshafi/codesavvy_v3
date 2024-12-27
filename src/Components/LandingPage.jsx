import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { BsArrowUpRight } from "react-icons/bs";

const carouselData = [
  {
    id: 1,
    title: "Welcome to CodeSavvy",
    description:
      "Empowering the next generation of innovators through inclusive computer science education.",
    imgSrc: "/heroHome1.png",
    btnText: "Get Started",
    btnLink: "#marquee",
    btnColor: "#3e324f",
  },
  {
    id: 2,
    title: "Interactive Quizzes and Exercises",
    description:
      "Enhance your coding skills with our engaging quizzes and hands-on exercises designed for all levels.",
    imgSrc: "/heroHome4.svg",
    btnText: "Start Learning",
    btnLink: "/learning",
    btnColor: "#52c254",
  },
  {
    id: 3,
    title: "Meet CodeSavvyAI",
    description:
      "Your personal AI assistant, dedicated to solving coding challenges and guiding you through complex problems.",
    imgSrc: "/heroHome8.png",
    btnText: "Ask CodeSavvy AI",
    btnLink: "http://localhost:5173",
    btnColor: "#3c67c0",
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
    }, 5000); // Auto-scroll every 5 seconds

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
                  <h1 className="text-5xl">{item.title}</h1>
                  <p className="text-lg">{item.description}</p>
                  <div className="flex gap-3">
                    <a href={item.btnLink}>
                      <button
                        id="herobtn"
                        className="relative px-4 py-3 w-fit gap-5 text-nowrap text-white overflow-hidden flex justify-between items-center group uppercase"
                        style={{ backgroundColor: item.btnColor }}
                      >
                        <span className="group-hover:text-black">
                          {item.btnText}
                        </span>
                        <BsArrowUpRight className="xl:text-xl text-sm size-5 xl:size-6" />
                      </button>
                    </a>
                  </div>
                </div>
                <div className="grid items-center justify-center">
                  <Image
                    src={item.imgSrc}
                    width={500}
                    height={500}
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
