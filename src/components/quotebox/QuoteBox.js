import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import fetchRandomQuote from "./QuoteService";
import "./QuoteBox.css";

const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

export default function QuoteBox() {

    const [quoteObj, setQuoteObj] = useState({});
    const [colorBackGround, setColorBackGround] = useState(colors[0]);
    const [fade, setFade] = useState(false);

    const loadQuote = async () => {
        setFade(true);

        setTimeout(async () => {
            setColorBackGround(getRandomColorArray());

            try {
                const quote = await fetchRandomQuote();
                setQuoteObj(quote);
            } catch (error) {
                console.error('Failed to load quote:', error);
            }

            setFade(false);
        }, 500);
    };

    function getRandomColorArray() {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    useEffect(() => {
        document.body.style.backgroundColor = colorBackGround;
        document.body.style.transition = 'background-color 0.9s ease';
    }, [colorBackGround]);

    useEffect(() => {
        loadQuote();
    }, []);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quoteObj.quote)}%22%20${encodeURIComponent(quoteObj.author)}`;

    return (
        <div id="quote-box">
            <div className={`quote-text ${fade ? 'fade-out' : 'fade-in'}`} style={{ color: colorBackGround }}>
                <i className="fa fa-quote-left"> </i><span id="text">{quoteObj.quote}</span>
            </div>
            <div className={`quote-author ${fade ? 'fade-out' : 'fade-in'}`} style={{ color: colorBackGround }}>
                - <span id="author">{quoteObj.author}</span>
            </div>
            <div className="buttons">
                <a
                    className="button"
                    id="tweet-quote"
                    title="Tweet this quote!"
                    target="_top"
                    href={tweetQuoteUrl}
                    style={{ backgroundColor: colorBackGround }}>
                    <i className="fa fa-twitter"></i>
                </a>
                <button className="button" id="new-quote" style={{ backgroundColor: colorBackGround }} onClick={loadQuote}>New quote</button>
            </div>
        </div>
    );
}