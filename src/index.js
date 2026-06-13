import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom/client";

import {scan} from "react-scan";

import "./index.css";

const scanEnabled = process.env.REACT_APP_SCAN_ENABLED.trim() === "true";
const root = ReactDOM.createRoot(document.getElementById("root"));

if (scanEnabled) {
    scan({
        enabled: true,
        log: true,
    });
}

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
