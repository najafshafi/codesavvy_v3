import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return fetch(`http://localhost:3003/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] });
      formRef.current.reset();
      setQuestion("");
      setAnswer("");
    },
    onError: (err) => {
      console.error("Error saving to database:", err);
    },
  });

  const add = async (text, isInitial = false) => {
    if (!isInitial) setQuestion(text);

    try {
      // First, send the user's message to the AI server
      const aiResponse = await fetch("http://127.0.0.1:5006/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const aiData = await aiResponse.json();
      const generatedResponse = aiData.response;
      setAnswer(generatedResponse);

      // Save both the question and answer to the database
      mutation.mutate({ question: text, answer: generatedResponse });
    } catch (err) {
      console.error("Error during AI generation:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (text) add(text);
  };

  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    hasRun.current = true;
  }, [data]);

  return (
    <>
      {/* ADD NEW CHAT */}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;

// import { useEffect, useRef, useState } from "react";
// import "./newPrompt.css";
// import Markdown from "react-markdown";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// const NewPrompt = ({ data }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [chatId, setChatId] = useState(data?._id || null); // Track chat ID

//   const endRef = useRef(null);
//   const formRef = useRef(null);

//   useEffect(() => {
//     endRef.current.scrollIntoView({ behavior: "smooth" });
//   }, [data, question, answer]);

//   const queryClient = useQueryClient();

//   // Mutation for updating chat
//   const updateChatMutation = useMutation({
//     mutationFn: (chatData) => {
//       return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/${chatId}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(chatData),
//       }).then((res) => res.json());
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
//       formRef.current.reset();
//       setQuestion("");
//       setAnswer("");
//     },
//     onError: (err) => console.log("Error updating chat:", err),
//   });

//   // Mutation for creating new chat
//   const createChatMutation = useMutation({
//     mutationFn: (initialQuestion) => {
//       return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: initialQuestion }),
//       }).then((res) => res.json());
//     },
//     onSuccess: (newChatId) => setChatId(newChatId), // Store new chat ID after creation
//     onError: (err) => console.log("Error creating chat:", err),
//   });

//   const addChatMessage = async (text, isInitial) => {
//     if (!isInitial) setQuestion(text);

//     try {
//       // Step 1: Create a new chat immediately on the first message
//       if (!chatId) {
//         await createChatMutation.mutateAsync(text);
//       }

//       // Step 2: Request AI-generated response from the AI server
//       const response = await fetch("http://127.0.0.1:5006/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: text }),
//       });
//       const result = await response.json();
//       const generatedText = result.generatedResponse;

//       // Step 3: Set and update the answer in the database
//       setAnswer(generatedText);
//       updateChatMutation.mutate({ question: text, answer: generatedText });
//     } catch (err) {
//       console.log("Error generating or saving chat:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const text = e.target.text.value;
//     if (!text) return;
//     addChatMessage(text, false);
//   };

//   // Only run once if loading a previous chat
//   const hasRun = useRef(false);
//   useEffect(() => {
//     if (!hasRun.current && data?.history?.length === 1) {
//       addChatMessage(data.history[0].parts[0].text, true);
//       hasRun.current = true;
//     }
//   }, []);

//   return (
//     <>
//       {question && <div className="message user">{question}</div>}
//       {answer && (
//         <div className="message">
//           <Markdown>{answer}</Markdown>
//         </div>
//       )}
//       <div className="endChat" ref={endRef}></div>
//       <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
//         <input type="text" name="text" placeholder="Ask anything..." />
//         <button>
//           <img src="/arrow.png" alt="" />
//         </button>
//       </form>
//     </>
//   );
// };

// export default NewPrompt;
