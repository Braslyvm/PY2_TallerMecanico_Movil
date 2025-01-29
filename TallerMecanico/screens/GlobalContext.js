import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [translate, setTranslate] = useState(false);

  return (
    <GlobalContext.Provider value={{ dark, setDark, translate, setTranslate }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}