import React, { useState } from "react";
import topics from "./React.json";
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
              selectedTopic.title === topic.title ? "#61dbfb" : "inherit",
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

const ReactTutorial = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics.react_tutorial[0]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="container">
      <Sidebar
        topics={topics.react_tutorial}
        onTopicSelect={handleTopicSelect}
        selectedTopic={selectedTopic}
      />
      <div className="content">
      <h1 className="text-5xl text-sky-300">React</h1>
        <TutorialSection
          title={selectedTopic.title}
          content={selectedTopic.content}
          codeExample={selectedTopic.code_example}
        />
      </div>
    </div>
  );
};

export default ReactTutorial;
