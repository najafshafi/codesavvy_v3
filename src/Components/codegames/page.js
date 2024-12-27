import React from "react";

const page = () => {
  return (
    <main className="relative flex flex-col bg-[#f4f4f4]">
      <div className="w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <img
            src="./1.svg"
            alt="Coding Games"
            width={0}
            height={0}
            sizes="max-width: 2000px) 100vw, 2000px"
            className="h-auto w-screen"
          />
        </div>
      </div>
    </main>
  );
};

export default page;
