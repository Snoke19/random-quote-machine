import React from "react";

export default function QuoteAuthor({ quote, author, color, fadeClass }) {
    return (
        <div style={{border: `1px dashed ${color}`, padding: '20px', borderRadius: '20px'}}>
            <div className={`quote-text ${fadeClass}`} style={{ color }}>
                <i className="fa fa-quote-left"></i><span id="text">{quote}</span>
            </div>
            <div className={`quote-author ${fadeClass}`} style={{ color }}>
                - <span id="author">{author}</span>
            </div>
        </div>
    );
}