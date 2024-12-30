import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "./dashboardPage.css";

// Import images
// import logo from "./logo.png";
import chat from "./chat.png";
import image from "./image.png";
import arrow from "./arrow.png";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`http://localhost:3003/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          {/* <img src={logo} height={"50px"} alt="Logo" /> */}
          <h1>Code Savvy</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src={chat} alt="Chat Icon" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src={image} alt="Analyze Code" />
            <span>Analyze Code</span>
          </div>
          <div className="option">
            <img src={chat} alt="Help Icon" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src={arrow} alt="Submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
