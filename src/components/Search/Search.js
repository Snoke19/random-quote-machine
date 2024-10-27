import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fetchQuotesByTextQuote} from "../../services/QuoteService";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './Search.css';
import {useStyleThemeContext} from "../context/StyleThemeContext";

export function Search() {

  const searchContainerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const quoteId = useId();
  const categoryId = useId();

  const { styleTheme } = useStyleThemeContext();

  const [inputSearch, setInputSearch] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  const fetchQuotes = useCallback(async (searchValue) => {
    try {
      const quotes = await fetchQuotesByTextQuote(searchValue);
      setFilteredQuotes(quotes);
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    }
  }, []);

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
        console.error('Failed to fetch quotes on focus:', error);
      }
    }
  }, [inputSearch, filteredQuotes, fetchQuotes]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setFilteredQuotes([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchContainerRef}>
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
          <FontAwesomeIcon icon={filteredQuotes.length > 0 ? faXmark : faMagnifyingGlass}/>
        </button>

        {filteredQuotes.length > 0 && (
          <ul className={`dropdown ${filteredQuotes.length > 0 ? 'show' : ''}`}>
            {filteredQuotes.map(({id, quoteText, author: {name: authorName}, categories}) => (
              <li key={quoteId + id} className="dropdown-item">
                <button className="button-quote-block" onClick={() => handleQuoteSelect(quoteText)}>
                  <div className="search-quote-box">
                    <div className="search-quote">
                      <span className="search-quote-text">{quoteText}</span>
                      <span className="search-author-text"> — {authorName}</span>
                    </div>
                    <div className="search-categories">
                      {categories.map(({id, name}) => (
                        <span className="search-category-label" key={categoryId + id} style={{backgroundColor: styleTheme}}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}