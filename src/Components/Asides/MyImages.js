import React from "react";
import "./MyImages.css";
const MyImages = ({ onButtonClick }) => {
  return (
    <div>
      <div className="Image_Container">
        <button onClick={() => onButtonClick("buttons")} className="btns">
          Show Buttons
        </button>

        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>

        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>

        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>
        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>
        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>
        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>
        <img
          className="MyImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQUotqS4mTqYYxoPafmN2icqD5CWKhhP7vvSNWsWPBg&s"
          alt="A cup"
        ></img>
      </div>
    </div>
  );
};

export default MyImages;
