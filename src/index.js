import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import { Provider } from "./Components/ui/p";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (typeof process === "undefined") {
  window.process = { env: { NODE_ENV: "development" } };
}

root.render(
  <React.StrictMode>
    <Provider value={theme}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
