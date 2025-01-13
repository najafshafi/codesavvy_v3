import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

// Fetch chats from the backend using React Query
const fetchChats = async () => {
  const response = await fetch("http://localhost:3003/api/chatlist", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching chats");
  }

  return response.json(); // Return the chat data as JSON
};

// Function to get the first text of each chat and limit to 10 words
const getFirstText = (chat) => {
  if (chat.history && chat.history.length > 0) {
    const firstMessage = chat.history[0];
    if (firstMessage.parts && firstMessage.parts.length > 0) {
      const firstText = firstMessage.parts[0].text;
      const words = firstText.split(" ");
      return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : ""); // Limit to 10 words
    }
  }
  return "";
};

const ChatList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats, // Use the fetchChats function to get chat data
  });

  if (isLoading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>Something went wrong! {error.message}</div>; // Show error message

  return (
    <div className="chatList">
      <hr />
      <span className="title">DASHBOARD</span>
      <Link className="list2" to="/dashboard">
        Create a new Chat
      </Link>
      <span className="title2">More</span>
      <Link className="list2" to="/">
        Explore CodeSavvy AI
      </Link>
      <hr />

      <span className="title">RECENT CHATS</span>
      <div className="list-container">
        <div className="list">
          {data?.length === 0 ? (
            <p className="list2">No chats available</p> // Show a message if no chats are available
          ) : (
            data.map((chat) => (
              <Link
                to={`/dashboard/chats/${chat._id}`}
                key={chat._id}
                className="chat-link"
              >
                {getFirstText(chat)} {/* Display the first text of each chat */}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
