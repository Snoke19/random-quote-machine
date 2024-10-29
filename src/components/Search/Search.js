import React, {useCallback, useId, useMemo, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchQuotesByTextQuote} from "../../services/QuoteService";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './Search.css';
import {useStyleThemeContext} from "../context/StyleThemeContext";
import {useClickAway} from "../hooks/useClickAway";
import {useNotificationContext} from "../context/NotificationContext";

export function Search() {

  const quoteId = useId();
  const categoryId = useId();
  const {displayNotification} = useNotificationContext();
  const {styleTheme} = useStyleThemeContext();

  const [inputSearch, setInputSearch] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  const debounceTimeoutRef = useRef(null);
  const ref = useClickAway(() => setFilteredQuotes([]));

  const iconSearch = useMemo(() =>
      <FontAwesomeIcon icon={filteredQuotes.length > 0 ? faXmark : faMagnifyingGlass}/>,
    [filteredQuotes.length]
  );

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
    if (inputSearch.length > 0 && filteredQuotes.length === 0) {
      try {
        await fetchQuotes(inputSearch);
      } catch (error) {
        displayNotification('Failed to fetch quotes');
      }
    }
  }, [displayNotification, inputSearch, filteredQuotes, fetchQuotes]);

  const handleQuoteSelect = useCallback((quoteText) => {
    setInputSearch(quoteText);
    setFilteredQuotes([]);
  }, []);

  const handleSearchIconClick = async () => {
    if (filteredQuotes.length > 0) {
      setInputSearch('');
      setFilteredQuotes([]);
    } else if (inputSearch.length > 0) {
      await fetchQuotes(inputSearch);
    }
  };

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
            {filteredQuotes.map(({id, quoteText, author: {name: authorName}, categories}) => (
              <QuoteItem
                key={quoteId + id}
                categoryId={categoryId}
                quoteText={quoteText}
                authorName={authorName}
                categories={categories}
                styleTheme={styleTheme}
                handleQuoteSelect={handleQuoteSelect}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const QuoteItem = React.memo(({
                                categoryId,
                                quoteText,
                                authorName,
                                categories,
                                styleTheme,
                                handleQuoteSelect
                              }) => (
  <li className="dropdown-item">
    <button className="button-quote-block" onClick={() => handleQuoteSelect(quoteText)}>
      <div className="search-quote-box">
        <div className="search-quote">
          <span className="search-quote-text">{quoteText}</span>
          <span className="search-author-text"> — {authorName}</span>
        </div>
        <div className="search-categories">
          {categories.map(({id, name}) => (
            <span className="search-category-label" key={categoryId + id}
                  style={{backgroundColor: styleTheme}}>{name}</span>
          ))}
        </div>
      </div>
    </button>
  </li>
));