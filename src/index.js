import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import QuoteBox from "./components/QuoteBox/QuoteBox";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="wrapper">
      <QuoteBox />
      <Footer />
    </div>
  </React.StrictMode>
);
