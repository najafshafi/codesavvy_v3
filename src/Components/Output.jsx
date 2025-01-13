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
    <div className="w-full lg:w-1/2">
      <button
        onClick={runCode}
        disabled={isLoading}
        className="w-[150px] bg-slate-900 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      {/* </div> */}
      <div
        id="output-container"
        className={`h-[65vh] overflow-y-auto p-4 bg-white/45 border-2 rounded-md ${
          isError ? "border-red-500 text-red-600" : "border-gray-600"
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
