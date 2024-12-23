// "use client";
// import { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import { debounce } from "lodash"; // Import debounce for optimized updates

// const files = {
//   "index.html": {
//     name: "index.html",
//     language: "html",
//     value: "",
//   },
//   "style.css": {
//     name: "style.css",
//     language: "css",
//     value: "",
//   },
//   "script.js": {
//     name: "script.js",
//     language: "javascript",
//     value: "",
//   },
//   "main.py": {
//     name: "main.py",
//     language: "python",
//     value: "",
//   },
//   "Main.java": {
//     name: "Main.java",
//     language: "java",
//     value: "",
//   },
//   "main.cpp": {
//     name: "main.cpp",
//     language: "cpp",
//     value: "",
//   },
//   "Program.cs": {
//     name: "Program.cs",
//     language: "csharp",
//     value: "",
//   },
//   "index.php": {
//     name: "index.php",
//     language: "php",
//     value: "",
//   },
// };

// export default function Home() {
//   const [fileName, setFileName] = useState("index.html");
//   const [selectedLanguage, setSelectedLanguage] = useState("html");

//   const [htmlCode, setHtmlCode] = useState("");
//   const [cssCode, setCssCode] = useState("");
//   const [jsCode, setJsCode] = useState("");

//   const file = files[fileName];

//   // Debounced editor change handler
//   const handleEditorChange = debounce((value) => {
//     const file = files[fileName];
//     file.value = value;
//   }, 300); // 300ms delay

//   // Update the selected file and language when the dropdown changes
//   const handleLanguageChange = (newLanguage) => {
//     // Find the corresponding file for the new language
//     const newFileName = Object.keys(files).find(
//       (key) => files[key].language === newLanguage
//     );

//     if (newFileName) {
//       setFileName(newFileName);
//       setSelectedLanguage(newLanguage);
//     }
//   };

//   // Handle dynamic changes and button clicks
//   useEffect(() => {
//     const runBtn = document.getElementById("runCode");
//     const clsBtn = document.getElementById("closeWindow");

//     runBtn?.addEventListener("click", () => {
//       setHtmlCode(files["index.html"].value);
//       setCssCode(files["style.css"].value);
//       setJsCode(files["script.js"].value);
//     });

//     clsBtn?.addEventListener("click", () => {
//       document.getElementById("outputWindow").style.display = "none";
//     });
//   }, []);

//   return (
//     <div className="relative px-16 grid grid-cols-2 gap-4 h-[calc(100vh-200px)]">
//       {/* Left Side: Monaco Editor */}
//       <div className="relative w-full h-[60vh] grid self-center gap-0">
//         {/* Language selection dropdown */}
//         <div className="flex bg-gray-800 flex-row-reverse justify-between p-2 h-fit mt-5">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             id="runCode"
//           >
//             Run
//           </button>
//           <select
//             value={selectedLanguage}
//             onChange={(e) => handleLanguageChange(e.target.value)}
//             className="bg-white px-5 py-2 rounded-md"
//           >
//             <option value="html">HTML</option>
//             <option value="css">CSS</option>
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="java">Java</option>
//             <option value="cpp">C++</option>
//             <option value="csharp">C#</option>
//             <option value="php">PHP</option>
//           </select>
//         </div>

//         <Editor
//           height="60vh" // Set fixed height for stability
//           theme="vs-dark"
//           path={file.name}
//           language={file.language} // Dynamically update the language
//           value={file.value} // Dynamically update the file content
//           onChange={handleEditorChange}
//         />
//       </div>

//       {/* Right Side: Output Window */}
//       <div className="relative w-full h-[65vh] grid self-center gap-0">
//         <div className="text-center text-3xl font-bold text-gray-800 mb-4 ">
//           Output Window
//         </div>

//         <div className="relative bg-gray-200 w-full h-[68.5vh] grid self-center gap-0 border-2 border-indigo-500 rounded-lg">
//           <iframe
//             title="output"
//             srcDoc={`<html><body>${htmlCode}</body><style>${cssCode}</style><script>${jsCode}</script></html>`}
//             className="w-full rounded-lg"
//             style={{ height: "500px" }} // Fixed height for iframe
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Box } from "@chakra-ui/react";
import CodeEditor from "../CodeEditor";

const page = () => {
  return (
    <div>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
    </div>
  );
};

export default page;
