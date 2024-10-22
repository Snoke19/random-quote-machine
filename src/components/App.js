import {Search} from "./Search/Search";
import QuoteBox from "./QuoteBox/QuoteBox";
import Footer from "./Footer/Footer";
import React from "react";

import './App.css';

export default function App() {

  return (
    <div className="container">
      <Search/>
      <div className="quote-container">
        <QuoteBox/>
        <Footer/>
      </div>
    </div>
  )
}