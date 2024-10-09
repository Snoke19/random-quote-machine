import React from "react";

import "./QuoteBox.css";

import Tags from "../Tags/Tags";
import QuoteAuthor from "../QuoteAuthor/QuoteAuthor";
import Notification from "../Notification/Notification";
import SocialButton from "./Buttons/SocialButton";
import GroupButtons from "./Buttons/GroupButtons";

import useQuoteBox from "./hooks/useQuoteBox";
import useQuoteClipboard from "./hooks/useQuoteClipboard";
import useTag from "../Tags/hooks/useTag";

export default function QuoteBox() {
  const {
    tagsState,
    handleTagInputChange,
    removeTag,
    onKeyDownButtonsAddOrRemove,
    notificationTag,
    suggestionTags,
  } = useTag();
  const { quote, quoteBoxSettings, loadQuote } = useQuoteBox(
    tagsState.quoteTags
  );
  const { copyToClipboard, notification } = useQuoteClipboard(quote);

  const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quote.quote)}%22%20${encodeURIComponent(quote.author)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://your-website.com")}&text=${encodeURIComponent(quote.quote)} - ${encodeURIComponent(quote.author)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("")}`;

  const socialButtons = [
    {
      quoteUrl: tweetQuoteUrl,
      title: "Tweet this quote!",
      iconClass: "fa fa-twitter",
    },
    {
      quoteUrl: linkedinShareUrl,
      title: "Post on LinkedIn!",
      iconClass: "fa fa-linkedin",
    },
    {
      quoteUrl: facebookShareUrl,
      title: "Post on Facebook!",
      iconClass: "fa fa-facebook",
    },
  ];

  return (
    <div className="quote-box">
      <QuoteAuthor
        quote={quote.quote}
        author={quote.author}
        color={quoteBoxSettings.colorBackGround}
        fadeClass={quoteBoxSettings.fade ? "fade-out" : "fade-in"}
      />
      <Tags
        tags={tagsState.quoteTags}
        settings={quoteBoxSettings}
        tagInputValue={tagsState.tagInputValue}
        onRemoveTag={removeTag}
        onTagInputChange={handleTagInputChange}
        onKeyDownButtonsAddOrRemove={onKeyDownButtonsAddOrRemove}
        notificationTag={notificationTag}
        suggestionTags={suggestionTags}
      />
      <div className="buttons-container">
        <GroupButtons groupingClass="group-buttons group-buttons-wrap">
          {socialButtons.map((button, id) => (
            <SocialButton
              key={id}
              quoteUrl={button.quoteUrl}
              colorBackGround={quoteBoxSettings.colorBackGround}
              title={button.title}
              iconClass={button.iconClass}
            />
          ))}
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
            onClick={() => loadQuote(tagsState.quoteTags)}
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
