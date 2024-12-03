import React, { useState } from "react";
import topics from "./Go.json";
import "../Web.css";

const Sidebar = ({ topics, onTopicSelect, selectedTopic }) => (
  <div className="sidebar">
    <h2 className="p-2">Topics</h2>
    <ul className="topic-list">
      {topics.map((topic, index) => (
        <li
          key={index}
          className={`topic-item ${selectedTopic.title === topic.title ? "active" : ""}`}
          onClick={() => onTopicSelect(topic)}
          style={{
            backgroundColor:
              selectedTopic.title === topic.title ? "#29beb0" : "inherit",
            color: selectedTopic.title === topic.title ? "white" : "inherit",
            cursor: "pointer",
          }}
        >
          {topic.title}
        </li>
      ))}
    </ul>
  </div>
);

const TutorialSection = ({ title, content, codeExample }) => (
  <div className="tutorial-section">
    <h2>{title}</h2>
    <p>{content}</p>
    {codeExample && (
      <pre>
        <code>{codeExample}</code>
      </pre>
    )}
  </div>
);

const GoTutorial = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics.go_tutorial[0]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="container">
      <Sidebar
        topics={topics.go_tutorial}
        onTopicSelect={handleTopicSelect}
        selectedTopic={selectedTopic}
      />
      <div className="content">
      <h1 className="text-5xl text-emerald-400">Go</h1>
        <TutorialSection
          title={selectedTopic.title}
          content={selectedTopic.content}
          codeExample={selectedTopic.code_example}
        />
      </div>
    </div>
  );
};

export default GoTutorial;
