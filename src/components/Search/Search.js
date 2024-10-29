import React, {memo, useCallback, useId, useMemo, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchQuotesByTextQuote} from "../../services/QuoteService";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './Search.css';
import {useStyleThemeContext} from "../Context/StyleThemeContext";
import {useClickAway} from "../Hooks/useClickAway";
import {useNotificationContext} from "../Context/NotificationContext";
import {useSearchContext} from "../Context/SearchContext";
import PropTypes from "prop-types";

export default function Search() {

  const quoteId = useId();
  const categoryId = useId();

  const {styleTheme} = useStyleThemeContext();
  const {setSearchQuote} = useSearchContext();
  const {displayNotification} = useNotificationContext();

  const [inputSearch, setInputSearch] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const ref = useClickAway(() => setFilteredQuotes([]));

  const debounceTimeoutRef = useRef(null);

  const fetchQuotes = useCallback(async (searchValue) => {
    try {
      const quotes = await fetchQuotesByTextQuote(searchValue);
      setFilteredQuotes(quotes);
    } catch (error) {
      displayNotification('Failed to fetch quotes');
    }
  }, [displayNotification]);

  const handleSearchInputChange = useCallback((e) => {
      const {value} = e.target;
      setInputSearch(value);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      if (value.length > 0) {
        debounceTimeoutRef.current = setTimeout(() => fetchQuotes(value), 500);
      } else {
        setFilteredQuotes([]);
      }
    },
    [fetchQuotes]
  );

  const handleSearchInputFocus = useCallback(async () => {
    if (inputSearch.length > 0 && filteredQuotes.length === 0) await fetchQuotes(inputSearch);
  }, [inputSearch, filteredQuotes, fetchQuotes]);

  const handleQuoteSelect = useCallback((quote) => {
    setSearchQuote(quote);
    setFilteredQuotes([]);
  }, [setSearchQuote]);

  const handleSearchIconClick = async () => {
    if (filteredQuotes.length > 0) {
      setInputSearch('');
      setFilteredQuotes([]);
    } else if (inputSearch.length > 0) {
      await fetchQuotes(inputSearch);
    }
  };

  const iconSearch = useMemo(() =>
      <FontAwesomeIcon icon={filteredQuotes.length > 0 ? faXmark : faMagnifyingGlass}/>,
    [filteredQuotes.length]
  );

  return (
    <div className="search-container" ref={ref}>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          value={inputSearch}
          onFocus={handleSearchInputFocus}
          onChange={handleSearchInputChange}
          placeholder="Search quotes..."
        />
        <button className="search-icon-button" onClick={handleSearchIconClick}>
          {iconSearch}
        </button>
        {filteredQuotes.length > 0 && (
          <ul className={`dropdown ${filteredQuotes.length > 0 ? 'show' : ''}`}>
            {filteredQuotes.map((quote) => (
              <QuoteItem
                key={`${quoteId}-${quote.id}`}
                categoryId={categoryId}
                quote={quote}
                styleTheme={styleTheme}
                onQuoteSelect={handleQuoteSelect}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const QuoteItem = memo(
  function QuoteItem({categoryId, quote, styleTheme, onQuoteSelect}) {
    const {quoteText, author: {name: authorName}, categories} = quote;
    return (
      <li className="dropdown-item">
        <button className="button-quote-block" onClick={() => onQuoteSelect(quote)}>
          <div className="search-quote-box">
            <div className="search-quote">
              <span className="search-quote-text">{quoteText}</span>
              <span className="search-author-text"> — {authorName}</span>
            </div>
            <div className="search-categories">
              {categories.map(({id, name}) => (
                <span className="search-category-label" key={`${categoryId}-${id}`}
                      style={{backgroundColor: styleTheme}}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </button>
      </li>
    )
  }
);

QuoteItem.propTypes = {
  categoryId: PropTypes.string.isRequired,
  quote: PropTypes.object.isRequired,
  styleTheme: PropTypes.object.isRequired,
  onQuoteSelect: PropTypes.func.isRequired,
};