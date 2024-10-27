import React from "react";
import {Search} from "./Search/Search";
import QuoteBox from "./QuoteBox/QuoteBox";
import Footer from "./Footer/Footer";
import {StyleThemeProvider} from "./context/StyleThemeContext";
import {NotificationProvider} from "./context/NotificationContext";

import './App.css';

export default function App() {
  return (
    <StyleThemeProvider>
      <NotificationProvider>
        <div className="container">
          <Search/>
          <div className="quote-container">
            <QuoteBox/>
            <Footer/>
          </div>
        </div>
      </NotificationProvider>
    </StyleThemeProvider>
  )
}