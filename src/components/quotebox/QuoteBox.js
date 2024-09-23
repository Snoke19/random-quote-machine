import React from "react";

import "./QuoteBox.css";

import Tags from "../Tags/Tags";
import QuoteAuthor from "../QuoteAuthor/QuoteAuthor";
import Notification from "../Notification/Notification";
import SocialButton from "./buttons/SocialButton";
import GroupButtons from "./buttons/GroupButtons";

import useQuoteBox from "./useQuoteBox";

export default function QuoteBox() {

    const {
        quoteBoxSettings,
        tagState,
        copyInfo,
        tweetQuoteUrl,
        linkedinShareUrl,
        facebookShareUrl,
        handleCopy,
        loadQuote,
        removeTag,
        handleInputChange,
        addTag,
    } = useQuoteBox();

    return (
        <div id="quote-box">
            <QuoteAuthor
                quote={quoteBoxSettings.quote}
                author={quoteBoxSettings.author}
                color={quoteBoxSettings.colorBackGround}
                fadeClass={quoteBoxSettings.fade ? 'fade-out' : 'fade-in'}
            />
            <Tags
                tags={tagState.quoteTags}
                settings={quoteBoxSettings}
                onRemoveTag={removeTag}
                tagInputValue={tagState.inputValue}
                onTagInputChange={handleInputChange}
                onTagInputKeyDown={addTag}
            />
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
                    <button
                        className="button clipboard-button"
                        style={{ backgroundColor: quoteBoxSettings.colorBackGround }}
                        onClick={handleCopy}
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
            <Notification notificationInfo={copyInfo} />
        </div>
    );
}