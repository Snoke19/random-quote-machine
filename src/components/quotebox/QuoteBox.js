import React, { useState, useEffect, useCallback } from "react";

import fetchRandomQuote from "./services/QuoteService";
import QuoteAuthor from "./quote-author/QuoteAuthor";
import Notification from "../notification/Notification";
import SocialButton from "./social-button/SocialButton";
import GroupButtons from "./button/GroupButtons";

import "./QuoteBox.css";

const colors = [
    '#FF6F61',
    '#FFB74D',
    '#FFD54F',
    '#DCE775',
    '#AED581',
    '#81C784',
    '#4DB6AC',
    '#64B5F6',
    '#7986CB',
    '#BA68C8',
    '#F06292',
    '#E57373'
];

export default function QuoteBox() {
    const [copyInfo, setCopyInfo] = useState({ show: false, info: '' });
    const [quoteObj, setQuoteObj] = useState({ quote: '', author: '' });
    const [colorBackGround, setColorBackGround] = useState(colors[0]);
    const [fade, setFade] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${quoteObj.quote} - ${quoteObj.author}`);

            setCopyInfo((prevState) => ({ ...prevState, show: true, info: "The Quote is copied!", }));

            setTimeout(() => {
                setCopyInfo((prevState) => ({ ...prevState, show: false, }));
            }, 3000);
        } catch (error) {
            setCopyInfo((prevState) => ({ ...prevState, show: true, info: `Failed to copy: ${error.message}`, }));

            setTimeout(() => {
                setCopyInfo((prevState) => ({ ...prevState, show: false, }));
            }, 3000);
        }
    }

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
            <div className="buttons-container">
                <SocialButton
                    quoteUrl={tweetQuoteUrl}
                    colorBackGround={colorBackGround}
                    title="Tweet this quote!"
                    iconClass="fa fa-twitter"
                />
                <GroupButtons groupingClass="group-buttons">
                    <button className="button clipboard-button" style={{ backgroundColor: colorBackGround }} onClick={handleCopy}>
                        <img src="/images/icons8-copy-24.png" alt="Clipboard" />
                    </button>
                    <button className="button quote-button" style={{ backgroundColor: colorBackGround }} onClick={loadQuote}>
                        New quote
                    </button>
                </GroupButtons>
            </div>
            <Notification notificationInfo={copyInfo} />
        </div>
    );
}