import React from "react";

import './App.css';

import Search from "./Search/Search";
import QuoteBox from "./QuoteBox/QuoteBox";
import Footer from "./Footer/Footer";
import {StyleThemeProvider} from "./Context/StyleThemeContext";
import {NotificationProvider} from "./Context/NotificationContext";
import {SearchProvider} from "./Context/SearchContext";

export default function App() {
  return (
    <StyleThemeProvider>
      <NotificationProvider>
        <div className="container">
          <SearchProvider>
            <Search/>
            <div className="quote-container">
              <QuoteBox/>
              <Footer/>
            </div>
          </SearchProvider>
        </div>
      </NotificationProvider>
    </StyleThemeProvider>
  )
}