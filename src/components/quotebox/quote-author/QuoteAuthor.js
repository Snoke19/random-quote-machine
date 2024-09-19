import React from "react";

export default function QuoteAuthor({ quote, author, color, fade }) {
    return (
        <>
            <div className={`quote-text ${fade ? 'fade-out' : 'fade-in'}`} style={{ color }}>
                <i className="fa fa-quote-left"></i><span id="text">{quote}</span>
            </div>
            <div className={`quote-author ${fade ? 'fade-out' : 'fade-in'}`} style={{ color }}>
                - <span id="author">{author}</span>
            </div>
        </>
    );
}