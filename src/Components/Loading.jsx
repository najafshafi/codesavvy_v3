import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gradColor1 to-gradColor2 flex items-center justify-center z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-48 w-48 md:h-56 md:w-56 lg:h-80 lg:w-80 flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="outer-ring rounded-full border-4 border-opacity-70 border-Primary h-full w-full animate-slow-spin"></div>

        {/* Inner glowing circle with logo */}
        <div className="absolute border-4 border-Primary rounded-full h-40 w-40 md:h-48 md:w-48 flex items-center justify-center z-10 glow">
          <div className="logoCircle text-center">
            <img
              src="/LogoLoading.svg"
              alt="Loading Logo"
              className="w-[250px] animate-logo p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
