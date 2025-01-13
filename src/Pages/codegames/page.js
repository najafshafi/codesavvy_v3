import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading"; // Your loading component
import "./pagess.css";

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a function to handle image load completion
    const handleLoad = () => {
      setLoading(false); // Set loading to false after everything is loaded
    };

    // Load all images and wait for them to finish loading
    const images = document.querySelectorAll("img");
    let loadedImagesCount = 0;

    const imageLoadHandler = () => {
      loadedImagesCount++;
      if (loadedImagesCount === images.length) {
        handleLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        imageLoadHandler();
      } else {
        img.addEventListener("load", imageLoadHandler);
      }
    });

    // Cleanup event listeners when component unmounts
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", imageLoadHandler);
      });
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const codegames = [
    {
      id: 1,
      name: "Css Grid Garden",
      description: "Solve puzzles to learn CSS Grid and grow your garden.",
      imgurl: "https://cssgridgarden.com/images/screenshot.png",
      url: "https://cssgridgarden.com/",
    },
    {
      id: 2,
      name: "Flexbox Froggy",
      description:
        "Guide frogs using CSS Flexbox properties in a fun, interactive game.",
      imgurl: "https://flexboxfroggy.com/images/screenshot.png",
      url: "https://flexboxfroggy.com/",
    },
    {
      id: 3,
      name: "Flukeout",
      description:
        "Master CSS selectors through fun and challenging interactive levels.",
      imgurl: "/Flukeoutss.png",
      url: "https://flukeout.github.io/",
    },
    {
      id: 4,
      name: "Blockly",
      description:
        "Learn programming concepts with fun, block-based coding games.",
      imgurl: "/Blocklysss.png",
      url: "https://blockly.games/?lang=en",
    },
    {
      id: 5,
      name: "RodoCodo",
      description: "Engaging coding game teaching kids programming basics.",
      imgurl: "/rodocodoss.png",
      url: "https://game.rodocodo.com/hour-of-code/",
    },
    {
      id: 6,
      name: "Scratch",
      description:
        "Create interactive games, animations, & stories with programming blocks.",
      imgurl: "/Sratchscreenshot.png",
      url: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted",
    },
    {
      id: 7,
      name: "Tynker",
      description:
        "Learn coding with creative activities that build problem-solving skills.",
      imgurl: "/Tynkerss.png",
      url: "https://www.tynker.com/dashboard/student/?obd=1",
    },
    {
      id: 8,
      name: "Code Combat",
      description:
        "Solve puzzles & coding languages through programming quests.",
      imgurl: "/CloseCombatss.png",
      url: "https://codecombat.com/play",
    },
  ];

  return (
    <main className="bg-[#F4F4F4]">
      {/* Header Section */}
      <div className="w-full hidden md:block">
        <img
          src="./3.svg"
          alt="Coding Games"
          loading="lazy"
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="w-full block md:hidden">
        <img
          src="./3.svg"
          alt="Coding Games"
          loading="lazy"
          className="h-[300px] sm:h-auto w-full object-cover object-right"
        />
      </div>

      <div className="flex flex-col justify-center items-center p-3">
        <h2 className="text-4xl uppercase m-5">
          <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            All Games
          </span>
        </h2>

        {/* Grid Section */}
        <div className="relative flex flex-wrap content-center items-center justify-center ">
          {codegames.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col border-1 border-blue-500 w-72 md:w-80 rounded-xl bg-white text-gray-700 shadow-md mx-4 my-14 group transform transition-transform duration-500 hover:scale-95"
            >
              {/* Image Section with Zoom Effect */}
              <div className="relative mx-4 -mt-10 h-40 overflow-hidden rounded-xl border-2 border-black">
                <img
                  src={item.imgurl}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold leading-snug text-blue-gray-900">
                  {item.name}
                </h5>
                <p className="text-base font-light leading-relaxed text-inherit">
                  {item.description}
                </p>
              </div>

              {/* Button Section */}
              <div className="p-6 pt-0 flex justify-center">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button class="w-[200px] bg-white text-blue-500 hover:text-white border-1 border-blue-500 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-300 before:to-blue-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0">
                    Play Game
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
