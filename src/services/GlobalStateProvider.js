// GlobalStateProvider.js

import React, { createContext, useState, useContext } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  // Define your global state variables and functions here
  const [globalState, setGlobalState] = useState();

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);


  