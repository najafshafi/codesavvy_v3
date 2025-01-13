import "./chatPage.css";
import NewPrompt from "../newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop(); // Extract chatId from URL

  // Fetch chat data based on chatId
  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`http://localhost:3003/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  console.log(chatId);
  console.log(data);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {/* Handle loading and error states */}
          {isPending
            ? "Loading..."
            : error
              ? "Something went wrong!"
              : data?.history?.map((message, i) => (
                  <div key={i}>
                    {/* Render message content based on the role */}
                    <div
                      className={`
                        message.role === "user"
                          ? "message user"
                          : "message model"
                      `}
                    >
                      {message.parts.map((part, idx) => (
                        <div key={idx}>
                          {/* Render the text of the message */}
                          <Markdown>{part.text}</Markdown>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

          {/* NewPrompt component to handle new messages */}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
