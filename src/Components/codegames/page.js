import React from "react";
import "./pagess.css";
const Page = () => {
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
    <main className="ggame">
      {/* Header Section */}
      <div className="w-full">
        {/* <img
          // src="./1.png"
          src="./3.png"
          // src="./5.png"
          // src="./7.png"
          alt="Coding Games"
          className="h-auto w-full object-cover"
        /> */}
      </div>

      <div className="flex flex-col justify-center items-center p-3">
        {/* <img
        // src="./1.png"
        src="./3.png"
        // src="./5.png"
        // src="./7.png"
        alt="Coding Games"
        className="h-auto w-82 object-cover"
        style={{ width: "0rem;" }}
      /> */}
        {/* <img
          // src="./1.png"
          src="./3.png"
          // src="./5.png"
          // src="./7.png"
          alt="Coding Games"
          className="h-auto w-82 object-cover"
          style={{ width: "50rem" }} // Correctly set the width
        /> */}

        <h2 className="text-4xl uppercase m-5">

          <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            All{" "}  Games
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
                <button
                  className=" px-4 py-2 border-2 rounded-lg border-[#128FFF] text-[#128FFF]"
                  as="button"
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Play Game
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
