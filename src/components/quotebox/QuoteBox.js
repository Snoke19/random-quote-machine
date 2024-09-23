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
    const [quoteBoxSettings, setQuoteBoxSettings] = useState({
        quote: '',
        author: '',
        colorBackGround: colors[0],
        fade: false
    });

    const [quoteTags, setQuoteTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
        let value = inputValue.trim();
        if (event.key === 'Enter' && value !== '') {
            setQuoteTags((prevTags) => [...prevTags, value]);
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove) => {
        setQuoteTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
    };

    const handleCopyNotification = (info) => {
        setCopyInfo((prevState) => ({ ...prevState, show: true, info }));
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${quoteBoxSettings.quote} - ${quoteBoxSettings.author}`);
            handleCopyNotification("The Quote is copied!");
        } catch (error) {
            handleCopyNotification(`Failed to copy: ${error.message}`);
        }
    }

    const getRandomColor = useCallback(() => {
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);

    const loadQuote = useCallback(async () => {
        setQuoteBoxSettings(prevState => ({ ...prevState, fade: true }));
        setTimeout(async () => {
            const newColor = getRandomColor();
            try {
                const { quote, author } = await fetchRandomQuote();
                setQuoteBoxSettings((prevState) => ({ ...prevState, quote: quote, author: author, colorBackGround: newColor, fade: false }));
            } catch {
                setQuoteBoxSettings((prevState) => ({ ...prevState, quote: 'Error loading quote', author: '', fade: false }));
            }
        }, 500);
    }, [getRandomColor, setQuoteBoxSettings]);

    useEffect(() => {
        if (copyInfo.show) {
            const timer = setTimeout(() => {
                setCopyInfo((prevState) => ({ ...prevState, show: false, info: '' }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [copyInfo.show]);

    useEffect(() => {
        document.body.style.backgroundColor = quoteBoxSettings.colorBackGround;
        document.body.style.transition = 'background-color 1s ease';
        return () => { document.body.style.backgroundColor = ''; };
    }, [quoteBoxSettings.colorBackGround]);

    useEffect(() => {
        loadQuote();
    }, [loadQuote]);

    const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quoteBoxSettings.quote)}%22%20${encodeURIComponent(quoteBoxSettings.author)}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-website.com')}&text=${encodeURIComponent(quoteBoxSettings.quote)} - ${encodeURIComponent(quoteBoxSettings.author)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.instagram.com/p/C_SkL_iIZVs/?locale=ru&hl=am-et')}`;

    return (
        <div id="quote-box">
            <QuoteAuthor
                quote={quoteBoxSettings.quote}
                author={quoteBoxSettings.author}
                color={quoteBoxSettings.colorBackGround}
                fadeClass={quoteBoxSettings.fade ? 'fade-out' : 'fade-in'}
            />
            <div className="tags-input-container">
                {quoteTags.map((tag, index) => (
                    <div key={index} className="tag" style={{ backgroundColor: quoteBoxSettings.colorBackGround }}>
                        <span>{tag}</span>
                        <button className="remove-tag" onClick={() => removeTag(index)}>&times;</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter tags"
                    className="tags-input"
                />
            </div>
            <div className="buttons-container">
                <GroupButtons groupingClass="group-buttons group-buttons-wrap">
                    <SocialButton
                        quoteUrl={tweetQuoteUrl}
                        colorBackGround={quoteBoxSettings.colorBackGround}
                        title="Tweet this quote!"
                        iconClass="fa fa-twitter"
                    />
                    <SocialButton
                        quoteUrl={linkedinShareUrl}
                        colorBackGround={quoteBoxSettings.colorBackGround}
                        title="Post linkedin!"
                        iconClass="fa fa-linkedin"
                    />
                    <SocialButton
                        quoteUrl={facebookShareUrl}
                        colorBackGround={quoteBoxSettings.colorBackGround}
                        title="Post facebook!"
                        iconClass="fa fa-facebook"
                    />
                </GroupButtons>
                <GroupButtons groupingClass="group-buttons">
                    <button className="button clipboard-button" style={{ backgroundColor: quoteBoxSettings.colorBackGround }} onClick={handleCopy} aria-label="Copy quote to clipboard">
                        <img src="/images/icons8-copy-24.png" alt="Clipboard" />
                    </button>
                    <button className="button quote-button" style={{ backgroundColor: quoteBoxSettings.colorBackGround }} onClick={loadQuote} aria-label="Load new quote">
                        New quote
                    </button>
                </GroupButtons>
            </div>
            <Notification notificationInfo={copyInfo} />
        </div>
    );
}