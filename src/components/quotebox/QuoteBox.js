import React, { useState, useEffect, useCallback } from "react";
import fetchRandomQuote from "./services/QuoteService";
import QuoteAuthor from "./quote-author/QuoteAuthor";
import "./QuoteBox.css";

const colors = [
    '#FF6F61',  // Warm red with a gentle undertone
    '#FFB74D',  // Soft orange
    '#FFD54F',  // Warm golden yellow
    '#DCE775',  // Muted lime green for contrast
    '#AED581',  // Light olive green
    '#81C784',  // Soft mint green
    '#4DB6AC',  // Muted teal
    '#64B5F6',  // Gentle sky blue
    '#7986CB',  // Soft lavender blue
    '#BA68C8',  // Light purple
    '#F06292',  // Soft coral pink
    '#E57373'   // Warm salmon red
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
            } catch {
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
        loadQuote();
    }, [loadQuote]);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quoteObj.quote)}%22%20${encodeURIComponent(quoteObj.author)}`;

    return (
        <div id="quote-box">
            <QuoteAuthor
                quote={quoteObj.quote}
                author={quoteObj.author}
                color={colorBackGround}
                fade={fade}
            />
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
                <button
                    className="button"
                    id="new-quote"
                    style={{ backgroundColor: colorBackGround }}
                    onClick={loadQuote}>
                    New quote
                </button>
            </div>
        </div>
    );
}