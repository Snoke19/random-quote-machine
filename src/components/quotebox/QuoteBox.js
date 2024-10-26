import React, {useCallback, useEffect, useId} from "react";

import "./QuoteBox.css";

import Categories from "../Categories/Categories";
import QuoteAndAuthor from "./QuoteAndAuthor/QuoteAndAuthor";
import SocialButton from "../Buttons/SocialButton";
import GroupButtons from "../Buttons/GroupButtons";

import {useCopyToClipboard} from "../hooks/useCopyToClipboard";
import useCategoryManager from "../hooks/useCategoryManager";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons/faLinkedin";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons/faWandMagicSparkles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {useStyleThemeContext} from "../context/BackgroundColorContext";
import {getRandomColor} from "../../utils/randomColor";
import useStyleTheme from "../hooks/useStyleTheme";
import useQuote from "../hooks/useQuote";

export default function QuoteBox() {
  const idSocialButton = useId();

  const {
    categories,
    categoryNotification,
    removeLastCategoryOrByIndex,
    addCategory,
  } = useCategoryManager();

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

  return (
    <div className="quote-box">
      <QuoteAndAuthor quote={quote} styleTheme={styleTheme}/>
      <Categories
        categories={categories}
        styleTheme={styleTheme}
        onRemoveCategory={removeLastCategoryOrByIndex}
        addCategory={addCategory}
        notificationCategory={categoryNotification}
      />
      <div className="buttons-container">
        <GroupButtons groupingClass="group-buttons group-buttons-wrap">
          {socialButtons.map((button, id) => (
            <SocialButton
              key={idSocialButton + id}
              quoteUrl={button.quoteUrl}
              styleTheme={styleTheme}
              title={button.title}
              iconClass={button.iconClass}
            />
          ))}
        </GroupButtons>
        <GroupButtons groupingClass="group-buttons">
          <button
            className="button clipboard-button"
            style={{backgroundColor: styleTheme.color}}
            onClick={() => {
              copyToClipboard(`${quote.quote} - ${quote.author}`);
            }}
            aria-label="Copy quote to clipboard"
          >
            <FontAwesomeIcon icon={faCopy} size="xl"/>
          </button>
          <button
            className="button quote-button"
            style={{backgroundColor: styleTheme.color}}
            onClick={loadQuoteWithStyle}
            aria-label="Load new quote"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} style={{paddingRight: '5px'}}/> New quote
          </button>
        </GroupButtons>
      </div>
      {/*<Notification notificationInfo={clipboardNotification}/>*/}
    </div>
  );
}
