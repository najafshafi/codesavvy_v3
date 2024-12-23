import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NextUIProvider } from "@nextui-org/react";
import theme from "./theme";
import { Provider } from "./Components/ui/provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (typeof process === "undefined") {
  window.process = { env: { NODE_ENV: "development" } };
}

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider value={theme}>
        <App />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
