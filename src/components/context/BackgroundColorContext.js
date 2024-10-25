import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import PropTypes from "prop-types";

const BackgroundColorContext = createContext(null);

export function BackgroundColorProvider({children}) {

  const [backgroundColor, setBackgroundColor] = useState('');
  const updateBackgroundColor = useCallback((color) => {
    setBackgroundColor(color);
  }, []);

  const contextValue = useMemo(() => ({
    backgroundColor,
    updateBackgroundColor
  }), [backgroundColor, updateBackgroundColor]);

  return (
    <BackgroundColorContext.Provider value={contextValue}>
      {children}
    </BackgroundColorContext.Provider>
  );
}

export const useBackgroundColorContext = () => useContext(BackgroundColorContext);

BackgroundColorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};