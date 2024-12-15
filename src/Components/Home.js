import React from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import LandingPage from './LandingPage';
import Features from './Features';
import CodeSavvyMarquee from "./CodeSavvyMarquee";
import Lectures from "./Lectures";
import Workspace from './Workspace';
const Home = ({ user }) => {
  return (
    <div className="bg-[#F4F4F4]">
      <LandingPage />
      <CodeSavvyMarquee />
      <Features />
      <Workspace />

      <div className="container-fluid ">
        <div className="row"></div>

        <div className="conatiner-fluid">
          <div className="row">
            <div
              className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center"
              style={{ backgroundColor: "#F3ECEA" }}
            >
              <h1
                className="text-center text-dark my-5"
                style={{ fontSize: "2.8vw", fontFamily: "'Pacifico', cursive" }}
              >
                Color Picker
              </h1>
              <p
                className="text-center text-dark"
                style={{ fontSize: "1.0vw", fontFamily: "'Pacifico', cursive" }}
              >
                CodeSavvy's color picker project
              </p>
              <img
                src="./images/color.png"
                className="my-4 img-fluid"
                alt=""
                style={{ height: "200px" }}
              />
              <div className="d-flex justify-content-center">
                <Button
                  id="btn11"
                  className="text-center text-white mt-4 my-5"
                  style={{
                    width: "100%",
                    fontFamily: "'Kanit', sans-serif",
                    borderRadius: "30px",
                  }}
                  variant="dark"
                >
                  <Link to="/colorpicker">Color Picker</Link>
                </Button>
              </div>
            </div>
            <div
              className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center"
              style={{ backgroundColor: "#96D4D4" }}
            >
              <h1
                className="text-center my-5"
                style={{ fontSize: "2.8vw", fontFamily: "'Pacifico', cursive" }}
              >
                Code Game
              </h1>
              <p
                className="text-center"
                style={{ fontSize: "1.0vw", fontFamily: "'Pacifico', cursive" }}
              >
                Help the Lynx collect pine cones
              </p>
              <img
                src="./images/game.png"
                className="my-4 img-fluid"
                alt=""
                style={{ height: "200px" }}
              />
              <div className="d-flex justify-content-center">
                <Button
                  id="btn11"
                  className="text-center text-white mt-4 my-5"
                  style={{
                    width: "100%",
                    fontFamily: "'Kanit', sans-serif",
                    borderRadius: "30px",
                  }}
                  variant="dark"
                >
                  Learn More
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lectures />


      <Footer />
    </div>
  );
};

export default Home;
