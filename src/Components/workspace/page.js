"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

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

  function handleEditorChange(value) {
    const file = files[fileName];
    file.value = value;
  }

  const file = files[fileName];

  // Handle the dynamic change of language for editor
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
    <div className="relative px-16 flex h-[80vh] overflow-hidden justify-between">
      <div className="relative w-[45vw] h-[60vh] grid self-center gap-0">
        {/* Language selection dropdown */}
        {/* <div className="text-center text-3xl font-bold text-gray-800 mb-4">
          Virtual IDE
        </div> */}
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
          height="100%" // Set editor to take the full height of the container
          theme="vs-dark"
          saveViewState={true}
          path={file.name}
          defaultLanguage={selectedLanguage} // Dynamically set language
          defaultValue={file.value}
          onChange={handleEditorChange}
          value={file.value}
        />
      </div>

      {/* Output Window */}
      <div>
        <div className="text-center text-3xl font-bold text-gray-800 mb-4 mt-16">
          Output Window
        </div>

        <div className="relative bg-gray-200 w-[45vw] h-[60vh] grid self-center gap-0 border-4 border-indigo-500 rounded-lg shadow-lg">
          <iframe
            title="output"
            srcDoc={`<html><body>${htmlCode}</body><style>${cssCode}</style><script>${jsCode}</script></html>`}
            className="shadow-lg h-full w-full rounded-lg"
          />
        </div>
      </div>



    </div>
  );
}

// import { Suspense } from "react";
// import { useState, useEffect, useCallback } from "react";
// import Editor from "@monaco-editor/react";

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
// };

// export default function Home() {
//   const [fileName, setFileName] = useState("index.html");
//   const [htmlCode, setHtmlCode] = useState("");
//   const [cssCode, setCssCode] = useState("");
//   const [jsCode, setJsCode] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("html");

//   // Debounce function to limit calls to handleEditorChange
//   const debounce = (func, delay) => {
//     let debounceTimeout;
//     return (...args) => {
//       clearTimeout(debounceTimeout);
//       debounceTimeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   const handleEditorChange = useCallback(
//     debounce((value) => {
//       const file = files[fileName];
//       file.value = value;
//     }, 300), // 300ms delay to reduce observer notifications
//     [fileName]
//   );

//   const file = files[fileName];

//   // Handle dynamic language change for editor and button listeners
//   useEffect(() => {
//     const runBtn = document.getElementById("runCode");
//     const clsBtn = document.getElementById("closeWindow");

//     const runCodeHandler = () => {
//       setHtmlCode(files["index.html"].value);
//       setCssCode(files["style.css"].value);
//       setJsCode(files["script.js"].value);
//     };

//     const closeWindowHandler = () => {
//       document.getElementById("outputWindow").style.display = "none";
//     };

//     runBtn?.addEventListener("click", runCodeHandler);
//     clsBtn?.addEventListener("click", closeWindowHandler);

//     return () => {
//       runBtn?.removeEventListener("click", runCodeHandler);
//       clsBtn?.removeEventListener("click", closeWindowHandler);
//     };
//   }, []);

//   return (
//     <div className="relative px-16 flex h-[80vh] overflow-hidden justify-between">
//       <div className="relative w-[45vw] h-[60vh] grid self-center gap-0">
//         {/* Language selection dropdown */}
//         <div className="flex bg-gray-800 flex-row-reverse justify-between p-2 h-fit">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             id="runCode"
//           >
//             Run
//           </button>
//           <select
//             value={selectedLanguage}
//             onChange={(e) => {
//               setSelectedLanguage(e.target.value);
//               files[fileName].language = e.target.value;
//             }}
//             className="bg-white px-5 py-2 rounded-md"
//           >
//             <option value="html">HTML</option>
//             <option value="css">CSS</option>
//             <option value="javascript">JavaScript</option>
//           </select>
//         </div>

//         {/* Wrap the Editor component in Suspense */}
//         <Suspense fallback={<div>Loading editor...</div>}>
//           <Editor
//             height="100%" // Set editor to take the full height of the container
//             theme="vs-dark"
//             saveViewState={true}
//             path={file.name}
//             defaultLanguage={selectedLanguage} // Dynamically set language
//             defaultValue={file.value}
//             onChange={handleEditorChange} // Using debounced onChange
//             value={file.value}
//           />
//         </Suspense>
//       </div>

//       {/* Output Window */}
//       <div className="relative bg-gray-200 w-[45vw] h-[60vh] grid self-center gap-0">
//         <iframe
//           title="output"
//           srcDoc={`<html><body>${htmlCode}</body><style>${cssCode}</style><script>${jsCode}</script></html>`}
//           className="shadow-lg h-full w-full"
//         />
//       </div>
//     </div>
//   );
// }
