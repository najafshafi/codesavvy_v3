import React, { useState, useEffect } from "react";
import Loading from "../../Components/Loading"; // Your loading component
import "./pagess.css";
import { PiGameControllerFill } from "react-icons/pi";
import { IoLogoGameControllerA } from "react-icons/io";
import { GiRetroController } from "react-icons/gi";

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
      {/* <div className="w-full hidden md:block">
        <img
          src="./3.svg"
          alt="Coding Games"
          loading="lazy"
          className="h-auto w-full object-cover"
        />
      </div> */}

      <div className="relative bg-Primary h-[60vh] overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Title and Subtitle */}
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gradColor1 via-gradColor2 to-gradColor3 text-transparent bg-clip-text">
            CODE GAMES
          </h1>

          <p className="text-xl md:text-2xl font-medium text-textColor2 mt-4">
            &lt;Play&gt;&lt;Code&gt;&lt;Master&gt;
          </p>
        </div>

        {/* Left Controller */}
        <PiGameControllerFill
          className="text-gradColor3 absolute rotate-[315deg] size-11/12 bottom-0 left-0 w-fit"
          aria-hidden="true"
        />
        {/* Right Controller */}
        <IoLogoGameControllerA
          className="text-gradColor2 absolute rotate-45 size-9/12 -bottom-24 right-48 w-fit"
          aria-hidden="true"
        />

        <GiRetroController
          className="text-gradColor1 absolute rotate-45 size-9/12 -top-10 right-32 w-fit"
          aria-hidden="true"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-screen absolute -bottom-20 hidden md:block"
        >
          <path
            fill="#F4F4F4"
            fill-opacity="1"
            d="M0,192L80,208C160,224,320,256,480,250.7C640,245,800,203,960,192C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col justify-center items-center p-3">
        <h2 className="text-4xl uppercase m-5">
          <span className="font-bold bg-gradient-to-r from-graddColor1 to-gradColor2 bg-clip-text text-transparent">
            All Games
          </span>
        </h2>

        {/* Grid Section */}
        <div className="relative flex flex-wrap content-center items-center justify-center ">
          {codegames.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col border-1 border-theme w-72 md:w-80 rounded-xl bg-Primary text-textColor2 shadow-md mx-4 my-14 group transform transition-transform duration-500 hover:scale-95"
            >
              {/* Image Section with Zoom Effect */}
              <div className="relative mx-4 -mt-10 h-40 overflow-hidden rounded-xl border-2 border-textColor1">
                <img
                  src={item.imgurl}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold leading-snug text-textColor1">
                  {item.name}
                </h5>
                <p className="text-base font-light leading-relaxed text-textColor1">
                  {item.description}
                </p>
              </div>

              {/* Button Section */}
              <div className="p-6 pt-0 flex justify-center">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button class="w-[200px] bg-Primary text-theme hover:text-Primary border-1 border-theme h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-gradColor1 before:to-gradColor2 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0">
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
