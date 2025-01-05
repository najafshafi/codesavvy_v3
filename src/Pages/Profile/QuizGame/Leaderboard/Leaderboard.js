import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../../Auth/axiosInstance";
import { useSprings, animated } from "@react-spring/web";

const spacing = 5; // Margin between tiles
const tileHeight = 50; // Height of each tile

// Function to calculate styles for animation
const calculateStyles = (order) => (index) => ({
  y: order.indexOf(index) * (tileHeight + spacing),
  scale: 1,
  zIndex: 0,
  shadow: 1,
  immediate: false,
});

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const order = useRef(users.map((_, i) => i));
  const [springs, api] = useSprings(
    users.length,
    calculateStyles(order.current)
  );

  // Fetch leaderboard data from the API
  useEffect(() => {
    axiosInstance
      .get("/leaderboard")
      .then((response) => {
        const leaderboardData = response.data.map((user, index) => ({
          name: user.name, // You can customize this based on actual names
          score: user.totalScore.toFixed(2), // Assuming score is a float
          id: user._id,
        }));
        setUsers(leaderboardData.sort((a, b) => b.score - a.score)); // Sort by score in descending order
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  // Animate tiles when the user list updates
  useEffect(() => {
    order.current = users.map((_, i) => i); // Update order based on sorted users
    api.start(calculateStyles(order.current));
  }, [users, api]);

  return (
    <div className="leaderboardContainer">
      <h2 className="leaderboardTitle">Leaderboard</h2>
      <div className="leaderboardList">
        {springs.map(({ y }, i) => {
          const user = users[i];
          const rank = i + 1;
          const background =
            rank === 1
              ? "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
              : rank === 2
                ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                : rank === 3
                  ? "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)"
                  : "#fff";

          return (
            <animated.div
              key={user.id}
              style={{
                y,
                scale: 1,
                height: tileHeight,
                lineHeight: `${tileHeight}px`,
                padding: "0 10px",
                background,
                color: rank <= 3 ? "#fff" : "#000",
                fontWeight: "bold",
                position: "absolute",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: 5,
                transition: "background 1s ease, transform 1s ease",
                boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.1)`,
              }}
            >
              {rank}. {user.name} - {user.score}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
