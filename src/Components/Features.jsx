"use client";
import { useState, useEffect } from "react";
import { IoIosDesktop } from "react-icons/io";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";

// Feature details array
const features = [
  {
    id: 1,
    title: "Learning",
    description: `Access a wide range of learning materials to enhance your skills.`,
    image: <IoBookOutline size={40} />,
  },
  {
    id: 2,
    title: "Exercises",
    description: `Practice with interactive exercises and challenges to improve your understanding.`,
    image: <IoExtensionPuzzleOutline size={40} />,
  },
  {
    id: 3,
    title: "Workspace",
    description: `Collaborate and work on projects in a flexible, interactive workspace.`,
    image: <IoIosDesktop size={40} />,
  },
];

// Main Component
export default function Features() {
  const [visibleCard, setVisibleCard] = useState(1);

  // Automatically change the visible card every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCard((prev) => (prev === features.length ? 1 : prev + 1));
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Reorder features array so that the selected card comes first
  const reorderedFeatures = [
    ...features.filter((feature) => feature.id === visibleCard),
    ...features.filter((feature) => feature.id !== visibleCard),
  ];

  return (
    <div className="flex items-center justify-center ">
      <div className="relative max-w-7xl flex flex-col items-center justify-between lg:flex-row overflow-x-hidden px-8 md:px-16 py-16 gap-12">
        {/* Header, Description, and Buttons */}
        <div className="sm:w-full md:w-2/3 lg:w-2/5 space-y-5 lg:text-left smd:text-center sm:text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Our Features Special For You
          </h2>
          <p className="text-gray-600 text-base smd:text-lg">
            Explore our unique features by clicking on the buttons below.
          </p>
          <div className="flex space-x-3 justify-center lg:justify-start">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setVisibleCard(feature.id)}
                className={`w-12 h-2 rounded-lg transition-colors duration-200 ${
                  visibleCard === feature.id ? "bg-theme" : "bg-textColor2"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex lg:w-2/3 translate-x-64 smd:translate-x-48 space-x-6 overflow-visible">
          {reorderedFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col gap-7 items-start justify-center p-5 w-60 h-72 md:w-72 md:h-72 text-2xl rounded-xl font-bold transition-transform duration-300 ${
                index === 0
                  ? "transform scale-110 shadow-md shadow-theme bg-Primary border-2 text-textColor2 border-theme"
                  : "opacity-70 bg-Primary filter grayscale text-textColor2"
              }`}
            >
              <span className="text-4xl">{feature.image}</span>
              <h2 className="text-3xl">{feature.title}</h2>
              <span className="text-sm">{feature.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
