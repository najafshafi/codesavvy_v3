import React from "react";
import { AiFillRobot } from "react-icons/ai";
import { AiFillWechat } from "react-icons/ai";
import { FaCode, FaHome } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const sidebarItems = [
  { icon: <FaUser />, label: "Settings", page: "SettingsPage" },
  { icon: <AiFillRobot />, label: "SavvyAI", page: "SavvyAIPage" },
  { icon: <AiFillWechat />, label: "Post Community", page: "PostPage" },
  { icon: <FaCode />, label: "Workspace", page: "WorkspacePage" },
  { icon: <MdQuiz />, label: "Quiz", page: "QuizPage" },
];

const Sidebar = ({ setPage, currentPage }) => {
  const handlePageSelect = (page) => {
    setPage(page); // Update the selected page
  };

  return (
    <div className="p-3 text-white space-y-10 mt-10">
      <div className="flex flex-col gap-3 xl:gap-5">
        
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`group cursor-pointer w-full rounded-md ${
              currentPage === item.page ? "bg-[#1691FF] text-white" : ""
            }`}
          >
            <button
              onClick={() => handlePageSelect(item.page)} // Update page on click
              className={`w-full flex gap-4 items-center p-2 rounded-md ${
                currentPage === item.page
                  ? "text-white bg-[#1691FF "
                  : "text-gray-700 group-hover:text-white group-hover:bg-[#1691FF] "
              }`}
            >
              <div
                className={` flex items-center justify-center w-8 h-8 rounded-full ${
                  currentPage === item.page
                    ? "bg-white !text-[#1691FF] "
                    : "bg-gray-700  text-white group-hover:bg-white group-hover:!text-[#1691FF] "
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`xl:text-lg font-semibold ${
                  currentPage === item.page
                    ? "text-white"
                    : "text-gray-700 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
