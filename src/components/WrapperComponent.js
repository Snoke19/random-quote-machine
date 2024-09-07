import React from "react";
import QuoteBox from "./quotebox/QuoteBox";
import Footer from "./footer/Footer";

export default function WrapperComponent() {

    return (
        <>
            <div className="wrapper">
                <QuoteBox />
                <Footer />
            </div>
        </>
    )
}