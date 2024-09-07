import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import fetchRandomQuote from "./QuoteService";
import "./QuoteBox.css";

export default function QuoteBox() {

    const [quoteObj, setQuoteObj] = useState({});

    const loadQuote = async () => {
        try {
            const quote = await fetchRandomQuote();
            setQuoteObj(quote);
        } catch (error) {
            console.error('Failed to load quote:', error);
        }
    };

    useEffect(() => {
        loadQuote();
    }, []);

    return (
        <>
            <div id="quote-box">
                <div class="quote-text" style={{ opacity: 1 }}>
                    <i class="fa fa-quote-left"> </i><span id="text">{quoteObj.quote}</span>
                </div>
                <div class="quote-author" style={{ opacity: 1 }}>- <span id="author">Plato</span></div>
                <div class="buttons">
                    <a
                        class="button"
                        id="tweet-quote"
                        title="Tweet this quote!"
                        target="_top"
                        href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22We%20can%20easily%20forgive%20a%20child%20who%20is%20afraid%20of%20the%20dark%3B%20the%20real%20tragedy%20of%20life%20is%20when%20men%20are%20afraid%20of%20the%20light.%22%20Plato"
                        style={{ backgroundColor: 'rgb(231, 76, 60)' }}>
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a
                        class="button"
                        id="tumblr-quote"
                        title="Post this quote on tumblr!"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Plato&amp;content=We%20can%20easily%20forgive%20a%20child%20who%20is%20afraid%20of%20the%20dark%3B%20the%20real%20tragedy%20of%20life%20is%20when%20men%20are%20afraid%20of%20the%20light.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button"
                        style={{ backgroundColor: 'rgb(231, 76, 60)' }}>
                        <i class="fa fa-tumblr"></i>
                    </a>
                    <button class="button" id="new-quote" style={{ backgroundColor: 'rgb(231, 76, 60)' }} onClick={loadQuote}>New quote</button>
                </div>
            </div>
        </>
    );
}