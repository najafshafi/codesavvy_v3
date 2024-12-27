import { useState } from "react";
import { executeCode } from "../api";
import toast from "react-hot-toast";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    if (language === "html" || language === "css") {
      handleHtmlCssExecution(sourceCode, language);
      return;
    }

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast.error(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHtmlCssExecution = (sourceCode, language) => {
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    if (language === "html") {
      iframe.srcdoc = sourceCode;
    } else if (language === "css") {
      iframe.srcdoc = `<style>${sourceCode}</style><div>CSS Rendered Successfully</div>`;
    }

    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = ""; // Clear any existing content
    outputContainer.appendChild(iframe);
    setIsError(false);
  };

  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-lg mb-2">Output</h2>
      <button
        onClick={runCode}
        disabled={isLoading}
        className="mb-4 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md disabled:bg-gray-400"
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        id="output-container"
        className={`h-64 overflow-y-auto p-4 border rounded-md ${
          isError ? "border-red-500 text-red-600" : "border-gray-300"
        }`}
      >
        {output
          ? output.map((line, i) => <div key={i}>{line}</div>)
          : language === "html" || language === "css"
            ? "Your rendered output will appear here"
            : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
