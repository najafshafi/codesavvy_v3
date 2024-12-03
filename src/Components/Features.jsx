"use client";
import { useState } from "react";
import { IoIosDesktop } from "react-icons/io";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";


// Feature details array
const features = [
  {
    id: 1,
    title: "Learning",
    description: `Access a wide range of learning materials to enhance your skills.`,
    image: <IoBookOutline size={40}/>,
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

// Card component
function FeatureCard({ id, title, description, image, isActive }) {
  return (
    <div
      className={`flex flex-col gap-5 items-start justify-center p-5 w-72 h-72 text-2xl rounded-xl font-bold transition-transform duration-300 ${
        isActive
          ? "transform scale-110 shadow-md shadow-[#DDF345] bg-white border-2 text-gray-600 border-[#DDF345]"
          : "opacity-70 bg-white filter grayscale text-gray-600"
      }`}
    >
      <span className="text-4xl">{image}</span>
      <h2 className="text-3xl">
        {id}. {title} {/* Added spacing and formatting for id and title */}
      </h2>
      <span className="text-sm">{description}</span>
    </div>
  );
}

export default function Features() {
  // State to track which card is highlighted
  const [visibleCard, setVisibleCard] = useState(1);

  // Reorder features array so that the selected card comes first
  const reorderedFeatures = [
    ...features.filter((feature) => feature.id === visibleCard),
    ...features.filter((feature) => feature.id !== visibleCard),
  ];

  return (
    <div className="relative flex flex-col py-20 md:flex-row items-center justify-between space-y-4 md:space-y-0 overflow-x-hidden">
      {/* First Div: Header, Description, and Buttons */}
      <div className="w-[40%] space-y-10 p-16">
        <h1 className="text-5xl">Our Features Special For You</h1>
        <p className="text-gray-600 text-lg">
          Explore our unique features by clicking on the buttons below.
        </p>
        {/* Buttons to control which card is highlighted */}
        <div className="flex space-x-4">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setVisibleCard(feature.id)}
              className={`px-7 py-1 rounded-full transition-colors duration-200 ${
                visibleCard === feature.id ? "bg-[#DDF345]" : "bg-gray-200"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Second Div: Cards */}
      <div className="absolute -right-[20vw] w-[70%] flex space-x-10 p-16 overflow-visible">
        {reorderedFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            id={feature.id}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            isActive={visibleCard === feature.id}
          />
        ))}
      </div>
    </div>
  );
}
