"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { debounce } from "lodash"; // Import debounce for optimized updates

const files = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "",
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: "",
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "",
  },
};

export default function Home() {
  const [fileName, setFileName] = useState("index.html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("html");

  // Debounced editor change handler
  const handleEditorChange = debounce((value) => {
    const file = files[fileName];
    file.value = value;
  }, 300); // 300ms delay

  const file = files[fileName];

  // Handle dynamic changes and button clicks
  useEffect(() => {
    const runBtn = document.getElementById("runCode");
    const clsBtn = document.getElementById("closeWindow");

    runBtn?.addEventListener("click", () => {
      setHtmlCode(files["index.html"].value);
      setCssCode(files["style.css"].value);
      setJsCode(files["script.js"].value);
    });

    clsBtn?.addEventListener("click", () => {
      document.getElementById("outputWindow").style.display = "none";
    });
  }, []);

  return (
    <div className="relative px-16 grid grid-cols-2 gap-4 h-[80vh]">
      {/* Left Side: Monaco Editor */}
      <div className="relative w-full h-[60vh] grid self-center gap-0">
        {/* Language selection dropdown */}
        <div className="flex bg-gray-800 flex-row-reverse justify-between p-2 h-fit mt-5">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            id="runCode"
          >
            Run
          </button>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              files[fileName].language = e.target.value;
            }}
            className="bg-white px-5 py-2 rounded-md"
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <Editor
          height="500px" // Set fixed height for stability
          theme="vs-dark"
          saveViewState={true}
          path={file.name}
          defaultLanguage={selectedLanguage}
          defaultValue={file.value}
          onChange={handleEditorChange}
          value={file.value}
        />
      </div>

      {/* Right Side: Output Window */}
      <div className="relative w-full h-[60vh] grid self-center gap-0">
        <div className="text-center text-3xl font-bold text-gray-800 mb-4 ">
          Output Window
        </div>

        <div className="relative bg-gray-200 w-full h-[60vh] grid self-center gap-0 border-4 border-indigo-500 rounded-lg shadow-lg">
          <iframe
            title="output"
            srcDoc={`<html><body>${htmlCode}</body><style>${cssCode}</style><script>${jsCode}</script></html>`}
            className="shadow-lg w-full rounded-lg"
            style={{ height: "500px" }} // Fixed height for iframe
          />
        </div>
      </div>
    </div>
  );
}
