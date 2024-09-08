import React, { useState, useEffect, useCallback } from "react";
import fetchRandomQuote from "./services/QuoteService";
import QuoteAuthor from "./quote-author/QuoteAuthor";
import "./QuoteBox.css";

const colors = [
    '#b5d6ff', '#e08e47', '#141a35', '#ff7d00', '#1d1832', '#ff0f39',
    '#ff9508', '#700000', '#002876', '#ff0f39', '#f6a6b8', '#03210a'
];

export default function QuoteBox() {

    const [quoteObj, setQuoteObj] = useState({ quote: '', author: '' });
    const [colorBackGround, setColorBackGround] = useState(colors[0]);
    const [fade, setFade] = useState(false);

    const loadQuote = useCallback(async () => {
        setFade(true);

        setTimeout(async () => {
            setColorBackGround(getRandomColor());
            try {
                const quote = await fetchRandomQuote();
                setQuoteObj(quote);
            } catch (error) {
                console.error('Failed to load quote:', error);
                setQuoteObj({ quote: 'Error loading quote', author: '' });
            } finally {
                setFade(false);
            }
        }, 500);
    }, []);

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    useEffect(() => {
        document.body.style.backgroundColor = colorBackGround;
        document.body.style.transition = 'background-color 1s ease';
    }, [colorBackGround]);

    useEffect(() => {
        console.log("run useeffect loadQuote");
        loadQuote();
    }, [loadQuote]);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quoteObj.quote)}%22%20${encodeURIComponent(quoteObj.author)}`;

    return (
        <div id="quote-box">
            <QuoteAuthor quoteObj={quoteObj} colorBackGround={colorBackGround} fade={fade} />
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