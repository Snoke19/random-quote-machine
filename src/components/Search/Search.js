import React, {memo, useCallback, useEffect, useId, useMemo, useState} from 'react';
import PropTypes from "prop-types";

import './Search.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchQuotesByTextQuote} from "../../services/QuoteService";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";
import {useStyleThemeContext} from "../Context/StyleThemeContext";
import {useNotificationContext} from "../Context/NotificationContext";
import {useSearchContext} from "../Context/SearchContext";
import useClickAway from "../Hooks/useClickAway";
import useDebounce from "../Hooks/useDebounce";

export default function Search() {

  const quoteId = useId();
  const categoryId = useId();

  const ref = useClickAway(() => setFilteredQuotes([]));

  const {styleTheme} = useStyleThemeContext();
  const {setSearchQuote} = useSearchContext();
  const {displayNotification} = useNotificationContext();

  const [loading, setLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [offset, setOffset] = useState(0);

  const debouncedSearchTerm = useDebounce(inputSearch, 500);

  const fetchQuotes = useCallback(async (searchValue, offset = 0) => {
    setLoading(true);
    try {
      const quotes = await fetchQuotesByTextQuote(searchValue, offset);
      setFilteredQuotes((prev) => [...prev, ...quotes]);
    } catch (error) {
      displayNotification('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  }, [displayNotification]);

  const handleSearchInputChange = useCallback((e) => {
      e.preventDefault();
      const {value} = e.target;
      if (value.length >= 0) {
        setInputSearch(value);
        setOffset(0);
        setFilteredQuotes([]);
      }
    }, []
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

  const handleScroll = useCallback((e) => {
    const bottomReached = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottomReached && !loading) {
      setOffset((prev) => prev + 10);
    }
  }, [loading])

  useEffect(() => {
      if (debouncedSearchTerm) {
        fetchQuotes(debouncedSearchTerm, offset).catch(() => console.log('Failed to fetch quotes'));
      }
    }, [fetchQuotes, debouncedSearchTerm, offset]
  );

  const iconSearch = useMemo(() =>
      loading ? (
        <FontAwesomeIcon icon={faSpinner} spin/>
      ) : (
        <FontAwesomeIcon icon={filteredQuotes.length > 0 ? faXmark : faMagnifyingGlass}/>
      ),
    [loading, filteredQuotes.length]
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
        <button className="search-icon-button" onClick={handleSearchIconClick} disabled={loading}>
          {iconSearch}
        </button>
        {filteredQuotes.length > 0 && (
          <ul className={`dropdown ${filteredQuotes.length > 0 ? 'show' : ''}`} onScroll={handleScroll}>
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
  styleTheme: PropTypes.string.isRequired,
  onQuoteSelect: PropTypes.func.isRequired,
};