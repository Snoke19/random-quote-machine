import React from "react";

import "./QuoteBox.css";

import Tags from "../Tags/Tags";
import QuoteAuthor from "../QuoteAuthor/QuoteAuthor";
import Notification from "../Notification/Notification";
import SocialButton from "./Buttons/SocialButton";
import GroupButtons from "./Buttons/GroupButtons";

import useQuoteBox from "./hooks/useQuoteBox";
import useQuoteClipboard from "./hooks/useQuoteClipboard";
import useTag from "../Tags/useTag";

export default function QuoteBox() {

    const {
        quote,
        quoteBoxSettings,
        socialLinks,
        loadQuote,
    } = useQuoteBox();

    const { tagsState, addTag, handleTagInputChange, removeTag } = useTag();
    const { copyToClipboard, notification } = useQuoteClipboard(quote);

    const socialButtons = [
        { quoteUrl: socialLinks.tweetQuoteUrl, title: "Tweet this quote!", iconClass: "fa fa-twitter" },
        { quoteUrl: socialLinks.linkedinShareUrl, title: "Post on LinkedIn!", iconClass: "fa fa-linkedin" },
        { quoteUrl: socialLinks.facebookShareUrl, title: "Post on Facebook!", iconClass: "fa fa-facebook" },
    ];

    return (
        <div className="quote-box">
            <QuoteAuthor
                quote={quote.quote}
                author={quote.author}
                color={quoteBoxSettings.colorBackGround}
                fadeClass={quoteBoxSettings.fade ? 'fade-out' : 'fade-in'}
            />
            <Tags
                tags={tagsState.quoteTags}
                settings={quoteBoxSettings}
                onRemoveTag={removeTag}
                tagInputValue={tagsState.tagInputValue}
                onTagInputChange={handleTagInputChange}
                onTagInputKeyDown={addTag}
            />
            <div className="buttons-container">
                <GroupButtons groupingClass="group-buttons group-buttons-wrap">
                    {socialButtons.map((button, id) =>
                        <SocialButton
                            key={id}
                            quoteUrl={button.quoteUrl}
                            colorBackGround={quoteBoxSettings.colorBackGround}
                            title={button.title}
                            iconClass={button.iconClass}
                        />
                    )}
                </GroupButtons>
                <GroupButtons groupingClass="group-buttons">
                    <button
                        className="button clipboard-button"
                        style={{ backgroundColor: quoteBoxSettings.colorBackGround }}
                        onClick={copyToClipboard}
                        aria-label="Copy quote to clipboard"
                    >
                        <img src="/images/icons8-copy-24.png" alt="Clipboard" />
                    </button>
                    <button
                        className="button quote-button"
                        style={{ backgroundColor: quoteBoxSettings.colorBackGround }}
                        onClick={loadQuote}
                        aria-label="Load new quote"
                    >
                        New quote
                    </button>
                </GroupButtons>
            </div>
            <Notification notificationInfo={notification} />
        </div>
    );
}