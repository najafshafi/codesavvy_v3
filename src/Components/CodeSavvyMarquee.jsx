import React from "react";
import { Image } from "react-bootstrap";
import Marquee from "react-fast-marquee";

const CodeSavvyMarquee = () => {
  return (
    <div className="flex flex-col items-center justify-center self-center py-10 text-[#DDF345] bg-white" id="marquee">
      <Marquee
        className="text-5xl font-semibold h-28"
        autoFill="true"
        direction="right"
        speed={80}
      >
        <Image
          className="mx-5"
          src={"/codesavvy.png"}
          width={198}
          height={106}
          alt="Logo"
        />
      </Marquee>
    </div>
  );
};

export default CodeSavvyMarquee;
