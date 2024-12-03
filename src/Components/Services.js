import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./Services.css";
import { PiSparkleDuotone } from "react-icons/pi";
import { BsDiscord } from "react-icons/bs";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const Services = () => {
  return (
    <div className="container-fluid" id="cont">
      <div className="d-flex justify-content-end">
        <Link className="_l1" to="/">
          <h2 className="text-white my-5">X</h2>
        </Link>
      </div>
      <div className="container">
        <h2 className="my-5" style={{ color: "#FFF4A3", fontWeight: "bold" }}>
          All our services
        </h2>
        <p style={{ fontSize: "15px", color: "#fff" }}>
          CodeSavvy offers a wide range of services and products for beginners
          and professionals,
          <br />
          helping millions of people everyday to learn and master new skills.
        </p>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Free Tutorials
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Enjoy our free tutorials like millions of other internet users
                  since 1999
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  References
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Explore our selection of references covering all popular
                  coding languages
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Create a Website
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Create your own website with{" "}
                  <strong style={{ fontSize: "15px" }}>
                    W3Schools Spaces-
                  </strong>
                  no required setup
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Exercises
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Test your skills with different exercises
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Quizzes
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Enjoy our free tutorials like millions of other internet users
                  since 1999
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "20px",
                        color: "#FFF4A3",
                        fontWeight: "bold",
                      }}
                    >
                      Get Certified
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Kanit', sans-serif",
                        color: "#fff",
                      }}
                    >
                      Document Your Knowledge
                    </Card.Title>
                  </div>
                  <span style={{ fontSize: "25px", color: " #9370DB" }}>
                    <PiSparkleDuotone />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Log in/Sign Up
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Create a free W3Schools account to improve your learning
                  skills
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  My Learning
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Track your learning progress at W3Schools and collect rewards
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "20px",
                        color: "#FFF4A3",
                        fontWeight: "bold",
                      }}
                    >
                      Upgrade
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Kanit', sans-serif",
                        color: "#fff",
                      }}
                    >
                      Become a PRO user and unlock powerful features (ad-free,
                      hosting, videos,..)
                    </Card.Title>
                  </div>
                  <span style={{ fontSize: "25px", color: " #9370DB" }}>
                    <PiSparkleDuotone />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Where to Start
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Not sure where you want to start? Follow our guided path
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Code Editor(Try It)
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  With our online code editor, you can edit code and view the
                  result in your browser
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "20px",
                        color: "#FFF4A3",
                        fontWeight: "bold",
                      }}
                    >
                      Bootcamps
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Kanit', sans-serif",
                        color: "#fff",
                      }}
                    >
                      Join one of our online bootcamps and learn from
                      experienced instructors
                    </Card.Title>
                  </div>
                  <span style={{ fontSize: "25px", color: " #9370DB" }}>
                    <PiSparkleDuotone />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Templates
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  We have created a bunch of responsive website templates you
                  can use - for free
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  How to
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Large collection of code snippets for HTML, CSS and JavaScript
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "20px",
                        color: "#FFF4A3",
                        fontWeight: "bold",
                      }}
                    >
                      Videos
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Kanit', sans-serif",
                        color: "#fff",
                      }}
                    >
                      Learn the basics of HTML in a fun and engaging video
                      tutorial
                    </Card.Title>
                  </div>
                  <span style={{ fontSize: "25px", color: " #9370DB" }}>
                    <PiSparkleDuotone />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  CSS framework
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Join one of our online bootcamps and learn from experienced
                  instructors
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Web hosting
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  host your own website and share it to the world with{" "}
                  <strong style={{ fontSize: "15px" }}>W3Schools Spaces</strong>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title
                      style={{
                        fontSize: "20px",
                        color: "#FFF4A3",
                        fontWeight: "bold",
                      }}
                    >
                      Create a server
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        fontFamily: "'Kanit', sans-serif",
                        color: "#fff",
                      }}
                    >
                      Create your own server using Python, PHP, React.js,
                      Node.js, Java, C#, etc.
                    </Card.Title>
                  </div>
                  <span style={{ fontSize: "25px", color: " #9370DB" }}>
                    <PiSparkleDuotone />
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  browser Statistics
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Read long term trends of browser usage
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Typing Speed
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Test your typing speed
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  AWS Training
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Learn Amazon Web Services
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Color Picker
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Use our color picker to find different RGB, HEX and HSL colors
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Code game
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  W3Schools Coding Game! Help the lynx collect pine cones{" "}
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <Card className="bg-dark">
              <Card.Body className="_card1">
                <Card.Title
                  style={{
                    fontSize: "20px",
                    color: "#FFF4A3",
                    fontWeight: "bold",
                  }}
                >
                  Newsletter
                </Card.Title>
                <Card.Title
                  style={{
                    fontSize: "12px",
                    fontFamily: "'Kanit', sans-serif",
                    color: "#fff",
                  }}
                >
                  Join our newsletter and get access to exclusive content every
                  month
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <footer>
        <div
          style={{ fontSize: "1.5vw" }}
          className="social-icons1 mt-5 d-flex justify-content-end"
        >
          <AiFillFacebook id="i1" className="icon" />
          <AiOutlineInstagram id="i2" className="icon" />
          <AiFillLinkedin id="i3" className="icon" />
          <BsDiscord id="i4" className="icon" />
        </div>
      </footer>
    </div>
  );
};

export default Services;
