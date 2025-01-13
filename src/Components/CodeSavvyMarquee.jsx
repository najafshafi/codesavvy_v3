import React from "react";
import Marquee from "react-fast-marquee";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";

const CodeSavvyMarquee = () => {
  const icons = [
    FaHtml5,
    FaCss3Alt,
    FaJs,
    SiTailwindcss,
    SiMongodb,
    SiMysql,
    FaPython,
    FaReact,
    TbBrandNextjs,
  ];

  return (
    <Marquee
      className="font-semibold h-fit bg-white"
      autoFill="true"
      direction="right"
      speed={80}
    >
      {icons.map((Icon, index) => (
        <Icon
          key={index}
          className="size-16 lg:size-20 mx-4 my-7 p-2 bg-black text-white border border-black"
        />
      ))}
    </Marquee>
  );
};

export default CodeSavvyMarquee;
