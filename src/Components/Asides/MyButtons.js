import React from "react";
import "./MyButtons.css";
const My_Buttons = ({ onButtonClick }) => {
  function handle() {
    onButtonClick("images");
  }
  return (
    <div className="MainContainer">
      <button onClick={handle} className="mybutton">
        Show Images
      </button>
      <button className="mybutton">Hello</button>
      <button className="mybutton">Hello</button>
      <button className="mybutton">Hello</button>
      <button className="mybutton">Hello</button>{" "}
      <button className="mybutton">Hello</button>
      <button className="mybutton">Hello</button>
      <button className="mybutton">Hello</button>
    </div>
  );
};

export default My_Buttons;
