import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import PropTypes from "prop-types";

const StyleThemeContext = createContext(null);

export function StyleThemeProvider({children}) {

  const [styleTheme, setStyleTheme] = useState('');

  const updateStyleThemeContext = useCallback((color) => {
    setStyleTheme(color);
    document.body.style.backgroundColor = color;
    document.body.style.transition = "background-color 1s ease";
  }, []);

  const contextValue = useMemo(() => ({
    styleTheme,
    updateStyleThemeContext
  }), [styleTheme, updateStyleThemeContext]);

  return (
    <StyleThemeContext.Provider value={contextValue}>
      {children}
    </StyleThemeContext.Provider>
  );
}

export const useStyleThemeContext = () => useContext(StyleThemeContext);

StyleThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};