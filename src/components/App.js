import {Search} from "./Search/Search";
import QuoteBox from "./QuoteBox/QuoteBox";
import Footer from "./Footer/Footer";
import {StyleThemeProvider} from "./context/StyleThemeContext";

import React from "react";
import './App.css';

export default function App() {
  return (
    <StyleThemeProvider>
      <div className="container">
        <Search/>
        <div className="quote-container">
          <QuoteBox/>
          <Footer/>
        </div>
      </div>
    </StyleThemeProvider>
  )
}