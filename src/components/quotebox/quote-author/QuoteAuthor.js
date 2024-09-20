import React from "react";

export default function QuoteAuthor({ quote, author, color, fadeClass }) {
    return (
        <>
            <div className={`quote-text ${fadeClass}`} style={{ color }}>
                <i className="fa fa-quote-left"></i><span id="text">{quote}</span>
            </div>
            <div className={`quote-author ${fadeClass}`} style={{ color }}>
                - <span id="author">{author}</span>
            </div>
        </>
    );
}