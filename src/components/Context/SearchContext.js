import React, {createContext, useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";

const SearchContext = createContext(null);

export function SearchProvider({children}) {

  const [searchQuote, setSearchQuote] = useState(null);

  const contextValue = useMemo(() => ({
    searchQuote,
    setSearchQuote
  }), [searchQuote]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};