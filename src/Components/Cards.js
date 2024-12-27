import React from "react";
import cardData from "./cardData.json";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Cards = () => {
  const { cards } = cardData;
  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#282A35" }}>
        <div className="container">
          <div className="row">
            {cards.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                <Card
                  className="my-5"
                  style={{ backgroundColor: card.backgroundColor }}
                >
                  <Card.Body className="text-center">
                    <Card.Title
                      style={{
                        fontSize: "45px",
                        fontFamily: "'Aeonik', sans-serif",
                      }}
                    >
                      {card.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: "16px",
                        fontFamily: "'Aeonik', sans-serif",
                      }}
                    >
                      {card.description}
                    </Card.Text>
                    <Button
                      style={{
                        borderRadius: "30px",
                      }}
                      variant="dark"
                    >
                      <Link to={card.to}>{card.buttonText}</Link>
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
