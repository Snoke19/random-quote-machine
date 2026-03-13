import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";

import { scan } from "react-scan";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

scan({
  enabled: true,
  log: true,
});

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
