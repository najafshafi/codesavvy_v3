import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import arrow from "../dashboardPage/arrow.png";

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

    // eslint-disable-next-line
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
          <img src={arrow} alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;