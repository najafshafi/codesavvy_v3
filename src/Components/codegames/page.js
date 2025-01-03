import React, { useState, useEffect } from "react";
import Loading from "../Loading"; // Your loading component
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
      description:
        "Engaging coding game teaching kids programming basics through simple challenges.",
      imgurl: "/rodocodoss.png",
      url: "https://game.rodocodo.com/hour-of-code/",
    },
    {
      id: 6,
      name: "Scratch",
      description:
        "Create interactive games, animations, and stories with visual programming blocks.",
      imgurl: "/Sratchscreenshot.png",
      url: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted",
    },
    {
      id: 7,
      name: "Tynker",
      description:
        "Learn coding with creative activities that build programming and problem-solving skills.",
      imgurl: "/Tynkerss.png",
      url: "https://www.tynker.com/dashboard/student/?obd=1",
    },
    {
      id: 8,
      name: "Code Combat",
      description:
        "Solve puzzles and learn coding languages through adventurous programming quests.",
      imgurl: "/CloseCombatss.png",
      url: "https://codecombat.com/play",
    },
  ];

  return (
    <main className="">
      {/* Header Section */}
      <div className="w-full">
        <img
          src="./3.svg"
          alt="Coding Games"
          loading="lazy"
          className="h-auto w-full object-cover"
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
              style={{ boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)" }}
              className="flex flex-col bg-white w-[300px] h-[350px] justify-between m-4 rounded-lg border border-[#ddd] overflow-hidden text-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.imgurl}
                alt={item.name}
                className="w-full h-[150px] object-cover"
              />
              <div className="flex flex-col gap-1 p-3">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 border-2 rounded-lg border-[#128FFF] text-[#128FFF] text-center"
                >
                  Play Game
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
