import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import Timer from "./Components/Timer";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (typeof process === "undefined") {
  window.process = { env: { NODE_ENV: "development" } };
}

root.render(
  <React.StrictMode>
    <ChakraProvider value={theme}>
      <NextUIProvider>
        <App />
        <Timer />
      </NextUIProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
