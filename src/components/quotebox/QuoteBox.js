import React, {useCallback, useEffect, useId, useMemo} from "react";

import "./QuoteBox.css";

import SocialButton from "../Buttons/SocialButton";
import Categories from "../Categories/Categories";
import QuoteAndAuthor from "./QuoteAndAuthor/QuoteAndAuthor";
import {useCopyToClipboard} from "../hooks/useCopyToClipboard";
import useCategory from "../hooks/useCategory";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons/faLinkedin";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons/faWandMagicSparkles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {useStyleThemeContext} from "../context/StyleThemeContext";
import {getRandomColor} from "../../utils/randomColor";
import useStyleTheme from "../hooks/useStyleTheme";
import useQuote from "../hooks/useQuote";
import {useNotificationContext} from "../context/NotificationContext";

export default function QuoteBox() {
  const idSocialButton = useId();

  const {
    categories,
    removeLastCategoryOrByIndex,
    addCategory,
  } = useCategory();

  const {displayNotification} = useNotificationContext();
  const {styleTheme, updateStyleTheme} = useStyleTheme();
  const {quote, loadQuote} = useQuote(categories);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const {updateStyleThemeContext} = useStyleThemeContext();

  const loadQuoteWithStyle = useCallback(() => {
    const newColor = getRandomColor();
    updateStyleTheme(newColor, true);
    loadQuote(categories);
  }, [categories, loadQuote, updateStyleTheme]);

  useEffect(() => {
    updateStyleThemeContext(styleTheme.color);
  }, [styleTheme.color, updateStyleThemeContext]);

  const tweetQuoteUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${encodeURIComponent(quote.quote)}%22%20${encodeURIComponent(quote.author)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://your-website.com")}&text=${encodeURIComponent(quote.quote)} - ${encodeURIComponent(quote.author)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("")}`;

  const socialButtons = [
    {
      quoteUrl: tweetQuoteUrl,
      title: "Tweet this quote!",
      iconClass: faTwitter,
    },
    {
      quoteUrl: linkedinShareUrl,
      title: "Post on LinkedIn!",
      iconClass: faLinkedin,
    },
    {
      quoteUrl: facebookShareUrl,
      title: "Post on Facebook!",
      iconClass: faFacebook,
    },
  ];

  const iconCopyClipboard = useMemo(() => <FontAwesomeIcon icon={faCopy} size="xl"/>, []);
  const iconMagicRandomQuote = useMemo(() => <><FontAwesomeIcon icon={faWandMagicSparkles}
                                                                style={{paddingRight: '5px'}}/> New quote</>, []);

  return (
    <div className="quote-box">
      <QuoteAndAuthor quote={quote} styleTheme={styleTheme}/>
      <Categories
        categories={categories}
        styleTheme={styleTheme}
        onRemoveCategory={removeLastCategoryOrByIndex}
        addCategory={addCategory}
      />
      <div className="buttons-container">
        <div className="group-buttons group-buttons-wrap">
          {socialButtons.map((button, id) => (
            <SocialButton
              key={idSocialButton + id}
              quoteUrl={button.quoteUrl}
              styleTheme={styleTheme}
              title={button.title}
              iconClass={button.iconClass}
            />
          ))}
        </div>
        <div className="group-buttons">
          <button
            className="button clipboard-button"
            style={{backgroundColor: styleTheme.color}}
            onClick={() => {
              const copiedQuote = `${quote.quote} - ${quote.author}`;
              copyToClipboard(copiedQuote).then(() => {
                displayNotification(`The quote "${copiedQuote.substring(0, 20)}..." has been copied!`);
              }).catch((e) => {
                displayNotification('Cannot copy the quote!');
                console.error(e);
              })
            }}
            aria-label="Copy quote to clipboard"
          >
            {iconCopyClipboard}
          </button>
          <button
            className="button quote-button"
            style={{backgroundColor: styleTheme.color}}
            onClick={loadQuoteWithStyle}
            aria-label="Load new quote"
          >
            {iconMagicRandomQuote}
          </button>
        </div>
      </div>
    </div>
  );
}
