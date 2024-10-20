import React, { useId } from "react";

import "./QuoteBox.css";

import Categories from "../Categories/Categories";
import QuoteAndAuthor from "../QuoteAndAuthor/QuoteAndAuthor";
import Notification from "../Notification/Notification";
import SocialButton from "../Buttons/SocialButton";
import GroupButtons from "../Buttons/GroupButtons";

import useQuoteBox from "./hooks/useQuoteBox";
import useQuoteClipboard from "./hooks/useQuoteClipboard";
import useCategoryManager from "../Categories/hooks/useCategoryManager";

export default function QuoteBox() {
  const idSocialButton = useId();

  const {
    categoryState,
    isCategoriesReady,
    suggestedCategories,
    categoryNotification,
    handleCategoryInputChange,
    removeLastCategory,
    handleKeyDown,
  } = useCategoryManager();

  const { quote, quoteBoxSettings, loadQuote } = useQuoteBox(
    categoryState.categories,
    isCategoriesReady
  );
  const { clipboardNotification, copyToClipboard } = useQuoteClipboard(quote);

  const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(
    quote.quote
  )}%22%20${encodeURIComponent(quote.author)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    "https://your-website.com"
  )}&text=${encodeURIComponent(quote.quote)} - ${encodeURIComponent(
    quote.author
  )}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    ""
  )}`;

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
      <QuoteAndAuthor
        quote={quote.quote}
        author={quote.author}
        color={quoteBoxSettings.colorBackGround}
        fadeClass={quoteBoxSettings.fade ? "fade-out" : "fade-in"}
      />
      <Categories
        categories={categoryState.categories}
        settings={quoteBoxSettings}
        categoryInputValue={categoryState.categoryInput}
        onRemoveCategory={removeLastCategory}
        onCategoryInputChange={handleCategoryInputChange}
        onKeyDown={handleKeyDown}
        notificationCategory={categoryNotification}
        suggestionCategories={suggestedCategories}
      />
      <div className="buttons-container">
        <GroupButtons groupingClass="group-buttons group-buttons-wrap">
          {socialButtons.map((button, id) => (
            <SocialButton
              key={idSocialButton + id}
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
            onClick={() => loadQuote(categoryState.categories)}
            aria-label="Load new quote"
          >
            New quote
          </button>
        </GroupButtons>
      </div>
      <Notification notificationInfo={clipboardNotification} />
    </div>
  );
}
