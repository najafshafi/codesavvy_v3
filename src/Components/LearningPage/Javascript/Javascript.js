import React, { useState } from "react";
import topics from "./Javascript.json";
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
              selectedTopic.title === topic.title ? "#FDE047" : "inherit",
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

const TutorialSection = ({ title,content, codeExample }) => (
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

const JSTutorial = () => {
  const [selectedTopic, setSelectedTopic] = useState(
    topics.javascript_tutorial[0]
  );

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="container">
      <Sidebar
        topics={topics.javascript_tutorial}
        onTopicSelect={handleTopicSelect}
        selectedTopic={selectedTopic}
      />
      <div className="content">
      <h1 className="text-5xl text-yellow-300">Javascript</h1>
        <TutorialSection
          title={selectedTopic.title}
          content={selectedTopic.content}
          codeExample={selectedTopic.example_code}
        />
      </div>
    </div>
  );
};

export default JSTutorial;